export function detectLanguage(text) {
  const value = text.trim();
  if (!value) return 'Auto detect';

  if (/[\u0900-\u097F]/.test(value)) {
    return 'Hindi';
  }

  const normalized = value.toLowerCase();

  const tokens = normalized.split(/\s+/).filter(Boolean);

  const scores = {
    English: 0,
    Hindi: 0,
    Spanish: 0,
    French: 0,
  };

  const spanishWords = new Set(['hola', 'gracias', 'por', 'para', 'con', 'que', 'de', 'el', 'la', 'los', 'las', 'una', 'uno', 'usted', 'tengo', 'quiero']);
  const frenchWords = new Set(['bonjour', 'merci', 'avec', 'pour', 'et', 'de', 'le', 'la', 'les', 'des', 'une', 'un', 'vous', 'je', 'nous']);
  const englishWords = new Set(['the', 'and', 'is', 'are', 'with', 'for', 'you', 'hello', 'please', 'thanks', 'this', 'that']);

  if (/[ñáéíóúü¡¿]/.test(normalized)) scores.Spanish += 2;
  if (/[àâçéèêëîïôûùüÿœæ]/.test(normalized)) scores.French += 2;

  for (const token of tokens) {
    if (spanishWords.has(token)) scores.Spanish += 1;
    if (frenchWords.has(token)) scores.French += 1;
    if (englishWords.has(token)) scores.English += 1;
  }

  let detected = 'English';
  let maxScore = scores.English;

  for (const language of ['Spanish', 'French', 'Hindi']) {
    if (scores[language] > maxScore) {
      maxScore = scores[language];
      detected = language;
    }
  }

  return detected;
}
