import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/lib/blink'

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
      const { data } = await blink.db.table('inquiries').list()
      return data as Inquiry[]
    },
  })
  const create = useMutation({
    mutationFn: async (d: Partial<Inquiry>) => {
      const id = crypto.randomUUID()
      await blink.db.table('inquiries').create({ ...d, id, status: 'new', createdAt: new Date().toISOString() })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inquiries'] }),
  })
  return { list, create }
}
