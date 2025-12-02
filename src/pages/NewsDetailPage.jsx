import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './NewsDetailPage.css'

const withBase = (p) => {
  if (!p) return null
  if (/^https?:\/\//.test(p)) return p
  const base = import.meta.env.BASE_URL
  if (p.startsWith('/law/') && base === '/') return p.replace(/^\/law\//, '/')
  if (p.startsWith('/uploads/') && base !== '/') return base + p.slice(1)
  if (p.startsWith('/')) return p
  return base + p
}

const modules = import.meta.glob('../../content/news/*.json', { eager: true })
const newsList = Object.entries(modules).map(([path, mod]) => {
  const data = mod.default || mod
  const slug = path.split('/').pop().replace(/\.json$/, '')
  return { ...data, slug }
})

function NewsDetailPage() {
  const { slug } = useParams()
  const item = newsList.find(n => n.slug === slug)

  if (!item) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>未找到新闻</h1>
            <p>您访问的内容不存在或已被移除。</p>
            <Link className="back-link" to="/news">返回新闻列表</Link>
          </div>
        </div>
      </div>
    )
  }

  const heroImage = withBase(item.image)

  return (
    <motion.div
      className="news-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="news-hero">
        <div className="hero-image">
          {heroImage ? (
            <img src={heroImage} alt={item.title} />
          ) : (
            <div className="hero-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="news-meta">
                <span className="news-badge">{item.badge || 'NEWS'}</span>
                <span className="news-date">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <h1>{item.title}</h1>
              {item.summary && (
                <p className="news-summary">{item.summary}</p>
              )}
              <div className="hero-actions">
                <Link to="/news" className="back-link">返回新闻列表</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="container">
          <article className="news-body">
            {item.body ? (
              <p>{item.body}</p>
            ) : (
              <p className="coming-soon">正文内容即将上线</p>
            )}
          </article>
        </div>
      </div>
    </motion.div>
  )
}

export default NewsDetailPage

