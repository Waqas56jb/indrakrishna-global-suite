import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import FloatingActions from './components/FloatingActions'
import Footer from './components/Footer'
import Header from './components/Header'
import Contact from './pages/Contact'
import Customers from './pages/admin/Customers'
import Referrals from './pages/admin/Referrals'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Project from './pages/Project'
import LoanAssistance from './pages/LoanAssistance'
import ReferEarn from './pages/ReferEarn'
import Terms from './pages/Terms'
import { applySeo } from './seo'

function SiteLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}

export default function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    applySeo(pathname)
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) {
      // Wait a frame so the new page has laid out before jumping to the section.
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }))
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/refer-and-earn" element={<ReferEarn />} />
        <Route path="/loan-assistance" element={<LoanAssistance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="customers" replace />} />
        <Route path="customers" element={<Customers />} />
        <Route path="referrals" element={<Referrals />} />
      </Route>
    </Routes>
  )
}
