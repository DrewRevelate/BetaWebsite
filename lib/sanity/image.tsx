/**
 * Sanity image component for optimized image handling
 * Uses Next.js Image component with Sanity's image URL builder
 */

import Image from 'next/image'
import { urlFor } from './config'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface SanityImageProps {
  image: SanityImageSource
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

/**
 * Component for rendering Sanity images with Next.js Image component
 */
export default function SanityImage({
  image,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: SanityImageProps) {
  if (!image) return null

  // Generate image URL from Sanity image reference
  const imageUrl = urlFor(image).url()

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  )
}
