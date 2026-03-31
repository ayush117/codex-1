import { mockJobs } from '../../../lib/jobs';

export async function GET() {
  return Response.json(mockJobs);
}
