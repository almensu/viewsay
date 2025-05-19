import { useState, useEffect } from 'react';
import { loadContentBlock } from '../services/contentLoader';
import { MarkdownData } from '../services/markdownParser';

interface UseContentBlocksResult {
  blocks: MarkdownData[];
  isLoading: boolean;
  error: Error | null;
}

export function useContentBlocks(blockIds: string[]): UseContentBlocksResult {
  const [blocks, setBlocks] = useState<MarkdownData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchBlocks() {
      try {
        setIsLoading(true);
        const blockPromises = blockIds.map(id => loadContentBlock(id));
        const blockData = await Promise.all(blockPromises);
        
        if (isMounted) {
          setBlocks(blockData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (blockIds.length > 0) {
      fetchBlocks();
    } else {
      setBlocks([]);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [blockIds]);

  return { blocks, isLoading, error };
} 