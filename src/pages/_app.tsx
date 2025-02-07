import type { AppProps } from 'next/app';
import { Layout } from '../components/shared/Layout';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import '../styles/avatars.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
