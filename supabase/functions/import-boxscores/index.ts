
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { csvData } = await req.json();
    
    // Process in smaller batches to prevent timeouts
    const BATCH_SIZE = 25;
    for (let i = 0; i < csvData.length; i += BATCH_SIZE) {
      const batch = csvData.slice(i, i + BATCH_SIZE);
      const records = batch
        .filter(row => row.Player && row.Date && row.Team && row.Opponent) // Filter out invalid rows
        .map(row => ({
          player_name: row.Player?.trim(),
          game_date: row.Date?.trim(),
          team: row.Team?.trim(),
          opponent: row.Opponent?.trim(),
          points: parseInt(row.PTS) || 0,
          rebounds: parseInt(row.TRB) || 0,
          assists: parseInt(row.AST) || 0,
          steals: parseInt(row.STL) || 0,
          blocks: parseInt(row.BLK) || 0,
          turnovers: parseInt(row.TOV) || 0,
          field_goals_made: parseInt(row.FG) || 0,
          field_goals_attempted: parseInt(row.FGA) || 0,
          three_pointers_made: parseInt(row['3P']) || 0,
          three_pointers_attempted: parseInt(row['3PA']) || 0,
          free_throws_made: parseInt(row.FT) || 0,
          free_throws_attempted: parseInt(row.FTA) || 0,
          minutes_played: row.MP?.trim() || null
        }));

      if (records.length === 0) continue;

      const { error } = await supabaseClient
        .from('box_scores')
        .upsert(records, {
          onConflict: 'player_name,game_date,team,opponent'
        });

      if (error) {
        console.error('Error inserting batch:', error);
        throw error;
      }
    }

    return new Response(
      JSON.stringify({ message: 'Data imported successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to import data. Please ensure your CSV file contains valid data with required fields (Player, Date, Team, Opponent).' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
