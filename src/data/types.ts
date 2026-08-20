export type CategoryId =
  | 'real-estate'
  | 'gift-shop'
  | 'jewelry'
  | 'ecommerce'
  | 'clothing'
  | 'venture'
  | 'cake-shop'
  | 'hospitality'
  | 'food-ordering'

export type LayoutId =
  | 'cinematic'
  | 'split'
  | 'editorial'
  | 'boutique'
  | 'marketplace'
  | 'studio'
  | 'flagship'
  | 'portal'
  | 'lookbook'
  | 'heritage'
  | 'kitchen'

export interface SiteColors {
  bg: string
  surface: string
  ink: string
  muted: string
  accent: string
  accentInk: string
  line: string
}

export interface SiteConfig {
  id: string
  name: string
  brand: string
  category: CategoryId
  layout: LayoutId
  vibe: string
  tagline: string
  fonts: {
    display: string
    body: string
  }
  colors: SiteColors
  nav: string[]
  sitemap: string[]
  talkingPoints: string[]
  hero: {
    kicker: string
    title: string
    subtitle: string
    cta: string
    secondaryCta?: string
    image: string
  }
  stats?: { label: string; value: string }[]
  features: { title: string; body: string; image?: string }[]
  collection: { name: string; meta: string; price?: string; image: string }[]
  quote?: { text: string; author: string }
  footerNote: string
}

export interface Category {
  id: CategoryId | 'all'
  label: string
  blurb: string
}
