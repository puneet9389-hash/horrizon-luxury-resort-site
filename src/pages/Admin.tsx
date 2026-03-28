import React, { useState } from 'react'
import {
  Button,
  DataTable,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Card,
  CardContent,
  EmptyState,
  toast,
} from '@blinkdotnew/ui'
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
import { useBookings } from '@/hooks/useBookings'
import { useGallery } from '@/hooks/useGallery'
import { useInquiries } from '@/hooks/useInquiries'
import { useEvents } from '@/hooks/useEvents'
import type { ColumnDef } from '@tanstack/react-table'
import type { Inquiry } from '@/hooks/useInquiries'
import type { EventItem } from '@/hooks/useEvents'

const gold = 'hsl(43 65% 55%)'

function LoginScreen() {
  const { login } = useAuth()
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#0A0A0A' }}
    >
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <Shield className="h-12 w-12 mx-auto mb-6" style={{ color: gold }} />
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/40 text-sm">The Horrizon Management Console</p>
        </div>
        <Button
          onClick={login}
          className="w-full py-3 font-bold uppercase tracking-widest"
          style={{ background: gold, color: '#0A0A0A', borderRadius: 0 }}
        >
          Login to Continue
        </Button>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </a>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const { listAllBookings } = useBookings()
  const { listItems, deleteItem } = useGallery()
  const { list: inquiriesList } = useInquiries()
  const { list: eventsList, create: createEvent, remove: removeEvent } = useEvents()

  const [newEventForm, setNewEventForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
  })

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

  // Inquiry columns
  const inquiryColumns: ColumnDef<Inquiry>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'eventType', header: 'Event Type' },
    { accessorKey: 'eventDate', header: 'Date' },
    { accessorKey: 'guestCount', header: 'Guests' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: { original: Inquiry } }) => (
        <Badge
          style={
            row.original.status === 'new'
              ? { background: gold, color: '#0A0A0A' }
              : {}
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    { accessorKey: 'createdAt', header: 'Received' },
  ]

  const bookingColumns = [
    { accessorKey: 'id', header: 'Booking ID' },
    { accessorKey: 'guestName', header: 'Guest' },
    { accessorKey: 'packageName', header: 'Package' },
    { accessorKey: 'checkIn', header: 'Check In' },
    {
      accessorKey: 'totalPrice',
      header: 'Total (₹)',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'confirmed' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
  ]

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEventForm.name || !newEventForm.description) {
      toast.error('Name and description are required.')
      return
    }
    try {
      await createEvent.mutateAsync({
        ...newEventForm,
        isActive: 1,
        createdAt: new Date().toISOString(),
      })
      toast.success('Event added!')
      setNewEventForm({ name: '', description: '', imageUrl: '', category: '' })
    } catch {
      toast.error('Failed to add event.')
    }
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      await removeEvent.mutateAsync(id)
      toast.success('Event removed.')
    } catch {
      toast.error('Failed to remove event.')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Top Bar */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: '#0A0A0A', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
          </a>
          <span className="font-serif text-xl font-bold" style={{ color: gold }}>
            THE HORRIZON
          </span>
          <span className="text-white/30 text-sm hidden sm:block">/ Admin Console</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-xs text-white/60 font-medium">{user?.displayName || user?.email}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Administrator</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-white/40 hover:text-white gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-white">Management Console</h1>
          <p className="text-white/40 text-sm mt-1">Manage inquiries, events, bookings, and gallery</p>
        </div>

        <Tabs defaultValue="inquiries">
          <TabsList
            className="mb-8 p-1 gap-1 h-auto flex-wrap"
            style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 0 }}
          >
            <TabsTrigger value="inquiries" className="gap-2 rounded-none">
              <MessageSquare className="h-4 w-4" />
              Inquiries
              {(inquiriesList.data?.length ?? 0) > 0 && (
                <span
                  className="ml-1 text-[10px] px-1.5 py-0.5 font-bold"
                  style={{ background: gold, color: '#0A0A0A', borderRadius: '2px' }}
                >
                  {inquiriesList.data?.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2 rounded-none">
              <Sparkles className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2 rounded-none">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2 rounded-none">
              <ImageIcon className="h-4 w-4" />
              Gallery
            </TabsTrigger>
          </TabsList>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-white font-semibold">Guest Inquiries</h2>
              <Badge style={{ background: gold, color: '#0A0A0A' }}>
                {inquiriesList.data?.length ?? 0} Total
              </Badge>
            </div>
            {inquiriesList.isLoading ? (
              <div className="text-white/40 text-sm text-center py-12">Loading inquiries...</div>
            ) : (inquiriesList.data?.length ?? 0) === 0 ? (
              <EmptyState
                icon={<MessageSquare />}
                title="No inquiries yet"
                description="Guest inquiries from the website will appear here."
              />
            ) : (
              <DataTable
                columns={inquiryColumns}
                data={inquiriesList.data ?? []}
                searchable
                searchColumn="name"
              />
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Add Event Form */}
              <div
                className="p-6 border"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
              >
                <h3 className="font-serif text-lg text-white mb-5">Add New Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Event Name *</label>
                    <Input
                      value={newEventForm.name}
                      onChange={(e) => setNewEventForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Pool Party"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Description *</label>
                    <textarea
                      value={newEventForm.description}
                      onChange={(e) => setNewEventForm((p) => ({ ...p, description: e.target.value }))}
                      rows={3}
                      placeholder="Event description..."
                      className="w-full px-3 py-2 text-sm text-white border placeholder:text-white/25 outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Image URL</label>
                    <Input
                      value={newEventForm.imageUrl}
                      onChange={(e) => setNewEventForm((p) => ({ ...p, imageUrl: e.target.value }))}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Category</label>
                    <Input
                      value={newEventForm.category}
                      onChange={(e) => setNewEventForm((p) => ({ ...p, category: e.target.value }))}
                      placeholder="Party, Wedding, Corporate..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-bold uppercase tracking-wider"
                    style={{ background: gold, color: '#0A0A0A', borderRadius: 0 }}
                    disabled={createEvent.isPending}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {createEvent.isPending ? 'Adding...' : 'Add Event'}
                  </Button>
                </form>
              </div>

              {/* Events List */}
              <div className="lg:col-span-2">
                <h3 className="font-serif text-lg text-white mb-5">Current Events</h3>
                {eventsList.isLoading ? (
                  <div className="text-white/40 text-sm text-center py-12">Loading events...</div>
                ) : (eventsList.data?.length ?? 0) === 0 ? (
                  <EmptyState
                    icon={<Sparkles />}
                    title="No events yet"
                    description="Add your first event using the form."
                  />
                ) : (
                  <div className="space-y-3">
                    {eventsList.data?.map((event: EventItem) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-4 p-4 border"
                        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                      >
                        {event.imageUrl && (
                          <div className="w-16 h-16 overflow-hidden shrink-0">
                            <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white">{event.name}</p>
                          <p className="text-xs text-white/40 mt-0.5 truncate">{event.description}</p>
                          {event.category && (
                            <Badge variant="outline" className="mt-1 text-[10px] border-white/15 text-white/40">
                              {event.category}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-destructive hover:text-destructive shrink-0"
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
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="mb-4">
              <h2 className="text-white font-semibold">All Bookings</h2>
            </div>
            {listAllBookings.isLoading ? (
              <div className="text-white/40 text-sm text-center py-12">Loading bookings...</div>
            ) : (listAllBookings.data?.length ?? 0) === 0 ? (
              <EmptyState
                icon={<Calendar />}
                title="No bookings yet"
                description="Bookings from the website will appear here."
              />
            ) : (
              <DataTable
                columns={bookingColumns}
                data={listAllBookings.data ?? []}
                searchable
                searchColumn="guestName"
              />
            )}
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-white font-semibold">Gallery Images</h2>
              <Badge variant="outline" className="border-white/15 text-white/40">
                {listItems.data?.length ?? 0} items
              </Badge>
            </div>
            {listItems.isLoading ? (
              <div className="text-white/40 text-sm text-center py-12">Loading gallery...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {listItems.data?.map((item: any) => (
                  <div key={item.id} className="group relative aspect-square overflow-hidden">
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => deleteItem.mutate(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                {(listItems.data?.length ?? 0) === 0 && (
                  <EmptyState
                    icon={<ImageIcon />}
                    title="Gallery is empty"
                    description="No gallery images have been uploaded yet."
                  />
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
