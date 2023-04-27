import { ConfigProvider, Select } from 'antd';
import { useEffect, useState } from 'react';

export default function Selectors({
  setSettingsQuery,
}: {
  setSettingsQuery: Function;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [selectedCorpo, setSelectedCorpo] = useState('NIJISANJI');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setSettingsQuery(`${selectedCorpo}_${selectedLanguage}`);
  }, [selectedLanguage, selectedCorpo]);

  useEffect(() => {
    chrome.storage.local.get('darkMode', function (data) {
      setDarkMode(data.darkMode);
    });
    chrome.storage.onChanged.addListener(function (changes) {
      if ('darkMode' in changes) {
        setDarkMode(changes.darkMode.newValue);
      }
    });
  }, []);

  return (
    <section className="flex gap-1">
      <ConfigProvider
        theme={{
          token: {
            controlOutline: 'none',
            colorTextDisabled: '#94a3b8',
            colorTextPlaceholder: '#94a3b8',
            colorBgContainer: darkMode ? '#334155' : 'white',
            colorBgElevated: darkMode ? '#334155' : 'white',
            colorBorder: darkMode ? '#0f172a' : '#e2e8f0',
            controlItemBgActive: darkMode ? '#1e293b' : '#e2e8f0',
            controlItemBgHover: darkMode ? '#2D3A4B' : '#f1f5f9',
            colorText: darkMode ? '#f1f5f9' : '#1e293b',
          },
        }}
      >
        <Select
          className="shadow-sm"
          value={selectedCorpo}
          style={{ width: 120 }}
          onChange={(newCorpo: string) => setSelectedCorpo(newCorpo)}
          options={[
            {
              value: 'NIJISANJI',
              label: 'Nijisanji',
              disabled: selectedLanguage === 'ID',
            },
            { value: 'HOLOLIVE', label: 'Hololive' },
            {
              value: 'HOLOSTARS',
              label: 'Holostars',
              disabled: selectedLanguage === 'ID',
            },
          ]}
        />
        <Select
          className="shadow-sm"
          value={selectedLanguage}
          style={{ width: 120 }}
          onChange={(newLanguage: string) => setSelectedLanguage(newLanguage)}
          options={[
            { value: 'EN', label: 'English' },
            { value: 'JP', label: 'Japan' },
            {
              value: 'ID',
              label: 'Indonesia',
              disabled: selectedCorpo !== 'HOLOLIVE',
            },
          ]}
        />
      </ConfigProvider>
    </section>
  );
}
