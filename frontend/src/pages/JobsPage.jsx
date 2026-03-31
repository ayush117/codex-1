import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import useToast from '../hooks/useToast';
import Toast from '../components/Toast';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [busyJobId, setBusyJobId] = useState(null);
  const { user } = useAuth();
  const { toast, showToast } = useToast();

  useEffect(() => {
    api
      .get('/jobs')
      .then((res) => setJobs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const generateLetter = async (job) => {
    setBusyJobId(job.id);
    try {
      const res = await api.post('/jobs/cover-letter', { user, job });
      setSelectedLetter(res.data.letter);
      showToast('Cover letter generated');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to generate cover letter', 'error');
    } finally {
      setBusyJobId(null);
    }
  };

  const apply = async (jobId) => {
    setBusyJobId(jobId);
    try {
      await api.post('/applications', { jobId });
      showToast('Application submitted');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to apply', 'error');
    } finally {
      setBusyJobId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Toast toast={toast} />
      <h2 className="mb-4 text-2xl font-bold">Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job.id} className="rounded bg-white p-4 shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-slate-500">{job.company} • {job.location}</p>
              <p className="my-3 text-sm">{job.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => generateLetter(job)}
                  className="rounded bg-indigo-600 px-3 py-2 text-sm text-white"
                  disabled={busyJobId === job.id}
                >
                  Generate Cover Letter
                </button>
                <button
                  onClick={() => apply(job.id)}
                  className="rounded border border-slate-300 px-3 py-2 text-sm"
                  disabled={busyJobId === job.id}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedLetter && (
        <div className="mt-6 rounded bg-white p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold">Generated Cover Letter</h3>
          <pre className="whitespace-pre-wrap font-sans text-sm">{selectedLetter}</pre>
        </div>
      )}
    </div>
  );
}
