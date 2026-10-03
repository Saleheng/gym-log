# Home Gym Log

Installable offline training log. Static files only, no build step, no server code.

Files: `index.html` (the whole app), `manifest.webmanifest`, `sw.js` (offline cache), three icon PNGs.

All data stays in the browser storage of the device that runs it. Nothing is stored in this repo.

To ship an update: replace `index.html`, bump `VERSION` in `sw.js`, push.
