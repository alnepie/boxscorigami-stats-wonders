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
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching highest assists game:", error);
        throw error;
      }

      return data as BoxScore | null;
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
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching highest rebounds game:", error);
        throw error;
      }

      return data as BoxScore | null;
    },
  });
};

export const useBoxScores = (searchQuery: string = "") => {
  return useQuery({
    queryKey: ["box-scores", searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("box_scores")
        .select("id, player_name, game_date, team, opponent, points, rebounds, assists")
        .order("game_date", { ascending: false })
        .limit(50);

      if (searchQuery) {
        query = query.ilike("player_name", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching box scores:", error);
        throw error;
      }

      return data as BoxScore[];
    },
  });
};
