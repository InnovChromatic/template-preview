import type { SiteConfig } from '../data/types'

export type PageKind =
  | 'home'
  | 'listing'
  | 'menu'
  | 'about'
  | 'contact'
  | 'journal'
  | 'locations'
  | 'team'
  | 'cart'
  | 'order'
  | 'account'
  | 'rewards'
  | 'subscribe'
  | 'help'
  | 'legal'
  | 'detail'

export interface SitePage {
  slug: string
  label: string
  kind: PageKind
}

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'page'
  )
}

export function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

export function homePath(site: SiteConfig) {
  return `/demo/${site.id}`
}

export function pagePath(site: SiteConfig, label: string) {
  const canonical = canonicalLabel(site, label)
  if (inferKind(canonical) === 'home' || normalize(canonical) === 'home') return homePath(site)
  return `/demo/${site.id}/${slugify(canonical)}`
}

export function itemPath(site: SiteConfig, name: string) {
  return `/demo/${site.id}/item/${slugify(name)}`
}

export function inferKind(label: string): PageKind {
  const l = normalize(label)
  if (l === 'home' || l === 'brand') return 'home'
  if (/(sign in|account|profile)/.test(l)) return 'account'
  if (/(bag|cart)/.test(l)) return 'cart'
  if (/(reward|loyalty)/.test(l)) return 'rewards'
  if (/subscri/.test(l)) return 'subscribe'
  if (/(help|faq|support|docs|size guide|shipping|care$|saved homes)/.test(l)) return 'help'
  if (/(legal|privacy|terms)/.test(l)) return 'legal'
  if (/(menu|flavor|tasting|entremets|cakes|pastries|pudding|this week|weekly|tea salon)/.test(l)) return 'menu'
  if (/(order|track|pickup|cater)/.test(l)) return 'order'
  if (/(journal|stories|story|memo|press|essay|lookbook|notes)/.test(l)) return 'journal'
  if (/(location|stores|shops|salon|maisons|neighborhood|hours|the city|visit$)/.test(l)) return 'locations'
  if (/(team|people|advisor|agent|factor)/.test(l)) return 'team'
  if (/(contact|enquir|book|appoint|reserv|apply|valuation|introduction|fitting|tour|get in touch)/.test(l)) {
    return 'contact'
  }
  if (/(about|atelier|heritage|craft|kitchen|thesis|platform|atlas|impact|material|wrap|private office|the edit|learn more)/.test(l)) {
    return 'about'
  }
  return 'listing'
}

const ALIASES: Record<string, string> = {
  'learn more': 'about',
  'get in touch': 'contact',
  'sign in': 'account',
  bag: 'cart',
  'cart 0': 'cart',
  'cart · 0': 'cart',
  buy: 'listing',
  'sorted by eta': 'listing',
}

export function canonicalLabel(site: SiteConfig, raw: string) {
  const n = normalize(raw)
  if (!n) return 'Home'
  const alias = ALIASES[n]
  const pool = ['Home', ...site.nav, ...site.sitemap]
  const exact = pool.find((item) => normalize(item) === n)
  if (exact) return exact
  const contained = pool
    .filter((item) => {
      const p = normalize(item)
      return p.length > 2 && (n.includes(p) || p.includes(n))
    })
    .sort((a, b) => b.length - a.length)[0]
  if (contained) return contained
  if (alias) {
    if (alias === 'listing' || alias === 'about' || alias === 'contact' || alias === 'cart' || alias === 'account') {
      const byKind = pool.find((item) => inferKind(item) === alias)
      if (byKind) return byKind
      if (alias === 'cart') return 'Cart'
      if (alias === 'account') return 'Account'
      if (alias === 'about') return 'About'
      if (alias === 'contact') return 'Contact'
    }
  }
  const kind = inferKind(raw)
  const byKind = pool.find((item) => inferKind(item) === kind)
  if (byKind && kind !== 'listing') return byKind
  if (kind === 'listing') {
    const listing = pool.find((item) => inferKind(item) === 'listing' && normalize(item) !== 'home')
    if (listing) return listing
  }
  return raw
}

export function pagesFor(site: SiteConfig): SitePage[] {
  const labels = uniqueLabels([
    'Home',
    ...site.nav,
    ...site.sitemap,
    site.hero.cta,
    site.hero.secondaryCta,
  ])
  return labels.map((label) => ({
    slug: inferKind(label) === 'home' ? '' : slugify(canonicalLabel(site, label)),
    label: canonicalLabel(site, label),
    kind: inferKind(canonicalLabel(site, label)),
  }))
}

function uniqueLabels(labels: Array<string | undefined>) {
  const seen = new Set<string>()
  const result: string[] = []
  for (const label of labels) {
    if (!label) continue
    const key = normalize(label)
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(label)
  }
  return result
}

export function pageFromSlug(site: SiteConfig, slug?: string): SitePage {
  if (!slug) return { slug: '', label: 'Home', kind: 'home' }
  const pages = pagesFor(site)
  const match = pages.find((page) => page.slug === slug)
  if (match) return match
  const label = slug.replace(/-/g, ' ')
  return { slug, label: label.replace(/\b\w/g, (c) => c.toUpperCase()), kind: inferKind(label) }
}
