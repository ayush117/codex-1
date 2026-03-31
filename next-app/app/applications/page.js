'use client';

import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import ProtectedPage from '../../components/ProtectedPage';
import { apiFetch } from '../../lib/apiClient';

const statuses = ['Applied', 'Interview', 'Rejected', 'Offer'];

function ApplicationsContent() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/applications').then(setApplications).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await apiFetch(`/api/applications/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
  };

  if (loading) return <div className="container">Loading applications...</div>;

  return (
    <div className="container">
      <h2>Applications Tracker</h2>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Job Title</th><th>Company</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.job_title}</td>
                <td>{application.company}</td>
                <td>
                  <select value={application.status} onChange={(event) => updateStatus(application.id, event.target.value)}>
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
                <td>{new Date(application.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <AppShell>
      <ProtectedPage>
        <ApplicationsContent />
      </ProtectedPage>
    </AppShell>
  );
}
