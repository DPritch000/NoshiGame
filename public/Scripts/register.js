import {fetchData} from "./main.js"
import { setCurrentUser } from "./login.js"

    //first access the form
    let registerForm = document.getElementById("registerForm")
    registerForm.addEventListener('submit', register) //event listener has two parameters

    console.log(registerForm)


function register(e){
    e.preventDefault() //stops page from refreshing from forms
   const  password = document.getElementById("pswd").value
   const confirmPassword = document.getElementById("confirmPswd").value

if(validPassword(password, confirmPassword)){


    console.log("Register function Ran!!!!!!!!!")

    const user = {
       username: document.getElementById("username").value,
       password: document.getElementById("pswd").value,
       name: document.getElementById("name").value
    
    }

    fetchData("/register", user, "POST")
    .then(data => {
    if(!data.message){
        console.log(data)
        setCurrentUser(data)
        window.location.href = "gamescreen.html"
    }
})
.catch(err => {
    let errorSection = document.getElementById("error")
    errorSection.innerText = err.message
})
    
}


else{
    console.log("Passwords Dont match")
}
}

function validPassword(password, confirmPassword){
    return password === confirmPassword
}

