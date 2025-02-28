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

  // Most recent unique statline
  const mostRecentUniqueStatline = {
    id: "most-recent",
    player_name: "Giannis Antetokounmpo",
    game_date: "2024-01-06",
    team: "Milwaukee Bucks",
    opponent: "Toronto Raptors",
    points: 11,
    rebounds: 12,
    assists: 13,
    steals: 5,
    blocks: 0,
    turnovers: 5,
    field_goals_made: 5,
    field_goals_attempted: 11,
    three_pointers_made: 1,
    three_pointers_attempted: 2,
    free_throws_made: 0,
    free_throws_attempted: 0
  };

  // Famous unique statlines that have only happened once in NBA history
  const famousUniqueStatlines = [
    {
      id: "famous1",
      player_name: "Draymond Green",
      game_date: "2017-02-10",
      team: "Golden State Warriors",
      opponent: "Memphis Grizzlies",
      points: 4,
      rebounds: 12,
      assists: 10,
      steals: 10,
      blocks: 5,
      turnovers: 2,
      field_goals_made: 2,
      field_goals_attempted: 6,
      three_pointers_made: 0,
      three_pointers_attempted: 1,
      free_throws_made: 0,
      free_throws_attempted: 0
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
    }
  ];

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch box scores. Please try again later.",
    });
  }

  // Check if the user is an admin (you can implement proper auth later)
  const isAdmin = false; // Set to false to hide the import button

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            <span className="text-secondary">Box</span><span className="text-primary">Scorigami</span>
          </h1>
          <div className="text-lg text-muted-foreground max-w-3xl mx-auto space-y-4">
            <h3 className="font-medium text-xl">What is BoxScorigami?</h3>
            <p>
              You might have seen Scorigami, a concept thought by Jon Bois, which tracks final scores that never happened in NFL history. BoxScorigami tracks unique statlines (Points, Rebounds and Assists) in the NBA. If we were to apply Pareto principle ideas to this, the list would be dominated by Wilt Chamberlain who had monster statlines (53 points, 32 rebounds, 14 assists!). Instead it's fascinating to see different players here such as Draymond who makes my personal list.
            </p>
          </div>
          {isAdmin && (
            <div className="flex justify-center">
              <ImportButton />
            </div>
          )}
        </motion.div>

        {/* Most Recent Unique Statline Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Most Recent Unique Statline</h2>
          <p className="text-center text-muted-foreground">The newest addition to the exclusive club of unique NBA stat combinations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="max-w-md mx-auto">
              <StatCard {...mostRecentUniqueStatline} />
            </div>
            <div className="max-w-md mx-auto">
              <img 
                src="/images/output.png" 
                alt="3D Pareto Principle Visualization of Game Stats" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mt-6">
            If we were to apply Pareto principle ideas to this, the list would be dominated by Wilt Chamberlain who had monster statlines (53 points, 32 rebounds, 14 assists!). Instead it's fascinating to see different players here such as Draymond who makes my personal list.
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                <h2 className="text-2xl font-bold text-center">Top 5 Highest Scoring Games (2024/2025)</h2>
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
                <h2 className="text-2xl font-bold text-center">Top 5 Most Assists (2024/2025)</h2>
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
                <h2 className="text-2xl font-bold text-center">Top 5 Most Rebounds (2024/2025)</h2>
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
