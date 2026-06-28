import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/githubService';
import type { GitHubUser } from '@/types/github';

export const useGitHubUser = (username: string) => {
  return useQuery<GitHubUser, Error>(['githubUser', username], () => getUser(username), {
    enabled: !!username,
  });
};
