import type { SiteConfig } from '../../data/types'
import { Cta, GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function BoutiqueLayout({ site }: { site: SiteConfig }) {
  return (
    <div className="min-h-screen">
      <header className="px-5 py-8 text-center md:px-10">
        <BrandMark site={site} className="text-3xl md:text-4xl" />
        <nav className="mt-4 flex flex-wrap justify-center gap-5 text-xs uppercase tracking-[0.2em]" style={{ color: site.colors.muted }}>
          {site.nav.map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.26em]" style={{ color: site.colors.accent }}>
          {site.hero.kicker}
        </p>
        <h1 className="mt-4 text-4xl leading-tight md:text-6xl" style={{ fontFamily: site.fonts.display }}>
          {site.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: site.colors.muted }}>
          {site.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Cta site={site}>{site.hero.cta}</Cta>
          {site.hero.secondaryCta ? <Cta site={site} ghost>{site.hero.secondaryCta}</Cta> : null}
        </div>
      </section>

      <section className="px-5 md:px-10">
        <Photo
          src={site.hero.image}
          alt={site.hero.title}
          className="mx-auto h-72 w-full max-w-5xl rounded-[2rem] md:h-[28rem]"
        />
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-16 md:grid-cols-3 md:px-10">
        {site.features.map((feature) => (
          <article key={feature.title} className="text-center">
            <h2 className="text-xl" style={{ fontFamily: site.fonts.display }}>
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
              {feature.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 md:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {site.collection.map((item) => (
            <ItemLink key={item.name} site={site} name={item.name}>
              <article>
              <Photo src={item.image} alt={item.name} className="h-72 w-full rounded-[1.6rem]" />
              <div className="mt-4 text-center">
                <div style={{ fontFamily: site.fonts.display }}>{item.name}</div>
                <div className="text-sm" style={{ color: site.colors.muted }}>
                  {item.meta}
                  {item.price ? ` · ${item.price}` : ''}
                </div>
              </div>
            </article>
          </ItemLink>
            ))}
        </div>
      </section>

      {site.quote ? (
        <section className="px-5 pb-16 text-center">
          <blockquote className="mx-auto max-w-2xl text-2xl" style={{ fontFamily: site.fonts.display }}>
            “{site.quote.text}”
          </blockquote>
          <p className="mt-4 text-xs uppercase tracking-[0.2em]" style={{ color: site.colors.muted }}>
            {site.quote.author}
          </p>
        </section>
      ) : null}

      <section className="px-5 pb-16 md:px-10">
        <div
          className="mx-auto max-w-xl rounded-full px-6 py-4 text-center text-sm"
          style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}
        >
          A gentle capture for notes, waitlists, or studio visits — swap this for a real form later.
        </div>
      </section>
      <SiteFooter site={site} />
    </div>
  )
}
