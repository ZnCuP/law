import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './ContentCard.css'

function ContentCard({ badge, title, date, href = '#', imagePlaceholder }) {
  const navigate = useNavigate()
  const handleNavigate = () => {
    if (href && href !== '#') navigate(href)
  }
  return (
    <motion.article
      className="content-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={handleNavigate}
    >
      <div className="card-image">
        <div className="card-badge">{badge}</div>
        <img 
          src={imagePlaceholder} 
          alt={title} 
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23d0d0d0' width='400' height='200'/%3E%3C/svg%3E`
          }}
        />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-date">{date}</p>
        <button type="button" className="card-link" onClick={handleNavigate}>
          了解更多 →
        </button>
      </div>
    </motion.article>
  )
}

export default ContentCard
