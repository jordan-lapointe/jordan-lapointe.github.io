import * as PIXI from 'pixi.js';

/* export class Stone extends PIXI.Sprite {

    constructor(private colour : string) {
        super();
        
        switch(colour) {
            case 'b':
                this.texture = PIXI.Loader.shared.resources.black_stone.texture;
                break;
            case 'w'
                this.texture = PIXI.Loader.shared.resources.white_stone.texture;
                break;
            default:
                break;
        }
    }

    makeStone(sizeParam, colour) {
        
        this.graphics.beginFill(colour === 'b' ? 0x000000 : 0xffffff);
        this.graphics.linestyle(1);
        this.graphics.drawCircle(0, 0, sizeParam || 10);
        this.graphics.endFill();

        let s = new PIXI.Sprite(this.renderer.generateTexture(gr));

        //TODO
        let s = new PIXI.Sprite(this.loader.resources.blackStone.texture);
        s.interactive = true;
        //s.addEventListener('click', () => { this.destroy(); });
        s.on('click', () => { console.log('click'); } )
        return s;
    }
} */

export class StoneFactory {
    // graphics;
    // circle;


    
/*     constructor(graphics, circle) {
        graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        circle = graphics.drawCircle(20,20,20);
        graphics.endFill();
    } */

    constructor(){}
    
    makeStone(stoneTexture : PIXI.Texture, sizeParam : number = 10){
        let s : PIXI.Sprite;
        s = new PIXI.Sprite(stoneTexture);
        s.width = sizeParam;
        s.height = sizeParam;
        s.interactive = true;
        s.on('click', () => { console.log('clicked'); });
        return s;
    }
}