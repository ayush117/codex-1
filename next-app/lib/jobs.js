export const mockJobs = [
  { id: 1, title: 'Frontend Engineer', company: 'Bright Labs', description: 'Build modern React interfaces and collaborate with product/design teams.', location: 'Remote, US' },
  { id: 2, title: 'Backend Engineer', company: 'ScaleFlow', description: 'Design REST APIs, optimize PostgreSQL queries, and improve system reliability.', location: 'Austin, TX' },
  { id: 3, title: 'Full Stack Developer', company: 'NovaWorks', description: 'Ship end-to-end product features across React and Node.js services.', location: 'San Francisco, CA' },
  { id: 4, title: 'AI Product Engineer', company: 'FutureLoop', description: 'Integrate LLM-powered workflows into user-facing products.', location: 'New York, NY' }
];

export function getJobById(jobId) {
  return mockJobs.find((job) => job.id === Number(jobId));
}
