import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const initialForm = { name: '', email: '', password: '' };

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      const res = await api.post(endpoint, payload);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form className="w-full max-w-md rounded bg-white p-6 shadow" onSubmit={onSubmit}>
        <h2 className="mb-4 text-2xl font-bold">{isLogin ? 'Login' : 'Create account'}</h2>
        {!isLogin && (
          <input
            className="mb-3 w-full rounded border p-2"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            required
          />
        )}
        <input
          className="mb-3 w-full rounded border p-2"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          className="mb-4 w-full rounded border p-2"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-indigo-600 py-2 text-white"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
        <button
          type="button"
          className="mt-3 w-full text-sm text-indigo-600"
          onClick={() => {
            setIsLogin((prev) => !prev);
            setForm(initialForm);
            setError('');
          }}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
