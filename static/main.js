let verify = false;
let userdata = []
let userexist = document.getElementById("exist_user");
const checkValidation = () => {
    verify = false;
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)+$/
    const regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Email Validation
    let text = document.getElementById('em_err');
    text.innerText = regEmail.test(email) ? "Email Id is Valid" : "Email Id is Invalid!";
    // Password Validation
    let p_text = document.getElementById("pass_err");
    p_text.innerText = regPassword.test(password) ? "Password is Correct" : "Please! Provide the valid password";
    if(regPassword.test(password) && regEmail.test(email)){
        document.getElementById("submit").disabled = false;
    }
}

const register = () => {
    userexist.innerText = "";
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!verify || username == "" || email == "" || password == ""){
        userexist.innerText = "Please fill the form properly!";
        return;
    }
    const user = {
        username, email, password
    }
    let userdata = JSON.parse(localStorage.getItem('userdata'));
    for (storeuser of userdata){
        if(storeuser.email == email){
            userexist.innerText = "User is Already Exists!";
            return;
        }
    }
    userdata.push(user)
    localStorage.setItem('userdata', JSON.stringify(userdata))
    userexist.innerText = "User is Successfully Registration!";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("pass_err").innerText = "";
    document.getElementById('em_err').innerText = "";
    location.href = "/";
}

const loginnow = () => {
    if(sessionStorage.getItem("loggeduser")){
        document.getElementById("user_status").innerText = "User has been already login!";
        return;
    }
    document.getElementById("user_status").innerText = "";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let userdata = JSON.parse(localStorage.getItem('userdata'));
    for (storeuser of userdata){
        if(storeuser.email == email){
            if(storeuser.password == password){
                document.getElementById("user_status").innerText = "User is Successfully Login";
                sessionStorage.setItem("loggeduser", storeuser.username)
                location.href = "/";
            }else{
                document.getElementById("user_status").innerText = "Password Incorrect, Provide valid password!"
            }
        }else{
            document.getElementById("user_status").innerText = "User is not exist to the database"
        }
    }
}