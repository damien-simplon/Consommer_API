window.onload = function () {
	var url = 'https://reqres.in/api/users?';
	var body = document.getElementById('main');

	var functionGET = function (noForm) {
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
	var functionPUT = function (e) {
		e.preventDefault();
		var datas = {
			id: e.target[0].value,
			first_name: e.target[1].value,
			last_name: e.target[2].value,
			email: e.target[3].value,
			avatar: e.target[4].value,
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
	var functionDELETE = function (e) {
		e.preventDefault();
		console.log(e.target[0]);
		var datas = {
			id: e.target[0].value,
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

	var noForm = 0;

	var form = document.getElementById('formData');
	if (form) {
		form.addEventListener('submit', functionPOST);
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
};
