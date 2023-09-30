import { GitHubLogoIcon } from '@radix-ui/react-icons'

import { GITHUB_REPO, HOLODEX_WEBSITE } from '@/constants/links.ts'

const Footer: React.FC = () => {
  return (
    <footer className='bottom fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-slate-100/80 px-3 py-3 backdrop-blur-md duration-500 animate-in slide-in-from-bottom dark:bg-slate-800/80'>
      <div className='flex items-center gap-1'>
        <p className='font-light'>Powered by</p>
        <p
          onClick={() =>
            void chrome.tabs.create({
              url: HOLODEX_WEBSITE,
            })
          }
          className='cursor-pointer text-blue-500 hover:text-rose-500'
        >
          Holodex
        </p>
      </div>
      <GitHubLogoIcon
        className='h-5 w-5 cursor-pointer rounded hover:text-slate-500 hover:dark:text-blue-400'
        onClick={() =>
          void chrome.tabs.create({
            url: GITHUB_REPO,
          })
        }
      />
    </footer>
  )
}

export default Footer
