import { QueryClient, QueryClientProvider } from 'react-query';
import PolarisProvider from '@/components/PolarisProvider';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PolarisProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </PolarisProvider>
  );
}
