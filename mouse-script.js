// VARIABLES that P5 and P5 Libraries have defined
/*globals amplitude, loadSound,direction, loadImage,image, setVolume, noFill, noStroke, fill, createCanvas, colorMode, HSB, background, ellipse, random, round, width, height, sqrt, rect, line, text, mouseX, mouseY, color,
  keyCode, keyIsDown, spriteX, spriteY, spriteSpeed, clear, DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW
  windowWidth, windowHeight, createImg, key, collidePointRect, mouseIsPressed,
  collideRectCircle, int, dist, createAudio
*/


// VARIABLES that we defined
let spriteSize,
  mouseFrontWalk,
  mouseBackWalk,
  mouseLWalk,
  mouseRWalk,
  mouseFront,
  mouseBack,
  mouseL,
  mouseR,
  mouseS,
  directions,
  myInterval,
  SecInt,
  test,
  manualM,
  clickMouse,
  apple1,
  apple2,
  apple3,
  apples,
  hitApple,
  crunch,
  seeker,
  clickApple,
  carry,
  mouse;

function preload() {
  //animations
  mouseFrontWalk = createImg(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2FPhoto%20Jul%2030%2C%202%2058%2059%20PM.gif?v=1627683506561"
  );
  mouseFrontWalk.size(40, 40);
  mouseBackWalk = createImg(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2FPhoto%20Jul%2030%2C%202%2058%2050%20PM.gif?v=1627683722781"
  );
  mouseBackWalk.size(40, 40);
  mouseLWalk = createImg(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2FPhoto%20Jul%2030%2C%202%2058%2036%20PM.gif?v=1627683709167"
  );
  mouseLWalk.size(40, 40);
  mouseRWalk = createImg(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2FPhoto%20Jul%2030%2C%202%2058%2025%20PM.gif?v=1627683711918"
  );
  mouseRWalk.size(40, 40);

  // images
  mouseFront = loadImage(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2Fmousestand.png?v=1627683953418"
  );
  mouseBack = loadImage(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2Fmouseback.png?v=1627683960184"
  );
  mouseL = loadImage(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2Fmouseside2.png?v=1627683955834"
  );
  mouseR = loadImage(
    "https://cdn.glitch.com/d88d5cea-d8de-4537-8f47-2b990c239ab4%2Fmouseside.png?v=1627683958006"
  );

  //sounds
  mouseS = createAudio(
    "https://cdn.glitch.com/d8122f2d-7994-48a7-b53b-9eed2ac0f3e5%2Fmixkit-mouse-squeak-1019.wav?v=1628012133455"
  );
  crunch = createAudio(
    "https://cdn.glitch.com/d8122f2d-7994-48a7-b53b-9eed2ac0f3e5%2Fmixkit-eating-crispy-cookies-122%20(mp3cut.net).mp3?v=1628016459872"
  );

  // apples
  apple1 = loadImage(
    "https://cdn.glitch.com/d8122f2d-7994-48a7-b53b-9eed2ac0f3e5%2Fapple1.png?v=1628014243204"
  );

  apple2 = loadImage(
    "https://cdn.glitch.com/d8122f2d-7994-48a7-b53b-9eed2ac0f3e5%2Fapple2.png?v=1628014246732"
  );

  apple3 = loadImage(
    "https://cdn.glitch.com/d8122f2d-7994-48a7-b53b-9eed2ac0f3e5%2Fapple3.png?v=1628014249998"
  );
}

function setup() {
  // Canvas & color settings
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("pointer-events", "none");
  spriteX = int(width / 2);
  spriteY = int(100);
  spriteSpeed = 2;
  spriteSize = 40;
  direction = "";
  myInterval = setInterval(wDirection, random(1000, 3000)); //changes direction randomly
  SecInt = setInterval(call, 5000); //makes sprite idle randomly
  test = true;
  manualM = false;
  apples = new Apple();
  seeker = false;
  carry = false;
}

function draw() {
  if (seeker === true) {
    seekApple();
  }
  if (test == true && manualM == false) {
    autoWalk();
    console.log("autowalk on");
  } else if (manualM == true) {
    spriteWalk();
  } else {
    spriteIdle();
  }
  spriteStay();
  apples.showSelf();
  appleCollision();
  carryMouse();
}

// below interval functions

function wDirection() {
  // test directions
  let directions = ["N", "E", "W", "S"];
  clearInterval(myInterval);
  console.log(direction);
  if (!seeker) {
    direction = random(directions);
    myInterval = setInterval(wDirection, random(1000, 3000));
  }
}

function call() {
  test *= -1; //calls idle
  clearInterval(SecInt);
  SecInt = setInterval(call, 5000);
}

// below sprite interactions

function autoWalk() {
  clearAll();
  if (direction === "S") {
    spriteY += spriteSpeed;
    mouseFrontWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseFrontWalk.show();
  } else if (direction === "N") {
    spriteY -= spriteSpeed;
    mouseBackWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseBackWalk.show();
  } else if (direction === "W") {
    spriteX -= spriteSpeed;
    mouseLWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseLWalk.show();
  } else if (direction === "E") {
    spriteX += spriteSpeed;
    mouseRWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseRWalk.show();
  }
}

function spriteWalk() {
  clearAll();
  spriteSpeed = 2; // when switching back to manual,, the walk speed sometimes stays 0 due to auto function
  if (keyIsDown(DOWN_ARROW)) {
    clear();
    spriteY += spriteSpeed;
    mouseFrontWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseFrontWalk.show();
  } else if (keyIsDown(UP_ARROW)) {
    clear();
    spriteY -= spriteSpeed;
    mouseBackWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseBackWalk.show();
  } else if (keyIsDown(LEFT_ARROW)) {
    clear();
    spriteX -= spriteSpeed;
    mouseLWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseLWalk.show();
  } else if (keyIsDown(RIGHT_ARROW)) {
    clear();
    spriteX += spriteSpeed;
    mouseRWalk.position(spriteX, spriteY, spriteSize, spriteSize);
    mouseRWalk.show();
  } else {
    spriteIdle();
  }
}

function spriteIdle() {
  clearAll();
  switch (direction) {
    case "N":
      image(mouseBack, spriteX, spriteY, spriteSize, spriteSize);
      break;
    case "E":
      image(mouseR, spriteX, spriteY, spriteSize, spriteSize);
      break;
    case "S":
      image(mouseFront, spriteX, spriteY, spriteSize, spriteSize);
      break;
    case "W":
      image(mouseL, spriteX, spriteY, spriteSize, spriteSize);
      break;
  }
}

function spriteStay() {
  if (spriteX + spriteSize / 2 < 0) {
    spriteX = windowWidth - spriteSize / 2;
  } else if (spriteX + spriteSize / 2 > windowWidth) {
    spriteX = 0;
  } else if (spriteY + spriteSize / 2 < 0) {
    spriteY = windowHeight - spriteSize / 2;
  } else if (spriteY + spriteSize / 2 > windowHeight) {
    spriteY = 0;
  }
}

function mouseCollision() { // mouse hits sprite
  clickMouse = dist(
    mouseX,
    mouseY,
    spriteX,
    spriteY,
  );
  if (clickMouse < 50) {
    mouseS.play();
    console.log("mouse hits sprite");
    carry = !carry;
    seeker = !seeker;
    test = !test;
    manualM = false;
  }
}

function carryMouse(){
  if (carry){
    spriteX = mouseX - 20;
    spriteY = mouseY;
  } 
}

// below apple interactions

class Apple {
  constructor() {
    this.size = 20;
    this.x = int(random(10, width - this.size));
    this.y = int(random(10, height - this.size));
    this.cycle = 3;
  }

  showSelf() {
    fill(10, 80, 90);
    noFill();
    switch (this.cycle) {
      case 3:
        image(apple1, this.x, this.y, this.size, this.size);
        break;
      case 2:
        image(apple2, this.x, this.y, this.size, this.size);
        break;
      case 1:
        image(apple3, this.x, this.y, this.size, this.size);
        break;
    }
  }
}
 
function appleCollision() { // sprite hits apple
  hitApple = dist(
    spriteX,
    spriteY,
    apples.x,
    apples.y,
  );
  console.log(`${hitApple}`);
  if (hitApple < 30) {
    console.log("sprite hits apple");
    seeker = false;
    wDirection();
    crunch.play();
    apples.x = random(10, width - apples.size);
    apples.y = random(10, height - apples.size);
    apples.cycle--;
    if (apples.cycle == 0) {
      apples = new Apple();
    }
  }
  clickApple = dist( // mouse hits apple
    mouseX,
    mouseY,
    apples.x,
    apples.y,
  );
}

function seekApple() { // sprite seeks apple
  // with just regular if statements, two conditionals would often conflict each other,
  // resulting in a repeat and never reaching the next conditionals
  // using a more specific if statement prevents the conditionals from conflicting
  // i hope the comments explain everything lol
  if (apples.y >= spriteY && apples.x > spriteX) {
    // if apple is bottom-right, go down (S)
    direction = "S";
    consoles.y === sprite.log("seeks apple S");
    if (appleY) {
      // once it reaches same y-cord go right (E)
      direction = "E";
      console.log("seeks apple E");
    }
  } else if (apples.x >= spriteX && apples.y < spriteY) {
    // if apple is right-top, go right (E)
    direction = "E";
    console.log("seeks apple E2");
    if (apples.x === spriteX) {
      // once it reaches same x-cord go up (N)
      direction = "N";
      console.log("seeks apple N2");
    }
  } else if (apples.y <= spriteY && apples.x < spriteX) {
    // if apple is top-left, go up (N)
    direction = "N";
    console.log("seeks apple N");
    if (apples.y === spriteY) {
      // once it reaches same y-cord go left (W)
      direction = "W";
      console.log("seeks apple W");
    }
  } else if (apples.x <= spriteX && apples.y > spriteY) {
    // if apple is left-bottom, go left (W)
    direction = "W";
    console.log("seeks apple W2");
    if (apples.x === spriteX) {
      // once it reaches same x-cord go down (S)
      direction = "S";
      console.log("seeks apple S2");
    }
  }
}

// below user interactions

function keyTyped() 
{
  if (key === "q") 
  { // changes to manual walk
    manualM = true;
    clearAll();
    image(mouseFront, spriteX, spriteY, spriteSize, spriteSize); // draws sprite
    console.log("manual mode");
  } else if (key === "a") 
  { // makes new apple
    apples = new Apple();
  } else if (key === "s") 
  {
    seeker = true;
  } else if (key === "d") 
  { // changes to auto walk
    seeker = false;
    test = true;
    manualM = false;
    wDirection();
  }
}

function mouseClicked() 
{
  mouseCollision();
  if (clickApple < 30) 
  {
    console.log("Apple is clicked");
    seeker = true;
    manualM = false;
    mouseS.play();
  }
}

function clearAll()
{
  clear();
  mouseFrontWalk.hide();
  mouseBackWalk.hide();
  mouseLWalk.hide();
  mouseRWalk.hide();
}

