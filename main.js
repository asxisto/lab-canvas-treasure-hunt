// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Iteration 1
function drawGrid() {
  // TODO: write the code of the function
  const SQUARE_COUNT = 10;
  const SQUARE_WIDTH = 50;
  for (let column = 0; column < SQUARE_COUNT; column++) {
    for (let row = 0; row < SQUARE_COUNT; row++) {
      context.strokeStyle = 'black'; // Line color
      context.lineWidth = 2; // Line width
      context.beginPath();
      context.rect(column * SQUARE_WIDTH, row * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
      context.stroke(); // Draw lines
    }
  }
}

// Iteration 2
class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveUp() {
    this.row--;
  }
  moveDown() {
    this.row++;
  }
  moveRight() {
    this.col++;
  }
  moveLeft() {
    this.col--;
  }
}

const player = new Character(0, 0); // (0,0) = Initial position

// player.moveDown(); // Increase by 1 the value of player.row
// player.moveDown(); // Increase by 1 the value of player.row
// player.moveRight(); // Increase by 1 the value of player.col

console.log(player.col, player.row); // => 1,2

// Iteration 3
function drawPlayer() {
  const pawn = new Image();
  pawn.src = 'images/character-down.png';

  pawn.addEventListener('load', () => {
    context.drawImage(pawn, player.col * 50, player.row * 50, 50, 50);
  });
}

// Iteration 4
class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }

  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}

const crystal = new Treasure(0, 0);
crystal.setRandomPosition();

//console.log(crystal.col, crystal.row);

function drawTreasure() {
  const gold = new Image();
  gold.src = './images/treasure.png';

  gold.addEventListener('load', () => {
    context.drawImage(gold, crystal.col * 50, crystal.row * 50, 50, 50);
  });
}

// Iteration 5
window.addEventListener('keydown', event => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.keyCode) {
    case 37:
      console.log('left');
      player.moveLeft();
      break;
    case 38:
      console.log('up');
      player.moveUp();
      break;
    case 39:
      console.log('right');
      player.moveRight();
      break;
    case 40:
      console.log('down');
      player.moveDown();
      break;
  }

  if (player.row === crystal.row && player.col === crystal.col) {
    let score = document.querySelector('h3 span');
    let incremented = parseInt(score.innerText) + 1;
    score.innerText = incremented;
    crystal.setRandomPosition();
  }

  drawEverything();
});

function drawEverything() {
  context.clearRect(0, 0, width, height);
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();
