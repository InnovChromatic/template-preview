import type { SiteConfig } from '../../data/types'
import { GhostLink, Photo, SiteFooter, BrandMark, ItemLink } from '../primitives'

export function FlagshipLayout({ site }: { site: SiteConfig }) {
  const chapters = site.features.map((feature, index) => ({
    ...feature,
    dark: index % 2 === 0,
  }))

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 text-[11px] md:px-8"
        style={{ background: site.colors.ink, color: site.colors.bg }}
      >
        <BrandMark site={site} className="font-semibold tracking-[0.18em] uppercase" />
        <nav className="hidden items-center gap-5 tracking-[0.14em] uppercase md:flex">
          {site.nav.map((item) => (
            <GhostLink key={item}>{item}</GhostLink>
          ))}
        </nav>
        <GhostLink className="tracking-[0.14em] uppercase opacity-80">Bag</GhostLink>
      </header>

      <section className="relative min-h-[88svh] overflow-hidden text-center">
        <Photo src={site.hero.image} alt={site.hero.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex min-h-[88svh] flex-col items-center justify-end px-5 pb-16 text-white">
          <p className="text-[11px] uppercase tracking-[0.32em]">{site.hero.kicker}</p>
          <h1
            className="mt-4 max-w-4xl text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
            style={{ fontFamily: site.fonts.display }}
          >
            {site.hero.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm md:text-base">{site.hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm font-medium">
            <GhostLink className="underline decoration-white/50 underline-offset-4">{site.hero.cta}</GhostLink>
            {site.hero.secondaryCta ? (
              <GhostLink className="underline decoration-white/50 underline-offset-4">{site.hero.secondaryCta}</GhostLink>
            ) : null}
          </div>
        </div>
      </section>

      {chapters.map((chapter) => (
        <section
          key={chapter.title}
          className="grid items-center gap-0 md:grid-cols-2"
          style={{
            background: chapter.dark ? site.colors.ink : site.colors.surface,
            color: chapter.dark ? site.colors.bg : site.colors.ink,
          }}
        >
          <div className="px-6 py-16 md:px-14 md:py-24">
            <p className="text-[11px] uppercase tracking-[0.28em] opacity-70">Featured</p>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl" style={{ fontFamily: site.fonts.display }}>
              {chapter.title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed opacity-80">{chapter.body}</p>
            <div className="mt-8 flex gap-6 text-sm font-medium">
              <GhostLink className="underline underline-offset-4">{site.hero.cta}</GhostLink>
              <GhostLink className="underline underline-offset-4 opacity-70">Learn more</GhostLink>
            </div>
          </div>
          {chapter.image ? (
            <Photo src={chapter.image} alt={chapter.title} className="h-72 w-full md:h-full md:min-h-[28rem]" />
          ) : null}
        </section>
      ))}

      <section className="px-5 py-16 md:px-10" style={{ background: site.colors.bg }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl md:text-3xl" style={{ fontFamily: site.fonts.display }}>
            The lineup
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4" style={{ background: site.colors.line }}>
            {site.collection.map((item) => (
              <ItemLink key={item.name} site={site} name={item.name} style={{ background: site.colors.bg }}>
                <Photo src={item.image} alt={item.name} className="h-48 w-full md:h-64" />
                <div className="px-3 py-4 text-center">
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="mt-1 text-xs" style={{ color: site.colors.muted }}>
                    {item.meta}
                    {item.price ? ` · ${item.price}` : ''}
                  </div>
                </div>
              </ItemLink>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter site={site} />
    </div>
  )
}
