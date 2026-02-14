import './App.css';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">
            <img src={logo} alt="TongueBridge logo" />
          </div>

          <span className="brand-name">TongueBridge</span>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <button className="btn ghost">Sign in</button>
          <button className="btn primary">Go Premium</button>
        </div>
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

        <section className="pricing" id="pricing">
          <div className="pricing-header">
            <h2>Premium plans that scale with you</h2>
            <p>
              Start free, then upgrade when you want tone controls, saved phrases,
              and richer language nuance.
            </p>
          </div>
          <div className="pricing-cards">
            <article className="pricing-card">
              <h3>Free</h3>
              <p className="price">$0</p>
              <p className="plan-note">Everyday translations and basic tone.</p>
              <button className="btn ghost">Keep free</button>
            </article>
            <article className="pricing-card highlight">
              <span className="chip">Most popular</span>
              <h3>Premium</h3>
              <p className="price">
                $12<span>/mo</span>
              </p>
              <p className="plan-note">
                Pro tone controls, phrase library, and private history.
              </p>
              <button className="btn primary">Go Premium</button>
            </article>
            <article className="pricing-card">
              <h3>Team</h3>
              <p className="price">
                $24<span>/mo</span>
              </p>
              <p className="plan-note">Shared glossaries and admin controls.</p>
              <button className="btn ghost">Contact sales</button>
            </article>
          </div>
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