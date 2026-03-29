import React, { useState, useRef } from 'react'
import {
  Button,
  Badge,
  Input,
  Card,
  CardContent,
  EmptyState,
  toast,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/blink-ui-compat'
import {
  LogOut,
  MessageSquare,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Trash2,
  Shield,
  ArrowLeft,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useGallery } from '@/hooks/useGallery'
import { useInquiries } from '@/hooks/useInquiries'
import { useEvents } from '@/hooks/useEvents'
import { supabase } from '@/lib/supabase'
import type { Inquiry } from '@/hooks/useInquiries'
import type { EventItem } from '@/hooks/useEvents'

const gold = 'hsl(43 65% 55%)'

function LoginScreen() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    setIsLoading(true)
    try {
      await login(email, password)
      toast.success('Login successful!')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#0A0A0A' }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Shield className="h-12 w-12 mx-auto mb-6" style={{ color: gold }} />
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/40 text-sm">The Horrizon Management Console</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@thehorrizon.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 font-bold uppercase tracking-widest"
            style={{ background: gold, color: '#0A0A0A', borderRadius: 0 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login to Continue'}
          </Button>
        </form>

        <a href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </a>
      </div>
    </div>
  )
}

// ── Events Management Component
function EventsManager() {
  const { list: eventsList, create: createEvent, remove: removeEvent } = useEvents()
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
  })
  const [selectedEventFile, setSelectedEventFile] = useState<File | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const eventFileInputRef = useRef<HTMLInputElement>(null)

  const uploadEventFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `events/${fileName}`

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.name || !newEvent.description) {
      toast.error('Name and description are required')
      return
    }
    setIsAdding(true)
    try {
      let imageUrl = newEvent.imageUrl

      if (selectedEventFile) {
        imageUrl = await uploadEventFile(selectedEventFile)
      }

      await createEvent.mutateAsync({
        ...newEvent,
        imageUrl,
        isActive: 1,
      })
      toast.success('Event added successfully!')
      setNewEvent({ name: '', description: '', imageUrl: '', category: '' })
      setSelectedEventFile(null)
      if (eventFileInputRef.current) {
        eventFileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error adding event:', error)
      toast.error('Failed to add event')
    } finally {
      setIsAdding(false)
    }
  }

  const handleEventFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedEventFile(file)
      setNewEvent({ ...newEvent, imageUrl: '' }) // Clear URL when file is selected
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure? This action cannot be undone.')) return
    try {
      await removeEvent.mutateAsync(id)
      toast.success('Event deleted')
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Add Event Form */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h3 className="font-serif text-lg text-white mb-6">Add New Event</h3>
        <form onSubmit={handleAddEvent} className="space-y-5">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Name *</label>
            <Input
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="e.g., Evening Gala"
              disabled={isAdding}
            />
          </div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Description *</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              rows={3}
              placeholder="Event details..."
              className="w-full px-3 py-2 text-sm text-white border border-white/10 bg-white/5 rounded outline-none resize-none"
              disabled={isAdding}
            />
          </div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Upload Image</label>
            <input
              ref={eventFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleEventFileSelect}
              disabled={isAdding}
              className="w-full px-3 py-2 text-sm text-white border border-white/10 bg-white/5 rounded outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            {selectedEventFile && (
              <p className="text-xs text-white/40 mt-1">Selected: {selectedEventFile.name}</p>
            )}
          </div>

          <div className="text-center text-white/30 text-sm">OR</div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Image URL</label>
            <Input
              value={newEvent.imageUrl}
              onChange={(e) => {
                setNewEvent({ ...newEvent, imageUrl: e.target.value })
                setSelectedEventFile(null) // Clear file when URL is entered
              }}
              placeholder="https://..."
              disabled={isAdding || !!selectedEventFile}
            />
            {newEvent.imageUrl && (
              <img src={newEvent.imageUrl} alt="preview" className="mt-2 h-24 w-full object-cover rounded" onError={(e) => (e.currentTarget.style.display = 'none')} />
            )}
          </div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Category</label>
            <Input
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              placeholder="Wedding, Party, Conference..."
              disabled={isAdding}
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold uppercase"
            style={{ background: gold, color: '#0A0A0A', borderRadius: 0 }}
            disabled={isAdding}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? 'Adding...' : 'Add Event'}
          </Button>
        </form>
      </Card>

      {/* Events List */}
      <div className="lg:col-span-2">
        <h3 className="font-serif text-lg text-white mb-4">Current Events ({eventsList.data?.length || 0})</h3>
        {eventsList.isLoading ? (
          <div className="text-white/40 text-center py-12">Loading events...</div>
        ) : (eventsList.data?.length || 0) === 0 ? (
          <EmptyState icon={<Sparkles />} title="No events" description="Add your first event to get started" />
        ) : (
          <div className="space-y-3">
            {eventsList.data?.map((event: EventItem) => (
              <div key={event.id} className="flex items-start gap-4 p-4 border border-white/10 bg-white/5 rounded hover:bg-white/10 transition-colors">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.name} className="w-20 h-20 object-cover rounded shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{event.name}</h4>
                  <p className="text-sm text-white/60 mt-1 line-clamp-2">{event.description}</p>
                  {event.category && <Badge className="mt-2 text-xs">{event.category}</Badge>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-400 hover:text-red-300 shrink-0"
                  disabled={removeEvent.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Gallery Manager Component
function GalleryManager() {
  const { listItems, createItem, deleteItem } = useGallery()
  const [newGalleryItem, setNewGalleryItem] = useState({
    url: '',
    type: 'image' as 'image' | 'video',
    category: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `gallery/${fileName}`

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile && !newGalleryItem.url) {
      toast.error('Please select a file or provide an image URL')
      return
    }
    setIsAdding(true)
    try {
      let imageUrl = newGalleryItem.url

      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile)
      }

      await createItem.mutateAsync({
        ...newGalleryItem,
        url: imageUrl,
      })

      toast.success('Image added to gallery!')
      setNewGalleryItem({ url: '', type: 'image', category: '' })
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error adding gallery item:', error)
      toast.error('Failed to add image')
    } finally {
      setIsAdding(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setNewGalleryItem({ ...newGalleryItem, url: '' }) // Clear URL when file is selected
    }
  }

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try {
      await deleteItem.mutateAsync(id)
      toast.success('Image deleted')
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      toast.error('Failed to delete image')
    }
  }

  return (
    <div className="space-y-8">
      {/* Add Gallery Item */}
      <Card className="border-white/10 bg-white/5 p-6 max-w-md">
        <h3 className="font-serif text-lg text-white mb-6">Add Gallery Image</h3>
        <form onSubmit={handleAddGalleryItem} className="space-y-5">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Upload File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isAdding}
              className="w-full px-3 py-2 text-sm text-white border border-white/10 bg-white/5 rounded outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            {selectedFile && (
              <p className="text-xs text-white/40 mt-1">Selected: {selectedFile.name}</p>
            )}
          </div>

          <div className="text-center text-white/30 text-sm">OR</div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Image URL</label>
            <Input
              value={newGalleryItem.url}
              onChange={(e) => {
                setNewGalleryItem({ ...newGalleryItem, url: e.target.value })
                setSelectedFile(null) // Clear file when URL is entered
              }}
              placeholder="https://..."
              disabled={isAdding || !!selectedFile}
            />
            {newGalleryItem.url && (
              <img src={newGalleryItem.url} alt="preview" className="mt-2 h-24 w-full object-cover rounded" onError={(e) => (e.currentTarget.style.display = 'none')} />
            )}
          </div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Category</label>
            <Input
              value={newGalleryItem.category}
              onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
              placeholder="Rooms, Events, Amenities..."
              disabled={isAdding}
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold uppercase"
            style={{ background: gold, color: '#0A0A0A', borderRadius: 0 }}
            disabled={isAdding}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? 'Uploading...' : 'Add to Gallery'}
          </Button>
        </form>
      </Card>

      {/* Gallery Grid */}
      <div>
        <h3 className="font-serif text-lg text-white mb-4">Gallery ({listItems.data?.length || 0} items)</h3>
        {listItems.isLoading ? (
          <div className="text-white/40 text-center py-12">Loading gallery...</div>
        ) : (listItems.data?.length || 0) === 0 ? (
          <EmptyState icon={<ImageIcon />} title="Gallery is empty" description="Add images to populate your gallery" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {listItems.data?.map((item: any) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded border border-white/10">
                <img src={item.url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-colors flex items-center justify-center">
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteGalleryItem(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Inquiries Manager Component
function InquiriesManager() {
  const { list: inquiriesList } = useInquiries()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg text-white">Guest Inquiries</h3>
        <Badge style={{ background: gold, color: '#0A0A0A' }}>{inquiriesList.data?.length || 0} Total</Badge>
      </div>

      {inquiriesList.isLoading ? (
        <div className="text-white/40 text-center py-12">Loading inquiries...</div>
      ) : (inquiriesList.data?.length || 0) === 0 ? (
        <EmptyState icon={<MessageSquare />} title="No inquiries" description="Guest inquiries will appear here" />
      ) : (
        <div className="space-y-3">
          {inquiriesList.data?.map((inquiry: Inquiry) => (
            <Card key={inquiry.id} className="border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{inquiry.name}</h4>
                  <p className="text-sm text-white/60">{inquiry.phone}</p>
                  {inquiry.email && <p className="text-sm text-white/60">{inquiry.email}</p>}
                </div>
                <Badge style={inquiry.status === 'new' ? { background: gold, color: '#0A0A0A' } : { background: '#10b981', color: 'white' }}>{inquiry.status}</Badge>
              </div>
              <p className="text-sm text-white/50 mb-2">
                <span className="font-medium">Event Type:</span> {inquiry.eventType}
              </p>
              {inquiry.message && <p className="text-sm text-white/60 italic">"{inquiry.message}"</p>}
              <p className="text-xs text-white/40 mt-3">{new Date(inquiry.createdAt).toLocaleString()}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Admin Component
export default function AdminPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: gold, borderTopColor: 'transparent' }} />
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b" style={{ background: '#0A0A0A', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </a>
          <span className="font-serif text-xl font-bold" style={{ color: gold }}>
            THE HORRIZON
          </span>
          <span className="text-white/30 text-sm hidden sm:block">/ Admin</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:text-right">
            <p className="text-xs text-white/60 font-medium">{user?.email}</p>
            <p className="text-[10px] text-white/30 uppercase">Admin</p>
          </div>
          <Button variant="ghost" onClick={logout} className="text-white/40 hover:text-white gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-white">Management Console</h1>
          <p className="text-white/40 text-sm mt-1">Manage events, gallery, and inquiries</p>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-8 bg-white/5 border border-white/10">
            <TabsTrigger value="events" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="inquiries">
            <InquiriesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
