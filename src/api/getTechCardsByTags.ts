import { contentfulClient } from "../lib/contentful";
import type { TechCardSkeleton, Logo } from "./models";

async function getTechCardsByTags(tags: string[]) {
  return (
    await contentfulClient.getEntries<TechCardSkeleton>({
      content_type: "techCard",
      "metadata.tags.sys.id[all]": tags,
      order: ["sys.createdAt"],
    })
  ).items.map((techCard) => {
    return {
      logo: `https:${(techCard.fields.logo as Logo).fields.file.url}`,
      title: techCard.fields.title,
      url: techCard.fields.url,
    };
  });
}

export default getTechCardsByTags;
