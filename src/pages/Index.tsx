
import { Search } from "@/components/Search";
import { StatCard } from "@/components/StatCard";
import { ImportButton } from "@/components/ImportButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useBoxScores, useHighestScoringGame, useHighestAssistsGame, useHighestReboundsGame, useRecentUniqueGames } from "@/hooks/useBoxScores";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: boxScores, isLoading, error } = useBoxScores(searchQuery);
  const { data: highestScoringGames, isLoading: isLoadingHighScore } = useHighestScoringGame();
  const { data: highestAssistsGame, isLoading: isLoadingAssists } = useHighestAssistsGame();
  const { data: highestReboundsGame, isLoading: isLoadingRebounds } = useHighestReboundsGame();
  const { data: recentUniqueGames, isLoading: isLoadingRecentUnique } = useRecentUniqueGames();
  const { toast } = useToast();

  // Famous unique statlines that have only happened once in NBA history
  const famousUniqueStatlines = [
    {
      id: "famous4",
      player_name: "Giannis Antetokounmpo",
      game_date: "2023-12-13",
      team: "Milwaukee Bucks",
      opponent: "Indiana Pacers",
      points: 64,
      rebounds: 14,
      assists: 3,
      steals: 1,
      blocks: 4,
      turnovers: 3,
      field_goals_made: 20,
      field_goals_attempted: 28,
      three_pointers_made: 2,
      three_pointers_attempted: 4,
      free_throws_made: 22,
      free_throws_attempted: 32
    },
    {
      id: "famous1",
      player_name: "Draymond Green",
      game_date: "2017-02-10",
      team: "Golden State Warriors",
      opponent: "Memphis Grizzlies",
      points: 4,
      rebounds: 12,
      assists: 10,
      steals: 5,
      blocks: 1,
      turnovers: 2,
      field_goals_made: 1,
      field_goals_attempted: 4,
      three_pointers_made: 0,
      three_pointers_attempted: 1,
      free_throws_made: 2,
      free_throws_attempted: 2
    },
    {
      id: "famous2",
      player_name: "Russell Westbrook",
      game_date: "2019-04-02",
      team: "Oklahoma City Thunder",
      opponent: "Los Angeles Lakers",
      points: 20,
      rebounds: 20,
      assists: 21,
      steals: 2,
      blocks: 0,
      turnovers: 3,
      field_goals_made: 8,
      field_goals_attempted: 23,
      three_pointers_made: 2,
      three_pointers_attempted: 9,
      free_throws_made: 2,
      free_throws_attempted: 2
    },
    {
      id: "famous3",
      player_name: "Luka Dončić",
      game_date: "2022-12-27",
      team: "Dallas Mavericks",
      opponent: "New York Knicks",
      points: 60,
      rebounds: 21,
      assists: 10,
      steals: 2,
      blocks: 1,
      turnovers: 3,
      field_goals_made: 21,
      field_goals_attempted: 31,
      three_pointers_made: 2,
      three_pointers_attempted: 6,
      free_throws_made: 16,
      free_throws_attempted: 22
    }
  ];

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch box scores. Please try again later.",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
            NBA Statistics Reimagined
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Box Score<span className="text-primary">gami</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover unique NBA stat lines that have only happened once in league history.
          </p>
          <div className="flex justify-center">
            <ImportButton />
          </div>
        </motion.div>

        {/* Famous Unique Statlines Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Famous Unique Statlines</h2>
          <p className="text-center text-muted-foreground">These extraordinary stat combinations have only occurred once in NBA history</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {famousUniqueStatlines.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <StatCard {...game} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {!isLoadingHighScore && highestScoringGames && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-center">Top 5 Highest Scoring Games</h2>
                <div className="space-y-4">
                  {highestScoringGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    >
                      <StatCard {...game} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {!isLoadingAssists && highestAssistsGame && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-center">Most Assists (2024/25)</h2>
                <StatCard {...highestAssistsGame} />
              </motion.div>
            )}

            {!isLoadingRebounds && highestReboundsGame && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-center">Most Rebounds (2024/25)</h2>
                <StatCard {...highestReboundsGame} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Recent Unique Statlines Section */}
        {!isLoadingRecentUnique && recentUniqueGames && recentUniqueGames.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Recent Unique Statlines</h2>
            <p className="text-center text-muted-foreground">These stat combinations have only occurred once in NBA history</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentUniqueGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  <StatCard {...game} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <Search value={searchQuery} onChange={setSearchQuery} />

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading box scores...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boxScores?.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
