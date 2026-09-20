import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt, ageGroup = 'U12', nasmPhase = 'phase_1_stabilization' } = await req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    // Call Gemini 3.7 Flash API directly
    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    const aiData = await aiResponse.json();
    const circuitData = JSON.parse(aiData.candidates[0].content.parts[0].text);

    // Save directly to Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("workout_circuits")
      .insert({
        title: circuitData.title,
        target_age_group: ageGroup,
        nasm_phase: nasmPhase,
        duration_minutes: circuitData.duration_minutes || 12,
        circuit_data: circuitData
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, circuit: data.circuit_data, db_id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});