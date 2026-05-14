import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { getSystemPrompt } from "./prompts";

export async function processGeminiResponse(merchantId: string, customerId: string, messageText: string, history: any[] = []) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // 1. Fetch Merchant & Catalog
  const { data: merchant } = await supabase
    .from('merchants')
    .select('*, agent_configs(*)')
    .eq('id', merchantId)
    .single();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('merchant_id', merchantId);

  const productContext = products && products.length > 0 
    ? products.map(p => `- ${p.name}: ${p.price} MAD (Stock: ${p.stock})`).join('\n')
    : "Currently, we have no products in stock.";

  const systemPrompt = getSystemPrompt({
    business_name: merchant?.business_name || 'Kalam Store',
    agent_name: merchant?.agent_configs?.agent_name || 'Kalam Assistant',
  });

  const fullPrompt = `
${systemPrompt}

OUR PRODUCTS:
${productContext}

CUSTOMER QUESTION:
${messageText}

Respond naturally in Moroccan Darija/French mix.
`;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey || apiKey.includes('your-key')) {
    return `Ahlan! 3ndna:\n${productContext}\n\nWash bghiti t3ref chi haja khra? (API Key Missing)`;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // 2. STABILIZE HISTORY (Merge consecutive roles)
    let stabilizedHistory: any[] = [];
    history.forEach(h => {
      const role = h.type === 'agent' ? 'model' : 'user';
      if (stabilizedHistory.length > 0 && stabilizedHistory[stabilizedHistory.length - 1].role === role) {
        stabilizedHistory[stabilizedHistory.length - 1].parts[0].text += `\n${h.text}`;
      } else {
        stabilizedHistory.push({ role, parts: [{ text: h.text }] });
      }
    });

    // 3. Ensure it starts with 'user'
    while (stabilizedHistory.length > 0 && stabilizedHistory[0].role !== 'user') {
      stabilizedHistory.shift();
    }

    const chat = model.startChat({ history: stabilizedHistory });
    const result = await chat.sendMessage(fullPrompt);
    return result.response.text();
    
  } catch (error: any) {
    console.error('Gemini Final Error:', error);
    return `Smah lia, wa9e3 chi mouchkil m3a l-AI. Walakin rah 3ndna:\n${productContext}\n\nKifach n9der n3awnk?`;
  }
}
