self.addEventListener('install', () => {
	console.log('Service Worker installed.');
	self.skipWaiting();
});

self.addEventListener('activate', () => {
	console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((cached) => {
			return cached || fetch(event.request);
		})
	);
});
