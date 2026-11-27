---
title: "前沿 AI 工程週報｜2026-11-27"
date: 2026-11-27 08:00:00
categories: AI
hidden: true
tags:
  - AI Engineering Weekly
---

本週最值得注意的是：前沿模型的兩種進步指標出現落差、兩家實驗室先後發布會重複執行部分層的 Transformer，以及新的 agent 評測結果。

{% post_link AI/ai-engineering-weekly-2026-11-27 '>> [English version] <<' %}

<!-- More -->

## 11/24｜METR：預訓練損失降得更快，外部評測沒有同步加速

METR 分析了 OpenAI 公開的 13 個基礎模型數據。固定使用取自 OpenAI 自家程式碼庫的測試集時，2026 年初以來的 log-perplexity（對數困惑度）下降速度，約是 2022 至 2025 年的 **7 倍**。但 Epoch 的 ECI 等外部評測，並未出現相近的加速。這是外部研究團隊對單一實驗室數據的分析，不代表模型能力也進步了七倍。[METR 分析](https://metr.org/blog/2026-11-24-interpreting-a-recent-acceleration-in-pretraining-loss/)

## 11/20–23｜模型架構：兩家實驗室發布 Looped Transformer

Thinking Machines Lab 發布開放權重的 **Inkling 2 Mini**，共 264 億個參數，每生成一個 token 會把中間層跑三遍，並另外提供可調整循環次數的研究版。Z.ai 的 **GLM-5.4** 則是自家首款採用這種架構的旗艦模型，已在 GLM Coding Plan 上線。兩者都靠重複使用同一組層來增加內部運算，不必為每一遍新增一組權重。這證明這種架構已出現在兩種不同的發布情境，不代表一定更快或更準；Z.ai 也指出 GLM-5.4 有時會推理太久。[Thinking Machines Lab](https://thinkingmachines.ai/news/inkling-2-mini/) · [Z.ai 公告](https://z.ai/blog/glm-5.4?lang=en) · [ZCode 更新紀錄](https://zcode.z.ai/en/changelog)

## 11/23｜Skills：完整達標率有提升，但多數任務仍未達成所有條件

SkillForgeBench v3 報告了 **842 個沙盒任務**的結果。Opus 4.8 有 Skill 時，**40.9%** 的任務符合全部輸出要求；沒有 Skill 時是 **21.7%**。有 Skill 時，逐項計分的平均分數是 **85.7%**。逐項拿高分，不等於同一項任務的所有條件都達標。數字來自評測作者，而任務本身就是圍繞 Skills 設計，不能把增幅直接套用到其他工作。[SkillForgeBench v3 表 2](https://arxiv.org/html/2610.14918v3#S4.SS1)

## 11/24｜Delegent：子 agent 降低費用，但程式任務耗時增加

作者在 50 題 DeepSWE 上比較兩種配置：全用 GPT-6.1 Sol，以及用指令引導 Sol 搭配 Qwen3.8-27B 子 agent。兩組都解出 **29／50 題**。前沿模型的 API 費用從每題 **US$2.11 降到 $0.70**（把子 agent 的預估 API 費用算進去是 $0.81），但中位耗時從 **25 分鐘增至 38 分鐘**。兩組原本就都有子 agent，這是兩種委派方式的比較，不是單 agent 對多 agent。[Delegent 預印本](https://arxiv.org/abs/2611.33098)

## 11/25｜Qwen4-Max：預覽定價結束

阿里雲停用 `qwen4-max-preview`。官方更新紀錄指出，舊的模型 ID 會自動轉到標準版，並按標準價格計費。國際區公開牌價為每百萬 token **輸入 US$1.50、輸出 US$4.50**。這是本月稍早推出的模型在存取與計費上的變動，不是本週新模型發布。[更新紀錄](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) · [模型與定價](https://www.alibabacloud.com/help/en/model-studio/qwen4-max)

**延伸閱讀：** [METR 的分析](https://metr.org/blog/2026-11-24-interpreting-a-recent-acceleration-in-pretraining-loss/) 說明，為什麼在單一資料集上更會預測下一個 token，不一定會讓外部評測分數同樣快速上升。
