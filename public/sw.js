
const staticCacheName = 'static';
const dynamicCacheName = 'dynamic';
const ASSETS = [
    "/",
    "/index.html",
    "/src/index.css"

];
self.addEventListener('install', async (event) => {
    console.log('Service worker has been installed');
    // Кеширование
    const cache = await caches.open(staticCacheName);
    await cache.addAll(ASSETS);
});

self.addEventListener('activate', async (event) => {
    console.log('Service worker has been activated');
    // Удаление старого кеша
    const cachesKeysArr = await caches.keys();
    await Promise.all(cachesKeysArr.filter(key => key !== staticCacheName).map(key => caches.delete(key)));

});

self.addEventListener('fetch', (event) => {
    console.log('Service worker fetch', event.request.url);
    // Получение данных из кеша
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(response => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, response.clone())
                    return response;
                })
            });
        })
    )
});
