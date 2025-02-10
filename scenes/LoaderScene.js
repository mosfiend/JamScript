import {Assets, Container, Graphics, Text} from "pixi.js"
import { Manager } from "../manager";
import { manifest } from "../assets/assets"
import { StartMenu } from "./StartMenu"
import { Sound } from '@pixi/sound'
import { Stage } from "./Stage";

export class LoaderScene extends Container {
    constructor() {
        super();
        this.text = new Text("Loading...", {
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
        this.addChild(this.text)
        this.initializeLoader().then(() => {
            setTimeout(()=>{
            this.gameLoaded()
            }, 3500)
        })
    }
    update(deltaTime) {
        switch (this.ticker) {
            case 15: 
this.text.text = "Loading."
            break;
            case 30: 
this.text.text = "Loading.."
            break;
            case 45:
this.text.text = "Loading..."
            break;
            case 0: 
this.text.text = "Loading"
            break;
        }
        this.ticker = (this.ticker +1)% 60

    

        }
    async initializeLoader() {
        Manager.createPhysics(); // No idea where I should put this, it's not async but I need to be loaded a bit before my assets
    Manager.song1 = Sound.from({ url: "pictors/main-character.mp3"});
    // Manager.song1.volume = ;
    Manager.song2 = Sound.from({ url: "pictors/main-character-vocal.mp3"});
    Manager.song2.volume = 0
    Manager.song1.loop = true;
    Manager.song2.loop = false;
        await Assets.init({ manifest });
        const bundleIds = manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundleIds);
    }
    downloadProgress(progressRatio) {

    }
    gameLoaded() {
        Manager.changeScene(new StartMenu());

    }
    transitionIn() {
        Manager.app.stage.addChild(Manager.currentScene)
    }

    transitionOut() {
        Manager.app.stage.removeChild(Manager.currentScene)
    }

    resize() {

    }

}
