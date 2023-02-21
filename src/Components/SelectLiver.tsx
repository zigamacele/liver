import { database } from '@/database';
import React from 'react';

export default function SelectLiver() {
  function handleARLiver(memberID: string) {
    let liversArray: string[] = [];
    chrome.storage.local.get('myLivers', function (data: any) {
      if (data.myLivers === undefined || data.myLivers.length === 0) {
        chrome.storage.local.set({ myLivers: [memberID] });
        return;
      }
      liversArray = data.myLivers;
      console.log('data', data.myLivers, 'liversarray', liversArray);
      if (liversArray.includes(memberID)) {
        const filtered = liversArray.filter((mID) => mID !== memberID);
        chrome.storage.local.set({ myLivers: filtered });
        console.log('filtered:', filtered, 'liversarray:', liversArray);
      } else {
        liversArray.push(memberID);
        chrome.storage.local.set({ myLivers: liversArray });
        console.log('liversarray:', liversArray);
      }
    });
  }

  return (
    <div>
      {database.map((branch) => {
        return (
          <div key={branch.branchID}>
            <div className="flex">
              <p>{branch.branchID}</p>
              <p>{branch.debut}</p>
            </div>
            <div className="flex gap-1">
              {branch.members.map((member) => {
                return (
                  <div
                    key={member.name}
                    onClick={() => handleARLiver(member.channelID)}
                  >
                    <img
                      src={member.imageURL}
                      alt={member.name}
                      className="h-12 w-12"
                    />
                    {/* <p className="text-xs">{member.name}</p> */}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
