let img, buffer;

function preload() {
  img = loadImage("food.jpeg");
}

function setup() {
  let canvas = createCanvas(400, 400);
  background(220);
  image(img, 0, 0, img.width / 2, img.height / 2);
  
  fill(0, 0, 255);
  square(100, 100, 100);

  // buffer = createGraphics(width, height);
  buffer = createImage(width, height);
  
  // Copy from canvas into buffer
  buffer.copy(
    // source
    canvas,
    // source x, y, w, h
    0, 0, width, height,
    // destination x, y, w, h
    0, 0, buffer.width, buffer.height)

  angleMode(DEGREES);
  translate(width, height);
  rotate(180);
  image(buffer, 0, 0);
  
}

function draw() {
}
