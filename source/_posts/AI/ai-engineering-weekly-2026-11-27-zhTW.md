---
title: "前沿 AI 工程週報｜2026-11-27"
date: 2026-11-27 08:00:00
categories: AI
hidden: true
tags:
  - AI Engineering Weekly
---

要不要多加一個 agent？我會先讓單一 agent 按清楚的 SOP 工作，再用測試判斷結果對不對。接著才量多一個角色能不能省下人工審查時間。

{% post_link AI/ai-engineering-weekly-2026-11-27 '>> [English version] <<' %}

<!-- More -->

## 11/20｜模型：Inkling 2 Mini 開放權重

Inkling 2 Mini 是一個 26.4B MoE Transformer。它每生成一個 token，就把中間層跑三遍。Thinking Machines Lab 在 DeepSWE v1.1 報告 48.2%，但不同模型的評測設定不一。本地部署時，除了輸出 token 數，也要量總耗時與記憶體：少吐 token 不等於少做運算。[模型公告](https://thinkingmachines.ai/news/inkling-2-mini/)

## 11/23｜Skills：有 SOP，還是要驗收

SkillForgeBench v3 在 842 個沙盒任務上評估 agent。Opus 4.8 的嚴格完成率有 Skill 時是 40.9%，沒有時是 21.7%。這是特定任務與評分規則下的結果。可以把流程寫進 Skill；不能違反的規則，還是要靠權限或測試來守。[論文表 2](https://arxiv.org/html/2610.14918v3#S4.SS1)

## 11/24｜編排：換便宜 worker 未必省時間

Delegent 預印本比較同一組 50 道 DeepSWE 題。基線本來就有 Sol subagents，解了 29 題。仍用 Sol、只改委派指令，解了 34 題，前沿模型 API 成本為基線的 60%。保留委派指令但改用 Qwen 27B 助手，解了 29 題；含助手估價，每題從 US$2.11 降到約 US$0.81，但中位耗時從 25 分鐘增為 38 分鐘。這不是單 agent 對多 agent 的比較，總數相同也不代表解的是同一些題。[結果](https://arxiv.org/html/2611.33098v1#S4) · [委派指令實驗](https://arxiv.org/html/2611.33098v1#S5)

## 11/25｜Harness：在不同條件下重跑同一個 eval

Together AI 開源 Hurdle，可以讓 Codex 或 Claude Code 在不同條件下重跑任務並檢查產出。本機模式不能攔 API 請求；代管沙盒可以攔截，但要明確設定規則，不是預設全擋。第一次做 Skill A/B，用假資料和可驗證的輸出就夠了，不必接正式系統。[工具公告](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs)

## 11/23｜FigJam：能改圖，還是要審合併

Figma 內建 agent 正式開放給 FigJam 與 Figma Slides 的付費方案。公告沒有證明它能偵測多人修改衝突或安全合併。同一張圖有多人維護時，我還是會保留副本、差異審查和核准合併。[Figma 更新紀錄](https://www.figma.com/release-notes/)

**20 分鐘試驗：** 做一張有兩個同名 `Review` 節點、連線互相交叉的測試白板。從兩份相同起始副本各跑一次，唯一差別是其中一次有「先列節點 ID，只提議修改指定區塊」的 Skill。核對連線接在哪兩個節點、箭頭是否朝對，也記下越界修改和人工審查時間。先拿這一組當初步測試，不用把一次成功當成可靠性證明。
