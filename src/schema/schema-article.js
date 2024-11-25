/**
 * Article schema generator
 */
const ArticleSchema = {
    /**
     * Cleans URLs: removes query parameters and hash from URL
     */
    cleanUrl(url) {
        try {
            return new URL(url).toString()
                .split('?')[0]  // Remove query parameters
                .split('#')[0]; // Remove hash
        } catch (e) {
            return url;
        }
    },

    /**
     * Injects a JSON-LD schema script into the document <head>
     */
    inject(schemaContent) {
        const schemaId = 'article-schema';
        if (document.getElementById(schemaId)) return;

        const script = document.createElement('script');
        script.id = schemaId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            ...schemaContent,
        });

        document.head.appendChild(script);
    },

    /**
     * Generates and injects Article schema script into page
     */
    generate() {
        const article = {
            '@type': 'Article',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': window.location.href
            },
            headline: document.querySelector('[cc-schema-article-id="headline"]')?.textContent.trim(),
            description: document.querySelector('[cc-schema-article-id="description"]')?.textContent.trim(),
            image: document.querySelector('[cc-schema-article-id="image"]')?.textContent.trim().split(','),
            datePublished: document.querySelector('[cc-schema-article-id="datePublished"]')?.textContent.trim(),
            dateModified: document.querySelector('[cc-schema-article-id="dateModified"]')?.textContent.trim(),
            author: {
                '@type': 'Person',
                name: document.querySelector('[cc-schema-article-id="author-name"]')?.textContent.trim(),
            },
            publisher: {
                '@type': 'Organization',
                name: 'Cutover',
                logo: 'https://cdn.prod.website-files.com/628d04e7099dc5d9a4d46fa9/64b946b928877217cf76b511_Logo-Block-Page.svg',
                url: 'https://www.cutover.com/',
                sameAs: [
                    'https://www.linkedin.com/company/cutover/',
                    'https://x.com/gocutover',
                    'https://www.youtube.com/channel/UCOMTrz03fnphsMKAn29wFkA'
                ]
            }
        };

        this.inject(article);
    },

    /**
     * Initialize the article schema generation
     */
    init() {
        document.readyState === 'loading'
            ? document.addEventListener('DOMContentLoaded', () => this.generate())
            : this.generate();
    }
};

ArticleSchema.init();
