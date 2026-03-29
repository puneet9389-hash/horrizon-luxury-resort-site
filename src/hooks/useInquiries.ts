import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export type Inquiry = {
  id: string
  name: string
  phone: string
  email?: string
  eventType: string
  eventDate?: string
  guestCount?: number
  message?: string
  status: string
  createdAt: string
}

export function useInquiries() {
  const qc = useQueryClient()
  const list = useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase.from('inquiries').select('*')
      if (error) throw error
      return (data as Inquiry[]) || []
    },
  })
  const create = useMutation({
    mutationFn: async (d: Partial<Inquiry>) => {
      const id = crypto.randomUUID()
      const { error } = await supabase.from('inquiries').insert([{ ...d, id, status: 'new', createdAt: new Date().toISOString() }])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inquiries'] }),
  })
  return { list, create }
}
