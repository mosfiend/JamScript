import {Container, Graphics, Text} from 'pixi.js';
import { Manager } from "../manager.js";
import { Stage } from './Stage.js';
export class StartMenu extends Container {
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
this.bg = new Graphics().beginFill(0x2E3037).drawRect(0, 0, 10000, 10000)
        this.text = new Text("Click to start", {
            fontSize: 28,
            fill: 0xfefefe,
            stroke: 0x87538D,
            strokeThickness: 5,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700
        });
        this.ticker = 0
        this.text.x = Manager.width/2 -this.text.width/2
        this.text.y = Manager.height/2 - this.text.height/2
        // Create a play button
        this.text.interactive = true;
        this.text.buttonMode = true;
        this.text.on("pointerdown", () => {
            Manager.changeScene(new Stage());

        });

        this.bg.interactive = true;
        this.bg.buttonMode = true;
        this.bg.on("pointerdown", () => {
            Manager.changeScene(new Stage());

        });
        this.text.on("pointerover", () => {
            this.text.cursor = 'pointer';
        });
        this.text.on("pointerout", () => {
            this.text.cursor = 'default';
        });

        this.addChild(this.bg, this.text);
    }

    transitionIn() {
        Manager.app.stage.addChild(Manager.currentScene);
    }

    transitionOut() {
        Manager.app.stage.removeChild(Manager.currentScene);
    }

    resize(newWidth, newHeight) {
        this.screenWidth = newWidth;
        this.screenHeight = newHeight;
    }

    update(deltaTime) {
        // Update logic goes here
    }
}
