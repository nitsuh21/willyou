import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ProposalScene } from '../components/ProposalScene';

export default function MarryMe() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration issues with window object
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Will You Marry Me? 💍</title>
        <meta name="description" content="A special proposal just for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <ProposalScene />
      </main>
    </>
  );
}
