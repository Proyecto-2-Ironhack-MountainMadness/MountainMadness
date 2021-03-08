function addListeners() {
    const loginButton = document.getElementById("login-button")
    if(loginButton) {
        loginButton.onclick = function() {
            const loginContainer = document.getElementById("login-display");
            loginContainer.style.display = "block";
        }
    }
}
function hidecard() {
    const hideSpan = document.getElementById("hide-login-close-icon")
    if(hideSpan) {
        hideSpan.onclick = function() {
            const loginContainer = document.getElementById("login-display");
            loginContainer.style.display = "none";
        }
    }
}


window.onload = function() {
    addListeners();
    hidecard();
}
