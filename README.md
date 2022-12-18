# generative-art-collaboration2022

A design project by Dan, Dongjae, Khang and William. Created in December 2022 on https://p5js.org/

Example code of the current state can be explored on [p5js.org](https://p5js.org/)
- 2022-12-13 [https://editor.p5js.org/mkreier/sketches/Ipgd8eY43](https://editor.p5js.org/mkreier/sketches/Ipgd8eY43)
- 2022-12-19 [https://editor.p5js.org/mkreier/sketches/p-XPJI7q6](https://editor.p5js.org/mkreier/sketches/p-XPJI7q6)
- 2022-12-21 [to come]()


## 2022-12-19

Still to come

## 2022-12-13

After 120 minutes of work some more filters started to work:

![state December 13th](/docs/2022-12-13.png)

``` py
// Generative art in collaboration 2022
// Version v0.5 from 2022-12-19

ARTWIDTH = 500
ARTHEIGHT = 300

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
let TRANSPARENCY = 1;

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
  // ################### William #######################
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

  
  // ################### Dan #######################
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

  let random_X = random(ARTWIDTH/2, ARTWIDTH);
  let random_Y = random(0, ARTHEIGHT);
  let FILTERS = random([GRAY,  INVERT,  BLUR]);
  print("Appying filter:", FILTERS)
  function Cube() {
    fill(COLORS);
    square(random_X, random_Y, 50);
  }
  for (var k = 0; k < 20; k++) {
    Cube();
  }
  
  // ################### Khang #######################
  // using noise for the left part of the image
  khang()

  // ################### Dongjae #######################
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

  // Khang

  // William

}

function draw() {
  fill_noise();
}
```

## 2022-12-12

With working rotate and shuffle the code get's more artistic and sophisticated:

![state Dec 12th](/docs/2022-12-12.png)

Some code of William had to be commented out because of the relocation of the drawing origin that broke the code later.

``` js
// Generative art in collaboration 2022

ARTWIDTH = 500
ARTHEIGHT = 300

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
  // shuffle tilelist with Durstenfeld shuffle (optimized Fisher-Yates):
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
  // mk rotate the image and shuffle it in a mosaic
  rotate_canvas();
  mosaik();
  
  // Dan

  // Dongjae

  // Khang

  // William
}

function draw() {
  fill_noise();
}
```

## Result 2022/12/05

The following image was created:

![image Dec 5th](docs/2022-12-05.png)

And the respective code (saved in the `2022-12-05` branch):

``` js
// Generative art 2022

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

function setup() {
  createCanvas(1000, 500);
  background(220);
  noStroke();

  // mk
  // indicate right part with darker gray
  fill(200);
  rect(width / 2, 0, width / 2, height);
  //just some random shapes to start with
  fill(
    Math.floor(random(0, 256)),
    Math.floor(random(0, 256)),
    Math.floor(random(0, 256))
  );
  square(random(30, 160) + width / 2, random(20, 140), random(40, 150));

  // William: 
  // translation of geometric shapes in the right part of the image
  let NUM_SECTIONS = 10;

  for (var i = 0; i < NUM_SECTIONS; i++) {
    translate(0, 200);
    cubesection();
    translate(200, 0);
    cubesection();
    translate(-200, 0);
    translate(-720 / NUM_SECTIONS, 0);
  }

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

  // Image manipulation 2022-12-07
  // Dan

  // Dongjae

  // Khang

  // William
}

function draw() {
  // create some noise
  fill(0);
  x = random(0, width);
  y = random(0, height);
  ellipse(x, y, 1);
}
```
