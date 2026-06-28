import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import SkipLink from './components/SkipLink';

function App() {
  return (
    <>
      <SkipLink />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
