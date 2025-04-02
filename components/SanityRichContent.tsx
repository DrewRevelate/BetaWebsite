'use client'

/**
 * Rich text rendering component
 * Renders Sanity's portable text format using next-sanity
 */
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/config'

// Component for custom portable text serializers
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            width={800}
            height={500}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {value.caption && (
            <div className="text-center text-gray-600 mt-2 text-sm">{value.caption}</div>
          )}
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <div className="my-4 rounded-md bg-gray-900 p-4 overflow-x-auto">
          {value.filename && (
            <div className="text-sm text-gray-400 mb-2">{value.filename}</div>
          )}
          <pre>
            <code className={`language-${value.language || 'javascript'}`}>
              {value.code}
            </code>
          </pre>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const { href, blank } = value
      return (
        <Link
          href={href}
          target={blank ? '_blank' : '_self'}
          rel={blank ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      )
    },
    highlight: ({ children }: any) => {
      return <span className="bg-yellow-200 p-1">{children}</span>
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => {
      if (typeof children === 'string' && children.trim() === '') {
        return <br />
      }
      return <p className="mb-4">{children}</p>
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

interface SanityRichContentProps {
  content: any
  className?: string
}

export default function SanityRichContent({ content, className = '' }: SanityRichContentProps) {
  return (
    <div className={className}>
      <PortableText value={content} components={components} />
    </div>
  )
}
