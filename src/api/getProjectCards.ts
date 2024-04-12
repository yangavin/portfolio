import { contentfulClient } from "../lib/contentful";
import type { Asset, TechCard, projectListSkeleton } from "./models";
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
  const projects =
    await contentfulClient.withoutUnresolvableLinks.getEntry<projectListSkeleton>(
      "oTeBlPqpJ6iSWrZ0niI8v",
      { include: 2 },
    );
  return projects.fields.list.map((projectCard) => {
    return {
      ...projectCard!.fields,
      logo: `https:${(projectCard!.fields.logo as Asset).fields.file.url}`,
      techUsed: (projectCard!.fields.techUsed as TechCard[]).map((techCard) => {
        return {
          ...techCard.fields,
          logo: `https:${techCard.fields.logo.fields.file.url}`,
        };
      }),
      description: documentToHtmlString(
        projectCard!.fields.description,
        aTagRenderingOption,
      ),
    };
  });
}

export default getProjectCards;
