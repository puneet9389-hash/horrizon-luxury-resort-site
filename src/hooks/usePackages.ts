import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/lib/blink'

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
      const { data } = await blink.db.table('packages').list()
      return data as Package[]
    },
  })

  const getPackage = (id: string) => useQuery({
    queryKey: ['package', id],
    queryFn: async () => {
      const { data } = await blink.db.table('packages').get(id)
      return data as Package
    },
    enabled: !!id,
  })

  const createPackage = useMutation({
    mutationFn: async (newPackage: Partial<Package>) => {
      const id = crypto.randomUUID()
      const { data } = await blink.db.table('packages').create({ ...newPackage, id })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const updatePackage = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Package> & { id: string }) => {
      const { data } = await blink.db.table('packages').update(id, updates)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const deletePackage = useMutation({
    mutationFn: async (id: string) => {
      await blink.db.table('packages').remove(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  return { listPackages, getPackage, createPackage, updatePackage, deletePackage }
}
