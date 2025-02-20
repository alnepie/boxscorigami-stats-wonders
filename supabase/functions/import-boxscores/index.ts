
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
      const records = batch.map(row => ({
        player_name: row.Player,
        game_date: row.Date,
        team: row.Team,
        opponent: row.Opponent,
        points: parseInt(row.PTS),
        rebounds: parseInt(row.TRB),
        assists: parseInt(row.AST),
        steals: parseInt(row.STL),
        blocks: parseInt(row.BLK),
        turnovers: parseInt(row.TOV),
        field_goals_made: parseInt(row.FG),
        field_goals_attempted: parseInt(row.FGA),
        three_pointers_made: parseInt(row['3P']),
        three_pointers_attempted: parseInt(row['3PA']),
        free_throws_made: parseInt(row.FT),
        free_throws_attempted: parseInt(row.FTA),
        minutes_played: row.MP
      }));

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
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
