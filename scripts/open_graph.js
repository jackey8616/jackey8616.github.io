// Per-post overrides for the open_graph helper, set in front matter:
//   og_image       - preview image. The built-in helper only scrapes `<img src=` from
//                    content, which misses pandoc's `<img\nsrc=` output, and SVGs aren't
//                    accepted by social previews anyway.
//   og_description - preview text. The auto excerpt picks up the `>> [zhTW version] <<`
//                    link, and front matter `description` would also change NexT's layout.
//   og_locale      - e.g. zh_TW. Setting `lang` instead would switch the whole page's UI.
const openGraph = hexo.extend.helper.get('open_graph');

hexo.extend.helper.register('open_graph', function (options = {}) {
    const page = this.page || {};
    const overrides = {};
    if (page.og_image && !options.image && !options.images) overrides.image = page.og_image;
    if (page.og_description && !options.description) overrides.description = page.og_description;
    if (page.og_locale && !options.language) overrides.language = page.og_locale;
    return openGraph.call(this, Object.assign({}, options, overrides));
});
