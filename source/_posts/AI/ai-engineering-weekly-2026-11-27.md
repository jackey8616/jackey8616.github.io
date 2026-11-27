---
title: "Frontier AI Engineering Weekly | 2026-11-27"
date: 2026-11-27 08:00:00
categories: AI
tags:
  - AI Engineering Weekly
---

This week’s biggest developments were a gap between two measures of frontier progress, two releases that reuse Transformer layers at inference time, and new evidence on how agents are evaluated.

{% post_link AI/ai-engineering-weekly-2026-11-27-zhTW '>> [zhTW version] <<' %}

<!-- More -->

## Nov 24 | METR: pretraining loss fell faster, but benchmark scores did not keep pace

METR analyzed OpenAI’s published base-model data for 13 models. On a fixed evaluation set drawn from OpenAI’s codebase, log-perplexity fell about **seven times as fast** from early 2026 as it did in 2022–2025. METR did not see a comparable acceleration in external benchmark scores, such as Epoch’s ECI. This is an external analysis of one lab’s data, not evidence that models became seven times more capable. [METR analysis](https://metr.org/blog/2026-11-24-interpreting-a-recent-acceleration-in-pretraining-loss/)

## Nov 20–23 | Model architecture: two labs release looped Transformers

Thinking Machines Lab released **Inkling 2 Mini**, an open-weight 26.4B model that runs its middle layers three times per generated token, plus a research checkpoint that lets users vary the loop count. Z.ai introduced **GLM-5.4**, its first flagship built on a looped Transformer, and made it available on the GLM Coding Plan. Both reuse layers to do more internal computation without adding a separate set of weights for each pass. Their releases establish the approach is available in two different settings, not that it is universally faster or more accurate. Z.ai reports that GLM-5.4 can spend too long reasoning. [Thinking Machines Lab](https://thinkingmachines.ai/news/inkling-2-mini/) · [Z.ai announcement](https://z.ai/blog/glm-5.4?lang=en) · [ZCode release notes](https://zcode.z.ai/en/changelog)

## Nov 23 | Skills: higher completion, but most tasks still miss at least one requirement

SkillForgeBench v3 reports results on **842 sandboxed tasks**. With a Skill available, Opus 4.8 met every output requirement on **40.9%** of tasks, versus **21.7%** without it. In the with-Skill run, the average score on individual output criteria was **85.7%**. These are different measures: doing well on individual criteria is not the same as meeting all of them in one task. The numbers come from the benchmark authors and the benchmark is built around Skills, so they do not establish the same gain for other workloads. [SkillForgeBench v3, Table 2](https://arxiv.org/html/2610.14918v3#S4.SS1)

## Nov 24 | Delegent: cheaper subagents, longer coding runs

In the authors’ 50-task DeepSWE experiment, the all-GPT-6.1 Sol setup and a steered setup with a Qwen3.8-27B helper both solved **29 of 50** tasks. The frontier-model charge fell from **US$2.11 to $0.70 per task** ($0.81 including the estimated helper API charge), while median runtime rose from **25 to 38 minutes**. Both setups already used subagents. The result compares two ways of delegating work, not a single agent against a team. [Delegent preprint](https://arxiv.org/abs/2611.33098)

## Nov 25 | Qwen4-Max: preview pricing ends

Alibaba Cloud retired `qwen4-max-preview`; its release notes say the old ID now routes to the standard model and is billed at the standard rate. The published international standard rate is **US$1.50 input / $4.50 output per million tokens**. This is an availability and billing update for a model introduced earlier in November, not a new model launch this week. [Release notes](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) · [Model and pricing](https://www.alibabacloud.com/help/en/model-studio/qwen4-max)

## Also worth a look

- **Nov 23 · Qwen-Audio-3.1-Live.** Alibaba Cloud released a full-duplex voice model that can keep talking with the user while an application or background model processes a task. [API documentation](https://www.alibabacloud.com/help/en/model-studio/qwen-audio-3-1-live)
- **Nov 24 · ERNIE 5.5 Flash Preview.** Baidu released an intermediate post-training checkpoint with a one-million-token context window and Apache 2.0 weights; that license applies to the preview weights, not to the earlier base checkpoint. [Model card](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)
- **Nov 25 · Hurdle.** Together AI open-sourced a tool for evaluating agents against APIs, Skills, and docs; hosted runs support explicitly configured request guards, while local runs cannot intercept API traffic. [Release announcement](https://www.together.ai/blog/introducing-hurdle-run-agent-evals-on-your-api-skills-and-docs)

**Further reading:** [METR’s analysis](https://metr.org/blog/2026-11-24-interpreting-a-recent-acceleration-in-pretraining-loss/) lays out why better next-token prediction on one dataset might not translate into equally fast gains on external benchmarks.
