import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChartsPage from './components/ChartsPage';

const client = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="max-w-7xl mx-auto p-4">
        <ChartsPage />
      </div>
    </QueryClientProvider>
  );
}
