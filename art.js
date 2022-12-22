// Generative art in collaboration 2022
// Version v0.6 from 2022-12-21

ARTWIDTH = 600
ARTHEIGHT = 400

let canvas, buffer; // as global variables

TILEWIDTH  = 50
TILEHEIGHT = TILEWIDTH

function preload() {
  example = loadImage('example.jpg')
}

// Created functions for this project
// copy_to_buffer()    copies canvas to buffer
// rotate_canvas()     rotates canvas by 180 degrees
// mosaik()            splits canvas into tiles and shuffles them
// fill_noise()        fills the canvas gradualy with black dots


// functions created for this project
// William
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

// Dan's Transparency
let TRANSPARENCY = 150;

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
// mk rotate the canvas
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
// mk split canvas to mosaik tiles and shuffle them
function mosaik() {
  tile = [];
  tilelist = [];
  counter = 0;
  for (var a = 0; a < ARTWIDTH / TILEWIDTH; a++) {
    for (var b = 0; b < ARTHEIGHT / TILEHEIGHT; b++) {
      tile.push([a * TILEWIDTH, b * TILEWIDTH]);
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
      TILEWIDTH, TILEHEIGHT, 
      tile[tilelist[i]][0], tile[tilelist[i]][1], 
      TILEWIDTH, TILEHEIGHT);
  }
  image(buffer, 0, 0)
}
// continuously create some noise
function fill_noise() {
  fill(0);
  x = random(0, width);
  y = random(0, height);
  ellipse(x, y, 1);
}

let x_coordinate = 500;
let plot_x = 0;

function khang(){
    for(plot_x =0; plot_x <= ARTWIDTH/2; plot_x++){
      x_noise = noise(x_coordinate) * ARTWIDTH/2;
      strokeWeight(5);
      point(plot_x, x_noise);
      x_coordinate++;
    }
}

// ---------------------- the creation of the image begins --------------------

function setup() {
  canvas = createCanvas(ARTWIDTH, ARTHEIGHT);
  buffer = createImage(ARTWIDTH, ARTHEIGHT);

  background(220);
  noStroke();

  // mk
  // indicate right part with darker gray
  fill(200);
  rect(width / 2, 0, width / 2, height);
  image(example, 10, 10, width - 20, height -20)
  fill(71, 173, 204)
  square(width / 2 + 50, width / 4, height / 3)

  // *******************************
  // *                             *
  // *  IMAGE CREATION by students *
  // *                             *
  // *         2022-11-25          *
  // *******************************
  //
  // ########################## William ################################
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
  CreateCSs()

  
  // ############################## Dan ###############################
  // adding transparency to the right part
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


  let FILTERS = random([GRAY,  INVERT,  BLUR]);
  
  for(var k = 0; k < 20; k++){
    let random_X = random(ARTWIDTH/2, ARTWIDTH)
    let random_Y = random(0, ARTHEIGHT)
    print("Appying filter:", FILTERS);
    let col = random(COLORS)
    print(col)
    fill(col)
    square(random_X, random_Y, 50)
  }
  
  // ########################## Khang ############################
  // using noise for the left part of the image
  khang()

  // ######################### Dongjae ###########################
  //  image manipulation of the whole created image


  // **************************************************************
  // Image manipulation 2022-12-09
  // mk rotate the image and shuffle it in a mosaic
  // rotate_canvas();
  // mosaik();
  

  // ***********************************
  // *                                 *
  // *  IMAGE MANIPULATION by students *
  // *                                 *
  // *           2022-12-11            *
  // ***********************************  
  
  
  // Dan
  // image(example, 0, 0);
  filter(FILTERS);
  
  // Dongjae
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
  copy_to_buffer();
  buffer.loadPixels();
  drawMosaic(5, color(30, 30, 30)); // radius, backgroundcolor
  
  // Khang

  //let changing_hue = random(0,255)
  //print(changing_hue)
  let random_tint = random(255)
  tint(random_tint,0,0,50)
  image(example, 10, 10, width, height)


  

  // William

}

function draw() {
  fill_noise();
}
