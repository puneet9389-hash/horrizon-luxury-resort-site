import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export type Package = {
  id: string
  name: string
  price: number
  description: string
  features: string // JSON string or string array
  guestLimit: number
  imageUrl: string
  category: string
  createdAt: string
}

export function usePackages() {
  const queryClient = useQueryClient()

  const listPackages = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('packages').select('*')
      if (error) throw error
      return (data as Package[]) || []
    },
  })

  const createPackage = useMutation({
    mutationFn: async (newPackage: Partial<Package>) => {
      const id = crypto.randomUUID()
      const { data, error } = await supabase.from('packages').insert([{ ...newPackage, id, createdAt: new Date().toISOString() }]).select()
      if (error) throw error
      return data?.[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const updatePackage = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Package> & { id: string }) => {
      const { data, error } = await supabase.from('packages').update(updates).eq('id', id).select()
      if (error) throw error
      return data?.[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const deletePackage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('packages').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  return {
    listPackages,
    createPackage,
    updatePackage,
    deletePackage,
  }
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: ['package', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('packages').select('*').eq('id', id).single()
      if (error) throw error
      return data as Package
    },
    enabled: !!id,
  })
}
