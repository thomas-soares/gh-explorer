import api from './api';
import type { GitHubRepo, GitHubRepoDetail, GitHubUser } from '@/types/github';

export const getUser = async (username: string): Promise<GitHubUser> => {
  const response = await api.get<GitHubUser>(`/users/${username}`);
  return response.data;
};

export const getUserRepos = async (
  username: string,
  page = 1,
  perPage = 30
): Promise<GitHubRepo[]> => {
  const response = await api.get<GitHubRepo[]>(`/users/${username}/repos`, {
    params: {
      sort: 'updated',
      direction: 'desc',
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const getRepo = async (fullName: string): Promise<GitHubRepoDetail> => {
  const response = await api.get<GitHubRepoDetail>(`/repos/${fullName}`);
  return response.data;
};
