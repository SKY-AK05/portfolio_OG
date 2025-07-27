'use server';
/**
 * @fileOverview A chatbot flow that answers questions about Aakash.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { aboutMeData } from '@/data/about-me';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional(),
  message: z.string(),
});

const ChatOutputSchema = z.string();

export async function chat(input: z.infer<typeof ChatInputSchema>): Promise<z.infer<typeof ChatOutputSchema>> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {
    const prompt = `You are a helpful assistant for Aakash's portfolio website. Your goal is to answer questions about Aakash based on the information provided below. Be friendly, concise, and helpful. If you are asked for contact information, provide the email and phone number.

Here is the information about Aakash:
---
${aboutMeData}
---

Now, please answer the user's question.`;
    
    const llmHistory = history?.map(turn => ({
      role: turn.role,
      content: [{ text: turn.content }],
    })) ?? [];

    const { output } = await ai.generate({
      prompt,
      history: llmHistory,
      input: {
        message,
      },
    });

    return output.text;
  }
);
