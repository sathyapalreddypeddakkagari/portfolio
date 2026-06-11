'use client'

import { useState } from 'react'
import { assetPath } from '@/lib/assetPath'

interface PhotoTileProps {
  src?: string
  alt: string
  icon?: string
  rounded?: string
  className?: string
  fit?: 'cover' | 'contain'
}

export default function PhotoTile({
  src,
  alt,
  icon = 'fa-solid fa-image',
  rounded = 'rounded-2xl',
  className = '',
  fit = 'cover',
}: PhotoTileProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={`relative overflow-hidden ${rounded} ${className} bg-surface2`}>
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 via-accent2/10 to-cyan/10">
        <i className={`${icon} text-4xl text-accent/40`} />
      </div>
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assetPath(src as string)}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-${fit}`}
        />
      )}
    </div>
  )
}
