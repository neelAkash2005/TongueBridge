const LANGUAGE_CODE_MAP = {
  english: 'en',
  hindi: 'hi',
  bengali: 'bn',
  spanish: 'es',
  french: 'fr',
  en: 'en',
  hi: 'hi',
  bn: 'bn',
  es: 'es',
  fr: 'fr',
};

export const getLanguageCode = (language) => {
  return LANGUAGE_CODE_MAP[String(language || '').toLowerCase().trim()] || 'en';
};

const normalizeUrl = (rawUrl) => {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) {
    throw new Error('Enter website URL before translating website content.');
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withProtocol);
    return parsed.toString();
  } catch {
    throw new Error('Please enter a valid website URL.');
  }
};

const buildTranslatedUrl = (url, sourceCode, targetCode) => {
  return `https://translate.google.com/translate?sl=${encodeURIComponent(sourceCode)}&tl=${encodeURIComponent(targetCode)}&u=${encodeURIComponent(url)}`;
};

export const openTongueBridgeWebsiteTranslator = (rawUrl, sourceLang, targetLang) => {
  const normalizedUrl = normalizeUrl(rawUrl);
  const sourceCode = getLanguageCode(sourceLang);
  const targetCode = getLanguageCode(targetLang);

  const translatedUrl = buildTranslatedUrl(normalizedUrl, sourceCode, targetCode);
  window.open(translatedUrl, '_blank', 'noopener,noreferrer');
};
