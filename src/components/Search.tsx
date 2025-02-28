
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for players or stat lines..."
          className="w-full pl-10 pr-4 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};
