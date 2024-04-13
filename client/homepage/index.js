const containerEl = document.querySelector(".container");
const addCardButton = document.querySelector(".add-task-side-btn");
const todoModal = document.querySelector(".todo");
const todoModalOverlay = document.querySelector(".overlay");
const tabButtonContainer = document.querySelector(".btn-group");
const tabButtons = document.querySelectorAll(".tab-btn");
const tasksForm = document.querySelector(".tasks-form");
const addSingleTaskButton = document.querySelector(".add-single-task");
const todoUl = document.querySelector(".todo-ul");
const addTaskInput = document.querySelector(".add-task-input");
const logoutButton = document.querySelector(".logout-button");
const switchMode = document.querySelector(".switch-mode");
const themeText = document.querySelector(".logo-container p");

import {
  renderToBeDoneCards,
  renderCompletedCards,
  renderIncompleteCards,
} from "./renders/cardTabs.js";

const showAddTodos = function () {
  todoModal.style.visibility = "visible";
  todoModalOverlay.style.visibility = "visible";
};

const tasks = JSON.parse(localStorage.getItem("tasks"));
const user = JSON.parse(localStorage.getItem("user"));
const theme = localStorage.getItem("theme");

// INITIALIZING SCREEN
const renderInit = function () {
  renderToBeDoneCards(tasks, showAddTodos);
  if (theme === "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }

  if (!user) return;

  logoutButton.textContent = "Logout";
  // render user details
  document.querySelector(".user h3").textContent = user.user;
  document.querySelector(".user p").textContent = "@" + user.profession;
  document.querySelector(".img-box img").src =
    "../assets/" + user.image + ".jpg";

  addCardButton.addEventListener("click", showAddTodos);
};
renderInit();

// TABS RENDER
tabButtonContainer.addEventListener("click", function (e) {
  tabButtons.forEach((e) => e.classList.remove("active-tab"));
  e.target.classList.add(`active-tab`);

  if (e.target.textContent.trim() === "Completed") {
    renderCompletedCards(tasks);
  } else if (e.target.textContent.trim() === "Incomplete") {
    renderIncompleteCards(tasks);
  } else if (e.target.textContent.trim() === "To Be Done") {
    renderToBeDoneCards(tasks, showAddTodos);
  }
});

// CLEAN TASKS FORM
const cleanTodoForm = function () {
  document.querySelector(".add-task-title").value = "";
  document.querySelector(".task-desc textarea").value = "";
  document.querySelector(".break-time").value = "";
  addTaskInput.value = "";
  todoUl.innerHTML = "";
};

todoModalOverlay.addEventListener("click", function () {
  todoModal.style.visibility = "hidden";
  todoModalOverlay.style.visibility = "hidden";
  cleanTodoForm();
});

// SUBMIT TASKS FORM

tasksForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const listItemTask = document.querySelectorAll(".list-item");
  const tasks = [];

  listItemTask.forEach((li) => {
    console.log(li.querySelector("div li").childNodes[0].nodeValue.trim());
    const title = li.querySelector("div li").childNodes[0].nodeValue.trim();
    const timer = li.querySelector(".timer-input").value.trim();
    tasks.push({ title: title.slice(0, -1).trim(), timer, id: Math.random() });
  });

  if (!tasks.length) return alert("please fill at least one task");

  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());

  const totalTimer = tasks.reduce((acc, cur) => Number(cur.timer) + acc, 0);

  const oldTasks = localStorage.getItem("tasks");
  let updatedTasks;
  if (oldTasks) {
    updatedTasks = JSON.parse(oldTasks);
    updatedTasks.push({ ...data, tasks, id: Math.random(), timer: totalTimer });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  } else {
    localStorage.setItem(
      "tasks",
      JSON.stringify([{ ...data, tasks, id: Math.random(), timer: totalTimer }])
    );
  }
  cleanTodoForm();

  todoModal.style.visibility = "hidden";
  todoModalOverlay.style.visibility = "hidden";
  if (updatedTasks) renderToBeDoneCards(updatedTasks, showAddTodos);
  else {
    renderToBeDoneCards(
      [{ ...data, tasks, id: Math.random(), timer: totalTimer }],
      showAddTodos
    );
  }
});

// ADD TASK IN TASKS FORM

addSingleTaskButton.addEventListener("click", function () {
  let todoTemplate = `<div class="list-item">
  <div>
    <li>
      ${addTaskInput.value}
      <span class="material-symbols-outlined delete-icon">
      delete_forever
    </span>
    </li>
  </div>
  <input
    name="timer"
    class="timer-input"
    type="number"
    min="1"
    required
  />
</div>`;
  todoUl.insertAdjacentHTML("afterbegin", todoTemplate);

  addTaskInput.value = "";
  const deleteTask = function (e) {
    console.log("deleting", e.target.closest(".list-item"));
    e.target.closest(".list-item").remove();
  };

  todoUl.firstElementChild
    .querySelector(".delete-icon")
    .addEventListener("click", deleteTask);
});

// THEME

// function declarations to use above

function setDarkTheme() {
  switchMode.querySelector("span").textContent = "dark_mode";
  themeText.textContent = "Dark";
  containerEl.classList.add("mode2-container");

  // modal style
  todoModal.classList.add("mode2-modal");
  localStorage.setItem("theme", "dark");
}

function setLightTheme() {
  switchMode.querySelector("span").textContent = "light_mode";
  themeText.textContent = "Light";
  containerEl.classList.remove("mode2-container");

  // modal style
  todoModal.classList.remove("mode2-modal");

  localStorage.setItem("theme", "light");
}

switchMode.addEventListener("click", function (e) {
  if (this.querySelector("span").textContent.trim() === "light_mode") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});

// LOGOUT

logoutButton.addEventListener("click", function (e) {
  localStorage.removeItem("user");
  window.location.href = "http://127.0.0.1:5500/client/loginsignup/login.html";
});
