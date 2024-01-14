import { contentfulClient } from "../lib/contentful";
import type { EntryFieldTypes } from "contentful";

type techCard = {
  contentTypeId: "techCard";
  fields: {
    logo: EntryFieldTypes.AssetLink;
    title: EntryFieldTypes.Text;
    url: EntryFieldTypes.Text;
  };
};
type Logo = {
  fields: {
    file: {
      url: string;
    };
  };
};

async function getTechCardsByTags(tags: string[]) {
  return (
    await contentfulClient.getEntries<techCard>({
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
