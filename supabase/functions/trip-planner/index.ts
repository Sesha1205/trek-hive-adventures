
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TripPlanRequest {
  destination: string;
  fromDate: string;
  toDate: string;
  budget: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, fromDate, toDate, budget }: TripPlanRequest = await req.json();

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const systemPrompt = `You are a professional travel planner for TrekHive, specializing in adventure and trekking experiences. Create a detailed day-wise itinerary for a ${days}-day trip to ${destination} with a budget of ₹${budget}.

For each day, provide:
1. Day number and date
2. Main activities/attractions (focus on trekking, adventure, and natural attractions)
3. Specific place names with exact locations
4. Estimated cost breakdown
5. Travel tips and recommendations
6. Best time to visit each location
7. Difficulty level for trekking activities

Format the response as a structured JSON with this exact format:
{
  "destination": "${destination}",
  "totalDays": ${days},
  "totalBudget": ${budget},
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "places": [
        {
          "name": "Place Name",
          "location": "Exact location/address",
          "description": "Brief description",
          "activities": ["activity1", "activity2"],
          "estimatedCost": 500,
          "difficulty": "Easy/Moderate/Hard",
          "bestTime": "Morning/Afternoon/Evening"
        }
      ],
      "totalDayCost": 1500,
      "tips": "Travel tips for the day"
    }
  ],
  "additionalTips": "General travel tips for the entire trip",
  "packingList": ["item1", "item2", "item3"]
}

Ensure all place names are real, specific locations near ${destination}. Focus on adventure activities, trekking spots, scenic viewpoints, local experiences, and natural attractions.`;

    console.log('Generating trip plan for:', { destination, fromDate, toDate, budget, days });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
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

    let responseText = data.candidates[0].content.parts[0].text;
    
    // Clean up the response to extract JSON
    responseText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const tripPlan = JSON.parse(responseText);
      return new Response(JSON.stringify({ tripPlan }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // Return a structured response even if parsing fails
      return new Response(JSON.stringify({ 
        tripPlan: {
          destination,
          totalDays: days,
          totalBudget: budget,
          rawResponse: responseText,
          error: 'Could not parse structured response'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    console.error('Error in trip-planner function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate trip plan. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
