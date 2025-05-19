---
id: "scene_classroom"
name: "课堂互动"
stageLevelRequirement: 1
visualAsset: "classroom.jpg"
contentBlocks: ["block_classroom_greeting", "block_classroom_question", "block_classroom_group"]
interactiveHotspots: [
  {
    "coordinates": {"x": 80, "y": 120, "width": 100, "height": 100},
    "linkedSentenceId": "block_classroom_greeting"
  },
  {
    "coordinates": {"x": 220, "y": 150, "width": 100, "height": 100},
    "linkedSentenceId": "block_classroom_question"
  },
  {
    "coordinates": {"x": 350, "y": 180, "width": 100, "height": 100},
    "linkedSentenceId": "block_classroom_group"
  }
]
---

# 课堂互动

这个场景展示了学生在课堂上的基础对话，包括与老师和同学的交流。

## 场景流程
1. 课堂开始 -> "Good morning, teacher. May I come in?"
2. 提问问题 -> "I don't understand this question. Could you explain it again, please?"
3. 小组讨论 -> "Let's work together on this project. What do you think?"

## 互动热点
- [80,120,100,100] -> block_classroom_greeting # 老师
- [220,150,100,100] -> block_classroom_question # 课本
- [350,180,100,100] -> block_classroom_group # 同学 