import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const heroTitle = 'Global Standards, Local Advantage.'
  const heroSubtitle = 'Seamless U.S.–China legal services for businesses, families, and entrepreneurs.'
  const withBase = (p) => {
    if (!p) return null
    if (/^https?:\/\//.test(p)) return p
    const base = import.meta.env.BASE_URL
    if (p.startsWith('/law/') && base === '/') return p.replace(/^\/law\//, '/')
    if (p.startsWith('/uploads/') && base !== '/') return base + p.slice(1)
    if (p.startsWith('/')) return p
    return base + p
  }

  const newsModules = import.meta.glob('../../content/news/*.json', { eager: true })
  const eventsModules = import.meta.glob('../../content/events/*.json', { eager: true })
  const insightsModules = import.meta.glob('../../content/insights/*.json', { eager: true })

  const latest = (mods) => {
    const arr = Object.values(mods).map(m => m.default || m).filter(Boolean)
    arr.sort((a, b) => new Date(b.date) - new Date(a.date))
    return arr[0] || null
  }

  const latestNews = latest(newsModules)
  const latestEvents = latest(eventsModules)
  const latestInsights = latest(insightsModules)

  const featured = [
    {
      badge: latestInsights?.badge || 'INSIGHTS',
      title: latestInsights?.title || 'Explore latest insights',
      date: latestInsights?.date || '',
      href: '/insights',
      imagePlaceholder: withBase(latestInsights?.image) || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23f0f0f0' width='400' height='200'/%3E%3C/svg%3E`
    },
    {
      badge: latestEvents?.badge || 'EVENTS',
      title: latestEvents?.title || 'Upcoming events',
      date: latestEvents?.date || '',
      href: '/events',
      imagePlaceholder: withBase(latestEvents?.image) || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e8e8e8' width='400' height='200'/%3E%3C/svg%3E`
    },
    {
      badge: latestNews?.badge || 'NEWS',
      title: latestNews?.title || 'Latest news',
      date: latestNews?.date || '',
      href: '/news',
      imagePlaceholder: withBase(latestNews?.image) || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23dcdcdc' width='400' height='200'/%3E%3C/svg%3E`
    }
  ]

  const bgUrl = `url(${import.meta.env.BASE_URL}court.jpg)`
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="home-hero" style={{ backgroundImage: bgUrl }}>
        <div className="home-hero-overlay" />
        <motion.div
          className="home-hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title-desktop">{heroTitle}</h1>
          <h1 className="hero-title-mobile">
            <span>Global Standards,</span>
            <span>Local Advantage</span>
          </h1>
          <p className="hero-subtitle">{heroSubtitle}</p>
        </motion.div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-grid-3">
            {featured.map((item, idx) => (
              <Link key={idx} to={item.href} className="home-grid-link">
                <motion.article
                  className="home-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="home-card-image">
                    <div className="card-badge">{item.badge}</div>
                    <img src={item.imagePlaceholder} alt={item.title} loading="lazy" />
                  </div>
                  <div className="home-card-content">
                    <h3>{item.title}</h3>
                    <p className="card-date">{item.date}</p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default HomePage
