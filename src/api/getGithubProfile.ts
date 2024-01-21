type ProfileData = {
  data: {
    user: {
      url: string;
      name: string;
      avatarUrl: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
      repositories: {
        totalCount: number;
      };
    };
  };
};

export default async function getGithubProfile() {
  const profileData: ProfileData = await (
    await fetch("https://api.github.com/graphql", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({
        query: `query { 
        user(login:"yangavin"){
          url
          name
          avatarUrl
          contributionsCollection{
            contributionCalendar{
              totalContributions
            }
          }
          repositories(visibility:PUBLIC){
            totalCount
          }
        }
      }`,
      }),
    })
  ).json();
  const user = profileData.data.user;
  return {
    url: user.url,
    name: user.name,
    avatarUrl: user.avatarUrl,
    repositories: user.repositories.totalCount,
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
  };
}
