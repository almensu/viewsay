import yaml from 'js-yaml';

export interface MarkdownData {
  metadata: Record<string, any>;
  content: string;
  sections: Record<string, string>;
}

export async function parseMarkdown(markdownText: string): Promise<MarkdownData> {
  let metadata: Record<string, any> = {};
  let content = '';
  const sections: Record<string, string> = {};
  
  try {
    // 手动解析Markdown，避免复杂的remark库类型问题
    const lines = markdownText.split('\n');
    
    // 提取YAML元数据
    if (lines[0] === '---') {
      let yamlText = '';
      let i = 1;
      while (i < lines.length && lines[i] !== '---') {
        yamlText += lines[i] + '\n';
        i++;
      }
      
      if (i < lines.length) {
        try {
          metadata = yaml.load(yamlText) as Record<string, any> || {};
          // 跳过YAML区域和结束的---行
          lines.splice(0, i + 1);
        } catch (e) {
          console.error('Error parsing YAML frontmatter:', e);
        }
      }
    }
    
    // 解析Markdown内容和章节
    let currentSection = '';
    let currentSectionContent: string[] = [];
    let mainContent: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // 处理标题
      if (line.startsWith('# ')) {
        // 一级标题（主标题）
        const title = line.substring(2).trim();
        mainContent.push(title);
      } else if (line.startsWith('## ')) {
        // 二级标题（章节标题）
        // 如果已有章节，保存之前的
        if (currentSection && currentSectionContent.length > 0) {
          sections[currentSection] = currentSectionContent.join(' ').trim();
          currentSectionContent = [];
        }
        
        // 设置新章节
        currentSection = line.substring(3).trim();
      } else if (line.length > 0) {
        // 普通文本行
        if (currentSection) {
          currentSectionContent.push(line);
        } else {
          mainContent.push(line);
        }
      }
    }
    
    // 保存最后一个章节
    if (currentSection && currentSectionContent.length > 0) {
      sections[currentSection] = currentSectionContent.join(' ').trim();
    }
    
    // 设置主要内容
    content = mainContent.join(' ').trim();
  } catch (error) {
    console.error('Error processing markdown:', error);
    // 返回一个基本的数据结构，防止应用崩溃
    return { 
      metadata: { name: "加载错误", id: "error" }, 
      content: "无法加载内容", 
      sections: {} 
    };
  }
  
  return { metadata, content, sections };
} 