'use client';

import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import ProtectedPage from '../../components/ProtectedPage';
import Toast from '../../components/Toast';
import { useAuth } from '../../components/AuthProvider';
import { apiFetch } from '../../lib/apiClient';

function JobsContent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [busyJobId, setBusyJobId] = useState(null);
  const [toast, setToast] = useState(null);
  const { user } = useAuth();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    apiFetch('/api/jobs').then(setJobs).finally(() => setLoading(false));
  }, []);

  const generateLetter = async (job) => {
    setBusyJobId(job.id);
    try {
      const result = await apiFetch('/api/jobs/cover-letter', { method: 'POST', body: JSON.stringify({ user, job }) });
      setSelectedLetter(result.letter);
      showToast('Cover letter generated');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setBusyJobId(null);
    }
  };

  const apply = async (jobId) => {
    setBusyJobId(jobId);
    try {
      await apiFetch('/api/applications', { method: 'POST', body: JSON.stringify({ jobId }) });
      showToast('Application submitted');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setBusyJobId(null);
    }
  };

  return (
    <div className="container">
      <Toast toast={toast} />
      <h2>Jobs</h2>
      {loading ? <p>Loading jobs...</p> : (
        <div className="grid grid-2">
          {jobs.map((job) => (
            <div key={job.id} className="card">
              <h3>{job.title}</h3>
              <p>{job.company} • {job.location}</p>
              <p>{job.description}</p>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button className="btn btn-primary" disabled={busyJobId === job.id} onClick={() => generateLetter(job)}>Generate Cover Letter</button>
                <button className="btn btn-muted" disabled={busyJobId === job.id} onClick={() => apply(job.id)}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedLetter && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3>Generated Cover Letter</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{selectedLetter}</pre>
        </div>
      )}
    </div>
  );
}

export default function JobsPage() {
  return (
    <AppShell>
      <ProtectedPage>
        <JobsContent />
      </ProtectedPage>
    </AppShell>
  );
}
