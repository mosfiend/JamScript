import {Container, Graphics, Sprite, Text} from 'pixi.js'
import Matter from 'matter-js';
import { Manager } from "../manager.js"
import { Background } from '../game/Background.js';
import { Hero } from '../game/Hero.js';
import { Enemy } from '../game/Enemy.js';
import { Signs } from '../game/Signs.js';
import { TrainWreck } from '../game/Collision.js';
import { TextZone } from '../game/Text.js';
import * as Filters from 'pixi-filters';
import { Tween } from 'tweedle.js';
import { Platforms } from '../game/Platforms.js';
export class Stage extends Container {
      constructor() {
            super();
            this.screenWidth = Manager.width;
            this.screenHeight = Manager.height;
            this.filter = new Filters.AsciiFilter()
            this.keySet = new Set()
            this.won1 = false
            this.won = false

    this.theme = Manager.song1
            this.theme.volume = 0.05
            this.theme.play()
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
            Manager.app.stage.addChild(Manager.currentScene)
      }

      transitionOut() {
            Manager.app.stage.removeChild(Manager.currentScene);
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
        Manager.song2.volume= 0.01;
        Manager.song2.play({start: 226});
        this.bg.filters = [new Filters.MotionBlurFilter()];
        this.won = true;
const bg = new Graphics().beginFill(0x41213b).drawRect(Manager.app.stage.pivot.x, 0, 10000,10000);
        bg.alpha = 0;
        this.addChild(bg);

        let image1 = Sprite.from("tress")
        image1.x = Manager.app.stage.pivot.x +400
            image1.width = image1.width/5
        image1.height = image1.height/5
        image1.alpha = 0
        image1.y = this.screenHeight/2- image1.height/2
let text1 = new Text("Congratulations! \n You beat the game and got your book back!", {
            fontFamily: 'Jersey 15',
            fontSize: 28,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text1.x = Manager.app.stage.pivot.x + 30
        text1.alpha = 0
        text1.y = this.screenHeight/2 - text1.height/2
        this.addChild(image1, text1)

const pause = new Tween({}).to({},2500)
        const scene1 = new Tween(image1).to({alpha:1},800).onUpdate(()=> {
            text1.alpha = image1.alpha
        }).start();

const pause2 = new Tween({}).to({},3000).start();
        const fade = new Tween(image1).to({alpha:0},400).onUpdate(()=> {
            text1.alpha = image1.alpha
        });


        let image2 = Sprite.from("scene2")
        image2.x = Manager.app.stage.pivot.x+ 50
            image2.width = image2.width* 2
        image2.height = image2.height*2
        image2.alpha = 0
        image2.y = this.screenHeight/2- image2.height/2
let text2 = new Text("I am tired of listening to this song, hope you enjoyed being the main character", {
            fontFamily: 'Jersey 15',
            fontSize: 28,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text2.x = Manager.app.stage.pivot.x + this.screenWidth/2
        text2.alpha = 0
        text2.y = this.screenHeight/2 - text2.height/2
        this.addChild(image2, text2)

        const scene2 = new Tween(image2).to({alpha:1},800).onUpdate(()=> {
            text2.alpha = image2.alpha
        });


let text3 = new Text("See ya in a bit :)", {
            fontFamily: 'Jersey 15',
            fontSize: 28,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text3.x = Manager.app.stage.pivot.x + this.screenWidth/2-text3.width/3
        text3.alpha = 1
        text3.y = this.screenHeight/2 - text3.height/3

new Tween({}).to({}, 6700).onComplete(()=>{
        this.addChild(text3)
})

        const scene4 = new Tween(text3).to({alpha:1},800).onStart(()=>{
            console.log("hm?")
        });

        const fade2 = new Tween(image2).to({alpha:0},400).onUpdate(()=> {
            text2.alpha = image2.alpha
        }).onComplete(()=> {
            this.addChild(text3)
        })
        scene1.chain(pause)
pause.chain(fade)
fade.chain(scene2)
scene2.chain(pause2)
pause2.chain(fade2)


new Tween(bg).to(
            {alpha:1}, 800
        )
            .onComplete(()=>{
      Manager.clearPhysics();
            })
            .start()
    }

  lose() {
    this.hero.implode();
    this.lost = true;
    Manager.music.volume = Math.min(Manager.music.volume, 0.02);
    const temp = new Graphics()
      .beginFill(0xcee7e1)
      .drawRect(0, 0, this.screenWidth, this.screenHeight);
    temp.y = Manager.app.stage.pivot.y;
    temp.alpha = 0;
    this.addChild(temp);
    const tween1 = new Tween(temp).to({ alpha: 0 }, 300);
    const tween2 = new Tween(temp).to({ alpha: 1 }, 500);

    tween1.start().onComplete(() => {
      tween2.start().onComplete(() => {
        Manager.app.stage.pivot.set(0, 0);
        const scene = new GameOver(func, this.score.score);
        this.addChild(scene);
      });
    });
    function func() {
      // Manager.usedOps = new Set()
    }
  }

    playScene1() {
            this.enemy = new Enemy()
            this.addChild(this.enemy);
const run1 = new Tween(this.enemy.sprite).to({x:2000}, 45).start()
        .onComplete(()=> {
            this.hero = new Hero(this.keySet);
            this.on("pointerdown", () => {
                  this.hero.startJump();
            });


            Matter.Events.on(Manager.physics, 'collisionStart', (e) => { this.hero.land(e) });
            this.addChild( this.hero);
            });

const run2 = new Tween(this.enemy.sprite).to({x:4900},500);

this.backnforth = new Tween(this.enemy.sprite).to({x:5300},1800).yoyo(true).repeat(Infinity).
        onRepeat(()=>{
            console.log("swap")
this.enemy.sprite.scale.x = this.enemy.sprite.scale.x*-1

        });
        run1.chain(run2);
        run2.chain(this.backnforth);
    }

    playScene2() {
        this.removeChild(this.signs)
this.backnforth.pause()
    this.enemy.die()
    this.theme.volume = 0.005
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
            fontSize: 28,
            fill: 0xfefefe,
            stroke: 0x87538D,
            strokeThickness: 10,
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
            fontSize: 28,
            fill: 0xfefefe,
            stroke: 0x87538D,
            strokeThickness: 10,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
        });
        no.interactive = true;
        no.buttonMode = true;
        no.on("pointerover", () => {
            no.cursor = 'pointer';
            new Tween(no).to({alpha:0},600).start()
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

            new Tween({}).to({},1100).start().onComplete(()=> {
                new Tween(yes).to({alpha:1}, 500).start().onUpdate(()=>{
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
