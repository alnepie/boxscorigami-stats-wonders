
import { motion } from "framer-motion";
import { format } from "date-fns";

interface StatCardProps {
  player_name: string;
  game_date: string;
  team: string;
  opponent: string;
  points: number;
  rebounds: number;
  assists: number;
}

export const StatCard = ({ player_name, game_date, team, opponent, points, rebounds, assists }: StatCardProps) => {
  const formattedDate = format(new Date(game_date), "MMMM d, yyyy");
  
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
            {team} vs {opponent}
          </span>
          <h3 className="text-xl font-semibold text-foreground">{player_name}</h3>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
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
