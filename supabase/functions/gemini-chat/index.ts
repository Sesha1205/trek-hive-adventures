
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiRequest {
  message: string;
  conversationHistory: ChatMessage[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] }: GeminiRequest = await req.json();

    // System context for TrekHive
    const systemContext = `You are TrekHive's AI assistant, specialized in helping users find and plan amazing trekking and adventure experiences. You have knowledge about:
    - Trekking destinations across India and globally
    - Adventure sports and outdoor activities
    - Travel planning and budgeting
    - Safety guidelines for outdoor adventures
    - Equipment recommendations
    - Weather conditions and best times to visit
    - Local culture and customs

    Keep responses helpful, friendly, and focused on adventure travel. If users ask about booking or specific trips, guide them to explore the available options on the platform.`;

    // Prepare the conversation for Gemini
    const contents = [
      {
        role: 'user',
        parts: [{ text: systemContext }]
      },
      ...conversationHistory,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    console.log('Sending request to Gemini API...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const geminiResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ 
      response: geminiResponse,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', parts: [{ text: message }] },
        { role: 'model', parts: [{ text: geminiResponse }] }
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get response from AI assistant. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
