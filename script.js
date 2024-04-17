// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    colorMode, createCanvas, background, backgroundColor, random, noStroke
 *    HSB, height, width, fill, ellipse, windowWidth, windowHeight,
 *    frameRate, stroke, noFill, rect, keyCode, UP_ARROW, DOWN_ARROW,
 *    LEFT_ARROW, RIGHT_ARROW, text, collideRectRect,loadImage, image,loadSound
 *    tint,noTint,loop, second
 */

let backgroundColor,
  playerSnake,
  currentApple,
  score,
  gameStatus,
  appI,
  backI,
  chomp,
  snakeU, snakeL, snakeR, snakeD,
  appleInt;


// let s = second();

function setup() {
  
  // Canvas & color settings
  createCanvas(300, 300);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(10);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
  gameStatus = true;
  
  backI = loadImage(
    "https://cdn.glitch.com/a190ed9a-a0c5-4a6f-b5e2-72cf5d2fa449%2F37716068933bae2f9b11ff90bc91b015.jpg?1627413012345"
  );
  appI = loadImage(
    "https://cdn.glitch.com/a190ed9a-a0c5-4a6f-b5e2-72cf5d2fa449%2Fapple-mcIntosh.png?v=1627412742863"
  );
  chomp = loadSound(
    "https://cdn.glitch.com/a190ed9a-a0c5-4a6f-b5e2-72cf5d2fa449%2Faud_chomp.mp3?v=1627413461005"
  );
  
  snakeU = loadImage(
    "https://cdn.glitch.com/a190ed9a-a0c5-4a6f-b5e2-72cf5d2fa449%2Fimage.png?v=1627414458172"
  );
  snakeL = loadImage("https://cdn.glitch.com/87771fdb-9785-43e8-a133-958250606af7%2Fimage%20(2).png?v=1627499775623")
  snakeR = loadImage("https://cdn.glitch.com/87771fdb-9785-43e8-a133-958250606af7%2Fimage%20(1).png?v=1627499774257")
  snakeD = loadImage("https://cdn.glitch.com/a190ed9a-a0c5-4a6f-b5e2-72cf5d2fa449%2Fimageedit_2_8966317900.png?v=1627414209016")
  appleInt = setInterval(appleTime, 5000) // setInterval(function,time in ms)
}

function draw() {
  if (gameStatus == true) {
    background(backI);
    // The snake performs the following four methods:
    currentApple.showSelf();
    playerSnake.moveSelf();
    playerSnake.showSelf();
    playerSnake.checkCollisions();
    playerSnake.checkApples();
    // The apple needs fewer methods than the snake to show up on screen.
    //currentApple.showSelf();
    // We put the score in its own function for readability.
    displayScore();
  }
}

function displayScore() {
  fill(90);
  text(`Score: ${score}`, 20, 20);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "";
    this.speed = 10;
    this.tail = [];
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.head = snakeU;
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
      image(snakeU, this.x - 10, this.y - 5, this.size + 20, this.size + 20);
    } else if (this.direction === "S") {
      this.y += this.speed;
      image(snakeD, this.x - 10, this.y - 5, this.size + 20, this.size + 20);
    } else if (this.direction === "E") {
      this.x += this.speed;
      image(snakeR, this.x - 10, this.y - 5, this.size + 20, this.size + 20);
    } else if (this.direction === "W") {
      this.x -= this.speed;
      image(snakeL, this.x - 10, this.y - 5, this.size + 20, this.size + 20);
    } else {
      console.log("Error: invalid direction");
    }
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.tail.pop();
  }

  showSelf() {
    stroke(140, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();

    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    if (
      collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        currentApple.x,
        currentApple.y,
        currentApple.size + 10,
        currentApple.size + 10
      )
    ) {
      score++;
      appleTime();
      chomp.play();
      this.speed += 1;
      this.extendTail();
    }
  }

  checkCollisions() {
    if (
      this.x + this.size > width ||
      this.x < 0 ||
      this.y + this.size > height ||
      this.y < 0
    ) {
      gameOver();
    } else if (this.tail.length <= 2) {
      return;
    }
    for (let i = 1; i < this.tail.length; i++) {
      if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
        gameOver();
      }
    }
  }
  extendTail() {
    // Add a new segment at the end of the tail.
    let lastTailSegment = this.tail[this.tail.length - 1];
    // Push a new tail segment to the end of the tail array.
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y));
  }
}
class TailSegment {
  constructor(x, y) {
    this.size = 10;
    this.x = x;
    this.y = y;
  }
  showSelf() {
    fill(70, 69, 80);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
}
class Apple {
  constructor() {
    this.size = 10;
    this.x = random(10, width - this.size - 10);
    this.y = random(10, height - this.size - 10);
  }

  showSelf() {
    fill(10, 80, 90);
    noFill();
    image(appI, this.x, this.y, this.size + 10, this.size + 10);
    rect(this.x, this.y, this.size, this.size);
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
  if (keyCode == 32) {
    // space
    restartGame();
  }
}

function restartGame() {
  gameStatus = true;
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function gameOver() {
  fill(90);
  text("Game Over! Press space to restart", 80, 20);
  gameStatus = false;
}

function appleTime()
{
  currentApple = new Apple();
  clearInterval(appleInt);
  appleInt = setInterval(appleTime, 5000); 
}
