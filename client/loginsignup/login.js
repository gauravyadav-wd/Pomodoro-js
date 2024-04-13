const loginContainer = document.querySelector(".login-container");
const loginForm = document.querySelector(".login-form");
const formContainer = document.querySelector(".form-container");

const theme = localStorage.getItem("theme");

if (theme === "dark") {
  loginContainer.classList.add("mode2-login-container");
  formContainer.classList.add("mode2-form-container");
} else {
  loginContainer.classList.remove("mode2-login-container");
  formContainer.classList.remove("mode2-form-container");
}

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.user) {
      localStorage.setItem("user", JSON.stringify(responseData.user));
      window.location.href = `http://127.0.0.1:5500/client/homepage/index.html`;
    } else {
      alert("user does not exists");
    }
  } catch (err) {
    alert("something went wrong");
  }
});
