
const player2Inp = document.getElementById("name2");

let boardSet = null;
let timerStop = true;
let entryBtn = document.getElementById("entryBtn");
entryBtn.disabled = true;
const inputs = document.querySelectorAll("input");
inputs.forEach((e) =>
  e.addEventListener("focus", () => {
    playSound(3);
  })
);
const gameButtons = {
  home: document.querySelectorAll('[name="back-home"]'),
  saveGame: document
    .querySelector('[name="saveGame"]')
    .addEventListener("click", () => saveGame()),
  stepBack: document
    .querySelector('[name="stepBack"]')
    .addEventListener("click", () => backward()),
  openSaved: document
    .querySelector('[name="OpenSavedGame"]')
    .addEventListener("click", () => openSavedGame()),
};
gameButtons.home.forEach((button) =>
  button.addEventListener("click", () => restart())
);
const form = document.querySelector("form");
form.addEventListener("change", (e) => validity(e));
const slider = document.getElementById("slider_value"),
  sliderDisp = document.getElementById("board_size");
slider.oninput = (e) => {
  sliderDisp.innerText = `${e.target.value} X ${e.target.value}`;
  playSound(4);
};

slider.onmouseover = () => {
  playSound(0);
};

const playerSymb = {
  O: [
    "./Symboles/O1.png",
    "./Symboles/O2.png",
    "./Symboles/O3.png",
    "./Symboles/O4.png",
  ],
  X: [
    "./Symboles/X1.png",
    "./Symboles/X2.png",
    "./Symboles/X3.png",
    "./Symboles/X4.png",
  ],
};
const sounds = [
  "./sounds/pop.wav",
  "./sounds/swoosh.wav",
  "./sounds/entry.wav",
  "./sounds/sparkle.wav",
  "./sounds/bloop.wav",
  "./sounds/select-click.wav",
  "./sounds/back-click.wav",
  "./sounds/place-sym.wav",
  "./sounds/win.wav",
];
function playSound(soundInd) {
  const audio = new Audio(sounds[soundInd]);
  audio.play();
}
let gameData = {
  boardSize: 3,
  name1: null,
  name2: null,
  p1Sym: null,
  p2Sym: null,
  start: false,
  time: "",
  step: 0,
  history: [],
  savedGameBoard: [],
};

const lst = document.querySelectorAll(".list");
lst.forEach((item) => item.addEventListener("mouseover", activateButt));
lst.forEach((item) => item.addEventListener("click", () => playSound(6)));
function activateButt() {
  lst.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}

function closePopUp() {
  document.getElementById("popup").className = "closepop";
}

function openPopUp(winner) {
  const popup = document.getElementById("closepopup");
  const textpopup = document.createElement("div");
  textpopup.innerHTML += "The winner is......" + winner;
  textpopup.className = "textpopup";
  popup.appendChild(textpopup);
  popup.className = "openpop";
  playSound(8);
}
const [gameView, openningScreen] = [
  document.querySelector(".game"),
  document.querySelector(".openning"),
];
const backward = () => {
  let backStep = boardHistory.pop()
  backStep = boardHistory.pop()
  // debugger
  for (let i = 0; i < gameData.boardSize; i++) {
    for (let j = 0; j < gameData.boardSize; j++) {
      // debugger
      boardArr[i][j] = backStep[i][j]
    }
  }
  
  gameData.step = gameData.step-1
  currentPlayerfunc(alternatePlayers(gameData.step-1));
  // currentPlayerfunc(isCurrentPlayer);
  boardHistory.push(backStep)
  displayGame(boardArr)
  // debugger
}
const restart = () => {
  gameData.start = false;
  gameData = {};
  show();
  closePopUp();
  location.reload();
};
const show = () => {
  gameView.style.display = !gameData.start ? "none" : "block";
  openningScreen.style.display = gameData.start ? "none" : "block";
  chooseSign();
  timer();
};
const saveGame = () => {
  timerStop = false;
  window.localStorage.setItem("game", JSON.stringify(gameData));
  console.log("saved");
};

const openSavedGame = () => {
  newGameData = JSON.parse(window.localStorage.getItem("game"));
  console.log(newGameData);
};
const timer = () => {
  function increment() {
    if (running == 1) {
      setTimeout(function () {
        // debugger

        Dtime++;
        let mins = Math.floor(Dtime / 10 / 60) % 60;
        if (mins <= 9) {
          mins = "0" + mins;
        }
        let secs = Math.floor(Dtime / 10) % 60;
        if (secs <= 9) {
          secs = "0" + secs;
        }
        document.getElementById("timer").innerHTML = mins + ":" + secs;
        if (timerStop == false) {
          console.log(mins + ":" + secs);
          gameData.time = mins + ":" + secs;
        } else {
          gameData.time = mins + ":" + secs;
          increment();
        }
      }, 100);
    }
  }

  let running = 1;
  let Dtime = 36000;
  increment();
};

const container = document.querySelector(".symb-container");
const setPlayerSymb = (event) => {
  if (!gameData.p1Sym) {
    gameData.p1Sym = playerSymb[event.id[0]][event.id[1]];
    delete playerSymb[event.id[0]]; // removing the chosen symbol so it  won't be available for other players
    document.getElementById("X").remove(); //Clear the display
    document.getElementById("O").remove();
    return;
  } else {
    gameData.p2Sym = playerSymb[event.id[0]][event.id[1]];
    setTimeout(() => (entryBtn.disabled = false), 700);
    playSound(2);
    return;
  }
};

const chooseSign = (name) => {
  player2Inp.removeAttribute("disabled");
  document.querySelector(".modal").style.display = "block";
  document.querySelector(
    ".modal-player"
  ).innerText = `${name}, pick your player symbol: `;
  // Iterate over playerSymb and display the symbols.
  for (sym in playerSymb) {
    const symbolCont = document.createElement("div");
    symbolCont.setAttribute("id", `${sym}`);
    const symbolName = document.createElement("span");
    symbolName.innerText = `${sym}:`;
    symbolCont.appendChild(symbolName);
    container.appendChild(symbolCont);
    for (i in playerSymb[sym]) {
      const symbol = document.createElement("img");
      symbol.setAttribute("src", playerSymb[sym][i]);
      symbol.setAttribute("id", `${sym + i}`);
      symbol.addEventListener("click", (e) => {
        setPlayerSymb(e.target);
        document.querySelector(".modal").style.display = "none";
      });
      symbolCont.appendChild(symbol);
    }
  }
  return;
};

const validity = (e) => {
  gameData[e.target.name] = e.target.value;
  if (e.target.name !== "boardSize") {
    !!gameData.name1 && !!gameData.name2 && gameData.name1 !== gameData.name2
      ? chooseSign(gameData.name2)
      : chooseSign(gameData.name1);
  }
};
let boardArr = [];
let boardHistory = [];
function start() {
  gameData.start = true;
  document.getElementById("body").classList.add("body-g");
  document.getElementById("body").classList.remove("body-e");
  createCard(Number(gameData.boardSize));
  boardArrayConstractor(Number(gameData.boardSize));
  let boardcopy = []
  for (i = 0; i < gameData.boardSize; i++) {
    boardcopy[i] = newArray(gameData.boardSize);
  }
  for (let i = 0; i < gameData.boardSize; i++) {
    for (let j = 0; j < gameData.boardSize; j++) {
      boardcopy[i][j] = boardArr[i][j]
    }
  }
  console.log("after initialize board copy");
  boardHistory.push(boardcopy);
  
  currentPlayer.innerHTML = `Current Player: ${gameData.name1}`;
  chooseSign();
  show();
}


const board = document.getElementById("board");
const currentPlayer = document.getElementById("currentPlayer");

function currentPlayerfunc(name) {
  currentPlayer.innerHTML = `Current Player: ${name}`;
}
function newArray(size) {
  //genert new array and return
  const newArr = [];
  for (a = 0; a < size; a++) {
    newArr[a] = "";
  }
  return newArr;
}
function boardArrayConstractor(size) {
  //push new array in boardArr
  for (i = 0; i < size; i++) {
    boardArr[i] = newArray(size);
  }
}

function displayGame(gameState) {
  for (let i = 0; i < gameData.boardSize; i++) {
    for (let j = 0; j < gameData.boardSize; j++) {
      let id = "" + i + j;
      let cell = document.getElementById(id);

      if (gameState[i][j] == gameData.name1) {
        cell.innerHTML = `<img src="${gameData.p1Sym}">`;
      }
      else if (gameState[i][j] == gameData.name2) {
        cell.innerHTML = `<img src="${gameData.p2Sym}">`;
      }
      else {
        cell.innerHTML = ''
        cell.removeEventListener("click", clickbtn);
        cell.addEventListener("click", clickbtn)
      }
    }
  }

}

function clickbtn() {
  playSound(5);

  this.removeEventListener("click", clickbtn);
  let isCurrentPlayer = alternatePlayers(gameData.step);
  currentPlayerfunc(isCurrentPlayer); //input player name to screen
  if (gameData.step % 2 == 0) {
    boardArr[this.id[0]][this.id[1]] = gameData.name1;
    this.innerHTML = `<img src="${gameData.p1Sym}">`;
  } else {
    boardArr[this.id[0]][this.id[1]] = gameData.name2;
    this.innerHTML = `<img src="${gameData.p2Sym}">`;
  }

  let boardcopy = []
  for (i = 0; i < gameData.boardSize; i++) {
    boardcopy[i] = newArray(gameData.boardSize);
  }
  for (let i = 0; i < gameData.boardSize; i++) {
    for (let j = 0; j < gameData.boardSize; j++) {
      boardcopy[i][j] = boardArr[i][j]
    }
  }
 
  boardHistory.push(boardcopy);
  // debugger;
 
  
  console.log(boardArr);
  gameData.step++
  let checkInd = Number(gameData.boardSize) * 2 - 1;
  if (gameData.step >= checkInd) {
    return checkWin(boardArr);
  }
  
  return isCurrentPlayer;
}

function createCard(idx) {
  for (i = 0; i < idx; i++) {
    const row = document.createElement("span");
    row.className = `row`;
    for (f = 0; f < idx; f++) {
      const col = document.createElement("div");
      col.className = `card`;
      col.innerText = "";
      col.id = `${i}${f}`;
      col.addEventListener("click", clickbtn);
      row.appendChild(col);
    }
    board.appendChild(row);
  }
}

function alternatePlayers(moveCount) {
  let currentPlayer;
  let isEven = moveCount % 2;
  currentPlayer = isEven ? gameData.name1 : gameData.name2;
  return currentPlayer;
}
function tiePopup() {
  let popup = document.querySelector(".tiePopup");
  popup.style.visibility = "visible";
}

function win(winner) {
  timerStop = false;

  openPopUp(winner);
}

// This function is viable for any nXn matrix and returns the symbol of the winner
function checkWin(board) {
  let isWin = null;
  // n is the matrix dimension
  // This function checks for rows with equal elemnts
  function equalElements(row) {
    let set1 = new Set(row);
    if ([...set1].length == 1 && [...set1][0] != "") {
      return [...set1][0];
    }
  }
  function checkEqual(board) {
    board.map((row) => {
      isWin = equalElements(row);
      if (isWin) {
        win(isWin);
      }
    });
  }

  // Check rows
  checkEqual(board);
  // Transpose the board to iterate over the columns
  let boardTrans = board[0].map((col, ind) => board.map((row) => row[ind]));
  checkEqual(boardTrans);

  // Make an array of the diagonals
  let mainDiag = board.map((col, ind) => col[ind++]);
  isWin = equalElements(mainDiag);
  if (isWin) {
    win(isWin);
  }
  let n = board[0].length - 1;
  let secDiag = board.map((col, ind) => col[n - ind++]);
  isWin = equalElements(secDiag);
  if (isWin) {
    win(isWin);
  }

  boardSet = new Set(boardArr.flat());
  if (!boardSet.has("") && !isWin) {
    tiePopup();
  }
}

// SAVE GAME HISTORY AND MOVE BACKWORDS LOGIC*******************************************************************
