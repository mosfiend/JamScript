import { Application, Ticker } from "pixi.js";
import Matter from 'matter-js';
import { Group } from "tweedle.js";

export class Manager {
    constructor() {
    }
    static currentScene;
    static x;
    static y;

    // With getters but not setters, these variables become read-only
    static get width() {
        return 800//Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    static get height() {
        return 600//Math.max(document.documentElement.clientHeight, window.innerHidth || 0);
    }

    // Use this function ONCE to start the entire machinery
    static async initialize(width, height, background) {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
    Manager.app = new Application();

    await Manager.app.init({
      view: document.getElementById("pixi-canvas"),
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true,
      backgroundColor: background,
    });
    Ticker.shared.add(Manager.update);
        window.addEventListener("resize", Manager.resize);
        globalThis.__PIXI_APP__ = Manager.app;
    }

    static resize() {
        if (Manager.currentScene) {
            Manager.currentScene.resize(Manager.width, Manager.height);
        }
    }

    static changeScene(newScene) {
        
        if (Manager.currentScene != undefined) Manager.currentScene.transitionOut();
        Manager.currentScene = newScene;
        Manager.currentScene.transitionIn()
    }

    static createPhysics() {
        Manager.physics = Matter.Engine.create();
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, Manager.physics);
    }

  static clearPhysics() {
    Matter.World.clear(Manager.physics.world);
    Matter.Engine.clear(Manager.physics);
    Manager.physics = null;
    // Notice how runner may still be running the old physics instance
  }

    static update(deltaTime) {
        Group.shared.update();
        if (Manager.currentScene != undefined) {
            Manager.currentScene.update(deltaTime)
        }

    }
}

