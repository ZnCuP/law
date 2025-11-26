import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ContentCard from '../components/ContentCard'

const modules = import.meta.glob('../../content/insights/*.json', { eager: true })
const insightsData = Object.values(modules)
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

function InsightsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader title="洞察" subtitle="深入的法律和行业分析" />
      
      <section className="section">
        <div className="container">
          <div className="content-grid">
            {insightsData.length > 0 ? (
              insightsData.map((item, index) => (
                <ContentCard
                  key={index}
                  badge={item.badge || 'INSIGHTS'}
                  title={item.title}
                  date={item.date}
                  imagePlaceholder={withBase(item.image) || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e0e0e0' width='400' height='200'/%3E%3C/svg%3E`}
                />
              ))
            ) : (
              <p className="coming-soon">暂无洞察内容</p>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default InsightsPage
