import { useEffect, useState } from 'react';
import api from '../api/client';

const statuses = ['Applied', 'Interview', 'Rejected', 'Offer'];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = () => {
    api
      .get('/applications')
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/applications/${id}`, { status });
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
  };

  if (loading) return <div className="p-6">Loading applications...</div>;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Applications Tracker</h2>
      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="px-4 py-3">{app.job_title}</td>
                <td className="px-4 py-3">{app.company}</td>
                <td className="px-4 py-3">
                  <select
                    className="rounded border px-2 py-1"
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">{new Date(app.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
