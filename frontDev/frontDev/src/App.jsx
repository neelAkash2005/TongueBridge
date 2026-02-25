import './App.css';
import logo from './assets/logo.png';
import { useEffect, useState } from 'react';

function App() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const [inputText, setInputText] = useState(''); 
  const [outputText, setOutputText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // --- CHANGED: Removed the label from the output ---
  const handleTranslate = () => {
    if (inputText.trim() === '') return;
    
    // For now, this just mirrors your input text as a placeholder
    // until you connect a real translation API
    setOutputText(inputText); 
    setShowOutput(true); 
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setShowOutput(false); 
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.site-header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-container">
          <button
            className="brand brand-button"
            type="button"
            onClick={() => window.location.reload()}
            aria-label="Refresh page"
          >
            <div className="brand-mark">
              <img src={logo} alt="TongueBridge logo" />
            </div>
            <span className="brand-name">TongueBridge</span>
          </button>
          <nav className="nav">
            <a href="#features" className="features-link">
              Explore Features
            </a>
            <a href="#about" className="about-link">
              About
            </a>
            <a href="#contact-us" className="contact-link">
               Contact Us
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleDarkMode}
              type="button"
              aria-label="Toggle dark mode"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isDarkMode ? (
                  <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
                )}
              </svg>
            </button>
            <button className="btn ghost">Sign in</button>
            <button className="btn primary">Go Premium</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">A translator that feels like a real person</p>
            <h1>Translate with tone, not just words</h1>
            <p className="lead">
              TongueBridge helps you express exactly what you mean — clear, warm, and local.
              Perfect for everyday chats, work conversations, and travel moments
            </p>
            <div className="hero-actions">
              <button className="btn primary">Get Started</button>
              <button className="btn ghost">Learn More</button>
            </div>
            <div className="badges">
              <span>Multi languages</span>
              <span>Context aware</span>
              <span>Privacy first</span>
            </div>
          </div>
          <div className="hero-card" id="demo">
            <div className="card-header">
              <span>Quick translate</span>
              <span className="status">Live</span>
            </div>
            <div className="language-selector-container">
              <div className="field-no-label">
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
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
                  onChange={(e) => setToLang(e.target.value)}
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
              onChange={(e) => setInputText(e.target.value)}
            />

            {showOutput && (
              <textarea
                rows="5"
                value={outputText}
                readOnly
                className="output-box"
                style={{ marginTop: '1rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              />
            )}

            <div className="card-actions">
              <button className="btn primary" onClick={handleTranslate}>Translate</button>
              <button className="btn ghost" onClick={handleClear}>Clear</button>
            </div>
          </div>
        </section>

        <section className="feature-grid" id="features">
          <article>
            <h3>Real tone control</h3>
            <p>Your words, Your tone, with no change in meaning</p>
          </article>
          <article>
            <h3>Natural phrasing</h3>
            <p>No robotic sentences, It reads like a local wrote it</p>
          </article>
          <article>
            <h3>Fast & steady</h3>
            <p>Results show in seconds, even on slow connections</p>
          </article>
        </section>

        <section className="pricing" id="pricing">
          <div className="pricing-header">
            <h2>Premium plans that scale with you</h2>
            <p>
              Start free, then upgrade when you want tone controls, saved phrases,
              and richer language nuance
            </p>
          </div>
          <div className="pricing-cards">
            <article className="pricing-card">
              <h3>Free</h3>
              <p className="price">$0</p>
              <p className="plan-note">Everyday translations and basic tone</p>
              <button className="btn ghost">Keep free</button>
            </article>
            <article className="pricing-card highlight">
              <span className="chip">Most popular</span>
              <h3>Premium</h3>
              <p className="price">
                $12<span>/mo</span>
              </p>
              <p className="plan-note">
                Pro tone controls, phrase library, and private history
              </p>
              <button className="btn primary">Go Premium</button>
            </article>
            <article className="pricing-card">
              <h3>Team</h3>
              <p className="price">
                $24<span>/mo</span>
              </p>
              <p className="plan-note">Shared glossaries and admin controls</p>
              <button className="btn ghost">Contact sales</button>
            </article>
          </div>
        </section>

        <section className="split" id="about">
          <div>
            <h2>Built for people, not prompts</h2>
            <p>
              We keep the interface simple so your focus stays on the message.
              Save favorite phrases, pin languages, and move on with your day
            </p>
          </div>
          <div className="note">
            <h4>Quick note</h4>
            <p>
              Your text is processed securely and never sold. We do not keep
              translations longer than you need
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Made with care for clear conversations</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;