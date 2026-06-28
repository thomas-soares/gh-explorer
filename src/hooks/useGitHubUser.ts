import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/githubService';
import type { GitHubUser } from '@/types/github';

export const useGitHubUser = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ['githubUser', username],
    queryFn: () => getUser(username),
    enabled: !!username,
  });
};
