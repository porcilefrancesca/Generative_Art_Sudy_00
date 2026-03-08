function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(20);
  strokeWeight(1);
  noLoop();
}

function draw() {
  background(255);

  // --- CONFIGURAZIONE FISSA 5x5 ---
  let cols = 5; //numero di colonne fissato
  let rows = 5; //numero di righe fissato
  let margin = 100; 

  // Calcolo per mantenere la griglia quadrata e centrata
  let gridSize = min(width, height) - (margin * 2);
  let cellSize = gridSize / cols;
  let startX = (width - gridSize) / 2;
  let startY = (height - gridSize) / 2;

  //parametro chiave
  let step = cellSize / 20; 

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cx = startX + i * cellSize + cellSize / 2;
      let cy = startY + j * cellSize + cellSize / 2;

      // Logica originale: quanti quadrati disegnare
      let maxLayers = floor(cellSize / (step * 2));
      let numLayers = floor(random(maxLayers * 0.7, maxLayers + 1)); 

      rectMode(CENTER);
      
      // Parametri per creare "bianchi" all'intero dei quadrati
      let skipStart = floor(random(2, numLayers - 3)); // Dove inizia il bianco
      let skipLen = random() > 0.7 ? 2 : 0; // Se fare un bianco (di 2 quadrati) o no (0)

      for (let k = 0; k < numLayers; k++) {
        // --- CONDIZIONI DI DISEGNO ---
        // 1. Il quadrato k=0 viene SEMPRE disegnato (per omogeneità esterna)
        // 2. I quadrati tra skipStart e skipStart + skipLen vengono saltati
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

function mousePressed() {
  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('vera_molnar_5x5_perfect', 'png');
  }
}