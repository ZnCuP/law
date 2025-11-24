import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
            <motion.form 
              className="contact-form" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
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

              <motion.button type="submit" className="btn-primary" whileTap={{ scale: 0.98 }}>
                {t('contact.send', language)}
              </motion.button>
            </motion.form>

            <motion.aside 
              className="contact-info-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h3 className="info-title">{t('contact.offices', language)}</h3>
              <p className="info-text">{t('contact.officesText', language)}</p>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
