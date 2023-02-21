import Navigation from '@/Components/Navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navigation {...pageProps} />
      <Component {...pageProps} />
    </div>
  );
}
