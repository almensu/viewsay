import json
import os
from pathlib import Path
import re
import uuid
from datetime import datetime
import yaml

# 根目录设置
CONTENT_DIR = Path("../content")

def ensure_dir(dir_path):
    """确保目录存在"""
    os.makedirs(dir_path, exist_ok=True)

def generate_block_id():
    """生成唯一的内容块ID"""
    return f"block_{uuid.uuid4().hex[:8]}"

def extract_metadata_from_markdown(file_path):
    """从Markdown文件中提取YAML元数据"""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
        if not content.startswith("---"):
            return None
            
        yaml_end = content.find("---", 3)
        if yaml_end == -1:
            return None
            
        yaml_content = content[3:yaml_end].strip()
        try:
            return yaml.safe_load(yaml_content)
        except Exception as e:
            print(f"Error parsing YAML from {file_path}: {e}")
            return None

def import_youtube_transcript(video_id, transcript_text, language="en"):
    """
    从YouTube字幕文本中导入内容
    
    Args:
        video_id (str): YouTube视频ID
        transcript_text (str): 字幕文本，格式为"时间戳 --> 时间戳 文本内容"
        language (str): 语言代码
    
    Returns:
        list: 创建的内容块ID列表
    """
    # 创建视频源目录
    source_id = f"youtube_{video_id}"
    source_dir = CONTENT_DIR / "sources" / "videos" / source_id
    ensure_dir(source_dir)
    
    # 保存原始字幕
    with open(source_dir / "transcript.vtt", "w", encoding="utf-8") as f:
        f.write(transcript_text)
    
    # 保存元数据
    metadata = {
        "id": source_id,
        "type": "video",
        "platform": "youtube",
        "videoId": video_id,
        "language": language,
        "importDate": datetime.now().isoformat()
    }
    
    with open(source_dir / "metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    
    # 分析字幕并创建内容块
    blocks = []
    
    # 简单的句子提取逻辑，可以根据需要调整
    lines = transcript_text.strip().split("\n")
    current_text = ""
    
    for line in lines:
        # 跳过时间戳行
        if "-->" in line:
            continue
        
        # 空行表示段落结束
        if not line.strip():
            if current_text:
                block_id = generate_block_id()
                blocks.append(create_content_block(block_id, current_text, source_id))
                current_text = ""
            continue
        
        current_text += line.strip() + " "
    
    # 处理最后一个块
    if current_text:
        block_id = generate_block_id()
        blocks.append(create_content_block(block_id, current_text, source_id))
    
    # 更新全局索引
    update_global_index(blocks, source_id)
    
    return blocks

def create_content_block(block_id, text, source_id, tags=None):
    """创建内容块并保存为Markdown文件"""
    if tags is None:
        tags = []
    
    content = f"""---
id: "{block_id}"
type: "sentence_block"
source: "{source_id}"
tags: {json.dumps(tags)}
---

# "{text.strip()}"

## 上下文
从 {source_id} 提取的内容。

## 核心词汇
(请手动添加核心词汇)

## 语法结构
(请手动添加语法结构)
"""
    
    # 保存内容块
    block_dir = CONTENT_DIR / "blocks"
    ensure_dir(block_dir)
    
    with open(block_dir / f"{block_id}.md", "w", encoding="utf-8") as f:
        f.write(content)
    
    return block_id

def create_scene(scene_id, name, description, visual_asset, stage_level, content_blocks):
    """创建场景Markdown文件"""
    content = f"""---
id: "{scene_id}"
name: "{name}"
stageLevelRequirement: {stage_level}
visualAsset: "{visual_asset}"
contentBlocks: {json.dumps(content_blocks)}
---

# {name}

{description}

## 场景流程
(请手动添加场景流程)

## 互动热点
(请手动添加互动热点)
"""
    
    # 保存场景文件
    scene_dir = CONTENT_DIR / "scenes"
    ensure_dir(scene_dir)
    
    with open(scene_dir / f"{scene_id}.md", "w", encoding="utf-8") as f:
        f.write(content)
    
    return scene_id

def create_language_stage(stage_id, name, required_xp, description):
    """创建语言发展阶段Markdown文件"""
    content = f"""---
id: {stage_id}
name: "{name}"
requiredXP: {required_xp}
---

# 阶段{stage_id}：{name}

{description}

## 核心句型
(请手动添加核心句型)

## 推荐场景
(请手动添加推荐场景)
"""
    
    # 保存阶段文件
    stage_dir = CONTENT_DIR / "stages"
    ensure_dir(stage_dir)
    
    with open(stage_dir / f"stage_{stage_id}.md", "w", encoding="utf-8") as f:
        f.write(content)
    
    return stage_id

def update_global_index(new_block_ids, source_id):
    """更新全局内容索引"""
    index_path = CONTENT_DIR / "index.json"
    
    # 读取现有索引或创建新索引
    if index_path.exists():
        with open(index_path, "r", encoding="utf-8") as f:
            try:
                global_index = json.load(f)
            except json.JSONDecodeError:
                global_index = {"contentBlocks": {}, "sources": {}}
    else:
        global_index = {"contentBlocks": {}, "sources": {}}
    
    # 确保source存在
    if source_id not in global_index["sources"]:
        global_index["sources"][source_id] = {
            "extractedBlocks": []
        }
    
    # 添加新块
    source_entry = global_index["sources"][source_id]
    source_entry["extractedBlocks"].extend(new_block_ids)
    
    # 保存更新后的索引
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(global_index, f, indent=2)

def import_article(article_id, article_text, source_type="article", language="en"):
    """
    从文章文本中导入内容
    
    Args:
        article_id (str): 文章ID
        article_text (str): 文章文本
        source_type (str): 来源类型，例如"bbc"、"wsj"
        language (str): 语言代码
    
    Returns:
        list: 创建的内容块ID列表
    """
    # 创建文章源目录
    source_id = f"{source_type}_{article_id}"
    source_dir = CONTENT_DIR / "sources" / "articles" / source_id
    ensure_dir(source_dir)
    
    # 保存原始文章
    with open(source_dir / "original.txt", "w", encoding="utf-8") as f:
        f.write(article_text)
    
    # 保存元数据
    metadata = {
        "id": source_id,
        "type": "article",
        "platform": source_type,
        "language": language,
        "importDate": datetime.now().isoformat()
    }
    
    with open(source_dir / "metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    
    # 分析文章并创建内容块
    blocks = []
    
    # 简单的段落分割，可以根据需要调整
    paragraphs = article_text.split("\n\n")
    
    for paragraph in paragraphs:
        if paragraph.strip():
            # 分割长段落为句子
            sentences = re.split(r'(?<=[.!?])\s+', paragraph.strip())
            
            for sentence in sentences:
                if len(sentence.split()) > 3:  # 忽略过短的句子
                    block_id = generate_block_id()
                    blocks.append(create_content_block(block_id, sentence, source_id))
    
    # 更新全局索引
    update_global_index(blocks, source_id)
    
    return blocks


if __name__ == "__main__":
    # 示例调用
    print("Content import tools module loaded.") 