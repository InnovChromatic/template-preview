import { Navigate, useParams } from 'react-router-dom'
import { getTemplate } from '../data/catalog'
import { TemplateSite } from '../templates/TemplateSite'

export function DemoPage() {
  const { id, page, itemSlug } = useParams()
  const site = id ? getTemplate(id) : undefined
  if (!site) return <Navigate to="/" replace />
  return <TemplateSite site={site} pageSlug={page} itemSlug={itemSlug} />
}
