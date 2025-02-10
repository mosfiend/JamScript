import {Container, Graphics, Sprite} from 'pixi.js'
import Matter from 'matter-js';
import { Manager } from "../manager";

export class Platforms extends Container {
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;


        const calib  = Sprite.from("road")
        this.building = Sprite.from("building")
        this.building.anchor.set(0, 1);
        this.building.x = 150
        this.building.y = this.screenHeight -calib.height
        this.building.scale.set(1.6)
        this.roofTile = new RoofTile(this.building.x, this.building.y - this.building.height, this.building.width)
        this.addChild(this.building, this.roofTile.sprite)
    };

    update(deltaTime) {
    };
}

// export class Platform extends Graphics {         // The physics is implemented into the graphics object
//     constructor(x, y, width, height, clr) {
//         super();
//         //graphics
//         this.clr = clr
//         this.beginFill(this.clr)
//             .drawRect(0, 0, width, height);
//         this.pivot.set(width / 2, height / 2)
//         this.x = x;
//         this.y = y;
//         //physics
//         this.body = Matter.Bodies.rectangle(
//             this.x, this.y,
//             this.width*100, this.height,
//             { friction: 0, isStatic: true });
//         Matter.World.add(Manager.physics.world, this.body);
//         // this.body.gamePlatform = this; // why am i using this 
//         this.dx = 1
//         this.dy = 10
//     }
//     move(height, width) {
//         Matter.Body.setPosition(this.body, { x: this.body.position.x, y: this.body.position.y - this.dy })
//         // console.log(this.y)
//         if (this.y < 0) {
//             this.reuse((Math.random() * 0.4 + 0.6) * width, height + 500)
//         }
//         this.x = this.body.position.x;
//         this.y = this.body.position.y
//     }
//     reuse(x, y, width, height) {
//         // console.log(this.clr)
//         // console.log(x,y)
//         Matter.Body.setPosition(this.body, { x: x, y: y })
//     }
//
// }

class RoofTile {
    constructor(x, y, width) {
        this.sprite = Sprite.from("rooftile")
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

// implement a circular queue
// uses the same 8 pixi graphics
// but changes their shape when it's popped back to the beginning
//
