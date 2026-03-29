import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

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
      const { data, error } = await supabase.from('testimonials').select('*')
      if (error) throw error
      return (data as Testimonial[]) || []
    },
  })

  const createTestimonial = useMutation({
    mutationFn: async (newTestimonial: Partial<Testimonial>) => {
      const id = crypto.randomUUID()
      const { data, error } = await supabase.from('testimonials').insert([{ ...newTestimonial, id, createdAt: new Date().toISOString() }]).select()
      if (error) throw error
      return data?.[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })

  return { listTestimonials, createTestimonial, deleteTestimonial }
}
