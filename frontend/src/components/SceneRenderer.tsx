import React, { useState, useEffect } from 'react';
import { useScene } from '../hooks/useScene';
import { useContentBlocks } from '../hooks/useContentBlocks';
import BlockRenderer from './BlockRenderer';
import SceneImage from './SceneImage';

interface SceneRendererProps {
  sceneId: string;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ sceneId }) => {
  const { scene, isLoading: isSceneLoading, error: sceneError } = useScene(sceneId);
  const { 
    blocks, 
    isLoading: areBlocksLoading, 
    error: blocksError 
  } = useContentBlocks(
    scene?.metadata?.contentBlocks || []
  );

  // 跟踪当前选择的内容块
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(0);

  // 当blocks加载完成后，确保selectedBlockIndex是有效的
  useEffect(() => {
    if (blocks && blocks.length > 0 && selectedBlockIndex >= blocks.length) {
      setSelectedBlockIndex(0);
    }
  }, [blocks]);
  
  if (isSceneLoading) {
    return <div className="flex justify-center items-center p-8">
      <span className="loading loading-spinner loading-md"></span>
      <span className="ml-2">正在加载场景...</span>
    </div>;
  }
  
  if (sceneError) {
    return <div className="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>加载场景时出错: {sceneError.message}</span>
    </div>;
  }
  
  if (!scene) {
    return <div className="alert alert-warning">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>场景不存在</span>
    </div>;
  }

  // 如果内容块还在加载中
  if (areBlocksLoading) {
    return <div className="flex justify-center items-center p-8">
      <span className="loading loading-spinner loading-md"></span>
      <span className="ml-2">正在加载内容...</span>
    </div>;
  }

  // 如果加载内容块时出错
  if (blocksError) {
    return <div className="alert alert-error">
      <span>加载内容块时出错: {blocksError.message}</span>
    </div>;
  }
  
  return (
    <div className="bg-base-100 shadow-xl rounded-xl">
      <div className="p-6">
        {/* 面包屑导航 */}
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><span>学习场景</span></li>
            <li><span>{scene.metadata.name}</span></li>
          </ul>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{scene.metadata.name}</h1>
        
        {/* 场景介绍 */}
        <div className="scene-intro bg-base-200 p-4 rounded-box mb-6">
          {scene.content}
        </div>
        
        {blocks.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* 左侧子场景导航 */}
            <div className="md:w-1/4 w-full">
              <h3 className="text-lg font-semibold mb-3">学习内容</h3>
              <ul className="steps steps-vertical w-full">
                {blocks.map((block, index) => (
                  <li 
                    key={block.metadata.id || index}
                    className={`step ${selectedBlockIndex >= index ? 'step-primary' : ''} cursor-pointer`}
                    onClick={() => setSelectedBlockIndex(index)}
                  >
                    {block.metadata.title || `内容 ${index + 1}`}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 右侧内容展示区 */}
            <div className="md:w-3/4 w-full">
              <div className="sentence-card">
                {blocks.length > selectedBlockIndex && (
                  <BlockRenderer block={blocks[selectedBlockIndex]} />
                )}
              </div>
              
              {/* 底部导航按钮 */}
              <div className="flex justify-between mt-6">
                <button 
                  className="btn btn-outline"
                  disabled={selectedBlockIndex === 0}
                  onClick={() => setSelectedBlockIndex(prev => Math.max(0, prev - 1))}
                >
                  上一句
                </button>
                <button 
                  className="btn btn-primary"
                  disabled={selectedBlockIndex === blocks.length - 1}
                  onClick={() => setSelectedBlockIndex(prev => Math.min(blocks.length - 1, prev + 1))}
                >
                  下一句
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 场景流程 (如果存在) */}
        {scene.sections['场景流程'] && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">场景流程</h2>
            <div className="steps steps-vertical">
              {scene.sections['场景流程'].split('\n').filter(Boolean).map((step, i) => (
                <li key={i} className="step step-primary">{step}</li>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneRenderer; 