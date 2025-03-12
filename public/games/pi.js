const pi = "31415926535897932384626433".split("");
let piPosition = 0;

// Elements
const gameContainer = document.getElementById("game-container");
const gameInfo = document.getElementById("game-info");

const startButton = document.getElementById("start-button");

const piContainer = document.getElementById("pi-container");
const piDigits = document.getElementById("pi-number");

const guessContainer = document.getElementById("guess-container");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");

const result = document.getElementById("result-message");

// Functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startGame = async () => {
  gameInfo.classList.add("opacity-0", "transition");
  startButton.classList.add("opacity-0", "transition");

  await delay(500);
  gameInfo.classList.add("hidden");
  startButton.classList.add("hidden");
  gameContainer.classList.add("h-[500px]", "transition-all");

  await delay(50);
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });

  piContainer.classList.remove("hidden");
  gameContainer.classList.add("justify-center", "items-center");
  await delay(500);
  piContainer.classList.replace("opacity-0", "opacity-full");

  await delay(100);

  // Start timer

  let countdown = 15;

  while (countdown > 0) {
    await delay(1000);
    countdown--;
    piDigits.textContent = `Tienes ${countdown} segundos para memorizar.`;
  }

  piContainer.classList.replace("opacity-full", "opacity-0");
  await delay(150);
  piContainer.classList.add("hidden");

  guessContainer.classList.remove("hidden");
  await delay(150);
  guessContainer.classList.replace("opacity-0", "opacity-full");
  guessInput.focus();
};

const checkGuess = (guess) => {
  if (piPosition !== 25) {
    if (guess === pi[piPosition]) {
      piPosition++;
    } else {
      gameOver();
    }
  } else {
    gameWon();
  }
};

const gameWon = async () => {
  guessContainer.classList.add("duration-300");
  guessContainer.classList.replace("opacity-full", "opacity-0");

  await delay(150);
  guessContainer.classList.add("hidden");
  result.classList.remove("hidden");
  result.textContent = `¡Ganaste!, Llegaste hasta el ${piPosition}/25.`;

  await delay(150);
  result.classList.replace("opacity-0", "opacity-full");
};

const gameOver = async () => {
  guessContainer.classList.add("duration-300");
  guessContainer.classList.replace("opacity-full", "opacity-0");

  await delay(150);
  guessContainer.classList.add("hidden");
  result.classList.remove("hidden");
  result.textContent = `Perdiste. Llegaste hasta el ${piPosition}/25.`;

  await delay(150);
  result.classList.replace("opacity-0", "opacity-full");
};

guessInput.addEventListener("keydown", (event) => {
  const guessed = guessInput.value;
  if (event.key === "Enter") {
    if (guessed !== "" && guessed !== " " && !isNaN(guessed)) {
      checkGuess(guessed);
      guessInput.value = "";
    }
  }
});

guessButton.addEventListener("click", () => {
  const guessed = guessInput.value;
  if (guessed !== "" && guessed !== " " && !isNaN(guessed)) {
    checkGuess(guessed);
    guessInput.value = "";
  }
});
