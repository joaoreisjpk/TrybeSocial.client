import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <AuthProvider>
      <AnyComponent {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
