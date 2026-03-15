let lastMouseX = 0;
let lastMouseY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(20);
  strokeWeight(1);
  noLoop();
}

function draw() {
  background(255);

  let padding = 40; 
  let minCellSize = 80; 

  let cols = floor((width - (padding * 2)) / minCellSize);
  let rows = floor((height - (padding * 2)) / minCellSize);
  
  cols = max(1, cols);
  rows = max(1, rows);

  let cellSize = min((width - (padding * 2)) / cols, (height - (padding * 2)) / rows);

  let offsetX = (width - (cellSize * cols)) / 2;
  let offsetY = (height - (cellSize * rows)) / 2;

  let step = cellSize / 20; 

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cx = offsetX + (i * cellSize) + (cellSize / 2);
      let cy = offsetY + (j * cellSize) + (cellSize / 2);

      let maxLayers = floor(cellSize / (step * 2));
      let numLayers = floor(random(maxLayers * 0.7, maxLayers + 1)); 

      rectMode(CENTER);
      
      let skipStart = floor(random(2, numLayers - 3));
      let skipLen = random() > 0.7 ? 2 : 0;

      for (let k = 0; k < numLayers; k++) {
        let isSkipped = (k > 0 && k >= skipStart && k < skipStart + skipLen);

        if (!isSkipped) {
          let currentSize = cellSize - (k * step * 2);
          if (currentSize > 0) {
            rect(cx, cy, currentSize, currentSize);
          }
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function mouseMoved() {
  // Limite di frequenza: aggiorna solo se ci si sposta di 50px
  let d = dist(mouseX, mouseY, lastMouseX, lastMouseY);
  if (d > 50) {
    redraw();
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

function mousePressed() {
  redraw();
}

function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('vera_molnar_responsive', 'png');
}