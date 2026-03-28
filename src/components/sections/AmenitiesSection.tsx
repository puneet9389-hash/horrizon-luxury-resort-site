import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const gold = 'hsl(43 65% 55%)'

const amenities = [
  {
    id: 'eat',
    title: 'EAT',
    subtitle: 'Flavors that nourish the soul',
    description:
      'From sizzling BBQ nights under the stars to homestyle North Indian meals, our in-house kitchen serves flavors that match the warmth of our hospitality. Private dining setups for couples, group meals by the pool, and customized menus for your events.',
    image: 'https://images.unsplash.com/photo-1574728435494-4134e681f687?auto=format&fit=crop&q=80&w=800',
    tags: ['BBQ Nights', 'Private Dining', 'Custom Menus'],
  },
  {
    id: 'stay',
    title: 'STAY',
    subtitle: 'Wake up to mountain views',
    description:
      'Premium AC rooms with king-size beds, modern bathrooms, and private balconies overlooking the property. Whether it\'s a romantic night stay or a weekend getaway with friends, wake up to mountain views and the sound of birds.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    tags: ['AC Rooms', 'King Beds', 'Mountain Views'],
  },
  {
    id: 'dive',
    title: 'DIVE',
    subtitle: 'Where the magic happens',
    description:
      'Our temperature-controlled pool is the heart of The Horrizon. From daytime lounging to epic night pool parties with LED lights and music, the pool is where the magic happens. Available for private bookings.',
    image: 'https://images.unsplash.com/photo-1757889693460-ee7ce71395db?auto=format&fit=crop&q=80&w=800',
    tags: ['Night Pool', 'LED Lights', 'Private Booking'],
  },
]

function scrollToContact() {
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function AmenitiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="amenities"
      ref={ref}
      style={{ background: '#080808' }}
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: gold }} />
            <span
              className="text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: gold }}
            >
              The Experience
            </span>
            <div className="h-px w-10" style={{ background: gold }} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Experience The Horrizon
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Three pillars of an unforgettable escape — curated for comfort, pleasure, and pure indulgence.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ minHeight: '520px' }}
              onClick={scrollToContact}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-end p-8" style={{ minHeight: '520px' }}>
                <div
                  className="text-xs uppercase tracking-[0.4em] mb-3"
                  style={{ color: gold, opacity: 0.8 }}
                >
                  {amenity.subtitle}
                </div>
                <h3 className="font-serif text-5xl font-bold text-white mb-4 leading-none">
                  {amenity.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                  {amenity.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {amenity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-3 py-1 border border-white/20 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all duration-200 group/btn"
                  style={{ color: gold }}
                >
                  Inquire Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Top gold line accent on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 group-hover:opacity-100 opacity-0"
                style={{ background: gold }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
