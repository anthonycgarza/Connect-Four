const WIDTH = 7;
const HEIGHT = 6;
 
let currPlayer = 1; 
let board = []; 
let gameOver = false; 
let winningArray = null;
let player1 = document.getElementById("p1-title")
let player2 = document.getElementById("p2-title")

const reset = document.getElementById('reset');
reset.addEventListener('click', resetBoard);
 
function resetBoard () {
     location.reload();
 }
 
 
function makeBoard (width, height) {
     for (let y = 0; y < height; y++) {
         let row = [];
         for (let x = 0; x < width; x++) {
             row.push(null);
         }
         board.push(row);
     }
}
 
 
function makeHtmlBoard () {
   
    const htmlBoard = document.getElementById('board');
 
    
    let top = document.createElement('tr');
     top.setAttribute('id', 'column-top');
    top.classList.add(`player${currPlayer}`);
    top.addEventListener('click', handleClick);
 
    for (let x = 0; x < WIDTH; x++) {
        let headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.classList.add(`player${currPlayer}`);
        top.append(headCell);
    }
    
    htmlBoard.append(top);
 
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement('tr');
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
        }
         
        htmlBoard.append(row);
    }
}
 

function findSpotForCol (x) {
     
    for (let y = HEIGHT - 1; y > -1; y--) {
        const cell = document.getElementById(`${y}-${x}`);
        if (cell.firstElementChild == null) {
            return y;
        }
    }
    return null;
}
 
function isComputer(){
        document.getElementById("p2-title").value = "COMPUTER";
         
}

function computerPlay(){
    let x = Math.floor(math.random() )
}


function placeInTable (y, x) {
    const div = document.createElement('div');
    const cell = document.getElementById(`${y}-${x}`);
    div.classList.add('piece', `p${currPlayer}`);
    cell.append(div);
}
 

function endGame (msg) {
    gameOver = true;
    alert(`${msg}`);
}
 
function handleClick (evt) {
    if (gameOver) {
        return;
    }
 
    let x = +evt.target.id;
 
    let y = findSpotForCol(x);
    if (y === null) {
        return;
    }
 
    placeInTable(y, x);
 
    board[y][x] = currPlayer;
 
    if (checkForWin()) {
        highlightWinner(winningArray);
        endGame(`Player ${currPlayer} won!`);
    }
 
    function checkForTie () {
        let nullCount = 0;
        for (let w = 0; w < WIDTH; w++) {
            if (findSpotForCol(w) == null) {
                nullCount += 1;
            }
        }
        if (nullCount == WIDTH) {
            return endGame("The board is full, it's a tie!");
        }
        return;
    }
 
    checkForTie();
 
    currPlayer = currPlayer == 1 ? 2 : 1;
 
    function hoverColor (player) {
        const oldPlayer = player == 1 ? 2 : 1;
        const topRow = document.getElementById('column-top');
 
        topRow.classList.replace(`player${oldPlayer}`, `player${currPlayer}`);
    }
 
    hoverColor(currPlayer);
}
 
function checkForWin () {
 
    function _win (cells) {
        if (cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer)) {
            winningArray = cells;
            return true;
        }
    }
 
 
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
             //array of four coordiantes extending horizontally from (y,x)
            const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
             //array of four coordiantes extending vertically from (y,x)
            const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
             //array of four coordiantes extending diagonally right from (y,x)
            const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
             //array of four coordiantes extending diagonally left from (y,x)
            const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];
             //Each potential winner array is checked against winning conditions
             //if any of the four array's meet winning conditions, return true
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}
 
function highlightWinner (winningArray) {
    for (i of winningArray) {
        const cell = document.getElementById(`${i[0]}-${i[1]}`);
        cell.setAttribute('style', 'border: 2px solid yellow;');
    }
}
 
makeBoard(WIDTH, HEIGHT);
makeHtmlBoard();