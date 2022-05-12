// BOARD

// PLAYER REGISTER
let moveCounter=0;

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
    board.forEace((row) => {
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

function game() {
  alternatePlayers();
}
// activ range onchenge
function updateTextInput(val) {
  document.getElementById("textInput").value = val;
}

let users = (str) => {
 let player1 = document.getElementById("player1").value;
  console.log(player1);
};
let users2 = (str) => {
 let player2 = document.getElementById("player2").value;
  console.log(player2);
};
let sizeBoard = document.getElementById("boardSize");
