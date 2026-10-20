# Centex Insurance Solutions SEO setup

## Website implementation

Each public page has a title, description, canonical URL, and social-sharing image. Coverage pages include Service and BreadcrumbList structured data. The homepage includes InsuranceAgency structured data using the agency's displayed name, address, phone, service area, logo, and supplied social profiles. No ratings, business hours, or credentials have been invented.

Journal and team structured data remain in place. `/sitemap.xml` includes current coverage, journal, and team routes; `/robots.txt` links to it. Vercel preview builds receive a noindex meta directive. Canonicals use `SITE_URL`, currently defaulting to `https://centex-website-omce.vercel.app`.

Validation: run `npm test`, `npm run build`, start a production preview, then run `npm run check:seo -- http://127.0.0.1:3003 https://centex-website-omce.vercel.app`. To check production, use the production origin for both arguments. This checks rendered titles, descriptions, canonicals, social URLs/images, structured-data JSON, sitemap entries, quote query variants, and indexing directives.

## Access your boss can grant

Use an email address associated with your own Google account.

- Search Console: an owner opens the correct property, selects Settings → Users and permissions → Add user, enters your account email, and grants Full access. This supports sitemap submission and URL inspection; your boss retains ownership.
- Google Business Profile: an owner opens the profile, selects More → Business Profile settings → People and access → Add, enters your account email, chooses Manager, and sends the invitation. Accept it from your account.

If neither property exists or the boss is not an owner, establish ownership with the current owner or Google's verification process first. No Google property has been verified or invitation sent by this code change.

Official instructions: [Search Console access](https://support.google.com/webmasters/answer/7687615), [Business Profile access](https://support.google.com/business/answer/3403100).

## Domain and Search Console activation

1. Confirm the permanent hostname. Do not switch canonicals to `www.centexis.com` while it still serves the former website.
2. For the custom domain, the domain owner can verify a Search Console Domain property with the DNS record Google supplies. Add only the specified verification record; retain mail and other existing records.
3. Alternatively, use a URL-prefix property for the exact live HTTPS origin. For HTML-tag verification, set Vercel's production `GOOGLE_SITE_VERIFICATION` to the value inside Google's `content` attribute and redeploy. Confirm the tag is present before clicking Verify. This public token is not a Google password.
4. Once verified, submit the live `/sitemap.xml` in Search Console's Sitemaps section. Inspect the homepage and key coverage URLs and request indexing where appropriate.
5. Monitor Page indexing and Performance reports for discovery, impressions, clicks, and indexing issues.

For a custom-domain launch, first connect and test the domain in Vercel. Coordinate DNS with the owner, inventory old URLs, map them to relevant replacement pages, and implement permanent redirects. Change production `SITE_URL` to the final HTTPS origin and redeploy, then check redirects, canonicals, sitemap, HTTPS, and both old and new Search Console properties. DNS migration and redirects are not performed by this SEO update.

Official references: [ownership verification](https://support.google.com/webmasters/answer/9008080), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [site migrations](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Local search and ongoing content

With Business Profile access, confirm the real business name, address, phone, category, hours, and website link. Add authorized office/team photos and keep details current. Request honest feedback from customers without incentives or review gating. These account changes remain pending.

Continue original, source-linked weekly journal articles and keep service pages useful to actual Texas customers. Add approved staff biographies and real headshots as provided. Review Search Console performance before deciding which pages need deeper content. Technical readiness does not guarantee indexing or rankings.

References: [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [local ranking guidance](https://support.google.com/business/answer/7091).
