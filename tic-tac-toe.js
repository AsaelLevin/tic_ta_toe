// BOARD

// PLAYER REGISTER

// ALTERNATE PLAYERS
function alternatePlayers(startPlayer, secondPlayer, moveCount) {
  let currentPlayer;
  currentPlayer = moveCount / 2 == 0 ? startPlayer : secondPlayer;
  return currentPlayer;
}

function checkWin() {
  // Check rows
  board.forEace((row) => {
    let set1 = new Set(row);
    if ([...set1].length == 1) {
      return [...set1][0];
    }
  });
  // Make an array of the columns
  // Make an array of the diagonals
}

function match() {}

function game() {
  alternatePlayers();
}
