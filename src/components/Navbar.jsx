import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import './Navbar.css'

const megaMenuItems = {
  practices: [
    'Corporate Finance',
    'Litigation',
    'Technology Transactions',
    'Intellectual Property',
    'Regulatory & Compliance',
    'Labor & Employment',
    'Real Estate',
    'Bankruptcy & Restructuring',
    'Privacy & Data Security',
    'Environmental & Climate'
  ],
}

function Navbar() {
  const { language, toggleLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaMenu, setMegaMenu] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ESC键关闭菜单
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
        setSignupOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || signupOpen || searchOpen ? 'hidden' : ''
  }, [menuOpen, signupOpen, searchOpen])

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <svg width="180" height="40" viewBox="0 0 180 40" fill="currentColor">
              <text x="0" y="28" fontFamily="serif" fontSize="24" fontWeight="bold">Morrison Foerster</text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {/* Right side actions */}
            <div className="nav-actions">
              <button 
                className="search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="搜索"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
                </svg>
              </button>
              
              <button 
                className="lang-toggle"
                onClick={toggleLanguage}
                aria-label="切换语言"
              >
                <span style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span>
                <span style={{ margin: '0 4px' }}>/</span>
                <span style={{ opacity: language === 'zh' ? 1 : 0.4 }}>中</span>
              </button>
              
              <button 
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="打开菜单"
              >
                <svg className="menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2"/>
                  <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2"/>
                  <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2"/>
                </svg>
                <span className="menu-label">{t('navbar.menu', language)}</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="nav-mobile">
            <div className="nav-actions">
              <button 
                className="search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="搜索"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
                </svg>
              </button>

              <button 
                className="lang-toggle"
                onClick={toggleLanguage}
                aria-label="切换语言"
              >
                <span style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span>
                <span style={{ margin: '0 4px' }}>/</span>
                <span style={{ opacity: language === 'zh' ? 1 : 0.4 }}>中</span>
              </button>

              <button 
                className="menu-btn mobile"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="打开菜单"
              >
                <div className={`hamburger ${menuOpen ? 'open' : ''}`} aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div 
              className="search-box"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input 
                type="text" 
                placeholder="搜索..." 
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Page Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            
            <motion.div 
              className="fullpage-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
            >
            <div className="menu-header">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <svg width="180" height="40" viewBox="0 0 180 40" fill="currentColor">
                  <text x="0" y="28" fontFamily="serif" fontSize="24" fontWeight="bold">Morrison Foerster</text>
                </svg>
              </Link>
              <button 
                className="close-menu"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="menu-content">
              <div className="menu-section">
                <h3>{t('menu.navigate', language)}</h3>
                <Link to="/people" onClick={() => setMenuOpen(false)}>{t('menu.people', language)}</Link>
                <Link to="/practices" onClick={() => setMenuOpen(false)}>{t('menu.practices', language)}</Link>
                <Link to="/resources" onClick={() => setMenuOpen(false)}>{t('menu.resources', language)}</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>{t('menu.about', language)}</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('menu.contact', language)}</Link>
              </div>
              
              <div className="menu-section">
                <h3>{t('menu.connect', language)}</h3>
                <a href="#">{t('menu.subscribe', language)}</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">YouTube</a>
              </div>
              
              <div className="menu-section">
                <button 
                  className="signup-btn"
                  onClick={() => {
                    setMenuOpen(false)
                    setSignupOpen(true)
                  }}
                >
                  {t('menu.signup', language)}
                </button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {signupOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSignupOpen(false)}
          >
            <motion.div 
              className="signup-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSignupOpen(false)}
              >
                ×
              </button>
              <h2>订阅资源更新</h2>
              <p>了解最新的法律和行业洞察、新闻以及活动信息</p>
              <form>
                <input type="email" placeholder="电子邮件地址" required />
                <input type="text" placeholder="姓名" />
                <button type="submit">订阅</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
