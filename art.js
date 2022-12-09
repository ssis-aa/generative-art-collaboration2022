// Generative art in collaboration 2022

ARTWIDTH = 500
ARTHEIGHT = 300

let canvas, buffer; // as global variables

// functions created for this project
// William
function cubesection() {
  stroke(51);
  fill(213, 90, 79);
  square(750, -75, 50);
  fill(0);
  square(770, -145, 50);
  fill(219, 224, 103);
  square(760, -125, 50);
  fill(0);
  square(710, -125, 50);
  fill(255);
  square(712.5, -123.5, 45);
  strokeWeight(4);
  fill(0, 0, 0, 1);
  square(760, -200, 50);
  strokeWeight(1);
  noStroke();
}

// Dan's Transparency
let TRANSPARENCY = 1;

// mk rotate the canvas
function rotate_canvas() {
  buffer = createImage(ARTWIDTH, ARTHEIGHT);

  // Copy from canvas into buffer
  buffer.copy(
    // source
    canvas,
    // source x, y, w, h
    0, 0, canvas.width, canvas.height,
    // destination x, y, w, h
    0, 0, buffer.width, buffer.height)

  angleMode(DEGREES);
  translate(ARTWIDTH, ARTHEIGHT);
  rotate(180);
  image(buffer, 0, 0);
  // back to normal - origin left bottom
  translate(ARTWIDTH, ARTHEIGHT);
  rotate(180);    
}  

// ---------------------- the creation of the image begins --------------------

function setup() {
  canvas = createCanvas(ARTWIDTH, ARTHEIGHT);
  background(220);
  noStroke();

  // mk
  // indicate right part with darker gray
  fill(200);
  rect(width / 2, 0, width / 2, height);
  fill(71, 173, 204)
  square(width / 2 + 50, width / 4, height / 3)

  // William: 
  // translation of geometric shapes in the right part of the image
  let NUM_SECTIONS = 10;

//   for (var i = 0; i < NUM_SECTIONS; i++) {
//     translate(0, 200);
//     cubesection();
//     translate(200, 0);
//     cubesection();
//     translate(-200, 0);
//     translate(-720 / NUM_SECTIONS, 0);
//   }

  // Dan: adding transparency to the right part

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

  let random_X = random(1000, 500);
  let random_Y = random(1000, 500);

  function Cube() {
    fill(COLORS);
    square(random_X, random_Y, 50);
  }
  for (var k = 0; k < 20; k++) {
    Cube();
  }

  // Khang: using noise for the left part of the image
  // correct location for Khang's code: random numbers
  let x_coordinate = 500;
  for (var plot_x = 0; plot_x < 500; plot_x++) {
    beginShape();
    x_noise = noise(x_coordinate) * 500;
    strokeWeight(20);
    point(plot_x, x_noise);
    x_coordinate++;
    console.log(plot_x);
  }

  // Dongjae: image manipulation of the whole created image

  // Dan II: manipulate the whole image a second time

  // **************************************************************
  // Image manipulation 2022-12-09
  // mk rotate the image
  rotate_canvas();
  
  // Dan

  // Dongjae

  // Khang

  // William
}

function draw() {
  // continuously create some noise
  fill(0);
  x = random(0, width);
  y = random(0, height);
  ellipse(x, y, 1);
}
