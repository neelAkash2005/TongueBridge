import { useState, useEffect } from 'react';
import FreePlanTools from './FreePlanTools.jsx';
import { detectLanguage } from './languageDetect.js';
import { SOURCE_LANGUAGES, getTargetLanguages } from './supportedLanguagePairs.js';
import './TeamPage.css';

function TeamPage() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOutputMicListening, setIsOutputMicListening] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [toneMode, setToneMode] = useState('neutral');
  const [freeToolsResetTrigger, setFreeToolsResetTrigger] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const detectedLanguage = detectLanguage(inputText);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('teamTranslationHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('teamTranslationHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }, [history]);

  const targetLanguageOptions = getTargetLanguages(fromLang);

  useEffect(() => {
    if (!targetLanguageOptions.includes(toLang)) {
      setToLang(targetLanguageOptions[0] || '');
    }
  }, [fromLang, toLang, targetLanguageOptions]);

  const swapLanguages = () => {
    const nextFrom = toLang;
    const nextTo = fromLang;
    const nextTargets = getTargetLanguages(nextFrom);

    setFromLang(nextFrom);
    if (nextTargets.includes(nextTo)) {
      setToLang(nextTo);
    } else {
      setToLang(nextTargets[0] || '');
    }
  };

  const handleOutputMicToggle = () => {
    if (!outputText.trim() || !window.speechSynthesis) return;

    if (isOutputMicListening) {
      window.speechSynthesis.cancel();
      setIsOutputMicListening(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(outputText);
    utterance.lang = 'en-US';
    utterance.onend = () => setIsOutputMicListening(false);
    utterance.onerror = () => setIsOutputMicListening(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsOutputMicListening(true);
  };

  const handleTranslate = async () => {
    if (selectedImageFile) {
      await handleImageTranslate(selectedImageFile);
      return;
    }

    if (inputText.trim() === '') return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/translate/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          source_language: fromLang,
          target_language: toLang,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to translate text.';
        try {
          const errorData = await response.json();
          if (errorData?.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          // Keep default message if response body is not JSON
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const result = data.translated_text || '';

      setOutputText(result);
      setShowOutput(true);

      setHistory((prevHistory) => [
        {
          id: Date.now(),
          input: inputText,
          output: result,
          fromLang,
          toLang,
          tone: toneMode,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        },
        ...prevHistory.slice(0, 49),
      ]);
    } catch (err) {
      const fallbackMessage =
        'Could not connect to backend. Please start backend server at http://localhost:8000.';
      setError(err.message === 'Failed to fetch' ? fallbackMessage : (err.message || fallbackMessage));
      setOutputText('');
      setShowOutput(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageTranslate = async (imageFile) => {
    setLoading(true);
    setError('');

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsOutputMicListening(false);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('source_language', fromLang);

      const extractionResponse = await fetch('http://localhost:8000/translate/image/extract', {
        method: 'POST',
        body: formData,
      });

      if (!extractionResponse.ok) {
        let errorMessage = 'Image text extraction failed.';
        try {
          const errorData = await extractionResponse.json();
          if (errorData?.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          // Keep default message if response body is not JSON
        }
        throw new Error(errorMessage);
      }

      const extractionData = await extractionResponse.json();
      const extractedText = extractionData.extracted_text || '';

      setInputText(extractedText);

      const translationResponse = await fetch('http://localhost:8000/translate/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: extractedText,
          source_language: fromLang,
          target_language: toLang,
        }),
      });

      if (!translationResponse.ok) {
        let errorMessage = 'Text translation failed.';
        try {
          const errorData = await translationResponse.json();
          if (errorData?.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          // Keep default message if response body is not JSON
        }
        throw new Error(errorMessage);
      }

      const translationData = await translationResponse.json();
      const translatedText = translationData.translated_text || '';

      setOutputText(translatedText);
      setShowOutput(true);

      setHistory((prevHistory) => [
        {
          id: Date.now(),
          input: extractedText,
          output: translatedText,
          fromLang,
          toLang,
          tone: toneMode,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        },
        ...prevHistory.slice(0, 49),
      ]);
    } catch (err) {
      const fallbackMessage =
        'Could not connect to backend. Please start backend server at http://localhost:8000.';
      const message = err?.message === 'Failed to fetch' ? fallbackMessage : (err?.message || fallbackMessage);
      setError(message);
      setShowOutput(true);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setSelectedImageFile(null);
    setError('');
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsOutputMicListening(false);
    setShowOutput(false);
    setFreeToolsResetTrigger((previous) => previous + 1);
  };

  const handleDeleteHistory = () => {
    if (window.confirm('Are you sure you want to delete all history?')) {
      setHistory([]);
    }
  };

  const loadFromHistory = (item) => {
    setFromLang(item.fromLang);
    setToLang(item.toLang);
    setInputText(item.input);
    setOutputText(item.output);
    setToneMode(item.tone);
    setShowOutput(true);
    setShowHistorySidebar(false);
  };

  return (
    <section className="team-page">
      {/* History Sidebar */}
      <div className={`history-sidebar ${showHistorySidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>History</h3>
          <button 
            className="close-btn" 
            onClick={() => setShowHistorySidebar(false)}
            title="Close history"
          >
            ✕
          </button>
        </div>
        
        {history.length > 0 ? (
          <>
            <div className="history-list">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="history-item"
                  onClick={() => loadFromHistory(item)}
                >
                  <div className="history-meta">
                    <span className="history-langs">{item.fromLang.slice(0, 3)} → {item.toLang.slice(0, 3)}</span>
                    <span className="history-tone">{item.tone}</span>
                  </div>
                  <p className="history-input">{item.input.substring(0, 60)}{item.input.length > 60 ? '...' : ''}</p>
                  <p className="history-output">{item.output.substring(0, 60)}{item.output.length > 60 ? '...' : ''}</p>
                  <span className="history-time">{item.timestamp}</span>
                </div>
              ))}
            </div>
            <button 
              className="delete-history-btn" 
              onClick={handleDeleteHistory}
            >
              🗑️ Delete All
            </button>
          </>
        ) : (
          <div className="history-empty">No translations yet</div>
        )}
      </div>

      {/* Overlay */}
      {showHistorySidebar && (
        <div className="sidebar-overlay" onClick={() => setShowHistorySidebar(false)} />
      )}

      <p className="team-brand">TongueBridge</p>
      <h1>Team Version</h1>
      <p className="team-subtitle">Built for collaboration and shared access</p>

      {/* History Toggle Button */}
      <button
        className="history-toggle-btn"
        onClick={() => setShowHistorySidebar(!showHistorySidebar)}
        title="Open history"
      >
        📋 History {history.length > 0 && `(${history.length})`}
      </button>

      <div className="hero-card-stack team-tools-card">
        <div className="hero-card">
          <div className="card-header">
            <span>Quick translate</span>
            <span className="status">Live</span>
          </div>

          <div className="language-selector-container">
            <div className="field-no-label">
              <select
                value={fromLang}
                onChange={(event) => setFromLang(event.target.value)}
                aria-label="Source language"
              >
                {SOURCE_LANGUAGES.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
            <button className="swap-btn" onClick={swapLanguages} type="button" title="Swap languages">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z" fill="currentColor"/>
              </svg>
            </button>
            <div className="field-no-label">
              <select
                value={toLang}
                onChange={(event) => setToLang(event.target.value)}
                aria-label="Target language"
              >
                {targetLanguageOptions.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            rows="5"
            placeholder="Could you share the address?"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />

          <div className="detect-tone-row">
            <p className="detected-language-line">
              Detect language: <span>{inputText.trim() ? `${detectedLanguage} - detected` : detectedLanguage}</span>
            </p>

            <div className="tone-control">
              <label htmlFor="team-tone-select">
                Tone preserving <span className="tone-star">✦</span>
              </label>
              <select
                id="team-tone-select"
                value={toneMode}
                onChange={(event) => setToneMode(event.target.value)}
                aria-label="Tone preserving mode"
              >
                <option value="neutral">Neutral</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>

          <FreePlanTools
            resetTrigger={freeToolsResetTrigger}
            showAdvanced
            onSpeechToText={(transcript) => {
              setInputText((previous) => (previous ? `${previous} ${transcript}` : transcript));
              setError('');
            }}
            onImageSelect={(file) => {
              setSelectedImageFile(file);
              setError('');
            }}
          />

          {error ? <p className="free-tool-note">⚠️ {error}</p> : null}

          {showOutput ? (
            <>
              <textarea
                rows="5"
                value={outputText}
                readOnly
                className="output-box"
                style={{ marginTop: '1rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              />
              <div className="free-tools-row" style={{ marginTop: '0.75rem' }}>
                <button
                  className={`tool-btn ${isOutputMicListening ? 'active' : ''}`}
                  type="button"
                  onClick={handleOutputMicToggle}
                  aria-pressed={isOutputMicListening}
                  title="Mic"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="currentColor"/>
                    <path d="M19 11C19 14.53 16.39 17.43 13 17.93V21H11V17.93C7.61 17.43 5 14.53 5 11H7C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11H19Z" fill="currentColor"/>
                  </svg>
                  Mic
                </button>
              </div>
            </>
          ) : null}

          <div className="card-actions">
            <button className="btn primary" onClick={handleTranslate} disabled={loading}>
              {loading ? 'Translating...' : 'Translate'}
            </button>
            <button className="btn ghost" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamPage;
