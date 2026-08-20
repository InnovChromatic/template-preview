import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { DeviceFrame, type Device } from '../components/DeviceFrame'
import { categories } from '../data/categories'
import { getTemplate } from '../data/catalog'
import { pagesFor } from '../lib/siteNav'

const DEVICES: { id: Device; label: string }[] = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'mobile', label: 'Mobile' },
]

export function PreviewPage() {
  const { id, page } = useParams()
  const navigate = useNavigate()
  const site = id ? getTemplate(id) : undefined
  const [device, setDevice] = useState<Device>('desktop')

  const categoryLabel = useMemo(
    () => (site ? categories.find((item) => item.id === site.category)?.label : ''),
    [site],
  )

  if (!site) return <Navigate to="/" replace />

  const pages = pagesFor(site)
  const resolvedSrc = page ? `/demo/${site.id}/${page}` : `/demo/${site.id}`

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-[#f7f1e7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
              ← Gallery
            </Link>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                {categoryLabel} · {site.vibe}
              </p>
              <h1 className="font-headline text-xl font-extrabold">{site.name}</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {DEVICES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDevice(item.id)}
                className={
                  device === item.id
                    ? 'rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white'
                    : 'rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted'
                }
              >
                {item.label}
              </button>
            ))}
            <Link
              to={resolvedSrc}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-on-primary"
            >
              Open full page
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <DeviceFrame device={device} src={resolvedSrc} />

        <aside className="soft-card h-fit rounded-[1.6rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Client talking points
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{site.tagline}</p>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed">
            {site.talkingPoints.map((point) => (
              <li key={point} className="border-l-2 border-primary pl-3">
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Pages in this preview
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pages.map((entry) => {
              const href = entry.kind === 'home' ? `/preview/${site.id}` : `/preview/${site.id}/${entry.slug}`
              const active = entry.kind === 'home' ? !page : page === entry.slug
              return (
                <button
                  key={`${entry.kind}-${entry.slug}-${entry.label}`}
                  type="button"
                  onClick={() => navigate(href)}
                  className={
                    active
                      ? 'rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white'
                      : 'rounded-full bg-surface-low px-3 py-1 text-xs font-semibold'
                  }
                >
                  {entry.label}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Click a page here or use the nav inside the frame. Logo always returns home.
          </p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Palette
          </p>
          <div className="mt-3 flex gap-2">
            {[site.colors.bg, site.colors.ink, site.colors.accent, site.colors.surface].map((color) => (
              <span
                key={color}
                className="h-8 w-8 rounded-full border border-line"
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
