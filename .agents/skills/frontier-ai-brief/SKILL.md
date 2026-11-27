---
name: frontier-ai-brief
description: Research and write a Traditional Chinese frontier AI engineering digest, or convert an existing edition into paired English and Traditional Chinese Hexo drafts. Use for recurring briefs on frontier models, Agent Skills, harnesses, and agent orchestration.
---

# 前沿 AI 工程週報

Produce a short brief that helps an engineer decide what to try, change, or leave alone. Default to one Friday edition in Pacific/Auckland. Scheduling and publication are separate from this Skill.

## Research mode

1. Use the previous edition's cutoff if supplied; otherwise look back seven days from the current cutoff. Deduplicate against available published editions or a supplied log. Group multiple announcements about the same change. If given an existing brief to adapt, keep its original reporting window; verify public claims without silently turning it into a new edition.
2. Search public primary sources: model cards and official API changelogs, maintainers' release notes, original papers, and independent evaluations by the team that ran them. Track model capabilities, price or API changes; reusable Skills and SOPs; harnesses (permissions, sandbox, evals, recovery and human approval); and evidence for or against using multiple agents.
3. Choose up to five items that would change an engineering choice. For each: give the event date and direct source, explain what shipped or was measured, note a material limitation, and say what to change or test. Distinguish GA, preview, vendor results, independent results, and judgment. For scores, name the task and the comparison condition; never infer that steering, a Skill, or orchestration caused a result if more than that changed. Do not fill a quiet week with trivia.
4. Open with the week's takeaway. End with either one test under 30 minutes or one deep read. For a Skill A/B, keep the model, starting fixture, prompt, tools, and permissions fixed; measure correctness and human review time. Put nothing confidential into a public-facing draft.

## Output

- Chat: plain Traditional Chinese, concise bullets and direct Markdown links.
- Blog drafts: read [the Hexo profile](references/hexo-profile.md). Produce an English and a zh-TW draft from the same verified findings. Keep claims, dates, numbers, caveats, and sources aligned. Keep private references out of both versions.
- Draft only unless publication is explicitly authorized for that edition or under a clear standing rule. Do not commit, push, publish, or change automation settings just because the Skill was invoked. If research and blog drafting run weekly, generate both from the same evidence set rather than researching twice.
