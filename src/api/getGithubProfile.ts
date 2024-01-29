import type { GithubProfile } from "./models";

// Types from https://github.com/grubersjoe/github-contributions-api
interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Response {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear'
  };
  contributions: Array<Contribution>;
}

// Response type from https://api.github.com/users
type GithubProfileRes = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export default async function getGithubProfile(): Promise<GithubProfile> {
  const profileData: GithubProfileRes = await (
    await fetch("https://api.github.com/users/yangavin")
  ).json();
  const { public_repos } = profileData;

  const contributionsData: Response = await (
    await fetch("https://github-contributions-api.jogruber.de/v4/yangavin")
  ).json();
  const totalContributions = Object.values(contributionsData.total).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return {
    repositories: public_repos,
    totalContributions,
  };
}
