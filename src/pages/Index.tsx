import { Search } from "@/components/Search";
import { StatCard } from "@/components/StatCard";
import { ImportButton } from "@/components/ImportButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useBoxScores } from "@/hooks/useBoxScores";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: boxScores, isLoading, error } = useBoxScores(searchQuery);
  const { toast } = useToast();

  // Just the basic structure without the statlines
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">BoxScorigami</h1>
      <Search onSearch={setSearchQuery} />
      <ImportButton />
      
      {error && (
        <div className="text-red-500">
          Error loading data. Please try again.
        </div>
      )}
      
      {isLoading && (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Index;
