import { Assets, Container, Graphics, PerspectiveMesh, Sprite, Text } from "pixi.js";
import { Tween } from "tweedle.js";
import { Manager } from "../manager";

export class Credits extends Container {
    constructor() {
     super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.x = Manager.app.stage.pivot.x
        this.bg = new Graphics().rect(0, 0, 10000,10000).fill(0x41213b);
        this.bg.alpha = 0;

        this.load();

let text1 = new Text("Congratulations! \n You beat the game and got your book back! \n \n (This is just an elaborate way to tell you that the book was ordered) ", {
            fontFamily: 'Jersey 15',
            fontSize: 28,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text1.x =  this.screenWidth/2 + 20;
        text1.alpha = 0;
        text1.y = this.screenHeight/2 - text1.height/2;


        let image2 = Sprite.from("scene2");
        image2.x = -image2.width + this.screenWidth;
        image2.width = image2.width;
        image2.height = image2.height;
        image2.alpha = 0;
        image2.y = this.screenHeight/2- image2.height/2;
let text2 = new Text("Sequel coming out next time Creeper DMs you something weird. \n \n Look forward to it!", {
            fontFamily: 'Jersey 15',
            fontSize: 27,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text2.x = 20 ;
        text2.alpha = 0;
        text2.y = this.screenHeight/2 - text2.height/2;

        const scene2 = new Tween(image2).to({alpha:1},800).onUpdate(()=> {
            text2.alpha = image2.alpha
        });

let text3 = new Text("Thank you", {
            fontFamily: 'Jersey 15',
            fontSize: 28,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text3.x = 0 + this.screenWidth/2-text3.width/3;
        text3.alpha = 0;
        text3.y = this.screenHeight/2 - text3.height/3;
let text4 = new Text("for playing :)", {
            fontFamily: 'Jersey 15',
            fontSize: 28,
            fill: 0xfefefe,
            letterSpacing: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        });
        text4.x = text3.width+ text3.x +5;
        text4.alpha = 0;
        text4.y = this.screenHeight/2 - text3.height/3;
        this.addChild(this.bg, text1, image2, text2, text3,text4);

        const appear = new Tween(this.bg).to(
            {alpha:1}, 800
        )
        .start();

        const scene1 = new Tween(text1).to({alpha:1},1500).onUpdate(()=> {
            this.mesh.alpha = text1.alpha;
                    }).onComplete(()=>{});

        const clock = {t:0};
        const pause = new Tween(clock).to({t:1},4000).onUpdate(()=>{
        if (clock.t >0.98) text1.text = "Congratulations! \n You beat the game and got your book back! \n \n (This is just an elaborate way to tell you that the book was ordered) \n alsoiamsorry";
        });

        const fade = new Tween(text1).to({alpha:0},400).onUpdate(()=> {
            this.mesh.alpha =         text1.alpha
        });
        const pause2 = new Tween({}).to({},4500);

        const fade2 = new Tween(image2).to({alpha:0},800).onUpdate(()=> {
            text2.alpha = image2.alpha
        })

        const scene3 = new Tween(text3).to({alpha:1},800).onUpdate(()=> {
            text4.alpha = text3.alpha
        });
const pause3 = new Tween({}).to({},1800)

        const fade3 = new Tween(text4).to({alpha:0},600).onUpdate(()=> {
        });

        appear.chain(
            scene1.chain(
                pause.chain(
                    fade.chain(
                        scene2.chain(
                            pause2.chain(
                                fade2.chain(
                                    scene3.chain(
                                       pause3.chain(
                                            fade3
                                        ) 
                                    )
            )))))));

    }


    async load() {
     this.texture = await Assets.load({
        src: 'tress',
    });

    const points = [
        { x: 0, y: 0 },
        { x: this.texture.width, y: 0 },
        { x: this.texture.width, y: this.texture.height },
        { x: 0, y: this.texture.height },
    ];

    const outPoints = points.map((p) => ({ ...p }));
const texture = this.texture
    this.mesh = this.addChild(
        new PerspectiveMesh({
            texture,
            x: 20,
            y: 25,
            width: this.texture.width,
            height: this.texture.height,
        }),
    );

    let angleX = 0;
    let angleY = -30;
    this.mesh.alpha = 0

    // Function to apply 3D rotation to the points

    Manager.app.ticker.add(() =>
    {
        this.rotate3D(points, outPoints, angleX, angleY, 300);
        this.mesh.setCorners(
            outPoints[0].x,
            outPoints[0].y,
            outPoints[1].x,
            outPoints[1].y,
            outPoints[2].x,
            outPoints[2].y,
            outPoints[3].x,
            outPoints[3].y,
        );
    });

    this.hitArea = Manager.app.screen;
    this.eventMode = 'static';
    this.on('pointermove', (e) =>
    {
        const { x, y } = e.global;
        angleY = Math.min(-18,Math.max(-30,-(x - this.mesh.x+this.screenWidth/2+50) / 20));
//  
        angleX = Math.min(8,Math.max(-8, -(y - this.mesh.y-this.screenHeight/2) / 20));
    });
    }


    rotate3D (points, outPoints, angleX, angleY, perspective) {
        const radX = (angleX * Math.PI) / 180;
        const radY = (angleY * Math.PI) / 180;
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);

        for (let i = 0; i < points.length; i++)
        {
            const src = points[i];
            const out = outPoints[i];
            const x = src.x - this.texture.width / 2;
            const y = src.y - this.texture.height / 2;
            let z = 0; // Assume initial z is 0 for this 2D plane

            // Rotate around Y axis
            const xY = cosY * x - sinY * z;

            z = sinY * x + cosY * z;

            // Rotate around X axis
            const yX = cosX * y - sinX * z;

            z = sinX * y + cosX * z;

            // Apply perspective projection
            const scale = perspective / (perspective - z);

            out.x = xY * scale + this.texture.width / 2;
            out.y = yX * scale + this.texture.height / 2;
        }
    }
}
