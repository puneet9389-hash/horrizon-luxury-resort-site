/**
 * UI Utilities - Bridge between Blink UI API and Radix UI components
 * This file provides compatibility functions for migrating from Blink to Radix UI
 */

// Toast notification system using browser's native capabilities
export const toast = {
  success: (title: string, options?: { description?: string }) => {
    console.log(`✓ ${title}`, options?.description || '')
    // Could be replaced with Radix UI Toast when needed
    alert(`${title}\n${options?.description || ''}`)
  },
  error: (title: string, options?: { description?: string }) => {
    console.error(`✗ ${title}`, options?.description || '')
    alert(`Error: ${title}\n${options?.description || ''}`)
  },
  warning: (title: string, options?: { description?: string }) => {
    console.warn(`⚠ ${title}`, options?.description || '')
    alert(`Warning: ${title}\n${options?.description || ''}`)
  },
  info: (title: string, options?: { description?: string }) => {
    console.info(`ℹ ${title}`, options?.description || '')
    alert(`${title}\n${options?.description || ''}`)
  },
}
