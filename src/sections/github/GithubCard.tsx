import { useEffect, useState } from "react";
import getGithubProfile from "../../api/getGithubProfile";
import type { GithubProfile } from "../../api/models";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function GithubCard() {
  const [profileData, setProfileData] = useState<GithubProfile | undefined>();

  useEffect(() => {
    getGithubProfile()
      .then((profileData) => {
        setProfileData(profileData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-slate-200">
      <a
        href="https://github.com"
        target="_blank"
        className="m-auto mb-5 block max-w-20"
      >
        <img src="named-github.svg" alt="GitHub Logo" />
      </a>
      <div className="m-auto w-9/12 max-w-xl">
        <a href="https://github.com/yangavin" target="_blank">
          <div className="flex flex-col items-center justify-evenly gap-12 rounded-md bg-gray-700 px-8 py-12 md:flex-row md:gap-0">
            <div className="flex flex-col items-center gap-5">
              <img
                src="https://avatars.githubusercontent.com/u/120120964?v=4"
                alt="Personal Logo"
                className="w-28"
              />
              <h1 className="text-3xl">Gavin Yan</h1>
            </div>
            <img
              src="vertical-line.svg"
              alt="verical-line"
              className="hidden md:inline"
            />
            <div className="flex flex-col gap-5 text-xl">
              <div className="flex flex-col items-center">
                <h1>Repositories</h1>
                <p>
                  {profileData ? (
                    <>{profileData.repositories}</>
                  ) : (
                    <Skeleton
                      width={80}
                      baseColor="#6b7280"
                      highlightColor="#9ca3af"
                    />
                  )}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-center">Recent Contributions</h1>
                {profileData ? (
                  <p>{profileData.totalContributions}</p>
                ) : (
                  <Skeleton
                    width={120}
                    baseColor="#6b7280"
                    highlightColor="#9ca3af"
                  />
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="m-auto w-7/12 max-w-md rounded-b-md bg-slate-600 py-3">
        <h1 className="mb-4 text-center">Feel free to Connect!</h1>
        <div className="flex justify-evenly">
          <a
            href="https://www.linkedin.com/in/gavin-yan-6b488725b/"
            target="_blank"
          >
            <img src="linkedin.svg" alt="LinkedIn Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
