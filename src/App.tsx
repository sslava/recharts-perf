import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ChartsSimple from './components/ChartsSimple';
import ChartsImages from './components/ChartsImages';
import ChartsPaginated from './components/ChartsPaginated';
import ChartsVirtual from './components/ChartsVirtual';

const client = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const router = createBrowserRouter([
  { path: '/', element: <ChartsSimple /> },
  { path: '/pagination', element: <ChartsPaginated /> },
  { path: '/virtual', element: <ChartsVirtual /> },
  { path: '/images', element: <ChartsImages /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="max-w-7xl mx-auto p-4">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}
