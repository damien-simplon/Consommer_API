var url = 'https://reqres.in/api/users?';

var functionPOST = function (event) {
	event.preventDefault();
	var datas = {
		first_name: document.getElementById('firstName').value,
		last_name: document.getElementById('lastName').value,
		email: document.getElementById('email').value,
		avatar: document.getElementById('avatar').value,
	};
	console.log(datas);
	var requestPOST = new Request(url, {
		method: 'POST',
		body: (JSON.stringify(datas)),
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

var form = document.getElementById('formData');

form.addEventListener('submit', functionPOST);
