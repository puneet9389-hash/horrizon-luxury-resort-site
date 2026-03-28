import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/lib/blink'
import { useAuth } from './useAuth'

export type Booking = {
  id: string
  userId: string
  packageId: string
  bookingDate: string
  guestCount: number
  status: 'pending' | 'confirmed' | 'cancelled'
  totalPrice: number
  customerName: string
  customerPhone: string
  customerEmail?: string
  notes?: string
  createdAt: string
}

export function useBookings() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const listUserBookings = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return []
      const { data } = await blink.db.table('bookings').list({ userId: user.id })
      return data as Booking[]
    },
    enabled: !!user,
  })

  const listAllBookings = useQuery({
    queryKey: ['bookings', 'all'],
    queryFn: async () => {
      const { data } = await blink.db.table('bookings').list()
      return data as Booking[]
    },
    enabled: !!user && user.role === 'admin',
  })

  const createBooking = useMutation({
    mutationFn: async (newBooking: Partial<Booking>) => {
      const id = crypto.randomUUID()
      const { data } = await blink.db.table('bookings').create({ 
        ...newBooking, 
        id, 
        userId: user?.id || 'anonymous'
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: Booking['status'] }) => {
      const { data } = await blink.db.table('bookings').update(id, { status })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      await blink.db.table('bookings').remove(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  return { listUserBookings, listAllBookings, createBooking, updateBookingStatus, deleteBooking }
}
