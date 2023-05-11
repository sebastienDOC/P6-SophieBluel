let urlLogin = "http://localhost:5678/api/users/login";
const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function(event) {
    event.preventDefault()
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        email:email,
        password:password,
    };

    fetch(urlLogin, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(function(response){ 
        return response.json()
    })
    .then(function(data){
        const loginErrorMsg = document.getElementById("login-error-msg");
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        let userId = localStorage.getItem('userId');
        let token = localStorage.getItem('token');
        // let barre = document.getElementsByClassName('black_bar');

        if (data.token === token) {
            window.location = "./index.html";
            console.log('UserId :', userId);
            console.log('Token :', token);

            // barre.style.opacity = 1;
        } else {
            document.form.reset();
            loginErrorMsg.style.opacity = 1;
        }
    })
    .catch(function(error){
        console.error('Error:', error)
    }); 
});