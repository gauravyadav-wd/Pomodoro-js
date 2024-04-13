const taskMinutes = document.querySelector(".task-timer-container .min");
const taskSeconds = document.querySelector(".task-timer-container .sec");

const breakMinutes = document.querySelector(".break-timer-container .min");
const breakSeconds = document.querySelector(".break-timer-container .sec");

const startTimerButton = document.querySelector(".start-timer-btn");
const timerTasksCard = document.querySelector(".timer-tasks-card");
const timersContainer = document.querySelector(".timers-container");
const taskTimerContainer = document.querySelector(".task-timer-container");
const breakTimerContainer = document.querySelector(".break-timer-container");
const breakContent = document.querySelector(".break-content");
const finishButton = document.querySelector(".back-btn");
const totalTimer = document.querySelector(".taskgroup-timer");
const pauseTaskTimerButton = document.querySelector(".pause-timer-btn");
const summary = document.querySelector(".summary-ul");

import { renderGMNGame } from "./renders/global.js";
import {
  renderConfirmModal,
  renderFinishModal,
  renderBreakEndModal,
} from "./renders/modals.js";
import { renderSummary } from "./renders/global.js";

let uncheckedButton;

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get("id"));

let task = JSON.parse(localStorage.getItem("tasks")).find((t) => t.id === id);
const theme = localStorage.getItem("theme");

let totalTasksTime = { min: 0, sec: 0 };
let totalBreakTime = { min: 0, sec: 0 };
let summaryTemplate = "";
console.log(task);

// initializing screen
const renderInit = function () {
  totalBreakTime.min = task.breakTime;
  totalTasksTime.min = task.timer;

  //displaying data
  taskMinutes.textContent =
    totalTasksTime.min < 10 ? `0${totalTasksTime.min}` : totalTasksTime.min;

  breakMinutes.textContent =
    totalBreakTime.min < 10 ? `0${totalBreakTime.min}` : totalBreakTime.min;

  totalTimer.textContent = totalTasksTime.min + " Minutes";
  document.querySelector(".taskgroup-details h2").textContent = task.title;
  document.querySelector(".taskgroup-details p").textContent = task.desc;

  // setting theme
  if (theme === "dark") {
    timersContainer.classList.add("mode2-timers-container");
  } else {
    timersContainer.classList.remove("mode2-timers-container");
  }

  // rendering tasks
  let tasksHtml = "";
  task.tasks.forEach((task) => {
    tasksHtml =
      tasksHtml +
      ` <div class='task-list-item' >
          <li class='timer-task-card'>
            <span class='material-symbols-outlined unchecked-btn hidden' data-task-name=${task.title} data-task-id=${task.id}>
              radio_button_unchecked
            </span>
           ${task.title}
          </li>
          <p class='task-item-time'>${task.timer} min</p>
        </div>`;
  });

  timerTasksCard.insertAdjacentHTML("beforeend", tasksHtml);
  uncheckedButton = document.querySelectorAll(".unchecked-btn");
};

renderInit();

const renderTaskTime = function (min, sec) {
  taskMinutes.textContent = min < 10 ? `0${min}` : min;
  taskSeconds.textContent = sec < 10 ? `0${sec}` : sec;
};

const renderBreakTime = function (min, sec) {
  breakMinutes.textContent = min < 10 ? `0${min}` : min;
  breakSeconds.textContent = sec < 10 ? `0${sec}` : sec;
};

// starting task timer
let taskInterval;
startTimerButton.addEventListener("click", function () {
  taskInterval = setInterval(() => {
    if (totalTasksTime.min === 0 && totalTasksTime.sec === 0) {
      switchToBreakTimer();
      return clearInterval(taskInterval);
    }

    if (totalTasksTime.sec === 0) {
      totalTasksTime.min = totalTasksTime.min - 1;
      totalTasksTime.sec = 59;
    } else {
      totalTasksTime.sec = totalTasksTime.sec - 1;
    }

    renderTaskTime(totalTasksTime.min, totalTasksTime.sec);
  }, 1000);

  //displaying the task buttons
  uncheckedButton.forEach((button) => button.classList.remove("hidden"));

  //hidding the start button
  this.classList.add("hidden-no-display");
  taskTimerContainer.classList.add("active");

  //displaying the stop timer button
  pauseTaskTimerButton.classList.remove("hidden-no-display");
});

pauseTaskTimerButton.addEventListener("click", function () {
  this.classList.add("hidden-no-display");
  startTimerButton.classList.remove("hidden-no-display");
  clearInterval(taskInterval);
});

// selecting tasks
let breakpoint = { breakpoint: task.timer * 60 };
uncheckedButton.forEach((button) => {
  button.addEventListener("click", function (e) {
    const selectedTask = task.tasks.find((task) => {
      return task.id === Number(e.target.dataset.taskId);
    });
    renderConfirmModal(
      selectedTask,
      e.target,
      breakpoint,
      task,
      totalTasksTime,
      switchToBreakTimer
    );
  });
});

const finishAndSaveEverything = function () {
  console.log("finishing and saving everything");
  const updatedTasks = JSON.parse(localStorage.getItem("tasks")).map(
    (oldTask) => {
      if (oldTask.id === task.id) {
        return { ...task, isPerformed: true };
      }
      return oldTask;
    }
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  window.location.href = "http://127.0.0.1:5500/client/homepage/index.html";
};

let breakInterval;

// Switching to break timer
const switchToBreakTimer = function () {
  clearInterval(taskInterval);

  breakInterval = setInterval(() => {
    if (totalBreakTime.min === 0 && totalBreakTime.sec === 0) {
      renderBreakEndModal(finishAndSaveEverything, summaryTemplate);
      return clearInterval(breakInterval);
    }

    if (totalBreakTime.sec === 0) {
      totalBreakTime.min = totalBreakTime.min - 1;
      totalBreakTime.sec = 59;
    } else {
      totalBreakTime.sec = totalBreakTime.sec - 1;
    }
    renderBreakTime(totalBreakTime.min, totalBreakTime.sec);
  }, 1000);

  summaryTemplate = renderSummary(summary, task);

  taskTimerContainer.classList.remove("active");
  breakTimerContainer.classList.add("active");

  const gameButtons = document.querySelector(".game-btn-container");

  gameButtons.classList.remove("hidden");
  finishButton.classList.remove("hidden");

  pauseTaskTimerButton.classList.add("hidden-no-display");
  startTimerButton.classList.add("hidden-no-display");

  //disabling task buttons
  document
    .querySelectorAll(".unchecked-btn")
    .forEach((button) => button.classList.add("hidden"));

  // add break gif
  const restGifTemplate = `<img class='rest-img' width='200' src='../assets/break.gif' alt='image' />`;
  breakContent.insertAdjacentHTML("beforeend", restGifTemplate);

  const restBtn = document.querySelector(".game-btn2");
  restBtn.classList.add("active-game-btn");

  // game buttons functionality
  gameButtons.addEventListener("click", function (e) {
    if (e.target.textContent === "GMN" || e.target.textContent === "Rest") {
      restBtn.classList.remove("active-game-btn");
      document.querySelector(".game-btn1").classList.remove("active-game-btn");
      e.target.classList.add("active-game-btn");
      breakContent.innerHTML = "";

      if (e.target.textContent.trim() === "GMN") {
        renderGMNGame(breakContent);
      } else {
        breakContent.insertAdjacentHTML("beforeend", restGifTemplate);
      }
    }
  });

  finishButton.addEventListener("click", function () {
    renderFinishModal(finishAndSaveEverything);
  });
};
