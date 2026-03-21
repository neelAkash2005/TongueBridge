import { useState } from 'react';
import FreePlanTools from './FreePlanTools.jsx';
import './TeamPage.css';

function TeamPage() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [freeToolsResetTrigger, setFreeToolsResetTrigger] = useState(0);

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
  };

  const handleTranslate = () => {
    if (inputText.trim() === '') return;
    setOutputText(inputText);
    setShowOutput(true);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setShowOutput(false);
    setFreeToolsResetTrigger((previous) => previous + 1);
  };

  return (
    <section className="team-page">
      <p className="team-brand">TongueBridge</p>
      <h1>Team Version</h1>
      <p className="team-subtitle">Built for collaboration and shared access</p>

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

          <FreePlanTools resetTrigger={freeToolsResetTrigger} />

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
            <button className="btn primary" onClick={handleTranslate}>Translate</button>
            <button className="btn ghost" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamPage;
