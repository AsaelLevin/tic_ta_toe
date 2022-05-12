// BOARD
let rows = 3;
let cols = 3;
const card = ["", "", ""];
const board = document.getElementById("board");

function flipCrad() {
  console.log(card);
}

function craeteCrad(idx) {
  const row = document.createElement("div");
  for (let i = 3; i > 0; i--) {
    const col = document.createElement("div");

    console.log(i);
    row.className = "row";
    for (let f = 3; f > 0; f--) {
      col.className = `col  ${f}`;
      col.innerText = "X";
      row.appendChild(col);
    }
    board.appendChild(row);
  }

  // container.addEventListener('click', flipCrad)
}

for (i of card) {
  craeteCrad(i);
}

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

function match() {
  
}

let restart=document.querySelector(".playAgain");


function playAgain(){
  
}

function game() {
  alternatePlayers();
}
