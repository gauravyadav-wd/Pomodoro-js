const allTasksContainer = document.querySelector(".all-tasks");

export const renderToBeDoneCards = function (tasks, addCardFunction) {
  document.querySelector(".all-tasks").innerHTML = "";

  let addButtonTemp = `<div class="card add-card-btn">+ Add Task</div>`;
  allTasksContainer.insertAdjacentHTML("beforeend", addButtonTemp);

  const addCardButton2 = document.querySelector(".add-card-btn");
  addCardButton2.addEventListener("click", addCardFunction);

  if (!tasks) return;

  let cardTemplate = "";
  tasks.forEach((task) => {
    // if (task.tasks.some((t) => t.isChecked)) return;
    if (task.isPerformed) return;

    let taskStr = "";
    task.tasks.forEach((t) => {
      taskStr += `<li>
        ${t.title} -<span class='timer-span'>${t.timer} min</span>
      </li>`;
    });

    cardTemplate += `<div class="task-1 card remaining-tasks-group">
    <h5 class="task-title">${task.title}</h5>
    <p>${task.desc}</p>
    <hr class="card-sep" />
    <h5>Tasks</h5>
    <!-- Map  this -->
    ${taskStr}
    <div class="total-time">${task.timer} min</div>
    <div class="start-timer">
      <a href='../timer/index.html?id=${task.id}' class="play-btn" data-task-id=${task.id}>
        <div class="time">${task.timer} mins</div>
        &nbsp; <span class="material-symbols-outlined play-btn-icon">
        play_arrow
        </span>
      </a>
    </div>
  </div>`;
  });

  allTasksContainer.insertAdjacentHTML("afterbegin", cardTemplate);
};

const displayNoCard = function () {
  let noTaskTemplate = '<div class="task-1  no-task-card">No tasks here</div>';
  allTasksContainer.insertAdjacentHTML("afterbegin", noTaskTemplate);
};

export const renderCompletedCards = function (tasks) {
  document.querySelector(".all-tasks").innerHTML = "";

  if (!tasks) {
    displayNoCard();
    return;
  }

  let cardTemplate = "";
  tasks.forEach((task) => {
    if (!task.tasks.every((t) => t.isChecked)) return;

    let taskStr = "";
    task.tasks.forEach(
      (t) =>
        (taskStr += `<li>
        ${t.title}
        <span class="timer-span">(${t.timer} min)</span>
        <span class="completed-task">
          -- completed in ${t.timeTookInSeconds} seconds
        </span>
      </li>`)
    );

    cardTemplate += `
    <div class="task-1 card completed-tasks-group">
      <h5 class="task-title">${task.title}</h5>
      <p>${task.desc}</p>
      <hr class="card-sep" />
      <h5>Tasks</h5>
      ${taskStr}
      <div class="total-time">${task.timer} min</div>
    </div>
    <!-- <div class="task-1 no-task-card">No tasks here</div> -->
  `;
  });

  if (!cardTemplate) {
    displayNoCard();
    return;
  }

  allTasksContainer.insertAdjacentHTML("afterbegin", cardTemplate);
};

export const renderIncompleteCards = function (tasks) {
  document.querySelector(".all-tasks").innerHTML = "";

  if (!tasks) {
    displayNoCard();
    return;
  }

  let cardTemplate = "";
  tasks.forEach((task) => {
    if (!task.isPerformed) return;
    if (task.tasks.every((t) => t.isChecked)) return;

    // if (!task.tasks.some((t) => t.isChecked)) return;

    let taskStr = "";
    task.tasks.forEach(
      (t) =>
        (taskStr += `<li>
        ${t.title}
        <span class="timer-span">(${t.timer} min)</span>
        <span class="completed-task">
          ${
            t.timeTookInSeconds
              ? `<span> -- completed in ${t.timeTookInSeconds} seconds </span>`
              : `<span class="not-completed-task"> -- not completed </span>`
          }
        </span>
      </li>`)
    );

    cardTemplate += `
    <div class="task-1 card incompleted-tasks-group">
      <h5 class="task-title">${task.title}</h5>
      <p>${task.desc}</p>
      <hr class="card-sep" />
      <h5>Tasks</h5>
      ${taskStr}
      <div class="total-time">${task.timer} min</div>
    </div>
    <!-- <div class="task-1  no-task-card">No tasks here</div> -->
    `;
  });

  if (!cardTemplate) {
    displayNoCard();
    return;
  }
  allTasksContainer.insertAdjacentHTML("afterbegin", cardTemplate);
};
