import { AnimatedSprite, Assets, Container, Graphics } from 'pixi.js';
import Matter from 'matter-js';
import { Manager } from "../manager";
import * as Filters from 'pixi-filters';

export class Hero extends Container {
    constructor(keySet) {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.keySet = keySet;
        // graphics

        this.initAnimation()
        // Physics
        console.log(this.sprite.width)
        this.sprite.x = 250
        this.body = Matter.Bodies.rectangle(
            this.sprite.x - 65 / 2,
            this.sprite.y - 55 / 2,
            65,
            50,
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
        console.log(this.sprite.width, this.sprite.height)
        this.sprite.x = this.body.position.x - 65 / 2;
        this.sprite.y = this.body.position.y - 50 / 2;

        if (this.keySet.has("a") || this.keySet.has("ArrowLeft")) this.move(-1);
        if (this.keySet.has("d") || this.keySet.has("ArrowRight")) this.move(1);
    };

    startJump() {
        if (this.platform || this.jumpIndex < this.maxJumps) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: this.dx, y: -10 });
        }

        const v = Matter.Body.getVelocity(this.body)
        this.dy = v.y
        this.changeAnimation("run")
    }

    land(e) {
        const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.ground);
 
        if (hero && platform && platform.position.y >hero.position.y) {
            
            this.stayOnPlatform(platform.gamePlatform);
        }
    }

    move(direction) {
        let vector = Matter.Body.getVelocity(this.body)
        vector.x = direction > 0 ? Math.min(vector.x + 1, this.maxSpeed) : Math.max(vector.x - 1, -this.maxSpeed)
        Matter.Body.setVelocity(this.body,
            vector
        );
        const v = Matter.Body.getVelocity(this.body)
        this.dx = v.x
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }

    changeAnimation(animation) {
        this.removeChild(this.sprite)
        const animations = Assets.get(animation)?.animations;
        this.sprite = new AnimatedSprite(animations[animation]);
        this.sprite.play()
        this.sprite.animationSpeed= 0.1
        this.addChild(this.sprite)

    }

    initAnimation() {
        const animations = Assets.get("intro")?.animations;
        this.sprite = new AnimatedSprite(animations["intro"]);
        this.sprite.play()
        this.sprite.animationSpeed= 0.25
        this.sprite.loop = false
        this.addChild(this.sprite)

    }

    handleEvent(key, keySet) {
        this.keySet = keySet
        if (key === "w" || key ==="ArrowUp") this.startJump(1);

    }

}
