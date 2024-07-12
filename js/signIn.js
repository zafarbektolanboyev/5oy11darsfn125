const form = document.querySelector("#form");
const username = document.querySelector("#username");
const password= document.querySelector("password");

function validate() {
    if(username.value < 3) {
        alert("Username must be more than 3 charakter");
        username.style.outlineColor = 'red';
        username.focus();
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

    const user = {
        username: username.value,
        password: password.value,
    }

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    }) 

    .then(res => res.json())
    .then(data => {
        if (data.it) {
            localStorage.setItem('token', data.accesToken);
            localStorage.setItem('user', JSON.stringify(data))
            window.location.assign("http://127.0.0.1:5500/index.html")
        }

        if (data.message == "User Not found.") {
            alert(data.message);
            username.focus();
            username.style.outlineColor = 'red';
        }

        if (data.message == "Invalid Password!") {
            alert(data.message);
            password.focus();
            password.style.outlineColor = 'red';
        }

    })
    .catch(err => {
        console.log(err);
    })
    .finally(function() {
        form.reset();
    })
})
