import React, { useState, useEffect } from 'react';
import './App.css';
import SceneRenderer from './components/SceneRenderer';
import SceneSelector from './components/SceneSelector';
import { listScenes } from './services/contentLoader';
import { Sun, Moon, BookOpen } from 'lucide-react';

function App() {
  const [scenes, setScenes] = useState<{ id: string; name: string; stageLevelRequirement: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Set initial theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function fetchScenes() {
      try {
        setIsLoading(true);
        const scenesList = await listScenes();
        setScenes(scenesList);
        if (scenesList.length > 0) {
          setSelectedSceneId(scenesList[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }

    fetchScenes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">正在加载学习资料...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error max-w-3xl mx-auto mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>加载资料时出错: {error}</span>
    </div>;
  }

  if (scenes.length === 0) {
    return <div className="alert alert-warning max-w-3xl mx-auto mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>没有找到学习场景</span>
    </div>;
  }

  return (
    <div className="App min-h-screen bg-base-200 pb-12">
      <div className="navbar bg-base-100 shadow-md mb-6">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">
            <BookOpen className="mr-2" size={24} />
            <span className="font-bold">ViewSay</span>
            <span className="text-primary ml-1">语言学习</span>
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-circle btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <SceneSelector 
          scenes={scenes} 
          onSelect={setSelectedSceneId} 
          selectedSceneId={selectedSceneId}
        />
        
        {selectedSceneId && (
          <div className="mt-6">
            <SceneRenderer sceneId={selectedSceneId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
