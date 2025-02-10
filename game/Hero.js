import { AnimatedSprite, Assets, Container, Sprite, Text } from 'pixi.js';
import Matter from 'matter-js';
import { Manager } from "../manager";
import { Tween } from 'tweedle.js';

export class Hero extends Container {
    constructor(keySet) {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.keySet = keySet;
        this.curAnimation = ""
        this.direction = 1
        this.charging = false
        this.attacks= []
        // graphics

        this.initAnimation()
        // Physics
        this.sprite.x = 250;
        this.sprite.y = 395;
        // this.sprite.anchor.set(0.5,0)
        this.body = Matter.Bodies.rectangle(
            this.sprite.x ,
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
        this.sprite.x = this.body.position.x - 65 / 2;
        this.sprite.y = this.body.position.y - 50 / 2;

        if (this.keySet.has("a") || this.keySet.has("ArrowLeft")) this.move(-1);
        if (this.keySet.has("d") || this.keySet.has("ArrowRight")) this.move(1);

        if (this.direction <0) this.sprite.scale.x = -1
        if (this.direction>0) this.sprite.scale.x = 1
        // if (Math.abs(this.dx<1)) this.changeAnimation("breath")
    };

    startJump() {
        if (this.platform || this.jumpIndex < this.maxJumps) {
            console.log(this.jumpIndex)
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: this.dx, y: -10 });
        }

        const v = Matter.Body.getVelocity(this.body)
        this.dy = v.y
        this.changeAnimation("jump")
    }

    land(e) {
        console.log("landed!")
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

        this.changeAnimation("run")
    this.direction = direction
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }

    attack() {
        if (this.charging) return;
    this.charging = true;
        const speech = Sprite.from("speech");
        speech.width = speech.width / 7;
        speech.height = speech.height / 7;
        speech.x = this.sprite.x
        speech.y = this.sprite.y
        this.attacks.push(speech)
let word = ["K", "Y", "S"];
        this.addChild(speech);
for (let i = 0; i < word.length; i++) {
            const text = new Text(word[i], {
            fontFamily: 'Jersey 15',
            fontSize: 175,
            fill: 0x000000,
            stroke: 0x87538D,
            strokeThickness: 1,
            letterSpacing: 0,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
        });
            new Tween({}).to({}, i * 200).onComplete(()=>{
            text.x = 40 + i * 100;
            text.y = 50;
    speech.addChild(text);
            })
            .start();
        };
this.changeAnimation("intro", "launch")
         new Tween({}).to({}, 600)
            .onUpdate(()=>{
        speech.x = this.sprite.x + this.sprite.scale.x*speech.width -40
        speech.y = this.sprite.y-30
        })
        .onComplete(()=> {
            new Tween(speech).to({x:this.sprite.x + 700 * this.direction, y: this.sprite.y +10}, 600).onComplete(()=> {
            new Tween(speech).to({alpha:0}, 200).start().onComplete(()=>{
this.charging = false;
                    })

                    ;
            }).start()
        })
            .start();
    }

    changeAnimation(animation, name) {
        if (this.curAnimation === animation) return;
        this.curAnimation = animation;
        const temp = {x: this.sprite.x, y: this.sprite.y};
        this.removeChild(this.sprite)
        const animations = Assets.get(animation)?.animations;
        this.sprite = new AnimatedSprite(animations[name?name:animation]);
        this.sprite.play();
        this.sprite.animationSpeed= 0.1;
        if (this.curAnimation === "jump" || name === "launch") {
            this.sprite.loop = false
        this.sprite.onComplete = () => {
        this.changeAnimation("breath")
            }
        }
        else if (this.curAnimation === "run" ||name==="launch" ) {
        this.sprite.onComplete = ()=> {
        this.changeAnimation("breath")
            }
        }

        this.sprite.x = temp.x
        this.sprite.y = temp.y
        this.addChild(this.sprite)
    }

    initAnimation() {
        const animations = Assets.get("intro")?.animations;
        this.sprite = new AnimatedSprite(animations["intro"]);
        this.addChild(this.sprite)

        this.sprite.play()
        this.sprite.animationSpeed= 0.15
        this.sprite.loop = false

        this.sprite.onComplete = ()=>{
            this.changeAnimation("breath")
}
        }

    handleEvent(key, keySet) {
        this.keySet = keySet
        if (key === "w" || key ==="ArrowUp") this.startJump(1);

    }

}
