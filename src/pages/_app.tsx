import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { Layout } from '../components/shared/Layout';
import { Analytics } from '@vercel/analytics/next';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ThemeProvider>
  );
}
