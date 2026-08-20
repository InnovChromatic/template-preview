import type { SiteConfig } from '../../data/types'
import { BrandMark, GhostLink, ItemLink, Photo, SiteFooter } from '../primitives'

export function KitchenLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <div
        className="px-4 py-2 text-center text-[11px] font-semibold tracking-wide md:px-8"
        style={{ background: site.colors.accent, color: site.colors.accentInk }}
      >
        {site.hero.kicker}
      </div>

      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 md:px-8"
        style={{ background: site.colors.bg, borderBottom: `1px solid ${site.colors.line}` }}
      >
        <BrandMark site={site} className="text-lg font-extrabold tracking-tight" />
        <nav className="hidden gap-4 text-sm font-medium md:flex" style={{ color: site.colors.muted }}>
          {site.nav.slice(0, 4).map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
        <GhostLink
          label="Cart"
          className="rounded-full px-3 py-1.5 text-xs font-bold"
          style={{ background: site.colors.ink, color: site.colors.bg }}
        >
          Cart · 0
        </GhostLink>
      </header>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: site.colors.muted }}>
            {site.hero.subtitle}
          </p>
          <div
            className="mx-auto mt-8 flex max-w-xl flex-col overflow-hidden rounded-full bg-white text-left shadow-lg sm:flex-row"
            style={{ border: `1px solid ${site.colors.line}` }}
          >
            <div className="flex-1 px-5 py-3.5 text-sm" style={{ color: site.colors.muted }}>
              Delivery address or kitchen name
            </div>
            <GhostLink
              label={site.hero.cta}
              className="px-6 py-3.5 text-center text-sm font-bold sm:min-w-[8rem]"
              style={{ background: site.colors.accent, color: site.colors.accentInk }}
            >
              {site.hero.cta}
            </GhostLink>
          </div>
          <div className="mt-4 flex justify-center gap-2 text-xs font-semibold">
            <span className="rounded-full px-4 py-1.5" style={{ background: site.colors.ink, color: site.colors.bg }}>
              Delivery
            </span>
            <GhostLink label="Pickup" className="rounded-full px-4 py-1.5" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
              Pickup
            </GhostLink>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-2">
          {site.nav.map((item) => (
            <GhostLink
              key={item}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}
            >
              {item}
            </GhostLink>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Near you right now</h2>
          <span className="text-sm" style={{ color: site.colors.muted }}>
            {site.hero.secondaryCta ?? 'Sorted by ETA'}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.collection.map((item) => (
            <ItemLink
              key={item.name}
              site={site}
              name={item.name}
              className="overflow-hidden rounded-2xl"
              style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}
            >
              <div className="relative">
                <Photo src={item.image} alt={item.name} className="h-40 w-full" />
                {item.price ? (
                  <span
                    className="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                    style={{ background: 'rgba(0,0,0,0.62)' }}
                  >
                    {item.price}
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <div className="font-bold">{item.name}</div>
                <div className="mt-1 text-sm" style={{ color: site.colors.muted }}>
                  {item.meta}
                </div>
              </div>
            </ItemLink>
          ))}
        </div>
      </section>

      {site.stats ? (
        <section className="grid grid-cols-3 gap-2 px-4 py-8 text-center md:px-8" style={{ background: site.colors.surface }}>
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-xl font-extrabold md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider" style={{ color: site.colors.muted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3 md:px-8">
        {site.features.map((feature) => (
          <article key={feature.title} className="rounded-2xl p-5" style={{ background: site.colors.surface }}>
            {feature.image ? (
              <Photo src={feature.image} alt="" className="mb-4 h-36 w-full rounded-xl" />
            ) : null}
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
