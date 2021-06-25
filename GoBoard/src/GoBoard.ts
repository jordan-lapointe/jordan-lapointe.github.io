import * as PIXI from 'pixi.js';
import { GoGrid } from './GoGrid';
import { StoneFactory } from './StoneFactory';

console.log('GoBoard.ts');


export class GoBoard extends PIXI.Container {
  public grid : GoGrid;
  public intersections;
  public stoneFactory : StoneFactory;
  public sizeParam : number;
  public pixiApp;
  //private stones : Array<Stone>;

  constructor(EE, sizeParam : number, lineThickness : number, pixiApp) {
    super();
    this.sizeParam = sizeParam;
    this.grid = new GoGrid(EE, sizeParam, lineThickness);
    this.stoneFactory = new StoneFactory();
    this.pixiApp = pixiApp;
/* 
    this.grid.on('click', (e) => {
      let p = e.data.getLocalPosition(this.grid);
      console.log(p);
      let {gridX, gridY} = this.grid.findNearestIntersection(p.x, p.y);
      this.addStone(gridX, gridY, 'b');
    }); */
    this.addChild(this.grid);
  }

/*   addStone(gridX, gridY, stoneColour) {
    //let i, j;
    let thickness, spacing;
    let x, y;
    let s;
    thickness = this.grid.thickness;
    spacing = this.grid.spacing;
    x = (gridX-1)*(spacing + thickness) + 0.5*thickness;
    y = (gridY-1)*(spacing + thickness) + 0.5*thickness;

    switch (stoneColour) {
      case 'b':
        s = this.stoneFactory.makeStone(PIXI.Loader.shared.resources.black_stone.texture, this.grid.size/18);
        break;
      case 'w':
        s = this.stoneFactory.makeStone(PIXI.Loader.shared.resources.white_stone.texture, this.grid.size/18);
        break;
    }

    s.x = x - 0.5*(s.width) + thickness;
    s.y = y - 0.5*(s.height) + thickness;
    this.pixiApp.stage.addChild(s);
  } */
}
