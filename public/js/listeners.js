function addListeners() {
    const loginButton = document.getElementById("login-button")
    if(loginButton) {
        loginButton.onclick = function() {
            const signContainer = document.getElementById("signup-display");
            signContainer.style.display = "none";
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

function addsignListeners() {
    const signupButton = document.getElementById("signup-button")
       if(signupButton) {
        signupButton.onclick = function() {
            const loginContainer = document.getElementById("login-display");
            loginContainer.style.display = "none";
            const signContainer = document.getElementById("signup-display");
            signContainer.style.display = "block";
        }
    }
}

function hidecardsign() {
    const hideSpansign = document.getElementById("hide-sign-close-icon")
    if(hideSpansign) {
        hideSpansign.onclick = function() {
            const signContainer = document.getElementById("signup-display");
            signContainer.style.display = "none";
        }
    }
}



function searchListeners() {
  const filterButton = document.getElementById("filter-button");
  if (filterButton) {
    filterButton.onclick = function (event) {
      console.log("marcou");
      event.preventDefault();
      const filterWord = document.getElementById("filter-word");
      var filterWordValue = filterWord.value;
      window.location = `/tracks/list?title=${filterWordValue}`;
    };
  }
}


window.onload = function() {
    addListeners();
    hidecard();
    searchListeners();
    addsignListeners();
    hidecardsign();
}
