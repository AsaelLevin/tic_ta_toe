// BOARD
let boardSize = 3;
let boardArr = [];
const board = document.getElementById("board");
let gameData = getUrlData();

function newArray(size) {
  //genert new array and return
  const newArr = [];
  for (a = 0; a < size; a++) {
    newArr[a] = "";
  }
  return newArr;
}
function boradArrayConstractor(size) {
  //push new array in boradArr
  for (i = 0; i < size; i++) {
    boardArr[i] = newArray(size);
  }
}
function click() {
  let currentPlayer = alternatePlayers(moveCounter);
  boardArr[this.id[0]][this.id[1]] = "x";
  console.log(boardArr);
  moveCounter++;
  let checkInd = Number(gameData.rangeInput) * 2 - 1;
  if (moveCounter >= checkInd) {
    return checkWin(boardArr);
  }
  return currentPlayer;
}
function craeteCrad(idx) {
  for (i = 0; i < idx; i++) {
    const row = document.createElement("span");

    row.className = `col${i}`;
    for (f = 0; f < idx; f++) {
      const col = document.createElement("div");
      col.className = `row${f}`;
      col.innerText = "X";
      col.id = `${f}${i}`;
      col.addEventListener("click", click);
      row.appendChild(col);
    }
    board.appendChild(row);
  }
}

craeteCrad(boardSize);
boradArrayConstractor(boardSize);

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

function getUrlData() {
  let gameData = [],
    hash;
  let hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    gameData[hash[0]] = hash[1];
  }
  return gameData;
}
