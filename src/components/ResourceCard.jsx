import { motion } from 'framer-motion'
import './ResourceCard.css'

function ResourceCard({ title, href = '#' }) {
  return (
    <motion.a
      href={href}
      className="resource-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <h3>{title}</h3>
      <span className="arrow">→</span>
    </motion.a>
  )
}

export default ResourceCard
