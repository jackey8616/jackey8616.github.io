hexo.extend.filter.register('after_render:html', function (htmlContent) {
    const script = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGLBLXHD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    `;

    const bodyStartRegex = /(<body[^>]*>)/i;

    if (bodyStartRegex.test(htmlContent)) {
        const modifiedHtml = htmlContent.replace(bodyStartRegex, '$1' + script);
        return modifiedHtml;
    }
    return htmlContent;
});