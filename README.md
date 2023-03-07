# Liver ![version](https://img.shields.io/badge/Version-v0.0.2-pink?style=for-the-badge&logo)

<a><img align="right" src="https://i.imgur.com/F9qenDY.png"></a>

### Check if you favorite VTuber is live!

Liver is a chrome extension powered by Holodex API that lets you quickly check if your favorite Liver is streaming.
Liver is designed to be a fast and simple way to check Livers stream status.

You can get it here: Link

## Demo

_Insert video here_

## Images

<img src="https://i.imgur.com/FTHCArK.png" width="280"><img src="https://i.imgur.com/wLZK69d.png" width="280">
<img src="https://i.imgur.com/RViLUqa.png" width="280"><img src="https://i.imgur.com/rZykb4w.png" width="280">

<br />

## Technologies used

-NextJS \
-TypeScript \
-TailwindCSS \
-Chrome Storage API

<br />

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

```sh
NEXT_PUBLIC_HOLODEX=YOUR_API_KEY
```

Run 'npm run build' in your terminal from the repo directory.

```sh
npm run build
```

[Now add the extension to your Chrome browser.](https://www.youtube.com/watch?v=oswjtLwCUqg)
