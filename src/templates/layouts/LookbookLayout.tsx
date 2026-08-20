import type { SiteConfig } from '../../data/types'
import { GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function LookbookLayout({ site }: { site: SiteConfig }) {
  const [primary, secondary] = site.features

  return (
    <div className="min-h-screen">
      <header className="px-4 py-5 text-center md:px-8">
        <nav className="mb-4 hidden justify-center gap-6 text-[10px] uppercase tracking-[0.28em] md:flex" style={{ color: site.colors.muted }}>
          {site.nav.map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
        <div className="text-3xl tracking-[0.18em] uppercase md:text-4xl" style={{ fontFamily: site.fonts.display }}>
          <BrandMark site={site} className="text-3xl tracking-[0.18em] uppercase md:text-4xl" />
        </div>
      </header>

      <section className="relative min-h-[80svh]">
        <Photo src={site.hero.image} alt={site.hero.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex min-h-[80svh] flex-col items-center justify-center px-5 text-center text-white">
          <p className="text-[10px] uppercase tracking-[0.4em]">{site.hero.kicker}</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.02] md:text-7xl" style={{ fontFamily: site.fonts.display }}>
            {site.hero.title}
          </h1>
          <p className="mt-5 max-w-md text-sm tracking-wide">{site.hero.subtitle}</p>
          <GhostLink
            className="mt-8 border border-white px-8 py-3 text-[11px] uppercase tracking-[0.28em]"
          >
            {site.hero.cta}
          </GhostLink>
        </div>
      </section>

      {primary ? (
        <section className="grid md:grid-cols-2">
          {primary.image ? <Photo src={primary.image} alt={primary.title} className="h-80 w-full md:h-[36rem]" /> : null}
          <div className="flex flex-col justify-center px-6 py-14 md:px-16">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: site.colors.muted }}>
              01
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl" style={{ fontFamily: site.fonts.display }}>
              {primary.title}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: site.colors.muted }}>
              {primary.body}
            </p>
          </div>
        </section>
      ) : null}

      {secondary ? (
        <section className="grid md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 md:order-1 md:px-16">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: site.colors.muted }}>
              02
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl" style={{ fontFamily: site.fonts.display }}>
              {secondary.title}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: site.colors.muted }}>
              {secondary.body}
            </p>
          </div>
          {secondary.image ? (
            <Photo src={secondary.image} alt={secondary.title} className="order-1 h-80 w-full md:order-2 md:h-[36rem]" />
          ) : null}
        </section>
      ) : null}

      <section className="px-0 py-0">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {site.collection.map((item) => (
            <ItemLink key={item.name} site={site} name={item.name}>
              <article className="group relative">
              <Photo src={item.image} alt={item.name} className="h-64 w-full md:h-[28rem]" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <div className="text-[11px] uppercase tracking-[0.18em]">{item.name}</div>
                <div className="text-[10px] opacity-80">
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
        <section className="px-6 py-20 text-center">
          <blockquote className="mx-auto max-w-2xl text-2xl md:text-4xl" style={{ fontFamily: site.fonts.display }}>
            {site.quote.text}
          </blockquote>
          <p className="mt-6 text-[10px] uppercase tracking-[0.28em]" style={{ color: site.colors.muted }}>
            {site.quote.author}
          </p>
        </section>
      ) : null}
      <SiteFooter site={site} />
    </div>
  )
}
