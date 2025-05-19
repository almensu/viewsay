import { useState, useEffect } from 'react';
import { loadScene } from '../services/contentLoader';
import { MarkdownData } from '../services/markdownParser';

interface UseSceneResult {
  scene: MarkdownData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useScene(sceneId: string): UseSceneResult {
  const [scene, setScene] = useState<MarkdownData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchScene() {
      try {
        setIsLoading(true);
        const sceneData = await loadScene(sceneId);
        
        if (isMounted) {
          setScene(sceneData);
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

    fetchScene();

    return () => {
      isMounted = false;
    };
  }, [sceneId]);

  return { scene, isLoading, error };
} 