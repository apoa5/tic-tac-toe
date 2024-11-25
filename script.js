// GameBoard Function
function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () => Array(columns).fill(""));
    const getBoard = () => board;
    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i].fill("");
        }
    };

    return {
        getBoard,
        resetBoard,
    };
}

// GameController Function
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const players = [
        { name: playerOneName, mark: "X" },
        { name: playerTwoName, mark: "O" },
    ];
    let currentPlayer = players[0];

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const makeMove = (row, col, board) => {
        if (board[row][col] === "") {
            board[row][col] = currentPlayer.mark; // Place mark
            return true;
        }
        return false; // Invalid move
    };

    return {
        getCurrentPlayer,
        switchCurrentPlayer,
        makeMove,
    };
}

// Check for win conditions
const checkWinner = (board) => {
    const size = board.length;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
        if (board[i].every(cell => cell === board[i][0] && cell !== "")) return board[i][0];
        if (board.map(row => row[i]).every(cell => cell === board[0][i] && cell !== "")) return board[0][i];
    }

    // Check diagonals
    if (board.every((row, i) => row[i] === board[0][0] && row[i] !== "")) return board[0][0];
    if (board.every((row, i) => row[size - 1 - i] === board[0][size - 1] && row[size - 1 - i] !== "")) return board[0][size - 1];

    return null; // No winner
};

const isDraw = (board) => {
    return board.flat().every(cell => cell !== "");
};

const displayBoard = (board) => {
    console.log("\nCurrent Board:");
    board.forEach(row => console.log(row.join(" | ")));
    console.log("");
};

// Main Game Loop
function playTicTacToe() {
    const gameBoard = GameBoard();
    const gameController = GameController();
    const board = gameBoard.getBoard();
    let gameOver = false;

    console.log("Welcome to Tic-Tac-Toe!");

    while (!gameOver) {
        displayBoard(board);
        const currentPlayer = gameController.getCurrentPlayer();
        console.log(`${currentPlayer.name}'s turn (${currentPlayer.mark})`);

        const row = parseInt(prompt("Enter row (0-2): "));
        const col = parseInt(prompt("Enter column (0-2): "));

        if (row < 0 || row > 2 || col < 0 || col > 2 || isNaN(row) || isNaN(col)) {
            console.log("Invalid input. Please enter numbers between 0 and 2.");
            continue;
        }

        if (gameController.makeMove(row, col, board)) {
            const winner = checkWinner(board);
            if (winner) {
                displayBoard(board);
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
            } else if (isDraw(board)) {
                displayBoard(board);
                console.log("It's a draw!");
                gameOver = true;
            } else {
                gameController.switchCurrentPlayer();
            }
        } else {
            console.log("Cell already taken! Try again.");
        }
    }

    console.log("Game over!");
}

playTicTacToe();
