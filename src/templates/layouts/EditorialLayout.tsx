import type { SiteConfig } from '../../data/types'
import { Cta, GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function EditorialLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl border-b pb-4" style={{ borderColor: site.colors.line }}>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em]" style={{ color: site.colors.muted }}>
            <span>{site.hero.kicker}</span>
            <span>Preview issue</span>
          </div>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <BrandMark site={site} className="text-4xl md:text-6xl" />
            <nav className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em]">
              {site.nav.map((item) => (
                <GhostLink key={item}>{item}</GhostLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <h2 className="text-3xl leading-tight md:text-5xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: site.colors.muted }}>
            {site.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta site={site}>{site.hero.cta}</Cta>
            {site.hero.secondaryCta ? <Cta site={site} ghost>{site.hero.secondaryCta}</Cta> : null}
          </div>
        </div>
        <div className="md:col-span-5">
          <Photo src={site.hero.image} alt={site.hero.title} className="h-80 w-full md:h-[28rem]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {site.features.map((feature, index) => (
            <article key={feature.title} className="border-t pt-4" style={{ borderColor: site.colors.line }}>
              <p className="text-xs tabular-nums" style={{ color: site.colors.accent }}>
                0{index + 1}
              </p>
              <h3 className="mt-2 text-xl" style={{ fontFamily: site.fonts.display }}>
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-10">
        <h2 className="mb-8 text-xs uppercase tracking-[0.24em]" style={{ color: site.colors.muted }}>
          In this issue
        </h2>
        <div className="space-y-8">
          {site.collection.map((item, index) => (
            <ItemLink key={item.name} site={site} name={item.name}>
              <article
              className="grid items-center gap-6 border-b pb-8 md:grid-cols-12"
              style={{ borderColor: site.colors.line }}
            >
              <div className="text-sm tabular-nums md:col-span-1" style={{ color: site.colors.muted }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <Photo src={item.image} alt={item.name} className="h-44 w-full md:col-span-4" />
              <div className="md:col-span-7">
                <h3 className="text-2xl" style={{ fontFamily: site.fonts.display }}>
                  {item.name}
                </h3>
                <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
                  {item.meta}
                  {item.price ? ` · ${item.price}` : ''}
                </p>
              </div>
            </article>
          </ItemLink>
            ))}
        </div>
      </section>

      {site.quote ? (
        <section className="px-5 pb-16 text-center md:px-10">
          <blockquote className="mx-auto max-w-3xl text-2xl italic md:text-3xl" style={{ fontFamily: site.fonts.display }}>
            {site.quote.text}
          </blockquote>
          <p className="mt-4 text-xs uppercase tracking-[0.2em]" style={{ color: site.colors.muted }}>
            {site.quote.author}
          </p>
        </section>
      ) : null}
      <SiteFooter site={site} />
    </div>
  )
}
