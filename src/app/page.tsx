// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hex-embed')
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setEmbedUrl(data.url)
        else setError('Failed to load dashboard.')
      })
      .catch(() => setError('Failed to load dashboard.'))
  }, [])

  if (error) return <div>{error}</div>
  if (!embedUrl) return <div>Loading dashboard...</div>

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="100%"
      style={{ border: 'none', minHeight: '100vh' }}
      allow="clipboard-write"
    />
  )
}
