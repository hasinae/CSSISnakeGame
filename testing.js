// Old testing code


  //draw animations
  //image(mouseFrontWalk, 50, 50, mouseSize, mouseSize);
  //image(mouseBackWalk, 50, 100, mouseSize, mouseSize);
  //image(mouseLWalk, 50, 150, mouseSize, mouseSize);
  //image(mouseRWalk, 50, 200, mouseSize, mouseSize);

  //draw images
  //image(mouseFront, 100, 50, mouseSize, mouseSize);
  //image(mouseBack, 100, 100, mouseSize, mouseSize);
  //image(mouseL, 100, 150, mouseSize, mouseSize);
  //image(mouseR, 100, 200, mouseSize, mouseSize);

  // function mouseClicked() {
  //   direction = "S";
  //   console.log('works')
  // }

//myInterval = setInterval(wDirection, random(1000,3000)); // tried interval, but I wasn't sure how to make the mouse stand after walking// mouse only moves direction

//wDirection(); put in draw func

// function wDirection() { // used for interval,, scrapped b/c i wasn't sure how to implement standing
//   let directions = ['N', 'E', 'W', 'S'];
//   direction = random(directions);
//   console.log(direction);
// }

// function mouseClicked() {
//   //makes the mouse move to a random direction
//   let directions = ["N", "E", "W", "S"]; // have to keep applying this everytime I use random(directions), it breaks when I put it on setup

//   direction = random(directions);
//   console.log("works");
// }

// function keyReleased() {
//   clear();
//   mouseFrontWalk.hide();
//   mouseBackWalk.hide();
//   mouseLWalk.hide();
//   mouseRWalk.hide();
//   if (keyCode === DOWN_ARROW) {
//     image(mouseFront, spriteX, spriteY, spriteSize, spriteSize);
//   } else if (keyCode === UP_ARROW) {
//     image(mouseBack, spriteX, spriteY, spriteSize, spriteSize);
//   } else if (keyCode === LEFT_ARROW) {
//     image(mouseL, spriteX, spriteY, spriteSize, spriteSize);
//   } else if (keyCode === RIGHT_ARROW) {
//     image(mouseR, spriteX, spriteY, spriteSize, spriteSize);
//   }
// }