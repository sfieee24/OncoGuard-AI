
'use server';
/**
 * @fileOverview An AI agent that explains cancer risk predictions in simple terms.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiRiskExplanationInputSchema = z.object({
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The predicted cancer risk level.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score of the prediction, a value between 0 and 1.'),
  gender: z.string().describe('The user\'s gender.'),
  age: z.number().int().positive().describe('The user\'s age.'),
  symptoms: z.string().describe('A summary of reported symptoms.'),
  familyHistory: z.string().describe('A summary of family cancer history.'),
  lifestyle: z.string().describe('A summary of lifestyle factors.'),
  contributingFactors: z.string().describe('Top factors contributing to the risk.'),
});
export type AiRiskExplanationInput = z.infer<typeof AiRiskExplanationInputSchema>;

const AiRiskExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A simple, understandable explanation of the predicted cancer risk level.'
    ),
  precautions: z
    .string()
    .describe(
      'Suggested precautions based on the risk level.'
    ),
  nextSteps: z
    .string()
    .describe(
      'Recommended next steps for the user.'
    ),
});
export type AiRiskExplanationOutput = z.infer<typeof AiRiskExplanationOutputSchema>;

export async function explainRisk(
  input: AiRiskExplanationInput
): Promise<AiRiskExplanationOutput> {
  return aiRiskExplanationFlow(input);
}

const aiRiskExplanationPrompt = ai.definePrompt({
  name: 'aiRiskExplanationPrompt',
  input: {schema: AiRiskExplanationInputSchema},
  output: {schema: AiRiskExplanationOutputSchema},
  prompt: `You are a compassionate healthcare assistant. Explain a user's predicted {{riskLevel}} cancer risk ({{confidence}}% confidence) in simple language.

Data Summary:
- Age: {{{age}}}
- Gender: {{{gender}}}
- Symptoms: {{{symptoms}}}
- Family History: {{{familyHistory}}}
- Lifestyle: {{{lifestyle}}}
- Key Factors: {{{contributingFactors}}}

Provide:
1. A clear, empathetic explanation.
2. Actionable precautions.
3. Specific next steps (consult doctor, etc.).`,
});

const aiRiskExplanationFlow = ai.defineFlow(
  {
    name: 'aiRiskExplanationFlow',
    inputSchema: AiRiskExplanationInputSchema,
    outputSchema: AiRiskExplanationOutputSchema,
  },
  async input => {
    const {output} = await aiRiskExplanationPrompt({
      ...input,
      confidence: Math.round(input.confidence * 100),
    });
    return output!;
  }
);
