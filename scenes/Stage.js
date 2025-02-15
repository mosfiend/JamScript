import {Container, Graphics, Sprite, Text} from 'pixi.js'
import Matter from 'matter-js';
import { Manager } from "../manager.js"
import { Background } from '../game/Background.js';
import { Hero } from '../game/Hero.js';
import { Enemy } from '../game/Enemy.js';
import { Signs } from '../game/Signs.js';
import { TrainWreck } from '../game/Collision.js';
import { TextZone } from '../game/Text.js';
import { Tween } from 'tweedle.js';
import { Platforms } from '../game/Platforms.js';
import { Credits } from './Credits.js';
export class Stage extends Container {
      constructor() {
            super();
            this.screenWidth = Manager.width;
            this.screenHeight = Manager.height;
            this.keySet = new Set();
            this.won1 = false;
            this.won = false;

            this.theme = Manager.song1;
            this.theme.volume = 0.4;
            this.theme.play();
            // this.song = sound.add("spice", "/assets/images/ITS.mp3")
            /// ELEMENTS
            this.bg = new Background(this.screenHeight);
            this.groundHeight = this.bg.groundHeight;
            this.platforms = new TrainWreck();
            this.signs = new Signs();
            this.platforms2 = new Platforms();
            this.text = new TextZone();
            this.signText = new TextZone("");

            this.addChild(this.bg, this.platforms, this.platforms2, this.text, this.signs) 
            this.interactive = true;

            this.watch(Manager.app.view);
            // Event handling

        this.playScene1()
      }

      transitionIn() {
            Manager.app.stage.addChild(this)
      }

      transitionOut() {
        new Tween({}).to({},1000)
.onComplete(()=>{
            Manager.app.stage.removeChild(Manager.currentScene);
            })
            .start()
            // Manager.app.stage.off("mousemove") remember to turn off events
      }

      resize(newWidth, newHeight) {
            this.screenWidth = newWidth;
            this.screenHeight = newHeight
      }

      update(deltaTime) {
        this.text2?.update(deltaTime)
        if (this.hero && !this.won1) {
            this.handleEvent();
            this.hero?.update(deltaTime);
         const world = Manager.app.stage;
    const DIFF =
Math.max(0,
      this.hero.sprite.x -
      this.screenWidth / 2 
        );

        world.pivot.x = Math.max(0,DIFF);
this.bg.x = DIFF/1.1
    this.signs.signs.forEach((sign) => {
                const x = this.hero.sprite.x
                const y = this.hero.sprite.y
            if (this.signs.content !== sign.content && x>sign.x-sign.width&& x<sign.x+sign.width &&
y>sign.y-sign.height&& y<sign.y+sign.height) {
                 this.signs.content = sign.content;
                 this.signs.textArray = this.signs.content.split("");
                 this.signs.curIdx = 0;
                 this.signs.curText = "";
                 this.signs.needsCorrection = false;
                 this.signs.corrected = false;
          }
              })

    this.hero.attacks.forEach((attack) => {
                const x = this.enemy.sprite.x
                const y = this.enemy.sprite.y
            if (x>attack.x+this.hero.x-attack.width&& x<attack.x+this.hero.x+attack.width &&
y>attack.y+this.hero.y-attack.height&& y<attack.y +this.hero.y +attack.height) {
                    if (!this.won1) {
                    this.won1 = true
                    this.playScene2()
                    }
        }
            })
        }
                  this.bg.update(deltaTime)
                  this.platforms.update(deltaTime)
                  this.text.update(deltaTime)
                  this.enemy?.update(deltaTime)
                  this.signs.update(deltaTime)
      }

      watch(el) {
            el.addEventListener('keydown', (e) => {
                  this.keySet.add(e.key)
                  this.handleEvent(e.key)
            });
            el.addEventListener('keyup', (e) => {
                  this.keySet.delete(e.key) 
            });
      }

      handleEvent(key) {
        if (!this.hero) return;
            if (key === "k" || key === "y" ||key === "s") {
            this.hero.attack();
            }
            // two types of input here, keySet for character movement and the key parameter for more delicate movements (changing stats)
                  this.hero.handleEvent(key, this.keySet)
      }

    win() {
        if (this.won) return;
        this.theme.pause();
        Manager.song2.volume= 0.5;
        Manager.song2.play();
        this.won = true;
        this.addChild(new Credits());
    }

    playScene1() {
            this.enemy = new Enemy()
            this.addChild(this.enemy);
const run1 = new Tween(this.enemy.sprite).to({x:2000}, 4400).start()
        .onComplete(()=> {
            this.hero = new Hero(this.keySet);
            this.on("pointerdown", () => {
                  this.hero.startJump();
            });

            Matter.Events.on(Manager.physics, 'collisionStart', (e) => { this.hero.land(e) });
            this.addChild(this.hero);
            });

const run2 = new Tween(this.enemy.sprite).to({x:4900},500);

this.backnforth = new Tween(this.enemy.sprite).to({x:5300}, 1800).yoyo(true).repeat(Infinity).
        onRepeat(()=>{
this.enemy.sprite.scale.x = this.enemy.sprite.scale.x*-1
        });

        run1.chain(run2.chain(this.backnforth));
    }

    playScene2() {
        this.removeChild(this.signs)
this.backnforth.pause()
    this.enemy.die()
    this.theme.volume = 0.1
        const speech = Sprite.from("speech");
        speech.width = speech.width / 3.5;
        speech.height = speech.height / 6
speech.x = 0;
speech.y = -50;
            const text = new Text("Sorry", {
            fontFamily: 'Jersey 15',
            fontSize: 130,
            fill: 0x000000,
            stroke: 0x87538D,
            strokeThickness: 1,
            letterSpacing: 0,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
    })
        speech.addChild(text)
        text.y = 75;
        text.x = 45;
        this.enemy.sprite.addChild(speech)


        this.text2 = new TextZone("Creeper's sorry \n (For being a creep) \n Forgive Creeper?");

        const yes = new Text("Yes", {
            fontFamily: 'Jersey 15',
            fontSize: 34,
            fill: 0xfefefe,
            stroke: 0x87538D,
            strokeThickness: 9,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
        });
        this.ticker = 0
        yes.interactive = true;
        yes.buttonMode = true;
        yes.on("pointerdown", () => {
            this.win()
        });

        const no = new Text("No", {
            fontFamily: 'Jersey 15',
            fontSize: 34,
            fill: 0xfefefe,
            stroke: 0x87538D,
            strokeThickness: 9,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
        });
        no.eventMode = "static";
        no.buttonMode = true;
        no.cursor = 'pointer';
        no.on("pointerover", () => {
            if (no.desactivated) return;
            no.desactivated = true
            new Tween(no).to({alpha:0},600).onComplete(()=>{
            no.cursor = 'default';
            }).start()
        })
        yes.on("pointerover", () => {
            yes.cursor = 'pointer';
        });
        yes.on("pointerout", () => {
            yes.cursor = 'default';
        });
        this.addChild(yes, no, this.text2)

        no.alpha = 0
        yes.alpha = 0
        const newX = (this.hero.sprite.x+this.enemy.sprite.x)/2-this.screenWidth/2
        new Tween(Manager.app.stage.pivot).to({x:(this.hero.sprite.x+this.enemy.sprite.x)/2-this.screenWidth/2},500).start().onComplete(()=>{
        yes.x = Manager.app.stage.pivot.x + this.screenWidth/2-100;
        no.x = Manager.app.stage.pivot.x + this.screenWidth/2;
        yes.y = 225
        no.y = 225
        this.text2.x = Manager.app.stage.pivot.x + this.screenWidth/2 -200;

            new Tween({}).to({},2500).start().onComplete(()=> {
                new Tween(yes).to({alpha:1}, 800).start().onUpdate(()=>{
no.alpha = yes.alpha

                });
            });

        });



}
}



// cutscene:
//  don't allow player control 
// there will be one 
//
// If only you had two copies of this book, this chase would be unnecessary
// You got your book back, Enjoy it! (image of tress)
//
