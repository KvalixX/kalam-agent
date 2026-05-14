import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import { getSystemPrompt } from "./prompts";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function processGroqResponse(merchantId: string, customerId: string, messageText: string, history: any[] = []) {
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

  const fullPrompt = `${systemPrompt}\n\nOUR PRODUCTS:\n${productContext}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: fullPrompt },
        ...history.map(h => ({
          role: h.type === 'agent' ? 'assistant' : 'user',
          content: h.text,
        })),
        { role: "user", content: messageText },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || "";
    
  } catch (error: any) {
    console.error('Groq API Error:', error.message);
    return `Ahlan! 3ndna had l-khirat l-youma:\n${productContext}\n\nKifach n9der n3awnk?`;
  }
}
