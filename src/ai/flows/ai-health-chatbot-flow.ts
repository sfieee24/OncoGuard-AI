'use server';
/**
 * @fileOverview A Genkit flow for an AI chatbot that provides general, non-diagnostic health advice.
 *
 * - aiHealthChatbot - A function that handles user health queries.
 * - AiHealthChatbotInput - The input type for the aiHealthChatbot function.
 * - AiHealthChatbotOutput - The return type for the aiHealthChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiHealthChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s health-related question about symptoms, prevention, or lifestyle advice.'),
});
export type AiHealthChatbotInput = z.infer<typeof AiHealthChatbotInputSchema>;

const AiHealthChatbotOutputSchema = z.object({
  response: z.string().describe('The AI chatbot\'s helpful, non-diagnostic response to the user\'s health question.'),
});
export type AiHealthChatbotOutput = z.infer<typeof AiHealthChatbotOutputSchema>;

export async function aiHealthChatbot(input: AiHealthChatbotInput): Promise<AiHealthChatbotOutput> {
  return aiHealthChatbotFlow(input);
}

const aiHealthChatbotPrompt = ai.definePrompt({
  name: 'aiHealthChatbotPrompt',
  input: {schema: AiHealthChatbotInputSchema},
  output: {schema: AiHealthChatbotOutputSchema},
  prompt: `You are a helpful AI health assistant. Your purpose is to provide general, non-diagnostic information and guidance on health topics such as symptoms, prevention, and lifestyle advice. You must NOT provide medical diagnoses, prescribe treatments, or suggest specific medical interventions. Always advise users to consult with a qualified healthcare professional for personalized medical advice. If a question is clearly asking for a diagnosis or treatment, state that you cannot provide medical advice and recommend consulting a doctor.

Answer the user's question clearly and concisely, focusing on general health education.

User's Question: {{{query}}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_MEDICAL',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      }
    ],
  }
});

const aiHealthChatbotFlow = ai.defineFlow(
  {
    name: 'aiHealthChatbotFlow',
    inputSchema: AiHealthChatbotInputSchema,
    outputSchema: AiHealthChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await aiHealthChatbotPrompt(input);
    return output!;
  }
);
