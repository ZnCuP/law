import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ContentCard from '../components/ContentCard'

const modules = import.meta.glob('../../content/events/*.json', { eager: true })
const eventsData = Object.values(modules)
  .map(m => m.default || m)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const withBase = (p) => {
  if (!p) return null
  if (/^https?:\/\//.test(p)) return p
  const base = import.meta.env.BASE_URL
  if (p.startsWith('/law/') && base === '/') return p.replace(/^\/law\//, '/')
  if (p.startsWith('/uploads/') && base !== '/') return base + p.slice(1)
  if (p.startsWith('/')) return p
  return base + p
}

function EventsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader title="活动" subtitle="即将举行的会议、研讨会和培训" />
      
      <section className="section">
        <div className="container">
          <div className="content-grid">
            {eventsData.length > 0 ? (
              eventsData.map((item, index) => (
                <ContentCard
                  key={index}
                  badge={item.badge || 'EVENTS'}
                  title={item.title}
                  date={item.date}
                  imagePlaceholder={withBase(item.image) || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23c0c0c0' width='400' height='200'/%3E%3C/svg%3E`}
                />
              ))
            ) : (
              <p className="coming-soon">暂无活动内容</p>
            )}
          </div>
          
          <div className="cle-section">
            <h3>继续教育</h3>
            <p>从我们的CLE/MCLE课程中选择，或注册我们的CLE通讯以获取全面的CLE/MCLE机会列表。</p>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              查看CLE课程
            </motion.button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default EventsPage
