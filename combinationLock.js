/***************************************************
* combinationLock.js
* John Dean
*
* This file handles drawing a combination lock and
* having it move.
***************************************************/

// x and y coordinates for the face's center point.
const CENTER_X = 250;       // center of dial x position
const CENTER_Y = 200;       // center of dial y position
const CASING_RADIUS = 160;  // casing for the dial
const DIAL_RADIUS = 120;    // dial shows hash marks & numbers
const KNOB_RADIUS = 45;     // the turning mechanism (if real)
const POINTER_HEIGHT = 16;  // height of triangle at top
const NUM_OF_TICK_MARKS = 40; // tick indicate dial positions
const TICK_WIDTH = 4;       // width of each tick mark

var ctx;    // the canvas object's context

var destArray =[]; //array for the password
var lengthOfArray = 4; //length of the array

// EXTRA CREDIT:
var currentTick = 0;        // number at top of dial

//*************************************************

// This function draws the combination lock.

function initializeCanvas() {
  var canvas; // the canvas element

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  drawCasing();
  drawDial(0);
} // end initializeCanvas

//*************************************************

// This function draws the lock's casing.

function drawCasing() {
  ctx.fillStyle = "silver";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, CASING_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Draw line that surrounds the dial
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, DIAL_RADIUS + 4,
    -.48 * Math.PI, 1.48 * Math.PI);
  ctx.stroke();

  // Draw dial's pointer
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(CENTER_X, CENTER_Y - DIAL_RADIUS);
  ctx.lineTo(CENTER_X + POINTER_HEIGHT,
    CENTER_Y - DIAL_RADIUS - POINTER_HEIGHT);
  ctx.lineTo(CENTER_X - POINTER_HEIGHT,
    CENTER_Y - DIAL_RADIUS - POINTER_HEIGHT);
  ctx.fill();
} // end drawCasing

//*************************************************

// This function draws the lock's dial.

function drawDial(adjustedTicks) {
  ctx.translate(CENTER_X, CENTER_Y);

  // Use passed-in ticks to adjust current rotatation.
  ctx.rotate(adjustedTicks * 2 * Math.PI / NUM_OF_TICK_MARKS);

  // draw dial background
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(0, 0, DIAL_RADIUS, 0, 2 * Math.PI);
  ctx.fill();

  // draw knob
  ctx.beginPath();
  ctx.fillStyle = "darkslategray";
  ctx.arc(0, 0, KNOB_RADIUS, 0, 2 * Math.PI);
  ctx.fill();

  // Draw center label
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 25px Times, serif";
  ctx.fillText("Dogo", 0, 0);

  // Draw hash marks and numbers
  ctx.strokeStyle = "white";
  ctx.lineWidth = TICK_WIDTH;
  ctx.textBaseline = "top";
  ctx.font = "20px Arial, sans-serif";

  ctx.beginPath();
  for (var i=0; i<NUM_OF_TICK_MARKS; i++) {
    if (i % 5 == 0) {
      ctx.fillText(i.toString(), 0, -DIAL_RADIUS + 22);
      ctx.moveTo(0, -DIAL_RADIUS + 20);
    }
    else {
      ctx.moveTo(0, -DIAL_RADIUS + 14);
    }
    ctx.lineTo(0, -DIAL_RADIUS + 4)
    ctx.rotate(2 * Math.PI / NUM_OF_TICK_MARKS);
  } // end for
  ctx.stroke();

  // Restore canvas origin so next drawDial works.
  ctx.translate(-CENTER_X, -CENTER_Y);
} // end drawDial

//**************************************

// This function rotates the dial counter-clockwise by one tick.

function nudgeLeft() {
  drawDial(-1);
  currentTick = (currentTick + 1) % NUM_OF_TICK_MARKS;  // EXTRA CREDIT
} // end nudgeLeft

// This function rotates the dial clockwise by one tick.

function nudgeRight() {
  drawDial(1);

  // EXTRA CREDIT:

  // The following modulus assignment should work according to the
  // mathematical definition of modulus, but it does not work because
  // JavaScript implements the modulus operator incorrectly.
  // currentTick = (currentTick - 1) % NUM_OF_TICK_MARKS;

  currentTick--;
  if (currentTick < 0) {
    currentTick += NUM_OF_TICK_MARKS;
  }
} // end nudgeRight

function selectNumber(){
  //got the current tick value
  // 1. get the value from the currentTick
  // 2. store the values in the array everytime the button is clicked
  // 3. use the same value for Password and password length < 7

  var value = currentTick;
  destArray.push(value);
  console.log(destArray);

  if(destArray.length == lengthOfArray){
    window.alert("The password can't be longer than 4 values.");
    document.getElementById("selectButton").disabled = true;
    var finalValue = destArray.join(""); //eliminating the comma from array values
    document.getElementById("destination").value = finalValue;
  }
}
//Assignment to add the value from the lock dial into the password section


//**************************************

// EXTRA CREDIT:

// This function rotates the dial counter-clockwise
// to the user-specified target number.

function leftToTarget(form) {
  var target; // tick number user wants to go to
  var moveTicks; // move this number of ticks on the dial

  target = parseInt(form.elements["target"].value);
  moveTicks = target - currentTick;
  if (moveTicks < 0) {
    moveTicks = NUM_OF_TICK_MARKS + moveTicks;
  }

  // Every 1/10 of a second, move the dial one tick.
  for (var i=0; i<moveTicks; i++) {
    setTimeout(
      function () {
        drawDial(-1);
      }, i * 100)
  } // end for

  currentTick = target;
} // end leftToTarget

//**************************************

// This function rotates the dial clockwise
// to the user-specified target number.

function rightToTarget(form) {
  var target;    // number user wants to go to
  var moveTicks; // move this number of ticks on the dial

  target = parseInt(form.elements["target"].value);
  moveTicks = currentTick - target;
  if (moveTicks < 0) {
    moveTicks = NUM_OF_TICK_MARKS + moveTicks;
  }

  // Every 1/10 of a second, move the dial one tick.
  for (var i=0; i<moveTicks; i++) {
    setTimeout(
      function () {
        drawDial(1);
      }, i * 100)
  } // end for

  currentTick = target;
} // end rightToTarget
