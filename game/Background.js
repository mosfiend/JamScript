import * as PIXI from "pixi.js"
import Matter from "matter-js";
import { Manager } from "../manager";
export class Background extends PIXI.Container {
    constructor(screenHeight) {
        super();
        this.bg = PIXI.Sprite.from("bgWeather")
        const SCALE = Manager.height*1.5/this.bg.height
        console.log(SCALE)
        this.bg.scale.x = SCALE
        this.bg.scale.y = SCALE
        this.bg.anchor.set(0, 1);
        this.bg.y = screenHeight+100 ;
        const bg2 = PIXI.Sprite.from("bgWeather")
        bg2.scale.x = SCALE
        bg2.scale.y = SCALE
        bg2.anchor.set(0, 1);
        bg2.y = screenHeight+100 ;
        bg2.x = bg2.width ;


        this.addChild(this.bg, bg2);
        this.framer = 0

    }

    update(deltaTime) {


    }
}



class RoofTile {
    constructor(x, y, width) {
        this.sprite = PIXI.Sprite.from("rooftile")
        this.sprite.scale.set(1.6)
        this.sprite.anchor.set(0, 1);
        this.sprite.x = x + (width - this.sprite.width) / 2
        this.sprite.y = y
        this.body = Matter.Bodies.rectangle(
            this.sprite.x + this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height,
            { friction: 0, isStatic: true });
        Matter.World.add(Manager.physics.world, this.body);
this.body.ground = true

    }
}
