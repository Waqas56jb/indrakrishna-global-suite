import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { api, auth } from '../api'
import Icon from './Icon'
import Logo from './Logo'

export default function AdminLayout() {
  const navigate = useNavigate()
  if (!auth.token) return <Navigate to="/login" replace />

  const logout = () => {
    api.logout()
    navigate('/login')
  }

  return (
    <div className="admin">
      <aside className="admin__side">
        <NavLink to="/" className="admin__brand"><Logo light /></NavLink>
        <nav>
          <NavLink to="/admin/customers"><Icon name="users" size={18} /> Customers List</NavLink>
          <NavLink to="/admin/referrals"><Icon name="gift" size={18} /> Referral List</NavLink>
          <NavLink to="/" end><Icon name="home" size={18} /> View Website</NavLink>
        </nav>
        <button className="admin__logout" onClick={logout}><Icon name="logout" size={18} /> Logout</button>
      </aside>
      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  )
}
