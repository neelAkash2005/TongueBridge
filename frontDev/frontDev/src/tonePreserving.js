const CONTRACTION_MAP = {
  "can't": 'cannot',
  "won't": 'will not',
  "don't": 'do not',
  "didn't": 'did not',
  "isn't": 'is not',
  "aren't": 'are not',
  "i'm": 'I am',
  "it's": 'it is',
  "that's": 'that is',
  "there's": 'there is',
  "we're": 'we are',
  "you're": 'you are',
  "they're": 'they are',
  "i've": 'I have',
  "you've": 'you have',
};

function expandContractions(text) {
  let result = text;
  for (const [shortForm, longForm] of Object.entries(CONTRACTION_MAP)) {
    const pattern = new RegExp(`\\b${shortForm.replace("'", "\\'")}\\b`, 'gi');
    result = result.replace(pattern, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return longForm[0].toUpperCase() + longForm.slice(1);
      }
      return longForm;
    });
  }
  return result;
}

function toSentenceCase(text) {
  if (!text) return text;
  return text[0].toUpperCase() + text.slice(1);
}

export function applyTonePreservingText(inputText, tone) {
  const raw = inputText.trim();
  if (!raw) return '';

  if (tone === 'formal') {
    const expanded = expandContractions(raw);
    const punctuated = /[.!?]$/.test(expanded) ? expanded : `${expanded}.`;
    return `Kindly note: ${toSentenceCase(punctuated)}`;
  }

  if (tone === 'casual') {
    const soft = raw.replace(/\bdo not\b/gi, "don't").replace(/\bcannot\b/gi, "can't");
    const punctuated = /[.!?]$/.test(soft) ? soft : `${soft}!`;
    return `Hey! ${toSentenceCase(punctuated)}`;
  }

  return toSentenceCase(raw);
}
