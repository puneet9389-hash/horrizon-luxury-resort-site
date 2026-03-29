import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

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
      const { data, error } = await supabase.from('events').select('*')
      if (error) throw error
      return (data as EventItem[]) || []
    },
  })
  const create = useMutation({
    mutationFn: async (d: Partial<EventItem>) => {
      const id = crypto.randomUUID()
      const { error } = await supabase.from('events').insert([{ ...d, id, createdAt: new Date().toISOString() }])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
  return { list, create, remove }
}
