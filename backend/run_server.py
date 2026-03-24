#!/usr/bin/env python
"""Start uvicorn server without multiprocessing issues on Windows."""

import argparse
import socket
import sys
from urllib.error import URLError
from urllib.request import urlopen

import uvicorn


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run TongueBridge backend server")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="Port to bind (default: 8000)")
    parser.add_argument(
        "--reload",
        action="store_true",
        help="Enable auto-reload for development (may fail on some Windows setups)",
    )
    return parser.parse_args()


def _is_port_in_use(host: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.5)
        return sock.connect_ex((host, port)) == 0


def _backend_responding(host: str, port: int) -> bool:
    for endpoint in ("/health", "/"):
        try:
            with urlopen(f"http://{host}:{port}{endpoint}", timeout=1.5) as response:
                if response.status == 200:
                    return True
        except URLError:
            continue
        except Exception:
            continue
    return False


def _find_available_port(host: str, start_port: int, max_tries: int = 10) -> int | None:
    for port in range(start_port, start_port + max_tries):
        if not _is_port_in_use(host, port):
            return port
    return None

if __name__ == "__main__":
    args = _parse_args()

    target_port = args.port
    if _is_port_in_use(args.host, target_port):
        if _backend_responding(args.host, target_port):
            print(f"Backend is already running at http://{args.host}:{target_port}.")
            sys.exit(0)

        fallback_port = _find_available_port(args.host, target_port + 1)
        if fallback_port is None:
            print(f"Port {target_port} is busy and no free fallback port found.")
            sys.exit(1)

        print(f"Port {target_port} is busy. Starting backend on http://{args.host}:{fallback_port} instead.")
        target_port = fallback_port

    uvicorn_kwargs = {
        "app": "app.main:app",
        "host": args.host,
        "port": target_port,
        "reload": args.reload,
        "log_level": "info",
        "access_log": True,
        "loop": "auto",
    }

    if args.reload:
        uvicorn_kwargs["reload_dirs"] = ["app"]

    uvicorn.run(**uvicorn_kwargs)
