---
id: "scene_doctor_visit"
name: "看医生"
stageLevelRequirement: 3
visualAsset: "doctor_office.jpg"
contentBlocks: ["block_doctor_reception", "block_doctor_symptoms", "block_doctor_prescription"]
interactiveHotspots: [
  {
    "coordinates": {"x": 90, "y": 140, "width": 100, "height": 100},
    "linkedSentenceId": "block_doctor_reception"
  },
  {
    "coordinates": {"x": 240, "y": 160, "width": 100, "height": 100},
    "linkedSentenceId": "block_doctor_symptoms"
  },
  {
    "coordinates": {"x": 380, "y": 190, "width": 100, "height": 100},
    "linkedSentenceId": "block_doctor_prescription"
  }
]
---

# 看医生

这个场景展示了患者在医院或诊所看医生的对话，包括挂号、描述症状和拿药。

## 场景流程
1. 接待登记 -> "I have an appointment with Dr. Smith at 2:30. My name is John Brown."
2. 描述症状 -> "I've had a sore throat and fever for two days. I also feel very tired."
3. 拿处方药 -> "How often should I take this medication? Are there any side effects I should know about?"

## 互动热点
- [90,140,100,100] -> block_doctor_reception # 前台
- [240,160,100,100] -> block_doctor_symptoms # 医生
- [380,190,100,100] -> block_doctor_prescription # 药房 