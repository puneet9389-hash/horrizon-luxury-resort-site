import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
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
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('userId', user.id)
      if (error) throw error
      return (data || []) as Booking[]
    },
    enabled: !!user,
  })

  const listAllBookings = useQuery({
    queryKey: ['bookings', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
      if (error) throw error
      return (data || []) as Booking[]
    },
    enabled: !!user && user.role === 'admin',
  })

  const createBooking = useMutation({
    mutationFn: async (newBooking: Partial<Booking>) => {
      const id = crypto.randomUUID()
      const { data, error } = await supabase
        .from('bookings')
        .insert([{ 
          ...newBooking, 
          id, 
          userId: user?.id || 'anonymous'
        }])
        .select()
      if (error) throw error
      return data?.[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: Booking['status'] }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
      if (error) throw error
      return data?.[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  return { listUserBookings, listAllBookings, createBooking, updateBookingStatus, deleteBooking }
}

