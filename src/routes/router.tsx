import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import UserPage from '@/pages/UserPage';
import RepoPage from '@/pages/RepoPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/user/:username',
    element: <UserPage />,
  },
  {
    path: '/user/:username/repo/:repoName',
    element: <RepoPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
