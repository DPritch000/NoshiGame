import {fetchData} from "./main.js"



let loginForm = document.getElementById("loginForm")
if(loginForm) loginForm.addEventListener('submit', login)


function login(e){
e.preventDefault()

if(checkLogin() === true){
const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("pswd").value
}

fetchData("/login", user, "POST")
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


}

function checkLogin(){
    return true
}


// local storage functions
export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}
// example accessing userId for second entity
// let currentUser = getCurrentUser()
// let userId = currentUser.userId

export function removeCurrentUser() {
  localStorage.removeItem('user')
  window.location.href = "login.html"
}

