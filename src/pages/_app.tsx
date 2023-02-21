import Navigation from '@/Components/Navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col gap-2">
      <Navigation {...pageProps} />
      <Component {...pageProps} />
    </div>
  );
}
