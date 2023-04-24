import { database } from '@/database';
import React, { useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SelectLiver({
  settingsQuery,
  showStreamTitle,
  setShowStreamTitle,
}: {
  settingsQuery: any;
  showStreamTitle: string;
  setShowStreamTitle: Function;
}) {
  const [selectedLivers, setSelectedLivers] = useState({});

  const flattenedDatabase = Object.values(database).flatMap((group: any) =>
    group.flatMap((branch: any) => branch.members)
  );

  function databaseSearch(memberID: string) {
    for (const member of flattenedDatabase) {
      if (member.channelID === memberID) {
        return member;
      }
    }
    return {};
  }

  useEffect(() => {
    chrome.storage.local.get('myLivers', function (data) {
      setSelectedLivers({ ...data.myLivers });
    });
  }, []);

  interface AnyArray {
    [key: string]: any;
  }

  function handleARLiver(memberID: string) {
    let liversArray: AnyArray = {};
    chrome.storage.local.get('myLivers', function (data) {
      console.log(data);
      if (data.myLivers === undefined || data.myLivers.length === 0) {
        chrome.storage.local.set({
          myLivers: { [memberID]: databaseSearch(memberID) },
        });
        setSelectedLivers({ [memberID]: databaseSearch(memberID) });
        return;
      }
      liversArray = data.myLivers;
      if (Object.keys(liversArray).includes(memberID)) {
        delete liversArray[memberID as keyof AnyArray];
        chrome.storage.local.set({ myLivers: liversArray });
        setSelectedLivers(liversArray);
      } else {
        liversArray = {
          ...liversArray,
          [memberID]: databaseSearch(memberID),
        };
        chrome.storage.local.set({ myLivers: liversArray });
        setSelectedLivers(liversArray);
      }
    });
  }

  return (
    <div className="mt-6">
      <div>
        {Object.keys(database).map((group, index) => {
          return <p key={`${group}-${index}`}></p>;
        })}
      </div>
      <div>
        {!settingsQuery
          ? null
          : database[settingsQuery].map((branch: any) => {
              return (
                <div key={branch.branchID} className="mt-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{branch.branchID}</p>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {branch.members.map((member: any) => {
                      return (
                        <div
                          key={member.name}
                          onClick={() => {
                            handleARLiver(member.channelID);
                          }}
                          onMouseEnter={() => setShowStreamTitle(member.name)}
                          onMouseLeave={() => setShowStreamTitle('')}
                          className="mt-1 fade-in"
                        >
                          {!Object.keys(selectedLivers).includes(
                            member.channelID
                          ) ? (
                            <img
                              src={member.imageURL}
                              alt={member.name}
                              className="h-14 w-14 rounded-full border-2 border-white dark:border-slate-700 bg-slate-200 dark:bg-slate-800 cursor-pointer hover:opacity-80"
                            />
                          ) : (
                            <div className="relative cursor-pointer">
                              <CheckCircleIcon className="dark:text-slate-200 text-slate-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
                              <img
                                src={member.imageURL}
                                alt={member.name}
                                className="h-14 w-14 opacity-50 rounded-full p-1 bg-slate-200 dark:bg-slate-700"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
