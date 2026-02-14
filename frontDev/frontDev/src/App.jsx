import './App.css';

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">TB</div>
          <span className="brand-name">TongueBridge</span>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#demo">Try it</a>
          <a href="#about">About</a>
        </nav>
        <button className="btn ghost">Sign in</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">A translator that feels like a real person</p>
            <h1>Translate with tone, not just words.</h1>
            <p className="lead">
              TongueBridge helps you express exactly what you mean — clear, warm, and local.
              Perfect for everyday chats, work conversations, and travel moments
            </p>
            <div className="hero-actions">
              <button className="btn primary">Start translating</button>
              <button className="btn ghost">See examples</button>
            </div>
            <div className="badges">
              <span>120+ languages</span>
              <span>Context aware</span>
              <span>Privacy first</span>
            </div>
          </div>
          <div className="hero-card" id="demo">
            <div className="card-header">
              <span>Quick translate</span>
              <span className="status">Live</span>
            </div>
            <label className="field">
              <span>From</span>
              <select>
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </label>
            <label className="field">
              <span>To</span>
              <select>
                <option>Spanish</option>
                <option>English</option>
                <option>French</option>
              </select>
            </label>
            <textarea
              rows="5"
              placeholder="Type something natural..."
              defaultValue="Could you share the address?"
            />
            <div className="card-actions">
              <button className="btn primary">Translate</button>
              <button className="btn ghost">Clear</button>
            </div>
          </div>
        </section>

        <section className="feature-grid" id="features">
          <article>
            <h3>Real tone control</h3>
            <p>Choose casual, polite, or professional. The meaning stays true.</p>
          </article>
          <article>
            <h3>Natural phrasing</h3>
            <p>No robotic sentences. It reads like a local wrote it.</p>
          </article>
          <article>
            <h3>Fast & steady</h3>
            <p>Results show in seconds, even on slow connections.</p>
          </article>
        </section>

        <section className="split" id="about">
          <div>
            <h2>Built for people, not prompts</h2>
            <p>
              We keep the interface simple so your focus stays on the message.
              Save favorite phrases, pin languages, and move on with your day.
            </p>
          </div>
          <div className="note">
            <h4>Quick note</h4>
            <p>
              Your text is processed securely and never sold. We do not keep
              translations longer than you need.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Made with care for clear conversations.</p>
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