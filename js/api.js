var base_url = 'https://api.football-data.org/';
var matchId = [];

function status(response) {
	if (response.status !== 200) {
		console.log('Error : ' + response.status);
		// Method reject() akan membuat blok catch terpanggil
		return Promise.reject(new Error(response.statusText));
	} else {
		// Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
		return Promise.resolve(response);
	}
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
	return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
	// Parameter error berasal dari Promise.reject()
	console.log('Error : ' + error);
}

const fetchApi = function(url) {
	return fetch(url, {
		method: 'GET',
		headers: {
			'X-Auth-Token': '2486d3040f94454ab97d79626fc1c7f6'
		}
	});
};

function setRonaldoData(data) {
	var about = '';
	about += `<div class="row">
	<div class="col s12 m8 offset-m2">
	  <div class="card">
		<div class="card-image">
		  <img src="../assets/ronaldo.png">
		  <span class="card-title">${data.name}</span>
		</div>
		<div class="card-content">
			<div class="divider"></div>
			<div class="section">
				<h6>Date of Birth : </h6>
				<p>${data.dateOfBirth}</p>
			</div>
			<div class="divider"></div>
			<div class="section">
				<h6>Country of Birth : </h6>
				<p>${data.countryOfBirth}</p>
			</div>
			<div class="divider"></div>
			<div class="section">
				<h6>Nationality : </h6>
				<p>${data.nationality}</p>
			</div>
			<div class="divider"></div>
			<div class="section">
				<h6>Position : </h6>
				<p>${data.position}</p>
			</div>
			<div class="divider"></div>
		</div>
		<div class="card-action">
		  <a href="https://www.cristianoronaldo.com/" target="_blank">This is a link</a>
		</div>
	  </div>
	</div>
  </div>
		 `;
	document.querySelector('.about-content').innerHTML = about;
	console.log('asqwe');
}

function getRonaldoData() {
	console.log('asd');
	if ('caches' in window) {
		caches.match(base_url + 'v2/players/44').then(function(response) {
			if (response) {
				response.json().then((data) => {
					setRonaldoData(data);
				});
			}
		});
	}

	fetchApi(base_url + 'v2/players/44')
		.then(status)
		.then(json)
		.then((data) => {
			// Objek/array JavaScript dari response.json() masuk lewat data.
			setRonaldoData(data);
		})
		.catch(error);
}

function setRonaldoMatches(data) {
	var matches = '';
	data.matches.forEach((match) => {
		var date = match.utcDate.slice(0, 9);
		matches += `<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="card">
				<div class="col s3 offset-s9" style="position:absoulute; margin-top:30px;">
				<button class="waves-effect waves-light btn" id="save-${match.id}" onClick="saveMatch('${match.id}', '${match
			.competition.name}','${date}','${match.homeTeam.name}','${match.awayTeam.name}','${match.score.fullTime
			.homeTeam}','${match.score.fullTime.awayTeam}')">Save</button></div>
					<div class="card-content">
					<h5>${match.competition.name}</h5>
					<p>${date}</p>
					<div class="row">
						<div class="col s5">${match.homeTeam.name}</div>
						<div class="col s2">VS</div>
						<div class="col s5">${match.awayTeam.name}</div>
						<div class="col s6">${match.score.fullTime.homeTeam}</div>
						<div class="col s3 offset-s1">${match.score.fullTime.awayTeam}</div>
					</div>
					</div>
				</div>
			</div>
		</div>`;
	});
	document.querySelector('.matches-content').innerHTML = matches;
}

function getRonaldoMatches() {
	if ('caches' in window) {
		caches.match(base_url + 'v2/players/44/matches?status=FINISHED&limit=10').then(function(response) {
			if (response) {
				response.json().then((data) => {
					setRonaldoMatches(data);
				});
			}
		});
	}
	fetchApi(base_url + 'v2/players/44/matches?status=FINISHED&limit=10')
		.then(status)
		.then(json)
		.then(function(data) {
			// Objek/array JavaScript dari response.json() masuk lewat data.
			setRonaldoMatches(data);
		})
		.catch(error);
}

function getFavoriteMatches() {
	getAll().then((data) => {
		// Menyusun komponen card artikel secara dinamis
		var favorite = '';
		data.forEach((match) => {
			favorite += `<div class="row">
						<div class="col s12 m6 offset-m3">
							<div class="card">
							<div class="col s3 offset-s9" style="position:absoulute; margin-top:30px;">
							<button class="waves-effect waves-light btn" onClick="deleteMatch('${match.match_id}')">Delete</button></div>
								<div class="card-content">
								<h5>${match.match_name}</h5>
								<p>${match.match_date}</p>
								<div class="row">
									<div class="col s5">${match.homeTeam}</div>
									<div class="col s2">VS</div>
									<div class="col s5">${match.awayTeam}</div>
									<div class="col s6">${match.homeScore}</div>
									<div class="col s3 offset-s1">${match.awayScore}</div>
								</div>
								</div>
							</div>
						</div>
					</div>`;
		});
		document.querySelector('.favorite-content').innerHTML = favorite;
	});
}
