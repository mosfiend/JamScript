import {Container, Sprite, Text, Texture} from 'pixi.js'
import Matter from 'matter-js';
import { Manager } from "../manager";

export class Signs extends Container {
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.ticker = 0

        this.content = "";
        this.textArray = this.content.split("");
        this.curIdx = 0;
        this.curText = "";
        this.needsCorrection = false;
        this.corrected = false;

this.quotes = [
            {quote: "If only you had another copy of that book, this chase wouldn't have been necessary", x:1000},
            {quote: "Who would ever buy two copies of the same book though?", x:1500},

            {quote: "Maybe someone who likes to read the same thing twice?", x:2000},
            {quote: "Maybe someone who likes to read the same thing  twice?", x:2200},

            {quote: `You're getting close to the Creeper, press "S", "K", or "Y" to attack`, x:3000},

            {quote: "La maladie parodontale est l'ensemble des affections qui touchent les tissus de soutien de la dent, dont l'amplitude et la signification varient d'un individu à un autre", x: 3500},
            {quote: "Yes, these signs are just a distraction from the lack of actual gameplay.", x: 4100},
        ]
        this.signs = [ ]
        for (let i= 0 ;i<this.quotes.length;i++) {
        const sign = new Sign(this.quotes[i].x, this.quotes[i].quote)

        this.addChild(sign);
        this.signs.push(sign);
        }

        this.text = new Text(this.curText, {
            fontFamily: 'Jersey 15',
            fontSize: 27,
            fill: 0xfcfcfc,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 620
        });
        this.text.y = 510 

        this.addChild(this.text);
    };

    update(deltaTime) {
this.text.x = 90 + Manager.app.stage.pivot.x
        const skip = new Set([" ", ".", "!"])
        if (this.curIdx >= this.content.length) {
        }
        else if (this.ticker === 0 ||  skip.has( this.textArray[this.curIdx]
        )  ) {
            if (
                this.textArray[this.curIdx - 1] === "o" &&
                this.textArray[this.curIdx - 2] === "o" &&
                this.textArray[this.curIdx - 3] === "b"
            ) {
                this.needsCorrection = true;
            }

            if (this.needsCorrection && !this.corrected) {
                this.curText += "b";
                this.corrected = true;
            }
            else {
                if (this.corrected) {
                    this.curText = this.curText.substring(0, this.curText.length-1);
                }
                this.curText += this.textArray[this.curIdx];
                this.curIdx++;

                this.needsCorrection = false;
                this.corrected = false;
            }
                this.ticker++;
                this.text.text = this.curText;

        } else {
            this.ticker = (this.ticker + 1) % 4;
        }
    };

    changeContent(text) {

    }
}

class Sign extends Sprite {
    constructor(x, content) {
        super();
        this.texture = Texture.from("sign")
        this.content = content
        this.width = this.width/9;
        this.height = this.height/9;
        this.x = x;
        this.y = 315;
    }
}

// implement a circular queue
// uses the same 8 pixi graphics
// but changes their shape when it's popped back to the beginning
//
