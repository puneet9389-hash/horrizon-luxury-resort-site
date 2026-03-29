import React, { useState, useEffect } from 'react'
import { Button } from '@/components/blink-ui-compat'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
]

function scrollToSection(href: string) {
  if (href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default React.memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    setTimeout(() => scrollToSection(href), mobileOpen ? 300 : 0)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl shadow-black/30 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex flex-col leading-none text-left"
            >
              <span
                className="font-serif text-2xl font-bold tracking-wider"
                style={{ color: 'hsl(43 65% 55%)' }}
              >
                THE HORRIZON
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 mt-0.5">
                Luxury Farmhouse · Dehradun
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 uppercase tracking-[0.1em]"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                onClick={() => handleNavClick('#contact')}
                className="rounded-none px-6 py-2.5 text-sm font-semibold uppercase tracking-wider"
                style={{
                  background: 'hsl(43 65% 55%)',
                  color: '#0A0A0A',
                  border: 'none',
                }}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-300 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,10,10,0.98)' }}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-3xl font-serif font-bold text-white/80 hover:text-white transition-all duration-200"
              style={{
                transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `all 0.3s ease ${i * 50}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="mt-4 px-10 py-3 text-lg font-semibold uppercase tracking-widest rounded-none"
            style={{
              background: 'hsl(43 65% 55%)',
              color: '#0A0A0A',
              transitionDelay: mobileOpen ? `${navLinks.length * 50}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
              transition: `all 0.3s ease ${navLinks.length * 50}ms`,
            }}
          >
            Book Now
          </button>
        </nav>

        {/* Decorative */}
        <div
          className="absolute bottom-12 text-center"
          style={{ color: 'hsl(43 65% 55% / 0.4)' }}
        >
          <p className="text-xs uppercase tracking-[0.3em]">The Horrizon · Dehradun</p>
        </div>
      </div>
    </>
  )
})
