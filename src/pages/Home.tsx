import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import AmenitiesSection from '@/components/sections/AmenitiesSection'
import GallerySection from '@/components/sections/GallerySection'
import EventsSection from '@/components/sections/EventsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div style={{ background: '#0A0A0A' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AmenitiesSection />
      <GallerySection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
