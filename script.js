let origBoard;
let huPlayer = 'X';
let comPlayer = 'O';
let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

let cells = document.querySelectorAll('.cell')

startGame();
//function to start the game
function startGame() {
    origBoard = Array.from(Array(9).keys())
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick, false);
        cells[i].addEventListener('click', turnClick, false);

    }
}


function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer)
        if (!checkTie()) turn(bestSpot(), comPlayer);
    }

}

function turn(squareID, player) {
    origBoard[squareID] = player;
    document.getElementById(squareID).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

//Function to check game winner
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "crimson" : "#9B2335";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "You Won" : "You Lose");
}

// Function for declaring winner

function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}


function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return emptySquares()[0];
}


//Function to check whether it is a tie?  


function checkTie(){
    if(emptySquares().length == 0){
        for(var i =0; i < cells.length; i++){
            cells[i].style.backgroundColor = "aliceblue";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true; 
    }
    return false;
}

// Function to replay the game


function replay(){
    location.reload();
}