'use server';
/**
 * @fileOverview An AI agent that explains cancer risk predictions in simple terms.
 *
 * - explainRisk - A function that generates an explanation of a user's cancer risk.
 * - AiRiskExplanationInput - The input type for the explainRisk function.
 * - AiRiskExplanationOutput - The return type for the explainRisk function.
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
  symptoms: z.string().describe('A summary of reported symptoms, e.g., "Breast lump: Yes, Pain: No, Irregular periods: Yes, Abdominal bloating: No."'),
  familyHistory: z.string().describe('A summary of family cancer history, e.g., "Cancer history: Yes."'),
  lifestyle: z.string().describe('A summary of lifestyle factors, e.g., "Smoking: No, Alcohol: Moderate."'),
  contributingFactors: z
    .string()
    .describe(
      'A description of the top contributing factors from the ML model, e.g., "Age, presence of breast lump, and family history of cancer."'
    ),
});
export type AiRiskExplanationInput = z.infer<typeof AiRiskExplanationInputSchema>;

const AiRiskExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A simple, understandable explanation of the predicted cancer risk level, tailored to the user\'s data.'
    ),
  precautions: z
    .string()
    .describe(
      'Suggested precautions based on the risk level and contributing factors, e.g., lifestyle changes.'
    ),
  nextSteps: z
    .string()
    .describe(
      'Recommended next steps for the user, such as consulting a doctor or recommended screenings.'
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
  prompt: `You are a compassionate and clear healthcare assistant. Your task is to explain a user's predicted cancer risk in simple, easy-to-understand language.

The user has been assessed with a {{riskLevel}} cancer risk, with a confidence of {{confidence}}%.

Here's a summary of their health data:
- Age: {{{age}}}
- Gender: {{{gender}}}
- Symptoms: {{{symptoms}}}
- Family History: {{{familyHistory}}}
- Lifestyle: {{{lifestyle}}}

The primary factors contributing to this prediction are: {{{contributingFactors}}}.

Please provide:
1.  A clear, simple explanation of what this risk level means for the user, referencing their provided data and contributing factors. Avoid medical jargon.
2.  Practical and actionable precautions the user can take based on their data and the risk level.
3.  Specific next steps they should consider, such as consulting a healthcare professional or undergoing specific screenings. Emphasize that this information is for educational purposes only and not a medical diagnosis.

Ensure your response is concise, empathetic, and directly addresses the user's risk and how they can proceed.`,
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
