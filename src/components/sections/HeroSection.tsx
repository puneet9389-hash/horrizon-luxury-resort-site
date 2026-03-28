import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const gold = 'hsl(43 65% 55%)'

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[600px] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562805791-dbca2a22bba2?auto=format&fit=crop&q=80&w=2000')",
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <div className="h-px w-12" style={{ background: gold }} />
          <span
            className="text-xs uppercase tracking-[0.35em] font-semibold"
            style={{ color: gold }}
          >
            Dehradun's Most Exclusive Private Resort
          </span>
          <div className="h-px w-12" style={{ background: gold }} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Where Every Moment
          <br />
          <span className="italic" style={{ color: gold }}>
            Becomes A Memory
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/70 leading-relaxed md:text-xl"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Nestled in the serene foothills of the Himalayas — a private luxury farmhouse where
          celebrations come alive and tranquility meets indulgence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: gold, color: '#0A0A0A' }}
          >
            Book Your Experience
          </button>
          <button
            onClick={() => scrollToSection('#about')}
            className="px-10 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/60 active:scale-95"
          >
            Explore
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}
