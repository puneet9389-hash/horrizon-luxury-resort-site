import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { toast, Input, Button } from '@/components/blink-ui-compat'
import { MapPin, Phone, Mail, MessageCircle, Car, Train, Plane, Navigation } from 'lucide-react'
import { useInquiries } from '@/hooks/useInquiries'
import { CONTACT } from '@/config/contact'

const gold = 'hsl(43 65% 55%)'

const distances = [
  { icon: Train, label: 'Dehradun Railway Station', distance: '~12 km' },
  { icon: Car, label: 'ISBT Dehradun', distance: '~10 km' },
  { icon: Plane, label: 'Jolly Grant Airport', distance: '~25 km' },
  { icon: Navigation, label: 'Clock Tower', distance: '~8 km' },
]

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { create } = useInquiries()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'General Inquiry',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Name and phone are required.')
      return
    }
    setSubmitting(true)
    try {
      await create.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        eventType: form.eventType,
        message: form.message || undefined,
        status: 'new',
        createdAt: new Date().toISOString(),
      })
      toast.success('Message Sent! ✨', {
        description: "We'll get back to you via WhatsApp soon.",
      })
      setForm({ name: '', phone: '', email: '', eventType: 'General Inquiry', message: '' })
    } catch (error) {
      console.error('Inquiry submission error:', error)
      toast.error('Something went wrong. Please WhatsApp us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappLink = `https://wa.me/${CONTACT.WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20The%20Horrizon`
  const mapsEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${CONTACT.COORDINATES.LNG - 0.01},${CONTACT.COORDINATES.LAT - 0.01},${CONTACT.COORDINATES.LNG + 0.01},${CONTACT.COORDINATES.LAT + 0.01}&layer=mapnik&marker=${CONTACT.COORDINATES.LAT},${CONTACT.COORDINATES.LNG}`

  return (
    <section
      id="contact"
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
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: gold }} />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: gold }}>
              Visit Us
            </span>
            <div className="h-px w-10" style={{ background: gold }} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">Find Us</h2>
          <p className="mt-4 text-white/50 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Located on Mussoorie Road, Dehradun — easily accessible, deeply private.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Map + Distances + Contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* OpenStreetMap Embed */}
            <div className="overflow-hidden border border-white/10" style={{ height: '320px' }}>
              <iframe
                title="The Horrizon Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapsEmbedUrl}
                allowFullScreen
              />
            </div>

            {/* Distance Cards */}
            <div className="grid grid-cols-2 gap-3">
              {distances.map(({ icon: Icon, label, distance }) => (
                <div
                  key={label}
                  className="flex gap-3 items-start p-4 border border-white/8"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: gold }} />
                  <div>
                    <p className="text-xs text-white/40 leading-tight">{label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{distance}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div
              className="p-6 border border-white/8"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <h3 className="font-serif text-xl text-white mb-5">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: gold }} />
                  <div>
                    <p className="text-sm text-white/70">{CONTACT.ADDRESS.VENUE}</p>
                    <p className="text-sm text-white/70">{CONTACT.ADDRESS.CITY}, {CONTACT.ADDRESS.STATE} - {CONTACT.ADDRESS.POSTAL_CODE}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: gold }} />
                  <a href={`tel:${CONTACT.PHONE_LINK}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {CONTACT.PHONE}
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: gold }} />
                  <a href={`mailto:${CONTACT.EMAIL}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {CONTACT.EMAIL}
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 w-full py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Quick Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="p-8 border border-white/8 h-full"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="mb-2" style={{ color: gold }}>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold">Quick Inquiry</span>
              </div>
              <h3 className="font-serif text-3xl text-white mb-2">Plan Your Visit</h3>
              <p className="text-sm text-white/40 mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
                Fill in your details and we'll reach out within 2 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                      Phone *
                    </label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                    Interested In
                  </label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm text-white border outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 0,
                    }}
                  >
                    <option value="General Inquiry" style={{ background: '#111' }}>General Inquiry</option>
                    <option value="Pool Parties" style={{ background: '#111' }}>Pool Parties</option>
                    <option value="Birthday Celebrations" style={{ background: '#111' }}>Birthday Celebrations</option>
                    <option value="Bachelor / Bachelorette" style={{ background: '#111' }}>Bachelor / Bachelorette</option>
                    <option value="Haldi & Mehndi" style={{ background: '#111' }}>Haldi & Mehndi</option>
                    <option value="Corporate Events" style={{ background: '#111' }}>Corporate Events</option>
                    <option value="Holi Parties" style={{ background: '#111' }}>Holi Parties</option>
                    <option value="Night Stay" style={{ background: '#111' }}>Night Stay</option>
                    <option value="Private Stay" style={{ background: '#111' }}>Private Stay</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what you're planning..."
                    className="w-full px-3 py-2 text-sm text-white border placeholder:text-white/25 outline-none resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 0,
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 font-bold uppercase tracking-widest text-sm border-0"
                  style={{
                    background: gold,
                    color: '#0A0A0A',
                    borderRadius: 0,
                    height: 'auto',
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Inquiry →'}
                </Button>

                <p className="text-[10px] text-white/25 text-center">
                  We'll respond via WhatsApp within 2 hours. No spam, ever.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
