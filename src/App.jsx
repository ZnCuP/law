import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import InsightsPage from './pages/InsightsPage'
import NewsPage from './pages/NewsPage'
import EventsPage from './pages/EventsPage'
import BlogsPage from './pages/BlogsPage'
import ResourcesPage from './pages/ResourcesPage'
import PeoplePage from './pages/PeoplePage'
import AttorneyDetailPage from './pages/AttorneyDetailPage'
import PracticesPage from './pages/PracticesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:id" element={<AttorneyDetailPage />} />
        <Route path="/practices" element={<PracticesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="main-wrapper">
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
