import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import ResourceCard from '../components/ResourceCard'

const modules = import.meta.glob('../../content/resources/*.json', { eager: true })
const resourcesData = Object.values(modules)
  .map(m => m.default || m)
  .sort((a, b) => (a.title || '').localeCompare(b.title || ''))

function ResourcesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader title="资源中心" subtitle="全面的专业资源和工具" />
      
      <section className="section">
        <div className="container">
          <div className="resource-grid">
            {resourcesData.length > 0 ? (
              resourcesData.map((item, index) => (
                <ResourceCard key={index} title={item.title} />
              ))
            ) : (
              <p className="coming-soon">暂无资源内容</p>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default ResourcesPage
