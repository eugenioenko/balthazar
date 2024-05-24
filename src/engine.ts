import { Camera } from "./camera";
import { Collection } from "./collection";
import { Component } from "./components";
import { Debug } from "./debug";
import { Display } from "./display";
import { Input } from "./input";
import { ObjectConstructor } from "./objects";
import { Registry } from "./registry";
import { ResourceItemArgs, Resources } from "./resources";
import { Scene } from "./scenes";
import { Sound } from "./sounds";
import { TileMap } from "./tilemap";
import { Time } from "./time";

export interface EngineArgs {
  canvas: string;
  width: number;
  height: number;
}

export interface EngineCreateArgs {
  canvas: string;
  width: number;
  height: number;
  resources: ResourceItemArgs[];
  game: (engine: Engine) => void;
}

/**
 * Engine is the main object of the game engine.
 * Engine consist of a group of different components which manage different tasks.
 * Each component is a lego piece, and the engine is the glue which binds them together.
 * Once the document is ready, Engine will initialize each component added
 * into it, call the preloader method, execute the game creation function
 * and then start executing the game loop.
 */
export class Engine extends Component {
  engine: Engine;
  // TODO remove tile map from engine
  tileMap: TileMap;
  registry = new Registry();
  scenes = new Collection<Scene>();
  time: Time;
  display: Display;
  resources: Resources;
  camera: Camera;
  sound: Sound;
  input: Input;
  fpsDelayCount = 0;
  width: number;
  height: number;
  logger: string[] = ["", ""];

  constructor(args: EngineArgs) {
    super(undefined, args);
    this.engine = this;
    Debug.groupStart("Engine loaded components");
    this.resources = this.addComponent(Resources);
    this.camera = this.addComponent(Camera, {
      x: 0,
      y: 0,
    });
    this.time = this.addComponent(Time);
    this.sound = this.addComponent(Sound);
    this.display = this.addComponent(Display, {
      id: "canvas",
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    });
    this.input = this.addComponent(Input);
    Debug.groupEnd();
  }

  params() {
    return ["canvas", "width", "height"];
  }

  /**
   * Static function to replace the windows.onload method.
   * Once the window is ready, engine will initialize its components, execute
   * the preloader and when preloader loaded all the resources, create the game
   * and execute the gameloop.
   */
  static create(args: EngineCreateArgs) {
    Debug.validateParams("Engine.create", args, [
      "canvas",
      "width",
      "height",
      "resources",
      "game",
    ]);
    (function () {
      window.addEventListener("load", async function () {
        const engine = new Engine({
          canvas: args.canvas,
          width: args.width,
          height: args.height,
        });
        for (const resource of args.resources) {
          engine.resources.add(resource);
        }
        await engine.resources.preload();
        engine.init();
        args.game(engine);
        engine.gameLoop();
        (window as any)["gengine"] = engine;
      });
    })();
  }

  /**
   * Adds a component to the engine.
   * @param Constructor The constructor of the component to store.
   * @param args  to initialize the component.
   */
  addComponent(Constructor: ObjectConstructor<any>, args: any = {}) {
    const instance = new Constructor(this, args);
    this.components.set(Constructor, instance);
    instance.init();
    return instance;
  }

  move(): void {
    for (let component of this.registry.values<Component>()) {
      component.move();
    }
    for (let scene of this.scenes.all()) {
      if (scene.isActive) {
        scene.move();
      }
    }
  }

  draw(): void {
    this.display.clear();
    for (let component of this.registry.values<Component>()) {
      component.draw();
    }
    for (let scene of this.scenes.all()) {
      if (scene.isVisible) {
        scene.draw();
      }
    }
    if (Debug.active() && this.input.mouse.isInside) {
      this.display.circle(
        this.camera.x + this.input.mouse.x - 1,
        this.camera.y + this.input.mouse.y - 1,
        6,
        "red"
      );
    }
  }

  gameLoop = () => {
    this.move();
    this.fpsDelayCount = 0;
    this.draw();
    this.debugInfo();
    window.requestAnimationFrame(this.gameLoop);
  };

  debugInfo() {
    this.display.text(this.logger[0], 20, 30);
    this.display.text(this.logger[1], 20, 50);
    if (!Debug.active()) return;
    this.display.text(this.time.time.toFixed(2), 20, 20);
    this.display.text(this.time.deltaTime.toFixed(4), 20, 40);
    this.display.text(this.time.fps.toFixed(2), 20, 60);
  }
}
