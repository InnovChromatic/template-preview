import { useMemo, useState } from 'react'
import { categories } from '../data/categories'
import { catalog } from '../data/catalog'
import type { CategoryId } from '../data/types'
import { TemplateCard } from '../components/TemplateCard'

export function GalleryPage() {
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return catalog.filter((site) => {
      const matchesCategory = category === 'all' || site.category === category
      const haystack = `${site.name} ${site.brand} ${site.vibe} ${site.tagline} ${site.category}`.toLowerCase()
      return matchesCategory && (!needle || haystack.includes(needle))
    })
  }, [category, query])

  const active = categories.find((item) => item.id === category)

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl flex-col gap-6 px-5 pb-4 pt-8 md:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              InnovChromatic · private studio
            </p>
            <h1 className="font-headline mt-3 max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
              Choose a direction before we build.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {catalog.length} responsive website designs across real estate, gifts, jewelry,
              commerce, clothing, venture, bakeries, hospitality, and food ordering.
              Screen-share this gallery and walk a client through the look that fits.
            </p>
          </div>
          <label className="soft-card flex w-full max-w-md items-center rounded-full px-5 py-3">
            <span className="sr-only">Search templates</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search vibe, brand, or category"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((item) => {
            const selected = item.id === category
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={
                  selected
                    ? 'shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white'
                    : 'shrink-0 rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-semibold text-muted hover:text-ink'
                }
              >
                {item.label}
              </button>
            )
          })}
        </div>
        {active ? <p className="text-sm text-muted">{active.blurb}</p> : null}
      </header>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-20 sm:grid-cols-2 xl:grid-cols-3 md:px-8">
        {visible.map((site) => (
          <TemplateCard key={site.id} site={site} />
        ))}
      </section>

      {visible.length === 0 ? (
        <p className="pb-20 text-center text-muted">No templates match that filter.</p>
      ) : null}
    </div>
  )
}
