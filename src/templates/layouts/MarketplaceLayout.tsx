import type { SiteConfig } from '../../data/types'
import { Cta, GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function MarketplaceLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <div className="px-5 py-2 text-center text-xs" style={{ background: site.colors.accent, color: site.colors.accentInk }}>
        {site.hero.kicker}
      </div>
      <header className="flex items-center justify-between gap-4 px-5 py-4 md:px-10" style={{ borderBottom: `1px solid ${site.colors.line}` }}>
        <BrandMark site={site} className="text-lg font-extrabold tracking-tight" />
        <div
          className="hidden max-w-md flex-1 rounded-full px-4 py-2 text-sm md:block"
          style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}`, color: site.colors.muted }}
        >
          Search gifts, sizes, neighborhoods…
        </div>
        <nav className="flex items-center gap-4 text-sm">
          {site.nav.slice(0, 3).map((item) => (
            <GhostLink key={item} className="hidden sm:inline">
              {item}
            </GhostLink>
          ))}
          <GhostLink label="Cart" className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: site.colors.ink, color: site.colors.bg }}>
            Cart 0
          </GhostLink>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-10">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h1>
          <p className="mt-4 text-base" style={{ color: site.colors.muted }}>
            {site.hero.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Cta site={site}>{site.hero.cta}</Cta>
            {site.hero.secondaryCta ? <Cta site={site} ghost>{site.hero.secondaryCta}</Cta> : null}
          </div>
        </div>
        <Photo src={site.hero.image} alt={site.hero.title} className="h-64 w-full rounded-2xl md:h-80" />
      </section>

      <section className="px-5 md:px-10">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-2">
          {site.nav.map((item) => (
            <GhostLink
              key={item}
              className="shrink-0 rounded-full px-4 py-2 text-sm"
              style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}
            >
              {item}
            </GhostLink>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Popular right now</h2>
          <span className="text-sm" style={{ color: site.colors.muted }}>
            {site.collection.length} products
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {site.collection.map((item) => (
            <ItemLink key={item.name} site={site} name={item.name} className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
              <Photo src={item.image} alt={item.name} className="h-40 w-full sm:h-48" />
              <div className="p-3">
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs" style={{ color: site.colors.muted }}>
                  {item.meta}
                </div>
                {item.price ? <div className="mt-2 text-sm font-bold">{item.price}</div> : null}
              </div>
            </ItemLink>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-14 md:grid-cols-3 md:px-10">
        {site.features.map((feature) => (
          <article key={feature.title} className="rounded-2xl p-5" style={{ background: site.colors.surface }}>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
              {feature.body}
            </p>
          </article>
        ))}
      </section>
      <SiteFooter site={site} />
    </div>
  )
}
