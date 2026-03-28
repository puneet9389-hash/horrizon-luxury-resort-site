import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const gold = 'hsl(43 65% 55%)'

type Category = 'All' | 'Outside' | 'Rooms' | 'Pool' | 'Hall' | 'Events'

const galleryItems: { src: string; alt: string; category: Exclude<Category, 'All'> }[] = [
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    alt: 'Villa Exterior',
    category: 'Outside',
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    alt: 'Garden & Lawn',
    category: 'Outside',
  },
  {
    src: 'https://images.unsplash.com/photo-1573663520878-8c38b10264fc?auto=format&fit=crop&q=80&w=800',
    alt: 'Resort Night View',
    category: 'Outside',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    alt: 'Luxury Bedroom',
    category: 'Rooms',
  },
  {
    src: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&q=80&w=800',
    alt: 'Suite Interior',
    category: 'Rooms',
  },
  {
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    alt: 'Modern Bathroom',
    category: 'Rooms',
  },
  {
    src: 'https://images.unsplash.com/photo-1704793027627-6b47800fc2ec?auto=format&fit=crop&q=80&w=800',
    alt: 'Pool at Night',
    category: 'Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1608904872226-19d69391c761?auto=format&fit=crop&q=80&w=800',
    alt: 'Resort Pool',
    category: 'Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1707589338014-cb60c7e74471?auto=format&fit=crop&q=80&w=800',
    alt: 'Pool Bar',
    category: 'Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    alt: 'Event Hall',
    category: 'Hall',
  },
  {
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    alt: 'Birthday Celebration',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1533030265665-8a0445a83c61?auto=format&fit=crop&q=80&w=800',
    alt: 'Party Lights',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1580656155356-c0c1389c5cba?auto=format&fit=crop&q=80&w=800',
    alt: 'Pool Party',
    category: 'Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1574728435494-4134e681f687?auto=format&fit=crop&q=80&w=800',
    alt: 'BBQ Night',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1757889693460-ee7ce71395db?auto=format&fit=crop&q=80&w=800',
    alt: 'Illuminated Pool',
    category: 'Pool',
  },
]

const categories: Category[] = ['All', 'Outside', 'Rooms', 'Pool', 'Hall', 'Events']

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<Category>('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered =
    active === 'All' ? galleryItems : galleryItems.filter((item) => item.category === active)

  return (
    <section
      id="gallery"
      ref={ref}
      style={{ background: '#0A0A0A' }}
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: gold }} />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: gold }}>
              Visual Story
            </span>
            <div className="h-px w-10" style={{ background: gold }} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">The Vibe</h2>
          <p className="mt-4 text-white/50 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            A glimpse into the world of The Horrizon — captured in moments, lived in memories.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200"
              style={
                active === cat
                  ? { background: gold, color: '#0A0A0A' }
                  : {
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => setLightbox(item.src)}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span
                  className="text-xs uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                  {item.alt}
                </span>
              </div>
              {/* Category tag */}
              <div
                className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gold, color: '#0A0A0A', fontWeight: 700 }}
              >
                {item.category}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-h-[90vh] max-w-full object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </section>
  )
}
