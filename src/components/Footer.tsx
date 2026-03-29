import React from 'react'
import { MapPin, Phone, MessageCircle, Mail, Heart } from 'lucide-react'
import InstagramIcon from '@/components/icons/InstagramIcon'

function scrollToSection(href: string) {
  if (href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const gold = 'hsl(43 65% 55%)'

export default React.memo(function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => scrollToSection('#home')} className="block mb-4 text-left">
              <span
                className="font-serif text-3xl font-bold tracking-wider"
                style={{ color: gold }}
              >
                THE HORRIZON
              </span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-white/40 mt-1">
                Luxury Farmhouse · Dehradun
              </span>
            </button>
            <p className="text-white/50 text-sm leading-relaxed mt-6 max-w-xs">
              Dehradun's most exclusive private luxury farmhouse resort. Where every moment becomes a cherished memory.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="https://instagram.com/_official.sardarji_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                aria-label="Sardar Ji Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/manishaggarwal22442"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                aria-label="Manish Aggarwal Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.3em] font-semibold mb-6"
              style={{ color: gold }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Amenities', href: '#amenities' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Events', href: '#events' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-white/50 hover:text-white/90 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.3em] font-semibold mb-6"
              style={{ color: gold }}
            >
              Events We Host
            </h3>
            <ul className="space-y-3">
              {[
                'Pool Parties',
                'Birthday Celebrations',
                'Bachelor / Bachelorette',
                'Haldi & Mehndi',
                'Corporate Events',
                'Holi Parties',
                'Night Stays',
                'Private Stays',
              ].map((event) => (
                <li key={event}>
                  <span className="text-sm text-white/50">{event}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.3em] font-semibold mb-6"
              style={{ color: gold }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: gold }} />
                <span className="text-sm text-white/50 leading-relaxed">
                  The Horrizon, Mussoorie Road,<br />Dehradun, Uttarakhand
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 shrink-0" style={{ color: gold }} />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-white/50 hover:text-white/90 transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 shrink-0" style={{ color: gold }} />
                <a
                  href="mailto:hello@thehorrizon.in"
                  className="text-sm text-white/50 hover:text-white/90 transition-colors"
                >
                  hello@thehorrizon.in
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20The%20Horrizon"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ background: '#25D366', color: '#fff' }}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {year} The Horrizon. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            Founded with <Heart className="h-3 w-3 fill-current" style={{ color: gold }} /> by{' '}
            <a
              href="https://instagram.com/_official.sardarji_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
              style={{ color: gold }}
            >
              Sardar Ji
            </a>{' '}
            &amp;{' '}
            <a
              href="https://instagram.com/manishaggarwal22442"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
              style={{ color: gold }}
            >
              Manish Aggarwal
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
})
