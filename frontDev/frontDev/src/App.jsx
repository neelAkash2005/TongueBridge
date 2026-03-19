import './App.css';
import logo from './assets/logo.png';
// Add your new imports here:
import Dev1 from './assets/Dev1.jpeg'; 
import Dev2 from './assets/Dev2.jpeg';
import Dev3 from './assets/Dev3.jpeg';
import Dev4 from './assets/Dev4.jpeg';
import Dev5 from './assets/Dev5.jpeg';
import Dev6 from './assets/Dev6.jpg';
import { useEffect, useState } from 'react';

// --- NEW: Team Data Array for 6 Developers ---
const teamMembers = [
  {
    name: "Akash Podder",
    role: "Full Stack Developer",
    image: Dev1, 
    github: "https://github.com/neelAkash2005",
    linkedin: "https://www.linkedin.com/in/akashpoddar10"
  },
  {
    name: "Developer Two",
    role: "Frontend Engineer",
    image: Dev2,
    github: "https://github.com/ankurmaji0010",
    linkedin: "https://www.linkedin.com/in/ankur-maji-939934281?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Developer Three",
    role: "Backend Engineer",
    image: Dev3, 
    github: "https://github.com/anurupamaitra",
    linkedin: "https://www.linkedin.com/in/anurupa-maitra-3a29a8282?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Developer Four",
    role: "UI/UX Designer",
    image: Dev4, 
    github: "https://github.com/ach-05",
    linkedin: "https://www.linkedin.com/in/ankita-chakraborty-09b271291?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Developer Five",
    role: "AI Integration",
    image: Dev5, 
    github: "https://github.com/pallz-hub",
    linkedin: "https://www.linkedin.com/in/akash-pal-a2473936a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Developer Six",
    role: "Project Manager",
    image: Dev6, 
    github: "https://github.com/Aniket12-coder",
    linkedin: "https://www.linkedin.com/in/aniket-sharma-b21324291/"
  }
];

// --- UPDATED: The Developers Page Component ---
function DevelopersSection() {
  return (
    <div className="developers-page" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <p className="eyebrow">The minds behind TongueBridge</p>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Meet the Developers
      </h1>
      <p className="lead" style={{ maxWidth: '600px', margin: '0 auto 4rem' }}>
        We are a passionate team of engineers dedicated to breaking down language barriers using modern web technologies and clean code.
      </p>

      {/* The flexWrap: 'wrap' here makes sure the 6 members naturally form a grid! */}
      <div className="feature-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        {teamMembers.map((member, index) => (
          <article key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minWidth: '280px', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
            
            {/* Developer Image */}
            <div style={{ padding: '4px', background: 'var(--accent-gradient)', borderRadius: '50%' }}>
              <img 
                src={member.image} 
                alt={member.name} 
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', display: 'block', border: '4px solid var(--bg-secondary)' }}
              />
            </div>

            {/* Developer Info */}
            <div>
              <h3 style={{ marginBottom: '0.2rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{member.role}</p>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
              <a href={member.github} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="note" style={{ marginTop: '4rem', display: 'inline-block', textAlign: 'left' }}>
        <h4>Want to collaborate?</h4>
        <p>We are always open to feedback and collaboration. Check out our GitHub repositories above!</p>
      </div>
    </div>
  );
}

function App() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const [activePage, setActivePage] = useState('home');

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

  const handleTranslate = () => {
    if (inputText.trim() === '') return;
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
            onClick={() => setActivePage('home')} 
            aria-label="Go to home"
          >
            <div className="brand-mark">
              <img src={logo} alt="TongueBridge logo" />
            </div>
            <span className="brand-name">TongueBridge</span>
          </button>
          
          <nav className="nav">
            <a href="#features" onClick={() => setActivePage('home')}>
              Explore Features
            </a>
            <a href="#about" onClick={() => setActivePage('home')}>
              About
            </a>
            
            <a 
              href="#developers" 
              onClick={(e) => {
                e.preventDefault(); 
                setActivePage('developers'); 
              }}
              style={{ color: activePage === 'developers' ? 'var(--accent)' : '' }}
            >
               Developers
            </a>

            <a href="#contact-us" onClick={() => setActivePage('home')}>
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
        {activePage === 'home' ? (
          <>
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
          </>
        ) : (
          <DevelopersSection />
        )}
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