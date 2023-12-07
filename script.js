const accountContainer = document.getElementById("create-account-container")
const loginContainer = document.getElementById("login-container")



function login() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    var username = usernameInput.value;
    var password = passwordInput.value;

    // Check if the provided username and password match
    if (checkCredentials(username, password)) {
       
        loginContainer.style.display = 'none';
        
    } else {
        
        accountContainer.style.display = 'block';
        loginContainer.style.display = "none";
    }
}

function createAccount() {
    var newUsernameInput = document.getElementById('new-username');
    var newPasswordInput = document.getElementById('new-password');

    var newUsername = newUsernameInput.value;
    var newPassword = newPasswordInput.value;

    // Check if the username already exists
    if (localStorage.getItem(newUsername)) {
        alert('Username already exists. Please choose a different one.');
    } else {
        // Save the new account in localStorage
        localStorage.setItem(newUsername, newPassword);
        alert('Account created successfully! You can now log in.');
        
    }
}

function checkCredentials(username, password) {
    // Check if the provided username and password match any in localStorage
    return localStorage.getItem(username) === password;
}