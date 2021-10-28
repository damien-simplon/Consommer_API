window.onload = function () {
	var functionGET = async function (url) {
		const requestGET = new Request(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const res = await fetch(requestGET);
		console.log(res);
		var liste = '';
		if (!res) {
			console.log('error');
		} else {
			if (res.ok) {
				var value = await res.json();
				console.log(value);
				liste = value.data;
				console.log(liste);
			}
		}
		return liste;
	};
	var functionPUT = function (url) {
		var datas = {
			id: document.getElementById('id').value,
			first_name: document.getElementById('first_name').value,
			last_name: document.getElementById('last_name').value,
			email: document.getElementById('email').value,
			avatar: document.getElementById('avatar').value,
		};

		var requestPUT = new Request(url, {
			method: 'PUT',
			body: JSON.stringify(datas),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		fetch(requestPUT).then((res) => {
			if (res.ok) {
				console.log(res);
				res.json().then((data) => {
					console.log(data);
				});
			} else {
				console.log('erreur');
			}
		});
	};
	var functionDELETE = function (url,id) {
		var datas = {
			id: id,
		};

		var requestPUT = new Request(url, {
			method: 'DELETE',
			body: JSON.stringify(datas),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		fetch(requestPUT).then((res) => {
			if (res.ok) {
				console.log(res);
			} else {
				console.log('erreur');
			}
		});
	};
	var functionPOST = function (event) {
		event.preventDefault();
		var datas = {
			first_name: document.getElementById('firstName').value,
			last_name: document.getElementById('lastName').value,
			email: document.getElementById('email').value,
			avatar: document.getElementById('avatar').value,
		};

		var requestPOST = new Request(url, {
			method: 'POST',
			body: JSON.stringify(datas),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		fetch(requestPOST).then((res) => {
			if (res.ok) {
				console.log(res);
				res.json().then((data) => {
					console.log(data);
				});
			} else {
				console.log('erreur');
			}
		});
	};
	var functionLOGIN = function (e) {
		e.preventDefault();
		var datas = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		var requestPOST = new Request(urlLogin, {
			method: 'POST',
			body: JSON.stringify(datas),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		fetch(requestPOST)
			.then((res) => {
				if (res.ok) {
					console.log(res);
					res.json().then((data) => {
						console.log(data);
						localStorage.setItem('token', data.token);
					});
				} else {
					console.log('erreur');
				}
			})
			.catch(function (error) {
				console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
			});
	};

	var url = 'https://reqres.in/api/users';
	var nb = 12;
	var urlGet = 'https://reqres.in/api/users?per_page=' + nb;
	var urlLogin = 'https://reqres.in/api/login';
	var main = document.getElementById('main');
	var form = document.getElementsByTagName('form').item(0);

	if (main && main.classList.contains('read')) {
		var liste = functionGET(urlGet);
		liste.then((list) => {
			for (let i = 0; i < list.length; i++) {
				var html = `
					<div id="${list[i].id}" class="card">
						<h2>${list[i].first_name} ${list[i].last_name}</h2>
						<img src="${list[i].avatar}" alt="Avatar de ${list[i].first_name} ${list[i].last_name}"/>
						<h3><a href="mailto:${list[i].email}">${list[i].email}</a></h3>
						<a href="./pages/edit.html?user=${list[i].id}">Modification</a>
						<a href="./pages/delete.html?user=${list[i].id}">Suppression</a>
					</div>
				`;
				main.insertAdjacentHTML('beforeend', html);
			}
		});
	}
	if (main && main.classList.contains('edit')) {
		var liste = functionGET(urlGet);
		liste.then((list) => {
			let searchParams = new URLSearchParams(window.location.search);
			if (searchParams.has('user')) {
				let param = searchParams.get('user') - 1;
				console.log(list[param].first_name);
				document.getElementById('id').setAttribute('value', list[param].id);
				document.getElementById('first_name').setAttribute('value', list[param].first_name);
				document.getElementById('last_name').setAttribute('value', list[param].last_name);
				document.getElementById('email').setAttribute('value', list[param].email);
				document.getElementById('avatar').setAttribute('value', list[param].avatar);
			} else {
				console.log('error');
			}
		});
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			functionPUT(url);
		});
	}
	if (main && main.classList.contains('delete')) {
		var liste = functionGET(urlGet);
		liste.then((list) => {
		let searchParams = new URLSearchParams(window.location.search);
			if (searchParams.has('user')) {
				var param = searchParams.get('user') - 1;
			}
			functionDELETE(url, list[param].id);
		});
	}
	if (main && main.classList.contains('create')) {
		functionCREATE(url);
	}
	if (main && main.classList.contains('login')) {
		functionLOGIN(urlLogin);
	}
	/*
	if (form) {
		if (form.classList.contains('login')) {
			form.addEventListener('submit', functionLOGIN);
		} else {
			form.addEventListener('submit', functionPOST);
		}
	}
	if (body) {
		if (body.classList.contains('edit')) {
			noForm = 1;
			functionGET(noForm);
			setTimeout(function () {
				var forms = document.getElementsByTagName('form');
				for (let item of forms) {
					item.addEventListener('submit', functionPUT);
				}
			}, 100);
		} else if (body.classList.contains('delete')) {
			noForm = 2;
			functionGET(noForm);
			setTimeout(function () {
				var cards = document.getElementsByClassName('card');
				for (let item of cards) {
					item.addEventListener('submit', functionDELETE);
				}
			}, 100);
		} else {
			functionGET(noForm);
		}
	}
	*/

	/*
		fetch(requestGET).then((res) => {
			if (res.ok) {
				console.log(res);
				res.json().then((data) => {
					console.log(data.data);
					var liste = data.data;
					
				});
			} else {
				console.log('erreur');
			}
		});
		console.log(liste);
		await liste;
		console.log(liste);
		fetch(
			url +
				new URLSearchParams({
					per_page: 12,
				}),
			{
				method: 'GET',
			}
		).then((res) => {
			console.log(res);
			if (res.ok) {
				res.json().then((data) => {
					data.data.forEach((element) => {
						//console.log(element);
						var html = ``;
						if (noForm == 0) {
							html = `
                                <div id="${element.id}" class="card">
                                    <h2>${element.first_name} ${element.last_name}</h2>
                                    <img src="${element.avatar}" alt="Avatar de ${element.first_name} ${element.last_name}"/>
                                    <h3><a href="mailto:${element.email}">${element.email}</a></h3>
                                </div>
                            `;
						}
						if (noForm == 1) {
							html = `
                                <form id="formData${element.id}" action="" method="put" class="card">
                                    <div id="formCard">
                                        <div class="formLine">
                                            <input type="hidden" name="id" id="id" value="${element.id}" required />
                                        </div>
                                        <div class="formLine">
                                            <label for="firstName">First name: </label>
                                            <input type="text" name="firstName" id="firstName" value="${element.first_name}" required />
                                        </div>
                                        <div class="formLine">
                                            <label for="lastName">Last name: </label>
                                            <input type="text" name="lastName" id="lastName" value="${element.last_name}" required />
                                        </div>
                                        <div class="formLine">
                                            <label for="email">Email: </label>
                                            <input type="email" name="email" id="email" value="${element.email}" required />
                                        </div>
                                        <div class="formLine">
                                            <label for="avatar">Choose a profile picture:</label>
                                            <input
                                                type="file"
                                                id="avatar"
                                                name="avatar"
                                                accept="image/png, image/jpeg"
                                                value="${element.avatar}"
                                            />
                                        </div>
                                        <div class="formLine">
                                            <input type="submit" value="Modification" />
                                        </div>
                                    </div>
                                </form>
                        `;
						}
						if (noForm == 2) {
							html = `
								<form id="formData${element.id}" action="" method="put" class="card">
									<div class="formLine">
										<input type="hidden" name="id" id="id" value="${element.id}" required />
									</div>
									<h2>${element.first_name} ${element.last_name}</h2>
									<img src="${element.avatar}" alt="Avatar de ${element.first_name} ${element.last_name}"/>
									<h3><a href="mailto:${element.email}">${element.email}</a></h3>
									<div class="formLine">
										<input type="submit" value="Suppression" />
									</div>
                                </form>
							`;
						}
						body.insertAdjacentHTML('beforeend', html);
					});
				});
			} else {
				console.log("Erreur du chargement de l'API");
			}
		});
		*/
};
