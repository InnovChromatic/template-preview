import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGate } from './components/AuthGate'
import { DemoPage } from './pages/DemoPage'
import { GalleryPage } from './pages/GalleryPage'
import { PreviewPage } from './pages/PreviewPage'

export default function App() {
  return (
    <AuthGate>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
        <Route path="/preview/:id/:page" element={<PreviewPage />} />
        <Route path="/demo/:id" element={<DemoPage />} />
        <Route path="/demo/:id/item/:itemSlug" element={<DemoPage />} />
        <Route path="/demo/:id/:page" element={<DemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthGate>
  )
}
