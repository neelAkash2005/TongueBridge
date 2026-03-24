#!/usr/bin/env python
"""Start uvicorn server without multiprocessing issues on Windows."""

import uvicorn
import sys

if __name__ == "__main__":
    # Run uvicorn with the app
    # Using loop_factory to ensure proper asyncio event loop setup
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,  # Enable reload for development
        reload_dirs=["app"],  # Only watch app directory for changes
        log_level="info",
        access_log=True,
        # Use 'auto' loop factory to let uvicorn choose the best option
        loop="auto"
    )
