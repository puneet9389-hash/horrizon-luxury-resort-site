import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/lib/blink'

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
      const { data } = await blink.db.table('gallery').list()
      return data as GalleryItem[]
    },
  })

  const createItem = useMutation({
    mutationFn: async (newItem: Partial<GalleryItem>) => {
      const id = crypto.randomUUID()
      const { data } = await blink.db.table('gallery').create({ ...newItem, id })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      await blink.db.table('gallery').remove(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })

  return { listItems, createItem, deleteItem }
}
