import { useState, useEffect } from 'react';
import FreePlanTools from './FreePlanTools.jsx';
import { detectLanguage } from './languageDetect.js';
import './PremiumPage.css';

function PremiumPage() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [toneMode, setToneMode] = useState('neutral');
  const [freeToolsResetTrigger, setFreeToolsResetTrigger] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const detectedLanguage = detectLanguage(inputText);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('premiumTranslationHistory');
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
      localStorage.setItem('premiumTranslationHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }, [history]);

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
  };

  const handleTranslate = async () => {
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
        throw new Error('Failed to translate text.');
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
      setError(err.message || 'Something went wrong. Please try again.');
      setShowOutput(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
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
    <section className="premium-page">
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

      <p className="premium-brand">TongueBridge</p>
      <h1>Premium Version</h1>
      <p className="premium-subtitle">Advanced translation experience</p>

      {/* History Toggle Button */}
      <button
        className="history-toggle-btn"
        onClick={() => setShowHistorySidebar(!showHistorySidebar)}
        title="Open history"
      >
        📋 History {history.length > 0 && `(${history.length})`}
      </button>

      <div className="hero-card-stack premium-tools-card">
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
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
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
                <option>Spanish</option>
                <option>English</option>
                <option>French</option>
                <option>Hindi</option>
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
              <label htmlFor="premium-tone-select">
                Tone preserving <span className="tone-star">✦</span>
              </label>
              <select
                id="premium-tone-select"
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

          <FreePlanTools resetTrigger={freeToolsResetTrigger} showAdvanced />

          {error ? <p className="free-tool-note">⚠️ {error}</p> : null}

          {showOutput ? (
            <textarea
              rows="5"
              value={outputText}
              readOnly
              className="output-box"
              style={{ marginTop: '1rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
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

export default PremiumPage;
