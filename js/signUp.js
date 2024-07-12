const form = document.querySelector("#form");
const username = document.querySelector("#username");
const password= document.querySelector("password");
const email= document.querySelector("email");


function validate() {
    if(username.value < 3) {
        alert("Username must be more than 3 charakter");
        username.style.outlineColor = 'red';
        username.focus();
        return false;
    }

    if(email.value < 3) {
        alert("Email must be more than 3 charakter");
        email.style.outlineColor = 'red';
        email.focus();
        return false;
    }

    if(password.value < 3) {
        alert("Password must be more than 3 charakter");
        password.style.outlineColor = 'red';
        password.focus();
        return false;
    }

    return true;
}

form && form.addEventListener('submit', function(event) {
    event.preventDefault();
    const isValid = validate();

    if (!isValid) {
        return
    }

    const user = {
        username: username.value,
        email: email.value,
        password: password.value,
    }

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if(data.message == 'Failed! Username is already in use!') {
            alert(data.message)
        }

        if(data.message == 'Failed! Email is already in use!') {
            alert(data.message)
        }

        if(data.message == 'User registed successfully!') {
            window.location.assign('http://127.0.0.1:5500/signIn.html')
        }

    })     
    .catch(err => {
        console.log(err);
    })           
    .finally(function(){
        form.reset();
    })
})