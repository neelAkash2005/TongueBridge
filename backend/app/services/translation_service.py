def translate_text_service(
	text: str,
	source_language: str,
	target_language: str,
) -> str:
	return f"Translated from {source_language} to {target_language}: {text}"
