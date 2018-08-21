const board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

let columns = document.getElementsByClassName("column");

for (let x = 0; x < columns.length; x++) {
    columns[x].innerHTML = "";
}

const numCol = 7;
const game = document.getElementById("game");
let lineB = board.length - 3;
let lineA = board[0].length - 3;
let counter = 0;

let currentPlayer = "Red";
let nextPlayer = "Black";

for (let y = 0; y < numCol; y++) {
    let column = document.createElement("div");
    column.classList.add("column");
    column.id = y;
    game.appendChild(column);
    column.addEventListener("click", function (event) {
        let clickCol = event.target;
        let x = clickCol.childElementCount;
        if (clickCol.childElementCount < 6) {
            // prevents more than 6 disks from being added to a column
            counter++;
            let disk = document.createElement("div");
            disk.classList.add("piece");
            disk.id = x;
            disk.classList.add(currentPlayer);

            if (currentPlayer == "Red") {
                board[x][y] = 1;
            } else {
                board[x][y] = 2;
                column.removeEventListener("click", checkWinCondition());
            }
            let newNextPlayer = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = newNextPlayer;
            clickCol.appendChild(disk);
        }
        checkWinCondition();
    });
}

function checkWinCondition() {
    // functions to check for winning placements in each direction
    horizontal();
    vertical();
    rightDiagonal();
    leftDiagonal();
}

function replay() {
    location.reload();
}

function winner() {
    // winning text; color of text depends on winner
    let winMessage = document.createElement("h2");
    winMessage.textContent = nextPlayer + " Wins";
    if (currentPlayer == "Red") {
        document.body.appendChild(winMessage).style.color = "black";
        // winning text displayed in black
        column.removeEventListener("click", winner());
    } else {
        document.body.appendChild(winMessage).style.color = "red";
        // winning text displayed in red
        column.removeEventListener("click", winner());
    }
}

function horizontal() {
    for (let b = 0; b < board.length; b++) {
        let row = board[b];
        for (let a = 0; a < lineA; a++) {
            let place = row[a];
            if (
                place === board[b][a + 1] &&
                place === board[b][a + 2] &&
                place === board[b][a + 3] &&
                place != 0
            ) {
                winner();
            }
        }
    }
}

function vertical() {
    // console.log(board);
    for (let b = 0; b < lineB; b++) {
        let row = board[b];
        for (let a = 0; a < board[0].length; a++) {
            let place = row[a];
            // console.log(place);
            if (place === board[b + 1][a] &&
                place === board[b + 2][a] &&
                place === board[b + 3][a] &&
                place != 0
            ) {
                winner();
            }
        }
    }
}

function rightDiagonal() {
    for (let b = 0; b < lineB; b++) {
        let row = board[b];
        for (let a = 0; a < lineA; a++) {
            let place = row[a];
            if (
                place === board[b + 1][a + 1] &&
                place === board[b + 2][a + 2] &&
                place === board[b + 3][a + 3] &&
                place != 0
            ) {
                winner();
            }
        }
    }
}

function leftDiagonal() {
    for (let b = 3; b < board.length; b++) {
        let row = board[b];
        for (let a = 0; a < lineA; a++) {
            let place = row[a];
            if (
                place === board[b - 1][a + 1] &&
                place === board[b - 2][a + 2] &&
                place === board[b - 3][a + 3] &&
                place != 0
            ) {
                winner();
            }
        }
    }
}