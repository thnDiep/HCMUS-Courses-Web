const name = document.querySelector(".formSignUp__user-name__input");
const email = document.querySelector(".formSignUp__user-email__input");
const pass = document.querySelector(".formSignUp__user-pass__input");
const rePass = document.querySelector(".formSignUp__user-repeatPass__input");
const btn = document.querySelector(".formSignUp__btn");
const reqMail = document.querySelector(".required-email");
const video = document.querySelector(".plyr__video");

const rEmail = document.querySelector(".required-email");
const rPass = document.querySelector(".required-pass");
const rRePass = document.querySelector(".required-repeatPass");
const rName = document.querySelector(".required-name");
const mailformat =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const nameformat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
const passformat = /^[A-Za-z]\w{5,14}$/;
video.playbackRate = 0.5;

// Xử lý các form khi blur + input
email.oninput = (e) => {
  rEmail.innerHTML = "";
};
email.onblur = (e) => {
  if (email.value.length === 0) {
    rEmail.innerHTML = "Please fill out this field";
  }
};
pass.oninput = (e) => {
  if (pass.value.length < 6) {
    rPass.innerHTML = "Password is too short...";
  } else if (pass.value.length > 15) {
    rPass.innerHTML = "Password is too long...";
  } else if (!pass.value.match(passformat)) {
    rPass.innerHTML = "Password must have letter in first...";
  } else {
    rPass.innerHTML = "";
  }
};
pass.onblur = (e) => {
  if (pass.value.length === 0) {
    rPass.innerHTML = "Please fill out this field";
  }
};
rePass.oninput = (e) => {
  rRePass.innerHTML = "";
};
rePass.onblur = (e) => {
  if (rePass.value.length === 0) {
    rRePass.innerHTML = "Please fill out this field";
  }
};
name.oninput = (e) => {
  rName.innerHTML = "";
};
name.onblur = (e) => {
  if (name.value.length === 0) {
    rName.innerHTML = "Please fill out this field";
  }
};

// Xử lý form validate
const submit = (e) => {
  if (email.value.length === 0) {
    rEmail.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Email is required";
    e.preventDefault();
  } else if (!email.value.match(mailformat)) {
    rEmail.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
    e.preventDefault();
  } else {
    rEmail.innerHTML = "";
  }

  if (pass.value.length === 0) {
    rPass.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Password is required";
    e.preventDefault();
  } else if (!pass.value.match(passformat)) {
    rPass.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
    e.preventDefault();
  } else {
    rPass.innerHTML = "";
  }

  if (rePass.value.length === 0) {
    rRePass.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Confirm password is required";
    e.preventDefault();
  } else if (!rePass.value.match(pass.value)) {
    rRePass.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> The password confirmation does not match.";
    e.preventDefault();
  } else {
    rRePass.innerHTML = "";
  }

  if (name.value.length === 0) {
    rName.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> User name is required";
    e.preventDefault();
  } else if (!name.value.match(nameformat)) {
    rName.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
    e.preventDefault();
  } else {
    rName.innerHTML = "";
  }
};
email.oninput = () => {
  if (!email.value.match(mailformat)) {
    rEmail.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
  } else {
    rEmail.innerHTML = "";
  }
};
name.oninput = () => {
  if (!name.value.match(nameformat)) {
    rName.innerHTML =
      "<i class='fas fa-exclamation-circle required-icon' style='color:red'></i> Please match the requested format.";
  } else {
    rName.innerHTML = "";
  }
};
btn.addEventListener("click", submit);
