import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { toast, Dialog, DialogContent, DialogHeader, DialogTitle, Button, Input, Badge } from '@blinkdotnew/ui'
import { X, ArrowRight } from 'lucide-react'
import { useInquiries } from '@/hooks/useInquiries'

const gold = 'hsl(43 65% 55%)'

const staticEvents = [
  {
    id: 'pool-party',
    name: 'Pool Parties',
    description: 'Epic day-to-night pool parties with LED lights, DJ music, and premium drinks. Perfect for groups of any size.',
    imageUrl: 'https://images.unsplash.com/photo-1580656155356-c0c1389c5cba?auto=format&fit=crop&q=80&w=800',
    category: 'Party',
  },
  {
    id: 'birthday',
    name: 'Birthday Celebrations',
    description: 'Make your special day unforgettable with custom setups, balloon décor, cakes, and a private pool to yourself.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    category: 'Celebration',
  },
  {
    id: 'bachelor',
    name: 'Bachelor / Bachelorette',
    description: 'The ultimate pre-wedding bash. Pool, music, games, and memories with your closest crew — done in ultimate style.',
    imageUrl: 'https://images.unsplash.com/photo-1533030265665-8a0445a83c61?auto=format&fit=crop&q=80&w=800',
    category: 'Party',
  },
  {
    id: 'haldi-mehndi',
    name: 'Haldi & Mehndi',
    description: 'Vibrant, colorful, and deeply personal. Our lush lawns and garden spaces make the perfect backdrop for traditional ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    category: 'Wedding',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    description: 'Team outings, offsites, and corporate retreats with full privacy. Modern facilities meet serene natural settings.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    category: 'Corporate',
  },
  {
    id: 'holi',
    name: 'Holi Parties',
    description: "India's most colorful festival, celebrated in style. Pool, colors, music, and Thandai — the complete Holi experience.",
    imageUrl: 'https://images.unsplash.com/photo-1574728435494-4134e681f687?auto=format&fit=crop&q=80&w=800',
    category: 'Festival',
  },
]

interface InquiryModalProps {
  open: boolean
  eventName: string
  onClose: () => void
}

function InquiryModal({ open, eventName, onClose }: InquiryModalProps) {
  const { create } = useInquiries()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: eventName,
    eventDate: '',
    guestCount: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please fill in your name and phone number.')
      return
    }
    setSubmitting(true)
    try {
      await create.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        eventType: form.eventType,
        eventDate: form.eventDate || undefined,
        guestCount: form.guestCount ? parseInt(form.guestCount) : undefined,
        message: form.message || undefined,
        status: 'new',
        createdAt: new Date().toISOString(),
      })
      toast.success('Inquiry Sent! 🎉', {
        description: "We'll WhatsApp you within 2 hours.",
      })
      onClose()
      setForm({ name: '', phone: '', email: '', eventType: eventName, eventDate: '', guestCount: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please WhatsApp us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg p-0 overflow-hidden border-0"
        style={{ background: '#111', borderRadius: 0 }}
      >
        {/* Gold top bar */}
        <div className="h-1 w-full" style={{ background: gold }} />

        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: gold }}>
                  Make An Inquiry
                </p>
                <DialogTitle className="font-serif text-2xl text-white">
                  {eventName}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Your Name *
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Phone *
                </label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                Email (optional)
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="w-full rounded-md px-3 py-2 text-sm text-white border bg-white/5 border-white/10 outline-none focus:border-yellow-500/50"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  {staticEvents.map((e) => (
                    <option key={e.id} value={e.name} style={{ background: '#111' }}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                  Preferred Date
                </label>
                <Input
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                Number of Guests
              </label>
              <Input
                name="guestCount"
                type="number"
                value={form.guestCount}
                onChange={handleChange}
                placeholder="Approx. guest count"
                min="1"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                Message / Requirements
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your vision..."
                className="w-full rounded-md px-3 py-2 text-sm text-white border bg-white/5 border-white/10 placeholder:text-white/30 outline-none focus:border-yellow-500/50 resize-none"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 font-bold uppercase tracking-wider"
                style={{ background: gold, color: '#0A0A0A', borderRadius: 0 }}
              >
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/10 text-white/60 hover:text-white"
                style={{ borderRadius: 0 }}
              >
                Cancel
              </Button>
            </div>

            <p className="text-[10px] text-white/30 text-center mt-2">
              We'll respond via WhatsApp within 2 hours ✓
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function EventsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  return (
    <section
      id="events"
      ref={ref}
      style={{ background: '#080808' }}
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
              Celebrate With Us
            </span>
            <div className="h-px w-10" style={{ background: gold }} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Events &amp; Celebrations
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            From intimate gatherings to wild parties — we host it all with style, privacy, and perfection.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ minHeight: '380px' }}
            >
              {/* Background */}
              <div className="absolute inset-0">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <Badge
                  className="text-[10px] uppercase tracking-widest border-0 font-bold"
                  style={{ background: gold, color: '#0A0A0A' }}
                >
                  {event.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6" style={{ minHeight: '380px' }}>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">{event.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-sans)' }}>
                  {event.description}
                </p>
                <button
                  onClick={() => setSelectedEvent(event.name)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 group/btn w-fit"
                  style={{ color: gold }}
                >
                  Inquire Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Hover accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: gold }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
            Not sure which package fits? Let's plan it together.
          </p>
          <button
            onClick={() => setSelectedEvent('Custom Event')}
            className="px-10 py-4 text-sm font-bold uppercase tracking-widest border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200"
          >
            Plan A Custom Event
          </button>
        </motion.div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        open={!!selectedEvent}
        eventName={selectedEvent || ''}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  )
}
