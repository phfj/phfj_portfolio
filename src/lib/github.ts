const GITHUB_API = "https://api.github.com";

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
  };
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `${GITHUB_API}/users/phfj/repos?sort=pushed&per_page=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];
    return (await res.json()) as GitHubRepo[];
  } catch {
    return [];
  }
}

export async function getGitHubActivity(): Promise<GitHubEvent[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `${GITHUB_API}/users/phfj/events/public?per_page=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];
    return (await res.json()) as GitHubEvent[];
  } catch {
    return [];
  }
}
