import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import './PeoplePage.css'

const mockAttorneys = [
  { id: 1, name: 'Jia Song', title: 'Founding Partner', practice: 'Wealth Management', office: 'New York/Shenzhen', image: null },
  { id: 2, name: 'Mao Peng', title: 'Partner', practice: 'Transnational Litigation & Arbitration', office: 'New York/China', image: null }
]

function PeoplePage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPractice, setSelectedPractice] = useState('')
  const [selectedOffice, setSelectedOffice] = useState('')
  const [selectedLetter, setSelectedLetter] = useState('')
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  
  const practices = [
    'All Practices',
    'Wealth Management',
    'Startup + Venture Capital',
    'Commercial Litigation',
    'IP Litigation',
    'Corporate Governance',
    'Transnational Litigation & Arbitration',
    'Judgment Recognition & Asset Recovery',
    'Global Investment & Compliance'
  ]

  const offices = [
    'All Offices',
    'New York',
    'Shenzhen',
    'China'
  ]

  const filteredAttorneys = mockAttorneys.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPractice = !selectedPractice || selectedPractice === 'All Practices' || attorney.practice === selectedPractice
    const matchesOffice = !selectedOffice || selectedOffice === 'All Offices' || attorney.office === selectedOffice
    const matchesLetter = !selectedLetter || attorney.name[0].toUpperCase() === selectedLetter
    
    return matchesSearch && matchesPractice && matchesOffice && matchesLetter
  })

  const handleClear = () => {
    setSearchTerm('')
    setSelectedPractice('')
    setSelectedOffice('')
    setSelectedLetter('')
  }

  return (
    <div className="people-page">
      <div className="people-header">
        <div className="container">
          <h1>{language === 'en' ? 'Our People' : '我们的团队'}</h1>
        </div>
      </div>

      <div className="people-container">
        <div className="container">
          {/* Search and Filters */}
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search by name or keyword...' : '按姓名或关键词搜索...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filters-row">
              <select
                value={selectedPractice}
                onChange={(e) => setSelectedPractice(e.target.value)}
                className="filter-select"
              >
                <option value="">{language === 'en' ? 'Practice Area' : '业务领域'}</option>
                {practices.map(practice => (
                  <option key={practice} value={practice}>{practice}</option>
                ))}
              </select>

              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                className="filter-select"
              >
                <option value="">{language === 'en' ? 'Office' : '办公室'}</option>
                {offices.map(office => (
                  <option key={office} value={office}>{office}</option>
                ))}
              </select>

              <button
                className="more-filters-btn"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
              >
                {showMoreFilters 
                  ? (language === 'en' ? 'LESS OPTIONS' : '收起选项')
                  : (language === 'en' ? 'MORE SEARCH OPTIONS' : '更多搜索选项')
                }
              </button>

              <button className="search-btn-main">
                {language === 'en' ? 'SEARCH' : '搜索'}
              </button>

              <button className="clear-btn" onClick={handleClear}>
                {language === 'en' ? 'CLEAR' : '清除'}
              </button>
            </div>

            {/* Alphabet Filter */}
            {showMoreFilters && (
              <div className="alphabet-filter">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    className={`letter-btn ${selectedLetter === letter ? 'active' : ''}`}
                    onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="results-info">
            <p>
              {language === 'en' 
                ? `Showing ${filteredAttorneys.length} ${filteredAttorneys.length === 1 ? 'person' : 'people'}`
                : `显示 ${filteredAttorneys.length} 位律师`
              }
            </p>
          </div>

          {/* Attorney Grid */}
          <div className="attorneys-grid">
            {filteredAttorneys.map(attorney => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to={`/people/${attorney.id}`} 
                  className="attorney-card"
                >
                  <div className="attorney-image">
                    {attorney.image ? (
                      <img src={attorney.image} alt={attorney.name} />
                    ) : (
                      <div className="attorney-placeholder">
                        <span>{attorney.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    )}
                  </div>
                  <div className="attorney-info">
                    <h3>{attorney.name}</h3>
                    <p className="attorney-title">{attorney.title}</p>
                    <p className="attorney-practice">{attorney.practice}</p>
                    <p className="attorney-office">{attorney.office}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredAttorneys.length === 0 && (
            <div className="no-results">
              <p>
                {language === 'en' 
                  ? 'No attorneys found matching your criteria.'
                  : '未找到符合条件的律师。'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PeoplePage
