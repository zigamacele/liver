import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="w-96 dark:bg-slate-800 bg-slate-100 m-3 rounded dark:text-slate-100 text-slate-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
