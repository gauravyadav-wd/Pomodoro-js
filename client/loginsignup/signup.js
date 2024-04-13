const loginContainer = document.querySelector(".login-container");
const signupForm = document.querySelector(".signup-form-element");
const formContainer = document.querySelector(".form-container");

const theme = localStorage.getItem("theme");

if (theme === "dark") {
  loginContainer.classList.add("mode2-login-container");
  formContainer.classList.add("mode2-form-container");
} else {
  loginContainer.classList.remove("mode2-login-container");
  formContainer.classList.remove("mode2-form-container");
}

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());

  try {
    const res = await fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.user) {
      alert("user created successfully");
    } else {
      alert("something went wrong");
    }
  } catch (err) {
    alert("something went wrong");
  }
});
