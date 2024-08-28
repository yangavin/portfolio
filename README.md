# Portfolio Website

My personal portfolio website, showcasing my projects and the technologies I use.

## Technologies

- Astro
- React
- Tailwind
- Contentful
- Vercel

## APIs

- [JokeAPI](https://v2.jokeapi.dev/)
- [GitHub Contributions](https://github.com/grubersjoe/github-contributions-api)
- GitHub's official HTTP API for profile information

## How It All Works

The site is built with Astro, a JavaScript framework known for shipping 0 Javascript unless otherwise specified. This improves performance and SEO, while allowing interactive "islands" that can be built with other JavaScript frameworks such as React.

Content is updated through Contentful, a headless CMS. Vercel automatically builds/deploy the site statically using Astro once content updates, this is done via Contentful's webhooks. This allows the site to be completely static, making it faster than SPAs and even SSR.
