import { contentfulClient } from "../lib/contentful";
import type { ProjectSkeleton } from "./models";

async function getProjectCards() {
  return await contentfulClient.getEntries<ProjectSkeleton>({
    content_type: "projectCard",
    order: ["sys.createdAt"],
  });
}

export default getProjectCards;
