import { contentfulClient } from "../lib/contentful";
import type { TechCardSkeleton, Asset } from "./models";

async function getTechCardsByTags(tags: string[]) {
  return (
    await contentfulClient.getEntries<TechCardSkeleton>({
      content_type: "techCard",
      "metadata.tags.sys.id[all]": tags,
      order: ["sys.createdAt"],
    })
  ).items.map((techCard) => {
    return {
      ...techCard.fields,
      logo: `https:${(techCard.fields.logo as Asset).fields.file.url}`,
    };
  });
}

export default getTechCardsByTags;
