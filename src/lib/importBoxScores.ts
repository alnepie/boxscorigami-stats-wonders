
import { supabase } from "@/integrations/supabase/client";

const CHUNK_SIZE = 100; // Number of records to process at once

export const importBoxScores = async (file: File, onProgress?: (progress: number) => void) => {
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const csvText = event.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const totalRows = lines.length - 1;
        
        // Process data in chunks
        for (let i = 1; i < lines.length; i += CHUNK_SIZE) {
          const chunkLines = lines.slice(i, i + CHUNK_SIZE);
          const csvData = chunkLines.map(line => {
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

          // Calculate and report progress
          const progress = Math.min(Math.round((i + CHUNK_SIZE) / lines.length * 100), 100);
          onProgress?.(progress);
        }

        resolve({ message: 'Import completed successfully' });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
