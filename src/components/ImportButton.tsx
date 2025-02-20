
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { importBoxScores } from "@/lib/importBoxScores";
import { useState } from "react";

export const ImportButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setProgress(0);
    
    try {
      await importBoxScores(file);
      toast({
        title: "Success",
        description: "Box scores imported successfully",
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to import box scores. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      <Button 
        variant="outline" 
        className="pointer-events-none"
        disabled={isLoading}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isLoading ? "Importing..." : "Import CSV"}
      </Button>
    </div>
  );
};
