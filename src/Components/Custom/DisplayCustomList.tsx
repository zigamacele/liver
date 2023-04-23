import React, { useEffect } from 'react';

export interface customVTuber {
  name: string;
  id: number;
  photo: string;
  twitter: string;
}

export default function DisplayCustomList({
  customList,
  setCustomList,
}: {
  customList: any;
  setCustomList: Function;
}) {
  console.log('comp', customList);

  useEffect(() => {
    console.log('updated display', customList);
  }, [customList]);

  const removeFromCustom = (id: string) => {
    let tempCustomList = customList;
    delete tempCustomList[id];
    setCustomList(tempCustomList);
    chrome.storage.local.set({
      customList: tempCustomList,
    });
  };

  return (
    <section>
      <button onClick={() => setCustomList('asdfasdf')}>asdfasdf</button>

      <div>
        {Object.values(customList).flatMap((element: any) => {
          return (
            <div className="flex justify-between">
              <div>{element.name}</div>
              <div onClick={() => removeFromCustom(element.id)}>X</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
