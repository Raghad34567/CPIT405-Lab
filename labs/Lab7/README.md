# Lab 7 — Asynchronous JavaScript (Ajax)

This lab implements Unsplash photo search with all three required approaches:
- XMLHttpRequest (XHR)
- Fetch with Promises (`.then()` / `.catch()`)
- Fetch with `async` / `await`

It also creates photo cards using the DOM API and supports the Enter key.

## Setup
1. Visit https://unsplash.com/developers and create an Unsplash application.
2. Copy its **Access Key** (NOT its Secret Key).
3. Open `index.html` with VS Code Live Server (or run a local HTTP server).
4. Paste your Access Key in the page's password field. It stays only in the current page session and is not saved.
5. Search for `Makkah`, choose each of the three search buttons, and check the images.

## Postman test
- Method: `GET`
- URL: `https://api.unsplash.com/search/photos?query=Makkah&per_page=8`
- Headers: `Authorization: Client-ID YOUR_ACCESS_KEY` and `Accept-Version: v1`
- Expected: JSON containing a `results` array.

## Publish
Push `index.html`, `styles.css`, `script.js`, and optionally this README to your GitHub repository. Enable **Settings → Pages → Deploy from a branch → main → /(root)**. Submit the published URL.

## Important API key/security note
This is a browser-based learning exercise. Do not hardcode or commit credentials to GitHub. The user's supplied Access Key is sent to Unsplash from their browser, so it is visible in browser network tools. Do not use a secret key here. For a production/public application with your own single app-wide credentials, follow Unsplash's current API guidelines and keep credentials server-side behind a proxy where appropriate. Even for educational use, follow attribution and image hotlinking requirements.

No key or real API response is bundled with this lab. Live Unsplash requests must be tested with a valid key and internet connection.
