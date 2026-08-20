import { Link } from 'react-router-dom'
import type { SiteConfig } from '../data/types'
import { homePath, itemPath, pagePath, type PageKind, type SitePage, slugify } from '../lib/siteNav'
import { Cta, Photo, SiteFooter, TopNav } from './primitives'

export function InnerPage({
  site,
  page,
  itemSlug,
}: {
  site: SiteConfig
  page: SitePage
  itemSlug?: string
}) {
  const kind: PageKind = itemSlug ? 'detail' : page.kind
  const item = itemSlug ? site.collection.find((entry) => slugMatches(entry.name, itemSlug)) : undefined

  return (
    <div className="min-h-screen">
      <TopNav site={site} />
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
        {kind === 'detail' && item ? (
          <DetailBody site={site} item={item} />
        ) : kind === 'menu' || kind === 'listing' ? (
          <ListingBody site={site} title={page.label} kind={kind} />
        ) : kind === 'about' ? (
          <AboutBody site={site} title={page.label} />
        ) : kind === 'contact' ? (
          <ContactBody site={site} title={page.label} />
        ) : kind === 'journal' ? (
          <JournalBody site={site} title={page.label} />
        ) : kind === 'locations' ? (
          <LocationsBody site={site} title={page.label} />
        ) : kind === 'team' ? (
          <TeamBody site={site} title={page.label} />
        ) : kind === 'cart' ? (
          <CartBody site={site} />
        ) : kind === 'order' ? (
          <OrderBody site={site} title={page.label} />
        ) : kind === 'account' ? (
          <AccountBody site={site} />
        ) : kind === 'rewards' ? (
          <RewardsBody site={site} />
        ) : kind === 'subscribe' ? (
          <SubscribeBody site={site} />
        ) : kind === 'help' ? (
          <HelpBody site={site} title={page.label} />
        ) : kind === 'legal' ? (
          <LegalBody site={site} />
        ) : (
          <ListingBody site={site} title={page.label} kind="listing" />
        )}
      </main>
      <SiteFooter site={site} />
    </div>
  )
}

function slugMatches(name: string, slug: string) {
  return slugify(name) === slug
}

function Kicker({ site, children }: { site: SiteConfig; children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: site.colors.accent }}>
      {children}
    </p>
  )
}

function Title({ site, children }: { site: SiteConfig; children: string }) {
  return (
    <h1 className="mt-3 text-4xl leading-tight md:text-5xl" style={{ fontFamily: site.fonts.display }}>
      {children}
    </h1>
  )
}

function ListingBody({ site, title, kind }: { site: SiteConfig; title: string; kind: PageKind }) {
  return (
    <div>
      <Kicker site={site}>{site.brand}</Kicker>
      <Title site={site}>{title}</Title>
      <p className="mt-4 max-w-2xl text-base" style={{ color: site.colors.muted }}>
        {kind === 'menu'
          ? 'A first-look menu for client walkthroughs — dishes, prices, and the photography style this brand would actually use.'
          : 'The first catalog page a visitor would open. Same objects as the homepage, given room to browse.'}
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.collection.map((item) => (
          <Link key={item.name} to={itemPath(site, item.name)} className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
            <Photo src={item.image} alt={item.name} className="h-56 w-full" />
            <div className="p-4">
              <div className="font-semibold">{item.name}</div>
              <div className="mt-1 text-sm" style={{ color: site.colors.muted }}>
                {item.meta}
              </div>
              {item.price ? <div className="mt-2 text-sm font-bold">{item.price}</div> : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function DetailBody({ site, item }: { site: SiteConfig; item: SiteConfig['collection'][number] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <Photo src={item.image} alt={item.name} className="h-80 w-full rounded-3xl md:h-[32rem]" />
      <div>
        <Kicker site={site}>{item.meta}</Kicker>
        <Title site={site}>{item.name}</Title>
        {item.price ? <p className="mt-4 text-2xl font-semibold">{item.price}</p> : null}
        <p className="mt-5 text-base leading-relaxed" style={{ color: site.colors.muted }}>
          A first-level detail page for presentations — enough to talk through photography, price, and next action without building checkout.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Cta site={site} to={pagePath(site, site.hero.cta)}>
            {site.hero.cta}
          </Cta>
          <Cta site={site} ghost to={homePath(site)}>
            Back to home
          </Cta>
        </div>
      </div>
    </div>
  )
}

function AboutBody({ site, title }: { site: SiteConfig; title: string }) {
  return (
    <div>
      <Kicker site={site}>{site.vibe}</Kicker>
      <Title site={site}>{title}</Title>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: site.colors.muted }}>
        {site.tagline}. {site.quote?.text ?? site.hero.subtitle}
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {site.features.map((feature) => (
          <article key={feature.title} className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface }}>
            {feature.image ? <Photo src={feature.image} alt={feature.title} className="h-52 w-full" /> : null}
            <div className="p-6">
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
    </div>
  )
}

function ContactBody({ site, title }: { site: SiteConfig; title: string }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <Kicker site={site}>{site.brand}</Kicker>
        <Title site={site}>{title}</Title>
        <p className="mt-4 text-base leading-relaxed" style={{ color: site.colors.muted }}>
          A first-click enquiry page. In a real build this posts to your CRM. Here it shows the fields clients expect to see.
        </p>
        <div className="mt-8 space-y-3 text-sm" style={{ color: site.colors.muted }}>
          <p>Studio desk · weekdays 10:00–18:00</p>
          <p>hello@{slugifyLite(site.brand)}.example</p>
        </div>
      </div>
      <form
        className="space-y-4 rounded-3xl p-6"
        style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="block text-xs font-semibold uppercase tracking-[0.16em]">
          Name
          <input className="mt-2 w-full rounded-xl border px-4 py-3 text-sm" style={{ borderColor: site.colors.line, background: site.colors.bg }} defaultValue="" />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-[0.16em]">
          Email
          <input className="mt-2 w-full rounded-xl border px-4 py-3 text-sm" style={{ borderColor: site.colors.line, background: site.colors.bg }} />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-[0.16em]">
          Message
          <textarea className="mt-2 h-28 w-full rounded-xl border px-4 py-3 text-sm" style={{ borderColor: site.colors.line, background: site.colors.bg }} />
        </label>
        <button
          type="submit"
          className="rounded-full px-5 py-3 text-sm font-semibold"
          style={{ background: site.colors.accent, color: site.colors.accentInk }}
        >
          Send preview request
        </button>
        <p className="text-xs" style={{ color: site.colors.muted }}>
          Preview only — nothing is sent.
        </p>
      </form>
    </div>
  )
}

function JournalBody({ site, title }: { site: SiteConfig; title: string }) {
  const posts = site.features.map((feature, index) => ({
    ...feature,
    image: feature.image ?? site.collection[index]?.image ?? site.hero.image,
  }))
  return (
    <div>
      <Kicker site={site}>Journal</Kicker>
      <Title site={site}>{title}</Title>
      <div className="mt-10 space-y-8">
        {posts.map((post) => (
          <article key={post.title} className="grid items-center gap-6 border-b pb-8 md:grid-cols-12" style={{ borderColor: site.colors.line }}>
            <Photo src={post.image} alt={post.title} className="h-44 w-full md:col-span-4" />
            <div className="md:col-span-8">
              <h2 className="text-2xl" style={{ fontFamily: site.fonts.display }}>
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
                {post.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function LocationsBody({ site, title }: { site: SiteConfig; title: string }) {
  const places = site.collection.slice(0, 4).map((item, index) => ({
    name: item.name,
    image: item.image,
    meta: ['Open today · 10:00–19:00', 'By appointment', 'Kitchen 11:00–22:00', 'Lobby 24 hours'][index] ?? 'Open today',
  }))
  return (
    <div>
      <Kicker site={site}>{site.brand}</Kicker>
      <Title site={site}>{title}</Title>
      <p className="mt-4 max-w-xl" style={{ color: site.colors.muted }}>
        First-level locations. Hours and addresses would be live data later; here they prove the page exists.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {places.map((place) => (
          <article key={place.name} className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface }}>
            <Photo src={place.image} alt={place.name} className="h-52 w-full" />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{place.name}</h2>
              <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
                {place.meta}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function TeamBody({ site, title }: { site: SiteConfig; title: string }) {
  const people = site.features.map((feature) => ({
    name: feature.title,
    role: feature.body,
    image: feature.image ?? site.hero.image,
  }))
  return (
    <div>
      <Kicker site={site}>People</Kicker>
      <Title site={site}>{title}</Title>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {people.map((person) => (
          <article key={person.name} className="overflow-hidden rounded-2xl" style={{ background: site.colors.surface }}>
            <Photo src={person.image} alt={person.name} className="h-48 w-full" />
            <div className="p-5">
              <h2 className="font-semibold">{person.name}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: site.colors.muted }}>
                {person.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CartBody({ site }: { site: SiteConfig }) {
  const items = site.collection.slice(0, 2)
  return (
    <div>
      <Kicker site={site}>Bag</Kicker>
      <Title site={site}>Your bag</Title>
      <p className="mt-3 text-sm" style={{ color: site.colors.muted }}>
        A static first-level cart — no payment. Enough to show the shopping rhythm.
      </p>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex gap-4 rounded-2xl p-4" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
            <Photo src={item.image} alt={item.name} className="h-24 w-24 rounded-xl" />
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm" style={{ color: site.colors.muted }}>
                {item.meta}
              </div>
            </div>
            <div className="text-sm font-semibold">{item.price ?? '—'}</div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Cta site={site} to={pagePath(site, site.hero.cta)}>
          Continue as guest
        </Cta>
      </div>
    </div>
  )
}

function OrderBody({ site, title }: { site: SiteConfig; title: string }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <Kicker site={site}>Order</Kicker>
        <Title site={site}>{title}</Title>
        <p className="mt-4" style={{ color: site.colors.muted }}>
          Pickup window, kitchen, and a short list. Checkout stays out of this preview.
        </p>
        <div className="mt-8 space-y-3">
          {site.collection.slice(0, 3).map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: site.colors.surface }}>
              <span>{item.name}</span>
              <span className="text-sm font-semibold">{item.price ?? 'Add'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl p-6" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
        <h2 className="text-xl font-semibold">Pickup today</h2>
        <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
          12:15 · 12:30 · 12:45
        </p>
        <div className="mt-6">
          <Cta site={site} to={pagePath(site, 'Menu')}>
            Add from menu
          </Cta>
        </div>
      </div>
    </div>
  )
}

function AccountBody({ site }: { site: SiteConfig }) {
  return (
    <div>
      <Kicker site={site}>Account</Kicker>
      <Title site={site}>Welcome back</Title>
      <p className="mt-4 max-w-xl" style={{ color: site.colors.muted }}>
        A signed-in shell for demos — orders, addresses, and loyalty without a real login.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {['Recent orders', 'Addresses', 'Preferences'].map((card) => (
          <div key={card} className="rounded-2xl p-5" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
            <h2 className="font-semibold">{card}</h2>
            <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
              Preview placeholder for {site.brand}.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RewardsBody({ site }: { site: SiteConfig }) {
  return (
    <div>
      <Kicker site={site}>Loyalty</Kicker>
      <Title site={site}>Rewards</Title>
      <p className="mt-4" style={{ color: site.colors.muted }}>
        Stamp cards and points, shown as a first-level page — not a full program admin.
      </p>
      <div className="mt-8 rounded-3xl p-8" style={{ background: site.colors.surface }}>
        <p className="text-sm uppercase tracking-[0.2em]" style={{ color: site.colors.accent }}>
          {site.brand} member
        </p>
        <p className="mt-4 text-4xl font-semibold">4 / 8 stamps</p>
        <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
          Next bowl is on the house.
        </p>
      </div>
    </div>
  )
}

function SubscribeBody({ site }: { site: SiteConfig }) {
  return (
    <div>
      <Kicker site={site}>Membership</Kicker>
      <Title site={site}>Subscribe</Title>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {['Midweek', 'Full week'].map((plan, index) => (
          <article key={plan} className="rounded-3xl p-6" style={{ background: site.colors.surface, border: `1px solid ${site.colors.line}` }}>
            <h2 className="text-2xl" style={{ fontFamily: site.fonts.display }}>
              {plan}
            </h2>
            <p className="mt-2 text-sm" style={{ color: site.colors.muted }}>
              {index === 0 ? 'Two plates, Wednesday delivery.' : 'Four plates, skip any week.'}
            </p>
            <div className="mt-6">
              <Cta site={site} to={pagePath(site, site.hero.cta)}>
                Choose {plan}
              </Cta>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function HelpBody({ site, title }: { site: SiteConfig; title: string }) {
  return (
    <div>
      <Kicker site={site}>Help</Kicker>
      <Title site={site}>{title}</Title>
      <div className="mt-8 space-y-4">
        {site.talkingPoints.map((point) => (
          <article key={point} className="rounded-2xl p-5" style={{ background: site.colors.surface }}>
            <p className="text-sm leading-relaxed">{point}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function LegalBody({ site }: { site: SiteConfig }) {
  return (
    <div className="max-w-2xl">
      <Kicker site={site}>Legal</Kicker>
      <Title site={site}>Preview terms</Title>
      <p className="mt-5 leading-relaxed" style={{ color: site.colors.muted }}>
        {site.brand} is a fictional presentation brand by InnovChromatic. This page stands in for privacy and terms so the footer is not a dead end.
      </p>
    </div>
  )
}

function slugifyLite(value: string) {
  return slugify(value).replace(/-/g, '')
}
