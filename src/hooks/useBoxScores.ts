import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BoxScore {
  id: string;
  player_name: string;
  game_date: string;
  team: string;
  opponent: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  field_goals_made: number;
  field_goals_attempted: number;
  three_pointers_made: number;
  three_pointers_attempted: number;
  free_throws_made: number;
  free_throws_attempted: number;
}

export const useHighestScoringGame = () => {
  return useQuery({
    queryKey: ["highest-scoring-game"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("box_scores")
        .select("id, player_name, game_date, team, opponent, points, rebounds, assists")
        .order("points", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching highest scoring game:", error);
        throw error;
      }

      return data as BoxScore[];
    },
  });
};

export const useHighestAssistsGame = () => {
  return useQuery({
    queryKey: ["highest-assists-game"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("box_scores")
        .select("id, player_name, game_date, team, opponent, points, rebounds, assists")
        .gte('game_date', '2024-10-01')
        .lte('game_date', '2025-06-30')
        .order("assists", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching highest assists game:", error);
        throw error;
      }

      return data as BoxScore[];
    },
  });
};
export const useHighestReboundsGame = () => {
  return useQuery({
    queryKey: ["highest-rebounds-game"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("box_scores")
        .select("id, player_name, game_date, team, opponent, points, rebounds, assists")
        .gte('game_date', '2024-10-01')
        .lte('game_date', '2025-06-30')
        .order("rebounds", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching highest rebounds game:", error);
        throw error;
      }

      return data as BoxScore[];
    },
  });
};

export const useRecentUniqueGames = () => {
  return useQuery({
    queryKey: ["recent-unique-games"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("box_scores")
        .select("*")
        .eq("first_time_combination", true)
        .order("game_date", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching recent unique games:", error);
        throw error;
      }

      return data as BoxScore[];
    },
  });
};

export const useBoxScores = (searchQuery: string = "") => {
  return useQuery({
    queryKey: ["box-scores", searchQuery],
    queryFn: async () => {
      try {
        let query = supabase
          .from("box_scores")
          .select("*") as any;
        
        query = query
          .eq("first_time_combination", true)
          .order("game_date", { ascending: false });

        if (searchQuery) {
          query = query.ilike("player_name", `%${searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching box scores:", error);
          return [];
        }

        console.log('Raw data from Supabase:', data);

        const sanitizedData = (data || []).map(record => {
          try {
            const dateValue = record.game_date;
            let validDate = null;
            
            if (dateValue) {
              const parsedDate = new Date(dateValue);
              if (!isNaN(parsedDate.getTime())) {
                validDate = parsedDate.toISOString().split('T')[0];
              }
            }

            return {
              ...record,
              game_date: validDate
            };
          } catch (err) {
            console.error("Error processing record:", record);
            return {
              ...record,
              game_date: null
            };
          }
        });

        return sanitizedData;
      } catch (err) {
        console.error("Unexpected error:", err);
        return [];
      }
    },
    retry: 3,
    initialData: [],
    staleTime: 1000 * 60 * 5,
  });
};
