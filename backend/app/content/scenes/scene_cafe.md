---
id: "scene_cafe"
name: "在咖啡厅点餐"
stageLevelRequirement: 2
visualAsset: "cafe.jpg"
contentBlocks: ["block_cafe_greeting", "block_cafe_order", "block_cafe_payment"]
interactiveHotspots: [
  {
    "coordinates": {"x": 50, "y": 100, "width": 100, "height": 100},
    "linkedSentenceId": "block_cafe_greeting"
  },
  {
    "coordinates": {"x": 200, "y": 150, "width": 100, "height": 100},
    "linkedSentenceId": "block_cafe_order"
  },
  {
    "coordinates": {"x": 350, "y": 200, "width": 100, "height": 100},
    "linkedSentenceId": "block_cafe_payment"
  }
]
---

# 在咖啡厅点餐

这个场景展示了顾客在咖啡厅点餐的常见对话。包括问候、点餐和支付过程。

## 场景流程
1. 顾客进入咖啡厅 -> "Good morning. How are you today?"
2. 点餐对话 -> "I would like a large cappuccino, please."
3. 询问价格 -> "How much is that?"
4. 支付结账 -> "Here you go. Thank you."

## 互动热点
- [50,100,100,100] -> block_cafe_greeting # 咖啡师
- [200,150,100,100] -> block_cafe_order # 菜单
- [350,200,100,100] -> block_cafe_payment # 收银台 