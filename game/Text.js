import * as PIXI from "pixi.js"
export class TextZone extends PIXI.Container {
    constructor(content = "Quick! While the game was loading that Creeper stole a book of yours. \nGo after him!") {
        super();
        this.content = content;
        this.textArray = this.content.split("");
        this.curIdx = 0;
        this.curText = "";
        this.needsCorrection = false
        this.corrected = false

        // push words bit by bit
        this.text = new PIXI.Text(this.curText, {
            fontFamily: 'Jersey 15',
            fontSize: 35,
            fill: 0xfefefe,
            stroke: 0x87538D,
            strokeThickness: 5,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
        });
        this.text.x = 40
        this.text.y = 80

        this.cursor = PIXI.Sprite.from("pointer")

        this.cursor.x = this.text.x
        this.cursor.y = this.text.y + this.text.height
        this.cursor.betwix = false
        this.ticker = 1
        this.addChild(this.text);
    }

    update(deltaTime) {
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
            this.ticker = (this.ticker + 1) % 5;
        }
    }

    moveCursor(dir) {
        if (!this.cursor.betwix) {
            this.cursorIdx = (this.cursorIdx + dir + this.content.length) % this.content.length
            this.cursor.x = this.text.x + (this.cursorIdx * this.text.width / this.content.length) + this.text.width * dir / (-this.content.length * 2)
            this.cursor.y = this.text.y + this.text.height / 3
        }
        else {
            this.cursor.x = this.text.x + this.cursorIdx * this.text.width / this.content.length
            this.cursor.y = this.text.y + this.text.height / 2
        }

        this.cursor.betwix = !this.cursor.betwix
    }

    handleEvent(key) {
        if (key === "a" || key === "ArrowLeft") this.moveCursor(-1);
        if (key === "d" || key === "ArrowRight") this.moveCursor(1);

    }
}


// a new condition is added:
// if (idx -1) (idx-2 ) idx-3 are b o o
// then push "b" instead of the current letter and set needsCorrection to true
// 
//
