import { contentfulClient } from "../lib/contentful";
import type { ProjectSkeleton, Asset, TechCard } from "./models";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

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
      description: documentToHtmlString(projectCard.fields.description),
    };
  });
}

export default getProjectCards;
