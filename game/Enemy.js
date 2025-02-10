import { AnimatedSprite, Assets, Container, Sprite } from 'pixi.js';
import Matter from 'matter-js';
import { Manager } from "../manager";

export class Enemy extends Container {
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.curAnimation = ""
        // graphics

        this.initAnimation()
        // Physics
        this.sprite.x = 250;
        this.sprite.y = 370;
        // this.sprite.anchor.set(0.5,0)
        this.body = Matter.Bodies.rectangle(
            this.sprite.x ,
            this.sprite.y - 50 / 2,
            65,
            30,
            { friction: 0 });
        Matter.World.add(Manager.physics.world, this.body);
        this.body.gameHero = true; // why am i using this 
        this.dy = 15
        this.dx = 0
        this.maxJumps = 2
        this.jumpIndex = 0
        this.platform = null
        this.maxSpeed = 5
    };

    update(deltaTime) {
        const v = Matter.Body.getVelocity(this.body)
        this.dx = v.x
        this.dy = v.y
        Matter.Body.setPosition(this.body, {x:this.sprite.x,y: this.sprite.y})

        // if (Math.abs(this.dx<1)) this.changeAnimation("breath")
    };

    land(e) {
        const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.ground);
 
        if (hero && platform && platform.position.y >hero.position.y) {
            
            this.stayOnPlatform(platform.gamePlatform);
        }
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }

    die() {
        const temp = {x: this.sprite.x, y:this.sprite.y}
        this.removeChild(this.sprite)
this.sprite = null
        this.sprite = Sprite.from("sleeper")
        this.addChild(this.sprite)
        this.sprite.x = temp.x
        this.sprite.y = temp.y+10
    }

    initAnimation() {
        const animations = Assets.get("creeper")?.animations;
        this.sprite = new AnimatedSprite(animations["run"]);
        this.addChild(this.sprite)
        this.sprite.play()
        this.sprite.animationSpeed= 0.15
    }


}
