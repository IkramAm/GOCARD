import { useEffect } from 'react'
import { Hero } from './pages/landingPage/sections/Hero'
import { Pricing } from './pages/landingPage/sections/Pricing'
import { Faq } from './pages/landingPage/sections/Faq'
import { Contact } from './pages/landingPage/sections/Contact'
import { Reviews } from './pages/landingPage/sections/Reviews'
import { Work } from './pages/landingPage/sections/Work'
import { Footer } from './components/layout/Footer'
import { CostumizePage } from './pages/costumize-steps/costumize/CostumizePage'
import { DetailsPage } from './pages/costumize-steps/details/DetailsPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import './App.css'

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!sections.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      sections.forEach((section) => section.classList.add('reveal-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scrollToHashTarget = () => {
      const { hash } = window.location
      if (!hash) return

      const id = hash.slice(1)
      if (!id) return

      const target = document.getElementById(id)
      if (!target) return

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    }

    const timer = window.setTimeout(scrollToHashTarget, 0)
    window.addEventListener('hashchange', scrollToHashTarget)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', scrollToHashTarget)
    }
  }, [])

  if (window.location.pathname === '/costumize/details') {
    return <DetailsPage />
  }

  if (window.location.pathname === '/costumize') {
    return <CostumizePage />
  }

  if (window.location.pathname === '/profile') {
    return <ProfilePage />
  }

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
