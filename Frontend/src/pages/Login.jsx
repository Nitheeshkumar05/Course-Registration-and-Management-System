import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    try { onLogin(await login(email, password)); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <div className="auth-page">
    <div className="auth-card">
      <div className="auth-icon">↗</div>
      <p className="eyebrow">WELCOME BACK</p>
      <h1>Sign in to CourseHub</h1>
      <p className="muted">Access your courses and registrations.</p>
      <form onSubmit={submit}>
        <label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        <label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        {error && <div className="alert error-message">{error}</div>}
        <button className="primary-button" disabled={busy}>{busy ? 'Signing in...' : 'Sign In'}</button>
      </form>
      <p className="auth-footer">New here? <Link to="/register">Create a student account</Link></p>
    </div>
    <div className="auth-side"><div><span className="side-badge">LEARN • REGISTER • GROW</span><h2>Everything you need to manage your learning.</h2><p>One simple place for courses, registrations and student access.</p></div></div>
  </div>;
}
export default Login;
