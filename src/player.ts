import { Camera } from "./camera";
import { RectCollider } from "./colliders";
import { Component } from "./components";
import { Display } from "./display";
import { Engine } from "./engine";
import { Input } from "./input";
import { Maths } from "./maths";
import { Sound } from "./sounds";
import { Sprite } from "./sprites";
import { TileCorners } from "./tile";
import { TileMap } from "./tilemap";
import { Time } from "./time";

export interface PlatformControllerArgs {
  /**
   * The tileMap component
   */
  tileMap: TileMap;
}

/**
 * Component for managing platformer physics.
 */
export class PlatformController extends Component {
  /**
   * The maximum velocity on the Y axis
   */
  maxVelocityY = 10;

  /**
   * The gravity of the controller
   */
  gravity = 0.5;

  /**
   * The time component
   */
  time = this.components.get(Time);

  /**
   * The tilemap component
   */
  tileMap: TileMap;

  constructor(engine: Engine, args: PlatformControllerArgs) {
    super(engine, args);
    this.time = this.components.get(Time);
  }

  /**
   *
   * @returns List of required parameters for the platform controller
   */
  params(): string[] {
    return ["tileMap"];
  }

  getCorners(
    x1: number,
    y1: number,
    width: number,
    height: number
  ): TileCorners {
    return this.tileMap.getCorners(x1, y1, width, height);
  }

  checkForWalls(sprite: Player, moveDistanceX: number): number {
    moveDistanceX = Math.floor(moveDistanceX);
    let corners = this.getCorners(
      sprite.x + moveDistanceX,
      sprite.y,
      sprite.width,
      sprite.height
    );
    if (
      moveDistanceX > 0 &&
      (corners.downRight.solid.left || corners.upRight.solid.left)
    ) {
      sprite.velocityX = 0;
      sprite.accelerationX = 0;
      moveDistanceX = 0;
      //moveDistanceX = (corners.downRight.x * corners.downLeft.width) - sprite.x - sprite.width - 1;
    }
    if (
      moveDistanceX < 0 &&
      (corners.downLeft.solid.right || corners.upLeft.solid.right)
    ) {
      //moveDistanceX = sprite.x - ((corners.downLeft.x + 1) * corners.downLeft.width) - 1;
      //moveDistanceX *= -1;
      sprite.velocityX = 0;
      sprite.accelerationX = 0;
      moveDistanceX = 0;
    }
    return moveDistanceX;
  }

  applyGravity(sprite: Player): number {
    let moveDistanceY = Math.floor(sprite.velocityY);
    if (!sprite.jumping) {
      sprite.velocityY += this.gravity * this.time.deltaTime;
    } else {
      sprite.velocityY += this.gravity * 1.2 * this.time.deltaTime;
    }
    moveDistanceY = Maths.clamp(
      moveDistanceY,
      -this.maxVelocityY,
      this.maxVelocityY
    );
    let corners = this.getCorners(
      sprite.x,
      sprite.y + moveDistanceY,
      sprite.width,
      sprite.height
    );
    if (moveDistanceY > 0) {
      if (corners.downRight.solid.top || corners.downLeft.solid.top) {
        moveDistanceY = 0;
        sprite.velocityY = 0;
        sprite.jumping = false;
      }
    } else {
      if (corners.upRight.solid.bottom || corners.upLeft.solid.bottom) {
        moveDistanceY = 0;
        sprite.velocityY = 0;
      }
    }
    return moveDistanceY;
  }

  clampX(x: number): number {
    return Maths.clamp(
      x,
      0,
      this.tileMap.width * this.tileMap.twidth - this.engine.display.width
    );
  }

  clampY(y: number): number {
    return Maths.clamp(
      y,
      0,
      this.tileMap.height * this.tileMap.theight - this.engine.display.height
    );
  }
}

export class Player extends Sprite {
  color: string;
  corners: any;
  vars: any;
  smoothTime: number;
  dir: number;
  speed: number;
  speedY: number;
  velocityY: number;
  jumpForce: number;
  jumping: boolean;
  shooting: boolean;
  jumpBooster: number;
  accelerationForceX: number;
  accelerationX: number;
  maxSpeedMultX: number;
  velocityX: number;
  frictionX: number;
  dirX: number;
  camera: Camera;
  input: Input;
  display: Display;
  time: Time;
  sound: Sound;
  controller: PlatformController;

  constructor(engine: Engine, args: any) {
    super(engine, args);
    this.color = "blue";
    this.corners = {};
    this.vars = {};
    this.smoothTime = 1.3;
    this.vars.cv = 0;
    this.dir = 1;
    this.speed = 6;
    this.speedY = 0;
    this.velocityY = 0;
    this.jumpForce = 12;
    this.jumping = false;
    this.shooting = false;
    this.jumpBooster = 0;

    this.accelerationForceX = 1.8;
    this.accelerationX = 0;
    this.maxSpeedMultX = 9;
    this.velocityX = 0;
    this.frictionX = 0.9;
    this.dirX = 0;
    this.colliders.add(
      new RectCollider({
        x: -10,
        y: -10,
        width: this.width + 10,
        height: this.height + 10,
        parent: this,
      })
    );
  }

  getCorners(x: number, y: number): TileCorners {
    return this.controller.getCorners(x, y, this.width, this.height);
  }

  move(): void {
    if (!this.controller) {
      return;
    }

    // left right movement
    let moveDistanceX = 0;
    let inputX = this.input.getAxisHorizontal();

    // acceleration movement
    if (!this.jumping) {
      this.accelerationX = inputX * this.accelerationForceX;
    } else {
      this.accelerationX = (inputX * this.accelerationForceX) / 6;
    }

    this.velocityX += this.accelerationX * this.time.deltaTime;

    // friction
    let currentDir = Math.sign(this.velocityX);
    if (!this.jumping) {
      this.velocityX += -currentDir * this.frictionX * this.time.deltaTime;
    } else {
      this.velocityX +=
        ((-currentDir * this.frictionX) / 10) * this.time.deltaTime;
    }
    if (Math.sign(this.velocityX) !== currentDir) {
      this.velocityX = 0;
    }

    // limit speed
    let maxSpeedX = this.maxSpeedMultX;
    if (
      this.input.keyCode("KeyZ") &&
      inputX &&
      (this.corners.downLeft.solid.top || this.corners.downRight.solid.top)
    ) {
      maxSpeedX *= 2;
    }
    this.velocityX = Maths.clamp(this.velocityX, -maxSpeedX, maxSpeedX);
    moveDistanceX += this.velocityX * this.time.deltaTime;

    //moveDistanceX = inputX * 8 * this.time.deltaTime;
    moveDistanceX = this.controller.checkForWalls(this, moveDistanceX);
    this.x += moveDistanceX;
    this.camera.x += moveDistanceX;
    this.camera.x = this.controller.clampX(this.camera.x);
    if (this.camera.x < 0) {
      this.camera.x = 0;
    }

    // gravity
    let moveDistanceY = this.controller.applyGravity(this);
    this.y += moveDistanceY;
    this.camera.y += moveDistanceY;
    this.camera.y = this.controller.clampY(this.camera.y);

    // jump pressed and not jumping
    if (this.input.keyCode("ArrowUp") && !this.jumping) {
      this.jumping = true;
      this.velocityY = -this.jumpForce / 2;
      this.jumpBooster = 0;
    }
    // jump being held while jumping
    if (
      this.input.keyCode("ArrowUp") &&
      this.jumping &&
      this.jumpBooster < 10
    ) {
      this.velocityY -= this.jumpForce / 12;
      this.jumpBooster += 1;
    }
    // jump released and jumping
    if (!this.input.keyCode("ArrowUp") && this.jumping) {
      this.jumpBooster = 0;
      if (this.velocityY < -this.jumpForce / 2) {
        this.velocityY = -this.jumpForce / 2;
      }
    }
  }

  draw(): void {
    this.display.fillRect(this.x, this.y, this.width, this.height, this.color);
  }

  init(): void {
    this.input = this.components.get(Input);
    this.display = this.components.get(Display);
    this.time = this.components.get(Time);
    this.sound = this.components.get(Sound);
    this.camera = this.components.get(Camera);

    this.camera.x = Math.floor(this.x - this.display.width / 2);
    this.camera.y = Math.floor(this.y - this.display.height / 2);
    this.controller = this.components.get(PlatformController);
  }

  collision(sprite: Sprite): void {}
}
