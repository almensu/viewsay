---
id: "scene_grocery_store"
name: "在超市购物"
stageLevelRequirement: 2
visualAsset: "grocery_store.jpg"
contentBlocks: ["block_grocery_finding", "block_grocery_asking", "block_grocery_checkout"]
interactiveHotspots: [
  {
    "coordinates": {"x": 100, "y": 150, "width": 100, "height": 100},
    "linkedSentenceId": "block_grocery_finding"
  },
  {
    "coordinates": {"x": 250, "y": 180, "width": 100, "height": 100},
    "linkedSentenceId": "block_grocery_asking"
  },
  {
    "coordinates": {"x": 400, "y": 200, "width": 100, "height": 100},
    "linkedSentenceId": "block_grocery_checkout"
  }
]
---

# 在超市购物

这个场景展示了在超市购物时的常见对话，包括寻找商品、询问价格和结账。

## 场景流程
1. 寻找商品 -> "Excuse me, where can I find the fresh vegetables?"
2. 询问商品 -> "How much are these apples? Are they organic?"
3. 结账付款 -> "I'd like to pay with my credit card, please. Do you need my ID?"

## 互动热点
- [100,150,100,100] -> block_grocery_finding # 店员
- [250,180,100,100] -> block_grocery_asking # 商品区
- [400,200,100,100] -> block_grocery_checkout # 收银台 