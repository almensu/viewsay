import React, { useState } from 'react';

interface Hotspot {
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  linkedSentenceId: string;
}

interface SceneImageProps {
  src: string;
  hotspots?: Hotspot[];
  onHotspotClick?: (sentenceId: string) => void;
}

const SceneImage: React.FC<SceneImageProps> = ({ src, hotspots = [], onHotspotClick }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  
  const handleHotspotClick = (id: string) => {
    setActiveHotspot(id === activeHotspot ? null : id);
    if (onHotspotClick) {
      onHotspotClick(id);
    }
  };
  
  return (
    <div className="scene-image-container relative">
      <img 
        src={src} 
        alt="场景图片" 
        className="w-full rounded-lg shadow-sm"
      />
      
      {hotspots && hotspots.map((hotspot, index) => (
        <div
          key={index}
          className={`absolute cursor-pointer transition-all duration-200 border-2 rounded-md ${
            activeHotspot === hotspot.linkedSentenceId 
              ? 'border-blue-500 bg-blue-100 bg-opacity-50' 
              : 'border-transparent hover:border-yellow-300 hover:bg-yellow-100 hover:bg-opacity-30'
          }`}
          style={{
            left: `${hotspot.coordinates.x}px`,
            top: `${hotspot.coordinates.y}px`,
            width: `${hotspot.coordinates.width}px`,
            height: `${hotspot.coordinates.height}px`,
          }}
          onClick={() => handleHotspotClick(hotspot.linkedSentenceId)}
        />
      ))}
      
      {hotspots && hotspots.length > 0 && (
        <div className="scene-help text-sm text-gray-500 mt-2">
          点击图片中的高亮区域查看相关句子
        </div>
      )}
    </div>
  );
};

export default SceneImage; 