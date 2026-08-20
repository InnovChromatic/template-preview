import type { SiteConfig } from '../../data/types'
import { GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function HeritageLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <div
        className="flex items-center justify-between px-5 py-2 text-[10px] uppercase tracking-[0.22em] md:px-10"
        style={{ background: site.colors.ink, color: site.colors.bg }}
      >
        <span>{site.hero.kicker}</span>
        <GhostLink>{site.hero.secondaryCta ?? 'By appointment'}</GhostLink>
      </div>

      <header className="px-5 py-8 text-center md:px-10 md:py-12">
        <BrandMark site={site} className="text-4xl tracking-[0.22em] uppercase md:text-6xl" />
        <nav className="mt-6 flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-[0.24em]" style={{ color: site.colors.muted }}>
          {site.nav.map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
      </header>

      <section className="relative min-h-[78svh]">
        <Photo src={site.hero.image} alt={site.hero.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
        <div className="relative z-10 flex min-h-[78svh] flex-col items-center justify-end px-5 pb-14 text-center text-white">
          <h1 className="max-w-4xl text-4xl leading-[1.08] md:text-6xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base">{site.hero.subtitle}</p>
          <GhostLink className="mt-8 border border-white px-10 py-3 text-[11px] uppercase tracking-[0.28em]">
            {site.hero.cta}
          </GhostLink>
        </div>
      </section>

      {site.stats ? (
        <section className="grid grid-cols-3 divide-x px-5 py-10 text-center md:px-10" style={{ borderColor: site.colors.line }}>
          {site.stats.map((stat) => (
            <div key={stat.label} className="px-3">
              <div className="text-xl md:text-3xl" style={{ fontFamily: site.fonts.display }}>
                {stat.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: site.colors.muted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="px-5 py-8 md:px-10">
        <div className="mx-auto max-w-6xl space-y-16">
          {site.features.map((feature, index) => (
            <article
              key={feature.title}
              className={`grid items-center gap-8 md:grid-cols-2 ${index % 2 ? 'md:[&>*:last-child]:order-first' : ''}`}
            >
              {feature.image ? (
                <Photo src={feature.image} alt={feature.title} className="h-72 w-full md:h-[26rem]" />
              ) : null}
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: site.colors.accent }}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: site.fonts.display }}>
                  {feature.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: site.colors.muted }}>
                  {feature.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-8 md:px-10">
        <h2 className="mb-8 text-center text-[11px] uppercase tracking-[0.32em]" style={{ color: site.colors.muted }}>
          The collection
        </h2>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {site.collection.map((item) => (
            <ItemLink key={item.name} site={site} name={item.name}>
              <article className="text-center">
              <Photo src={item.image} alt={item.name} className="h-72 w-full" />
              <div className="mt-4 text-lg" style={{ fontFamily: site.fonts.display }}>
                {item.name}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em]" style={{ color: site.colors.muted }}>
                {item.meta}
                {item.price ? ` · ${item.price}` : ''}
              </div>
            </article>
          </ItemLink>
            ))}
        </div>
      </section>

      {site.quote ? (
        <section className="px-5 py-20 text-center" style={{ background: site.colors.surface }}>
          <blockquote className="mx-auto max-w-3xl text-2xl italic md:text-4xl" style={{ fontFamily: site.fonts.display }}>
            {site.quote.text}
          </blockquote>
          <p className="mt-6 text-[10px] uppercase tracking-[0.24em]" style={{ color: site.colors.muted }}>
            {site.quote.author}
          </p>
        </section>
      ) : null}

      <section className="px-5 py-16 text-center">
        <h2 className="text-3xl md:text-5xl" style={{ fontFamily: site.fonts.display }}>
          Visit the house
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: site.colors.muted }}>
          Appointments, not carts. This band is where serious brands collect a brief.
        </p>
        <GhostLink
          className="mt-8 inline-flex border px-10 py-3 text-[11px] uppercase tracking-[0.28em]"
          style={{ borderColor: site.colors.ink }}
        >
          {site.hero.cta}
        </GhostLink>
      </section>
      <SiteFooter site={site} />
    </div>
  )
}
