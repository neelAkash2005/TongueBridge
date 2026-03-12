import './App.css';
import logo from './assets/logo.png';
import { useEffect, useState } from 'react';
import AuthPanel from './auth.jsx';

function App() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const goToPricing = () => {
    document.getElementById( 'pricing')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const [inputText, setInputText] = useState(''); 
  const [outputText, setOutputText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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

  const openSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleSignOut = () => {
    setLoggedInUsername('');
  };

  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    const subject = encodeURIComponent(contactSubject.trim() || 'Problem Report – TongueBridge');
    const body = encodeURIComponent(contactMessage.trim());
    window.location.href = `mailto:support@tonguebridge.com?subject=${subject}&body=${body}`;
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
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.6"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Explore Features
            <div className="nav-dropdown">
              <div className="nav-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
                <span>Real Tone Control</span>
              </div>
              <div className="nav-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
                </svg>
                <span>Natural Phrasing</span>
              </div>
              <div className="nav-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
                </svg>
                <span>Fast & Steady Performance</span>
              </div>
            </div>
          </a>
          <a href="#about" className="about-link">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
            </svg>
            About
            <div className="nav-dropdown">
              <div className="nav-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                <span>Our Mission</span>
              </div>
              <div className="nav-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L1 21H23L12 2ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor"/>
                </svg>
                <span>Built for People</span>
              </div>
              <div className="nav-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="currentColor"/>
                </svg>
                <span>Privacy First</span>
              </div>
            </div>
          </a>
          <a href="#contact-us" className="contact-link">
            <svg className="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
            Contact Us
            <div className="contact-dropdown">
              <div className="contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                </svg>
                <a href="mailto:support@tonguebridge.com" style={{ color: "inherit", textDecoration: "none" }}>support@tonguebridge.com</a>
              </div>
              <div className="contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
                <span>Kolkata, India</span>
              </div>
            </div>
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

            {loggedInUsername ? (
              <>
                <span className="auth-user">{loggedInUsername}</span>
                <button className="btn ghost" onClick={handleSignOut} type="button">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="btn ghost" onClick={openLogin} type="button">
                  Log In
                </button>
                <button className="btn primary" onClick={openSignUp} type="button">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {isAuthOpen ? (
        <AuthPanel
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={setLoggedInUsername}
        />
      ) : null}

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
              <button className="btn primary" onClick={goToPricing}>
                Go Premium
              </button>
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

  <div className="footer-contact-section">
    <h3 className="footer-contact-title">Report a Problem</h3>
    <p className="footer-contact-desc">
      Something not working? Send us a message and we&apos;ll get back to you.
    </p>
    <form className="footer-contact-form" onSubmit={handleContactSubmit}>
      <input
        type="text"
        className="footer-contact-input"
        placeholder="Subject (optional)"
        value={contactSubject}
        onChange={(e) => setContactSubject(e.target.value)}
      />
      <textarea
        className="footer-contact-textarea"
        rows="4"
        placeholder="Describe your problem..."
        value={contactMessage}
        onChange={(e) => setContactMessage(e.target.value)}
        required
      />
      <button type="submit" className="btn primary footer-contact-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
        </svg>
        Send via Email
      </button>
    </form>
  </div>

  <div className="footer-contact-divider" />

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingTop: "3.7rem",
      marginTop: "2.5rem",
      borderTop: "2px solid rgba(15, 18, 33, 0.1)"
    }}
  >

    {/* Left */}
    <div>
      Made with care for clear conversations
    </div>

    {/* Center */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
      }}
    >
      <span>Follow us on</span>

      <div
        style={{
          display: "flex",
          gap: "22px",
          fontSize: "21px"
        }}
      >
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin-in"></i>
      </div>
    </div>

    {/* Right */}
    <div style={{ display: "flex", gap: "50px" }}>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="mailto:support@tonguebridge.com">Contact</a>
    </div>

  </div>

</footer>
    </div>
  );
}

export default App;