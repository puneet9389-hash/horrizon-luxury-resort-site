import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/lib/blink'

export type Testimonial = {
  id: string
  name: string
  rating: number
  comment: string
  imageUrl: string
  createdAt: string
}

export function useTestimonials() {
  const queryClient = useQueryClient()

  const listTestimonials = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await blink.db.table('testimonials').list()
      return data as Testimonial[]
    },
  })

  const createTestimonial = useMutation({
    mutationFn: async (newTestimonial: Partial<Testimonial>) => {
      const id = crypto.randomUUID()
      const { data } = await blink.db.table('testimonials').create({ ...newTestimonial, id })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      await blink.db.table('testimonials').remove(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })

  return { listTestimonials, createTestimonial, deleteTestimonial }
}
