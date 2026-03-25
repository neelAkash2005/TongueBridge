export const SUPPORTED_TARGET_LANGUAGES = {
  English: ['Hindi', 'Bengali', 'Spanish', 'French'],
  Hindi: ['English'],
  Bengali: ['English'],
  Spanish: ['English'],
  French: ['English'],
};

export const SOURCE_LANGUAGES = Object.keys(SUPPORTED_TARGET_LANGUAGES);

export function getTargetLanguages(sourceLanguage) {
  return SUPPORTED_TARGET_LANGUAGES[sourceLanguage] || [];
}
