// Component: Contributors
import { Github } from "lucide-react";

async function getContributors() {
  let request = await fetch(
    `https://api.github.com/repos/fardeenes7/unidemy/contributors?per_page=100&page=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // print data from the fetch on screen
  let contributorsList = await request.json();
  if (contributorsList.message) {
    contributorsList = [
      {
        login: "fardeenes7",
        id: 43882976,
        node_id: "MDQ6VXNlcjQzODgyOTc2",
        avatar_url: "https://avatars.githubusercontent.com/u/43882976?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/fardeenes7",
        html_url: "https://github.com/fardeenes7",
        followers_url: "https://api.github.com/users/fardeenes7/followers",
        following_url:
          "https://api.github.com/users/fardeenes7/following{/other_user}",
        gists_url: "https://api.github.com/users/fardeenes7/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/fardeenes7/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/fardeenes7/subscriptions",
        organizations_url: "https://api.github.com/users/fardeenes7/orgs",
        repos_url: "https://api.github.com/users/fardeenes7/repos",
        events_url: "https://api.github.com/users/fardeenes7/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/fardeenes7/received_events",
        type: "User",
        site_admin: false,
        contributions: 58,
      },
    ];
  }
  return contributorsList;
}

const Contributors = async () => {
  const contributors = await getContributors();
  return (
    <section className="my-4">
      {contributors.length > 0 && (
        <ul
          role="list"
          className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
        >
          {contributors.map((contributor: any) => (
            <li key={contributor.id}>
              <div className="space-y-4">
                <img
                  className="mx-auto h-20 w-20 rounded-full lg:h-24 lg:w-24"
                  src={contributor.avatar_url}
                  alt="avatar"
                />
                <div className="space-y-2 text-center">
                  <div className="text-xs font-medium lg:text-sm">
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:text-gray-100"
                    >
                      <Github height={20} width={20} className="mr-2" />
                      {contributor.login}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Contributors;
