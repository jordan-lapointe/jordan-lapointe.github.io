import { GoBoard } from './GoBoard';
import { StoneFactory } from './StoneFactory';
import * as PIXI from 'pixi.js';

const EE = new PIXI.utils.EventEmitter();
const pixiApp = new PIXI.Application({width: 1000, height: 1000, backgroundColor: 0xFFFFFF});
const goBoard = new GoBoard(EE, 400, 1, pixiApp);

let stones = new PIXI.Graphics();
pixiApp.stage.addChild(stones);

var gameState = {gridState: {}, blackStones: [], whiteStones: [], ko: null};
let swap_turn = (function(){
  let t='b';
  function f(){
    switch(t){
      case 'b':
        t = 'w';
        return 'b';
      case 'w':
        t = 'b';
        return 'w';
    }   
  }
  return f;
})();

function updateIntersection(gridX, gridY, newVal) {
  // Convert grid coords to a stringthat will index gridState
  let s = `${gridX}x${gridY}`;
  // Update array representation of state, to avoid sorting gridState
  switch (newVal){
    case 'b':
      gameState.blackStones.push(s);
      break;
    case 'w':
      gameState.whiteStones.push(s);
      break;
    case 'e':
      //Find and remove these coords from relevant array
      if (gameState.gridState[s] === 'b'){
        var i = gameState.blackStones.findIndex( (el) => el === s );
        gameState.blackStones.splice(i, 1);
      } else if (gameState.gridState[s] === 'w'){
        var i = gameState.whiteStones.findIndex( (el) => el === s );
        gameState.whiteStones.splice(i, 1);
      }
  }
  gameState.gridState[s] = newVal;
}

function drawGameState(gameState){
  stones.clear();
  let g = stones;
  //let g = new PIXI.Graphics();
  let el;
  stones.beginFill(0x000000);
  for (el of gameState.blackStones){
    var xy = el.split('x');
    var gx = parseInt(xy[0]);
    var gy = parseInt(xy[1]);
    var {x,y} = gridToCoords(gx, gy, goBoard.grid.spacing, goBoard.grid.thickness);
    stones.drawCircle(x, y, 0.5*goBoard.grid.spacing);
  }
  stones.endFill();

  stones.beginFill(0xffffff);
  for (el of gameState.whiteStones){
    var xy = el.split('x');
    var gx = parseInt(xy[0]);
    var gy = parseInt(xy[1]);
    var {x,y} = gridToCoords(gx, gy, goBoard.grid.spacing, goBoard.grid.thickness);
    stones.drawCircle(x, y, 0.5*goBoard.grid.spacing);
  }
  stones.endFill();
}

function gridToCoords(gridX, gridY, spacing, thickness){
  let x = (gridX-1)*(spacing + thickness) + 0.5*thickness;
  let y = (gridY-1)*(spacing + thickness) + 0.5*thickness;

  return {x,y};
}

function updateStones(g : PIXI.Graphics){
  
}


EE.on('grid_click', (p : {gridX, gridY}) => {
  updateIntersection(p.gridX, p.gridY, swap_turn());
  drawGameState(gameState);
});


function initGame() {
  document.body.appendChild(pixiApp.renderer.view);
  pixiApp.stage.addChild(goBoard);
  pixiApp.stage.addChild(stones);
}

initGame();
