const timersContainer = document.querySelector(".timers-container");

export const renderConfirmModal = function (
  singleTask,
  selectedElement,
  breakpoint,
  task,
  totalTasksTime,
  switchToBreakTimer
) {
  const modalTemplate = `<div class="todo modal small-modal">
    <h2>Are you sure ?</h2>
    <hr />
    <p>Have you completed ${singleTask.title} ?</p>
    <button class="summary-modal-btn">Yes</button>
    <button class="summary-modal-btn">No</button>
  </div>
  <div class="overlay"></div>`;

  timersContainer.insertAdjacentHTML("beforeend", modalTemplate);
  const confirmModalButtons = document.querySelectorAll(".summary-modal-btn");

  confirmModalButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      document.querySelector(".modal").remove();
      document.querySelector(".overlay").remove();
      if (e.target.textContent.trim() === "Yes") {
        // changing unchecked button to checked
        selectedElement.textContent = "radio_button_checked";
        selectedElement.classList.remove("unchecked-btn");
        selectedElement.style.pointerEvents = "none";

        const timeConsumedForTask =
          breakpoint.breakpoint -
          (totalTasksTime.min * 60 + totalTasksTime.sec);

        breakpoint.breakpoint = breakpoint.breakpoint - timeConsumedForTask;

        const p = `<p>Completed in ${timeConsumedForTask} Secs</p>`;

        selectedElement
          .closest(".timer-task-card")
          .insertAdjacentHTML("beforeend", p);

        const newTasks = task.tasks.map((t) => {
          if (t.id === singleTask.id) {
            return {
              ...t,
              isChecked: true,
              timeTookInSeconds: timeConsumedForTask,
            };
          }
          return t;
        });
        task.tasks = newTasks;
        const isEveryChecked = task.tasks.every((t) => t?.isChecked);

        if (isEveryChecked) {
          switchToBreakTimer();
        }
      }
    });
  });
};

export const renderFinishModal = function (finishAndSaveEverything) {
  const finishModalTemplate = `
<div class="todo modal small-modal">
  <h2>Are you sure ?</h2>
  <hr />
  <p>Finish Break ?</p>
  <button class="summary-modal-btn">Yes</button>
  <button class="summary-modal-btn">No</button>
</div>
<div class="overlay"></div>
`;
  timersContainer.insertAdjacentHTML("beforeend", finishModalTemplate);
  const finishModalButtons = document.querySelectorAll(".summary-modal-btn");

  finishModalButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (e.target.textContent.trim() === "No") {
        e.target.closest(".modal").remove();
        document.querySelector(".overlay").remove();
      } else {
        finishAndSaveEverything();
      }
    });
  });
};

export const renderBreakEndModal = function (
  finishAndSaveEverything,
  summaryTemplate
) {
  const finishModalTemplate = `
  <div class="todo modal small-modal">
  <h2>Break Ended</h2>
  <hr />
  <ul class="model-ul">
   ${summaryTemplate}
  </ul>
  <button class="summary-modal-btn">Go Home</button>
  </div>
  <div class="overlay"></div>

`;
  timersContainer.insertAdjacentHTML("beforeend", finishModalTemplate);

  document
    .querySelector(".summary-modal-btn")
    .addEventListener("click", finishAndSaveEverything);
};
