var dbPromise = idb.open('cristianoronaldo', 1, function(upgradeDb) {
	if (!upgradeDb.objectStoreNames.contains('matches')) {
		upgradeDb.createObjectStore('matches', { keyPath: 'match_id' });
	}
});

function saveMatch(match_id, match_name, match_date, homeTeam, awayTeam, homeScore, awayScore) {
	dbPromise
		.then(function(db) {
			var tx = db.transaction('matches', 'readwrite');
			var store = tx.objectStore('matches');
			var item = {
				match_id: match_id,
				match_name: match_name,
				match_date: match_date,
				homeTeam: homeTeam,
				awayTeam: awayTeam,
				homeScore: homeScore,
				awayScore: awayScore
			};
			store.put(item);
			return tx.complete;
		})
		.then(function() {
			console.log('Data berhasil disimpan.');
		});
	var button = document.getElementById(`save-${match_id}`);
	button.disabled = true;
	button.innerHTML = 'Saved';
}

function getAll() {
	return new Promise(function(resolve, reject) {
		dbPromise
			.then(function(db) {
				var tx = db.transaction('matches', 'readonly');
				var store = tx.objectStore('matches');
				return store.getAll();
			})
			.then(function(matches) {
				resolve(matches);
			});
	});
}

function deleteMatch(match_id) {
	dbPromise
		.then(function(db) {
			var tx = db.transaction('matches', 'readwrite');
			var store = tx.objectStore('matches');
			store.delete(match_id);
			return tx.complete;
		})
		.then(function() {
			M.toast({ html: 'Data Deleted !!', displayLength: 1000 });
			getFavoriteMatches();
		});
}
