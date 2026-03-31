'use client';

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div style={{ position: 'fixed', right: 16, top: 16, color: 'white', padding: '10px 14px', borderRadius: 8, background: toast.type === 'error' ? '#dc2626' : '#059669' }}>
      {toast.message}
    </div>
  );
}
