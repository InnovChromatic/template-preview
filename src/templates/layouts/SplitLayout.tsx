import type { SiteConfig } from '../../data/types'
import { Cta, ItemLink, Photo, SiteFooter, TopNav } from '../primitives'

export function SplitLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <TopNav site={site} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-10 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: site.colors.accent }}>
            {site.hero.kicker}
          </p>
          <h1 className="mt-4 text-4xl leading-tight md:text-5xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed" style={{ color: site.colors.muted }}>
            {site.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta site={site}>{site.hero.cta}</Cta>
            {site.hero.secondaryCta ? <Cta site={site} ghost>{site.hero.secondaryCta}</Cta> : null}
          </div>
          {site.stats ? (
            <div className="mt-10 grid grid-cols-3 gap-4">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className="text-[11px] uppercase tracking-wider" style={{ color: site.colors.muted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Photo src={site.hero.image} alt={site.hero.title} className="h-72 w-full rounded-3xl md:h-[32rem]" />
      </section>

      <section className="px-5 py-6 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {site.features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl p-6"
              style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}
            >
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl" style={{ fontFamily: site.fonts.display }}>
              Featured
            </h2>
            <span className="text-sm" style={{ color: site.colors.muted }}>
              {site.collection.length} picks
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.collection.map((item) => (
              <ItemLink key={item.name} site={site} name={item.name}>
              <article className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface }}>
                <Photo src={item.image} alt={item.name} className="h-56 w-full" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm" style={{ color: site.colors.muted }}>
                        {item.meta}
                      </div>
                    </div>
                    {item.price ? <div className="text-sm font-semibold">{item.price}</div> : null}
                  </div>
                </div>
              </article>
              </ItemLink>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10">
        <div
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-3xl px-6 py-8 md:flex-row md:items-center md:px-10"
          style={{ background: site.colors.accent, color: site.colors.accentInk }}
        >
          <div>
            <h2 className="text-2xl" style={{ fontFamily: site.fonts.display }}>
              Ready to talk through this direction?
            </h2>
            <p className="mt-1 text-sm opacity-80">This banner is a stand-in for enquiry, valuation, or newsletter capture.</p>
          </div>
          <Cta site={site} ghost>
            {site.hero.secondaryCta ?? 'Get in touch'}
          </Cta>
        </div>
      </section>
      <SiteFooter site={site} />
    </div>
  )
}
