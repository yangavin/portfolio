import type { EntryFieldTypes } from "contentful";

export type TechCardSkeleton = {
  contentTypeId: "techCard";
  fields: {
    logo: EntryFieldTypes.AssetLink;
    title: EntryFieldTypes.Text;
    url: EntryFieldTypes.Text;
  };
};

export type ProjectSkeleton = {
  contentTypeId: "projectCard";
  fields: {
    title: EntryFieldTypes.Text;
    projectUrl: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    logo: EntryFieldTypes.AssetLink;
    techUsed: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<TechCardSkeleton>
    >;
    repoUrl: EntryFieldTypes.Text;
    hue: EntryFieldTypes.Text;
  };
};

export type skillSkeleton = {
  contentTypeId: "skill";
  fields: {
    languages: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<TechCardSkeleton>
    >;
    technologies: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<TechCardSkeleton>
    >;
    devTools: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<TechCardSkeleton>
    >;
  };
};

export type projectListSkeleton = {
  contentTypeId: "project";
  fields: {
    list: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProjectSkeleton>>;
  };
};

export type Asset = {
  fields: {
    file: {
      url: string;
    };
  };
};

export type TechCard = {
  fields: {
    logo: Asset;
    title: string;
    url: string;
  };
};

export type GithubProfile = {
  repositories: number;
  totalContributions: number;
};
