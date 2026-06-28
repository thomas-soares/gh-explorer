import { useQuery } from '@tanstack/react-query';
import { getRepo } from '@/services/githubService';
import type { GitHubRepoDetail } from '@/types/github';

export const useGitHubRepo = (fullName: string) => {
  return useQuery<GitHubRepoDetail, Error>(['githubRepo', fullName], () => getRepo(fullName), {
    enabled: !!fullName,
  });
};
