from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
import yaml

app = FastAPI(title="ViewSay API", description="API for the ViewSay language learning app")

# 启用CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境中应更严格
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 静态资源目录
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# 内容目录路径
CONTENT_DIR = Path("app/content")

@app.get("/")
async def read_root():
    return {"message": "Welcome to ViewSay API"}

@app.get("/api/scenes")
async def list_scenes():
    """列出所有可用场景"""
    scene_dir = CONTENT_DIR / "scenes"
    scenes = []
    
    if not scene_dir.exists():
        return {"scenes": scenes}
    
    for file_path in scene_dir.glob("*.md"):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            # 提取YAML前端数据
            if content.startswith("---"):
                yaml_end = content.find("---", 3)
                if yaml_end != -1:
                    yaml_content = content[3:yaml_end].strip()
                    try:
                        metadata = yaml.safe_load(yaml_content)
                        scenes.append({
                            "id": metadata.get("id"),
                            "name": metadata.get("name"),
                            "stageLevelRequirement": metadata.get("stageLevelRequirement"),
                            "visualAsset": metadata.get("visualAsset")
                        })
                    except Exception as e:
                        print(f"Error parsing {file_path}: {e}")
    
    return {"scenes": scenes}

@app.get("/api/scenes/{scene_id}")
async def get_scene(scene_id: str):
    """获取特定场景的完整内容"""
    # 首先尝试直接匹配
    file_path = CONTENT_DIR / "scenes" / f"{scene_id}.md"
    
    # 如果找不到，尝试添加scene_前缀
    if not file_path.exists():
        file_path = CONTENT_DIR / "scenes" / f"scene_{scene_id}.md"
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Scene not found: {scene_id}")
    
    return FileResponse(file_path)

@app.get("/api/blocks/{block_id}")
async def get_content_block(block_id: str):
    """获取特定内容块"""
    file_path = CONTENT_DIR / "blocks" / f"{block_id}.md"
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Content block not found: {block_id}")
    
    return FileResponse(file_path)

@app.get("/api/stages")
async def list_stages():
    """列出所有语言发展阶段"""
    stage_dir = CONTENT_DIR / "stages"
    stages = []
    
    if not stage_dir.exists():
        return {"stages": stages}
    
    for file_path in stage_dir.glob("*.md"):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            if content.startswith("---"):
                yaml_end = content.find("---", 3)
                if yaml_end != -1:
                    yaml_content = content[3:yaml_end].strip()
                    try:
                        metadata = yaml.safe_load(yaml_content)
                        stages.append({
                            "id": metadata.get("id"),
                            "name": metadata.get("name"),
                            "requiredXP": metadata.get("requiredXP")
                        })
                    except Exception as e:
                        print(f"Error parsing {file_path}: {e}")
    
    # 按id排序
    stages.sort(key=lambda x: x["id"])
    
    return {"stages": stages}

@app.get("/api/stages/{stage_id}")
async def get_stage(stage_id: int):
    """获取特定语言发展阶段的完整内容"""
    file_path = CONTENT_DIR / "stages" / f"stage_{stage_id}.md"
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Stage not found: {stage_id}")
    
    return FileResponse(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 