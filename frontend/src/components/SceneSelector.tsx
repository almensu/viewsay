import React from 'react';

interface SceneSelectorProps {
  scenes: { id: string; name: string; stageLevelRequirement: number }[];
  selectedSceneId: string | null;
  onSelect: (sceneId: string) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({ 
  scenes, 
  selectedSceneId, 
  onSelect 
}) => {
  // 按照等级要求对场景进行分组
  const scenesByLevel = scenes.reduce<Record<number, typeof scenes>>((acc, scene) => {
    const level = scene.stageLevelRequirement || 1;
    if (!acc[level]) acc[level] = [];
    acc[level].push(scene);
    return acc;
  }, {});
  
  // 获取所有可用的等级
  const levels = Object.keys(scenesByLevel).map(Number).sort((a, b) => a - b);
  
  return (
    <div className="scene-selector mb-8">
      {/* 主场景导航 - 水平标签页 */}
      <div className="tabs tabs-boxed bg-base-200 p-1 mb-4 flex-wrap justify-center">
        {scenes.map(scene => (
          <button
            key={scene.id}
            className={`tab tab-lg transition-all ${selectedSceneId === scene.id ? 'tab-active' : 'hover:bg-base-300'}`}
            onClick={() => onSelect(scene.id)}
          >
            {scene.name}
          </button>
        ))}
      </div>
      
      {/* 按等级分组的导航（可选，作为辅助导航） */}
      <div className="scene-levels mt-2">
        {levels.map(level => (
          <div key={level} className="mb-4">
            <div className="divider">级别 {level}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {scenesByLevel[level].map(scene => (
                <div 
                  key={scene.id}
                  className={`card ${selectedSceneId === scene.id ? 'bg-primary text-primary-content' : 'bg-base-200 hover:bg-base-300'} cursor-pointer transition-colors`}
                  onClick={() => onSelect(scene.id)}
                >
                  <div className="card-body p-3">
                    <h3 className="card-title text-base">{scene.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneSelector; 