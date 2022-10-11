const PRE_CACHE="precache-v2",RUNTIME_CACHE="runtime",HASH_CACHE="hash",CLOUDFLARE_WORKER_HOST="https://ntsd.dev",PRE_CACHE_URLS=["./assets/css/style.css","./pwa/icons/icon-min.svg","https://giscus.app/client.js"],HOSTNAME_WHITELIST=[self.location.hostname,"cdn.jsdelivr.net","giscus.app"];function fetchAndCache(s){return caches.open(RUNTIME_CACHE).then(t=>fetch(s).then(e=>t.put(s,e.clone()).then(()=>e)))}self.addEventListener("install",e=>{e.waitUntil(caches.open(PRE_CACHE).then(e=>e.addAll(PRE_CACHE_URLS)).then(self.skipWaiting()))}),self.addEventListener("activate",e=>{const t=[PRE_CACHE,RUNTIME_CACHE,HASH_CACHE];e.waitUntil(caches.keys().then(e=>e.filter(e=>!t.includes(e))).then(e=>Promise.all(e.map(e=>caches.delete(e)))).then(()=>self.clients.claim()))}),self.addEventListener("fetch",t=>{var e=new URL(t.request.url)["hostname"];-1<HOSTNAME_WHITELIST.indexOf(e)&&t.respondWith(caches.match(t.request).then(e=>e||fetchAndCache(t.request)))});