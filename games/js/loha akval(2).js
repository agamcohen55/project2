const cells = document.querySelectorAll("[data-cell]");
const restartButton = document.getElementById("restart");
const winnerMessage = document.getElementById("winner-message");
let xIsNext = true;
let winner = null;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            winner = cells[a].textContent;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
        }
    }

    if (winner) {
        winnerMessage.textContent = `${winner} ניצח!`;
        winnerMessage.style.display = "block";
    }
}

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.textContent || winner) return;
        cell.textContent = xIsNext ? "X" : "O";
        xIsNext = !xIsNext;
        cell.classList.add("clicked");
        checkWinner();
    });
});

restartButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("winner", "clicked");
    });
    xIsNext = true;
    winner = null;
    winnerMessage.style.display = "none";
});
