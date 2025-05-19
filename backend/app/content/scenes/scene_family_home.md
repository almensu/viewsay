---
id: "scene_family_home"
name: "在家和家人交流"
stageLevelRequirement: 1
visualAsset: "family_home.jpg"
contentBlocks: ["block_family_greeting", "block_family_dinner", "block_family_evening"]
interactiveHotspots: [
  {
    "coordinates": {"x": 120, "y": 100, "width": 100, "height": 100},
    "linkedSentenceId": "block_family_greeting"
  },
  {
    "coordinates": {"x": 250, "y": 180, "width": 100, "height": 100},
    "linkedSentenceId": "block_family_dinner"
  },
  {
    "coordinates": {"x": 380, "y": 220, "width": 100, "height": 100},
    "linkedSentenceId": "block_family_evening"
  }
]
---

# 在家和家人交流

这个场景展示了家庭成员之间的日常对话，适合初学者学习基础家庭用语。

## 场景流程
1. 早晨问候 -> "Good morning, Mom. What's for breakfast?"
2. 家庭晚餐 -> "This food is delicious. Can I have some more, please?"
3. 晚间互动 -> "Should we watch a movie together tonight?"

## 互动热点
- [120,100,100,100] -> block_family_greeting # 妈妈
- [250,180,100,100] -> block_family_dinner # 餐桌
- [380,220,100,100] -> block_family_evening # 客厅 