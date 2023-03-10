import React, { useEffect, useState } from 'react';
import SelectLiver from '../Components/SelectLiver';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const languageSelector = [{ name: 'EN' }, { name: 'JP' }];

const languageSelectorHolo = [{ name: 'EN' }, { name: 'JP' }, { name: 'ID' }];

const corpoSelector = [
  { name: 'NIJISANJI' },
  { name: 'HOLOLIVE' },
  { name: 'HOLOSTARS' },
];

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';
import { BsGithub } from 'react-icons/bs';

function handleReset() {
  chrome.storage.local.remove('myLivers');
  window.location.reload();
}

export default function Settings({
  showStreamTitle,
  setShowStreamTitle,
}: {
  showStreamTitle: string;
  setShowStreamTitle: any;
}) {
  const [settingsQuery, setSettingsQuery] = useState('NIJISANJI_EN');

  const [selectedLanguage, setSelectedLanguage] = useState(languageSelector[0]);
  const [selectedCorpo, setSelectedCorpo] = useState(corpoSelector[0]);

  useEffect(() => {
    chrome.storage.local.set({ goToSettings: false });
  }, []);

  useEffect(() => {
    if (selectedLanguage.name === 'ID' && selectedCorpo.name !== 'HOLOLIVE')
      setSelectedLanguage(languageSelector[0]);
    else setSettingsQuery(`${selectedCorpo.name}_${selectedLanguage.name}`);
  }, [selectedLanguage, selectedCorpo]);

  function showLanguages() {
    if (selectedCorpo.name === 'HOLOLIVE') return languageSelectorHolo;
    else return languageSelector;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
            <div className="relative mt-1 z-50">
              <Listbox.Button className="relative w-20 cursor-default rounded-lg bg-white dark:bg-slate-700 py-2 pl-3 pr-5 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                <span className="block truncate">{selectedLanguage.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-xs ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {showLanguages().map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-zinc-100 text-zinc-700 dark:text-blue-400 dark:bg-slate-600'
                            : 'text-gray-900 dark:text-white'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-blue-500">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <div className="w-40">
            <Listbox value={selectedCorpo} onChange={setSelectedCorpo}>
              <div className="relative mt-1 z-50">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-700 py-2 pl-3 pr-5 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                  <span className="block truncate">{selectedCorpo.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-xs ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {corpoSelector.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-zinc-100 text-zinc-700 dark:text-blue-400 dark:bg-slate-600'
                              : 'text-gray-900 dark:text-white'
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-blue-500">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className="flex gap-2 bg-slate-200 dark:bg-slate-700 rounded py-1.5 px-2">
          <ArchiveBoxXMarkIcon
            onClick={handleReset}
            className="h-5 w-5 cursor-pointer hover:text-rose-500"
          />
          <BsGithub
            className="h-5 w-5 cursor-pointer hover:dark:text-blue-400 hover:text-slate-500"
            onClick={() =>
              chrome.tabs.create({
                url: 'https://github.com/zigamacele/liver',
              })
            }
          />
        </div>
      </div>
      <SelectLiver
        settingsQuery={settingsQuery}
        showStreamTitle={showStreamTitle}
        setShowStreamTitle={setShowStreamTitle}
      />
    </div>
  );
}
