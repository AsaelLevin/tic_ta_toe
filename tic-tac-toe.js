let gameData = {
  boardSize: 3,
  start: false,
  name1: null,
  name2: null,
};

document.getElementById("entryBtn").disabled = true;

let boardArr = [];

const [gameView, openningScreen] = [
  document.querySelector(".game"),
  document.querySelector(".openning"),
];

const validity = () => {
  if (!!gameData.name1 && !!gameData.name2) {
    document.getElementById("entryBtn").disabled = false;
  } else {
    document.getElementById("entryBtn").disabled = true;
  }
};

const show = () => {
  gameView.style.display = !gameData.start ? "none" : "block";
  openningScreen.style.display = gameData.start ? "none" : "block";
};
show();

const board = document.getElementById("board");
const currentPlayer = document.getElementById("currentPlayer");
currentPlayer.innerHTML = `Current Player: ${gameData.name1}`;

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
function boradArrayConstractor(size) {
  //push new array in boardArr
  for (i = 0; i < size; i++) {
    boardArr[i] = newArray(size);
  }
}
function clickbtn1() {
  this.removeEventListener("click", clickbtn1);
  let isCurrentPlayer = alternatePlayers(moveCounter);
  currentPlayerfunc(isCurrentPlayer); //input player name to screen
  if (moveCounter % 2 == 0) {
    boardArr[this.id[0]][this.id[1]] = "X";
    this.innerText = "X";
  } else {
    boardArr[this.id[0]][this.id[1]] = "O";
    this.innerText = "O";
  }
  console.log(boardArr);
  moveCounter++;

  let checkInd = Number(gameData.rangeInput) * 2 - 1;
  if (moveCounter >= checkInd) {
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
      col.addEventListener("click", clickbtn1);
      row.appendChild(col);
    }
    board.appendChild(row);
  }
}

function test() {}

createCard(gameData.boardSize);
boradArrayConstractor(gameData.boardSize);

// PLAYER REGISTER
let moveCounter = 0;

// ALTERNATE PLAYERS
function alternatePlayers(moveCount) {
  let currentPlayer;
  let isEven = moveCount % 2;
  currentPlayer = isEven ? gameData.name1 : gameData.name2;
  return currentPlayer;
}

function win(winner) {
  alert(winner);
}
// This function returns the symbol of the winner
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
}

function match() {}

function playAgain() {
  let restart = document.querySelector(".playAgain");
}
