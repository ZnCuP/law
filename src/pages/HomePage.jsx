import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const heroTitle = 'Global Standards, Local Advantage.'
  const heroSubtitle = 'Seamless U.S.–China legal services for businesses, families, and entrepreneurs.'

  const featured = [
    {
      badge: 'INSIGHTS',
      title: 'European Digital Compliance: Key Digital Regulation & Compliance Developments',
      date: '03 Nov 2025',
      href: '/insights',
      imagePlaceholder: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23f0f0f0' width='400' height='200'/%3E%3C/svg%3E`
    },
    {
      badge: 'EVENTS',
      title: 'Corporate Law Symposium 2025',
      date: '20 Dec 2025',
      href: '/events',
      imagePlaceholder: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e8e8e8' width='400' height='200'/%3E%3C/svg%3E`
    },
    {
      badge: 'NEWS',
      title: 'Recognized as Leading Corporate Attorney',
      date: '01 Nov 2025',
      href: '/news',
      imagePlaceholder: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23dcdcdc' width='400' height='200'/%3E%3C/svg%3E`
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
