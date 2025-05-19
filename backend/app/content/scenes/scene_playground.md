---
id: "scene_playground"
name: "在游乐场"
stageLevelRequirement: 1
visualAsset: "playground.jpg"
contentBlocks: ["block_playground_greeting", "block_playground_playing", "block_playground_sharing"]
interactiveHotspots: [
  {
    "coordinates": {"x": 110, "y": 130, "width": 100, "height": 100},
    "linkedSentenceId": "block_playground_greeting"
  },
  {
    "coordinates": {"x": 260, "y": 170, "width": 100, "height": 100},
    "linkedSentenceId": "block_playground_playing"
  },
  {
    "coordinates": {"x": 390, "y": 210, "width": 100, "height": 100},
    "linkedSentenceId": "block_playground_sharing"
  }
]
---

# 在游乐场

这个场景展示了孩子们在游乐场玩耍时的对话，适合儿童学习基础社交用语。

## 场景流程
1. 问候新朋友 -> "Hi! My name is Emma. What's your name? Do you want to play with me?"
2. 一起玩耍 -> "Let's go on the slide! Be careful, it's very high!"
3. 分享玩具 -> "Would you like to play with my ball? We can take turns."

## 互动热点
- [110,130,100,100] -> block_playground_greeting # 朋友
- [260,170,100,100] -> block_playground_playing # 滑梯
- [390,210,100,100] -> block_playground_sharing # 玩具 