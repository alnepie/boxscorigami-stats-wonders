
import { Search } from "@/components/Search";
import { StatCard } from "@/components/StatCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { useBoxScores } from "@/hooks/useBoxScores";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: boxScores, isLoading, error } = useBoxScores(searchQuery);
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
        </motion.div>

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
