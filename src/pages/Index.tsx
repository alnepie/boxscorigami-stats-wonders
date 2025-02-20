
import { Search } from "@/components/Search";
import { StatCard } from "@/components/StatCard";
import { motion } from "framer-motion";

const Index = () => {
  // Example data - in a real app, this would come from an API
  const statLines = [
    {
      player: "Nikola Jokić",
      date: "March 15, 2024",
      points: 25,
      rebounds: 17,
      assists: 12,
    },
    {
      player: "Joel Embiid",
      date: "March 14, 2024",
      points: 35,
      rebounds: 15,
      assists: 8,
    },
    {
      player: "Luka Dončić",
      date: "March 13, 2024",
      points: 30,
      rebounds: 12,
      assists: 15,
    },
  ];

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

        <Search />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statLines.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
