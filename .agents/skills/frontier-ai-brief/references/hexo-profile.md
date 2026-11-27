# Hexo profile for clo5de.info

Keep the existing `AI` category to retain discoverability there. Use the single stable series tag `AI Engineering Weekly` on every edition; use existing topic tags only when they help readers find a post. Do not file these editions into the math/Transformer series.

Create one dated Markdown file per issue, named `ai-engineering-weekly-YYYY-MM-DD.md`, using the New Zealand issue date. Store in `source/_drafts/` if the checkout is available, or deliver the Markdown without editing the blog. Check the slug and title against existing issues before overwriting anything. Never set `published: true` for a draft.

```yaml
---
title: "前沿 AI 工程週報｜YYYY-MM-DD"
date: YYYY-MM-DD HH:mm:ss
categories:
  - AI
tags:
  - AI Engineering Weekly
---
```

Use a short lead, then `<!-- more -->`, followed by the dated items with near-claim links. Keep the issue useful to a public reader without private team examples, user-room links, app credentials, or private repositories. For a local Hexo preview, use the blog project's own tooling and confirm that its normal production build does not include drafts.
