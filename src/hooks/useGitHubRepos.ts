import { useQuery } from '@tanstack/react-query';
import { getUserRepos } from '@/services/githubService';
import type { GitHubRepo } from '@/types/github';

export const useGitHubRepos = (username: string, page = 1) => {
  return useQuery<GitHubRepo[], Error>({
    queryKey: ['githubRepos', username, page],
    queryFn: () => getUserRepos(username, page),
    enabled: !!username,
  });
};
