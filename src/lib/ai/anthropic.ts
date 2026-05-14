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
  const isPlaceholder = !process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes('your-real-key');

  if (isPlaceholder) {
    // MOCK RESPONSE for testing without real key
    if (messageText.toLowerCase().includes('catalog') || messageText.toLowerCase().includes('chno 3ndkom')) {
      return `Ahlan! 3ndna had l-khirat l-youma:\n${productContext}\n\nWash bghiti n3awnk f chi haja khra? ✨`;
    }
    return "Ahlan! Ana Kalam AI. Kifach n9der n3awnk? (Note: Using Mock Mode because API Key is not set).";
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
  } catch (error: any) {
    console.error('AI Processing Error:', error.message);
    // Even on error, try to give a helpful mock response instead of failing
    if (products && products.length > 0) {
      return `Smah lia, wa9e3 chi mouchkil m3a Claude. Walakin rah 3ndna:\n${productContext}\n\nNchof m3a l'moul l'ma7al o nrje3 3ndk.`;
    }
    return "Smah lia, wa9e3 chi mouchkil sghir. Nchof m3a l'moul l'ma7al o nrje3 3ndk.";
  }
}
