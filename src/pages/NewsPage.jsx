import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ContentCard from '../components/ContentCard'

const modules = import.meta.glob('../../content/news/*.json', { eager: true })
const newsData = Object.values(modules)
  .map(m => m.default || m)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

function NewsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader title="新闻" subtitle="最新的公司新闻和行业动态" />
      
      <section className="section">
        <div className="container">
          {newsData.length > 0 ? (
            <div className="content-grid">
              {newsData.map((item, index) => (
                <ContentCard
                  key={index}
                  badge={item.badge || 'NEWS'}
                  title={item.title}
                  date={item.date}
                  imagePlaceholder={item.image || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23d0d0d0' width='400' height='200'/%3E%3C/svg%3E`}
                />
              ))}
            </div>
          ) : (
            <p className="coming-soon">暂无新闻内容</p>
          )}
        </div>
      </section>
    </motion.div>
  )
}

export default NewsPage
