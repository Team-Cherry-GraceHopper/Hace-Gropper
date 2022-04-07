import Phaser from "phaser";
import Lobby from "./Lobby";

export default class Scrammble extends Phaser.Scene {
  constructor() {
    super("Scrammble");
  }

  preload() {
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#000000");
      this.load.audio("minigame", ["../public/assets/audio/song.wav", "../public/assets/audio/song.ogg"]);
  }

  create() {
    const music = this.sound.add("minigame", { loop: true });
    music.play();
    const scrammble = this;
    const game = document.getElementById("game");
    const userGuess = document.getElementById("user-guess");
    const submitBtn = document.getElementById("submit");
    const usersWord = document.getElementById("scrambled-word");
    const info = document.getElementById("info");
    const levelOutput = document.getElementById("level");
    const scoreOutput = document.getElementById("score");
    const attemptsOutput = document.getElementById("attempts");
    const gameContainer = document.getElementById("game-container");
    const guessContainer = document.getElementById("guess-container");
    const rules = document.getElementById("scrammblerules");
    const playBtn = document.getElementById("play-btn");
    const resetBtn = document.getElementById("reset-btn");
    const backToLobby = document.getElementById("back-to-lobby");
    const canvas = document.querySelector("canvas");
    canvas.classList.add("hidden");
    game.classList.remove("hidden");

    let level = 1;
    let score = 0;
    let word;
    let attempts = 0;
    let correct = 0;

    const words = {
      1: ["code"],
      2: ["java"],
      3: ["react"],
      4: ["python"],
      5: ["javascript"],
      6: ["debug"],
      7: ["sequelize"],
      8: ["algorithms"],
    };

    function reset() {
      level = 1;
      score = 0;
      correct = 0;
      attempts = 0;
      word = "";
      updateBoard();
      info.innerHTML = "";
      userGuess.value = "";
    }

    function exitScrammble() {
      scrammble.scene.stop("Scrammble");
      music.stop();
      scrammble.scene.start("Lobby", Lobby);
      game.classList.toggle("hidden");
      canvas.classList.remove("hidden");
      let engBlock = document.getElementById("engineering-clues");
      engBlock.classList.add("hidden");
    }

    function randomWord(level) {
      word = words[level][0];
      return word;
    }

    function scrambleWord(word) {
      let letters = word.split("");
      let currentIndex = letters.length;
      let temporaryValue;
      let randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = letters[currentIndex];
        letters[currentIndex] = letters[randomIndex];
        letters[randomIndex] = temporaryValue;
      }

      return letters.join(" ");
    }
    function updateBoard() {
      scoreOutput.innerHTML = score;
      levelOutput.innerHTML = level;
      attemptsOutput.innerHTML = attempts;
    }

    function checkAnswer(guess) {
      console.log(`Correct: ${correct}`);

      if (attempts == 3) {
        guessContainer.classList.toggle("hidden");
        info.innerHTML =
          "<p class='retry'>Sorry. You are out of chances. <button id='retry-button'>Retry</button> </p>";
        reset();
      }

      if (guess === word) {
        info.innerHTML = "<span class='correct'>CORRECT</span>";
        score += 1;
        correct += 1;
        attempts = 0;
        level += 1;
        setLevel();
      } else {
        info.innerHTML =
          "<span class='incorrect'>Bzzzt! That's not right!</span>";
        score -= 1;
        attempts += 1;
      }

      updateBoard();
    }

    function setLevel() {
      if (level <= 8) {
        randomWord(level);
      } else if (level > 8) {
        info.innerHTML = "<span class='win'>You Win! Great job! </br></span>";
        exitScrammble();
      }
      console.log(`Word: ${word}`);
      usersWord.innerHTML = scrambleWord(word);
    }

    playBtn.addEventListener("click", function (e) {
      rules.classList.toggle("hidden");
      gameContainer.classList.remove("hidden");
    });

    submitBtn.addEventListener("click", function (e) {
      checkAnswer(userGuess.value.toLowerCase());
      userGuess.value = "";
    });

    backToLobby.addEventListener("click", function (e) {
      console.log("im in the backtolobbybbybydfjdfh");
      exitScrammble();
    });

    window.addEventListener(
      "keypress",
      function (e) {
        if (e.key === "Enter") {
          checkAnswer(userGuess.value.toLowerCase());
          userGuess.value = "";
        }
      },
      false
    );

    resetBtn.addEventListener("click", function (e) {
      reset();
      setLevel();
      guessContainer.classList.remove("hidden");
      userGuess.value = "";
    });

    setLevel();
  }
}
