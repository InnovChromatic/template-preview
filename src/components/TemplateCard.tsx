import { Link } from 'react-router-dom'
import type { SiteConfig } from '../data/types'
import { categories } from '../data/categories'

function categoryLabel(id: SiteConfig['category']) {
  return categories.find((item) => item.id === id)?.label ?? id
}

export function TemplateCard({ site }: { site: SiteConfig }) {
  return (
    <Link
      to={`/preview/${site.id}`}
      className="soft-card group flex flex-col overflow-hidden rounded-[1.6rem] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: site.colors.bg }}>
        <img
          src={site.hero.image}
          alt=""
          className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${site.colors.bg} 100%)`,
          }}
        />
        <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.35)' }}>
          {site.vibe}
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: site.colors.accent }}>
            {site.brand}
          </p>
          <h3 className="mt-1 text-xl font-semibold" style={{ color: site.colors.ink, fontFamily: site.fonts.display }}>
            {site.name}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm leading-relaxed text-muted">{site.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="rounded-full bg-surface-low px-3 py-1 text-xs font-semibold text-muted">
            {categoryLabel(site.category)}
          </span>
          <span className="text-sm font-bold text-primary">Preview →</span>
        </div>
      </div>
    </Link>
  )
}
