// BOARD
<<<<<<< HEAD
let boardSize = 3;
let boradArr = []
const board = document.getElementById("board");

function newArray(size) { //genert new array and return 
    const newArr = []
    for (a = 0; a < size; a++) {
        newArr[a] = ""
    }
    return newArr;
}
function boradArrayConstractor(size) {//push new array in boradArr
    for (i = 0; i < size; i++) {
        boradArr[i] = newArray(size);
    }
}
function click() {
    boradArr[this.id[0]][this.id[1]] = "x"
    console.log(boradArr);
=======
let rows = 3;
let cols = 3;
const card = ["", "", ""];
const board = document.getElementById("board");

function flipCrad() {
  console.log(card);
>>>>>>> c0245ee83ce404e9ad2c54d0f1eedfe789b4a404
}
function craeteCrad(idx) {
<<<<<<< HEAD
    for (i = 0; i < idx; i++) {
        const row = document.createElement("span")

        row.className = `col${i}`
        for (f = 0; f < idx; f++) {
            const col = document.createElement("div")
            col.className = `row${f}`
            col.innerText = "X"
            col.id = `${f}${i}`
            col.addEventListener('click', click)
            row.appendChild(col)

        }
        board.appendChild(row);
=======
  const row = document.createElement("div");
  for (let i = 3; i > 0; i--) {
    const col = document.createElement("div");

    console.log(i);
    row.className = "row";
    for (let f = 3; f > 0; f--) {
      col.className = `col  ${f}`;
      col.innerText = "X";
      row.appendChild(col);
>>>>>>> c0245ee83ce404e9ad2c54d0f1eedfe789b4a404
    }
    board.appendChild(row);
  }

<<<<<<< HEAD

}


craeteCrad(boardSize)
boradArrayConstractor(boardSize);
=======
  // container.addEventListener('click', flipCrad)
}

for (i of card) {
  craeteCrad(i);
}
>>>>>>> c0245ee83ce404e9ad2c54d0f1eedfe789b4a404

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

<<<<<<< HEAD
    function checkEqual(board) {
        board.forEace((row) => {
            equalElements(row);
        });
    }
=======
  function checkEqual(board) {
    board.map((row) => {
      equalElements(row);
    });
  }
>>>>>>> c0245ee83ce404e9ad2c54d0f1eedfe789b4a404

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

<<<<<<< HEAD
function match() { }
=======
function match() {
  
}

let restart=document.querySelector(".playAgain");


function playAgain(){
  
}
>>>>>>> c0245ee83ce404e9ad2c54d0f1eedfe789b4a404

function game() {
    alternatePlayers();
}
