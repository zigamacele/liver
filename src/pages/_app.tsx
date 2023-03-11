import Navigation from '@/Components/Navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [showStreamTitle, setShowStreamTitle] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <Navigation
        {...pageProps}
        showStreamTitle={showStreamTitle}
        setShowStreamTitle={setShowStreamTitle}
      />
      <div className="m-3 mt-14">
        <Component
          {...pageProps}
          showStreamTitle={showStreamTitle}
          setShowStreamTitle={setShowStreamTitle}
        />
      </div>
    </div>
  );
}
