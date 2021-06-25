import * as PIXI from 'pixi.js';

export class GoGrid extends PIXI.Graphics {
  //private size: number;
  //private spacing: number;
  //private thickness: number;

  // sizeParam is the desired length & width of the grid
  // The generated grid will likely be slightly smaller to achieve a perfect grid
  constructor(EE, private sizeParam: number, private lineThickness: number) {
    super();
    // let t = lineThickness || 1;
    // let b = Math.floor((sizeParam - 19*t)/18);
    // let size = b*18 + 19*t;
    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(0, 0, this.size, this.size);
    this.on('click', (e) => {
      let p_local = e.data.getLocalPosition(this);
      let p_grid = this.findNearestIntersection(p_local.x, p_local.y);
      if (p_grid)
        EE.emit('grid_click', p_grid);

    });
    this.drawGrid();

  }

  drawGrid() {
    let t = this.thickness;
    let b = this.spacing;
    let size = this.size;
    this.beginFill(0xe56728);
    this.drawRect(0,0,this.size,this.size);
    this.endFill();
    this.lineStyle(t, 0x000000, 1, 1);
    for (let i = 0; i < 19; i++) {
        this.moveTo(i*b + i*t, 0);
        this.lineTo(i*b + i*t, size);
    }

    this.lineStyle(t, 0x000000, 1, 0);
    for (let j = 0; j < 19; j++) {
        // As far as I can tell, Pixi has an off-by-one error. Compensating.
        this.moveTo(0, j*b + j*t);
        this.lineTo(size, j*b + j*t);
    }

    let dots = [
      [4, 4],  [4, 10],  [4, 16],
      [10, 4], [10, 10], [10, 16],
      [16, 4], [16, 10], [16, 16]
    ];
    this.lineStyle(1, 0x000000, 1, 0.5);
    this.beginFill(0x000000, 1);
    for (var k in dots) {
      let x = (dots[k][0]-1)*b + dots[k][0]*t - 0.5*t;
      let y = (dots[k][1]-1)*b + dots[k][1]*t - 0.5*t;
      this.drawCircle(x, y, t*2);
    }
    
  }

  findNearestIntersection(x, y) {
    let p = {};
    let gridX, gridY;

    let offX = x % (this.spacing + this.thickness);
    let offY = y % (this.spacing + this.thickness);

    if (offX <= 0.4*this.spacing) {
      //p.x = x - offX;
      gridX = 1 + Math.floor( x / (this.spacing + this.thickness) );
    } else if (offX >= 0.6*this.spacing) {
      //p.x = x + (this.spacing - offX);
      gridX = 1 + Math.ceil( x / (this.spacing + this.thickness) );
    } else {
      return null;
    }

    if (offY <= 0.5*this.spacing) {
      //p.y = y - offY;
      gridY = 1 + Math.floor( y / (this.spacing + this.thickness) );
    } else if (offY >= 0.6*this.spacing) {
      //p.y = y + (this.spacing - offY);
      gridY = 1 + Math.ceil( y / (this.spacing + this.thickness) );
    } else {
      return null;
    }

    return {gridX, gridY};
  }

  get size() {
    let t = this.lineThickness || 1;
    let b = Math.floor((this.sizeParam - 19*t)/18);
    return b*18 + 19*t;
  }
  get thickness() {
    return this.lineThickness || 1;
  }
  get spacing() {
    return Math.floor((this.sizeParam - 19*this.thickness)/18);
  }
}
