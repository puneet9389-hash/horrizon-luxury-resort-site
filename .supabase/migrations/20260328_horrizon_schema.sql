-- The Horrizon Database Schema Migration
-- Created: 2026-03-28

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  package_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  email TEXT,
  booking_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Packages Table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  features TEXT NOT NULL,
  guest_limit INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_type TEXT NOT NULL,
  event_date DATE,
  guest_count INTEGER,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  category TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access
CREATE POLICY "packages_read" ON packages FOR SELECT USING (true);
CREATE POLICY "gallery_read" ON gallery FOR SELECT USING (true);
CREATE POLICY "events_read" ON events FOR SELECT USING (true);
CREATE POLICY "testimonials_read" ON testimonials FOR SELECT USING (true);

-- RLS Policies: Allow public insert for inquiries
CREATE POLICY "inquiries_insert" ON inquiries FOR INSERT WITH CHECK (true);

-- RLS Policies: Allow public operations for bookings
CREATE POLICY "bookings_insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_read" ON bookings FOR SELECT USING (true);

-- RLS Policies: Allow public insert for gallery
CREATE POLICY "gallery_insert" ON gallery FOR INSERT WITH CHECK (true);

-- RLS Policies: Allow public insert for events
CREATE POLICY "events_insert" ON events FOR INSERT WITH CHECK (true);

-- RLS Policies: Allow public insert for testimonials
CREATE POLICY "testimonials_insert" ON testimonials FOR INSERT WITH CHECK (true);
CREATE INDEX idx_bookings_package_id ON bookings(package_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_events_is_active ON events(is_active);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for images bucket
CREATE POLICY "images_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "images_admin_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "images_admin_delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
