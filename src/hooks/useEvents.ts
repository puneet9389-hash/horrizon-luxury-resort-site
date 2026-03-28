import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/lib/blink'

export type EventItem = {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  isActive: number
  createdAt: string
}

export function useEvents() {
  const qc = useQueryClient()
  const list = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await blink.db.table('events').list()
      return data as EventItem[]
    },
  })
  const create = useMutation({
    mutationFn: async (d: Partial<EventItem>) => {
      const id = crypto.randomUUID()
      await blink.db.table('events').create({ ...d, id, createdAt: new Date().toISOString() })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
  const remove = useMutation({
    mutationFn: async (id: string) => {
      await blink.db.table('events').remove(id)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
  return { list, create, remove }
}
