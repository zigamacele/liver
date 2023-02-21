import React, { useEffect } from 'react';

import SelectLiver from '../Components/SelectLiver';

function handleReset() {
  chrome.storage.local.clear();
}

export default function Settings() {
  return (
    <div>
      <button onClick={handleReset}> chrome.storage</button>
      <SelectLiver />
    </div>
  );
}
