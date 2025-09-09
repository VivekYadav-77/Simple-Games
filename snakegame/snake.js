const board = document.getElementById("game-board");
const ctx = board.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const resumeBtn = document.getElementById("resume-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.getElementById("msg");
const resumePopup = document.getElementById("resume-popup");
const newGameBtn = document.getElementById("new-btn");
const boardSize = 400;
const boxSize = 20;
board.width = boardSize;
board.height = boardSize;

let snake, direction, food, bonusFood, score, gameInterval, bonusTimer;
let isPaused = false;
let gameRunning = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.code === "Space" && gameRunning) togglePause();
});

function drawBoard() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, boardSize, boardSize);
}

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach((part) => ctx.fillRect(part.x, part.y, boxSize, boxSize));
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
  if (bonusFood) {
    ctx.fillStyle = "gold";
    ctx.fillRect(bonusFood.x, bonusFood.y, boxSize, boxSize);
  }
}

function moveSnake() {
  let head = { ...snake[0] };
  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    food = spawnFood();
    if (Math.random() < 0.3) spawnBonusFood();
  } else if (bonusFood && head.x === bonusFood.x && head.y === bonusFood.y) {
    score += 5;
    scoreDisplay.innerText = `Score: ${score}`;
    bonusFood = null;
    clearTimeout(bonusTimer);
  } else {
    snake.pop();
  }
}

function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize)
    return true;
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (boardSize / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (boardSize / boxSize)) * boxSize,
  };
}

function spawnBonusFood() {
  bonusFood = spawnFood();
  bonusTimer = setTimeout(() => (bonusFood = null), 5000);
}

function gameLoop() {
  if (!isPaused) {
    if (checkCollision()) {
      endGame();
      return;
    }
    drawBoard();
    drawFood();
    moveSnake();
    drawSnake();
  }
}

function startGame(resetScore = true) {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  if (resetScore) score = 0;
  food = spawnFood();
  bonusFood = null;
  scoreDisplay.innerText = `Score: ${score}`;
  msgContainer.classList.add("hide");
  clearInterval(gameInterval);
  isPaused = false;
  gameRunning = true;
  gameInterval = setInterval(gameLoop, 200);
  startBtn.classList.add("hide");
  resumeBtn.classList.remove("hide");
}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    showPopup("Paused", true);
  } else {
    msgContainer.classList.add("hide");
  }
}

function endGame() {
  clearInterval(gameInterval);
  gameRunning = false;
  showPopup("Game Over! Final Score: " + score, false);
  resumeBtn.classList.add("hide");
}

function showPopup(message, allowResume) {
  msg.innerText = message;
  msgContainer.classList.remove("hide");

  if (allowResume) resumePopup.classList.remove("hide");
  else resumePopup.classList.add("hide");
}

function resetToStartScreen() {
  gameRunning = false;
  clearInterval(gameInterval);
  msgContainer.classList.add("hide");
  startBtn.classList.remove("hide");
  resumeBtn.classList.add("hide");
  restartBtn.classList.add("hide");
  scoreDisplay.innerText = "Score: 0";
  drawBoard();
  snake = [{ x: 200, y: 200 }];
  drawSnake();
}
startBtn.addEventListener("click", () => startGame(true));
resumeBtn.addEventListener("click", () => togglePause());

resumePopup.addEventListener("click", () => togglePause());
newGameBtn.addEventListener("click", () => resetToStartScreen());
resetToStartScreen();
