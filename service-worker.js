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

workbox.routing.registerRoute(
	/^https:\/\/api\.football-data\.org/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'api-football'
	})
);

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
