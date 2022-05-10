// BOARD
let rows = 3;
let cols = 3;
const card = ['', '', '']
const board = document.getElementById("board");

function flipCrad() {
    console.log(card);
}

function craeteCrad(idx) {
    const row = document.createElement("div")
    for (let i = 3; i > 0; i--) {
        const col = document.createElement("div")

        console.log(i);
        row.className = 'row'
        for (let f = 3; f > 0; f--) {
            col.className = `col  ${f}`
            col.innerText = "X"
            row.appendChild(col)

        }
        board.appendChild(row);
    }

    // container.addEventListener('click', flipCrad)

}

for (i of card) {
    craeteCrad(i)
}

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
