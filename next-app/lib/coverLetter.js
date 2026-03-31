import OpenAI from 'openai';

export async function generateCoverLetter({ user, job }) {
  if (!process.env.OPENAI_API_KEY) {
    return 'OPENAI_API_KEY is not configured. Add it in your environment to enable cover letter generation.';
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `You are an expert career assistant. Write a concise, professional, and tailored cover letter.\n\nCandidate:\nName: ${user.name || 'Candidate'}\nSkills: ${(user.skills || []).join(', ') || 'Not provided'}\nExperience: ${user.experience || 'Not provided'}\n\nJob:\nTitle: ${job.title}\nCompany: ${job.company}\nDescription: ${job.description}\nLocation: ${job.location}\n\nRequirements:\n- 3-5 short paragraphs\n- professional tone\n- mention relevant skills and experience\n- show enthusiasm for the company\n- no placeholders`;

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    input: prompt,
    temperature: 0.7
  });

  return response.output_text?.trim() || 'Unable to generate cover letter at this time.';
}
