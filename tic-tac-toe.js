let gameData = {
  boardSize: 3,
  name1: null,
  name2: null,
  sign1: "",
  sign2: "",
  start: false,
  time: "",
  step: 1,
  statusBoard:{}
};
let timerStop= true
document.getElementById("entryBtn").disabled = true;

const form = document.querySelector("form");
form.addEventListener("change", (e) => validity(e));

const slider = document.getElementById("slider_value"),
  sliderDisp = document.getElementById("board_size");
slider.oninput = (e) => {
  sliderDisp.innerText = `${e.target.value} X ${e.target.value}`;
};
const [gameView, openningScreen] = [
  document.querySelector(".game"),
  document.querySelector(".openning"),
];
const restart = () => {
  gameData.start = false;
  gameData={}
  show();
  location.reload();
};
const saveGame= ()=>{
  timerStop= false
  window.localStorage.setItem("game", JSON.stringify(gameData));
  console.log("saved");
}
const beakAction= ()=> {}
const openSavedGame= ()=>{}
const timer=()=>{
  function increment() {
    if (running == 1) {
      setTimeout(function() {
        // debugger
        
        Dtime++;
        var mins = Math.floor(Dtime / 10 / 60) % 60; // Remainder operator
        if (mins <= 9) {
          mins = "0" + mins;
        }
        var secs = Math.floor(Dtime / 10) % 60; // Remainder operator
        if (secs <= 9) {
          secs = "0" + secs;
        }
        document.getElementById("outputt").innerHTML = mins + ":" + secs;
        if(timerStop== false){
          console.log(mins + ":" + secs);
          gameData.time= mins + ":" + secs
        }
        else{
        gameData.time= mins + ":" + secs
        increment()};
      }, 100);
    }
  }
  
  var running = 1;
  var Dtime = 36000; //Setting it just under 1 hour for testing purposes
  increment();
 
}
const chooseSign = () => {
  gameData.sign1 = sign.value
  
  if (gameData.sign1 == "O") {
    gameData.sign2 = "X"
  } 
  else 
  gameData.sign1 = "X"
  gameData.sign2 = "O"
};

const validity = (e) => {
  gameData[e.target.name] = e.target.value;
  if (e.target.id != "slider_value") {
    document.getElementById(e.target.id).setAttribute("readonly", "true");
  }
  if (!!gameData.name1 && !!gameData.name2) {
    document.getElementById("entryBtn").disabled = false;
  }
};

const show = () => {
  gameView.style.display = !gameData.start ? "none" : "block";
  openningScreen.style.display = gameData.start ? "none" : "block";
  chooseSign();
  timer()
};

function start() {
  gameData.start = true;
  document.getElementById("body").classList.add("body-g");
  document.getElementById("body").classList.remove("body-e");
  createCard(Number(gameData.boardSize));
  boardArrayConstractor(Number(gameData.boardSize));
  currentPlayer.innerHTML = `Current Player: ${gameData.name1}`;
  chooseSign();
  show();
}

let boardArr = [];
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
function clickbtn1() {
  this.removeEventListener("click", clickbtn1);
  let isCurrentPlayer = alternatePlayers(moveCounter);
  currentPlayerfunc(isCurrentPlayer); //input player name to screen
  if (moveCounter % 2 == 0) {
    boardArr[this.id[0]][this.id[1]] = "X";
    this.innerText = gameData.sign1;
  } else {
    boardArr[this.id[0]][this.id[1]] = "O";
    this.innerText = gameData.sign2;
  }
  console.log(boardArr);
  gameData.step++
  gameData.statusBoard= gameData.statusBoard+boardArr 
  moveCounter++;

  let checkInd = Number(gameData.boardSize) * 2 - 1;
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
  timerStop= false
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
