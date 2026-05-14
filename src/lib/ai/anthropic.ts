import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import { getSystemPrompt } from './prompts';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function processAiResponse(merchantId: string, customerId: string, messageText: string, history: any[] = []) {
  const supabase = await createClient();

  // 1. Fetch Merchant Info & Config
  const { data: merchant } = await supabase
    .from('merchants')
    .select('*, agent_configs(*)')
    .eq('id', merchantId)
    .single();

  // 2. Fetch Knowledge Base & Products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('merchant_id', merchantId);

  const { data: knowledge } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('merchant_id', merchantId);

  // 3. Construct Context Strings
  const productContext = products?.map(p => `- ${p.name}: ${p.price} MAD (Stock: ${p.stock})`).join('\n') || 'No products listed.';
  const knowledgeContext = knowledge?.map(k => `### ${k.name}\n${k.content}`).join('\n\n') || 'No additional policies.';

  // 4. Build System Prompt
  const baseSystemPrompt = getSystemPrompt({
    business_name: merchant?.business_name || 'Kalam Store',
    agent_name: merchant?.agent_configs?.agent_name || 'Kalam Bot',
    return_policy: merchant?.agent_configs?.return_policy,
    delivery_policy: merchant?.agent_configs?.delivery_policy
  });

  const fullSystemPrompt = `
${baseSystemPrompt}

CURRENT CATALOG:
${productContext}

STORE KNOWLEDGE:
${knowledgeContext}

IMPORTANT:
- If a customer asks for a product, check the catalog above.
- If they ask about policies, use the store knowledge.
- Respond naturally in Moroccan Darija/French mix.
- Be concise.
`;

  // 5. Call Anthropic
  if (!process.env.ANTHROPIC_API_KEY) {
    return "Smah lia, had l'agent baqi makhdamch 100% (Missing API Key).";
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: fullSystemPrompt,
      messages: [
        ...history.map(h => ({
          role: h.type === 'agent' ? 'assistant' : 'user',
          content: h.text,
        })),
        { role: 'user', content: messageText }
      ],
    });

    // @ts-ignore
    return response.content[0].text;
  } catch (error) {
    console.error('AI Processing Error:', error);
    return "Smah lia, wa9e3 chi mouchkil sghir. Nchof m3a l'moul l'ma7al o nrje3 3ndk.";
  }
}
