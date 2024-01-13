# Portfolio Website (WIP)

My personal portfolio website, currently a work-in-progress. [Checkout the design here!](https://www.figma.com/proto/F1HFgTPDHOeDk91wCMnlGv/Personal-Website?type=design&node-id=2-2&t=gxkCVz54pbzRWUN1-0&scaling=scale-down&page-id=0:1)

## Technologies

- Astro
- React
- Tailwind
- Contentful (CMS)

## How It All Works

The site is built with Astro, a JavaScript framework known for shipping 0 Javascript unless otherwise specified. This improves performance and SEO, while allowing interactive "islands" that can be built with other JavaScript frameworks such as React.

Content is updated through Contentful, a headless CMS. Astro statically builds the site once content updates, this is done via Contentful's webhooks. This allows the site to be completely static, making it faster than SPAs and even SSR.
