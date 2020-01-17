var webPush = require('web-push');

const vapidKeys = {
	publicKey: 'BCNcyxIqA6AzO5-apxS290HthRNSiaU3gnA1v1g1SYfQJ6TZg9o95bFzhq4qOCBVNiIWclii0YE1iyN-1zBspEw',
	privateKey: 'nlAN9R2i55lcmEKZfKWxmcu28MOuA4E0qOqH8eBXdN0'
};

webPush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);
var pushSubscription = {
	endpoint:
		'https://fcm.googleapis.com/fcm/send/cqMBS_dGhjg:APA91bGdW8pJPb2brtxwnva85GC5E3z5REYMhJHvWTdmE2sOkOzdKU1-vMxbUI0XghV_SMtuBRILdhokhSJW2xt-KvcnJCifw8BODSkd0HkhTSDFyUICN0lAOKyArklcwwWe1RZ7GJkE',
	keys: {
		p256dh: 'BCDf6+vD0ve0uK6bP2NHuzZqYJwmp4qkiCuHQDOJXrqnIoO3Nu9sZ/RHDsBBak7Yhmk3LWeISCJlkMWDl9bCm9g=',
		auth: 'tcK7/hKyhH/9SqHm/TDAtQ=='
	}
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
	gcmAPIKey: '359530860576',
	TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options).catch((err) => {
	console.log(err);
});
