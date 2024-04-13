import { gameScript } from "../GMNGame.js";

export const renderSummary = function (summaryEl, task) {
  let summaryTemplate = ``;
  task.tasks.map((task) => {
    console.log(task);
    summaryTemplate += ` 
    <div>
      <li>
      ${task.title}
      ${
        task.timeTookInSeconds
          ? `<span class="saved">Completed</span>
      <span> in ${task.timeTookInSeconds} Seconds </span>`
          : ` <span class="wasted">Not Completed </span>`
      }
      </li>
    </div>`;
  });

  summaryEl.insertAdjacentHTML("beforeend", summaryTemplate);
  return summaryTemplate;
};

export const renderGMNGame = function (breakContent) {
  const gameTemplate = `<div class="game-container">
  <header>
    <div class="top-heading">
      <h1>Guess My Number!</h1>
      <p class="between">(Between 1 and 20)</p>
      <button class="btn again">Again!</button>
    </div>
    <div class="number">?</div>
  </header>
  <main>
    <section class="left">
      <input type="number" class="guess" />
      <button class="btn check">Check!</button>
    </section>
    <section class="right">
      <p class="message">Start guessing...</p>
      <p class="label-score">
        💯 Score:
        <span class="score"> 10 </span>
      </p>
      <p class="label-highscore">
        🥇 Highscore:
        <span class="highscore"> 20 </span>
      </p>
    </section>
  </main>
</div> `;

  breakContent.insertAdjacentHTML("beforeend", gameTemplate);
  gameScript();
};
