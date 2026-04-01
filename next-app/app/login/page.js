'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import { apiFetch } from '../../lib/apiClient';

const initialForm = { name: '', email: '', password: '' };
const demoCredentials = { email: 'demo@bloomdesk.dev', password: 'demo1234' };

function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      const data = await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(payload) });
      login(data);
      router.push('/dashboard');
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form className="card" style={{ width: '100%', maxWidth: 460 }} onSubmit={onSubmit}>
        <h2>{isLogin ? 'Login' : 'Create account'}</h2>
        {!isLogin && (
          <input className="input" name="name" placeholder="Name" required value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
        )}
        <input className="input" name="email" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
        <input className="input" name="password" type="password" placeholder="Password" required value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} />
        {isLogin && (
          <div className="card" style={{ margin: '.5rem 0', padding: '.75rem' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Demo credentials</p>
            <p style={{ margin: '.25rem 0 0' }}>Email: {demoCredentials.email}</p>
            <p style={{ margin: '.25rem 0 0' }}>Password: {demoCredentials.password}</p>
            <button
              type="button"
              className="btn"
              style={{ marginTop: '.5rem', width: '100%' }}
              onClick={() => setForm((prev) => ({ ...prev, ...demoCredentials }))}
            >
              Use demo credentials
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
        <button type="button" style={{ marginTop: 10, width: '100%' }} className="btn" onClick={() => { setIsLogin((prev) => !prev); setForm(initialForm); setError(''); }}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
}
