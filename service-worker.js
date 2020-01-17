const CACHE_NAME = 'sub2v5';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/about.html',
	'/pages/favorite.html',
	'/pages/matches.html',
	'/css/materialize.min.css',
	'/css/materialize.css',
	'/css/toast.css',
	'/js/materialize.js',
	'/js/materialize.min.js',
	'/js/nav.js',
	'/js/api.js',
	'/js/db.js',
	'/js/idb.js',
	'/js/registersw.js',
	'/js/push.js',
	'/manifest.json',
	'/assets/cr192.png',
	'/assets/cr512.png',
	'/assets/ronaldo.png',
	'/assets/bg.png'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

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
