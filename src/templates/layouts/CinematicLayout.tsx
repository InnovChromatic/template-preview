import type { SiteConfig } from '../../data/types'
import { Cta, ItemLink, Photo, SiteFooter, TopNav } from '../primitives'

export function CinematicLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <TopNav site={site} inverted />
      <section className="relative min-h-[100svh] overflow-hidden">
        <Photo src={site.hero.image} alt={site.hero.title} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${site.colors.bg}88 0%, ${site.colors.bg}b3 42%, ${site.colors.bg} 100%)`,
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-10">
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: site.colors.accent }}>
            {site.hero.kicker}
          </p>
          <h1
            className="mt-4 max-w-4xl text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
            style={{ fontFamily: site.fonts.display }}
          >
            {site.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: site.colors.muted }}>
            {site.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta site={site}>{site.hero.cta}</Cta>
            {site.hero.secondaryCta ? <Cta site={site} ghost>{site.hero.secondaryCta}</Cta> : null}
          </div>
          {site.stats ? (
            <div className="mt-12 grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: site.colors.line }}>
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl" style={{ fontFamily: site.fonts.display }}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em]" style={{ color: site.colors.muted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {site.features.map((feature) => (
            <article key={feature.title} className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface }}>
              {feature.image ? (
                <Photo src={feature.image} alt={feature.title} className="h-64 w-full md:h-80" />
              ) : null}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl" style={{ fontFamily: site.fonts.display }}>
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
                  {feature.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-sm uppercase tracking-[0.24em]" style={{ color: site.colors.muted }}>
            Selected
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-2">
            {site.collection.map((item) => (
              <ItemLink key={item.name} site={site} name={item.name} className="w-[78vw] shrink-0 sm:w-72">
                <article>
                <Photo src={item.image} alt={item.name} className="h-80 w-full rounded-2xl" />
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <div style={{ fontFamily: site.fonts.display }}>{item.name}</div>
                    <div className="text-sm" style={{ color: site.colors.muted }}>
                      {item.meta}
                    </div>
                  </div>
                  {item.price ? <div className="text-sm">{item.price}</div> : null}
                </div>
              </article>
              </ItemLink>
            ))}
          </div>
        </div>
      </section>

      {site.quote ? (
        <section className="px-5 py-20 text-center md:px-10" style={{ background: site.colors.surface }}>
          <blockquote className="mx-auto max-w-3xl text-2xl leading-snug md:text-4xl" style={{ fontFamily: site.fonts.display }}>
            “{site.quote.text}”
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-[0.22em]" style={{ color: site.colors.muted }}>
            {site.quote.author}
          </p>
        </section>
      ) : null}

      <SiteFooter site={site} />
    </div>
  )
}
