const accountContainer = document.getElementById("create-account-container");
const loginContainer = document.getElementById("login-container");
const goToMake = document.getElementById("goToMake");
const goToLogin = document.getElementById("goToLogin");
const gpaCalc = document.getElementById("calculator");
const classesList = document.getElementById("classesContainer");
const gpaResults = document.getElementById("gpaResults");
const selectGPA = document.getElementById("selectGPA");
const selectWest = document.getElementById("selectWest");
const calcButton = document.getElementById("calcButton");
const chessButton = document.getElementById("chessButton");
const chessScreen = document.getElementById("chessScreen");
const buttonGoSelect = document.getElementById("buttonGoToSelect");
const resetClasses = document.getElementById("removeClasses");

function login() {
  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");

  var username = usernameInput.value;
  var password = passwordInput.value;

  // Check if the provided username and password match
  if (checkCredentials(username, password)) {
    loginContainer.style.display = "none";
    accountContainer.style.display = "none";
    selectWest.style.display = "block";
    selectGPA.style.display = "block";
  } else {
    alert("Incorrect Password or Username, Please try again.");
  }
}

function createAccount() {
  var newUsernameInput = document.getElementById("new-username");
  var newPasswordInput = document.getElementById("new-password");

  var newUsername = newUsernameInput.value;
  var newPassword = newPasswordInput.value;

  // Check if the username already exists
  if (localStorage.getItem(newUsername)) {
    alert("Username already exists. Please choose a different one.");
  } else {
    // Save the new account in localStorage
    localStorage.setItem(newUsername, newPassword);
    alert("Account created successfully! You can now log in.");
  }
}

function checkCredentials(username, password) {
  // Check if the provided username and password match any in localStorage
  return localStorage.getItem(username) === password;
}

goToMake.addEventListener("click", function () {
  loginContainer.style.display = "none";
  accountContainer.style.display = "block";
});
goToLogin.addEventListener("click", function () {
  accountContainer.style.display = "none";
  loginContainer.style.display = "block";
});
calcButton.addEventListener("click", function () {
  gpaCalc.style.display = "block";
  selectGPA.style.display = "none";
  selectWest.style.display = "none";
  classesList.style.display = "block";
  gpaResults.style.display = "block";
  buttonGoSelect.style.display = "block";
});
chessButton.addEventListener("click", function () {
  window.open((href = "index2.html"));
});
buttonGoSelect.addEventListener("click", function () {
  selectGPA.style.display = "block";
  selectWest.style.display = "block";

  gpaResults.style.display = "none";
  gpaCalc.style.display = "none";
  classesList.style.display = "none";
  buttonGoSelect.style.display = "none";
});

let classes = [];

function addClass() {
  const className = document.getElementById("className").value;
  const grade = document.getElementById("grade").value;
  const weight = parseFloat(document.getElementById("weight").value);

  classes.push({ className, grade, weight });

  document.getElementById("className").value = "";
  document.getElementById("grade").value = "A";
  document.getElementById("weight").value = "1";
}

function calculateGPA() {
  let unweightedTotalPoints = 0;
  let weightedTotalPoints = 0;
  let totalCredits = 0;

  classes.forEach((c) => {
    const creditWeight = c.weight;
    const gradePoints = getGradePoints(c.grade);

    unweightedTotalPoints += gradePoints;
    weightedTotalPoints += gradePoints * creditWeight;

    totalCredits += creditWeight;
  });

  const unweightedGPA = unweightedTotalPoints / classes.length;
  const weightedGPA = weightedTotalPoints / totalCredits;

  displayGPAResults(unweightedGPA.toFixed(2), weightedGPA.toFixed(2));
}

function getGradePoints(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "B":
      return 3.0;
    case "C":
      return 2.0;
    case "D":
      return 1.0;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}

function displayGPAResults(unweightedGPA, weightedGPA) {
  const unweightedGPAElement = document.getElementById("unweightedGPA");
  const weightedGPAElement = document.getElementById("weightedGPA");

  unweightedGPAElement.textContent = `Unweighted GPA: ${unweightedGPA}`;
  weightedGPAElement.textContent = `Weighted GPA: ${weightedGPA}`;
}

function displayClasses() {
  const classesList = document.getElementById("classesList");
  classesList.innerHTML = " ";

  classes.forEach((c) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${c.className}</strong> - Grade: ${
      c.grade
    }, Weight: ${getWeightLabel(c.weight)}`;
    classesList.appendChild(listItem);
  });
}

function getWeightLabel(weight) {
  switch (weight) {
    case 1.1:
      return "Honors";
    case 1.2:
      return "AP";
    default:
      return "Normal";
  }
}
// resetClasses.addEventListener('click', function(){
//   document.getElementById('classesList').remove();
// })
