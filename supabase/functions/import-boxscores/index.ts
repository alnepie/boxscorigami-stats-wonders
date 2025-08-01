
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
    console.log('Received request');
    const { csvData } = await req.json();
    console.log('CSV data length:', csvData?.length);
    
    if (!csvData || !Array.isArray(csvData)) {
      throw new Error('Invalid CSV data format');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Process in smaller batches to prevent timeouts
    const BATCH_SIZE = 25;
    let totalProcessed = 0;
    
    for (let i = 0; i < csvData.length; i += BATCH_SIZE) {
      const batch = csvData.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${i/BATCH_SIZE + 1}, size: ${batch.length}`);
      
      const records = batch
        .filter(row => {
          const isValid = row.firstName && row.lastName && row.gameDate && row.playerteamName && row.opponentteamName;
          if (!isValid) {
            console.log('Invalid row:', row);
          }
          return isValid;
        })
        .map(row => ({
          player_name: `${row.firstName?.trim()} ${row.lastName?.trim()}`,
          game_date: row.gameDate?.trim(),
          team: `${row.playerteamCity?.trim()} ${row.playerteamName?.trim()}`,
          opponent: `${row.opponentteamCity?.trim()} ${row.opponentteamName?.trim()}`,
          points: parseInt(row.points) || 0,
          rebounds: parseInt(row.reboundsTotal) || 0,
          assists: parseInt(row.assists) || 0,
          steals: parseInt(row.steals) || 0,
          blocks: parseInt(row.blocks) || 0,
          turnovers: parseInt(row.turnovers) || 0,
          field_goals_made: parseInt(row.fieldGoalsMade) || 0,
          field_goals_attempted: parseInt(row.fieldGoalsAttempted) || 0,
          three_pointers_made: parseInt(row.threePointersMade) || 0,
          three_pointers_attempted: parseInt(row.threePointersAttempted) || 0,
          free_throws_made: parseInt(row.freeThrowsMade) || 0,
          free_throws_attempted: parseInt(row.freeThrowsAttempted) || 0,
          minutes_played: row.numMinutes?.toString() || null
        }));

      if (records.length === 0) {
        console.log('No valid records in batch');
        continue;
      }

      console.log(`Inserting ${records.length} records`);
      const { error } = await supabaseClient
        .from('box_scores')
        .upsert(records, {
          onConflict: 'player_name,game_date,team,opponent'
        });

      if (error) {
        console.error('Error inserting batch:', error);
        throw error;
      }

      totalProcessed += records.length;
      console.log(`Successfully processed ${totalProcessed} records so far`);
    }

    return new Response(
      JSON.stringify({ 
        message: `Data imported successfully. Processed ${totalProcessed} records.` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: `Import failed: ${error.message}. Please ensure your CSV file contains all required fields.` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
