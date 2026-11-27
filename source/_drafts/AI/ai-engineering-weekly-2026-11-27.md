---
title: "Frontier AI Engineering Weekly | 2026-11-27"
date: 2026-11-27 08:00:00
categories: AI
tags:
  - AI Engineering Weekly
---

Should I add another agent? I’d start with one agent, a clear procedure, and tests that tell me whether the output is right. Then I’d measure whether a second role actually saves review time.

{% post_link AI/ai-engineering-weekly-2026-11-27-zhTW '>> [zhTW version] <<' %}

<!-- More -->

## Nov 20 | Models: Inkling 2 Mini releases open weights

Inkling 2 Mini is a 26.4B mixture-of-experts Transformer that runs its middle layers three times per generated token. Thinking Machines Lab reports 48.2% on DeepSWE v1.1, but the evaluation setups differ across models. For local deployment, measure wall time and memory alongside output tokens: fewer tokens don’t necessarily mean less computation. [Model announcement](https://thinkingmachines.ai/news/inkling-2-mini/)

## Nov 23 | Skills: a procedure still needs an acceptance test

SkillForgeBench v3 evaluates agents on 842 sandboxed tasks. For Opus 4.8, strict completion rose from 21.7% without a Skill to 40.9% with one. That result is specific to the tasks and rubric. Put the procedure in the Skill; enforce rules that cannot be broken with permissions or tests. [Paper, Table 2](https://arxiv.org/html/2610.14918v3#S4.SS1)

## Nov 24 | Orchestration: cheaper workers can take longer

On the same 50 DeepSWE tasks, the Delegent preprint’s all-Sol baseline solved 29 with subagents already enabled. Changing only the delegation instructions brought that to 34, at 60% of the baseline frontier API cost. With those instructions and Qwen 27B workers, it solved 29. Estimated cost, including the workers, fell from US$2.11 to US$0.81 per task, while median time rose from 25 to 38 minutes. This does not compare single-agent and multi-agent setups; equal totals don’t establish that they solved the same tasks. [Results](https://arxiv.org/html/2611.33098v1#S4) · [Instruction comparison](https://arxiv.org/html/2611.33098v1#S5)

## Nov 25 | Harnesses: repeat the same agent eval under different conditions

Together AI open-sourced Hurdle, which can rerun Codex or Claude Code under different conditions and check what they produce. Its local mode cannot intercept API calls. The hosted sandbox can enforce explicit request guards, but doesn’t block everything by default. A first Skill A/B test can use synthetic data and artifact checks without touching a production system. [Tool announcement](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs)

## Nov 23 | FigJam: editing a board is easier than merging safely

Figma’s built-in agent is generally available in FigJam and Figma Slides on paid plans. The announcement does not establish that it detects conflicting changes or merges them safely. For a shared board, I’d still edit a copy, review the diff, and approve changes before merging. [Figma release notes](https://www.figma.com/release-notes/)

**20-minute experiment:** Build a synthetic board with two nodes named `Review` and crossing connectors. Give the same agent the same task on two identical starting copies. The only difference is a Skill that says to list node IDs first and propose changes only in the specified section. Check attachment IDs and arrowhead direction, then record out-of-scope edits and human review time. Treat a single pair as a smoke test, not proof of reliability.
