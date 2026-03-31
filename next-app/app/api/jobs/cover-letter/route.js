import { getJobById } from '../../../../lib/jobs';
import { generateCoverLetter } from '../../../../lib/coverLetter';

export async function POST(request) {
  try {
    const { user, job } = await request.json();
    if (!user || !job) {
      return Response.json({ message: 'user and job are required' }, { status: 400 });
    }

    const targetJob = job.id ? getJobById(job.id) || job : job;
    const letter = await generateCoverLetter({ user, job: targetJob });
    return Response.json({ letter });
  } catch (error) {
    return Response.json({ message: 'Failed to generate cover letter' }, { status: 500 });
  }
}
