import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import InstagramIcon from '@/components/icons/InstagramIcon'

const gold = 'hsl(43 65% 55%)'

const storyImages = [
  {
    src: 'https://lh3.googleusercontent.com/p/AF1QipOJF-y7RpgLRSuK_Q5bQSHDMsuo3u32y-5091qY=s1360-w1360-h1020-rw?auto=format&fit=crop&q=80&w=800',
    alt: 'Villa exterior',
  },
  {
    src: '/assets/568348331_17863741992489200_8314827710092237907_n.jpg',
    alt: 'Resort garden',
  },
  {
    src: 'https://lh3.googleusercontent.com/p/AF1QipN__UDs4kgUXzz--wKCOqbGvYYcKpe2RsUdM4gE=w243-h406-n-k-no-nu?auto=format&fit=crop&q=80&w=800',
    alt: 'Pool night',
  },
  {
    src: '/assets/608200439_17871536241489200_5106764748960272210_n (1).jpg?auto=format&fit=crop&q=80&w=800',
    alt: 'Luxury room',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: '#0A0A0A' }}
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: gold }} />
              <span
                className="text-xs uppercase tracking-[0.3em] font-semibold"
                style={{ color: gold }}
              >
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-4xl font-bold text-white md:text-5xl leading-tight mb-8">
              A Passion Project Born
              <br />
              <span className="italic" style={{ color: gold }}>
                From Pure Love
              </span>
            </h2>

            <p className="text-white/60 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem' }}>
              Born from a shared vision of two friends —{' '}
              <strong className="text-white/90">Mr. Amrit Singh</strong> and{' '}
              <strong className="text-white/90">Manish Aggarwal</strong> — The Horrizon was
              created to bring a private luxury escape to the heart of Dehradun. Nestled in the
              serene foothills of the Himalayas, we built a place where friends gather, couples
              celebrate, and families create memories that last forever.
            </p>

            <p className="text-white/60 leading-relaxed mb-10" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem' }}>
              What started as a passion project has become Dehradun's most sought-after private
              farmhouse resort — a place where every detail is designed for your comfort, privacy,
              and pure joy.
            </p>

            {/* Instagram Partners */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://instagram.com/_official.sardarji_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200 group"
              >
                <InstagramIcon className="h-4 w-4 group-hover:text-[#E1306C] transition-colors" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Partner</p>
                  <p className="text-sm font-semibold">@_official.sardarji_</p>
                </div>
              </a>
              <a
                href="https://instagram.com/manishaggarwal22442"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200 group"
              >
                <InstagramIcon className="h-4 w-4 group-hover:text-[#E1306C] transition-colors" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Partner</p>
                  <p className="text-sm font-semibold">@manishaggarwal22442</p>
                </div>
              </a>
            </div>

            {/* Stats Row */}
            <div className="mt-12 flex gap-10 border-t border-white/10 pt-10">
              {[
                { value: '500+', label: 'Events Hosted' },
                { value: '2000+', label: 'Happy Guests' },
                { value: '4.9★', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl font-bold" style={{ color: gold }}>
                    {s.value}
                  </p>
                  <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 h-[520px]"
          >
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-sm flex-1">
                <img
                  src={storyImages[0].src}
                  alt={storyImages[0].alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-sm h-40">
                <img
                  src={storyImages[1].src}
                  alt={storyImages[1].alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-12">
              <div className="overflow-hidden rounded-sm h-40">
                <img
                  src={storyImages[2].src}
                  alt={storyImages[2].alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-sm flex-1">
                <img
                  src={storyImages[3].src}
                  alt={storyImages[3].alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
