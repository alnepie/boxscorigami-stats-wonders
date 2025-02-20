
import { supabase } from "@/integrations/supabase/client";

export const importBoxScores = async (file: File) => {
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const csvText = event.target?.result as string;
        // Basic CSV parsing (you might want to use a more robust CSV parser)
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const csvData = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim();
            return obj;
          }, {} as Record<string, string>);
        });

        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          'import-boxscores',
          {
            body: { csvData }
          }
        );

        if (functionError) throw functionError;
        resolve(functionData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
