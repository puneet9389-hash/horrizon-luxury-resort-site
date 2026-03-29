import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export type GalleryItem = {
  id: string
  url: string
  type: 'image' | 'video'
  category: string
  createdAt: string
}

export function useGallery() {
  const queryClient = useQueryClient()

  const listItems = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery').select('*')
      if (error) throw error
      return (data as GalleryItem[]) || []
    },
  })

  const createItem = useMutation({
    mutationFn: async (newItem: Partial<GalleryItem>) => {
      const id = crypto.randomUUID()
      const { data, error } = await supabase.from('gallery').insert([{ ...newItem, id, createdAt: new Date().toISOString() }]).select()
      if (error) throw error
      return data?.[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })

  return { listItems, createItem, deleteItem }
}
