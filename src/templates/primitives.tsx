import type { CSSProperties, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { SiteConfig } from '../data/types'
import { homePath, itemPath, pagePath } from '../lib/siteNav'
import { cn } from '../lib/utils'
import { useOptionalSite } from './SiteContext'

export function Photo({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return <img src={src} alt={alt} className={cn('object-cover', className)} loading="lazy" />
}

function textFrom(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(textFrom).join('')
  return ''
}

export function GhostLink({
  children,
  className,
  style,
  to,
  label,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  to?: string
  label?: string
}) {
  const site = useOptionalSite()
  const location = useLocation()
  const text = label ?? textFrom(children)
  const href = to ?? (site ? pagePath(site, text || 'Home') : '#')
  const active = location.pathname === href

  if (!site) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    )
  }

  return (
    <Link
      to={href}
      className={cn(className, active && 'opacity-100')}
      style={{
        ...style,
        textDecoration: active ? 'underline' : style?.textDecoration,
        textUnderlineOffset: active ? 4 : style?.textUnderlineOffset,
      }}
    >
      {children}
    </Link>
  )
}

export const SiteLink = GhostLink

export function Cta({
  site,
  children,
  ghost = false,
  to,
}: {
  site: SiteConfig
  children: ReactNode
  ghost?: boolean
  to?: string
}) {
  return (
    <GhostLink
      to={to ?? pagePath(site, textFrom(children) || site.hero.cta)}
      className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-opacity hover:opacity-80"
      style={
        ghost
          ? { border: `1px solid ${site.colors.line}`, color: site.colors.ink }
          : { background: site.colors.accent, color: site.colors.accentInk }
      }
    >
      {children}
    </GhostLink>
  )
}

export function ItemLink({
  site,
  name,
  className,
  style,
  children,
}: {
  site: SiteConfig
  name: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <Link to={itemPath(site, name)} className={cn('block', className)} style={style}>
      {children}
    </Link>
  )
}

export function BrandMark({
  site,
  className,
  style,
}: {
  site: SiteConfig
  className?: string
  style?: CSSProperties
}) {
  return (
    <Link to={homePath(site)} className={className} style={{ fontFamily: site.fonts.display, ...style }}>
      {site.brand}
    </Link>
  )
}

export function SiteFooter({ site }: { site: SiteConfig }) {
  const links = Array.from(new Set([...site.nav, ...site.sitemap])).slice(0, 8)
  return (
    <footer
      className="px-5 py-10 md:px-10"
      style={{ borderTop: `1px solid ${site.colors.line}`, color: site.colors.muted }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <BrandMark site={site} className="text-lg" />
          <p className="mt-1 max-w-md text-sm">{site.footerNote}</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.16em]">
          {links.map((item) => (
            <GhostLink key={item} label={item}>
              {item}
            </GhostLink>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export function TopNav({
  site,
  inverted = false,
}: {
  site: SiteConfig
  inverted?: boolean
}) {
  return (
    <header
      className={cn(
        'flex items-center justify-between gap-4 px-5 py-4 md:px-10',
        inverted ? 'absolute inset-x-0 top-0 z-20' : 'relative'
      )}
      style={inverted ? undefined : { borderBottom: `1px solid ${site.colors.line}` }}
    >
      <BrandMark
        site={site}
        className="truncate text-sm font-semibold tracking-[0.22em] uppercase"
      />
      <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.18em] md:flex" style={{ color: site.colors.muted }}>
        {site.nav.map((item) => (
          <GhostLink key={item} label={item}>
            {item}
          </GhostLink>
        ))}
      </nav>
      <Cta site={site}>{site.hero.cta}</Cta>
    </header>
  )
}
