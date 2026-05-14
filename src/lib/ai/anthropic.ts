import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function generateResponse(messages: any[], systemPrompt: string) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY is missing. Returning placeholder response.');
    return "Smah lia, had l'agent baqi makhdamch 100% (Missing API Key).";
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    });

    // @ts-ignore
    return response.content[0].text;
  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw error;
  }
}
