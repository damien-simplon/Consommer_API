var url = 'https://reqres.in/api/users?';
var body = document.getElementById('main');

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
				var html = `
                    <div class="card">
                        <h2>${element.first_name} ${element.last_name}</h2>
                        <img src="${element.avatar}" alt="Avatar de ${element.first_name} ${element.last_name}"/>
                        <h3><a href="mailto:${element.email}">${element.email}</a></h3>
                    </div>
                `;
				body.insertAdjacentHTML('beforeend', html);
			});
		});
	} else {
		console.log("Erreur du chargement de l'API");
	}
});