import React from 'react';
import { MarkdownData } from '../services/markdownParser';

interface BlockRendererProps {
  block: MarkdownData;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  // 获取语言块属性
  const { 
    language = "英语",
    category = "对话",
    difficulty = "中等",
    title = "未命名块"
  } = block.metadata;
  
  // 分离不同语言的内容
  const originalText = block.sections['原文'];
  const translatedText = block.sections['译文'];
  const notes = block.sections['注释'];
  
  return (
    <div className="content-block">
      <div className="block-header flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium opacity-70">{title}</h3>
        <div className="block-meta text-sm opacity-60">
          {language} | {category} | 难度: {difficulty}
        </div>
      </div>
      
      {/* 句子展示区 - 中心位置突出显示 */}
      <div className="sentence-showcase flex flex-col justify-center items-center my-6 px-4 py-8 bg-gradient-to-r from-base-200 via-base-100 to-base-200 rounded-xl shadow-sm">
        {originalText && (
          <div className="original-text w-full mb-5 text-center">
            <div className="text-2xl font-medium leading-relaxed">
              {originalText}
            </div>
          </div>
        )}
        
        {translatedText && (
          <div className="translated-text w-full text-center">
            <div className="text-xl opacity-80 leading-relaxed">
              {translatedText}
            </div>
          </div>
        )}
      </div>
      
      {/* 补充信息区域 */}
      <div className="supplementary-info mt-6">
        {notes && (
          <div className="notes mt-3">
            <h4 className="text-md font-semibold text-purple-700 mb-1">学习笔记:</h4>
            <div className="bg-yellow-50 p-3 rounded">
              {notes}
            </div>
          </div>
        )}
        
        {block.content && (
          <div className="extra-content mt-3">
            <div className="bg-gray-50 p-3 rounded text-gray-700">
              {block.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockRenderer; 