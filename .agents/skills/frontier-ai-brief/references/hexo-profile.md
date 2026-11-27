# Hexo profile for clo5de.info

Keep the existing `AI` category and use `AI Engineering Weekly` on both versions. The English post is the listed edition; give the zh-TW companion `hidden: true`, matching the blog’s existing AI article pairs. Readers reach the companion through the language switch rather than seeing duplicate entries.

For each issue date in Pacific/Auckland, create two files under `source/_drafts/AI/`, or deliver the Markdown pair if no checkout is available:

- `ai-engineering-weekly-YYYY-MM-DD.md`: English.
- `ai-engineering-weekly-YYYY-MM-DD-zhTW.md`: Traditional Chinese (Taiwan).

Use the same issue date, category, and tags in both front-matter blocks. Use language-specific titles and give only the companion `hidden: true`. Do not set `published: true` or move drafts into `source/_posts/AI/` without authorization. Before overwriting, check both draft and post paths.

After a short lead and before `<!-- More -->`, use Hexo’s `post_link` tags to switch languages. Substitute the issue date in both directions:

```text
{% post_link AI/ai-engineering-weekly-YYYY-MM-DD-zhTW '>> [zhTW version] <<' %}
{% post_link AI/ai-engineering-weekly-YYYY-MM-DD '>> [English version] <<' %}
```

Keep claims, dates, caveats, and source URLs aligned across versions. Write natural prose in each language instead of translating word for word. Use near-claim links and leave out private chat links, internal repositories, and credentials.

Preview both versions together and verify the language links resolve to the companion pages. Confirm that normal production generation excludes both while they remain drafts.
