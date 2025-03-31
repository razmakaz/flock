self.addEventListener('install', () => {
	console.log('Service Worker installed.');
	self.skipWaiting();
});

self.addEventListener('activate', () => {
	console.log('Service Worker activated.');
	self.clients.claim(); // Ensure it takes control immediately
});

self.addEventListener('fetch', (event) => {
	// Skip cross-origin requests if needed
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cached) => {
			if (cached) return cached;

			return fetch(event.request).catch((err) => {
				console.error('Fetch failed:', err);
				return new Response('Service unavailable', {
					status: 503,
					statusText: 'Offline or network error'
				});
			});
		})
	);
});
