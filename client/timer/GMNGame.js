"use strict";

// DOM ELEMENTS
export const gameScript = function () {
  const checkBtn = document.querySelector(".check");
  const againBtn = document.querySelector(".again");
  const guess = document.querySelector(".guess");
  const message = document.querySelector(".message");
  const number = document.querySelector(".number");
  const scoreEl = document.querySelector(".score");
  const highscoreEl = document.querySelector(".highscore");

  let isPlaying = true;
  let score = 20;
  let highscore = 0;
  let randomNum = Math.trunc(Math.random() * 20 + 1);
  // number.textContent = randomNum;

  checkBtn.addEventListener("click", function (e) {
    if (isPlaying) {
      if (randomNum > guess.value) {
        if (score > 1) {
          message.textContent = "too low...";
          score--;
        } else {
          message.textContent = "You lost...";
          score--;
        }
      } else if (randomNum < guess.value) {
        if (score > 1) {
          message.textContent = "too high...";
          score--;
        } else {
          message.textContent = "You lost...";
          score--;
        }
      } else {
        message.textContent = "Correct Number...";
        document.querySelector(".game-container").style.backgroundColor =
          "green";
        if (highscore < score) highscore = score;
        highscoreEl.textContent = highscore;
        isPlaying = false;
      }
      scoreEl.textContent = score;
    }
  });

  againBtn.addEventListener("click", function () {
    console.log("again clicked");
    isPlaying = true;
    score = 20;
    scoreEl.textContent = score;
    guess.value = "";
    randomNum = Math.trunc(Math.random() * 20 + 1);
    message.textContent = "Start Guessing";
    document.querySelector(".game-container").style.backgroundColor = "#2f2f2f";
  });
};
