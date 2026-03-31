'use client';

const getBase = () => process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${getBase()}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
