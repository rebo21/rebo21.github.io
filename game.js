const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const basket = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 50,
  width: 100,
  height: 20,
  dx: 0,
};

const items = [];
const itemSpeed = 2;
const basketSpeed = 5;
let score = 0;
let gameOver = false;

function drawBasket() {
  ctx.fillStyle = "blue";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawItem(item) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function updateItems() {
  items.forEach((item, index) => {
    item.y += itemSpeed;

    if (item.y + item.radius > canvas.height) {
      items.splice(index, 1);
      gameOver = true;
    }

    if (
      item.y + item.radius > basket.y &&
      item.x > basket.x &&
      item.x < basket.x + basket.width
    ) {
      items.splice(index, 1);
      score++;
    }
  });
}

function createItem() {
  const x = Math.random() * canvas.width;
  const radius = 20;
  items.push({ x, y: 0, radius });
}

function moveBasket() {
  basket.x += basket.dx;

  if (basket.x < 0) {
    basket.x = 0;
  }

  if (basket.x + basket.width > canvas.width) {
    basket.x = canvas.width - basket.width;
  }
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBasket();
  items.forEach(drawItem);
  updateItems();
  moveBasket();

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    basket.dx = basketSpeed;
  } else if (e.key === "ArrowLeft") {
    basket.dx = -basketSpeed;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    basket.dx = 0;
  }
});

setInterval(createItem, 1000);
update();
