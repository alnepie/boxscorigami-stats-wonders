
import { supabase } from "@/integrations/supabase/client";

const CHUNK_SIZE = 100; // Number of records to process at once

export const importBoxScores = async (file: File, onProgress?: (progress: number) => void) => {
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const csvText = event.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split('\t'); // Changed to tab delimiter
        const totalRows = lines.length - 1;
        
        console.log('Headers:', headers);
        
        // Process data in chunks
        for (let i = 1; i < lines.length; i += CHUNK_SIZE) {
          const chunkLines = lines.slice(i, i + CHUNK_SIZE);
          const csvData = chunkLines
            .filter(line => line.trim()) // Skip empty lines
            .map(line => {
              const values = line.split('\t'); // Changed to tab delimiter
              return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim();
                return obj;
              }, {} as Record<string, string>);
            });

          console.log(`Processing chunk ${i} to ${i + CHUNK_SIZE}, rows:`, csvData.length);

          const { data: functionData, error: functionError } = await supabase.functions.invoke(
            'import-boxscores',
            {
              body: { csvData }
            }
          );

          if (functionError) {
            console.error('Function error:', functionError);
            throw functionError;
          }

          // Calculate and report progress
          const progress = Math.min(Math.round((i + CHUNK_SIZE) / lines.length * 100), 100);
          onProgress?.(progress);
        }

        resolve({ message: 'Import completed successfully' });
      } catch (error) {
        console.error('Import error:', error);
        reject(error);
      }
    };

    reader.onerror = () => {
      console.error('FileReader error:', reader.error);
      reject(reader.error);
    };
    
    reader.readAsText(file);
  });
};
