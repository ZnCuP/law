import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import './AttorneyDetailPage.css'

const attorneyDetails = {
  1: {
    name: 'Jia Song',
    title: 'Founding Partner',
    office: 'New York/Shenzhen',
    email: 'jia.song@summitlaw.net',
    phone: '(917)293-9201',
    image: null,
    quote: '“I combine strategic clarity, cultural fluency, and meticulous legal craftsmanship to help my clients build, protect, and transition their global assets.”',
    bio: `Jia Song is a cross-border attorney dual-qualified in New York and Mainland China, advising clients at the intersection of family wealth, corporate structuring, and international business. As the founder of Summit Law PLLC, Jia helps individuals and companies navigate complex legal challenges that span jurisdictions.

Jia has represented entrepreneurs, families, and corporations in high-stakes matters involving cross-border marriage and divorce, offshore trust and estate planning, and international corporate formation and compliance. Her experience spans both litigation and non-contentious advisory work, with a focus on U.S.–China transactions, intellectual property, and family wealth protection.

Fluent in both legal systems and business cultures, Jia bridges East and West—translating global strategy into local action. Her clients value her for her precision, empathy, and ability to craft forward-looking solutions that safeguard what matters most.`,
    practices: [
      'Wealth Management',
      'Startup + Venture Capital',
      'Commercial Litigation',
      'IP Litigation',
      'Corporate Governance'
    ],
    education: [
      'Columbia Law School, LL.M.'
    ],
    barAdmissions: ['New York', 'China', 'United States District Court for the Northern District of Illinois'],
    insights: [],
    news: [],
    events: [],
    rankings: []
  },
  2: {
    name: 'Mao Peng',
    title: 'Partner',
    office: 'New York/China',
    email: 'Mao.peng@summitlaw.net',
    phone: '(778)882-3518',
    image: null,
    quote: '“I leverage dual qualifications in Chinese and New York law to deliver strategic, culturally attuned solutions for clients navigating complex trans-Pacific legal challenges.”',
    bio: `Mao Peng is a dual-qualified attorney (PRC & New York) with over a decade of experience spanning judicial adjudication, international arbitration, and cross-border transactional work. Prior to joining Summit Law, Peng served as a judge in China, where he presided over complex corporate litigation. This judicial insight uniquely informs his strategic approach to dispute resolution and risk mitigation.

Mao Peng’s practice focuses on helping multinational clients mitigate risk and achieve enforceable outcomes in matters involving U.S.–China transactions, intellectual property, and global investment and compliance. His experience spans both litigation and non-litigation cases with a consistent emphasis on practical strategy and enforceability.`,
    practices: [
      'Transnational Litigation & Arbitration',
      'Commercial Litigation',
      'Judgment Recognition & Asset Recovery',
      'IP Litigation',
      'Global Investment & Compliance'
    ],
    education: [
      'LL.M., Washington University in St. Louis',
      'MBA, Chongqing University of Technology',
      'LL.M., Chongqing University'
    ],
    barAdmissions: ['New York', 'China', 'United States District Court for the Northern District of Illinois'],
    insights: [],
    news: [],
    events: [],
    rankings: []
  }
}

function AttorneyDetailPage() {
  const { id } = useParams()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [showFullBio, setShowFullBio] = useState(false)

  const attorney = attorneyDetails[id] || attorneyDetails[1]

  const tabs = [
    { id: 'overview', label: { en: 'Overview', zh: '概述' } },
    { id: 'insights', label: { en: 'Insights', zh: '洞察' } },
    { id: 'news', label: { en: 'News', zh: '新闻' } },
    { id: 'events', label: { en: 'Events', zh: '活动' } },
    { id: 'rankings', label: { en: 'Rankings', zh: '排名' } }
  ]

  const bioPreview = attorney.bio.substring(0, 400)
  const displayBio = showFullBio ? attorney.bio : bioPreview

  return (
    <div className="attorney-detail-page">
      {/* Hero Section */}
      <div className="attorney-hero">
        <div className="hero-image">
          {attorney.image ? (
            <img src={attorney.image} alt={attorney.name} />
          ) : (
            <div className="hero-placeholder">
              <span>{attorney.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          )}
        </div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1>{attorney.name}</h1>
              <p className="attorney-meta">{attorney.title} | {attorney.office}</p>
              <div className="contact-actions">
                <button className="action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 01-2 2h-1a16 16 0 01-16-16V4a2 2 0 012-2h4" strokeWidth="2"/>
                  </svg>
                  {language === 'en' ? 'Download vCard' : '下载名片'}
                </button>
                <button className="action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="18" cy="5" r="3" strokeWidth="2"/>
                    <circle cx="6" cy="12" r="3" strokeWidth="2"/>
                    <circle cx="18" cy="19" r="3" strokeWidth="2"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="2"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="2"/>
                  </svg>
                  {language === 'en' ? 'Share' : '分享'}
                </button>
              </div>
              <div className="contact-info">
                <a href={`mailto:${attorney.email}`} className="contact-link">
                  {attorney.email}
                </a>
                <span className="separator">|</span>
                <a href={`tel:${attorney.phone}`} className="contact-link">
                  {attorney.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="detail-tabs">
        <div className="container">
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label[language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        <div className="container">
          {activeTab === 'overview' && (
            <div className="overview-section">
              {attorney.quote && (
                <blockquote className="attorney-quote">
                  {attorney.quote}
                </blockquote>
              )}

              <div className="biography">
                <p>{displayBio}</p>
                {attorney.bio.length > 400 && (
                  <button 
                    className="show-more-btn"
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio 
                      ? (language === 'en' ? 'SHOW LESS' : '收起')
                      : (language === 'en' ? 'SHOW MORE' : '展开更多')
                    }
                  </button>
                )}
              </div>

              <div className="info-grid">
                <div className="info-section">
                  <h3>{language === 'en' ? 'PRACTICES' : '业务领域'}</h3>
                  <ul>
                    {attorney.practices.map((practice, idx) => (
                      <li key={idx}>
                        <Link to="/practices">{practice}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="info-section">
                  <h3>{language === 'en' ? 'BAR ADMISSIONS' : '律师资格'}</h3>
                  <ul>
                    {attorney.barAdmissions.map((bar, idx) => (
                      <li key={idx}>{bar}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-section">
                  <h3>{language === 'en' ? 'EDUCATION' : '教育背景'}</h3>
                  <ul>
                    {attorney.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="insights-section">
              <h2>{language === 'en' ? 'Insights' : '洞察'}</h2>
              <div className="content-list">
                {attorney.insights.map((insight, idx) => (
                  <div key={idx} className="content-item">
                    <div className="content-badge">{insight.type}</div>
                    <h3>{insight.title}</h3>
                    <p className="content-date">{insight.date}</p>
                  </div>
                ))}
              </div>
              <button className="show-all-btn">
                {language === 'en' ? 'SHOW ALL INSIGHTS' : '显示全部洞察'}
              </button>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="news-section">
              <h2>{language === 'en' ? 'News' : '新闻'}</h2>
              <div className="content-list">
                {attorney.news.map((item, idx) => (
                  <div key={idx} className="content-item">
                    <div className="content-badge">{item.type}</div>
                    <h3>{item.title}</h3>
                    <p className="content-date">{item.date}</p>
                  </div>
                ))}
              </div>
              <button className="show-all-btn">
                {language === 'en' ? 'SHOW ALL NEWS' : '显示全部新闻'}
              </button>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="events-section">
              <h2>{language === 'en' ? 'Events' : '活动'}</h2>
              <div className="content-list">
                {attorney.events.map((event, idx) => (
                  <div key={idx} className="content-item">
                    <div className="content-badge">{event.type}</div>
                    <h3>{event.title}</h3>
                    <p className="content-date">{event.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rankings' && (
            <div className="rankings-section">
              <h2>{language === 'en' ? 'Rankings' : '排名'}</h2>
              <ul className="rankings-list">
                {attorney.rankings.map((ranking, idx) => (
                  <li key={idx}>{ranking}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AttorneyDetailPage
