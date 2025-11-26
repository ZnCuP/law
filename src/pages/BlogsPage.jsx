import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import './BlogsPage.css'

const modules = import.meta.glob('../../content/blogs/*.json', { eager: true })
const blogsData = Object.values(modules)
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

function BlogsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageHeader title="博客" subtitle="专业领域的深入分析和评论" />
      
      <section className="section">
        <div className="container">
          {blogsData.length > 0 ? (
            <div className="blog-grid">
              {blogsData.map((blog, index) => (
                <motion.div
                  key={index}
                  className="blog-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.03 }}
                >
                  <div className="blog-image">
                    <img src={withBase(blog.image) || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23b0b0b0' width='300' height='200'/%3E%3C/svg%3E`} alt={blog.title} />
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary || blog.desc || ''}</p>
                  <a href="#" className="blog-link">了解更多</a>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="coming-soon">暂无博客内容</p>
          )}
        </div>
      </section>
    </motion.div>
  )
}

export default BlogsPage
