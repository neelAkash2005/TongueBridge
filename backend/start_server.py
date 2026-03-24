#!/usr/bin/env python
"""Start uvicorn server - simple no-reload version."""

import argparse
import os
import socket
import subprocess
import sys
import signal
from urllib.request import urlopen
from urllib.error import URLError

import uvicorn


HOST = "127.0.0.1"
PORT = 8000


def _is_port_in_use(host: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.5)
        return sock.connect_ex((host, port)) == 0


def _backend_already_running(host: str, port: int) -> bool:
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


def _get_listening_pid_on_port(port: int) -> int | None:
    try:
        output = subprocess.check_output(["netstat", "-ano", "-p", "tcp"], text=True, stderr=subprocess.STDOUT)
    except Exception:
        return None

    for line in output.splitlines():
        normalized = " ".join(line.split())
        if not normalized:
            continue

        parts = normalized.split(" ")
        if len(parts) < 5:
            continue

        local_address = parts[1]
        state = parts[3].upper()
        pid_text = parts[4]

        if state != "LISTENING":
            continue
        if not local_address.endswith(f":{port}"):
            continue
        if not pid_text.isdigit():
            continue

        return int(pid_text)

    return None


def _terminate_pid(pid: int) -> bool:
    try:
        if os.name == "nt":
            result = subprocess.run(["taskkill", "/PID", str(pid), "/F"], capture_output=True, text=True)
            return result.returncode == 0

        os.kill(pid, signal.SIGTERM)
        return True
    except Exception:
        return False


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Start TongueBridge backend server")
    parser.add_argument(
        "--force-restart",
        action="store_true",
        help="If port 8000 is in use, stop the current process and restart backend.",
    )
    return parser.parse_args()

if __name__ == "__main__":
    args = _parse_args()

    if _is_port_in_use(HOST, PORT):
        if args.force_restart:
            existing_pid = _get_listening_pid_on_port(PORT)
            if existing_pid is None:
                print(f"Port {PORT} is busy and no PID could be resolved. Aborting.")
                sys.exit(1)

            if not _terminate_pid(existing_pid):
                print(f"Failed to stop process {existing_pid} on port {PORT}. Aborting.")
                sys.exit(1)

            print(f"Stopped process {existing_pid} on port {PORT}. Restarting backend...")

        if _backend_already_running(HOST, PORT):
            print(f"Backend is already running at http://{HOST}:{PORT}.")
            sys.exit(0)

        if _is_port_in_use(HOST, PORT):
            print(
                f"Port {PORT} is busy by another process. "
                f"Free it and retry, or start backend on a different port."
            )
            sys.exit(1)

    uvicorn.run(
        "app.main:app",
        host=HOST,
        port=PORT,
        reload=False,  # Disable reload to avoid subprocess issues
        log_level="info"
    )
