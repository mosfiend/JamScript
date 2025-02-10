import {Container, Graphics, Sprite, Texture, TilingSprite} from 'pixi.js'
import Matter from 'matter-js';
import { Manager } from "../manager";

export class TrainWreck extends Container {
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;

        this.roads = []
        for (let i = 0;i<10; i++) {
const road = new Road();
        this.roads[i] = road
        road.y = this.screenHeight
        road.anchor.set(0, 1);

            road.x = road.width*i
        this.addChild(road)
        }


        const roadHeight = this.roads[0].height
        this.ground = new Graphics()
            .beginFill(0xff0000)
            .drawRect(0, 0, this.screenWidth, 50);
        this.ground.pivot.set(this.ground.width / 2, this.ground.height / 2)
        this.ground.x = this.ground.width / 2
        this.ground.y = this.screenHeight + this.ground.height / 2 - roadHeight
        this.body = Matter.Bodies.rectangle(
            this.ground.x, this.ground.y+10,
            this.ground.width*200, this.ground.height,
            { friction: 0, isStatic: true });
        Matter.World.add(Manager.physics.world, this.body);
            this.body.ground = this.body

    };

    update(deltaTime) {
        // Matter.Body.setVelocity(this.heavyObj.body, { x: this.dx, y: this.heavyObj.y });
        // Matter.Body.setPosition(this.heavyObj.body, { x: this.heavyObj.body.position.x, y: this.heavyObj.body.position.y })
        // this.heavyObj.x = this.heavyObj.body.position.x;
        // this.heavyObj.y = this.heavyObj.body.position.y
    }
};



class Platform extends Graphics {
    constructor() {
        super() 
        this.heavyObj = new Graphics()
            .beginFill(0xee0e0e)
            .drawRect(0, 0, 2000, 1500)
        this.heavyObj.pivot.set(this.heavyObj.width / 2, this.heavyObj.height / 2)
        this.heavyObj.x = this.screenWidth * 0.75
        this.heavyObj.y = 200
        this.addChild(this.heavyObj)

        this.heavyObj.body = Matter.Bodies.rectangle(
            this.heavyObj.x, this.heavyObj.y,
            this.heavyObj.width, this.heavyObj.height,
            { friction: 100 });
        
            Matter.World.add(Manager.physics.world, this.heavyObj.body);
        this.heavyObj.body.ground = this.heavyObj
            Matter.Body.setMass(this.heavyObj.body, 100000.0);
        this.dx = -1
}
    }

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


class Road extends Sprite {
  constructor() {
    super();
    this.texture = Texture.from("road");
  }
}
