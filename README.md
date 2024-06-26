# Portfolio Website (WIP)

My personal portfolio website. Check it out!

[![Site Preview](public/site-preview.jpeg)](https://gavinyan.me)

Note that the site is still under development. Extra improvements are still being worked on.

## Technologies

- Astro
- React
- Tailwind
- Contentful (CMS)

## APIs

The site uses the following APIs

- [JokeAPI](https://v2.jokeapi.dev/)
- [GitHub Contributions](https://github.com/grubersjoe/github-contributions-api)
- GitHub's official HTTP API for profile information

## How It All Works

The site is built with Astro, a JavaScript framework known for shipping 0 Javascript unless otherwise specified. This improves performance and SEO, while allowing interactive "islands" that can be built with other JavaScript frameworks such as React.

Content is updated through Contentful, a headless CMS. Astro statically builds the site once content updates, this is done via Contentful's webhooks. This allows the site to be completely static, making it faster than SPAs and even SSR.
