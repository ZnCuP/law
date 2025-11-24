import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageHeader from '../components/PageHeader'
import './AboutPage.css'

function AboutPage() {
  const { language } = useLanguage()
  
  return (
    <div className="page">
      <PageHeader 
        title={t('about.title', language)}
        subtitle={t('about.description', language)}
      />
      
      <section className="about-section">
        <div className="container">
          <div className="about-intro">
            <h2 className="about-title">{t('about.heading', language)}</h2>
            <p className="about-lead">{t('about.intro', language)}</p>
          </div>

          <div className="about-grid">
            <article className="about-card">
              <div className="about-badge">{t('about.history', language)}</div>
              <h3 className="about-card-title">{t('about.history', language)}</h3>
              <p className="about-text">{t('about.historyText', language)}</p>
            </article>

            <article className="about-card">
              <div className="about-badge">{t('about.values', language)}</div>
              <h3 className="about-card-title">{t('about.values', language)}</h3>
              <p className="about-text">{t('about.valuesText', language)}</p>
            </article>

            <article className="about-card">
              <div className="about-badge">{t('about.globalReach', language)}</div>
              <h3 className="about-card-title">{t('about.globalReach', language)}</h3>
              <p className="about-text">{t('about.globalReachText', language)}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
