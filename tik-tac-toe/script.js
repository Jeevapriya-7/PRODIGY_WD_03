const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameOver = false;

// Winning patterns
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Add click event to all cells
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerText === "" && !gameOver) {
      cell.innerText = currentPlayer;

      if (checkWin()) {
        statusText.innerText = "Player " + currentPlayer + " Wins!";
        gameOver = true;
        return;
      }

      if (checkDraw()) {
        statusText.innerText = "It's a Draw!";
        gameOver = true;
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.innerText = "Player " + currentPlayer + "'s turn";
    }
  });
});

// Check win
function checkWin() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      return true;
    }
  }
  return false;
}

// Check draw
function checkDraw() {
  return [...cells].every(cell => cell.innerText !== "");
}

// Restart game
restartBtn.addEventListener("click", () => {
  cells.forEach(cell => cell.innerText = "");
  currentPlayer = "X";
  gameOver = false;
  statusText.innerText = "Player X's turn";
});