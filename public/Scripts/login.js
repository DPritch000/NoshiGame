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

console.log("Sending login request with:", user)

fetchData("/login", user, "POST")
.then(data => {
    console.log("Login response:", data)
    if(!data.message){
        console.log("Login successful, redirecting...")
        setCurrentUser(data)
        // Use absolute path from root that works on all domains
        window.location.href = "/gamescreen.html"
    } else {
        console.log("Login failed with message:", data.message)
        let errorSection = document.getElementById("error")
        errorSection.innerText = data.message
    }
})
.catch(err => {
    console.log("Login error:", err)
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
  window.location.href = "/login.html"
}

