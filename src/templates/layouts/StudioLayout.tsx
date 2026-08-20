import type { SiteConfig } from '../../data/types'
import { Cta, GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function StudioLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-5 py-6 md:px-12">
        <BrandMark site={site} className="text-sm tracking-[0.28em] uppercase" />
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.18em] md:flex" style={{ color: site.colors.muted }}>
          {site.nav.map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
      </header>

      <section className="px-5 pb-16 pt-8 md:px-12 md:pt-16">
        <p className="text-xs uppercase tracking-[0.28em]" style={{ color: site.colors.accent }}>
          {site.hero.kicker}
        </p>
        <h1 className="mt-6 max-w-5xl text-4xl leading-[1.08] md:text-6xl lg:text-7xl" style={{ fontFamily: site.fonts.display }}>
          {site.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: site.colors.muted }}>
          {site.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Cta site={site}>{site.hero.cta}</Cta>
          {site.hero.secondaryCta ? <Cta site={site} ghost>{site.hero.secondaryCta}</Cta> : null}
        </div>
        {site.stats ? (
          <div className="mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: site.colors.line }}>
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl" style={{ fontFamily: site.fonts.display }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em]" style={{ color: site.colors.muted }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="px-5 md:px-12">
        <Photo src={site.hero.image} alt="" className="h-64 w-full md:h-[26rem]" />
      </section>

      <section className="grid gap-6 px-5 py-16 md:grid-cols-3 md:px-12">
        {site.features.map((feature) => (
          <article key={feature.title}>
            <h2 className="text-xl" style={{ fontFamily: site.fonts.display }}>
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
              {feature.body}
            </p>
          </article>
        ))}
      </section>

      <section className="px-5 pb-8 md:px-12">
        <h2 className="mb-6 text-xs uppercase tracking-[0.24em]" style={{ color: site.colors.muted }}>
          Selected companies
        </h2>
        <div className="divide-y" style={{ borderColor: site.colors.line }}>
          {site.collection.map((item) => (
            <ItemLink key={item.name} site={site} name={item.name}>
              <article
              className="grid items-center gap-4 py-6 md:grid-cols-12"
              style={{ borderTop: `1px solid ${site.colors.line}` }}
            >
              <Photo src={item.image} alt={item.name} className="h-28 w-full md:col-span-3" />
              <div className="md:col-span-6">
                <div className="text-2xl" style={{ fontFamily: site.fonts.display }}>
                  {item.name}
                </div>
                <div className="text-sm" style={{ color: site.colors.muted }}>
                  {item.meta}
                </div>
              </div>
              <div className="text-sm md:col-span-3 md:text-right" style={{ color: site.colors.muted }}>
                View memo
              </div>
            </article>
          </ItemLink>
            ))}
        </div>
      </section>

      {site.quote ? (
        <section className="px-5 py-16 md:px-12" style={{ background: site.colors.surface }}>
          <blockquote className="max-w-4xl text-2xl md:text-4xl" style={{ fontFamily: site.fonts.display }}>
            {site.quote.text}
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-[0.2em]" style={{ color: site.colors.muted }}>
            {site.quote.author}
          </p>
        </section>
      ) : null}
      <SiteFooter site={site} />
    </div>
  )
}
