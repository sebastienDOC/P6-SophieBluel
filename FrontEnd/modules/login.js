const loginButton = document.getElementById("login");

loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const loginErrorMsg = document.getElementById("login-error-msg");

    if (email === "sophie.bluel@test.tld" && password === "S0phie") {
        alert ("You have successfully logged in.");
        window.location = "./index.html"; 
    } else {
        location.reload()
        loginErrorMsg.style.opacity = 1;
    }
})