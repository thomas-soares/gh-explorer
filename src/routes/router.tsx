import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '@/pages/HomePage';
import UserPage from '@/pages/UserPage';
import RepoPage from '@/pages/RepoPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RouteErrorPage from '@/pages/RouteErrorPage';

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.focus();
    }
  }, [location.pathname]);

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
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
    ],
  },
]);
