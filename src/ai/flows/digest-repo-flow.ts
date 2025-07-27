'use server';
/**
 * @fileOverview A flow to digest a Git repository into a simple text format.
 *
 * - digestRepository - A function that handles the repository digestion process.
 * - DigestRepositoryInput - The input type for the digestRepository function.
 * - DigestRepositoryOutput - The return type for the digestRepository function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DigestRepositoryInputSchema = z.object({
  repositoryUrl: z.string().url().describe('The URL of the Git repository.'),
});
export type DigestRepositoryInput = z.infer<typeof DigestRepositoryInputSchema>;

const DigestRepositoryOutputSchema = z.object({
  digest: z.string().describe('A simple text digest of the codebase.'),
});
export type DigestRepositoryOutput = z.infer<
  typeof DigestRepositoryOutputSchema
>;

export async function digestRepository(
  input: DigestRepositoryInput
): Promise<DigestRepositoryOutput> {
  return digestRepositoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'digestRepositoryPrompt',
  input: { schema: DigestRepositoryInputSchema },
  output: { schema: DigestRepositoryOutputSchema },
  prompt: `You are an expert software engineer. Your task is to provide a simple text digest of a codebase from a given Git repository URL.

For the repository at {{{repositoryUrl}}}, provide a summary of its purpose, main technologies used, and a brief overview of its structure. This is useful for feeding a codebase into any LLM.

// This is a simplified mock. In a real scenario, you would use a tool to fetch repository contents.
// For now, generate a plausible summary based on the repository URL.

If the URL is 'https://github.com/firebase/genkit', you could respond with:
"The Genkit repository contains a framework for building AI-powered applications. It is written in TypeScript and utilizes a plugin-based architecture. Key directories include 'packages/' for the core libraries and plugins, and 'samples/' for example applications."

If the URL is 'https://github.com/facebook/react', you could respond with:
"The React repository contains the source code for the React JavaScript library for building user interfaces. It is written primarily in JavaScript. The core logic is in the 'packages/react' directory, with the reconciler in 'packages/react-reconciler' and DOM renderer in 'packages/react-dom'."

Now, provide a digest for the following repository: {{{repositoryUrl}}}`,
});

const digestRepositoryFlow = ai.defineFlow(
  {
    name: 'digestRepositoryFlow',
    inputSchema: DigestRepositoryInputSchema,
    outputSchema: DigestRepositoryOutputSchema,
  },
  async (input) => {
    // In a real application, you would add a step here to fetch the actual
    // repository content using a tool (e.g., calling the GitHub API).
    // For this example, we'll rely on the model's knowledge and the prompt's instructions.
    const { output } = await prompt(input);
    return output!;
  }
);
