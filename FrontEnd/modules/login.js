let urlLogin = "http://localhost:5678/api/users/login";

async function getData(url) {
    return await fetch(url)
    .then((reponse) => reponse.json())
    .then(data => {
        return data
    });    
}

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const loginErrorMsg = document.getElementById("login-error-msg");

    if (email === "sophie.bluel@test.tld" && password === "S0phie") {
        getData(urlLogin);
        window.location = "./index.html";
        let test = document.getElementById('test8').innerHTML = 'Bonjour Sophie';
        console.log(test);
    } else {
        document.log.reset();
        loginErrorMsg.style.opacity = 1;
    }
})