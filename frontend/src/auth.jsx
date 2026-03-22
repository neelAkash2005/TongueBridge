import { useEffect, useState } from 'react';

const USERS_STORAGE_KEY = 'tb_users';

const COUNTRY_OPTIONS = [
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+81', name: 'Japan' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+55', name: 'Brazil' },
  { code: '+971', name: 'United Arab Emirates' },
  { code: '+65', name: 'Singapore' },
];

function readUsers() {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function hasRegisteredUsers() {
  return readUsers().length > 0;
}

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const STRONG_PASSWORD_SUGGESTIONS = [
  'Sky!River9Moon#',
  'Tiger@Forest42!',
  'Neon$Bridge7Wave',
  'Mango#Cloud81*',
  'Nova!Stone6Leaf$',
];

function getStrongPasswordSuggestion(password) {
  const hash = [...password].reduce((total, char) => total + char.charCodeAt(0), 0);
  const index = hash % STRONG_PASSWORD_SUGGESTIONS.length;
  return STRONG_PASSWORD_SUGGESTIONS[index];
}

function evaluatePasswordStrength(password) {
  if (!password) {
    return {
      level: '',
      message: '',
      suggestion: '',
    };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 3) {
    return {
      level: 'weak',
      message: 'Password is too weak. Make it strong.',
      suggestion: `Try: ${getStrongPasswordSuggestion(password)}`,
    };
  }

  if (score <= 5) {
    return {
      level: 'moderate',
      message: 'Password is moderate. Make it strong with more variety.',
      suggestion: `Try: ${getStrongPasswordSuggestion(password)}`,
    };
  }

  return {
    level: 'strong',
    message: 'Strong password.',
    suggestion: '',
  };
}

export function signUpUser(formData) {
  const firstName = formData.firstName.trim();
  const lastName = formData.lastName.trim();
  const email = formData.email.trim();
  const country = formData.country.trim();
  const username = formData.username.trim();
  const password = formData.password;

  if (!firstName || !lastName || !email || !country || !username || !password) {
    return { ok: false, message: 'Please fill in all fields.' };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  const users = readUsers();
  const usernameExists = users.some(
    (user) => normalizeValue(user.username) === normalizeValue(username),
  );

  if (usernameExists) {
    return { ok: false, message: 'Username already exists.' };
  }

  const emailExists = users.some(
    (user) => normalizeValue(user.email) === normalizeValue(email),
  );

  if (emailExists) {
    return { ok: false, message: 'Email already exists.' };
  }

  users.push({
    firstName,
    lastName,
    email,
    country,
    username,
    password,
  });

  writeUsers(users);

  return {
    ok: true,
    message: 'Sign up successful. Please log in.',
    username,
  };
}

export function loginUser(username, password) {
  const normalizedUsername = username.trim();
  const users = readUsers();

  if (users.length === 0) {
    return { ok: false, message: 'Please sign up first.' };
  }

  const foundUser = users.find(
    (user) => normalizeValue(user.username) === normalizeValue(normalizedUsername),
  );

  if (!foundUser) {
    return { ok: false, message: 'Wrong username.' };
  }

  if (foundUser.password !== password) {
    return { ok: false, message: 'Wrong password.' };
  }

  return { ok: true, username: foundUser.username, email: foundUser.email };
}

function emptySignUpForm() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    country: COUNTRY_OPTIONS[0].name,
    username: '',
    password: '',
  };
}

export default function AuthPanel({ initialMode, onClose, onLoginSuccess, onSignUpSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState('');
  const [signUpForm, setSignUpForm] = useState(emptySignUpForm);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const passwordStrength = evaluatePasswordStrength(signUpForm.password);

  useEffect(() => {
    setMode(initialMode);
    if (initialMode === 'login' && !hasRegisteredUsers()) {
      setMessage('Please sign up first.');
      return;
    }

    setMessage('');
  }, [initialMode]);

  const switchMode = (nextMode) => {
    setMode(nextMode);

    if (nextMode === 'login' && !hasRegisteredUsers()) {
      setMessage('Please sign up first.');
      return;
    }

    setMessage('');
  };

  const openLoginMode = (nextMessage = '') => {
    setMode('login');
    setMessage(nextMessage);
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitSignUp = () => {
    if (!signUpForm.firstName.trim() || !signUpForm.lastName.trim() || !signUpForm.email.trim() || !signUpForm.country.trim() || !signUpForm.username.trim() || !signUpForm.password) {
      setMessage('Please fill in all fields first.');
      return;
    }

    const result = signUpUser(signUpForm);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setLoginForm({ username: result.username, password: '' });
    setSignUpForm(emptySignUpForm());
    if (onSignUpSuccess) {
      onSignUpSuccess(result.username);
    }
    openLoginMode('Sign up successful. Please log in.');
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    submitSignUp();
  };

  const submitLogin = () => {
    if (!loginForm.username.trim()) {
      setMessage('Wrong username.');
      return;
    }

    if (!loginForm.password) {
      setMessage('Wrong password.');
      return;
    }

    const result = loginUser(loginForm.username, loginForm.password);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setMessage('');
    onLoginSuccess(result.username, result.email);
    onClose();
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    submitLogin();
  };

  return (
    <div className="auth-shell" role="dialog" aria-modal="true" aria-label="Authentication panel">
      <div className="auth-panel">
        <div className="auth-panel-header">
          <div>
            <p className="auth-kicker">TongueBridge</p>
            <h2>{mode === 'signup' ? 'Create your account' : 'Log in to continue'}</h2>
          </div>
          <button className="auth-close" type="button" onClick={onClose} aria-label="Close auth panel">
            ×
          </button>
        </div>

        {message ? <p className="auth-message">{message}</p> : null}

        {mode === 'signup' ? (
          <form className="auth-form" onSubmit={handleSignUpSubmit}>
            <div className="auth-grid">
              <label className="auth-field">
                <span>First Name</span>
                <input name="firstName" value={signUpForm.firstName} onChange={handleSignUpChange} type="text" />
              </label>

              <label className="auth-field">
                <span>Last Name</span>
                <input name="lastName" value={signUpForm.lastName} onChange={handleSignUpChange} type="text" />
              </label>

              <label className="auth-field auth-field-full">
                <span>Email</span>
                <input name="email" value={signUpForm.email} onChange={handleSignUpChange} type="email" />
              </label>

              <label className="auth-field auth-field-full">
                <span>Country</span>
                <select name="country" value={signUpForm.country} onChange={handleSignUpChange}>
                  {COUNTRY_OPTIONS.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth-field auth-field-full">
                <span>Username</span>
                <input name="username" value={signUpForm.username} onChange={handleSignUpChange} type="text" />
              </label>

              <label className="auth-field auth-field-full">
                <span>Password</span>
                <input
                  className={`auth-password-input ${passwordStrength.level ? `auth-password-${passwordStrength.level}` : ''}`}
                  name="password"
                  value={signUpForm.password}
                  onChange={handleSignUpChange}
                  type="password"
                />
                {passwordStrength.message ? (
                  <p className={`auth-password-feedback auth-password-feedback-${passwordStrength.level}`}>
                    {passwordStrength.message}
                  </p>
                ) : null}
                {passwordStrength.suggestion ? (
                  <p className="auth-password-suggestion">Suggested strong password: {passwordStrength.suggestion}</p>
                ) : null}
              </label>
            </div>

            <div className="auth-actions">
              <button className="btn primary" type="button" onClick={submitSignUp}>
                Sign Up
              </button>
              <button className="btn ghost" type="button" onClick={() => openLoginMode(hasRegisteredUsers() ? '' : 'Please sign up first.')}>
                Already have an account
              </button>
            </div>

            <p className="auth-note">We never share your information</p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <label className="auth-field auth-field-full">
              <span>Username</span>
              <input name="username" value={loginForm.username} onChange={handleLoginChange} type="text" />
            </label>

            <label className="auth-field auth-field-full">
              <span>Password</span>
              <input name="password" value={loginForm.password} onChange={handleLoginChange} type="password" />
            </label>

            <div className="auth-actions">
              <button className="btn primary" type="button" onClick={submitLogin}>
                Log In
              </button>
              <button className="btn ghost" type="button" onClick={() => switchMode('signup')}>
                Create account
              </button>
            </div>

            <p className="auth-note">By continuing you agree to our Terms and Privacy</p>
          </form>
        )}
      </div>
    </div>
  );
}
