import { contentfulClient } from "../lib/contentful";
import type { Asset } from "./models";
import type { skillSkeleton } from "./models";

async function getTechCardsByCategory(
  category: "languages" | "technologies" | "devTools",
) {
  const skills =
    await contentfulClient.withoutUnresolvableLinks.getEntry<skillSkeleton>(
      "7fAfhNpxAxF0O66fLznl4P",
    );
  return skills.fields[category as keyof typeof skills.fields].map(
    (techCard) => {
      return {
        ...techCard!.fields,
        logo: `https:${(techCard!.fields.logo as Asset).fields.file.url}`,
      };
    },
  );
}

export default getTechCardsByCategory;
