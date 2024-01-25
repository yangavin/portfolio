/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, i as renderSlot, h as addAttribute, j as renderComponent, k as renderHead } from '../astro_KplOkpiP.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import 'clsx';
import contentful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { INLINES } from '@contentful/rich-text-types';

function JokeQuestion({
  children,
  setDone
}) {
  const [index, setIndex] = useState(0);
  const displayedQuestion = children.slice(0, index);
  useEffect(() => {
    if (index < children.length) {
      const timeout = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
    setDone();
  }, [index]);
  return /* @__PURE__ */ jsxs("h1", { className: "w-3/4 text-center text-2xl md:text-3xl lg:text-7xl lg:leading-snug", children: [
    /* @__PURE__ */ jsx("span", { children: displayedQuestion }),
    /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: index < children.length && "|" })
  ] });
}

function JokePunchline({
  children,
  showCursor,
  setDone
}) {
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const displayedPunchline = children.slice(0, index);
  useEffect(() => {
    if (showCursor) {
      const startTimer = setTimeout(() => setStart(true), 3e3);
      return () => clearTimeout(startTimer);
    }
  }, [showCursor]);
  useEffect(() => {
    if (start && index < children.length) {
      const nextCharTimer = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(nextCharTimer);
    }
    if (start)
      setDone();
  }, [start, index]);
  return /* @__PURE__ */ jsx("h2", { className: "text-center md:text-2xl lg:text-3xl", children: showCursor && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { children: displayedPunchline }),
    /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: "|" })
  ] }) });
}

function JokeOverlay() {
  const [question, setQuestion] = useState("");
  const [punchline, setPunchline] = useState("");
  const [questionDone, setQuestionDone] = useState(false);
  const [jokeDone, setJokeDone] = useState(false);
  const overlay = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchTimeout = setTimeout(() => controller.abort(), 3e3);
    fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit&type=twopart",
      {
        signal: controller.signal
      }
    ).then((res) => res.json()).then((jokeData) => {
      setQuestion(jokeData.setup);
      setPunchline(jokeData.delivery);
    }).catch((err) => {
      setQuestion("Why couldn't web developers find their room in a hotel?");
      setPunchline("Because their room number is 404");
      console.error(err);
    });
    return () => clearTimeout(fetchTimeout);
  }, []);
  useEffect(() => {
    if (jokeDone) {
      const fadeoutTimer = setTimeout(() => {
        overlay.current?.classList.add("animate-slide-out");
        const body = document.querySelector("body");
        body.style.overflowY = "auto";
      }, 2e3);
      return () => clearTimeout(fadeoutTimer);
    }
  }, [jokeDone]);
  if (question && punchline) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: overlay,
        className: "fixed z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 lg:gap-20",
        children: [
          /* @__PURE__ */ jsx(JokeQuestion, { setDone: () => setQuestionDone(true), children: question }, question),
          /* @__PURE__ */ jsx("hr", { className: "w-9/12 border-black" }),
          /* @__PURE__ */ jsx(
            JokePunchline,
            {
              showCursor: questionDone,
              setDone: () => setJokeDone(true),
              children: punchline
            },
            punchline
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: overlay,
      className: "fixed z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 lg:gap-20",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "w-3/4 text-center text-2xl md:text-3xl lg:text-7xl lg:leading-snug", children: /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: "|" }) }),
        /* @__PURE__ */ jsx("hr", { className: "w-9/12 border-black" })
      ]
    }
  );
}

const $$Astro$6 = createAstro();
const $$Title = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Title;
  return renderTemplate`${maybeRenderHead()}<div class="font-quicksand mb-12 pl-3 md:pl-5 lg:mb-28 lg:pl-10"> <div class="pb-4"> <h2 class="text-lg font-thin md:text-4xl lg:text-6xl">CS Student</h2> <h2 class="text-lg font-thin md:text-4xl lg:text-6xl">
Queen's University
</h2> </div> <h1 class="text-5xl font-light md:text-9xl lg:text-[13rem]">Gavin Yan</h1> </div>`;
}, "/Users/gavin/Code/repos/portfolio/src/sections/title.astro", void 0);

const contentfulClient = contentful.createClient({
  space: "s5jztgojuf6s",
  accessToken: "aIr0rGSnPL3d8TeirKy8q2oYoMKJKMzwiSZc1-WcQIg",
  host: "cdn.contentful.com"
});

const $$Astro$5 = createAstro();
const $$AboutMe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$AboutMe;
  const content = await contentfulClient.getEntry(
    "5AiBzb1VpHv56DVdAJBhCH"
  );
  return renderTemplate`${maybeRenderHead()}<div class="relative px-8"> <img src="yellow-cylinder.svg" class="absolute left-0 top-1/3 -z-10"> <img src="red-ellipse.svg" class="absolute right-0 top-2/3 -z-10"> <h1 class="mb-10 text-3xl md:mb-36 md:pl-10 md:text-9xl">About Me</h1> <div class="relative m-auto flex max-w-[55ch] flex-col gap-[3ch] text-xs md:text-2xl">${unescapeHTML(documentToHtmlString(content.fields.content))}</div> </div>`;
}, "/Users/gavin/Code/repos/portfolio/src/sections/about-me.astro", void 0);

async function getTechCardsByTags(tags) {
  return (await contentfulClient.getEntries({
    content_type: "techCard",
    "metadata.tags.sys.id[all]": tags,
    order: ["sys.createdAt"]
  })).items.map((techCard) => {
    return {
      ...techCard.fields,
      logo: `https:${techCard.fields.logo.fields.file.url}`
    };
  });
}

const $$Astro$4 = createAstro();
const $$Category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Category;
  const { skills, small } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> <h2 class="mb-3 text-center text-2xl md:mb-10 md:text-6xl">${renderSlot($$result, $$slots["default"])}</h2> <div class="m-auto flex w-11/12 flex-wrap justify-center gap-x-5 gap-y-3 md:gap-x-7 md:gap-y-6"> ${skills.map(({ logo, title, url }) => {
    return renderTemplate`<a${addAttribute(url, "href")} class="flex w-fit grow flex-col items-center gap-2 md:gap-6" target="_blank"> <img${addAttribute(logo, "src")}${addAttribute(title, "alt")}${addAttribute(small ? "w-5 md:w-20" : "w-6 md:w-28", "class")}> <span${addAttribute(
      small ? "text-[6px] md:text-2xl" : "text-[8px] md:text-4xl",
      "class"
    )}> ${title} </span> </a>`;
  })} </div> </div>`;
}, "/Users/gavin/Code/repos/portfolio/src/sections/skills/category.astro", void 0);

const $$Astro$3 = createAstro();
const $$Skills = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Skills;
  const languages = await getTechCardsByTags(["language"]);
  const technologies = await getTechCardsByTags(["technology"]);
  const devTools = await getTechCardsByTags(["devTool"]);
  return renderTemplate`${maybeRenderHead()}<div> <h1 class="text-center text-4xl md:text-9xl">Skills</h1> <hr class="m-auto mb-5 w-1/2 border-neutral-600 bg-black md:mb-14 md:border-2"> <div class="flex flex-col gap-3 md:gap-20"> ${renderComponent($$result, "Category", $$Category, { "skills": languages }, { "default": ($$result2) => renderTemplate`Languages` })} ${renderComponent($$result, "Category", $$Category, { "skills": technologies }, { "default": ($$result2) => renderTemplate`Technologies` })} ${renderComponent($$result, "Category", $$Category, { "skills": devTools, "small": true }, { "default": ($$result2) => renderTemplate`Dev Tools` })} </div> </div>`;
}, "/Users/gavin/Code/repos/portfolio/src/sections/skills/skills.astro", void 0);

const aTagRenderingOption = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => `<a class="text-blue-500 underline" target="_blank" href=${node.data.uri}>${next(node.content)}</a>`
  }
};
async function getProjectCards() {
  const rawProjects = await contentfulClient.getEntries({
    content_type: "projectCard",
    order: ["sys.createdAt"]
  });
  return rawProjects.items.map((projectCard) => {
    return {
      ...projectCard.fields,
      logo: `https:${projectCard.fields.logo.fields.file.url}`,
      techUsed: projectCard.fields.techUsed.map((techCard) => {
        return {
          ...techCard.fields,
          logo: `https:${techCard.fields.logo.fields.file.url}`
        };
      }),
      description: documentToHtmlString(
        projectCard.fields.description,
        aTagRenderingOption
      )
    };
  });
}

const $$Astro$2 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const {
    project: { logo, techUsed, title, projectUrl, description, repoUrl, color },
    mobile
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`container px-8 pb-4 pt-8 ${color}`, "class")} data-astro-cid-fk4f3eed> <h1 class="text-3xl" data-astro-cid-fk4f3eed>${title}</h1> <div class="flex justify-end" data-astro-cid-fk4f3eed> <a${addAttribute(projectUrl, "href")}${addAttribute(`Launch ${title}`, "title")} target="_blank" data-astro-cid-fk4f3eed> <img src="goto.svg" alt="Go-to-link image" srcset="" data-astro-cid-fk4f3eed> </a> </div> <div class="flex items-center text-lg" data-astro-cid-fk4f3eed> <div data-astro-cid-fk4f3eed>${unescapeHTML(description)}</div> </div> <div class="flex items-center" data-astro-cid-fk4f3eed> <img${addAttribute(logo, "src")} alt="Project logo" srcset="" class="w-full" data-astro-cid-fk4f3eed> </div> <div data-astro-cid-fk4f3eed> <h2 class="mb-2" data-astro-cid-fk4f3eed>Built with:</h2> <div class="flex gap-5" data-astro-cid-fk4f3eed> ${techUsed.map((tech) => renderTemplate`<a${addAttribute(tech.url, "href")}${addAttribute(tech.title, "title")} class="w-12" target="_blank" data-astro-cid-fk4f3eed> <img${addAttribute(tech.logo, "src")}${addAttribute(tech.title, "alt")} srcset="" data-astro-cid-fk4f3eed> </a>`)} </div> </div> <div class="flex items-end justify-end" data-astro-cid-fk4f3eed> <a${addAttribute(repoUrl, "href")}${addAttribute(`${title} repository`, "title")} target="_blank" data-astro-cid-fk4f3eed> <img src="github.svg" alt="GitHub Logo" srcset="" data-astro-cid-fk4f3eed> </a> </div> </div>  ${mobile && renderTemplate`<style>.container{}</style>`}`;
}, "/Users/gavin/Code/repos/portfolio/src/sections/projects/project-card.astro", void 0);

const $$Astro$1 = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Projects;
  const projects = await getProjectCards();
  return renderTemplate`${maybeRenderHead()}<div class="desktop" data-astro-cid-ywlsfzrj> <h1 class="text-center text-4xl md:text-9xl" data-astro-cid-ywlsfzrj>Projects</h1> <hr class="m-auto mb-5 w-1/2 border-neutral-600 bg-black md:mb-14 md:border-2" data-astro-cid-ywlsfzrj> <div class="quote text-center text-[3vw]" data-astro-cid-ywlsfzrj> <div data-astro-cid-ywlsfzrj>When I wrote this code, only God and I understood what it meant.</div> <div data-astro-cid-ywlsfzrj>Now only God knows.</div> </div> <!-- Desktop View --> <div class="flex" data-astro-cid-ywlsfzrj> <div class="mx-[3vw] flex w-5/12 flex-col gap-20" data-astro-cid-ywlsfzrj> ${projects.filter((_, index) => index % 2 === 0).map((project) => {
    return renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project, "mobile": false, "data-astro-cid-ywlsfzrj": true })}`;
  })} </div> <div class="mx-[3vw] mt-32 flex w-5/12 flex-col gap-20" data-astro-cid-ywlsfzrj> ${projects.filter((_, index) => index % 2 !== 0).map((project) => {
    return renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project, "mobile": false, "data-astro-cid-ywlsfzrj": true })}`;
  })} </div> </div> </div> <!-- Mobile View --> <div class="mobile flex flex-col items-center gap-20" data-astro-cid-ywlsfzrj> ${projects.map((project) => {
    return renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project, "mobile": true, "data-astro-cid-ywlsfzrj": true })}`;
  })} </div> `;
}, "/Users/gavin/Code/repos/portfolio/src/sections/projects/projects.astro", void 0);

async function getGithubProfile() {
  const profileData = await (await fetch("https://api.github.com/users/yangavin")).json();
  const { html_url, name, avatar_url, public_repos } = profileData;
  const contributionsData = await (await fetch("https://github-contributions-api.jogruber.de/v4/yangavin")).json();
  const totalContributions = Object.values(contributionsData.total).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return {
    url: html_url,
    name,
    avatarUrl: avatar_url,
    repositories: public_repos,
    totalContributions
  };
}

function GithubCard() {
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGithubProfile().then((profileData2) => {
      setProfileData(profileData2);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  });
  if (loading)
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  if (!profileData)
    return /* @__PURE__ */ jsx("div", { children: "Error fetching data" });
  const { name, url, avatarUrl, repositories, totalContributions } = profileData;
  return /* @__PURE__ */ jsxs("div", { className: "text-slate-200", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://github.com",
        target: "_blank",
        className: "m-auto mb-5 block max-w-20",
        children: /* @__PURE__ */ jsx("img", { src: "named-github.svg", alt: "GitHub Logo" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "m-auto w-9/12 max-w-xl", children: /* @__PURE__ */ jsx("a", { href: url, target: "_blank", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-evenly gap-12 rounded-md bg-gray-700 px-8 py-12 md:flex-row md:gap-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5", children: [
        /* @__PURE__ */ jsx("img", { src: avatarUrl, alt: "Personal Logo", className: "w-28" }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: name })
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "vertical-line.svg",
          alt: "verical-line",
          className: "hidden md:inline"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 text-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("h1", { children: "Repositories" }),
          /* @__PURE__ */ jsx("p", { children: repositories })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-center", children: "Total Contributions" }),
          /* @__PURE__ */ jsx("p", { children: totalContributions })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "m-auto w-7/12 max-w-md rounded-b-md bg-slate-600 py-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-center", children: "Feel free to Connect!" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-evenly", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://www.linkedin.com/in/gavin-yan-6b488725b/",
          target: "_blank",
          children: /* @__PURE__ */ jsx("img", { src: "linkedin.svg", alt: "LinkedIn Logo" })
        }
      ) })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Jua&family=Quicksand:wght@300;400&display=swap" rel="stylesheet"><link rel="shortcut icon" href="favicon.png" type="image/x-icon"><title>Gavin Yan - Queen's Student</title>${renderHead()}</head> <body class="overflow-x-hidden overflow-y-hidden bg-orange-100 font-jua text-neutral-600"> ${renderComponent($$result, "JokeOverlay", JokeOverlay, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/gavin/Code/repos/portfolio/src/sections/joke-overlay/JokeOverlay", "client:component-export": "default" })} <img class="ml-auto h-[15vw] w-3/5" src="blue-box.svg" alt="Blue Box"> ${renderComponent($$result, "Title", $$Title, {})} <hr class="-rotate-6 border-black bg-black md:border-2"> <main class="relative my-12 md:mt-28 lg:mt-48"> <div class="flex flex-col gap-6 md:gap-20"> ${renderComponent($$result, "AboutMe", $$AboutMe, {})} ${renderComponent($$result, "Skills", $$Skills, {})} ${renderComponent($$result, "Projects", $$Projects, {})} ${renderComponent($$result, "GithubCard", GithubCard, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/gavin/Code/repos/portfolio/src/sections/github/GithubCard", "client:component-export": "default" })} </div> </main> <footer class="flex items-center justify-between bg-neutral-500 px-10 py-5 text-slate-200"> <div>© 2024 Gavin Yan | All rights reserved</div> <div class="flex items-center"> <div> <h1 class="text-xl">Website's Source Code</h1> <h2>I had a lot of fun building this.</h2> </div> <div class="ml-2 mr-4">-&gt;</div> <a href="https://github.com/yangavin/portfolio" target="_blank"><img src="github.svg" alt="GitHub Logo"></a> </div> </footer> </body></html>`;
}, "/Users/gavin/Code/repos/portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/gavin/Code/repos/portfolio/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
