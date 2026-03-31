'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  const active = (path) => (pathname === path ? { fontWeight: 700 } : {});

  return (
    <nav className="nav">
      <div className="nav-inner">
        <h1 style={{ color: '#4f46e5', margin: 0 }}>AI Job Platform</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/dashboard" style={active('/dashboard')}>Dashboard</Link>
          <Link href="/jobs" style={active('/jobs')}>Jobs</Link>
          <Link href="/applications" style={active('/applications')}>Applications</Link>
          <button className="btn btn-muted" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
