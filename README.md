# Liver

### Check if you favorite VTuber is live!

Liver is a chrome extension powered by Holodex API that lets you quickly check if your favorite Liver is streaming.
Liver is designed to be a fast and simple way to check Livers stream status.

You can get it here: Link

## Demo

_Insert video here_

## Images

<img src="https://i.imgur.com/eYe2wI5.png" width="280"><img src="https://i.imgur.com/Iq9BXVd.png" width="280">
<img src="https://i.imgur.com/QIWMuNI.png" width="280"><img src="https://i.imgur.com/4Ty40Wq.png" width="280">

## Technologies used

-NextJS \
-TypeScript \
-TailwindCSS \
-Chrome Storage API

## Use extension with your own API key

Make sure you have [Node.js](https://nodejs.org/) installed. \
Run these commands to get the project locally:

```sh
git clone https://github.com/zigamacele/liver.git
cd liver
npm install
```

Download extension from Releases and extract it outside of repo you just cloned.
<img src="https://i.imgur.com/itX1DOp.png" width="280">

Get your own API key from [Holodex](https://docs.holodex.net/docs/holodex/ZG9jOjQ2Nzk1-getting-started)

Go back into the repo you just cloned, create .env file and paste in your API key.
<img src="https://i.imgur.com/8fpa3yb.png" width="280">

```sh
NEXT_PUBLIC_HOLODEX=YOUR_API_KEY
```

Run 'npm run build' in your terminal from the repo directory.

```sh
npm run build
```

[Now add the extension to your Chrome browser.](https://www.youtube.com/watch?v=oswjtLwCUqg)
