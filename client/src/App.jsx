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
import ReferEarn from './pages/ReferEarn'
import Terms from './pages/Terms'

const TITLES = {
  '/': 'Apartments for Lease – Ready to Occupy by Nov 2028',
  '/project': 'Project',
  '/refer-and-earn': 'Refer & Earn',
  '/contact': 'Contact Us',
  '/login': 'Login',
  '/terms': 'Terms & Conditions',
  '/admin/customers': 'Customer DB',
  '/admin/referrals': 'Referral DB',
}

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
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `IndraKrishna Global Suite - ${TITLES[pathname] || 'Page Not Found'}`
  }, [pathname])

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/refer-and-earn" element={<ReferEarn />} />
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
