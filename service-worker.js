const CACHE_NAME = 'sub3';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
	{ url: '/', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/index.html', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/css/materialize.css', revision: '1' },
	{ url: '/css/toast.css', revision: '1' },
	{ url: '/js/materialize.js', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/registersw.js', revision: '1' },
	{ url: '/js/push.js', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/assets/cr192.png', revision: '1' },
	{ url: '/assets/cr512.png', revision: '1' },
	{ url: '/assets/ronaldo.png', revision: '1' },
	{ url: '/assets/bg.png', revision: '1' }
]);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'pages'
	})
);

self.addEventListener('fetch', function(event) {
	var base_url = 'https://api.football-data.org/';
	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function(cache) {
				return fetch(event.request).then(function(response) {
					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request).then(function(response) {
				return response || fetch(event.request);
			})
		);
	}
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('push', function(event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: './assets/ronaldo.png',
		vibrate: [ 100, 50, 100 ],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(self.registration.showNotification('Push Notification', options));
});
