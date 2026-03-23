import { Hero } from './pages/landingPage/sections/Hero'
import { Pricing } from './pages/landingPage/sections/Pricing'
import { Faq } from './pages/landingPage/sections/Faq'
import { Contact } from './pages/landingPage/sections/Contact'
import { Reviews } from './pages/landingPage/sections/Reviews'
import { Work } from './pages/landingPage/sections/Work'
import { Footer } from './components/layout/Footer'
import './App.css'

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Hero />
      <Work />
      <Pricing />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
