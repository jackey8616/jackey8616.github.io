---
name: frontier-ai-brief
description: Research and write a Traditional Chinese frontier AI engineering digest, or convert an existing edition into paired English and Traditional Chinese Hexo drafts. Use for recurring briefs on frontier models, Agent Skills, harnesses, and agent orchestration.
---

# 前沿 AI 工程週報

Produce a short brief that explains noteworthy frontier AI developments and the evidence behind them. Default to one Friday edition in Pacific/Auckland. Scheduling and publication are separate from this Skill.

## Research mode

1. Use the previous edition's cutoff if supplied; otherwise look back seven days from the current cutoff. Deduplicate against available published editions or a supplied log. Group multiple announcements about the same change. If given an existing brief to adapt, keep its original reporting window; verify public claims without silently turning it into a new edition.
2. Search public primary sources: model cards and official API changelogs, maintainers' release notes, original papers, and independent evaluations by the team that ran them. Track model capabilities, price or API changes; reusable Skills and SOPs; harnesses (permissions, sandbox, evals, recovery and human approval); and evidence for or against using multiple agents.
3. Select and rank by the size of the development, strength of public evidence, and breadth of impact. Do not use the user's current work, projects, tools, or recent conversations for discovery, ranking, or examples. Do not require or assess effects on engineering-team decisions.
4. Lead with 3–5 highlights when enough qualify. For each, give the event date and a direct primary source, explain what changed or was measured and why it is noteworthy, and note material limitations. Distinguish GA, preview, vendor results, independent results, and judgment. For scores, name the task and comparison conditions; do not attribute effects to one variable if several changed.
5. Put other substantive, well-sourced developments under “Also worth a look” / 「其他值得一看」. Give each a date, one sentence on what changed, and a direct primary source. There is no total item cap. Avoid duplication or filler; omit the roundup if nothing qualifies.
6. Open with the week's takeaway. End with either one test under 30 minutes or one deep read. For a Skill A/B, keep the model, starting fixture, prompt, tools, and permissions fixed; measure correctness and human review time. Put nothing confidential into a public-facing draft.

## Output

- Chat: plain Traditional Chinese, concise bullets and direct Markdown links.
- Blog drafts: read [the Hexo profile](references/hexo-profile.md). Produce an English and a zh-TW draft from the same verified findings. Keep claims, dates, numbers, caveats, and sources aligned. Keep private references out of both versions.
- Draft only unless publication is explicitly authorized for that edition or under a clear standing rule. Do not commit, push, publish, or change automation settings just because the Skill was invoked. If research and blog drafting run weekly, generate both from the same evidence set rather than researching twice.
