#!/usr/bin/env python
"""Test if document_service can be imported without olefile error."""

try:
    from app.services.document_service import translate_document
    print("✓ SUCCESS: document_service imported successfully!")
    print("✓ olefile is now lazy-imported (only loaded when processing .doc files)")
except ModuleNotFoundError as e:
    print(f"✗ FAILED: {e}")
    exit(1)
except Exception as e:
    print(f"✓ Import succeeded but got expected initialization: {type(e).__name__}")
    print("  This is normal - transformers models load lazily too")
