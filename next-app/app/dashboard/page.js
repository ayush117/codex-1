'use client';

import { useEffect, useMemo, useState } from 'react';
import AppShell from '../../components/AppShell';
import ProtectedPage from '../../components/ProtectedPage';
import { apiFetch } from '../../lib/apiClient';

function DashboardContent() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    apiFetch('/api/applications').then(setApplications).catch(() => setApplications([]));
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;
    const interviews = applications.filter((app) => app.status === 'Interview').length;
    const offers = applications.filter((app) => app.status === 'Offer').length;
    return { total, interviews, offers };
  }, [applications]);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="grid grid-3">
        <div className="card"><p>Total Applications</p><h3>{stats.total}</h3></div>
        <div className="card"><p>Interviews</p><h3>{stats.interviews}</h3></div>
        <div className="card"><p>Offers</p><h3>{stats.offers}</h3></div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <ProtectedPage>
        <DashboardContent />
      </ProtectedPage>
    </AppShell>
  );
}
