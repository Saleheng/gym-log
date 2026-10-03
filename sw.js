// Home Gym Log service worker. Bump VERSION whenever index.html changes so tablets pick up the new build.
const VERSION = "gymlog-v13";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./media/mb_hang.jpg", "./media/wu_cardio.jpg", "./media/sw_runs.jpg", "./media/sw_swing.jpg", "./media/sw_lunge.jpg", "./media/sw_kick.jpg",
  "./media/pullup.jpg", "./media/inclinepress.jpg", "./media/dip.jpg", "./media/inclinerow.jpg", "./media/lateral.jpg", "./media/inclinecurl.jpg", "./media/kneeraise.jpg", "./media/chinup.jpg", "./media/flatpress.jpg", "./media/shoulderpress.jpg", "./media/row1arm.jpg", "./media/reardelt.jpg", "./media/skull.jpg", "./media/hammer.jpg", "./media/goblet.jpg", "./media/bulgarian.jpg", "./media/rdl.jpg", "./media/swing.jpg", "./media/calf.jpg", "./media/legraise.jpg", "./media/mb_catcow.jpg", "./media/mb_child.jpg", "./media/mb_hipflex.jpg", "./media/mb_ham.jpg", "./media/mb_glute.jpg", "./media/mb_chest.jpg"];

self.addEventListener("install", (event) => {
  // Fetch every file fresh, then wait. The page shows an update bar and tells this worker when to take over.
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL.map((url) => new Request(url, { cache: "reload" })))));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

// Serve this version from its own cache so the app opens offline and never mixes files from two versions.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((hit) =>
        hit || fetch(req).then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; })
      )
    )
  );
});
