const PRE_CACHE="precache-v1",RUNTIME_CACHE="runtime",HASH_CACHE="hash",CLOUDFLARE_WORKER_HOST="https://ntsd.dev",PRE_CACHE_URLS=["./","./assets/css/style.css","./img/icon-min.svg","https://cdn.jsdelivr.net/npm/anchor-js@4.3.1/anchor.min.js","https://cdn.jsdelivr.net/npm/scrollnav@3.0.1/dist/scrollnav.min.umd.js","https://cdn.jsdelivr.net/npm/wordcloud@1.2.2/src/wordcloud2.min.js","https://giscus.app/client.js","https://giscus.app/js/iframeResizer.min.js"],HOSTNAME_WHITELIST=[self.location.hostname,"cdn.jsdelivr.net","giscus.app"];function fetchAndCache(n){return caches.open(RUNTIME_CACHE).then(t=>fetch(n).then(e=>t.put(n,e.clone()).then(()=>e)))}function endsWithAny(e,t){for(var n of e)if(t.endsWith(n))return!0;return!1}self.addEventListener("install",e=>{e.waitUntil(caches.open(PRE_CACHE).then(e=>e.addAll(PRE_CACHE_URLS)).then(self.skipWaiting()))}),self.addEventListener("activate",e=>{const t=[PRE_CACHE,RUNTIME_CACHE,HASH_CACHE];e.waitUntil(caches.keys().then(e=>e.filter(e=>!t.includes(e))).then(e=>Promise.all(e.map(e=>caches.delete(e)))).then(()=>self.clients.claim()))}),self.addEventListener("fetch",i=>{let{pathname:a,hostname:e}=new URL(i.request.url),t=!1;-1<HOSTNAME_WHITELIST.indexOf(e)&&i.respondWith(caches.match(i.request).then(e=>e?(t=!0,e):fetchAndCache(i.request))),setTimeout(()=>{if(t&&i.request.url.startsWith(self.location.origin)){if(!endsWithAny(["/",".css",".js"],a))return;a.endsWith("/")&&(a+="index.html");const h=new Request(`${CLOUDFLARE_WORKER_HOST}/cache-bust${a}`,{mode:"cors"});caches.match(h).then(c=>fetch(h).then(async e=>{const t=e.clone();var n,s=await e.text();return""==s?console.log(`hash not found ${a}`):(!c||s!==(n=await c.text())&&(console.log(`cache not matched ${a} ${n} ${s} refetch`),fetchAndCache(i.request)),caches.open(HASH_CACHE).then(e=>{e.put(h,t)})),e}).catch(e=>{console.error(e)}))}},1e3)});