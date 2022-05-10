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

// ALTERNATE PLAYERSs