
import { Search } from "@/components/Search";
import { StatCard } from "@/components/StatCard";
import { ImportButton } from "@/components/ImportButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useBoxScores, useHighestScoringGame, useHighestAssistsGame, useHighestReboundsGame } from "@/hooks/useBoxScores";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: boxScores, isLoading, error } = useBoxScores(searchQuery);
  const { data: highestScoringGames, isLoading: isLoadingHighScore } = useHighestScoringGame();
  const { data: highestAssistsGame, isLoading: isLoadingAssists } = useHighestAssistsGame();
  const { data: highestReboundsGame, isLoading: isLoadingRebounds } = useHighestReboundsGame();
  const { toast } = useToast();

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
