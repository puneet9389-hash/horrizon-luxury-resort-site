import React from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router'
import Home from './pages/Home'
import AdminPage from './pages/Admin'
import BookingPage from './pages/Booking'

// 1. Root route — no layout wrapper (landing page handles its own layout)
const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

// 2. Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
})

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking',
  component: BookingPage,
})

// 3. Register routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  bookingRoute,
])

// 4. Create router
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}
