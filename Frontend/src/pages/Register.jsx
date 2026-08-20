import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const navigate = useNavigate();
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) {
    e.preventDefault(); setError(''); setMessage('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    setBusy(true);
    try { setMessage(await register(form.name, form.email, form.password)); setTimeout(() => navigate('/login'), 900); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="auth-page single-auth"><div className="auth-card">
    <div className="auth-icon">+</div><p className="eyebrow">GET STARTED</p><h1>Create your account</h1><p className="muted">Student accounts are created securely with BCrypt password hashing.</p>
    <form onSubmit={submit}>
      <label>Full name</label><input name="name" value={form.name} onChange={change} placeholder="Your name" required />
      <label>Email</label><input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required />
      <label>Password</label><input type="password" name="password" value={form.password} onChange={change} placeholder="At least 6 characters" minLength="6" required />
      <label>Confirm password</label><input type="password" name="confirm" value={form.confirm} onChange={change} placeholder="Repeat your password" required />
      {error && <div className="alert error-message">{error}</div>}{message && <div className="alert success-message">{message}</div>}
      <button className="primary-button" disabled={busy}>{busy ? 'Creating...' : 'Create Student Account'}</button>
    </form><p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p>
  </div></div>;
}
export default Register;
