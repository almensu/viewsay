#!/bin/bash

# 终端颜色设置
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}启动 ViewSay 应用...${NC}"

# 启动后端
echo -e "${BLUE}启动后端服务...${NC}"
cd backend
if [ ! -d ".venv" ]; then
    echo "创建Python虚拟环境(使用uv)..."
    uv venv .venv
    source .venv/bin/activate
    uv pip install -r requirements.txt
else
    source .venv/bin/activate
fi
uvicorn app.main:app --reload --port 9000 &
BACKEND_PID=$!

# 返回根目录
cd ..

# 启动前端
echo -e "${BLUE}启动前端服务...${NC}"
cd frontend
npm install
# 安装必要的TypeScript类型定义
# echo -e "${BLUE}安装必要的TypeScript类型定义...${NC}"
PORT=9001 npm start &
FRONTEND_PID=$!

# 主进程等待
echo -e "${GREEN}服务已启动！${NC}"
echo -e "后端: http://localhost:9000"
echo -e "前端: http://localhost:9001"
echo -e "按 CTRL+C 停止所有服务"

# 捕获SIGINT信号
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

# 等待任意子进程终止
wait 