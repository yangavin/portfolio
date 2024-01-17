import { contentfulClient } from "../lib/contentful";
import type { ProjectSkeleton, Asset, TechCard } from "./models";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Options } from "@contentful/rich-text-html-renderer";
import { INLINES } from "@contentful/rich-text-types";

// Render links with styles and target blank attribute
const aTagRenderingOption: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) =>
      `<a class="text-blue-500 underline" target="_blank" href=${
        node.data.uri
      }>${next(node.content)}</a>`,
  },
};

async function getProjectCards() {
  const rawProjects = await contentfulClient.getEntries<ProjectSkeleton>({
    content_type: "projectCard",
    order: ["sys.createdAt"],
  });

  return rawProjects.items.map((projectCard) => {
    return {
      ...projectCard.fields,
      logo: `https:${(projectCard.fields.logo as Asset).fields.file.url}`,
      techUsed: (projectCard.fields.techUsed as TechCard[]).map((techCard) => {
        return {
          ...techCard.fields,
          logo: `https:${techCard.fields.logo.fields.file.url}`,
        };
      }),
      description: documentToHtmlString(
        projectCard.fields.description,
        aTagRenderingOption,
      ),
    };
  });
}

export default getProjectCards;
