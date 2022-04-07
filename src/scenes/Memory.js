import Phaser from "phaser";
import Lobby from "./Lobby";

let sciClues;

export default class Memory extends Phaser.Scene {
  constructor() {
    super("Memory");
  }
  preload() {
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#423e41");
      this.load.audio("minigame", ["../public/assets/audio/song.wav", "../public/assets/audio/song.ogg"]);
  }
  create() {
    const music = this.sound.add("minigame", { loop: true });
    music.play();
    const memory = this;
    const memoryGame = document.getElementById("memory");
    const canvas = document.querySelector("canvas");
    const exitButton = document.getElementById("mem-exit");
    sciClues = document.getElementById("science-clues");

    canvas.classList.add("hidden");
    memoryGame.classList.remove("hidden");

    exitButton.addEventListener("click", exitRoom);

    const cards = document.querySelectorAll(".card");
    const win = document.getElementById("win");

    cards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });

    let matches = {
      mem1: "mem3",
      mem3: "mem1",
      mem2: "mem7",
      mem7: "mem2",
      mem4: "mem12",
      mem12: "mem4",
      mem5: "mem11",
      mem11: "mem5",
      mem6: "mem10",
      mem10: "mem6",
      mem8: "mem9",
      mem9: "mem8",
    };

    let guesses = [];
    let currentCards = [];

    function checkMatch(guessArray, matchObj) {
      let firstNum = guessArray[0];
      let secondNum = guessArray[1];

      if (matchObj[firstNum] === secondNum) {
        return true;
      } else {
        return false;
      }
    }

    function flipCard() {
      this.classList.toggle("flip"); // 'this' refers to the card div
      if (!guesses.includes(this.id)) {
        guesses.push(this.id);
      }
      currentCards.push(this.id);

      if (currentCards.length === 2) {
        let match1 = document.getElementById(currentCards[0]);
        let match2 = document.getElementById(currentCards[1]);

        if (checkMatch(currentCards, matches)) {
          match1.classList.remove("back");
          match2.classList.remove("back");

          match1.removeEventListener("click", flipCard);
          match2.removeEventListener("click", flipCard);
        } else {
          setTimeout(() => {
            match1.classList.remove("flip");
            match2.classList.remove("flip");
          }, 1000);
        }
        currentCards = [];
        if (guesses.length === 12) {
          win.classList.toggle("hidden");
        }
      }
    }
    function exitRoom() {
      memory.scene.stop("Memory");
      music.stop();
      memory.scene.start("Lobby");
      memoryGame.classList.toggle("hidden");
      canvas.classList.remove("hidden");
      sciClues.classList.toggle("hidden");
      let sciBlock = document.getElementById("science-clues");
      sciBlock.classList.add("hidden");
    }
  }
  update() {}
}
