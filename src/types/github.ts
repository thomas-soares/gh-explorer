export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string | null;
  bio?: string | null;
  company?: string | null;
  blog?: string | null;
  location?: string | null;
  email?: string | null;
  twitter_username?: string | null;
  followers: number;
  following: number;
  public_repos: number;
  repos_url: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepoOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description?: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language?: string | null;
  topics?: string[];
  updated_at: string;
  open_issues_count: number;
  private: boolean;
  archived: boolean;
  fork: boolean;
  owner: GitHubRepoOwner;
  license?: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
    node_id: string;
  } | null;
}

export interface GitHubRepoDetail extends GitHubRepo {
  watchers_count: number;
  open_issues_count: number;
  subscribers_count: number;
  default_branch: string;
  homepage?: string | null;
  topics?: string[];
}
