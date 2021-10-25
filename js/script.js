/*
const img = document.getElementById('img');

fetch('https://api.thecatapi.com/v1/images/search')
	.then((res) => {
        console.log(res);
        if(res.ok){
            res.json().then(data => {
                img.src = data[0].url
            })
        }else{
            document.getElementById('erreur').innerHTML = "Erreur du chargement de l'API";
        }
    })

*/

function updatemenu() {
    if (document.getElementById('responsive-menu').checked == true) {
      document.getElementById('menu').style.borderBottomRightRadius = '0';
      document.getElementById('menu').style.borderBottomLeftRadius = '0';
    }else{
      document.getElementById('menu').style.borderRadius = '10px';
    }
  }

fetch('https://reqres.in/api/users')
.then(res => console.log(res.json()))