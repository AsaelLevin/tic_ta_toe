// BOARD
let boardSize = 3;
let boradArr = [];
const board = document.getElementById("board");

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
    boradArr[i] = newArray(size);
  }
}
function click() {
  boradArr[this.id[0]][this.id[1]] = "x";
  console.log(boradArr);
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

function test() {}

craeteCrad(boardSize);
boradArrayConstractor(boardSize);

// PLAYER REGISTER
let moveCounter = 0;

// ALTERNATE PLAYERS
function alternatePlayers(startPlayer, secondPlayer, moveCount) {
  let currentPlayer;
  currentPlayer = moveCount / 2 == 0 ? startPlayer : secondPlayer;
  return currentPlayer;
}
// This function returns the symbol of the winner
function checkWin(board) {
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
      equalElements(row);
    });
  }

  // Check rows
  checkEqual(board);
  // Transpose the board to iterate over the columns
  let boardTrans = board[0].map((col, ind) => board.map((row) => row[ind]));
  checkEqual(boardTrans);

  // Make an array of the diagonals
  let mainDiag = board.map((col, ind) => col[ind++]);
  equalElements(mainDiag);
  let n = board[0].length;
  let secDiag = board.map((col, ind) => col[n - ind++]);
  equalElements(secDiag);
}

function match() {}

let restart = document.querySelector(".playAgain");

function playAgain() {}

function game() {
  alternatePlayers();
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

let gameData = getUrlData();
