export default class Pridle extends Phaser.Scene {
  constructor() {
    super("Pridle");
  }
  preload() {
    this.cameras.main.backgroundColor =
      Phaser.Display.Color.HexStringToColor("#423e41");
    this.load.image(
      "Agender",
      "../public/assets/images/pridleflags/Agender2014.svg"
    );
  }

  create() {
    let techClues = document.getElementById("tech-clues");
    techClues.classList.add("hidden");
    let lobbyClues = document.getElementById("clue-list");
    lobbyClues.classList.add("hidden");
    const flagArr = [
      "Agender2014",
      "Aromantic",
      "Asexual",
      "Bisexual",
      "Genderfluid",
      "Genderqueer",
      "Intersex",
      "Lesbian2010",
      "Lesbian2018",
      "Nonbinary",
      "Pansexual",
      "Phillypride",
      "Polysexual",
      "Progresspride",
      "Pride1978",
      "Transgender",
    ];
    var chosenFlag = flagArr[Math.floor(Math.random() * flagArr.length)];
    var container = document.getElementById("pcontainer");
    container.style.backgroundImage = `url(../public/assets/images/pridleflags/${chosenFlag}.svg)`;
    container.style.width = "800px";
    container.style.height = "650px";
    const pridle = this;
    const pridleGame = document.getElementById("pridle");
    const info = document.getElementById("rules");
    info.classList.add("hidden");
    const canvas = document.querySelector("canvas");
    canvas.classList.add("hidden");
    const exitButton = document.getElementById("pridle-exit");
    const choiceButton = document.getElementById("bumsit");
    const option = document.getElementById("pflag");
    const sq1 = document.getElementById("square1");
    const sq2 = document.getElementById("square2");
    const sq3 = document.getElementById("square3");
    const sq4 = document.getElementById("square4");
    const sq5 = document.getElementById("square5");
    const sq6 = document.getElementById("square6");
    pridleGame.classList.remove("hidden");
    exitButton.addEventListener("click", exitRoom);
    choiceButton.addEventListener("click", submit);

    function exitRoom() {
      let techClues = document.getElementById("tech-clues");
      techClues.classList.add("hidden");
      let lobbyClues = document.getElementById("clue-list");
      lobbyClues.classList.remove("hidden");
      let nameGuess = document.getElementById("guessContainer");
      nameGuess.classList.add("hidden");
      pridle.scene.stop("Pridle");
      pridle.scene.start("Lobby");
      pridleGame.classList.add("hidden");
      canvas.classList.remove("hidden");
    }

    let squareNum = 1;
    let guessNum = 0;

    function removeSquare(num) {
      const name = document.getElementById(`square${num}`);
      name.classList.add("hidden");
      squareNum++;
      guessNum++;
    }
    function removeAllSquares() {
      sq1.classList.add("hidden");
      sq2.classList.add("hidden");
      sq3.classList.add("hidden");
      sq4.classList.add("hidden");
      sq5.classList.add("hidden");
      sq6.classList.add("hidden");
      squareNum = 1;
    }

    function submit() {
      var select = document.getElementById("lang");
      var option = select.options[select.selectedIndex];
      document.getElementById("guessContainer").innerHTML += "<br/>";
      document.getElementById("guessContainer").innerHTML += option.value;
      if (option.value === chosenFlag) {
        removeAllSquares();
        document.getElementById("guessContainer").innerHTML = "";
        document.getElementById("guessContainer").innerHTML = chosenFlag;
        const win = document.getElementById("winner");
        win.classList.remove("hidden");
      } else if (guessNum === 5) {
        removeSquare(squareNum);
        document.getElementById("guessContainer").innerHTML = "";
        document.getElementById("guessContainer").innerHTML = chosenFlag;
        const lose = document.getElementById("loser");
        lose.classList.remove("hidden");
      } else removeSquare(squareNum);
    }
  }

  update() {}
}
