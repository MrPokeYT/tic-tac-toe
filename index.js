document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const gameButton = document.getElementById("game-button");
    const currentPlayerDisplay = document.getElementById("current-player");
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertButton = document.getElementById("custom-alert-button");

    let currentPlayer = "X";
    let gameActive = false;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function updateTurnIndicator() {
        currentPlayerDisplay.textContent = gameActive ? currentPlayer : "-";
    }

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-cell-index");

        if (gameState[cellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        if (checkWinner()) {
            showCustomAlert(`¡Jugador ${currentPlayer} gana!`);
            gameActive = false;
            updateTurnIndicator();
            return;
        }

        if (!gameState.includes("")) {
            showCustomAlert("¡Empate!");
            gameActive = false;
            updateTurnIndicator();
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateTurnIndicator();
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }

    function startGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });

        gameButton.textContent = "Reiniciar";
        updateTurnIndicator();
    }

    function showCustomAlert(message) {
        customAlertMessage.textContent = message;
        customAlert.classList.remove("hidden");
    }

    function hideCustomAlert() {
        customAlert.classList.add("hidden");
    }

    gameButton.addEventListener("click", startGame);
    customAlertButton.addEventListener("click", hideCustomAlert);

    cells.forEach((cell, index) => {
        cell.setAttribute("data-cell-index", index);
        cell.addEventListener("click", handleCellClick);
    });

    updateTurnIndicator();
});
