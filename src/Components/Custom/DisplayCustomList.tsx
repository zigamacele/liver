import React, { useEffect } from 'react';

export interface customVTuber {
  name: string;
  id: number;
  photo: string;
  twitter: string;
}

import { XCircleIcon } from '@heroicons/react/24/solid';

export default function DisplayCustomList({ customList }: { customList: any }) {
  useEffect(() => {
    console.log('updated display', customList);
  }, [customList]);

  const removeFromCustom = (id: string) => {
    let tempCustomList = customList;
    delete tempCustomList[id];
    chrome.storage.local.set({
      customList: customList,
    });
  };

  return (
    <section className="mt-2">
      <div className="flex flex-col gap-1.5">
        {Object.values(customList).flatMap((element: any) => {
          return (
            <div className="flex justify-between items-center px-1 py-1 bg fade-in bg-slate-300/30 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-700 rounded-full">
              <div className="flex items-center gap-2">
                <img
                  src={element.photo}
                  className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-500"
                  alt={element.name}
                />
                <div className="flex flex-col">
                  <span className="">{element.name}</span>
                  <span className="text-[10px] font-light opacity-60">
                    @{element.twitter}
                  </span>
                </div>
              </div>

              <XCircleIcon
                onClick={() => removeFromCustom(element.id)}
                className="h-6 w-6 mr-2 cursor-pointer hover:text-rose-500"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
