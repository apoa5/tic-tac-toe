// script.js

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("game-board");
    const statusElement = document.getElementById("game-status");
    const resetButton = document.getElementById("reset-button");

    let board = Array.from({ length: 3 }, () => Array(3).fill(""));
    let currentPlayer = { name: "Player One", mark: "X" };
    let isGameOver = false;

    // Initialize board
    const initBoard = () => {
        boardElement.innerHTML = "";
        board.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                boardElement.appendChild(cell);
            });
        });
    };

    // Switch player
    const switchPlayer = () => {
        currentPlayer = currentPlayer.mark === "X"
            ? { name: "Player Two", mark: "O" }
            : { name: "Player One", mark: "X" };
    };

    // Check winner
    const checkWinner = () => {
        // Check rows, columns, and diagonals
        const checkLine = (line) => line.every(cell => cell === currentPlayer.mark);

        for (let i = 0; i < 3; i++) {
            if (checkLine(board[i]) || checkLine(board.map(row => row[i]))) return true;
        }

        // Check diagonals
        if (checkLine([board[0][0], board[1][1], board[2][2]]) ||
            checkLine([board[0][2], board[1][1], board[2][0]])) {
            return true;
        }

        return false;
    };

    // Check draw
    const checkDraw = () => {
        return board.flat().every(cell => cell !== "");
    };

    // Handle cell click
    const handleCellClick = (e) => {
        if (isGameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        if (board[row][col] === "") {
            board[row][col] = currentPlayer.mark;
            e.target.textContent = currentPlayer.mark;
            e.target.classList.add("taken");

            if (checkWinner()) {
                statusElement.textContent = `${currentPlayer.name} wins!`;
                isGameOver = true;
            } else if (checkDraw()) {
                statusElement.textContent = "It's a draw!";
                isGameOver = true;
            } else {
                switchPlayer();
                statusElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
            }
        }
    };

    // Reset game
    const resetGame = () => {
        board = Array.from({ length: 3 }, () => Array(3).fill(""));
        currentPlayer = { name: "Player One", mark: "X" };
        isGameOver = false;
        statusElement.textContent = "Player One's turn (X)";
        initBoard();
    };

    // Event listeners
    boardElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            handleCellClick(e);
        }
    });

    resetButton.addEventListener("click", resetGame);

    // Initialize game
    initBoard();
});
