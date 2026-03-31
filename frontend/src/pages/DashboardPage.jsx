import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get('/applications').then((res) => setApplications(res.data));
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;
    const interviews = applications.filter((app) => app.status === 'Interview').length;
    const offers = applications.filter((app) => app.status === 'Offer').length;
    return { total, interviews, offers };
  }, [applications]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Applications" value={stats.total} />
        <StatCard title="Interviews" value={stats.interviews} />
        <StatCard title="Offers" value={stats.offers} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded bg-white p-5 shadow">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}
