// Generative art 2022
function setup() {
  createCanvas(1000, 500);
  background(220);
  noStroke();
  

  // William: translation of geometric shapes in the right
  //          part of the image
    let NUM_SECTIONS = 10;
  function cubesection(){
        fill (1)
  square(150,-75,50)
            fill (1)
  square(170,-145,50)
          fill (1)
  square(160,-125,50)
            fill (1)
  square(110,-125,50)
              fill (1)
  square(112.5,-123.5,45)
  strokeWeight(4);
              fill (1)
  square(160,-200,50)
   strokeWeight(1);
}
  
    for (var i = 0; i <NUM_SECTIONS; i++){
    translate(0,200)
            cubesection()
      translate(200,0)
                  cubesection()
      translate(-200,0)
translate(-720/NUM_SECTIONS, 0);
  }
  
  
  // Dan: adding transparency to the right part
  let TRANSPARENCY = 4
  var COLORS = [[216, 164, 127, TRANSPARENCY],[239, 131, 84, TRANSPARENCY],[238, 75, 106, TRANSPARENCY],[223, 59, 87, TRANSPARENCY],[15, 113, 115, TRANSPARENCY], [179, 255, 179, TRANSPARENCY], [202, 231, 185, TRANSPARENCY], [205, 247, 246, TRANSPARENCY], [16, 255, 203, TRANSPARENCY], [181, 248, 254, TRANSPARENCY], [151, 249, 249, TRANSPARENCY], [164, 222, 249, TRANSPARENCY]]
  
  
  // Khang: using noise for the left part of the image
  
  
  
  // Dongjae: image manipulation of the whole created image
  
  
  
}

function draw() {

  fill(0);
  x = random(0, width);
  y = random(0, height);
  ellipse(x, y, 1);
}
