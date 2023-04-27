import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { SiKofi } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full flex justify-between items-center bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-3 z-50 left-0">
      <div className="flex gap-1 items-center">
        <span className="font-light text-[10px]">Powered by</span>
        <span
          onClick={() =>
            chrome.tabs.create({
              url: 'https://holodex.net/',
            })
          }
          className="text-blue-500 hover:text-rose-500 cursor-pointer"
        >
          Holodex
        </span>
      </div>
      <div className="flex items-center gap-3">
        {/* <SiKofi
          className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500 rounded"
          onClick={() =>
            chrome.tabs.create({
              url: 'https://ko-fi.com/macele',
            })
          }
        /> */}
        <BsGithub
          className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500 rounded"
          onClick={() =>
            chrome.tabs.create({
              url: 'https://github.com/zigamacele/liver',
            })
          }
        />
      </div>
    </footer>
  );
}
