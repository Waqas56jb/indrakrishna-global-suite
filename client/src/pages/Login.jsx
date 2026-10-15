import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { api, auth } from '../api'
import { Field } from '../components/EnquiryForm'
import Icon from '../components/Icon'
import Logo from '../components/Logo'
import { IMAGES } from '../data'

export default function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ mobile: '', password: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  if (auth.token) return <Navigate to="/admin/customers" replace />

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!values.mobile || !values.password) {
      setStatus({ state: 'error', message: 'Please enter mobile number and password.' })
      return
    }
    setStatus({ state: 'loading', message: '' })
    try {
      await api.login(values.mobile, values.password)
      navigate('/admin/customers')
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  return (
    <section className="login" style={{ backgroundImage: `url(${IMAGES.elevation3})` }}>
      <div className="login__overlay" />
      <form className="login__card" onSubmit={onSubmit} noValidate>
        <Logo />
        <h1>Login</h1>
        <p>Access Customer &amp; Referral lists.</p>
        <Field label="Mobile No" name="mobile" type="tel" inputMode="tel" value={values.mobile} onChange={onChange} autoComplete="username" placeholder="+91 90032 80221" />
        <Field label="Password" name="password" type="password" value={values.password} onChange={onChange} autoComplete="current-password" />
        {status.state === 'error' && <p className="alert alert--error">{status.message}</p>}
        <button className="btn btn--primary btn--block" disabled={status.state === 'loading'}>
          <Icon name="lock" size={16} /> {status.state === 'loading' ? 'Signing in…' : 'Login'}
        </button>
        {import.meta.env.VITE_USE_MOCK === 'true' && (
          <small className="login__hint">Demo: 9003280221 / admin123</small>
        )}
      </form>
    </section>
  )
}
