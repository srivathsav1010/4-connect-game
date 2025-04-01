const ROWS = 6;
const COLUMNS = 7;
const PLAYER_ONE = "red";
const PLAYER_TWO = "yellow";

let currentPlayer = PLAYER_ONE;
let board = [];
let gameOver = false;
const statusText = document.getElementById("status");

function initializeBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
    gameOver = false;
    renderBoard();
}

function renderBoard() {
    const gameContainer = document.querySelector(".game-board");
    gameContainer.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.row = row;
            cellDiv.dataset.col = col;

            if (board[row][col]) {
                cellDiv.classList.add(board[row][col]);
            }

            cellDiv.addEventListener("click", () => handleCellClick(col));
            gameContainer.appendChild(cellDiv);
        }
    }
}

function handleCellClick(col) {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            if (checkWin(row, col)) {
                gameOver = true;
                highlightWinningCells(row, col);
                return;
            }
            currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
            renderBoard();
            return;
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countInDirection(row, col, rowDir, colDir);
    count += countInDirection(row, col, -rowDir, -colDir);
    return count >= 4;
}

function countInDirection(row, col, rowDir, colDir) {
    let count = 0, r = row + rowDir, c = col + colDir;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && board[r][c] === currentPlayer) {
        count++; r += rowDir; c += colDir;
    }
    return count;
}

function highlightWinningCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        if (cell.classList.contains(currentPlayer)) {
            cell.classList.add("winner");
        }
    });
}

document.getElementById("restart").addEventListener("click", initializeBoard);
initializeBoard();
