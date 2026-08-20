import { useEffect } from 'react'
import type { SiteConfig } from '../data/types'
import { pageFromSlug } from '../lib/siteNav'
import { InnerPage } from './InnerPage'
import { BoutiqueLayout } from './layouts/BoutiqueLayout'
import { CinematicLayout } from './layouts/CinematicLayout'
import { EditorialLayout } from './layouts/EditorialLayout'
import { FlagshipLayout } from './layouts/FlagshipLayout'
import { HeritageLayout } from './layouts/HeritageLayout'
import { KitchenLayout } from './layouts/KitchenLayout'
import { LookbookLayout } from './layouts/LookbookLayout'
import { MarketplaceLayout } from './layouts/MarketplaceLayout'
import { PortalLayout } from './layouts/PortalLayout'
import { SplitLayout } from './layouts/SplitLayout'
import { StudioLayout } from './layouts/StudioLayout'
import { SiteProvider } from './SiteContext'

export function TemplateSite({
  site,
  pageSlug,
  itemSlug,
}: {
  site: SiteConfig
  pageSlug?: string
  itemSlug?: string
}) {
  useEffect(() => {
    const previousBackground = document.body.style.background
    const previousColor = document.body.style.color
    document.body.style.background = site.colors.bg
    document.body.style.color = site.colors.ink
    return () => {
      document.body.style.background = previousBackground
      document.body.style.color = previousColor
    }
  }, [site])

  const page = pageFromSlug(site, pageSlug)
  const showInner = Boolean(itemSlug) || (pageSlug && page.kind !== 'home')

  return (
    <SiteProvider site={site}>
      <div
        className="min-h-screen antialiased"
        style={{
          background: site.colors.bg,
          color: site.colors.ink,
          fontFamily: site.fonts.body,
        }}
      >
        {showInner ? (
          <InnerPage site={site} page={page} itemSlug={itemSlug} />
        ) : (
          <HomeLayout site={site} />
        )}
      </div>
    </SiteProvider>
  )
}

function HomeLayout({ site }: { site: SiteConfig }) {
  if (site.layout === 'cinematic') return <CinematicLayout site={site} />
  if (site.layout === 'split') return <SplitLayout site={site} />
  if (site.layout === 'editorial') return <EditorialLayout site={site} />
  if (site.layout === 'boutique') return <BoutiqueLayout site={site} />
  if (site.layout === 'marketplace') return <MarketplaceLayout site={site} />
  if (site.layout === 'studio') return <StudioLayout site={site} />
  if (site.layout === 'flagship') return <FlagshipLayout site={site} />
  if (site.layout === 'portal') return <PortalLayout site={site} />
  if (site.layout === 'lookbook') return <LookbookLayout site={site} />
  if (site.layout === 'heritage') return <HeritageLayout site={site} />
  if (site.layout === 'kitchen') return <KitchenLayout site={site} />
  return <CinematicLayout site={site} />
}
