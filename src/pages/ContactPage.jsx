import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageHeader from '../components/PageHeader'
import './ContactPage.css'

function ContactPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(t('contact.thankYou', language))
    setFormData({ name: '', email: '', company: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page">
      <PageHeader 
        title={t('contact.title', language)}
        subtitle={t('contact.description', language)}
      />

      <section className="contact-section">
        <div className="container">
          <div className="contact-intro">
            <h2 className="contact-title">{t('contact.heading', language)}</h2>
            <p className="contact-lead">{t('contact.intro', language)}</p>
          </div>

          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{t('contact.name', language)} *</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.email', language)} *</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.company', language)}</label>
                <input
                  className="form-input"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.subject', language)} *</label>
                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.message', language)} *</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                />
              </div>

              <button type="submit" className="btn-primary">
                {t('contact.send', language)}
              </button>
            </form>

            <aside className="contact-info-card">
              <h3 className="info-title">{t('contact.offices', language)}</h3>
              <p className="info-text">{t('contact.officesText', language)}</p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
