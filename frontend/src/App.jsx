import './App.css';
import logo from './assets/logo.png';
// Add your new imports here:
import Dev1 from './assets/Dev1.jpeg'; 
import Dev2 from './assets/Dev2.jpeg';
import Dev3 from './assets/Dev3.jpeg';
import Dev4 from './assets/Dev4.jpeg';
import Dev5 from './assets/Dev5.jpeg';
import Dev6 from './assets/Dev6.jpg';
import phonepeLogo from './assets/PhonePay.svg';
import googlePayLogo from './assets/googlepay.svg';
import bhimLogo from './assets/bhim.svg';
import { useEffect, useRef, useState } from 'react';
import FreePlanTools from './FreePlanTools.jsx';
import PremiumPage from './PremiumPage.jsx';
import TeamPage from './TeamPage.jsx';
import { SOURCE_LANGUAGES, getTargetLanguages } from './supportedLanguagePairs.js';

// --- NEW: Team Data Array for 6 Developers ---
const teamMembers = [
  {
    name: "Akash Poddar",
    role: "Project Lead",
    image: Dev1, 
    github: "https://github.com/neelAkash2005",
    linkedin: "https://www.linkedin.com/in/akashpoddar10"
  },
  {
    name: "Ankur Maji",
    image: Dev2,
    github: "https://github.com/ankurmaji0010",
    linkedin: "https://www.linkedin.com/in/ankur-maji-939934281?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Anurupa Maitra",
    image: Dev3, 
    github: "https://github.com/anurupamaitra",
    linkedin: "https://www.linkedin.com/in/anurupa-maitra-3a29a8282?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Ankita Chakraborty",
    image: Dev4, 
    github: "https://github.com/ach-05",
    linkedin: "https://www.linkedin.com/in/ankita-chakraborty-09b271291?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Akash Pal",
    image: Dev5, 
    github: "https://github.com/pallz-hub",
    linkedin: "https://www.linkedin.com/in/akash-pal-a2473936a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Aniket Sharma",
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
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(90deg, #f5f5f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 20px rgba(255, 138, 61, 0.4)' }}>
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
            <div style={{ padding: '4px', background: 'var(--accent-gradient)', borderRadius: '60%', overflow: 'hidden' }}>
              <img 
                src={member.image} 
                alt={member.name} 
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.3)', display: 'block', border: '4px solid var(--bg-secondary)' }}
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
        <p>We are always open to feedback and collaboration. Check out our GitHub repositories above !</p>
      </div>
    </div>
  );
}
import AuthPanel from './auth.jsx';

function App() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Spanish');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const [activePage, setActivePage] = useState('home');

  const goToPricing = () => {
    document.getElementById( 'pricing')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const goToContactSection = () => {
    document.getElementById('contact-us')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const goToTranslateSection = () => {
    document.getElementById('translate-tone')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const goToHomeTop = () => {
    setActivePage('home');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [inputText, setInputText] = useState(''); 
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOutputMicListening, setIsOutputMicListening] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [homeHistory, setHomeHistory] = useState([]);
  const [showHomeHistorySidebar, setShowHomeHistorySidebar] = useState(false);
  const [freeToolsResetTrigger, setFreeToolsResetTrigger] = useState(0);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [pendingPlanPage, setPendingPlanPage] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [showPaymentMethodsScreen, setShowPaymentMethodsScreen] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showUpiOptions, setShowUpiOptions] = useState(false);
  const [showRedeemPanel, setShowRedeemPanel] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardCountry, setCardCountry] = useState('');
  const [cardState, setCardState] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [giftCardFileName, setGiftCardFileName] = useState('');
  const [netBank, setNetBank] = useState('');
  const [walletProvider, setWalletProvider] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const giftCardInputRef = useRef(null);

  const upiApps = [
    { name: 'PhonePe', key: 'phonepe', logo: phonepeLogo, icon: 'अ' },
    { name: 'Google Pay', key: 'gpay', logo: googlePayLogo, icon: 'G' },
    { name: 'BHIM', key: 'bhim', logo: bhimLogo, icon: 'भी' },
    { name: 'Enter UPI ID', key: 'upiid', logo: null, icon: '+' },
  ];

  const selectedUpiAppDetails = upiApps.find((appItem) => appItem.name === selectedUpiApp) || upiApps[0];

  const planDetails = {
    premium: {
      title: 'Premium Plan',
      price: '₹249/mo',
      features: [
        'Unlimited text and audio translations',
        'Tone-preserving translation engine',
        'Document and website translation',
        'Image-to-text translation without limits',
      ],
    },
    team: {
      title: 'Team Plan',
      price: '₹999/mo',
      features: [
        'Up to 6 members on one workspace',
        'Shared translation history and activity',
        'Priority processing and team performance',
        'All Premium features included',
      ],
    },
  };

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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

      setHomeHistory((previousHistory) => [
        {
          id: Date.now(),
          input: inputText,
          output: result,
          fromLang,
          toLang,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        },
        ...previousHistory.slice(0, 49),
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

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
    setIsOutputMicListening(false);
    setShowOutput(false);
    setFreeToolsResetTrigger((previous) => previous + 1);
  };

  const handleDeleteHomeHistory = () => {
    if (window.confirm('Are you sure you want to delete all history?')) {
      setHomeHistory([]);
    }
  };

  const loadFromHomeHistory = (item) => {
    setFromLang(item.fromLang);
    setToLang(item.toLang);
    setInputText(item.input);
    setOutputText(item.output);
    setShowOutput(true);
    setShowHomeHistorySidebar(false);
  };

  const openPaymentForPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentMethodsScreen(false);
    setShowCardForm(false);
    setShowUpiOptions(false);
    setShowRedeemPanel(false);
    setPaymentMethod('card');
    setSelectedUpiApp('PhonePe');
    setUpiId('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setCardCountry('');
    setCardState('');
    setRedeemCode('');
    setGiftCardFileName('');
    setNetBank('');
    setWalletProvider('');
    setIsPaymentOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentOpen(false);
    setShowPaymentMethodsScreen(false);
    setShowCardForm(false);
    setShowUpiOptions(false);
    setShowRedeemPanel(false);
    setSelectedPlan(null);
  };

  const handlePaymentSuccess = () => {
    if (!selectedPlan) return;

    if (paymentMethod === 'upi') {
      if (selectedUpiApp === 'Enter UPI ID' && !upiId.trim()) {
        window.alert('Please enter your UPI ID.');
        return;
      }

      if (!upiId.trim() && !selectedUpiApp) {
        window.alert('Please enter your UPI ID or choose a UPI app.');
        return;
      }
    }

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim() || !cardCountry || !cardState) {
        window.alert('Please complete all card details.');
        return;
      }
    }

    if (paymentMethod === 'netbanking' && !netBank) {
      window.alert('Please select a bank for net banking.');
      return;
    }

    if (paymentMethod === 'wallet' && !walletProvider) {
      window.alert('Please select a wallet provider.');
      return;
    }

    const planLabel = selectedPlan === 'premium' ? 'Premium' : 'Team';
    window.alert(`${planLabel} payment successful.`);
    setIsPaymentOpen(false);
    setActivePage(selectedPlan);
    setSelectedPlan(null);
    setShowCardForm(false);
    setShowUpiOptions(false);
    setShowRedeemPanel(false);
    setPendingPlanPage(null);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleProtectedPlanOpen = (targetPage) => {
    if (loggedInUsername) {
      openPaymentForPlan(targetPage);
      return;
    }

    setPendingPlanPage(targetPage);
    window.alert('Please log in or sign up first to continue.');
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (username, email) => {
    setLoggedInUsername(username);
    setLoggedInEmail(email || '');
    setIsAuthOpen(false);
    window.alert(`Logged in successfully as ${username}.`);
    if (pendingPlanPage) {
      openPaymentForPlan(pendingPlanPage);
      setPendingPlanPage(null);
    }
  };

  const handleSignUpSuccess = (username) => {
    window.alert(`Sign up successful for ${username}. Please log in.`);
  };

  const openLearnMore = () => {
  setIsLearnMoreOpen(true);
  };

const closeLearnMore = () => {
  setIsLearnMoreOpen(false);
  };

  const openPrivacyPolicy = () => {
    setActiveLegalModal('privacy');
  };

  const openTerms = () => {
    setActiveLegalModal('terms');
  };

  const closeLegalModal = () => {
    setActiveLegalModal(null);
  };

  const handleSignOut = () => {
    window.alert('Signed out successfully.');
    setLoggedInUsername('');
    setLoggedInEmail('');
    setActivePage('home');
    setPendingPlanPage(null);
    setIsPaymentOpen(false);
    setShowPaymentMethodsScreen(false);
    setShowCardForm(false);
    setShowUpiOptions(false);
    setShowRedeemPanel(false);
    setSelectedPlan(null);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((previous) => !previous);
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
    try {
      const savedHistory = localStorage.getItem('homeTranslationHistory');
      if (savedHistory) {
        setHomeHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load home history:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('homeTranslationHistory', JSON.stringify(homeHistory));
    } catch (error) {
      console.error('Failed to save home history:', error);
    }
  }, [homeHistory]);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="app">

      <header className="site-header">
        <div className="header-container">

          <button className="brand brand-button"
            type="button"
            onClick={goToHomeTop}
            aria-label="Go to home"
          >
            <div className="brand-mark">
              <img src={logo} alt="TongueBridge logo" />
            </div>
            <span className="brand-name">TongueBridge</span>
          </button>
          
          <nav className="nav">
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('features');
              goToPricing();
            }}
            style={{ color: activePage === 'features' ? 'var(--accent)' : '' }}
            className="features-link"
          >
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
          <a
            href="#translate-tone"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('about');
              goToTranslateSection();
            }}
            style={{ color: activePage === 'about' ? 'var(--accent)' : '' }}
            className="about-link"
          >
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
            
            <a 
              href="#developers" 
              onClick={(e) => {
                e.preventDefault(); 
                setActivePage('developers'); 
              }}
              style={{ color: activePage === 'developers' ? 'var(--accent)' : '' }}
              className="developers-link"
            >
              <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
              </svg>
              Developers
            </a>

          <a
            href="#contact-us"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('contact');
              goToContactSection();
            }}
            style={{ color: activePage === 'contact' ? 'var(--accent)' : '' }}
            className="contact-link"
          >
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            {loggedInUsername ? (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  className="auth-user-trigger"
                  onClick={toggleUserMenu}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <span className="user-symbol">👤</span>
                  <span className="auth-user">{loggedInUsername}</span>
                  <span className="user-caret">▾</span>
                </button>

                {isUserMenuOpen ? (
                  <div className="user-dropdown" role="menu">
                    <button
                      className="user-dropdown-item"
                      type="button"
                      onClick={() => {
                        setActivePage('home');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Home
                    </button>
                    <button
                      className="user-dropdown-item"
                      type="button"
                      onClick={() => {
                        setActivePage('home');
                        goToPricing();
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Billing & Plans
                    </button>
                    <button
                      className="user-dropdown-item"
                      type="button"
                      onClick={() => {
                        openLearnMore();
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Help Center
                    </button>
                    <button
                      className="user-dropdown-item"
                      type="button"
                      onClick={() => {
                        setActivePage('home');
                        goToContactSection();
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Contact Support
                    </button>
                    <button className="user-dropdown-item signout" onClick={handleSignOut} type="button">
                      Sign Out
                    </button>
                  </div>
                ) : null}
              </div>
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
          onLoginSuccess={handleLoginSuccess}
          onSignUpSuccess={handleSignUpSuccess}
        />
      ) : null}

      {isPaymentOpen && selectedPlan ? (
        <div className="payment-overlay">
          {!showPaymentMethodsScreen ? (
            <div className="payment-box">
              <button className="payment-close-btn" onClick={closePaymentModal} type="button">✖</button>
              <h2>Secure Checkout</h2>
              <p className="payment-description">
                Complete your payment to activate <strong>{planDetails[selectedPlan].title}</strong>.
              </p>

              <div className="payment-plan-row">
                <div>
                  <span className="payment-plan-name">{planDetails[selectedPlan].title}</span>
                  <p className="payment-plan-sub">Billed monthly • Cancel anytime</p>
                </div>
                <strong>{planDetails[selectedPlan].price}</strong>
              </div>

              <div className="payment-features">
                <h4>Included in this plan</h4>
                <ul>
                  {planDetails[selectedPlan].features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <button
                className="btn primary payment-subscribe-btn"
                type="button"
                onClick={() => {
                  setShowPaymentMethodsScreen(true);
                  setPaymentMethod('upi');
                  setShowCardForm(false);
                  setShowUpiOptions(false);
                  setShowRedeemPanel(false);
                  setSelectedUpiApp('PhonePe');
                }}
              >
                Subscribe now
              </button>
            </div>
          ) : (
            <div className="payment-mobile-screen" role="dialog" aria-label="Payment methods">
              <header className="payment-mobile-header">
                <button
                  className="payment-mobile-back"
                  type="button"
                  onClick={() => setShowPaymentMethodsScreen(false)}
                  aria-label="Back"
                >
                  ←
                </button>
                <div className="payment-mobile-header-text">
                  <h3>Payment methods</h3>
                  <p>{loggedInUsername.includes('@') ? loggedInUsername : `${loggedInUsername || 'user'}@tonguebridge.com`}</p>
                </div>
              </header>

              <section className="payment-mobile-section">
                <button className="payment-mobile-row selected" type="button">
                  <span className="payment-row-left">
                    <span className="payment-row-icon app-logo-image">
                      {selectedUpiAppDetails.logo ? (
                        <img src={selectedUpiAppDetails.logo} alt={selectedUpiAppDetails.name} className="payment-app-logo-img" />
                      ) : (
                        <span className="app-mark app-mark-upiid">+</span>
                      )}
                    </span>
                    <span className="payment-row-text">UPI: {selectedUpiApp || 'PhonePe'}</span>
                  </span>
                  <span className="payment-row-right">✓</span>
                </button>

                <div className="payment-mobile-row disabled" aria-disabled="true">
                  <span className="payment-row-left">
                    <span className="payment-row-icon muted">◌</span>
                    <span className="payment-row-text">Pay with any UPI app</span>
                  </span>
                </div>
              </section>

              <div className="payment-mobile-divider" />

              <section className="payment-mobile-section">
                <p className="payment-mobile-title">Add payment method to your Google Account</p>

                <button
                  className={`payment-mobile-row ${showCardForm ? 'active' : ''}`}
                  type="button"
                  onClick={() => {
                    setPaymentMethod('card');
                    setShowUpiOptions(false);
                    setShowRedeemPanel(false);
                    setShowCardForm((previous) => !previous);
                  }}
                >
                  <span className="payment-row-left">
                    <span className="payment-row-icon card">💳</span>
                    <span className="payment-row-text">Add card</span>
                  </span>
                  <span className="payment-row-right cards-with-more">
                    <span className="mini-card-chip visa-chip" aria-label="Visa">
                      <span className="visa-word">VISA</span>
                    </span>
                    <span className="mini-card-chip mc-chip" aria-label="Mastercard">
                      <span className="mc-circles" aria-hidden="true">
                        <span className="mc-left" />
                        <span className="mc-right" />
                      </span>
                    </span>
                    <span className="mini-card-chip rupay-chip" aria-label="RuPay">
                      <span className="rupay-word">RuPay</span>
                    </span>
                    <button
                      className="mini-card-more"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPaymentMethod('card');
                        setShowUpiOptions(false);
                        setShowRedeemPanel(false);
                        setShowCardForm(true);
                      }}
                    >
                      +more
                    </button>
                  </span>
                </button>

                {showCardForm ? (
                  <div className="payment-card-form">
                    <p className="payment-card-required">All fields required</p>
                    <div className="payment-card-fields-grid">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        placeholder="Card number"
                      />
                      <input
                        type="text"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)}
                        placeholder="Card holder name"
                      />
                      <div className="payment-card-inline-fields">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(event) => setCardExpiry(event.target.value)}
                          placeholder="MM/YY"
                        />
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(event) => setCardCvv(event.target.value)}
                          placeholder="CVV"
                        />
                      </div>
                      <select value={cardCountry} onChange={(event) => setCardCountry(event.target.value)}>
                        <option value="">Country/Region</option>
                        <option value="india">India</option>
                        <option value="united-states">United States</option>
                        <option value="united-kingdom">United Kingdom</option>
                        <option value="australia">Australia</option>
                      </select>
                      <select value={cardState} onChange={(event) => setCardState(event.target.value)}>
                        <option value="">State</option>
                        <option value="west-bengal">West Bengal</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="delhi">Delhi</option>
                      </select>
                    </div>
                    <p className="payment-card-terms">
                      By continuing, you agree to the Google Payments <span className="payment-terms-link">Terms of Service</span> and acknowledge the applicable privacy notice.
                    </p>
                    <button className="btn primary payment-card-continue" type="button" onClick={handlePaymentSuccess}>
                      Continue
                    </button>
                  </div>
                ) : null}

                <button
                  className={`payment-mobile-row ${showUpiOptions ? 'active' : ''}`}
                  type="button"
                  onClick={() => {
                    setPaymentMethod('upi');
                    setShowCardForm(false);
                    setShowRedeemPanel(false);
                    setShowUpiOptions((previous) => !previous);
                  }}
                >
                  <span className="payment-row-left">
                    <span className="payment-row-icon upi">UPI</span>
                    <span>
                      <span className="payment-row-text">Pay with UPI</span>
                      <span className="payment-row-sub">Offers available from select UPI apps</span>
                    </span>
                  </span>
                  <span className="payment-row-chevron" aria-hidden="true">{showUpiOptions ? '^' : '>'}</span>
                </button>

                {showUpiOptions ? (
                  <div className="payment-upi-app-list" role="list">
                    {upiApps.map((appItem) => (
                      <button
                        key={appItem.name}
                        className={`payment-mobile-row payment-upi-app-row ${selectedUpiApp === appItem.name ? 'active' : ''}`}
                        type="button"
                        onClick={() => {
                          if (appItem.name === 'Enter UPI ID') {
                            setSelectedUpiApp((previous) => (previous === 'Enter UPI ID' ? '' : 'Enter UPI ID'));
                            return;
                          }

                          setSelectedUpiApp(appItem.name);
                        }}
                      >
                        <span className="payment-row-left">
                          <span className={`payment-row-icon app-logo-image app-${appItem.key}`}>
                            {appItem.logo ? (
                              <img src={appItem.logo} alt={appItem.name} className="payment-app-logo-img" />
                            ) : (
                              <span className={`app-mark app-mark-${appItem.key}`}>{appItem.icon}</span>
                            )}
                          </span>
                          <span className="payment-row-text">{appItem.name}</span>
                        </span>
                      </button>
                    ))}

                    {selectedUpiApp === 'Enter UPI ID' ? (
                      <div className="payment-upi-input-box" role="group" aria-label="Enter UPI ID">
                        <label htmlFor="upi-id-input">Enter UPI ID</label>
                        <input
                          id="upi-id-input"
                          type="text"
                          value={upiId}
                          onChange={(event) => setUpiId(event.target.value)}
                          placeholder="example@upi"
                        />
                        <p className="payment-upi-process-title">Processing</p>
                        <ol className="payment-upi-process-list">
                          <li>Enter your UPI ID correctly.</li>
                          <li>Tap Continue to trigger payment request.</li>
                          <li>Approve the request in your UPI app.</li>
                        </ol>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </section>

              <div className="payment-mobile-divider" />

              <section className="payment-mobile-section">
                <button
                  className={`payment-mobile-row ${showRedeemPanel ? 'active' : ''}`}
                  type="button"
                  onClick={() => {
                    setShowCardForm(false);
                    setShowUpiOptions(false);
                    setShowRedeemPanel((previous) => !previous);
                  }}
                >
                  <span className="payment-row-left">
                    <span className="payment-row-icon redeem">#</span>
                    <span className="payment-row-text">Redeem code</span>
                  </span>
                  <span className="payment-row-chevron" aria-hidden="true">{showRedeemPanel ? '^' : '>'}</span>
                </button>

                {showRedeemPanel ? (
                  <div className="payment-redeem-box" role="group" aria-label="Redeem code panel">
                    <label htmlFor="redeem-email">Email</label>
                    <input
                      id="redeem-email"
                      type="email"
                      value={loggedInEmail}
                      readOnly
                      placeholder="you@example.com"
                    />

                    <label htmlFor="redeem-code">Enter code</label>
                    <input
                      id="redeem-code"
                      type="text"
                      value={redeemCode}
                      onChange={(event) => setRedeemCode(event.target.value)}
                      placeholder="Gift card or promo code"
                    />

                    <button
                      className="payment-scan-gift"
                      type="button"
                      onClick={() => giftCardInputRef.current?.click()}
                    >
                      Scan gift card
                    </button>
                    <input
                      ref={giftCardInputRef}
                      type="file"
                      accept="image/*"
                      className="payment-hidden-file-input"
                      onChange={(event) => {
                        const selectedFile = event.target.files?.[0];
                        setGiftCardFileName(selectedFile ? selectedFile.name : '');
                      }}
                    />

                    {giftCardFileName ? (
                      <p className="payment-selected-file">Selected image: {giftCardFileName}</p>
                    ) : null}

                    <p className="payment-redeem-note">
                      By tapping <strong>Redeem</strong>, you agree to the gift card &amp; promotional Code <span className="payment-terms-link">Terms and Condition</span>, as applicable.
                    </p>
                  </div>
                ) : null}
              </section>

              <div className="payment-mobile-divider" />

              <section className="payment-mobile-section">
                <div className="payment-mobile-row disabled" aria-disabled="true">
                  <span className="payment-row-left">
                    <span className="payment-row-icon muted">👥</span>
                    <span>
                      <span className="payment-row-text">Ask someone else to pay</span>
                      <span className="payment-row-sub">Unavailable for subscriptions</span>
                    </span>
                  </span>
                </div>
              </section>

              {paymentMethod ? (
                <section className="payment-mobile-section payment-price-section">
                  <div className="payment-price-card">
                    <p className="payment-price-label">Selected payment method: {paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Wallet'}</p>
                    <button className="btn primary payment-price-pay-btn" type="button" onClick={handlePaymentSuccess}>
                      Pay {planDetails[selectedPlan].price}
                    </button>
                  </div>
                </section>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {isLearnMoreOpen ? (
  <div className="learnmore-overlay">
    <div className="learnmore-box">
      
      <button className="close-btn" onClick={closeLearnMore}>✖</button>

      <h2>🌐 What is TongueBridge?</h2>
      <p>
      TongueBridge is an intelligent translation platform designed to go beyond basic word conversion. It helps users translate language with real tone, context awareness, and natural human-like phrasing, making communication more meaningful and accurate.
      <br /> Unlike traditional translators, TongueBridge focuses on how something is said, not just what is said.  
      </p> <br /><br />

      <h2>🤔 Why use TongueBridge?</h2>
      <p>
      Most translation tools only focus on literal accuracy. But real communication depends on tone, intent, and context.

      TongueBridge solves this by:
      
      <ul>
        <li> Understanding the full meaning of sentences </li>
        <li> Adapting translations based on formal, casual, or conversational tone </li>
        <li> Delivering output that feels natural and human-written </li>
      </ul>

      This ensures your message is not just translated — but understood correctly.  
      </p> <br /><br />
       
      <h3>🚀 ToungeBridge focuses on:</h3>
      <ul>
        <li> Real tone control</li>
        <li> Natural sounding translations </li>
        <li> Context-Aware Translation </li>
        <li> Natural Human-like Output </li>
        <li> Fast and simple interface </li>
        <li> Privacy-Focused Processing </li>
      </ul> <br /><br />

      <h2>⚙️ Features</h2>
      TongueBridge offers more than just translation: <br /><br />

      🔹 Smart Translation
    <ul>
      <li>  Maintains tone (formal/casual) </li>
      <li>  Avoids robotic and awkward sentences </li>
      <li> Understands sentence meaning, not just words </li> 
    </ul>
      
      🔹 Voice & Audio
    <ul> 
      <li> Speech-to-text translation </li>
      <li> Text-to-speech output </li>
      <li> Accent detection (future scope) </li>
    </ul>

      🔹 AI-Powered Enhancements
    <ul>
      <li> Language detection </li>
      <li> Emotion-aware suggestions (future scope) </li>
      <li> Natural phrasing improvements </li>
      <li> Tone-Preserving translation </li>
    </ul>

      🔹 Advanced Inputs
    <ul>
      <li> Image-to-text translation </li>
      <li> Document translation (PDF, Word, Excel) </li>
      <li> Website translation </li>
      <li> Handwriting recognition (future scope) </li>
      <li> Industry-specific language packs (future scope) </li>
      <li> Real-time text processing </li>
    </ul>

      🔹 User Experience
    <ul>
      <li> Simple and clean UI </li>
      <li> Fast responses for quick communication </li>
      <li> Translation history tracking </li>
    </ul>

      🔹 Security
    <ul>
      <li> User data and text are handled securely </li>
      <li> Privacy-first design approach </li>
    </ul> <br /><br />


      <h2>💰 Plans & Pricing</h2>

      🟢 Free (₹0)
    <ul>
      <li> 1 user </li>
      <li> Unlimited text translations </li>
      <li> Basic audio translation (limited) </li>
      <li> Limited image-to-text translation (up to 9 images) </li>
    </ul>
    
      🔵 Premium (₹349)
    <ul>
      <li> 1 user </li>
      <li> Unlimited searches</li>
      <li> Unlimited text and audio translation </li>
      <li> Language detection + translation </li>
      <li> Image-to-text translation (unlimited) </li>
      <li> Document translation  </li>
      <li> Website translation </li>
      <li> Tone-Preserving translation </li>
    </ul>
    
      🟣 Team (₹999)
    <ul>
      <li> Up to 6 users </li>
      <li> Shared access to features and translations </li>
      <li> Faster processing </li>
      <li> team history and collaboration support </li>
    </ul> <br /><br />
      
      
      <h2>🌍 Our vision</h2>
      <p>
       TongueBridge aims to create a world where:
      <ul>
        <li> People can communicate freely across languages </li>
        <li> Expressions retain their true meaning and emotion </li>
        <li> Technology feels natural, not mechanical </li>
      </ul>

       Our goal is to make translation feel human, not artificial — enabling everyone to connect, understand, and express without limitations.
      </p>

    </div>
  </div>
) : null}

      {activeLegalModal ? (
        <div className="legal-overlay" role="dialog" aria-modal="true" aria-label={activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}>
          <div className="legal-box">
            <button className="legal-close-btn" onClick={closeLegalModal} type="button" aria-label="Close">
              ✖
            </button>

            {activeLegalModal === 'privacy' ? (
              <>
                <h2 className="legal-title">Privacy Policy</h2>
                <p className="legal-updated">Effective date: March 21, 2026</p>

                <section className="legal-section">
                  <h3>What we collect</h3>
                  <p>We collect account details (such as email and username), app usage data, and the text you submit for translation while using the service.</p>
                </section>

                <section className="legal-section">
                  <h3>How we use your data</h3>
                  <ul>
                    <li>Deliver and improve translation quality</li>
                    <li>Secure accounts and prevent abuse</li>
                    <li>Respond to support requests and product issues</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h3>Data retention</h3>
                  <p>We retain personal data only as long as needed for product operations, legal obligations, and account support. You can request deletion by contacting support.</p>
                </section>

                <section className="legal-section">
                  <h3>Your rights</h3>
                  <p>You may request access, correction, or deletion of your personal data at any time. Email us at support@tonguebridge.com.</p>
                </section>
              </>
            ) : (
              <>
                <h2 className="legal-title">Terms of Service</h2>
                <p className="legal-updated">Effective date: March 21, 2026</p>

                <section className="legal-section">
                  <h3>Use of service</h3>
                  <p>You agree to use TongueBridge only for lawful purposes and not to upload harmful, illegal, or abusive content.</p>
                </section>

                <section className="legal-section">
                  <h3>Accounts and security</h3>
                  <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
                </section>

                <section className="legal-section">
                  <h3>Plans and billing</h3>
                  <p>Paid plans renew based on the selected billing cycle. You can cancel before renewal to avoid future charges.</p>
                </section>

                <section className="legal-section">
                  <h3>Limitations</h3>
                  <p>TongueBridge is provided on an as-available basis. We work to keep the service accurate and available, but we do not guarantee uninterrupted operation.</p>
                </section>
              </>
            )}
          </div>
        </div>
      ) : null}

      <main>
        {activePage === 'developers' ? (
          <DevelopersSection />
        ) : activePage === 'premium' ? (
          <PremiumPage />
        ) : activePage === 'team' ? (
          <TeamPage />
        ) : (
          <>
            <section className="hero" id="translate-tone">
              <div className={`home-history-sidebar ${showHomeHistorySidebar ? 'open' : ''}`}>
                <div className="home-sidebar-header">
                  <h3>History</h3>
                  <button
                    className="home-close-btn"
                    onClick={() => setShowHomeHistorySidebar(false)}
                    title="Close history"
                  >
                    ✕
                  </button>
                </div>

                {homeHistory.length > 0 ? (
                  <>
                    <div className="home-history-list">
                      {homeHistory.map((item) => (
                        <div
                          key={item.id}
                          className="home-history-item"
                          onClick={() => loadFromHomeHistory(item)}
                        >
                          <div className="home-history-meta">
                            <span className="home-history-langs">{item.fromLang.slice(0, 3)} → {item.toLang.slice(0, 3)}</span>
                          </div>
                          <p className="home-history-input">{item.input.substring(0, 60)}{item.input.length > 60 ? '...' : ''}</p>
                          <p className="home-history-output">{item.output.substring(0, 60)}{item.output.length > 60 ? '...' : ''}</p>
                          <span className="home-history-time">{item.timestamp}</span>
                        </div>
                      ))}
                    </div>
                    <button className="home-delete-history-btn" onClick={handleDeleteHomeHistory}>
                      🗑️ Delete All
                    </button>
                  </>
                ) : (
                  <div className="home-history-empty">No translations yet</div>
                )}
              </div>

              {showHomeHistorySidebar && (
                <div className="home-sidebar-overlay" onClick={() => setShowHomeHistorySidebar(false)} />
              )}

              <div className="hero-text">
                <p className="eyebrow">A translator that feels like a real person</p>
                <h1>Translate with tone, not just words</h1>
                <p className="lead">
                  TongueBridge helps you express exactly what you mean — clear, warm, and local.
                  Perfect for everyday chats, work conversations, and travel moments
                </p>
                <div className="hero-actions">
                  <button className="btn primary" onClick={goToPricing}>Go Premium</button>
                  <button className="btn ghost" onClick={openLearnMore}>
              Learn More
              </button>
                </div>
                <div className="badges">
                  <span>Multi languages</span>
                  <span>Context aware</span>
                  <span>Privacy first</span>
                </div>
              </div>
              <div className="hero-card-stack">
                <div className="hero-mode-toggle">
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
                      onChange={(e) => setToLang(e.target.value)}
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
                  onChange={(e) => setInputText(e.target.value)}
                />

                <FreePlanTools resetTrigger={freeToolsResetTrigger} />

                {error ? <p className="free-tool-note">⚠️ {error}</p> : null}

                {showOutput && (
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
                        onClick={() => setIsOutputMicListening((prev) => !prev)}
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
                )}

                <div className="card-actions">
                  <button className="btn primary" onClick={handleTranslate} disabled={loading}>
                    {loading ? 'Translating...' : 'Translate'}
                  </button>
                  <button
                    className="home-history-toggle-btn"
                    onClick={() => setShowHomeHistorySidebar(!showHomeHistorySidebar)}
                    title="Open history"
                  >
                    📋 History {homeHistory.length > 0 && `(${homeHistory.length})`}
                  </button>
                  <button className="btn ghost" onClick={handleClear}>Clear</button>
                </div>
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
              See what Smarter Translation can do. Upgrade anytime for more power and control

              <p className="price">
                &nbsp;&nbsp; ₹0<span>/mo</span>
              </p>
              <div className="plan-note">
                <p className="plan-lead">✦ Perfect to get started:</p> <br />
                <ul className="plan-list">
                  <li><span className="plan-icon">◈</span> Basic translations per day</li>
                  <li><span className="plan-icon">✎</span> Unlimited text translation</li>
                  <li><span className="plan-icon">♫</span> Audio translation (limited - up to 10 translations)</li>
                  <li><span className="plan-icon">◉</span> Image-to-text translation (limited - up to 9 images)</li>
                </ul>
              </div>
              <button className="btn ghost">Keep free</button>
            </article>
            <article className="pricing-card highlight">
              <span className="chip">Most popular</span>

              <h3>Premium</h3>
              Experience Translation without limits, with advanced features

              <p className="price">
                &nbsp;&nbsp; ₹249<span>/mo</span>
              </p>
              <div className="plan-note">
                <p className="plan-lead">✦ Everything in Free, plus:</p><br />
                <ul className="plan-list">
                  <li><span className="plan-icon">∞</span> Unlimited text & audio translation</li>
                  <li><span className="plan-icon">◎</span> Language detection with translation</li>
                  <li><span className="plan-icon">◉</span> Image-to-Text translation (unlimited)</li>
                  <li><span className="plan-icon">▣</span> Document translation</li>
                  <li><span className="plan-icon">⌁</span> Website translation</li>
                  <li><span className="plan-icon">♢</span> Tone-preserving translation</li>
                </ul>
              </div>
              <button className="btn primary" type="button" onClick={() => handleProtectedPlanOpen('premium')}>Go Premium</button>
            </article>
            <article className="pricing-card">

              <h3>Team</h3>
              Built for Teams and Shared access

              <p className="price">
                &nbsp;&nbsp; ₹999<span>/mo</span>
              </p>
              <div className="plan-note">
                <p className="plan-lead">✦ Everything in Premium, plus:</p> <br />
                <ul className="plan-list">
                  <li><span className="plan-icon">◍</span> Up to 6 users (shared access across devices)</li>
                  <li><span className="plan-icon">⟡</span> Shared access to features & translations</li>
                  <li><span className="plan-icon">⚡</span> Faster processing</li>
                  <li><span className="plan-icon">☍</span> Team history & collaboration support</li>
                </ul>
              </div>
              <button className="btn ghost" type="button" onClick={() => handleProtectedPlanOpen('team')}>Go Team</button>
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
        )}
      </main>

      <footer className="site-footer">

  <div className="footer-contact-section" id="contact-us">
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
      <button className="footer-legal-link" type="button" onClick={openPrivacyPolicy}>Privacy</button>
      <button className="footer-legal-link" type="button" onClick={openTerms}>Terms</button>
      <a href="mailto:support@tonguebridge.com">Contact</a>
    </div>

  </div>

</footer>
    </div>
  );
}

export default App;