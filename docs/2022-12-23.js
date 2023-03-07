// Generative art in collaboration 2022
// Version v0.7 from 2022-12-22
// https://github.com/ssis-aa/generative-art-collaboration2022

ARTWIDTH   = 600
ARTHEIGHT  = 400

let canvas, buffer; // as global variables

function setup() {
  canvas = createCanvas(ARTWIDTH, ARTHEIGHT);
  buffer = createImage(ARTWIDTH, ARTHEIGHT);
  background(220);
  noStroke(); noLoop();
  fill(200);  // indicate right part with darker gray
  rect(width / 2, 0, width / 2, height);
  doAsyncAwaitThings(1000);
}

//                        *******************************
//                        *                             *
//                        *  IMAGE CREATION by students *
//                        *                             *
//                        *         2022-11-25          *
//                        *******************************

async function doAsyncAwaitThings(transitiontime) {
  await sleep(transitiontime);  //                                William
  print("William: a few cubes in the right sphere");
  CreateCSs();

  await sleep(transitiontime);  //                                Dan
  print("Dan: colorful cubes");
  colorcubes();
  await sleep(transitiontime);
  print("Dan: image filter");
  let FILTERS = random([GRAY,  INVERT,  BLUR]);
  print("Applied filter:", FILTERS);
  filter(FILTERS);

  await sleep(transitiontime);  //                                Khang
  print("Khang: using noise for the left part of the image");
  khang();
  await sleep(transitiontime);
  print("Khang: Tint the image.");
  let random_tint = random(255);
  copy_to_buffer();
  tint(random_tint,0,0,50);
  image(buffer, 0, 0);
  
  await sleep(transitiontime);  //                                Dongjae
  print("Dongjae: mosaic the picture with dots");
  copy_to_buffer();
  buffer.loadPixels();
  drawMosaic(4, color(30, 30, 30)); // radius, backgroundcolor
  
}


// ######################################################################
// #                                                                    #
// #                      student created functions                     #
// #                                                                    #
// ######################################################################


// ############################# William ################################
// translation of geometric shapes in the right part of the image

let NUM_SECTIONS = 10;

function CreateCSs(){
 for (var i = 0; i < NUM_SECTIONS; i++) {
   translate(0, 200);
   cubesection();
   translate(200, -200);
   cubesection();
   translate(-200, 0);
  }
}  

function cubesection() {
  stroke(51);
  fill(213, 90, 79);
  square(ARTWIDTH-150, -75, 50);
  fill(0);
  square(ARTWIDTH-170, -145, 50);
  fill(219, 224, 103);
  square(ARTWIDTH-160, -125, 50);
  fill(0);
  square(ARTWIDTH-110, -125, 50);
  fill(255);
  square(ARTWIDTH-112.5, -123.5, 45);
  strokeWeight(4);
  fill(0, 0, 0, 1);
  square(ARTWIDTH-160, -200, 50);
  strokeWeight(1);
  noStroke();
}



// ############################## Dan ###############################
// adding transparency to the right part

let TRANSPARENCY = 150;

var COLORS = [
  [216, 164, 127, TRANSPARENCY],
  [239, 131, 84,  TRANSPARENCY],
  [238, 75,  106, TRANSPARENCY],
  [223, 59,  87,  TRANSPARENCY],
  [15,  113, 115, TRANSPARENCY],
  [179, 255, 179, TRANSPARENCY],
  [202, 231, 185, TRANSPARENCY],
  [205, 247, 246, TRANSPARENCY],
  [16,  255, 203, TRANSPARENCY],
  [181, 248, 254, TRANSPARENCY],
  [151, 249, 249, TRANSPARENCY],
  [164, 222, 249, TRANSPARENCY],
];

function colorcubes() {
  for(var k = 0; k < 20; k++){
    let random_X = random(ARTWIDTH/2, ARTWIDTH)
    let random_Y = random(0, ARTHEIGHT)
    let col = random(COLORS)
    fill(col)
    square(random_X, random_Y, 50)
  }  
}  




// #########################  Dongjae  ###########################
//  image manipulation of the whole created image

const columnWidth = (dotRadius) => dotRadius*3

const numberOfColumns = (dotRadius) =>  Math.ceil(width / columnWidth(dotRadius))

function drawMosaic(dotRadius, backgroundColor){
  copy_to_buffer();
  buffer.loadPixels();
  background(backgroundColor)
  for (let i = 0; i < numberOfColumns(dotRadius); i++){
    offsetX = i*columnWidth(dotRadius)
    drawColumnDots(dotRadius, offsetX)
  }
}

function drawColumnDots(dotRadius, offsetX){
  let dotColor;
  let dotDiameter = 2*dotRadius
  let doHeightWithPadding = dotDiameter + 2
  let numDotsInColumn = Math.floor(height / doHeightWithPadding)
  let topY = Math.floor(random(10))
  for (let i = 0; i < numDotsInColumn; i++){
    let centerX = Math.floor(random(offsetX + dotRadius, offsetX + columnWidth(dotRadius) - dotRadius))
    let centerY = topY + i * doHeightWithPadding + dotRadius;
    let index = (centerX + centerY * width) * 4;
    dotColor = buffer.get(centerX, centerY);
    // dotColor = example.get(centerX, centerY);
    noStroke()
    fill(dotColor)
    ellipse(centerX, centerY, dotDiameter, dotDiameter)
  }
}



// ########################## Khang ############################
// using noise for the left part of the image

let x_coordinate = 500;
let plot_x = 0;

function khang(){
  for(let plot_x = 0; plot_x <= ARTWIDTH/2; plot_x++){
    x_noise = noise(x_coordinate) * ARTWIDTH/2;
    strokeWeight(5);
    point(plot_x, x_noise);
    x_coordinate++;
  }
}






// mk rotate the canvas and create a mosaic
function rotate_canvas() {
  copy_to_buffer();
  angleMode(DEGREES);
  translate(ARTWIDTH, ARTHEIGHT);
  rotate(180);
  image(buffer, 0, 0);
  // back to normal - origin left bottom
  translate(ARTWIDTH, ARTHEIGHT);
  rotate(180);    
} 

// mk split canvas to mosaic tiles and shuffle them
function mosaic(tilewidth, tileheight) {
  tile = [];
  tilelist = [];
  counter = 0;
  for (let a = 0; a < ARTWIDTH / tilewidth; a++) {
    for (let b = 0; b < ARTHEIGHT / tileheight; b++) {
      tile.push([a * tilewidth, b * tileheight]);
      tilelist.push(counter);
      counter++;
    }
  }
  // shuffle tilelist
  for (let i = tilelist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilelist[i], tilelist[j]] = [tilelist[j], tilelist[i]];
  }
  for (let i = 0; i < tile.length; i++) {
    buffer.copy(
      canvas, 
      tile[i][0], tile[i][1], 
      tilewidth, tileheight, 
      tile[tilelist[i]][0], tile[tilelist[i]][1], 
      tilewidth, tileheight);
  }
  image(buffer, 0, 0)
}

// mk copy canvas to buffer
function copy_to_buffer() {
  buffer.copy(
    // source
    canvas,
    // source x, y, w, h
    0, 0, canvas.width, canvas.height,
    // destination x, y, w, h
    0, 0, buffer.width, buffer.height)  
}

// mk continuously create some noise
function fill_noise() {
  fill(0);
  x = random(0, width);
  y = random(0, height);
  ellipse(x, y, 1);
}


// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
