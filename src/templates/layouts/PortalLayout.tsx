import type { SiteConfig } from '../../data/types'
import { Cta, GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function PortalLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-4 py-4 md:px-8" style={{ borderBottom: `1px solid ${site.colors.line}` }}>
        <BrandMark site={site} className="text-lg font-bold tracking-tight" />
        <nav className="hidden gap-5 text-sm font-medium md:flex" style={{ color: site.colors.muted }}>
          {site.nav.map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
        <Cta site={site}>Sign in</Cta>
      </header>

      <section className="relative overflow-hidden px-5 py-16 text-center md:px-10 md:py-24">
        <Photo src={site.hero.image} alt="" className="absolute inset-0 h-full w-full opacity-35" />
        <div className="absolute inset-0" style={{ background: `${site.colors.bg}d6` }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: site.colors.accent }}>
            {site.hero.kicker}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: site.colors.muted }}>
            {site.hero.subtitle}
          </p>
          <div
            className="mx-auto mt-8 flex max-w-2xl flex-col overflow-hidden rounded-2xl bg-white text-left shadow-xl sm:flex-row"
            style={{ border: `1px solid ${site.colors.line}` }}
          >
            <div className="flex-1 px-4 py-3 text-sm" style={{ color: site.colors.muted }}>
              Neighborhood, city, or address
            </div>
            <GhostLink
              label={site.hero.cta}
              className="px-4 py-3 text-center text-sm font-semibold sm:border-l"
              style={{ borderColor: site.colors.line, background: site.colors.accent, color: site.colors.accentInk }}
            >
              {site.hero.cta}
            </GhostLink>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-semibold">
            {site.nav.slice(0, 4).map((item) => (
              <span key={item} className="rounded-full px-3 py-1" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {site.stats ? (
        <section className="grid grid-cols-3 gap-2 px-5 py-8 md:px-10" style={{ background: site.colors.surface }}>
          {site.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider" style={{ color: site.colors.muted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Homes on the market</h2>
          <span className="text-sm" style={{ color: site.colors.muted }}>
            Updated just now
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {site.collection.map((item) => (
            <ItemLink key={item.name} site={site} name={item.name}>
              <article className="grid overflow-hidden rounded-2xl sm:grid-cols-[11rem_1fr]" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
              <Photo src={item.image} alt={item.name} className="h-40 w-full sm:h-full" />
              <div className="p-4">
                <div className="text-lg font-bold">{item.price ?? item.name}</div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="mt-1 text-sm" style={{ color: site.colors.muted }}>
                  {item.meta}
                </div>
                <div className="mt-3 text-xs font-semibold" style={{ color: site.colors.accent }}>
                  View listing
                </div>
              </div>
            </article>
          </ItemLink>
            ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-10">
        {site.features.map((feature) => (
          <article key={feature.title} className="rounded-2xl p-5" style={{ background: site.colors.surface }}>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
              {feature.body}
            </p>
          </article>
        ))}
      </section>
      <SiteFooter site={site} />
    </div>
  )
}
