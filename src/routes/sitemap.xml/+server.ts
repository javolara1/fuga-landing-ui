import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = async ({ url }) => {
	const siteUrl = env.PUBLIC_SITE_URL || url.origin;

	// Define all pages - expand this as routes are added
	const pages = [{ path: '/', changefreq: 'weekly', priority: 1.0 }];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}${page.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en${page.path}" />
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
