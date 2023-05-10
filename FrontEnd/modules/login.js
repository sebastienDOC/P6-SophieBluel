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
        if (data.userId === 1) {
            window.location = "./index.html";
            let barre = document.getElementsByClassName('black_bar');
            barre.style.opacity = 1;
        } else {
            document.form.reset();
            loginErrorMsg.style.opacity = 1;
        }
    })
    .catch(function(error){
        console.error('Error:', error)
    }); 
});