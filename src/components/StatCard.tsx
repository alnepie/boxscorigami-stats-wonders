
import { motion } from "framer-motion";

interface StatCardProps {
  player: string;
  date: string;
  points: number;
  rebounds: number;
  assists: number;
}

export const StatCard = ({ player, date, points, rebounds, assists }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full">
            Unique Stat Line
          </span>
          <h3 className="text-xl font-semibold text-foreground">{player}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{points}</p>
            <p className="text-sm text-muted-foreground">PTS</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{rebounds}</p>
            <p className="text-sm text-muted-foreground">REB</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{assists}</p>
            <p className="text-sm text-muted-foreground">AST</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
