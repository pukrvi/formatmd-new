import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

/** Per-page SEO head — overrides default index.html meta tags via react-helmet-async */
const SEOHead = ({
  title = 'FormatMD — Markdown Formatter & Styler',
  description = 'FormatMD transforms your markdown into beautifully styled, copy-ready output. Paste, format, and export in .md, .pdf, .html, .txt.',
  path = '/',
}: SEOHeadProps) => {
  const url = `https://formatmd.app${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOHead;
