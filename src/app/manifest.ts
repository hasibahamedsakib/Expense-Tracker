import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Expense Tracker Bangladesh',
    short_name: 'Expense Tracker BD',
    description: 'Bangladesh\'s smartest AI-powered expense tracker in Taka (৳). Track spending, get AI insights, manage budget, and make smarter financial decisions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-BD',
    categories: ['finance', 'productivity', 'business'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512', 
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
}
