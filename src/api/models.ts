import type { EntryFieldTypes } from "contentful";

export type TechCardSkeleton = {
  contentTypeId: "techCard";
  fields: {
    logo: EntryFieldTypes.AssetLink;
    title: EntryFieldTypes.Text;
    url: EntryFieldTypes.Text;
  };
};

export type Logo = {
  fields: {
    file: {
      url: string;
    };
  };
};

export type ProjectSkeleton = {
  contentTypeId: "projectCard";
  fields: {
    title: EntryFieldTypes.Text;
    projectUrl: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    logo: EntryFieldTypes.AssetLink;
    techUsed: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<TechCardSkeleton>
    >;
    repoUrl: EntryFieldTypes.Text;
    color: EntryFieldTypes.Text;
  };
};
