let img;
function preload(){
  img = loadImage('untitled.png');
}
function setup() {
    createCanvas(800, 400);
  img.loadPixels();
}
function draw() {
  background(0);
  imageMode(CENTER);
  angleMode(DEGREES);
  translate(width / 2, height / 2);
    rotate(180);
  image(img, 0, 0, 800, 400);
}
