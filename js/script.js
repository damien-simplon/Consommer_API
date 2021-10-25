var url = 'https://reqres.in/api/users?';
fetch(url + new URLSearchParams({
    per_page : 12
})).then((res) => {
	console.log(res);
	if (res.ok) {
		res.json().then((data) => {
			data.data.forEach(element => {
                console.log(element);
            });
		});
	} else {
		console.log("Erreur du chargement de l'API");
	}
});