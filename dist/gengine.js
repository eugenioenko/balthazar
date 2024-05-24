(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gengine"] = factory();
	else
		root["gengine"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/camera.ts":
/*!***********************!*\
  !*** ./src/camera.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.ts");

class Camera extends _components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(engine, args) {
        super(engine, args);
    }
    params() {
        return ["x", "y"];
    }
    move() { }
}


/***/ }),

/***/ "./src/collection.ts":
/*!***************************!*\
  !*** ./src/collection.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Collection: () => (/* binding */ Collection)
/* harmony export */ });
/**
 * Collection are a group of items that can be of any type.
 */
class Collection {
    constructor() {
        this.items = [];
    }
    /**
     * Add an item to the collection.
     * @param item Item to add.
     */
    add(item) {
        this.items.push(item);
    }
    /**
     * Remove an item from the collection.
     * @param item Item to remove.
     */
    remove(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    /**
     * Get all items in the collection.
     */
    all() {
        return this.items;
    }
}


/***/ }),

/***/ "./src/colliders.ts":
/*!**************************!*\
  !*** ./src/colliders.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleCollider: () => (/* binding */ CircleCollider),
/* harmony export */   Collider: () => (/* binding */ Collider),
/* harmony export */   RectCollider: () => (/* binding */ RectCollider)
/* harmony export */ });
/* harmony import */ var _collisions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collisions */ "./src/collisions.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objects */ "./src/objects.ts");




/**
 * Collider represents a rect/circle which can collide with another collider.
 * The position of the collider is relative to its parent sprite.
 * A sprite can have "infinite" number of colliders.
 */
class Collider extends _objects__WEBPACK_IMPORTED_MODULE_3__.GameObject {
    constructor(args) {
        super(args);
    }
    test(collider) {
        throw "Not implemented";
    }
    get gx() {
        return this.parent.x + this.x;
    }
    get gy() {
        return this.parent.y + this.y;
    }
    debugDraw(color = "red") {
        throw "Not implemented";
    }
}
/**
 * CircleCollider is a Collider with a circular shape.
 */
class CircleCollider extends Collider {
    constructor(args) {
        super(args);
        this.radius = this.width / 2;
    }
    test(collider) {
        if (collider instanceof CircleCollider) {
            return _collisions__WEBPACK_IMPORTED_MODULE_0__.TestCollision.CircleVsCircle(this, collider);
        }
        if (collider instanceof RectCollider) {
            return _collisions__WEBPACK_IMPORTED_MODULE_0__.TestCollision.CircleVsRect(this, collider);
        }
        throw "Unknown collider";
    }
    debugDraw(color = "red") {
        const display = this.parent.components.get(_display__WEBPACK_IMPORTED_MODULE_2__.Display);
        if (!display) {
            return;
        }
        display.circle(this.gx, this.gy, this.radius, color);
    }
}
/**
 * RectCollider is a collider of rectangular shape.
 */
class RectCollider extends Collider {
    constructor(params) {
        super(params);
    }
    params() {
        return ["x", "y", "width", "height"];
    }
    test(collider) {
        if (collider instanceof CircleCollider) {
            return _collisions__WEBPACK_IMPORTED_MODULE_0__.TestCollision.CircleVsRect(collider, this);
        }
        if (collider instanceof RectCollider) {
            return _collisions__WEBPACK_IMPORTED_MODULE_0__.TestCollision.RectVsRect(this, collider);
        }
        _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.error("Unknown collider " + typeof collider);
        return false;
    }
    debugDraw(color = "red") {
        const display = this.parent.components.get(_display__WEBPACK_IMPORTED_MODULE_2__.Display);
        if (!display) {
            return;
        }
        display.rect(this.gx, this.gy, this.width, this.height, color);
    }
}


/***/ }),

/***/ "./src/collisions.ts":
/*!***************************!*\
  !*** ./src/collisions.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestCollision: () => (/* binding */ TestCollision)
/* harmony export */ });
/**
 * A class with static methods which test for collision between different
 * types of colliders.
 */
class TestCollision {
    static CircleVsRect(circle, rect) {
        let halfRectWidth = rect.width / 2;
        let halfRectHeight = rect.height / 2;
        let halfDistX = Math.abs(circle.gx - rect.gx - halfRectWidth);
        let halfDistY = Math.abs(circle.gy - rect.gy - halfRectHeight);
        if (halfDistX > halfRectWidth + circle.radius)
            return false;
        if (halfDistY > halfRectHeight + circle.radius)
            return false;
        if (halfDistX <= halfRectWidth)
            return true;
        if (halfDistY <= halfRectHeight)
            return true;
        //corner collision
        let dx = halfDistX - halfRectWidth;
        let dy = halfDistY - halfRectHeight;
        return dx * dx + dy * dy <= Math.pow(circle.radius, 2);
    }
    static RectVsCircle(rect, circle) {
        return this.CircleVsRect(circle, rect);
    }
    static RectVsRect(rect1, rect2) {
        if (rect1.gx <= rect2.gx + rect2.width &&
            rect1.gx + rect1.width > rect2.gx &&
            rect1.gy <= rect2.gy + rect2.height &&
            rect1.height + rect1.gy >= rect2.gy) {
            return true;
        }
        return false;
    }
    static CircleVsCircle(circle1, circle2) {
        let dx = circle1.gx - circle2.gx;
        let dy = circle1.gy - circle2.gy;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < circle1.width / 2 + circle2.width / 2) {
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/components.ts":
/*!***************************!*\
  !*** ./src/components.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects */ "./src/objects.ts");


/**
 * This is a base class of the component of the engine.
 * The engine consist of multiple components which perform various tasks.
 * Some Components form part of the core of the Engine, others could be added as need at runtime.
 * When the Engine is ready, it will create the instance of the component and pass itself as the engine parameter.
 * Each Component instance has access to the engine
 * @param {object} engine The instance of the engine, this will be passed by the engine
 * @param {object} params Object literal with parameters passed to the component constructed
 */
class Component extends _objects__WEBPACK_IMPORTED_MODULE_1__.GameObject {
    constructor(engine, args) {
        super(args);
        this.engine = engine;
    }
    /**
     * Method called when the component has been added to the engine and is ready
     */
    init() {
        _debug__WEBPACK_IMPORTED_MODULE_0__.Debug.success(`${this.constructor.name} initialized`);
    }
    /**
     * Method called each cycle of the engine game loop
     */
    move() { }
    /**
     * Method called each cycle of the engine game loop
     */
    draw() { }
    /**
     * Engines component registry
     */
    get components() {
        return this.engine.registry;
    }
}


/***/ }),

/***/ "./src/debug.ts":
/*!**********************!*\
  !*** ./src/debug.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Debug: () => (/* binding */ Debug)
/* harmony export */ });
/**
 * Class with static methods to facilitate the messages on the javascript console.
 * All the methods of Debug class will only run if the debug mode is on.
 * To activate the debug mode, declare a global variable before initializing the engine
 * with the name: GENGINE_DEBUG_MODE = true.
 * If the debug mode is off, no messages would be sent to the console.
 */
class Debug {
    /**
     *
     * @returns If the debug mode is active
     */
    static active() {
        return typeof GENGINE_DEBUG_MODE !== "undefined";
    }
    /**
     * Log a message to the console
     * @param message
     */
    static log(message) {
        if (!Debug.active())
            return;
        console.trace();
        console.log(message);
    }
    /**
     * Log a info message to the console when the debug mode is active
     * @param message
     */
    static info(message) {
        if (!Debug.active())
            return;
        console.info(message);
    }
    /**
     * Log a success message to the console when the debug mode is active
     * @param message
     */
    static success(message) {
        if (!Debug.active())
            return;
        console.info(message);
    }
    /**
     * Log a warning message to the console when the debug mode is active
     */
    static warn(message) {
        if (!Debug.active())
            return;
        console.warn(message);
    }
    /**
     * Throw an error message when the debug mode is active
     * @param message
     */
    static error(message) {
        if (!Debug.active())
            return;
        console.groupEnd();
        throw new Error(message);
    }
    /**
     * Start a group of messages in the console
     * @param name of the group
     */
    static groupStart(name) {
        if (!Debug.active())
            return;
        console.groupCollapsed(name);
    }
    /**
     * End a group of messages in the console
     */
    static groupEnd() {
        if (!Debug.active())
            return;
        console.groupEnd();
    }
    /**
     * Validates that the object literal of the constructor has the elements of the required array
     * @param method Object method name
     * @param args the arguments object passed into the constructor
     * @param required list of required members in the constructor arguments
     * @returns
     */
    static validateParams(method, args, required) {
        if (!Debug.active())
            return;
        if (!required || !required.length)
            return;
        if (required.length && !args) {
            Debug.warn(`${method} requires this members in the constructor: {${required.join(",")}}`);
        }
        for (let key of required) {
            if (typeof args[key] === "undefined") {
                Debug.error(`${method} requires of "${key}" in the constructor`);
            }
        }
    }
}


/***/ }),

/***/ "./src/display.ts":
/*!************************!*\
  !*** ./src/display.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Display: () => (/* binding */ Display),
/* harmony export */   DisplayAbstract: () => (/* binding */ DisplayAbstract)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");



/**
 * Abstract class of the Display component of the Engine.
 */
class DisplayAbstract extends _components__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(engine, args) {
        super(engine, args);
    }
    clear() { }
    fillRect(x, y, width, height, color) { }
    rect(x, y, width, height, color) { }
    circle(x, y, diameter, color) { }
    move() { }
}
class Display extends DisplayAbstract {
    constructor(engine, args) {
        super(engine, args);
        this.canvas = document.getElementById(this.id);
        this.canvas.setAttribute("width", `${this.width}`);
        this.canvas.setAttribute("height", `${this.height}`);
        this.canvas.style.cursor = "none";
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "12px Helvetica";
        this.ctx.imageSmoothingEnabled = this.isImageSmoothingEnabled;
        this.camera = this.components.get(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
    }
    /**
     *
     * @returns List of required parameters for the display
     */
    params() {
        return ["id", "x", "y", "width", "height"];
    }
    /**
     *
     * @returns List of default optional parameters for the display
     */
    config() {
        return {
            isImageSmoothingEnabled: false,
        };
    }
    clear() {
        this.ctx.fillStyle = "#0FF";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    fillRect(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.rect(-this.camera.x + x, -this.camera.y + y, width, height);
        this.ctx.closePath();
        this.ctx.fill();
    }
    rect(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = color;
        this.ctx.rect(-this.camera.x + x, -this.camera.y + y, width, height);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    circle(x, y, diameter, color) {
        this.ctx.beginPath();
        this.ctx.arc(-this.camera.x + x, -this.camera.y + y, diameter / 2, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = color;
        this.ctx.closePath();
        this.ctx.stroke();
    }
    text(text, x, y) {
        this.ctx.fillText(text, x, y);
    }
    /**
     *
     * @param image The image to draw
     * @param sx The x coordinate where to start clipping
     * @param sy The y coordinate where to start clipping
     * @param sWidth The width of the clipped image
     * @param sHeight The height of the clipped image
     * @param dx The x coordinate where to place the image on the canvas
     * @param dy The y coordinate where to place the image on the canvas
     * @param dWidth The width of the image to use
     * @param dHeight The height of the image to use
     */
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
    /**
     *
     * @param x The x coordinate where to place the tile image on the canvas
     * @param y The y coordinate where to place the tile image on the canvas
     * @param width The width of the tile image to use
     * @param height The height of the tile image to use
     * @param sheet The sprite sheet to use
     * @param index The index of the image to use within the sprite sheet
     */
    drawTile(x, y, width, height, sheet, index) {
        let tile = sheet.tiles[index];
        this.ctx.drawImage(sheet.image, tile.x, tile.y, sheet.width, sheet.height, x - this.camera.x, y - this.camera.y, width, height);
        if (_debug__WEBPACK_IMPORTED_MODULE_2__.Debug.active()) {
            this.ctx.fillStyle = "#F0F";
            this.ctx.font = "18px Arial";
            this.ctx.fillText(`${index + 1}`, x - this.camera.x + width / 2, y - this.camera.y + height / 2);
        }
    }
    debug(text) {
        this.ctx.fillStyle = "#F00";
        this.ctx.fillText(text, 10, 10);
    }
}


/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Engine: () => (/* binding */ Engine)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collection */ "./src/collection.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./input */ "./src/input.ts");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registry */ "./src/registry.ts");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sounds */ "./src/sounds.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./time */ "./src/time.ts");










/**
 * Engine is the main object of the game engine.
 * Engine consist of a group of different components which manage different tasks.
 * Each component is a lego piece, and the engine is the glue which binds them together.
 * Once the document is ready, Engine will initialize each component added
 * into it, call the preloader method, execute the game creation function
 * and then start executing the game loop.
 */
class Engine extends _components__WEBPACK_IMPORTED_MODULE_2__.Component {
    constructor(args) {
        super(undefined, args);
        this.registry = new _registry__WEBPACK_IMPORTED_MODULE_6__.Registry();
        this.scenes = new _collection__WEBPACK_IMPORTED_MODULE_1__.Collection();
        this.fpsDelayCount = 0;
        this.logger = ["", ""];
        this.gameLoop = () => {
            this.move();
            this.fpsDelayCount = 0;
            this.draw();
            this.debugInfo();
            window.requestAnimationFrame(this.gameLoop);
        };
        this.engine = this;
        _debug__WEBPACK_IMPORTED_MODULE_3__.Debug.groupStart("Engine loaded components");
        this.resources = this.addComponent(_resources__WEBPACK_IMPORTED_MODULE_7__.Resources);
        this.camera = this.addComponent(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera, {
            x: 0,
            y: 0,
        });
        this.time = this.addComponent(_time__WEBPACK_IMPORTED_MODULE_9__.Time);
        this.sound = this.addComponent(_sounds__WEBPACK_IMPORTED_MODULE_8__.Sound);
        this.display = this.addComponent(_display__WEBPACK_IMPORTED_MODULE_4__.Display, {
            id: "canvas",
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
        });
        this.input = this.addComponent(_input__WEBPACK_IMPORTED_MODULE_5__.Input);
        _debug__WEBPACK_IMPORTED_MODULE_3__.Debug.groupEnd();
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
    static create(args) {
        _debug__WEBPACK_IMPORTED_MODULE_3__.Debug.validateParams("Engine.create", args, [
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
                window["gengine"] = engine;
            });
        })();
    }
    /**
     * Adds a component to the engine.
     * @param Constructor The constructor of the component to store.
     * @param args  to initialize the component.
     */
    addComponent(Constructor, args = {}) {
        const instance = new Constructor(this, args);
        this.components.set(Constructor, instance);
        instance.init();
        return instance;
    }
    move() {
        for (let component of this.registry.values()) {
            component.move();
        }
        for (let scene of this.scenes.all()) {
            if (scene.isActive) {
                scene.move();
            }
        }
    }
    draw() {
        this.display.clear();
        for (let component of this.registry.values()) {
            component.draw();
        }
        for (let scene of this.scenes.all()) {
            if (scene.isVisible) {
                scene.draw();
            }
        }
        if (_debug__WEBPACK_IMPORTED_MODULE_3__.Debug.active() && this.input.mouse.isInside) {
            this.display.circle(this.camera.x + this.input.mouse.x - 1, this.camera.y + this.input.mouse.y - 1, 6, "red");
        }
    }
    debugInfo() {
        this.display.text(this.logger[0], 20, 30);
        this.display.text(this.logger[1], 20, 50);
        if (!_debug__WEBPACK_IMPORTED_MODULE_3__.Debug.active())
            return;
        this.display.text(this.time.time.toFixed(2), 20, 20);
        this.display.text(this.time.deltaTime.toFixed(4), 20, 40);
        this.display.text(this.time.fps.toFixed(2), 20, 60);
    }
}


/***/ }),

/***/ "./src/input.ts":
/*!**********************!*\
  !*** ./src/input.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.ts");



/**
 * Input class to handle the user input
 */
class Input extends _components__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(engine) {
        super(engine, {});
        this.camera = this.components.get(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        this.keyCode_ = {};
        this.mouse = {
            x: 0,
            y: 0,
            isInside: false,
        };
    }
    init() {
        this.tileInput = document.getElementById("tile");
        let canvas = this.components.get(_display__WEBPACK_IMPORTED_MODULE_2__.Display).canvas;
        canvas.addEventListener("mousemove", (event) => this.mouseMove(event));
        canvas.addEventListener("mousedown", (event) => this.mouseDown(event));
        canvas.addEventListener("mouseenter", () => this.mouseEnter());
        canvas.addEventListener("mouseleave", () => this.mouseLeave());
        canvas.addEventListener("click", (event) => this.mouseClick(event));
        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.keyUp(event));
    }
    mouseMove(event) {
        let rect = this.engine.display.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
        if (event.buttons === 2) {
            this.camera.x -= event.movementX;
            this.camera.y -= event.movementY;
        }
        if (event.shiftKey) {
            let x = this.engine.tileMap.getTileX(this.mouse.x + this.camera.x);
            let y = this.engine.tileMap.getTileY(this.mouse.y + this.camera.y);
            this.engine.tileMap.set(x, y, parseInt(this.tileInput.value));
        }
    }
    mouseEnter() {
        this.mouse.isInside = true;
    }
    mouseLeave() {
        this.mouse.isInside = false;
    }
    mouseClick(event) {
        if (event.metaKey) {
            let x = this.engine.tileMap.getTileX(this.mouse.x + this.camera.x);
            let y = this.engine.tileMap.getTileY(this.mouse.y + this.camera.y);
            this.tileInput.value = `${this.engine.tileMap.get(x, y)}`;
        }
        else {
            let x = this.engine.tileMap.getTileX(this.mouse.x + this.camera.x);
            let y = this.engine.tileMap.getTileY(this.mouse.y + this.camera.y);
            this.engine.tileMap.set(x, y, parseInt(this.tileInput.value));
        }
    }
    mouseDown(event) { }
    onKeyDown(event) {
        this.keyCode_[event.code] = true;
    }
    keyUp(event) {
        this.keyCode_[event.code] = false;
    }
    keyDown(code) {
        return !!this.keyCode_[code];
    }
    getXAxis() {
        let result = this.keyDown("ArrowLeft") ? -1 : 0;
        result += this.keyDown("ArrowRight") ? 1 : 0;
        return result;
    }
    getYAxis() {
        let result = this.keyDown("ArrowUp") ? -1 : 0;
        result += this.keyDown("ArrowDown") ? 1 : 0;
        return result;
    }
}


/***/ }),

/***/ "./src/maths.ts":
/*!**********************!*\
  !*** ./src/maths.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Maths: () => (/* binding */ Maths)
/* harmony export */ });
class Maths {
    /**
     *
     * @param value the value to clamp
     * @param min the minimum value
     * @param max the maximum value
     * @returns the clamped value
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    /**
     * Linear interpolate between two values
     * @param min the minimum value
     * @param max the maximum value
     * @param t the time value
     * @returns the lerped value
     */
    static lerp(min, max, t) {
        return min + (max - min) * t;
    }
    /**
     * Generate a random number between two values
     * @param min the minimum value
     * @param max the maximum value
     * @returns the random number
     */
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Check if two rectangles intersect
     * @param rect1
     * @param rect2
     * @returns true if the rectangles intersect
     */
    static RectIntersect(rect1, rect2) {
        if (rect1.x <= rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y <= rect2.y + rect2.height &&
            rect1.height + rect1.y >= rect2.y) {
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/matrix.ts":
/*!***********************!*\
  !*** ./src/matrix.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Matrix: () => (/* binding */ Matrix)
/* harmony export */ });
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maths */ "./src/maths.ts");

/**
 * Represents a matrix with a fixed width and height.
 */
class Matrix {
    /**
     * Creates a new Matrix instance.
     * @param width The width of the matrix.
     * @param height The height of the matrix.
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = new Uint16Array(width * height);
    }
    /**
     * Gets the value at the specified position in the matrix.
     * @param x The x-coordinate of the position.
     * @param y The y-coordinate of the position.
     * @returns The value at the specified position.
     */
    get(x, y) {
        return this.array[y * this.width + x];
    }
    /**
     * Sets the value at the specified position in the matrix.
     * @param x The x-coordinate of the position.
     * @param y The y-coordinate of the position.
     * @param value The value to set.
     */
    set(x, y, value) {
        this.array[y * this.width + x] = value;
    }
    /**
     * Loads the matrix with the specified array of values.
     * @param array The array of values to load.
     */
    load(array) {
        this.array = new Uint16Array(array);
    }
    /**
     * Randomizes the values in the matrix.
     */
    randomize() {
        for (let i = 0; i < this.array.length; ++i) {
            this.array[i] = _maths__WEBPACK_IMPORTED_MODULE_0__.Maths.rand(0, 3);
        }
    }
}


/***/ }),

/***/ "./src/objects.ts":
/*!************************!*\
  !*** ./src/objects.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameObject: () => (/* binding */ GameObject)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");

/**
 * Base object of all the elements of the engine.
 *
 * The params is used as validation of the arguments passed in the constructor for debugging.
 * The params method should return an array with the names of all the keys which should be
 * present as args of a GameObject.
 * The config method should return an object with the default values of the GameObject.
 *
 * @example
 * class Element extends GameObject {
 *  params() {
 *   return ["x", "y"];
 *  }
 *  config() {
 *    return {
 *      x: 0,
 *      y: 0,
 *      width: 100,
 *      height: 100,
 *    };
 *  }
 * }
 * const o = new Element();
 * // this will throw an error because x and y are required
 *
 * const o = new Element({ x: 10, y: 10 });
 * // this will not throw an error and x and y will be 10 and width and height will be 100
 *
 */
class GameObject {
    constructor(args = {}) {
        _debug__WEBPACK_IMPORTED_MODULE_0__.Debug.validateParams(this.constructor.name, args, this.params());
        const defaults = this.config();
        Object.assign(this, defaults, args);
    }
    /**
     *
     * @returns {string[]} Array with the names of the keys that should be present in the constructor
     */
    params() {
        return [];
    }
    /**
     *
     * @returns {Record<string, any>} Object with the default values of the GameObject
     */
    config() {
        return {};
    }
}


/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformController: () => (/* binding */ PlatformController),
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _colliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colliders */ "./src/colliders.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input */ "./src/input.ts");
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./maths */ "./src/maths.ts");
/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sounds */ "./src/sounds.ts");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sprites */ "./src/sprites.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./time */ "./src/time.ts");









/**
 * Component for managing platformer physics.
 */
class PlatformController extends _components__WEBPACK_IMPORTED_MODULE_2__.Component {
    constructor(engine, args) {
        super(engine, args);
        /**
         * The maximum velocity on the Y axis
         */
        this.maxVelocityY = 10;
        /**
         * The gravity of the controller
         */
        this.gravity = 0.5;
        /**
         * The time component
         */
        this.time = this.components.get(_time__WEBPACK_IMPORTED_MODULE_8__.Time);
        this.time = this.components.get(_time__WEBPACK_IMPORTED_MODULE_8__.Time);
    }
    /**
     *
     * @returns List of required parameters for the platform controller
     */
    params() {
        return ["tileMap"];
    }
    getCorners(x1, y1, width, height) {
        return this.tileMap.getCorners(x1, y1, width, height);
    }
    checkForWalls(sprite, moveDistanceX) {
        moveDistanceX = Math.floor(moveDistanceX);
        const corners = this.getCorners(sprite.x + moveDistanceX, sprite.y, sprite.width, sprite.height);
        if (moveDistanceX > 0 &&
            (corners.downRight.solid.left || corners.upRight.solid.left)) {
            sprite.velocityX = 0;
            sprite.accelerationX = 0;
            moveDistanceX = 0;
            //moveDistanceX = (corners.downRight.x * corners.downLeft.width) - sprite.x - sprite.width - 1;
        }
        if (moveDistanceX < 0 &&
            (corners.downLeft.solid.right || corners.upLeft.solid.right)) {
            //moveDistanceX = sprite.x - ((corners.downLeft.x + 1) * corners.downLeft.width) - 1;
            //moveDistanceX *= -1;
            sprite.velocityX = 0;
            sprite.accelerationX = 0;
            moveDistanceX = 0;
        }
        return moveDistanceX;
    }
    applyGravity(sprite) {
        let moveDistanceY = Math.floor(sprite.velocityY);
        if (!sprite.jumping) {
            sprite.velocityY += this.gravity * this.time.deltaTime;
        }
        else {
            sprite.velocityY += this.gravity * 1.2 * this.time.deltaTime;
        }
        moveDistanceY = _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(moveDistanceY, -this.maxVelocityY, this.maxVelocityY);
        let corners = this.getCorners(sprite.x, sprite.y + moveDistanceY, sprite.width, sprite.height);
        if (moveDistanceY > 0) {
            if (corners.downRight.solid.top || corners.downLeft.solid.top) {
                moveDistanceY = 0;
                sprite.velocityY = 0;
                sprite.jumping = false;
            }
        }
        else {
            if (corners.upRight.solid.bottom || corners.upLeft.solid.bottom) {
                moveDistanceY = 0;
                sprite.velocityY = 0;
            }
        }
        return moveDistanceY;
    }
    clampX(x) {
        return _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(x, 0, this.tileMap.mapWidth - this.engine.display.width);
    }
    clampY(y) {
        return _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(y, 0, this.tileMap.mapHeight - this.engine.display.height);
    }
}
class Player extends _sprites__WEBPACK_IMPORTED_MODULE_7__.Sprite {
    constructor(engine, args) {
        super(engine, args);
        this.color = "blue";
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
        this.colliders.add(new _colliders__WEBPACK_IMPORTED_MODULE_1__.RectCollider({
            x: -10,
            y: -10,
            width: this.width + 10,
            height: this.height + 10,
            parent: this,
        }));
    }
    getCorners(x, y) {
        return this.controller.getCorners(x, y, this.width, this.height);
    }
    move() {
        if (!this.controller) {
            return;
        }
        // left right movement
        let moveDistanceX = 0;
        let inputX = this.input.getXAxis();
        // acceleration movement
        if (!this.jumping) {
            this.accelerationX = inputX * this.accelerationForceX;
        }
        else {
            this.accelerationX = (inputX * this.accelerationForceX) / 6;
        }
        this.velocityX += this.accelerationX * this.time.deltaTime;
        // friction
        let currentDir = Math.sign(this.velocityX);
        if (!this.jumping) {
            this.velocityX += -currentDir * this.frictionX * this.time.deltaTime;
        }
        else {
            this.velocityX +=
                ((-currentDir * this.frictionX) / 10) * this.time.deltaTime;
        }
        if (Math.sign(this.velocityX) !== currentDir) {
            this.velocityX = 0;
        }
        // limit speed
        let maxSpeedX = this.maxSpeedMultX;
        if (this.input.keyDown("KeyZ") && inputX) {
            maxSpeedX *= 2;
        }
        // running
        this.velocityX = _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(this.velocityX, -maxSpeedX, maxSpeedX);
        moveDistanceX += this.velocityX * this.time.deltaTime;
        moveDistanceX = this.controller.checkForWalls(this, moveDistanceX);
        this.x += moveDistanceX;
        // camera adjustment
        if (this.x > this.engine.display.width / 2) {
            this.camera.x += moveDistanceX;
        }
        if (moveDistanceX < 0 &&
            this.x > this.engine.tileMap.mapWidth - this.engine.display.width / 2) {
            this.camera.x -= moveDistanceX;
        }
        this.camera.x = this.controller.clampX(this.camera.x);
        // gravity
        let moveDistanceY = this.controller.applyGravity(this);
        this.y += moveDistanceY;
        this.camera.y += moveDistanceY;
        this.camera.y = this.controller.clampY(this.camera.y);
        // jump pressed and not jumping
        if (this.input.keyDown("ArrowUp") && !this.jumping) {
            this.jumping = true;
            this.velocityY = -this.jumpForce / 2;
            this.jumpBooster = 0;
        }
        // jump being held while jumping
        if (this.input.keyDown("ArrowUp") &&
            this.jumping &&
            this.jumpBooster < 10) {
            this.velocityY -= this.jumpForce / 12;
            this.jumpBooster += 1;
        }
        // jump released and jumping
        if (!this.input.keyDown("ArrowUp") && this.jumping) {
            this.jumpBooster = 0;
            if (this.velocityY < -this.jumpForce / 2) {
                this.velocityY = -this.jumpForce / 2;
            }
        }
    }
    draw() {
        this.display.fillRect(this.x, this.y, this.width, this.height, this.color);
    }
    init() {
        this.input = this.components.get(_input__WEBPACK_IMPORTED_MODULE_4__.Input);
        this.display = this.components.get(_display__WEBPACK_IMPORTED_MODULE_3__.Display);
        this.time = this.components.get(_time__WEBPACK_IMPORTED_MODULE_8__.Time);
        this.sound = this.components.get(_sounds__WEBPACK_IMPORTED_MODULE_6__.Sound);
        this.camera = this.components.get(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        this.camera.x = Math.floor(this.x - this.display.width / 2);
        this.camera.y = Math.floor(this.y - this.display.height / 2);
        this.controller = this.components.get(PlatformController);
    }
    collision(sprite) { }
}


/***/ }),

/***/ "./src/registry.ts":
/*!*************************!*\
  !*** ./src/registry.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Registry: () => (/* binding */ Registry)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");

/**
 * Registry stores single instances of object indexed by their constructor.
 */
class Registry {
    constructor() {
        this.items = new Map();
    }
    /**
     *
     * @param Constructor
     * @returns The instance of the object if it exists, otherwise undefined.
     */
    get(Constructor) {
        const component = this.items.get(Constructor);
        if (!component) {
            _debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error(`Component ${Constructor.name} is not registered`);
        }
        return component;
    }
    /**
     *
     * @param Constructor The constructor of the object to store.
     * @param instance The instance of the object to store.
     */
    set(Constructor, instance) {
        if (_debug__WEBPACK_IMPORTED_MODULE_0__.Debug.active()) {
            if (this.items.has(Constructor)) {
                _debug__WEBPACK_IMPORTED_MODULE_0__.Debug.error(`Component ${Constructor} is already defined`);
            }
        }
        this.items.set(Constructor, instance);
    }
    /**
     *
     * @returns An iterator of all the instances stored in the registry.
     */
    values() {
        return this.items.values();
    }
}


/***/ }),

/***/ "./src/resources.ts":
/*!**************************!*\
  !*** ./src/resources.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResourceItem: () => (/* binding */ ResourceItem),
/* harmony export */   Resources: () => (/* binding */ Resources)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/**
 * A Resource Item is a media object like image, audio. It is used by the Resources class
 * during the preload phase of the engine loading.
 */


class ResourceItem {
    constructor(params) {
        /**
         * Load the resource
         * @returns Promise to load the resource
         */
        this.load = async () => {
            return new Promise(async (resolve, reject) => {
                const response = await fetch(this.url);
                if (!response.ok) {
                    _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.error(`Error loading ${this.name}`);
                    reject();
                }
                const blob = await response.blob();
                this.buffer = blob;
                this.item = new Image();
                this.item.onload = () => {
                    resolve();
                };
                this.item.src = window.URL.createObjectURL(blob);
                _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.info(`Success loading ${this.name}`);
            });
        };
        _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.validateParams("Resources.add", params, ["url", "type", "name"]);
        this.url = params.url;
        this.type = params.type;
        this.name = params.name;
        this.buffer = {};
        this.item = {};
    }
}
/**
 * Resources component is set of the images and audio resources of the game.
 * It handles adding and getting the resources by a name and also the preload phase of the engine loading.
 */
class Resources extends _components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.items = {};
    }
    /**
     * Add a resource to the resources dictionary
     * @param params Arguments for the ResourceItem constructor
     */
    add(params) {
        if (typeof this.items[params.name] !== "undefined") {
            _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn(`Resource ${params.name} is already defined`);
        }
        this.items[params.name] = new ResourceItem(params);
    }
    /**
     * Get a resource by name
     * @param name of the resource
     * @returns the resource
     */
    get(name) {
        return this.items[name].item;
    }
    /**
     * Remove a resource by name
     * @param name of the resource
     */
    remove(name) {
        delete this.items[name];
    }
    /**
     * Preload all resources
     */
    async preload() {
        _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.groupStart("Preloading Resources");
        try {
            await Promise.all(Object.values(this.items).map((item) => item.load()));
        }
        catch (e) {
            _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.error(e?.message);
        }
        _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.groupEnd();
    }
}


/***/ }),

/***/ "./src/scenes.ts":
/*!***********************!*\
  !*** ./src/scenes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scene: () => (/* binding */ Scene)
/* harmony export */ });
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collection */ "./src/collection.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* exported Scene */


/**
 * Scene is a collection of sprites of a game.
 * Only the sprites in the same scene can collide with each other.
 * The engine can have a single scene or multiple. Depending on the active scene of
 * the engine, that scene sprites would be draw, moved and collided on the stage.
 */
class Scene extends _components__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(engine, args) {
        super(engine, args);
        /**
         * Collection of sprites of the scene.
         */
        this.sprites = new _collection__WEBPACK_IMPORTED_MODULE_0__.Collection();
    }
    /**
     *
     * @returns default scene configuration.
     */
    config() {
        return {
            isActive: true,
            isVisible: true,
        };
    }
    move() {
        if (!this.isActive) {
            return;
        }
        this.collision();
        for (let sprite of this.sprites.all()) {
            if (sprite.isActive) {
                sprite.move();
            }
        }
    }
    draw() {
        if (!this.isVisible) {
            return;
        }
        for (let sprite of this.sprites.all()) {
            if (sprite.isVisible) {
                sprite.draw();
            }
        }
    }
    /**
     *  Add a sprite to the scene.
     * @param sprite to be added.
     */
    addSprite(sprite) {
        sprite.engine = this.engine;
        sprite.parent = this;
        sprite.init();
        this.sprites.add(sprite);
    }
    /**
     * Removes a sprite from the scene.
     * @param sprite to be removed.
     */
    removeSprite(sprite) {
        this.sprites.remove(sprite);
    }
    // TODO: add quad-tree for collision detection
    collision() {
        const sprites = this.sprites.all();
        for (let i = 0; i < sprites.length; ++i) {
            for (let j = i + 1; j < sprites.length; ++j) {
                let sprite1 = sprites[i];
                let sprite2 = sprites[j];
                if (sprite1.testCollision(sprite2)) {
                    sprite1.collision(sprite2);
                    sprite2.collision(sprite1);
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/sounds.ts":
/*!***********************!*\
  !*** ./src/sounds.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sound: () => (/* binding */ Sound)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.ts");

/* exported Sound */
class Sound extends _components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(engine, args) {
        super(engine, args);
    }
    move() { }
    draw() { }
    play() { }
    stop() { }
    pause() { }
}


/***/ }),

/***/ "./src/sprite-sheets.ts":
/*!******************************!*\
  !*** ./src/sprite-sheets.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpriteSheet: () => (/* binding */ SpriteSheet)
/* harmony export */ });
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects */ "./src/objects.ts");

/**
 * A sprite sheet consists of different sprites/tiles drawn in the same image.
 * When created, the SpriteSheet will create the coordinates of each sprite/tile on
 * the image depending on the width/height of the frame/tile on the sheet.
 */
class SpriteSheet extends _objects__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(args) {
        super(args);
        this.tiles = [];
        let iCount = 1;
        let jCount = 1;
        if (this.gap) {
            while (this.image.width - this.offsetX - iCount++ * (this.width + this.gap) >=
                this.width)
                ;
            while (this.image.height -
                this.offsetY -
                jCount++ * (this.height + this.gap) >=
                this.width)
                ;
            iCount--;
            jCount--;
        }
        else {
            iCount = Math.floor((this.image.width - this.offsetX) / this.width);
            jCount = Math.floor((this.image.height - this.offsetY) / this.height);
        }
        for (let j = 0; j < jCount; ++j) {
            for (let i = 0; i < iCount; ++i) {
                let x = this.offsetX + i * this.gap + i * this.width;
                let y = this.offsetY + j * this.gap + j * this.height;
                this.tiles.push({ x, y });
            }
        }
    }
    /**
     *
     * @returns List of required parameters for the sprite sheet
     */
    params() {
        return ["width", "height", "image"];
    }
    /**
     *
     * @returns List of default optional parameters for the sprite sheet
     */
    config() {
        return {
            offsetX: 0,
            offsetY: 0,
            gap: 0,
        };
    }
}


/***/ }),

/***/ "./src/sprites.ts":
/*!************************!*\
  !*** ./src/sprites.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sprite: () => (/* binding */ Sprite)
/* harmony export */ });
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collection */ "./src/collection.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* exported Sprite */



/**
 * Base Sprite component. Every Sprite of the engine should derive from this class.
 * Each loop of the game the sprits will move, draw and test collision.
 */
class Sprite extends _components__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(engine, args) {
        super(engine, args);
        /**
         * Collection of colliders attached to the sprite
         */
        this.colliders = new _collection__WEBPACK_IMPORTED_MODULE_0__.Collection();
    }
    /**
     *
     * @returns List of required parameters for the sprite
     */
    params() {
        return ["x", "y", "width", "height"];
    }
    config() {
        return {
            isVisible: true,
            isActive: true,
        };
    }
    /**
     * Draws a box around the sprite
     * @param  {string} color Color of the rectangle, default red
     */
    debugDraw(color = "red") {
        const display = this.components.get(_display__WEBPACK_IMPORTED_MODULE_2__.Display);
        if (display) {
            display.rect(this.x, this.y, this.width, this.height, color);
        }
    }
    /**
     * Tests for collision between each collider of the sprite against a sprite
     * @param {object} sprite Sprite to test the collision with
     * @return {boolean} True if collision detected
     */
    testCollision(sprite) {
        if (!this.colliders.all().length || !sprite.colliders.all().length) {
            return false;
        }
        for (let collider1 of this.colliders.all())
            for (let collider2 of sprite.colliders.all())
                if (collider1.test(collider2))
                    return true;
        return false;
    }
    /**
     * Method called when the sprite is added to a scene after creation
     */
    init() { }
    /**
     * Method executed each game loop
     */
    move() { }
    /**
     * Method executed each loop of the game
     */
    draw() { }
    /**
     * Method executed when the sprite collided with another sprite.
     * @param {object} sprite The other sprite with whom the collision ocurred
     */
    collision(sprite) { }
    /**
     * Method executed when the sprite is removed from the engine scene
     */
    destroy() { }
}


/***/ }),

/***/ "./src/tile.ts":
/*!*********************!*\
  !*** ./src/tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tile: () => (/* binding */ Tile)
/* harmony export */ });
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects */ "./src/objects.ts");

class Tile extends _objects__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    constructor(args) {
        super(args);
    }
    /**
     *
     * @returns The default configuration of a tile.
     */
    config() {
        return {
            solid: {
                top: false,
                bottom: false,
                right: false,
                left: false,
            },
            angle: 0,
        };
    }
}


/***/ }),

/***/ "./src/tilemap.ts":
/*!************************!*\
  !*** ./src/tilemap.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TileMap: () => (/* binding */ TileMap)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maths */ "./src/maths.ts");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./matrix */ "./src/matrix.ts");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sprites */ "./src/sprites.ts");
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");







const SOLID_TILE = new _tile__WEBPACK_IMPORTED_MODULE_6__.Tile({
    solid: { top: true, bottom: true, right: true, left: true },
    angle: 0,
    sheet: 0,
});
/**
 * Class for managing tileMaps.
 */
class TileMap extends _sprites__WEBPACK_IMPORTED_MODULE_5__.Sprite {
    constructor(engine, args) {
        super(engine, args);
        this.matrix = new _matrix__WEBPACK_IMPORTED_MODULE_4__.Matrix(this.width, this.height);
        this.mapWidth = this.width * this.tileWidth;
        this.mapHeight = this.height * this.tileHeight;
        this.camera = this.components.get(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        this.display = this.components.get(_display__WEBPACK_IMPORTED_MODULE_2__.Display);
    }
    params() {
        return [
            "x",
            "y",
            "width",
            "height",
            "tileWidth",
            "tileHeight",
            "sheet",
            "tiles",
        ];
    }
    get(x, y) {
        return this.matrix.get(x, y);
    }
    set(x, y, value) {
        this.matrix.set(x, y, value);
    }
    load(array) {
        if (array.length !== this.width * this.height) {
            _debug__WEBPACK_IMPORTED_MODULE_1__.Debug.warn(`Tilemap size mismatch with width: ${this.width} and height ${this.height}`);
        }
        this.matrix.load(array);
    }
    save() {
        let result = "";
        let count = 0;
        for (let i = 0; i < this.matrix.array.length; ++i) {
            let char = this.matrix.array[i].toString();
            char = char.length > 1 ? char : "  " + char;
            char = char.length > 2 ? char : " " + char;
            result += char + ",";
            if (++count >= this.width) {
                count = 0;
                result += "\r\n";
            }
        }
        document.getElementById("map").value = result;
    }
    getTileX(x) {
        return Math.floor((x / this.tileWidth) % this.mapWidth);
    }
    getTileY(y) {
        return Math.floor((y / this.tileWidth) % this.mapWidth);
    }
    getTile(x, y) {
        if (x < 0 || y < 0 || x >= this.mapWidth || y >= this.mapWidth) {
            return SOLID_TILE;
        }
        const xTile = this.getTileX(x);
        const yTile = this.getTileY(y);
        const tileIndex = this.get(xTile, yTile);
        const tile = this.tiles[tileIndex] || SOLID_TILE;
        return tile;
    }
    getCorners(x, y, width, height) {
        return {
            upLeft: this.getTile(x, y),
            upRight: this.getTile(x + width, y),
            downLeft: this.getTile(x, y + height),
            downRight: this.getTile(x + width, y + height),
        };
    }
    getDrawRect() {
        let x1 = this.getTileX(this.camera.x);
        let y1 = this.getTileY(this.camera.y);
        let x2 = Math.ceil(this.display.width / this.tileWidth);
        let y2 = Math.ceil(this.display.height / this.tileWidth);
        x1 = _maths__WEBPACK_IMPORTED_MODULE_3__.Maths.clamp(x1, 0, this.width);
        y1 = _maths__WEBPACK_IMPORTED_MODULE_3__.Maths.clamp(y1, 0, this.height);
        x2 = _maths__WEBPACK_IMPORTED_MODULE_3__.Maths.clamp(x2 + x1 + 1, x1, this.width);
        y2 = _maths__WEBPACK_IMPORTED_MODULE_3__.Maths.clamp(y2 + y1 + 1, y1, this.height);
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
        };
    }
    draw() {
        let rect = this.getDrawRect();
        for (let i = rect.x1; i < rect.x2; ++i) {
            for (let j = rect.y1; j < rect.y2; ++j) {
                let tile = this.get(i, j);
                if (tile) {
                    this.display.drawTile(this.x + i * this.tileWidth, this.y + j * this.tileHeight, this.tileWidth, this.tileHeight, this.sheet, tile - 1);
                }
            }
        }
        return;
    }
}


/***/ }),

/***/ "./src/time.ts":
/*!*********************!*\
  !*** ./src/time.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Time: () => (/* binding */ Time)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* exported Time */

/**
 * Manages the time of the game.
 * time.startTime: seconds elapsed science the game started
 * time.frameTime: almost the same as startTime, has the elapsed seconds
 * science the game started but it updates the value by counting the frame time of each game loop.
 * time.deltaTime: inverse relative value to the fps of the game. When the game runs on 60fps the value is 1.
 * When the fps drop, the deltaTime value is increased proportional to the amount of fps dropped.
 * Example:
 * 60fps: deltaTime == 1
 * 30fps: deltaTime == 2
 * 15fps: deltaTime == 4
 */
class Time extends _components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(engine, args) {
        super(engine, args);
        this.deltaTime = 0;
        this.time = 0;
        this.frameTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        this.startTime = performance.now() / 1000;
        this.lastTime = this.startTime;
        this.lastTime = performance.now() / 1000;
    }
    params() {
        return [];
    }
    /**
     * Updates the time values.
     */
    move() {
        let current = performance.now() / 1000;
        this.deltaTimeFS = current - this.lastTime;
        this.deltaTime = this.deltaTimeFS / (1 / 60);
        this.frameTime += this.deltaTime;
        this.time = current - this.startTime;
        this.lastTime = current;
        this.fps = 1000 / (this.deltaTimeFS * 1000);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* reexport safe */ _camera__WEBPACK_IMPORTED_MODULE_0__.Camera),
/* harmony export */   Collection: () => (/* reexport safe */ _collection__WEBPACK_IMPORTED_MODULE_3__.Collection),
/* harmony export */   Collider: () => (/* reexport safe */ _colliders__WEBPACK_IMPORTED_MODULE_4__.Collider),
/* harmony export */   Component: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.Component),
/* harmony export */   Debug: () => (/* reexport safe */ _debug__WEBPACK_IMPORTED_MODULE_1__.Debug),
/* harmony export */   Display: () => (/* reexport safe */ _display__WEBPACK_IMPORTED_MODULE_6__.Display),
/* harmony export */   Engine: () => (/* reexport safe */ _engine__WEBPACK_IMPORTED_MODULE_7__.Engine),
/* harmony export */   GameObject: () => (/* reexport safe */ _objects__WEBPACK_IMPORTED_MODULE_2__.GameObject),
/* harmony export */   Input: () => (/* reexport safe */ _input__WEBPACK_IMPORTED_MODULE_8__.Input),
/* harmony export */   Matrix: () => (/* reexport safe */ _matrix__WEBPACK_IMPORTED_MODULE_9__.Matrix),
/* harmony export */   PlatformController: () => (/* reexport safe */ _player__WEBPACK_IMPORTED_MODULE_10__.PlatformController),
/* harmony export */   Player: () => (/* reexport safe */ _player__WEBPACK_IMPORTED_MODULE_10__.Player),
/* harmony export */   Registry: () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_11__.Registry),
/* harmony export */   ResourceItem: () => (/* reexport safe */ _resources__WEBPACK_IMPORTED_MODULE_12__.ResourceItem),
/* harmony export */   Resources: () => (/* reexport safe */ _resources__WEBPACK_IMPORTED_MODULE_12__.Resources),
/* harmony export */   Scene: () => (/* reexport safe */ _scenes__WEBPACK_IMPORTED_MODULE_13__.Scene),
/* harmony export */   Sound: () => (/* reexport safe */ _sounds__WEBPACK_IMPORTED_MODULE_14__.Sound),
/* harmony export */   Sprite: () => (/* reexport safe */ _sprites__WEBPACK_IMPORTED_MODULE_16__.Sprite),
/* harmony export */   SpriteSheet: () => (/* reexport safe */ _sprite_sheets__WEBPACK_IMPORTED_MODULE_15__.SpriteSheet),
/* harmony export */   Tile: () => (/* reexport safe */ _tile__WEBPACK_IMPORTED_MODULE_17__.Tile),
/* harmony export */   TileMap: () => (/* reexport safe */ _tilemap__WEBPACK_IMPORTED_MODULE_18__.TileMap),
/* harmony export */   Time: () => (/* reexport safe */ _time__WEBPACK_IMPORTED_MODULE_19__.Time)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects */ "./src/objects.ts");
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collection */ "./src/collection.ts");
/* harmony import */ var _colliders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./colliders */ "./src/colliders.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./engine */ "./src/engine.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input */ "./src/input.ts");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./matrix */ "./src/matrix.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./player */ "./src/player.ts");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./registry */ "./src/registry.ts");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _scenes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./scenes */ "./src/scenes.ts");
/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./sounds */ "./src/sounds.ts");
/* harmony import */ var _sprite_sheets__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sprite-sheets */ "./src/sprite-sheets.ts");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./sprites */ "./src/sprites.ts");
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");
/* harmony import */ var _tilemap__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tilemap */ "./src/tilemap.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./time */ "./src/time.ts");





















if (typeof window !== "undefined") {
    window.Engine = _engine__WEBPACK_IMPORTED_MODULE_7__.Engine;
    window.SpriteSheet = _sprite_sheets__WEBPACK_IMPORTED_MODULE_15__.SpriteSheet;
    window.Tile = _tile__WEBPACK_IMPORTED_MODULE_17__.Tile;
    window.TileMap = _tilemap__WEBPACK_IMPORTED_MODULE_18__.TileMap;
    window.Player = _player__WEBPACK_IMPORTED_MODULE_10__.Player;
    window.PlatformController = _player__WEBPACK_IMPORTED_MODULE_10__.PlatformController;
    window.Scene = _scenes__WEBPACK_IMPORTED_MODULE_13__.Scene;
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxHQUFHLHdDQUFJLENBQUM7SUFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyw4Q0FBTyxDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsNENBQU0sQ0FBQztJQUN2QixNQUFNLENBQUMsa0JBQWtCLEdBQUcsd0RBQWtCLENBQUM7SUFDL0MsTUFBTSxDQUFDLEtBQUssR0FBRywyQ0FBSyxDQUFDO0FBQ3ZCLENBQUM7QUF5Q0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2NhbWVyYS50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2NvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jb2xsaWRlcnMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jb2xsaXNpb25zLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY29tcG9uZW50cy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2RlYnVnLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvZGlzcGxheS50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2VuZ2luZS50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2lucHV0LnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvbWF0aHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9tYXRyaXgudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9vYmplY3RzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvcGxheWVyLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvcmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9yZXNvdXJjZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9zY2VuZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9zb3VuZHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9zcHJpdGUtc2hlZXRzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc3ByaXRlcy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3RpbGUudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy90aWxlbWFwLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvdGltZS50cyIsIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbmdpbmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dlbmdpbmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJnZW5naW5lXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImdlbmdpbmVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGZvciBtYW5hZ2luZyBjYW1lcmEgcG9zaXRpb24gb24gdGhlIHNjcmVlbi5cbiAqIFRoZSBDYW1lcmEgaXMgdGhlIHZpZXdwb3J0IG9mIHRoZSBnYW1lLCB5b3Ugc2VlIHRoZSBnYW1lIHdvcmxkIHRocm91Z2ggdGhlIGNhbWVyYS5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbWVyYUFyZ3Mge1xuICAvKipcbiAgICogeCBwb3NpdGlvbiBvZiB0aGUgY2FtZXJhXG4gICAqL1xuXG4gIHg6IG51bWJlcjtcbiAgLyoqXG4gICAqIHkgcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxuICAgKi9cbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FtZXJhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIHggcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxuICAgKi9cbiAgeDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiB5IHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogQ2FtZXJhQXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gIH1cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiBbXCJ4XCIsIFwieVwiXTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7fVxufVxuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIGFyZSBhIGdyb3VwIG9mIGl0ZW1zIHRoYXQgY2FuIGJlIG9mIGFueSB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbjxUPiB7XG4gIHB1YmxpYyBpdGVtczogVFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBpdGVtIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIGFkZC5cbiAgICovXG4gIGFkZChpdGVtOiBUKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gcmVtb3ZlLlxuICAgKi9cbiAgcmVtb3ZlKGl0ZW06IFQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIGl0ZW1zIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgKi9cbiAgYWxsKCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRlc3RDb2xsaXNpb24gfSBmcm9tIFwiLi9jb2xsaXNpb25zXCI7XG5pbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gXCIuL29iamVjdHNcIjtcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb2xsaWRlckFyZ3Mge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHBhcmVudDogU3ByaXRlO1xufVxuXG4vKipcbiAqIENvbGxpZGVyIHJlcHJlc2VudHMgYSByZWN0L2NpcmNsZSB3aGljaCBjYW4gY29sbGlkZSB3aXRoIGFub3RoZXIgY29sbGlkZXIuXG4gKiBUaGUgcG9zaXRpb24gb2YgdGhlIGNvbGxpZGVyIGlzIHJlbGF0aXZlIHRvIGl0cyBwYXJlbnQgc3ByaXRlLlxuICogQSBzcHJpdGUgY2FuIGhhdmUgXCJpbmZpbml0ZVwiIG51bWJlciBvZiBjb2xsaWRlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xsaWRlciBleHRlbmRzIEdhbWVPYmplY3Qge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgcGFyZW50OiBTcHJpdGU7XG4gIHk6IG51bWJlcjtcbiAgeDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IENvbGxpZGVyQXJncykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICB9XG5cbiAgdGVzdChjb2xsaWRlcjogQ29sbGlkZXIpOiBib29sZWFuIHtcbiAgICB0aHJvdyBcIk5vdCBpbXBsZW1lbnRlZFwiO1xuICB9XG5cbiAgZ2V0IGd4KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudC54ICsgdGhpcy54O1xuICB9XG5cbiAgZ2V0IGd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudC55ICsgdGhpcy55O1xuICB9XG5cbiAgZGVidWdEcmF3KGNvbG9yOiBzdHJpbmcgPSBcInJlZFwiKSB7XG4gICAgdGhyb3cgXCJOb3QgaW1wbGVtZW50ZWRcIjtcbiAgfVxufVxuLyoqXG4gKiBDaXJjbGVDb2xsaWRlciBpcyBhIENvbGxpZGVyIHdpdGggYSBjaXJjdWxhciBzaGFwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENpcmNsZUNvbGxpZGVyIGV4dGVuZHMgQ29sbGlkZXIge1xuICByYWRpdXM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhcmdzOiBDb2xsaWRlckFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgICB0aGlzLnJhZGl1cyA9IHRoaXMud2lkdGggLyAyO1xuICB9XG5cbiAgdGVzdChjb2xsaWRlcjogQ29sbGlkZXIpOiBib29sZWFuIHtcbiAgICBpZiAoY29sbGlkZXIgaW5zdGFuY2VvZiBDaXJjbGVDb2xsaWRlcikge1xuICAgICAgcmV0dXJuIFRlc3RDb2xsaXNpb24uQ2lyY2xlVnNDaXJjbGUodGhpcywgY29sbGlkZXIpO1xuICAgIH1cbiAgICBpZiAoY29sbGlkZXIgaW5zdGFuY2VvZiBSZWN0Q29sbGlkZXIpIHtcbiAgICAgIHJldHVybiBUZXN0Q29sbGlzaW9uLkNpcmNsZVZzUmVjdCh0aGlzLCBjb2xsaWRlcik7XG4gICAgfVxuICAgIHRocm93IFwiVW5rbm93biBjb2xsaWRlclwiO1xuICB9XG5cbiAgZGVidWdEcmF3KGNvbG9yOiBzdHJpbmcgPSBcInJlZFwiKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMucGFyZW50LmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpO1xuICAgIGlmICghZGlzcGxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwbGF5LmNpcmNsZSh0aGlzLmd4LCB0aGlzLmd5LCB0aGlzLnJhZGl1cywgY29sb3IpO1xuICB9XG59XG5cbi8qKlxuICogUmVjdENvbGxpZGVyIGlzIGEgY29sbGlkZXIgb2YgcmVjdGFuZ3VsYXIgc2hhcGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWN0Q29sbGlkZXIgZXh0ZW5kcyBDb2xsaWRlciB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgcGFyZW50OiBTcHJpdGU7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb2xsaWRlckFyZ3MpIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuICB9XG5cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiBbXCJ4XCIsIFwieVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCJdO1xuICB9XG5cbiAgdGVzdChjb2xsaWRlcjogQ29sbGlkZXIpOiBib29sZWFuIHtcbiAgICBpZiAoY29sbGlkZXIgaW5zdGFuY2VvZiBDaXJjbGVDb2xsaWRlcikge1xuICAgICAgcmV0dXJuIFRlc3RDb2xsaXNpb24uQ2lyY2xlVnNSZWN0KGNvbGxpZGVyLCB0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgUmVjdENvbGxpZGVyKSB7XG4gICAgICByZXR1cm4gVGVzdENvbGxpc2lvbi5SZWN0VnNSZWN0KHRoaXMsIGNvbGxpZGVyKTtcbiAgICB9XG5cbiAgICBEZWJ1Zy5lcnJvcihcIlVua25vd24gY29sbGlkZXIgXCIgKyB0eXBlb2YgY29sbGlkZXIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlYnVnRHJhdyhjb2xvcjogc3RyaW5nID0gXCJyZWRcIikge1xuICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnBhcmVudC5jb21wb25lbnRzLmdldChEaXNwbGF5KTtcbiAgICBpZiAoIWRpc3BsYXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGxheS5yZWN0KHRoaXMuZ3gsIHRoaXMuZ3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBjb2xvcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IENpcmNsZUNvbGxpZGVyLCBSZWN0Q29sbGlkZXIgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIjtcblxuLyoqXG4gKiBBIGNsYXNzIHdpdGggc3RhdGljIG1ldGhvZHMgd2hpY2ggdGVzdCBmb3IgY29sbGlzaW9uIGJldHdlZW4gZGlmZmVyZW50XG4gKiB0eXBlcyBvZiBjb2xsaWRlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0Q29sbGlzaW9uIHtcbiAgc3RhdGljIENpcmNsZVZzUmVjdChjaXJjbGU6IENpcmNsZUNvbGxpZGVyLCByZWN0OiBSZWN0Q29sbGlkZXIpOiBib29sZWFuIHtcbiAgICBsZXQgaGFsZlJlY3RXaWR0aCA9IHJlY3Qud2lkdGggLyAyO1xuICAgIGxldCBoYWxmUmVjdEhlaWdodCA9IHJlY3QuaGVpZ2h0IC8gMjtcbiAgICBsZXQgaGFsZkRpc3RYID0gTWF0aC5hYnMoY2lyY2xlLmd4IC0gcmVjdC5neCAtIGhhbGZSZWN0V2lkdGgpO1xuICAgIGxldCBoYWxmRGlzdFkgPSBNYXRoLmFicyhjaXJjbGUuZ3kgLSByZWN0Lmd5IC0gaGFsZlJlY3RIZWlnaHQpO1xuICAgIGlmIChoYWxmRGlzdFggPiBoYWxmUmVjdFdpZHRoICsgY2lyY2xlLnJhZGl1cykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChoYWxmRGlzdFkgPiBoYWxmUmVjdEhlaWdodCArIGNpcmNsZS5yYWRpdXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaGFsZkRpc3RYIDw9IGhhbGZSZWN0V2lkdGgpIHJldHVybiB0cnVlO1xuICAgIGlmIChoYWxmRGlzdFkgPD0gaGFsZlJlY3RIZWlnaHQpIHJldHVybiB0cnVlO1xuICAgIC8vY29ybmVyIGNvbGxpc2lvblxuICAgIGxldCBkeCA9IGhhbGZEaXN0WCAtIGhhbGZSZWN0V2lkdGg7XG4gICAgbGV0IGR5ID0gaGFsZkRpc3RZIC0gaGFsZlJlY3RIZWlnaHQ7XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5IDw9IE1hdGgucG93KGNpcmNsZS5yYWRpdXMsIDIpO1xuICB9XG5cbiAgc3RhdGljIFJlY3RWc0NpcmNsZShyZWN0OiBSZWN0Q29sbGlkZXIsIGNpcmNsZTogQ2lyY2xlQ29sbGlkZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5DaXJjbGVWc1JlY3QoY2lyY2xlLCByZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyBSZWN0VnNSZWN0KHJlY3QxOiBSZWN0Q29sbGlkZXIsIHJlY3QyOiBSZWN0Q29sbGlkZXIpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICByZWN0MS5neCA8PSByZWN0Mi5neCArIHJlY3QyLndpZHRoICYmXG4gICAgICByZWN0MS5neCArIHJlY3QxLndpZHRoID4gcmVjdDIuZ3ggJiZcbiAgICAgIHJlY3QxLmd5IDw9IHJlY3QyLmd5ICsgcmVjdDIuaGVpZ2h0ICYmXG4gICAgICByZWN0MS5oZWlnaHQgKyByZWN0MS5neSA+PSByZWN0Mi5neVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBDaXJjbGVWc0NpcmNsZShcbiAgICBjaXJjbGUxOiBDaXJjbGVDb2xsaWRlcixcbiAgICBjaXJjbGUyOiBDaXJjbGVDb2xsaWRlclxuICApOiBib29sZWFuIHtcbiAgICBsZXQgZHggPSBjaXJjbGUxLmd4IC0gY2lyY2xlMi5neDtcbiAgICBsZXQgZHkgPSBjaXJjbGUxLmd5IC0gY2lyY2xlMi5neTtcbiAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIGlmIChkaXN0YW5jZSA8IGNpcmNsZTEud2lkdGggLyAyICsgY2lyY2xlMi53aWR0aCAvIDIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgT2JqZWN0Q29uc3RydWN0b3IsIEdhbWVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gXCIuL3JlZ2lzdHJ5XCI7XG5cbi8qKlxuICogVGhpcyBpcyBhIGJhc2UgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudCBvZiB0aGUgZW5naW5lLlxuICogVGhlIGVuZ2luZSBjb25zaXN0IG9mIG11bHRpcGxlIGNvbXBvbmVudHMgd2hpY2ggcGVyZm9ybSB2YXJpb3VzIHRhc2tzLlxuICogU29tZSBDb21wb25lbnRzIGZvcm0gcGFydCBvZiB0aGUgY29yZSBvZiB0aGUgRW5naW5lLCBvdGhlcnMgY291bGQgYmUgYWRkZWQgYXMgbmVlZCBhdCBydW50aW1lLlxuICogV2hlbiB0aGUgRW5naW5lIGlzIHJlYWR5LCBpdCB3aWxsIGNyZWF0ZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBhbmQgcGFzcyBpdHNlbGYgYXMgdGhlIGVuZ2luZSBwYXJhbWV0ZXIuXG4gKiBFYWNoIENvbXBvbmVudCBpbnN0YW5jZSBoYXMgYWNjZXNzIHRvIHRoZSBlbmdpbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbmdpbmUgVGhlIGluc3RhbmNlIG9mIHRoZSBlbmdpbmUsIHRoaXMgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIGVuZ2luZVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyBPYmplY3QgbGl0ZXJhbCB3aXRoIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSBjb21wb25lbnQgY29uc3RydWN0ZWRcbiAqL1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gIGVuZ2luZTogRW5naW5lO1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgICB0aGlzLmVuZ2luZSA9IGVuZ2luZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBhZGRlZCB0byB0aGUgZW5naW5lIGFuZCBpcyByZWFkeVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICBEZWJ1Zy5zdWNjZXNzKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gaW5pdGlhbGl6ZWRgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGVhY2ggY3ljbGUgb2YgdGhlIGVuZ2luZSBnYW1lIGxvb3BcbiAgICovXG4gIG1vdmUoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGVhY2ggY3ljbGUgb2YgdGhlIGVuZ2luZSBnYW1lIGxvb3BcbiAgICovXG4gIGRyYXcoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBFbmdpbmVzIGNvbXBvbmVudCByZWdpc3RyeVxuICAgKi9cbiAgZ2V0IGNvbXBvbmVudHMoKTogUmVnaXN0cnkge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZS5yZWdpc3RyeTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDbGFzcyB3aXRoIHN0YXRpYyBtZXRob2RzIHRvIGZhY2lsaXRhdGUgdGhlIG1lc3NhZ2VzIG9uIHRoZSBqYXZhc2NyaXB0IGNvbnNvbGUuXG4gKiBBbGwgdGhlIG1ldGhvZHMgb2YgRGVidWcgY2xhc3Mgd2lsbCBvbmx5IHJ1biBpZiB0aGUgZGVidWcgbW9kZSBpcyBvbi5cbiAqIFRvIGFjdGl2YXRlIHRoZSBkZWJ1ZyBtb2RlLCBkZWNsYXJlIGEgZ2xvYmFsIHZhcmlhYmxlIGJlZm9yZSBpbml0aWFsaXppbmcgdGhlIGVuZ2luZVxuICogd2l0aCB0aGUgbmFtZTogR0VOR0lORV9ERUJVR19NT0RFID0gdHJ1ZS5cbiAqIElmIHRoZSBkZWJ1ZyBtb2RlIGlzIG9mZiwgbm8gbWVzc2FnZXMgd291bGQgYmUgc2VudCB0byB0aGUgY29uc29sZS5cbiAqL1xuXG5kZWNsYXJlIGNvbnN0IEdFTkdJTkVfREVCVUdfTU9ERTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNsYXNzIERlYnVnIHtcbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIElmIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKi9cbiAgc3RhdGljIGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIEdFTkdJTkVfREVCVUdfTU9ERSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSBtZXNzYWdlIHRvIHRoZSBjb25zb2xlXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgbG9nKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgaW5mbyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIHdoZW4gdGhlIGRlYnVnIG1vZGUgaXMgYWN0aXZlXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgaW5mbyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5pbmZvKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIHN1Y2Nlc3MgbWVzc2FnZSB0byB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgd2hlbiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICovXG4gIHN0YXRpYyB3YXJuKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgYW4gZXJyb3IgbWVzc2FnZSB3aGVuIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgZ3JvdXAgb2YgbWVzc2FnZXMgaW4gdGhlIGNvbnNvbGVcbiAgICogQHBhcmFtIG5hbWUgb2YgdGhlIGdyb3VwXG4gICAqL1xuICBzdGF0aWMgZ3JvdXBTdGFydChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5ncm91cENvbGxhcHNlZChuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmQgYSBncm91cCBvZiBtZXNzYWdlcyBpbiB0aGUgY29uc29sZVxuICAgKi9cbiAgc3RhdGljIGdyb3VwRW5kKCkge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoYXQgdGhlIG9iamVjdCBsaXRlcmFsIG9mIHRoZSBjb25zdHJ1Y3RvciBoYXMgdGhlIGVsZW1lbnRzIG9mIHRoZSByZXF1aXJlZCBhcnJheVxuICAgKiBAcGFyYW0gbWV0aG9kIE9iamVjdCBtZXRob2QgbmFtZVxuICAgKiBAcGFyYW0gYXJncyB0aGUgYXJndW1lbnRzIG9iamVjdCBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHJlcXVpcmVkIGxpc3Qgb2YgcmVxdWlyZWQgbWVtYmVycyBpbiB0aGUgY29uc3RydWN0b3IgYXJndW1lbnRzXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgdmFsaWRhdGVQYXJhbXMoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgYXJnczogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICByZXF1aXJlZDogc3RyaW5nW11cbiAgKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGlmICghcmVxdWlyZWQgfHwgIXJlcXVpcmVkLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChyZXF1aXJlZC5sZW5ndGggJiYgIWFyZ3MpIHtcbiAgICAgIERlYnVnLndhcm4oXG4gICAgICAgIGAke21ldGhvZH0gcmVxdWlyZXMgdGhpcyBtZW1iZXJzIGluIHRoZSBjb25zdHJ1Y3RvcjogeyR7cmVxdWlyZWQuam9pbihcbiAgICAgICAgICBcIixcIlxuICAgICAgICApfX1gXG4gICAgICApO1xuICAgIH1cbiAgICBmb3IgKGxldCBrZXkgb2YgcmVxdWlyZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1trZXldID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIERlYnVnLmVycm9yKGAke21ldGhvZH0gcmVxdWlyZXMgb2YgXCIke2tleX1cIiBpbiB0aGUgY29uc3RydWN0b3JgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gXCIuL3Nwcml0ZS1zaGVldHNcIjtcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBvZiB0aGUgRGlzcGxheSBjb21wb25lbnQgb2YgdGhlIEVuZ2luZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpc3BsYXlBYnN0cmFjdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIGNsZWFyKCkge31cblxuICBmaWxsUmVjdChcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgY29sb3I6IHN0cmluZ1xuICApIHt9XG5cbiAgcmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHt9XG5cbiAgY2lyY2xlKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaWFtZXRlcjogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7fVxuXG4gIG1vdmUoKTogdm9pZCB7fVxufVxuXG4vKipcbiAqIENsYXNzIG9mIHRoZSBEaXNwbGF5IGNvbXBvbmVudCBvZiB0aGUgRW5naW5lLlxuICogVGhlIERpc3BsYXkgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgdGhlIGdhbWUgb2JqZWN0cyBvbiB0aGUgc2NyZWVuLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheUFyZ3Mge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjYW52YXMgZWxlbWVudFxuICAgKi9cbiAgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5XG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5XG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdGhlIGltYWdlIHNtb290aGluZyBpcyBlbmFibGVkXG4gICAqL1xuICBpc0ltYWdlU21vb3RoaW5nRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIERpc3BsYXkgZXh0ZW5kcyBEaXNwbGF5QWJzdHJhY3Qge1xuICAvKipcbiAgICogVGhlIGNhbnZhcyBlbGVtZW50XG4gICAqL1xuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgY2FudmFzIHJlbmRlcmluZyBjb250ZXh0XG4gICAqL1xuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAvKipcbiAgICogVGhlIGNhbWVyYSBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgY2FtZXJhOiBDYW1lcmE7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpbWFnZSBzbW9vdGhpbmcgaXMgZW5hYmxlZFxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IERpc3BsYXlBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIGAke3RoaXMud2lkdGh9YCk7XG4gICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIGAke3RoaXMuaGVpZ2h0fWApO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmN1cnNvciA9IFwibm9uZVwiO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEycHggSGVsdmV0aWNhXCI7XG4gICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5pc0ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuY29tcG9uZW50cy5nZXQoQ2FtZXJhKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBkaXNwbGF5XG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXCJpZFwiLCBcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiBkZWZhdWx0IG9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBkaXNwbGF5XG4gICAqL1xuICBjb25maWcoKTogUGFydGlhbDxEaXNwbGF5QXJncz4ge1xuICAgIHJldHVybiB7XG4gICAgICBpc0ltYWdlU21vb3RoaW5nRW5hYmxlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzBGRlwiO1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGZpbGxSZWN0KFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LnJlY3QoLXRoaXMuY2FtZXJhLnggKyB4LCAtdGhpcy5jYW1lcmEueSArIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgfVxuXG4gIHJlY3QoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGNvbG9yOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LnJlY3QoLXRoaXMuY2FtZXJhLnggKyB4LCAtdGhpcy5jYW1lcmEueSArIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgY2lyY2xlKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaWFtZXRlcjogbnVtYmVyLCBjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKFxuICAgICAgLXRoaXMuY2FtZXJhLnggKyB4LFxuICAgICAgLXRoaXMuY2FtZXJhLnkgKyB5LFxuICAgICAgZGlhbWV0ZXIgLyAyLFxuICAgICAgMCxcbiAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxuICB0ZXh0KHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2UgVGhlIGltYWdlIHRvIGRyYXdcbiAgICogQHBhcmFtIHN4IFRoZSB4IGNvb3JkaW5hdGUgd2hlcmUgdG8gc3RhcnQgY2xpcHBpbmdcbiAgICogQHBhcmFtIHN5IFRoZSB5IGNvb3JkaW5hdGUgd2hlcmUgdG8gc3RhcnQgY2xpcHBpbmdcbiAgICogQHBhcmFtIHNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNsaXBwZWQgaW1hZ2VcbiAgICogQHBhcmFtIHNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2xpcHBlZCBpbWFnZVxuICAgKiBAcGFyYW0gZHggVGhlIHggY29vcmRpbmF0ZSB3aGVyZSB0byBwbGFjZSB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0gZHkgVGhlIHkgY29vcmRpbmF0ZSB3aGVyZSB0byBwbGFjZSB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0gZFdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgaW1hZ2UgdG8gdXNlXG4gICAqIEBwYXJhbSBkSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGltYWdlIHRvIHVzZVxuICAgKi9cbiAgZHJhd0ltYWdlKFxuICAgIGltYWdlOiBDYW52YXNJbWFnZVNvdXJjZSxcbiAgICBzeDogbnVtYmVyLFxuICAgIHN5OiBudW1iZXIsXG4gICAgc1dpZHRoOiBudW1iZXIsXG4gICAgc0hlaWdodDogbnVtYmVyLFxuICAgIGR4OiBudW1iZXIsXG4gICAgZHk6IG51bWJlcixcbiAgICBkV2lkdGg6IG51bWJlcixcbiAgICBkSGVpZ2h0OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB4IFRoZSB4IGNvb3JkaW5hdGUgd2hlcmUgdG8gcGxhY2UgdGhlIHRpbGUgaW1hZ2Ugb24gdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0geSBUaGUgeSBjb29yZGluYXRlIHdoZXJlIHRvIHBsYWNlIHRoZSB0aWxlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgdGlsZSBpbWFnZSB0byB1c2VcbiAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxlIGltYWdlIHRvIHVzZVxuICAgKiBAcGFyYW0gc2hlZXQgVGhlIHNwcml0ZSBzaGVldCB0byB1c2VcbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgaW1hZ2UgdG8gdXNlIHdpdGhpbiB0aGUgc3ByaXRlIHNoZWV0XG4gICAqL1xuICBkcmF3VGlsZShcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc2hlZXQ6IFNwcml0ZVNoZWV0LFxuICAgIGluZGV4OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgbGV0IHRpbGUgPSBzaGVldC50aWxlc1tpbmRleF07XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgc2hlZXQuaW1hZ2UsXG4gICAgICB0aWxlLngsXG4gICAgICB0aWxlLnksXG4gICAgICBzaGVldC53aWR0aCxcbiAgICAgIHNoZWV0LmhlaWdodCxcbiAgICAgIHggLSB0aGlzLmNhbWVyYS54LFxuICAgICAgeSAtIHRoaXMuY2FtZXJhLnksXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgICk7XG4gICAgaWYgKERlYnVnLmFjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNGMEZcIjtcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjE4cHggQXJpYWxcIjtcbiAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICBgJHtpbmRleCArIDF9YCxcbiAgICAgICAgeCAtIHRoaXMuY2FtZXJhLnggKyB3aWR0aCAvIDIsXG4gICAgICAgIHkgLSB0aGlzLmNhbWVyYS55ICsgaGVpZ2h0IC8gMlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBkZWJ1Zyh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNGMDBcIjtcbiAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCAxMCwgMTApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tIFwiLi9jb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHsgT2JqZWN0Q29uc3RydWN0b3IgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gXCIuL3JlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBSZXNvdXJjZUl0ZW1BcmdzLCBSZXNvdXJjZXMgfSBmcm9tIFwiLi9yZXNvdXJjZXNcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vc2NlbmVzXCI7XG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCIuL3NvdW5kc1wiO1xuaW1wb3J0IHsgVGlsZU1hcCB9IGZyb20gXCIuL3RpbGVtYXBcIjtcbmltcG9ydCB7IFRpbWUgfSBmcm9tIFwiLi90aW1lXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5naW5lQXJncyB7XG4gIGNhbnZhczogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbmdpbmVDcmVhdGVBcmdzIHtcbiAgY2FudmFzOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICByZXNvdXJjZXM6IFJlc291cmNlSXRlbUFyZ3NbXTtcbiAgZ2FtZTogKGVuZ2luZTogRW5naW5lKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEVuZ2luZSBpcyB0aGUgbWFpbiBvYmplY3Qgb2YgdGhlIGdhbWUgZW5naW5lLlxuICogRW5naW5lIGNvbnNpc3Qgb2YgYSBncm91cCBvZiBkaWZmZXJlbnQgY29tcG9uZW50cyB3aGljaCBtYW5hZ2UgZGlmZmVyZW50IHRhc2tzLlxuICogRWFjaCBjb21wb25lbnQgaXMgYSBsZWdvIHBpZWNlLCBhbmQgdGhlIGVuZ2luZSBpcyB0aGUgZ2x1ZSB3aGljaCBiaW5kcyB0aGVtIHRvZ2V0aGVyLlxuICogT25jZSB0aGUgZG9jdW1lbnQgaXMgcmVhZHksIEVuZ2luZSB3aWxsIGluaXRpYWxpemUgZWFjaCBjb21wb25lbnQgYWRkZWRcbiAqIGludG8gaXQsIGNhbGwgdGhlIHByZWxvYWRlciBtZXRob2QsIGV4ZWN1dGUgdGhlIGdhbWUgY3JlYXRpb24gZnVuY3Rpb25cbiAqIGFuZCB0aGVuIHN0YXJ0IGV4ZWN1dGluZyB0aGUgZ2FtZSBsb29wLlxuICovXG5leHBvcnQgY2xhc3MgRW5naW5lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgZW5naW5lOiBFbmdpbmU7XG4gIC8vIFRPRE8gcmVtb3ZlIHRpbGUgbWFwIGZyb20gZW5naW5lXG4gIHRpbGVNYXA6IFRpbGVNYXA7XG4gIHJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG4gIHNjZW5lcyA9IG5ldyBDb2xsZWN0aW9uPFNjZW5lPigpO1xuICB0aW1lOiBUaW1lO1xuICBkaXNwbGF5OiBEaXNwbGF5O1xuICByZXNvdXJjZXM6IFJlc291cmNlcztcbiAgY2FtZXJhOiBDYW1lcmE7XG4gIHNvdW5kOiBTb3VuZDtcbiAgaW5wdXQ6IElucHV0O1xuICBmcHNEZWxheUNvdW50ID0gMDtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGxvZ2dlcjogc3RyaW5nW10gPSBbXCJcIiwgXCJcIl07XG5cbiAgY29uc3RydWN0b3IoYXJnczogRW5naW5lQXJncykge1xuICAgIHN1cGVyKHVuZGVmaW5lZCwgYXJncyk7XG4gICAgdGhpcy5lbmdpbmUgPSB0aGlzO1xuICAgIERlYnVnLmdyb3VwU3RhcnQoXCJFbmdpbmUgbG9hZGVkIGNvbXBvbmVudHNcIik7XG4gICAgdGhpcy5yZXNvdXJjZXMgPSB0aGlzLmFkZENvbXBvbmVudChSZXNvdXJjZXMpO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5hZGRDb21wb25lbnQoQ2FtZXJhLCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9KTtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLmFkZENvbXBvbmVudChUaW1lKTtcbiAgICB0aGlzLnNvdW5kID0gdGhpcy5hZGRDb21wb25lbnQoU291bmQpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuYWRkQ29tcG9uZW50KERpc3BsYXksIHtcbiAgICAgIGlkOiBcImNhbnZhc1wiLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgfSk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuYWRkQ29tcG9uZW50KElucHV0KTtcbiAgICBEZWJ1Zy5ncm91cEVuZCgpO1xuICB9XG5cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiBbXCJjYW52YXNcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgd2luZG93cy5vbmxvYWQgbWV0aG9kLlxuICAgKiBPbmNlIHRoZSB3aW5kb3cgaXMgcmVhZHksIGVuZ2luZSB3aWxsIGluaXRpYWxpemUgaXRzIGNvbXBvbmVudHMsIGV4ZWN1dGVcbiAgICogdGhlIHByZWxvYWRlciBhbmQgd2hlbiBwcmVsb2FkZXIgbG9hZGVkIGFsbCB0aGUgcmVzb3VyY2VzLCBjcmVhdGUgdGhlIGdhbWVcbiAgICogYW5kIGV4ZWN1dGUgdGhlIGdhbWVsb29wLlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZShhcmdzOiBFbmdpbmVDcmVhdGVBcmdzKSB7XG4gICAgRGVidWcudmFsaWRhdGVQYXJhbXMoXCJFbmdpbmUuY3JlYXRlXCIsIGFyZ3MsIFtcbiAgICAgIFwiY2FudmFzXCIsXG4gICAgICBcIndpZHRoXCIsXG4gICAgICBcImhlaWdodFwiLFxuICAgICAgXCJyZXNvdXJjZXNcIixcbiAgICAgIFwiZ2FtZVwiLFxuICAgIF0pO1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKHtcbiAgICAgICAgICBjYW52YXM6IGFyZ3MuY2FudmFzLFxuICAgICAgICAgIHdpZHRoOiBhcmdzLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogYXJncy5oZWlnaHQsXG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIGFyZ3MucmVzb3VyY2VzKSB7XG4gICAgICAgICAgZW5naW5lLnJlc291cmNlcy5hZGQocmVzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGVuZ2luZS5yZXNvdXJjZXMucHJlbG9hZCgpO1xuICAgICAgICBlbmdpbmUuaW5pdCgpO1xuICAgICAgICBhcmdzLmdhbWUoZW5naW5lKTtcbiAgICAgICAgZW5naW5lLmdhbWVMb29wKCk7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KVtcImdlbmdpbmVcIl0gPSBlbmdpbmU7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb21wb25lbnQgdG8gdGhlIGVuZ2luZS5cbiAgICogQHBhcmFtIENvbnN0cnVjdG9yIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgY29tcG9uZW50IHRvIHN0b3JlLlxuICAgKiBAcGFyYW0gYXJncyAgdG8gaW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgYWRkQ29tcG9uZW50KENvbnN0cnVjdG9yOiBPYmplY3RDb25zdHJ1Y3Rvcjxhbnk+LCBhcmdzOiBhbnkgPSB7fSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGFyZ3MpO1xuICAgIHRoaXMuY29tcG9uZW50cy5zZXQoQ29uc3RydWN0b3IsIGluc3RhbmNlKTtcbiAgICBpbnN0YW5jZS5pbml0KCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgdGhpcy5yZWdpc3RyeS52YWx1ZXM8Q29tcG9uZW50PigpKSB7XG4gICAgICBjb21wb25lbnQubW92ZSgpO1xuICAgIH1cbiAgICBmb3IgKGxldCBzY2VuZSBvZiB0aGlzLnNjZW5lcy5hbGwoKSkge1xuICAgICAgaWYgKHNjZW5lLmlzQWN0aXZlKSB7XG4gICAgICAgIHNjZW5lLm1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheS5jbGVhcigpO1xuICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiB0aGlzLnJlZ2lzdHJ5LnZhbHVlczxDb21wb25lbnQ+KCkpIHtcbiAgICAgIGNvbXBvbmVudC5kcmF3KCk7XG4gICAgfVxuICAgIGZvciAobGV0IHNjZW5lIG9mIHRoaXMuc2NlbmVzLmFsbCgpKSB7XG4gICAgICBpZiAoc2NlbmUuaXNWaXNpYmxlKSB7XG4gICAgICAgIHNjZW5lLmRyYXcoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKERlYnVnLmFjdGl2ZSgpICYmIHRoaXMuaW5wdXQubW91c2UuaXNJbnNpZGUpIHtcbiAgICAgIHRoaXMuZGlzcGxheS5jaXJjbGUoXG4gICAgICAgIHRoaXMuY2FtZXJhLnggKyB0aGlzLmlucHV0Lm1vdXNlLnggLSAxLFxuICAgICAgICB0aGlzLmNhbWVyYS55ICsgdGhpcy5pbnB1dC5tb3VzZS55IC0gMSxcbiAgICAgICAgNixcbiAgICAgICAgXCJyZWRcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnYW1lTG9vcCA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmUoKTtcbiAgICB0aGlzLmZwc0RlbGF5Q291bnQgPSAwO1xuICAgIHRoaXMuZHJhdygpO1xuICAgIHRoaXMuZGVidWdJbmZvKCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVMb29wKTtcbiAgfTtcblxuICBkZWJ1Z0luZm8oKSB7XG4gICAgdGhpcy5kaXNwbGF5LnRleHQodGhpcy5sb2dnZXJbMF0sIDIwLCAzMCk7XG4gICAgdGhpcy5kaXNwbGF5LnRleHQodGhpcy5sb2dnZXJbMV0sIDIwLCA1MCk7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIHRoaXMuZGlzcGxheS50ZXh0KHRoaXMudGltZS50aW1lLnRvRml4ZWQoMiksIDIwLCAyMCk7XG4gICAgdGhpcy5kaXNwbGF5LnRleHQodGhpcy50aW1lLmRlbHRhVGltZS50b0ZpeGVkKDQpLCAyMCwgNDApO1xuICAgIHRoaXMuZGlzcGxheS50ZXh0KHRoaXMudGltZS5mcHMudG9GaXhlZCgyKSwgMjAsIDYwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4vY2FtZXJhXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5cbi8qKlxuICogSW5wdXQgY2xhc3MgdG8gaGFuZGxlIHRoZSB1c2VyIGlucHV0XG4gKi9cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDYW1lcmEgY29tcG9uZW50XG4gICAqL1xuICBjYW1lcmE6IENhbWVyYTtcblxuICAvKipcbiAgICogS2V5IGNvZGVzXG4gICAqL1xuICBrZXlDb2RlXzogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH07XG5cbiAgLyoqXG4gICAqIE1vdXNlIGNvb3JkaW5hdGVzXG4gICAqL1xuICBtb3VzZTogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgaXNJbnNpZGU6IGJvb2xlYW4gfTtcblxuICAvKipcbiAgICogVGlsZSBpbnB1dCBlbGVtZW50XG4gICAqL1xuICB0aWxlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUpIHtcbiAgICBzdXBlcihlbmdpbmUsIHt9KTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuY29tcG9uZW50cy5nZXQoQ2FtZXJhKTtcbiAgICB0aGlzLmtleUNvZGVfID0ge307XG4gICAgdGhpcy5tb3VzZSA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgaXNJbnNpZGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aWxlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgbGV0IGNhbnZhcyA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSkuY2FudmFzO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChldmVudDogYW55KSA9PiB0aGlzLm1vdXNlTW92ZShldmVudCkpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldmVudDogYW55KSA9PiB0aGlzLm1vdXNlRG93bihldmVudCkpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB0aGlzLm1vdXNlRW50ZXIoKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHRoaXMubW91c2VMZWF2ZSgpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB0aGlzLm1vdXNlQ2xpY2soZXZlbnQpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50OiBhbnkpID0+IHRoaXMub25LZXlEb3duKGV2ZW50KSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5rZXlVcChldmVudCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZU1vdmUoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGxldCByZWN0ID0gdGhpcy5lbmdpbmUuZGlzcGxheS5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5tb3VzZS54ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICB0aGlzLm1vdXNlLnkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgaWYgKGV2ZW50LmJ1dHRvbnMgPT09IDIpIHtcbiAgICAgIHRoaXMuY2FtZXJhLnggLT0gZXZlbnQubW92ZW1lbnRYO1xuICAgICAgdGhpcy5jYW1lcmEueSAtPSBldmVudC5tb3ZlbWVudFk7XG4gICAgfVxuICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgbGV0IHggPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVYKHRoaXMubW91c2UueCArIHRoaXMuY2FtZXJhLngpO1xuICAgICAgbGV0IHkgPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVZKHRoaXMubW91c2UueSArIHRoaXMuY2FtZXJhLnkpO1xuICAgICAgdGhpcy5lbmdpbmUudGlsZU1hcC5zZXQoeCwgeSwgcGFyc2VJbnQodGhpcy50aWxlSW5wdXQudmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy5tb3VzZS5pc0luc2lkZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIG1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5tb3VzZS5pc0luc2lkZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZUNsaWNrKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQubWV0YUtleSkge1xuICAgICAgbGV0IHggPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVYKHRoaXMubW91c2UueCArIHRoaXMuY2FtZXJhLngpO1xuICAgICAgbGV0IHkgPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVZKHRoaXMubW91c2UueSArIHRoaXMuY2FtZXJhLnkpO1xuICAgICAgdGhpcy50aWxlSW5wdXQudmFsdWUgPSBgJHt0aGlzLmVuZ2luZS50aWxlTWFwLmdldCh4LCB5KX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgeCA9IHRoaXMuZW5naW5lLnRpbGVNYXAuZ2V0VGlsZVgodGhpcy5tb3VzZS54ICsgdGhpcy5jYW1lcmEueCk7XG4gICAgICBsZXQgeSA9IHRoaXMuZW5naW5lLnRpbGVNYXAuZ2V0VGlsZVkodGhpcy5tb3VzZS55ICsgdGhpcy5jYW1lcmEueSk7XG4gICAgICB0aGlzLmVuZ2luZS50aWxlTWFwLnNldCh4LCB5LCBwYXJzZUludCh0aGlzLnRpbGVJbnB1dC52YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW91c2VEb3duKGV2ZW50OiBQb2ludGVyRXZlbnQpOiB2b2lkIHt9XG5cbiAgcHJpdmF0ZSBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmtleUNvZGVfW2V2ZW50LmNvZGVdID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUga2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmtleUNvZGVfW2V2ZW50LmNvZGVdID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMga2V5RG93bihjb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmtleUNvZGVfW2NvZGVdO1xuICB9XG5cbiAgcHVibGljIGdldFhBeGlzKCkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmtleURvd24oXCJBcnJvd0xlZnRcIikgPyAtMSA6IDA7XG4gICAgcmVzdWx0ICs9IHRoaXMua2V5RG93bihcIkFycm93UmlnaHRcIikgPyAxIDogMDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldFlBeGlzKCkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmtleURvd24oXCJBcnJvd1VwXCIpID8gLTEgOiAwO1xuICAgIHJlc3VsdCArPSB0aGlzLmtleURvd24oXCJBcnJvd0Rvd25cIikgPyAxIDogMDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4vcmVjdFwiO1xuXG5leHBvcnQgY2xhc3MgTWF0aHMge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byBjbGFtcFxuICAgKiBAcGFyYW0gbWluIHRoZSBtaW5pbXVtIHZhbHVlXG4gICAqIEBwYXJhbSBtYXggdGhlIG1heGltdW0gdmFsdWVcbiAgICogQHJldHVybnMgdGhlIGNsYW1wZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG4gIH1cblxuICAvKipcbiAgICogTGluZWFyIGludGVycG9sYXRlIGJldHdlZW4gdHdvIHZhbHVlc1xuICAgKiBAcGFyYW0gbWluIHRoZSBtaW5pbXVtIHZhbHVlXG4gICAqIEBwYXJhbSBtYXggdGhlIG1heGltdW0gdmFsdWVcbiAgICogQHBhcmFtIHQgdGhlIHRpbWUgdmFsdWVcbiAgICogQHJldHVybnMgdGhlIGxlcnBlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIGxlcnAobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCB0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbWluICsgKG1heCAtIG1pbikgKiB0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIHR3byB2YWx1ZXNcbiAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgKiBAcGFyYW0gbWF4IHRoZSBtYXhpbXVtIHZhbHVlXG4gICAqIEByZXR1cm5zIHRoZSByYW5kb20gbnVtYmVyXG4gICAqL1xuICBzdGF0aWMgcmFuZChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gcmVjdGFuZ2xlcyBpbnRlcnNlY3RcbiAgICogQHBhcmFtIHJlY3QxXG4gICAqIEBwYXJhbSByZWN0MlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSByZWN0YW5nbGVzIGludGVyc2VjdFxuICAgKi9cbiAgc3RhdGljIFJlY3RJbnRlcnNlY3QocmVjdDE6IFJlY3QsIHJlY3QyOiBSZWN0KSB7XG4gICAgaWYgKFxuICAgICAgcmVjdDEueCA8PSByZWN0Mi54ICsgcmVjdDIud2lkdGggJiZcbiAgICAgIHJlY3QxLnggKyByZWN0MS53aWR0aCA+IHJlY3QyLnggJiZcbiAgICAgIHJlY3QxLnkgPD0gcmVjdDIueSArIHJlY3QyLmhlaWdodCAmJlxuICAgICAgcmVjdDEuaGVpZ2h0ICsgcmVjdDEueSA+PSByZWN0Mi55XG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNYXRocyB9IGZyb20gXCIuL21hdGhzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hdHJpeCB3aXRoIGEgZml4ZWQgd2lkdGggYW5kIGhlaWdodC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1hdHJpeCB7XG4gIGFycmF5OiBVaW50MTZBcnJheTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBNYXRyaXggaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIG1hdHJpeC5cbiAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBtYXRyaXguXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgd2lkdGg6IG51bWJlciwgcHVibGljIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5hcnJheSA9IG5ldyBVaW50MTZBcnJheSh3aWR0aCAqIGhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgbWF0cml4LlxuICAgKiBAcGFyYW0geCBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHkgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAqIEByZXR1cm5zIFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXlbeSAqIHRoaXMud2lkdGggKyB4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSBtYXRyaXguXG4gICAqIEBwYXJhbSB4IFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAqL1xuICBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmFycmF5W3kgKiB0aGlzLndpZHRoICsgeF0gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgbWF0cml4IHdpdGggdGhlIHNwZWNpZmllZCBhcnJheSBvZiB2YWx1ZXMuXG4gICAqIEBwYXJhbSBhcnJheSBUaGUgYXJyYXkgb2YgdmFsdWVzIHRvIGxvYWQuXG4gICAqL1xuICBsb2FkKGFycmF5OiBudW1iZXJbXSkge1xuICAgIHRoaXMuYXJyYXkgPSBuZXcgVWludDE2QXJyYXkoYXJyYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJhbmRvbWl6ZXMgdGhlIHZhbHVlcyBpbiB0aGUgbWF0cml4LlxuICAgKi9cbiAgcmFuZG9taXplKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5hcnJheVtpXSA9IE1hdGhzLnJhbmQoMCwgMyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5cbi8qKlxuICogQmFzZSBjb25zdHJ1Y3RvciB0eXBlIGZvciBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBlbmdpbmUuXG4gKi9cbmV4cG9ydCB0eXBlIE9iamVjdENvbnN0cnVjdG9yPFQ+ID0geyBuZXcgKC4uLmFyZ3M6IGFueVtdKTogVCB9O1xuXG4vKipcbiAqIEJhc2Ugb2JqZWN0IG9mIGFsbCB0aGUgZWxlbWVudHMgb2YgdGhlIGVuZ2luZS5cbiAqXG4gKiBUaGUgcGFyYW1zIGlzIHVzZWQgYXMgdmFsaWRhdGlvbiBvZiB0aGUgYXJndW1lbnRzIHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IgZm9yIGRlYnVnZ2luZy5cbiAqIFRoZSBwYXJhbXMgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gYXJyYXkgd2l0aCB0aGUgbmFtZXMgb2YgYWxsIHRoZSBrZXlzIHdoaWNoIHNob3VsZCBiZVxuICogcHJlc2VudCBhcyBhcmdzIG9mIGEgR2FtZU9iamVjdC5cbiAqIFRoZSBjb25maWcgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGRlZmF1bHQgdmFsdWVzIG9mIHRoZSBHYW1lT2JqZWN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBjbGFzcyBFbGVtZW50IGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gKiAgcGFyYW1zKCkge1xuICogICByZXR1cm4gW1wieFwiLCBcInlcIl07XG4gKiAgfVxuICogIGNvbmZpZygpIHtcbiAqICAgIHJldHVybiB7XG4gKiAgICAgIHg6IDAsXG4gKiAgICAgIHk6IDAsXG4gKiAgICAgIHdpZHRoOiAxMDAsXG4gKiAgICAgIGhlaWdodDogMTAwLFxuICogICAgfTtcbiAqICB9XG4gKiB9XG4gKiBjb25zdCBvID0gbmV3IEVsZW1lbnQoKTtcbiAqIC8vIHRoaXMgd2lsbCB0aHJvdyBhbiBlcnJvciBiZWNhdXNlIHggYW5kIHkgYXJlIHJlcXVpcmVkXG4gKlxuICogY29uc3QgbyA9IG5ldyBFbGVtZW50KHsgeDogMTAsIHk6IDEwIH0pO1xuICogLy8gdGhpcyB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciBhbmQgeCBhbmQgeSB3aWxsIGJlIDEwIGFuZCB3aWR0aCBhbmQgaGVpZ2h0IHdpbGwgYmUgMTAwXG4gKlxuICovXG5cbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0IHtcbiAgY29uc3RydWN0b3IoYXJnczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9KSB7XG4gICAgRGVidWcudmFsaWRhdGVQYXJhbXModGhpcy5jb25zdHJ1Y3Rvci5uYW1lLCBhcmdzLCB0aGlzLnBhcmFtcygpKTtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuY29uZmlnKCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkZWZhdWx0cywgYXJncyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSB3aXRoIHRoZSBuYW1lcyBvZiB0aGUga2V5cyB0aGF0IHNob3VsZCBiZSBwcmVzZW50IGluIHRoZSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIGFueT59IE9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IHZhbHVlcyBvZiB0aGUgR2FtZU9iamVjdFxuICAgKi9cbiAgY29uZmlnKCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4vY2FtZXJhXCI7XG5pbXBvcnQgeyBSZWN0Q29sbGlkZXIgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IE1hdGhzIH0gZnJvbSBcIi4vbWF0aHNcIjtcbmltcG9ydCB7IFNvdW5kIH0gZnJvbSBcIi4vc291bmRzXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5pbXBvcnQgeyBUaWxlQ29ybmVycyB9IGZyb20gXCIuL3RpbGVcIjtcbmltcG9ydCB7IFRpbGVNYXAgfSBmcm9tIFwiLi90aWxlbWFwXCI7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSBcIi4vdGltZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXRmb3JtQ29udHJvbGxlckFyZ3Mge1xuICAvKipcbiAgICogVGhlIHRpbGVNYXAgY29tcG9uZW50XG4gICAqL1xuICB0aWxlTWFwOiBUaWxlTWFwO1xufVxuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgbWFuYWdpbmcgcGxhdGZvcm1lciBwaHlzaWNzLlxuICovXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1Db250cm9sbGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIHZlbG9jaXR5IG9uIHRoZSBZIGF4aXNcbiAgICovXG4gIG1heFZlbG9jaXR5WSA9IDEwO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3Jhdml0eSBvZiB0aGUgY29udHJvbGxlclxuICAgKi9cbiAgZ3Jhdml0eSA9IDAuNTtcblxuICAvKipcbiAgICogVGhlIHRpbWUgY29tcG9uZW50XG4gICAqL1xuICB0aW1lID0gdGhpcy5jb21wb25lbnRzLmdldChUaW1lKTtcblxuICAvKipcbiAgICogVGhlIHRpbGVtYXAgY29tcG9uZW50XG4gICAqL1xuICB0aWxlTWFwOiBUaWxlTWFwO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBQbGF0Zm9ybUNvbnRyb2xsZXJBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KFRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgcmVxdWlyZWQgcGFyYW1ldGVycyBmb3IgdGhlIHBsYXRmb3JtIGNvbnRyb2xsZXJcbiAgICovXG4gIHBhcmFtcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtcInRpbGVNYXBcIl07XG4gIH1cblxuICBnZXRDb3JuZXJzKFxuICAgIHgxOiBudW1iZXIsXG4gICAgeTE6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG4gICk6IFRpbGVDb3JuZXJzIHtcbiAgICByZXR1cm4gdGhpcy50aWxlTWFwLmdldENvcm5lcnMoeDEsIHkxLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGNoZWNrRm9yV2FsbHMoc3ByaXRlOiBQbGF5ZXIsIG1vdmVEaXN0YW5jZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbW92ZURpc3RhbmNlWCA9IE1hdGguZmxvb3IobW92ZURpc3RhbmNlWCk7XG4gICAgY29uc3QgY29ybmVycyA9IHRoaXMuZ2V0Q29ybmVycyhcbiAgICAgIHNwcml0ZS54ICsgbW92ZURpc3RhbmNlWCxcbiAgICAgIHNwcml0ZS55LFxuICAgICAgc3ByaXRlLndpZHRoLFxuICAgICAgc3ByaXRlLmhlaWdodFxuICAgICk7XG4gICAgaWYgKFxuICAgICAgbW92ZURpc3RhbmNlWCA+IDAgJiZcbiAgICAgIChjb3JuZXJzLmRvd25SaWdodC5zb2xpZC5sZWZ0IHx8IGNvcm5lcnMudXBSaWdodC5zb2xpZC5sZWZ0KVxuICAgICkge1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WCA9IDA7XG4gICAgICBzcHJpdGUuYWNjZWxlcmF0aW9uWCA9IDA7XG4gICAgICBtb3ZlRGlzdGFuY2VYID0gMDtcbiAgICAgIC8vbW92ZURpc3RhbmNlWCA9IChjb3JuZXJzLmRvd25SaWdodC54ICogY29ybmVycy5kb3duTGVmdC53aWR0aCkgLSBzcHJpdGUueCAtIHNwcml0ZS53aWR0aCAtIDE7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIG1vdmVEaXN0YW5jZVggPCAwICYmXG4gICAgICAoY29ybmVycy5kb3duTGVmdC5zb2xpZC5yaWdodCB8fCBjb3JuZXJzLnVwTGVmdC5zb2xpZC5yaWdodClcbiAgICApIHtcbiAgICAgIC8vbW92ZURpc3RhbmNlWCA9IHNwcml0ZS54IC0gKChjb3JuZXJzLmRvd25MZWZ0LnggKyAxKSAqIGNvcm5lcnMuZG93bkxlZnQud2lkdGgpIC0gMTtcbiAgICAgIC8vbW92ZURpc3RhbmNlWCAqPSAtMTtcbiAgICAgIHNwcml0ZS52ZWxvY2l0eVggPSAwO1xuICAgICAgc3ByaXRlLmFjY2VsZXJhdGlvblggPSAwO1xuICAgICAgbW92ZURpc3RhbmNlWCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtb3ZlRGlzdGFuY2VYO1xuICB9XG5cbiAgYXBwbHlHcmF2aXR5KHNwcml0ZTogUGxheWVyKTogbnVtYmVyIHtcbiAgICBsZXQgbW92ZURpc3RhbmNlWSA9IE1hdGguZmxvb3Ioc3ByaXRlLnZlbG9jaXR5WSk7XG4gICAgaWYgKCFzcHJpdGUuanVtcGluZykge1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcHJpdGUudmVsb2NpdHlZICs9IHRoaXMuZ3Jhdml0eSAqIDEuMiAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgfVxuICAgIG1vdmVEaXN0YW5jZVkgPSBNYXRocy5jbGFtcChcbiAgICAgIG1vdmVEaXN0YW5jZVksXG4gICAgICAtdGhpcy5tYXhWZWxvY2l0eVksXG4gICAgICB0aGlzLm1heFZlbG9jaXR5WVxuICAgICk7XG4gICAgbGV0IGNvcm5lcnMgPSB0aGlzLmdldENvcm5lcnMoXG4gICAgICBzcHJpdGUueCxcbiAgICAgIHNwcml0ZS55ICsgbW92ZURpc3RhbmNlWSxcbiAgICAgIHNwcml0ZS53aWR0aCxcbiAgICAgIHNwcml0ZS5oZWlnaHRcbiAgICApO1xuICAgIGlmIChtb3ZlRGlzdGFuY2VZID4gMCkge1xuICAgICAgaWYgKGNvcm5lcnMuZG93blJpZ2h0LnNvbGlkLnRvcCB8fCBjb3JuZXJzLmRvd25MZWZ0LnNvbGlkLnRvcCkge1xuICAgICAgICBtb3ZlRGlzdGFuY2VZID0gMDtcbiAgICAgICAgc3ByaXRlLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgIHNwcml0ZS5qdW1waW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb3JuZXJzLnVwUmlnaHQuc29saWQuYm90dG9tIHx8IGNvcm5lcnMudXBMZWZ0LnNvbGlkLmJvdHRvbSkge1xuICAgICAgICBtb3ZlRGlzdGFuY2VZID0gMDtcbiAgICAgICAgc3ByaXRlLnZlbG9jaXR5WSA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlRGlzdGFuY2VZO1xuICB9XG5cbiAgY2xhbXBYKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGhzLmNsYW1wKHgsIDAsIHRoaXMudGlsZU1hcC5tYXBXaWR0aCAtIHRoaXMuZW5naW5lLmRpc3BsYXkud2lkdGgpO1xuICB9XG5cbiAgY2xhbXBZKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGhzLmNsYW1wKFxuICAgICAgeSxcbiAgICAgIDAsXG4gICAgICB0aGlzLnRpbGVNYXAubWFwSGVpZ2h0IC0gdGhpcy5lbmdpbmUuZGlzcGxheS5oZWlnaHRcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBTcHJpdGUge1xuICBjb2xvcjogc3RyaW5nO1xuICBjb3JuZXJzOiBhbnk7XG4gIHZhcnM6IGFueTtcbiAgc21vb3RoVGltZTogbnVtYmVyO1xuICBkaXI6IG51bWJlcjtcbiAgc3BlZWQ6IG51bWJlcjtcbiAgc3BlZWRZOiBudW1iZXI7XG4gIHZlbG9jaXR5WTogbnVtYmVyO1xuICBqdW1wRm9yY2U6IG51bWJlcjtcbiAganVtcGluZzogYm9vbGVhbjtcbiAgc2hvb3Rpbmc6IGJvb2xlYW47XG4gIGp1bXBCb29zdGVyOiBudW1iZXI7XG4gIGFjY2VsZXJhdGlvbkZvcmNlWDogbnVtYmVyO1xuICBhY2NlbGVyYXRpb25YOiBudW1iZXI7XG4gIG1heFNwZWVkTXVsdFg6IG51bWJlcjtcbiAgdmVsb2NpdHlYOiBudW1iZXI7XG4gIGZyaWN0aW9uWDogbnVtYmVyO1xuICBkaXJYOiBudW1iZXI7XG4gIGNhbWVyYTogQ2FtZXJhO1xuICBpbnB1dDogSW5wdXQ7XG4gIGRpc3BsYXk6IERpc3BsYXk7XG4gIHRpbWU6IFRpbWU7XG4gIHNvdW5kOiBTb3VuZDtcbiAgY29udHJvbGxlcjogUGxhdGZvcm1Db250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBhbnkpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICAgIHRoaXMuY29sb3IgPSBcImJsdWVcIjtcbiAgICB0aGlzLnZhcnMgPSB7fTtcbiAgICB0aGlzLnNtb290aFRpbWUgPSAxLjM7XG4gICAgdGhpcy52YXJzLmN2ID0gMDtcbiAgICB0aGlzLmRpciA9IDE7XG4gICAgdGhpcy5zcGVlZCA9IDY7XG4gICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgIHRoaXMudmVsb2NpdHlZID0gMDtcbiAgICB0aGlzLmp1bXBGb3JjZSA9IDEyO1xuICAgIHRoaXMuanVtcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmp1bXBCb29zdGVyID0gMDtcblxuICAgIHRoaXMuYWNjZWxlcmF0aW9uRm9yY2VYID0gMS44O1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uWCA9IDA7XG4gICAgdGhpcy5tYXhTcGVlZE11bHRYID0gOTtcbiAgICB0aGlzLnZlbG9jaXR5WCA9IDA7XG4gICAgdGhpcy5mcmljdGlvblggPSAwLjk7XG4gICAgdGhpcy5kaXJYID0gMDtcbiAgICB0aGlzLmNvbGxpZGVycy5hZGQoXG4gICAgICBuZXcgUmVjdENvbGxpZGVyKHtcbiAgICAgICAgeDogLTEwLFxuICAgICAgICB5OiAtMTAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoICsgMTAsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKyAxMCxcbiAgICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0Q29ybmVycyh4OiBudW1iZXIsIHk6IG51bWJlcik6IFRpbGVDb3JuZXJzIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmdldENvcm5lcnMoeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udHJvbGxlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGxlZnQgcmlnaHQgbW92ZW1lbnRcbiAgICBsZXQgbW92ZURpc3RhbmNlWCA9IDA7XG4gICAgbGV0IGlucHV0WCA9IHRoaXMuaW5wdXQuZ2V0WEF4aXMoKTtcblxuICAgIC8vIGFjY2VsZXJhdGlvbiBtb3ZlbWVudFxuICAgIGlmICghdGhpcy5qdW1waW5nKSB7XG4gICAgICB0aGlzLmFjY2VsZXJhdGlvblggPSBpbnB1dFggKiB0aGlzLmFjY2VsZXJhdGlvbkZvcmNlWDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY2NlbGVyYXRpb25YID0gKGlucHV0WCAqIHRoaXMuYWNjZWxlcmF0aW9uRm9yY2VYKSAvIDY7XG4gICAgfVxuXG4gICAgdGhpcy52ZWxvY2l0eVggKz0gdGhpcy5hY2NlbGVyYXRpb25YICogdGhpcy50aW1lLmRlbHRhVGltZTtcblxuICAgIC8vIGZyaWN0aW9uXG4gICAgbGV0IGN1cnJlbnREaXIgPSBNYXRoLnNpZ24odGhpcy52ZWxvY2l0eVgpO1xuICAgIGlmICghdGhpcy5qdW1waW5nKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WCArPSAtY3VycmVudERpciAqIHRoaXMuZnJpY3Rpb25YICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52ZWxvY2l0eVggKz1cbiAgICAgICAgKCgtY3VycmVudERpciAqIHRoaXMuZnJpY3Rpb25YKSAvIDEwKSAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgfVxuICAgIGlmIChNYXRoLnNpZ24odGhpcy52ZWxvY2l0eVgpICE9PSBjdXJyZW50RGlyKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WCA9IDA7XG4gICAgfVxuXG4gICAgLy8gbGltaXQgc3BlZWRcbiAgICBsZXQgbWF4U3BlZWRYID0gdGhpcy5tYXhTcGVlZE11bHRYO1xuICAgIGlmICh0aGlzLmlucHV0LmtleURvd24oXCJLZXlaXCIpICYmIGlucHV0WCkge1xuICAgICAgbWF4U3BlZWRYICo9IDI7XG4gICAgfVxuXG4gICAgLy8gcnVubmluZ1xuICAgIHRoaXMudmVsb2NpdHlYID0gTWF0aHMuY2xhbXAodGhpcy52ZWxvY2l0eVgsIC1tYXhTcGVlZFgsIG1heFNwZWVkWCk7XG4gICAgbW92ZURpc3RhbmNlWCArPSB0aGlzLnZlbG9jaXR5WCAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgbW92ZURpc3RhbmNlWCA9IHRoaXMuY29udHJvbGxlci5jaGVja0ZvcldhbGxzKHRoaXMsIG1vdmVEaXN0YW5jZVgpO1xuICAgIHRoaXMueCArPSBtb3ZlRGlzdGFuY2VYO1xuXG4gICAgLy8gY2FtZXJhIGFkanVzdG1lbnRcbiAgICBpZiAodGhpcy54ID4gdGhpcy5lbmdpbmUuZGlzcGxheS53aWR0aCAvIDIpIHtcbiAgICAgIHRoaXMuY2FtZXJhLnggKz0gbW92ZURpc3RhbmNlWDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBtb3ZlRGlzdGFuY2VYIDwgMCAmJlxuICAgICAgdGhpcy54ID4gdGhpcy5lbmdpbmUudGlsZU1hcC5tYXBXaWR0aCAtIHRoaXMuZW5naW5lLmRpc3BsYXkud2lkdGggLyAyXG4gICAgKSB7XG4gICAgICB0aGlzLmNhbWVyYS54IC09IG1vdmVEaXN0YW5jZVg7XG4gICAgfVxuICAgIHRoaXMuY2FtZXJhLnggPSB0aGlzLmNvbnRyb2xsZXIuY2xhbXBYKHRoaXMuY2FtZXJhLngpO1xuXG4gICAgLy8gZ3Jhdml0eVxuICAgIGxldCBtb3ZlRGlzdGFuY2VZID0gdGhpcy5jb250cm9sbGVyLmFwcGx5R3Jhdml0eSh0aGlzKTtcbiAgICB0aGlzLnkgKz0gbW92ZURpc3RhbmNlWTtcbiAgICB0aGlzLmNhbWVyYS55ICs9IG1vdmVEaXN0YW5jZVk7XG4gICAgdGhpcy5jYW1lcmEueSA9IHRoaXMuY29udHJvbGxlci5jbGFtcFkodGhpcy5jYW1lcmEueSk7XG5cbiAgICAvLyBqdW1wIHByZXNzZWQgYW5kIG5vdCBqdW1waW5nXG4gICAgaWYgKHRoaXMuaW5wdXQua2V5RG93bihcIkFycm93VXBcIikgJiYgIXRoaXMuanVtcGluZykge1xuICAgICAgdGhpcy5qdW1waW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMudmVsb2NpdHlZID0gLXRoaXMuanVtcEZvcmNlIC8gMjtcbiAgICAgIHRoaXMuanVtcEJvb3N0ZXIgPSAwO1xuICAgIH1cblxuICAgIC8vIGp1bXAgYmVpbmcgaGVsZCB3aGlsZSBqdW1waW5nXG4gICAgaWYgKFxuICAgICAgdGhpcy5pbnB1dC5rZXlEb3duKFwiQXJyb3dVcFwiKSAmJlxuICAgICAgdGhpcy5qdW1waW5nICYmXG4gICAgICB0aGlzLmp1bXBCb29zdGVyIDwgMTBcbiAgICApIHtcbiAgICAgIHRoaXMudmVsb2NpdHlZIC09IHRoaXMuanVtcEZvcmNlIC8gMTI7XG4gICAgICB0aGlzLmp1bXBCb29zdGVyICs9IDE7XG4gICAgfVxuXG4gICAgLy8ganVtcCByZWxlYXNlZCBhbmQganVtcGluZ1xuICAgIGlmICghdGhpcy5pbnB1dC5rZXlEb3duKFwiQXJyb3dVcFwiKSAmJiB0aGlzLmp1bXBpbmcpIHtcbiAgICAgIHRoaXMuanVtcEJvb3N0ZXIgPSAwO1xuICAgICAgaWYgKHRoaXMudmVsb2NpdHlZIDwgLXRoaXMuanVtcEZvcmNlIC8gMikge1xuICAgICAgICB0aGlzLnZlbG9jaXR5WSA9IC10aGlzLmp1bXBGb3JjZSAvIDI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXkuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLmNvbG9yKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuY29tcG9uZW50cy5nZXQoSW5wdXQpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gICAgdGhpcy50aW1lID0gdGhpcy5jb21wb25lbnRzLmdldChUaW1lKTtcbiAgICB0aGlzLnNvdW5kID0gdGhpcy5jb21wb25lbnRzLmdldChTb3VuZCk7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KENhbWVyYSk7XG5cbiAgICB0aGlzLmNhbWVyYS54ID0gTWF0aC5mbG9vcih0aGlzLnggLSB0aGlzLmRpc3BsYXkud2lkdGggLyAyKTtcbiAgICB0aGlzLmNhbWVyYS55ID0gTWF0aC5mbG9vcih0aGlzLnkgLSB0aGlzLmRpc3BsYXkuaGVpZ2h0IC8gMik7XG4gICAgdGhpcy5jb250cm9sbGVyID0gdGhpcy5jb21wb25lbnRzLmdldChQbGF0Zm9ybUNvbnRyb2xsZXIpO1xuICB9XG5cbiAgY29sbGlzaW9uKHNwcml0ZTogU3ByaXRlKTogdm9pZCB7fVxufVxuIiwiaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgT2JqZWN0Q29uc3RydWN0b3IgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5cbi8qKlxuICogUmVnaXN0cnkgc3RvcmVzIHNpbmdsZSBpbnN0YW5jZXMgb2Ygb2JqZWN0IGluZGV4ZWQgYnkgdGhlaXIgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpc3RyeSB7XG4gIGl0ZW1zID0gbmV3IE1hcDxPYmplY3RDb25zdHJ1Y3Rvcjxhbnk+LCBhbnk+KCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBDb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJucyBUaGUgaW5zdGFuY2Ugb2YgdGhlIG9iamVjdCBpZiBpdCBleGlzdHMsIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gICAqL1xuICBnZXQ8VD4oQ29uc3RydWN0b3I6IE9iamVjdENvbnN0cnVjdG9yPFQ+KTogVCB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5pdGVtcy5nZXQoQ29uc3RydWN0b3IpO1xuICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICBEZWJ1Zy5lcnJvcihgQ29tcG9uZW50ICR7Q29uc3RydWN0b3IubmFtZX0gaXMgbm90IHJlZ2lzdGVyZWRgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gQ29uc3RydWN0b3IgVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBvYmplY3QgdG8gc3RvcmUuXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgaW5zdGFuY2Ugb2YgdGhlIG9iamVjdCB0byBzdG9yZS5cbiAgICovXG4gIHNldDxUPihDb25zdHJ1Y3RvcjogT2JqZWN0Q29uc3RydWN0b3I8VD4sIGluc3RhbmNlOiBUKSB7XG4gICAgaWYgKERlYnVnLmFjdGl2ZSgpKSB7XG4gICAgICBpZiAodGhpcy5pdGVtcy5oYXMoQ29uc3RydWN0b3IpKSB7XG4gICAgICAgIERlYnVnLmVycm9yKGBDb21wb25lbnQgJHtDb25zdHJ1Y3Rvcn0gaXMgYWxyZWFkeSBkZWZpbmVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXRlbXMuc2V0KENvbnN0cnVjdG9yLCBpbnN0YW5jZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgQW4gaXRlcmF0b3Igb2YgYWxsIHRoZSBpbnN0YW5jZXMgc3RvcmVkIGluIHRoZSByZWdpc3RyeS5cbiAgICovXG4gIHZhbHVlczxUPigpOiBJdGVyYWJsZUl0ZXJhdG9yPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy52YWx1ZXMoKSBhcyBJdGVyYWJsZUl0ZXJhdG9yPFQ+O1xuICB9XG59XG4iLCIvKipcbiAqIEEgUmVzb3VyY2UgSXRlbSBpcyBhIG1lZGlhIG9iamVjdCBsaWtlIGltYWdlLCBhdWRpby4gSXQgaXMgdXNlZCBieSB0aGUgUmVzb3VyY2VzIGNsYXNzXG4gKiBkdXJpbmcgdGhlIHByZWxvYWQgcGhhc2Ugb2YgdGhlIGVuZ2luZSBsb2FkaW5nLlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcblxuZXhwb3J0IHR5cGUgUmVzb3VyY2VUeXBlID0gXCJpbWFnZVwiIHwgXCJhdWRpb1wiO1xuXG4vKipcbiAqIEFyZ3VtZW50cyBmb3IgIFJlc291cmNlSXRlbSBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc291cmNlSXRlbUFyZ3Mge1xuICAvKipcbiAgICogdXJsIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHR5cGUgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICB0eXBlOiBSZXNvdXJjZVR5cGU7XG5cbiAgLyoqXG4gICAqIG5hbWUgb2YgdGhlIHJlc291cmNlIHRvIHVzZSBpbiB0aGUgcmVzb3VyY2VzIGRpY3Rpb25hcnlcbiAgICovXG4gIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlSXRlbSB7XG4gIC8qKlxuICAgKiB1cmwgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICB1cmw6IHN0cmluZztcblxuICAvKipcbiAgICogdHlwZSBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHR5cGU6IFJlc291cmNlVHlwZTtcblxuICAvKipcbiAgICogbmFtZSBvZiB0aGUgcmVzb3VyY2UgdG8gdXNlIGluIHRoZSByZXNvdXJjZXMgZGljdGlvbmFyeVxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBidWZmZXIgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICBidWZmZXI6IGFueTtcblxuICAvKipcbiAgICogaXRlbSBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIGl0ZW06IGFueTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFJlc291cmNlSXRlbUFyZ3MpIHtcbiAgICBEZWJ1Zy52YWxpZGF0ZVBhcmFtcyhcIlJlc291cmNlcy5hZGRcIiwgcGFyYW1zLCBbXCJ1cmxcIiwgXCJ0eXBlXCIsIFwibmFtZVwiXSk7XG4gICAgdGhpcy51cmwgPSBwYXJhbXMudXJsO1xuICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlO1xuICAgIHRoaXMubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIHRoaXMuYnVmZmVyID0ge307XG4gICAgdGhpcy5pdGVtID0ge307XG4gIH1cblxuICAvKipcbiAgICogTG9hZCB0aGUgcmVzb3VyY2VcbiAgICogQHJldHVybnMgUHJvbWlzZSB0byBsb2FkIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgbG9hZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnVybCk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIERlYnVnLmVycm9yKGBFcnJvciBsb2FkaW5nICR7dGhpcy5uYW1lfWApO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJsb2I7XG4gICAgICB0aGlzLml0ZW0gPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuaXRlbS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH07XG4gICAgICB0aGlzLml0ZW0uc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBEZWJ1Zy5pbmZvKGBTdWNjZXNzIGxvYWRpbmcgJHt0aGlzLm5hbWV9YCk7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogUmVzb3VyY2VzIGNvbXBvbmVudCBpcyBzZXQgb2YgdGhlIGltYWdlcyBhbmQgYXVkaW8gcmVzb3VyY2VzIG9mIHRoZSBnYW1lLlxuICogSXQgaGFuZGxlcyBhZGRpbmcgYW5kIGdldHRpbmcgdGhlIHJlc291cmNlcyBieSBhIG5hbWUgYW5kIGFsc28gdGhlIHByZWxvYWQgcGhhc2Ugb2YgdGhlIGVuZ2luZSBsb2FkaW5nLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgaXRlbXM6IFJlY29yZDxzdHJpbmcsIFJlc291cmNlSXRlbT4gPSB7fTtcblxuICAvKipcbiAgICogQWRkIGEgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBkaWN0aW9uYXJ5XG4gICAqIEBwYXJhbSBwYXJhbXMgQXJndW1lbnRzIGZvciB0aGUgUmVzb3VyY2VJdGVtIGNvbnN0cnVjdG9yXG4gICAqL1xuICBhZGQocGFyYW1zOiBSZXNvdXJjZUl0ZW1BcmdzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLml0ZW1zW3BhcmFtcy5uYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgRGVidWcud2FybihgUmVzb3VyY2UgJHtwYXJhbXMubmFtZX0gaXMgYWxyZWFkeSBkZWZpbmVkYCk7XG4gICAgfVxuICAgIHRoaXMuaXRlbXNbcGFyYW1zLm5hbWVdID0gbmV3IFJlc291cmNlSXRlbShwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHJlc291cmNlIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgb2YgdGhlIHJlc291cmNlXG4gICAqIEByZXR1cm5zIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXNbbmFtZV0uaXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSByZXNvdXJjZSBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgcmVtb3ZlKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLml0ZW1zW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWxvYWQgYWxsIHJlc291cmNlc1xuICAgKi9cbiAgYXN5bmMgcHJlbG9hZCgpIHtcbiAgICBEZWJ1Zy5ncm91cFN0YXJ0KFwiUHJlbG9hZGluZyBSZXNvdXJjZXNcIik7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKE9iamVjdC52YWx1ZXModGhpcy5pdGVtcykubWFwKChpdGVtKSA9PiBpdGVtLmxvYWQoKSkpO1xuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgRGVidWcuZXJyb3IoZT8ubWVzc2FnZSk7XG4gICAgfVxuICAgIERlYnVnLmdyb3VwRW5kKCk7XG4gIH1cbn1cbiIsIi8qIGV4cG9ydGVkIFNjZW5lICovXG5cbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tIFwiLi9jb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcblxuLyoqXG4gKiBTY2VuZSBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjZW5lQXJncyB7XG4gIC8qKlxuICAgKiBJZiB0aGUgc2NlbmUgaXMgYWN0aXZlLCB0aGUgc3ByaXRlcyBvZiB0aGUgc2NlbmUgd2lsbCBtb3ZlIGFuZCBjb2xsaWRlLlxuICAgKi9cbiAgaXNBY3RpdmU6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiB0aGUgc2NlbmUgaXMgdmlzaWJsZSwgdGhlIHNwcml0ZXMgb2YgdGhlIHNjZW5lIHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlLlxuICAgKi9cbiAgaXNWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIFNjZW5lIGlzIGEgY29sbGVjdGlvbiBvZiBzcHJpdGVzIG9mIGEgZ2FtZS5cbiAqIE9ubHkgdGhlIHNwcml0ZXMgaW4gdGhlIHNhbWUgc2NlbmUgY2FuIGNvbGxpZGUgd2l0aCBlYWNoIG90aGVyLlxuICogVGhlIGVuZ2luZSBjYW4gaGF2ZSBhIHNpbmdsZSBzY2VuZSBvciBtdWx0aXBsZS4gRGVwZW5kaW5nIG9uIHRoZSBhY3RpdmUgc2NlbmUgb2ZcbiAqIHRoZSBlbmdpbmUsIHRoYXQgc2NlbmUgc3ByaXRlcyB3b3VsZCBiZSBkcmF3LCBtb3ZlZCBhbmQgY29sbGlkZWQgb24gdGhlIHN0YWdlLlxuICovXG5leHBvcnQgY2xhc3MgU2NlbmUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBzcHJpdGVzIG9mIHRoZSBzY2VuZS5cbiAgICovXG4gIHNwcml0ZXMgPSBuZXcgQ29sbGVjdGlvbjxTcHJpdGU+KCk7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzY2VuZSBpcyBhY3RpdmUsIHRoZSBzcHJpdGVzIG9mIHRoZSBzY2VuZSB3aWxsIG1vdmUgYW5kIGNvbGxpZGUuXG4gICAqL1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgdGhlIHNjZW5lIGlzIHZpc2libGUsIHRoZSBzcHJpdGVzIG9mIHRoZSBzY2VuZSB3aWxsIGJlIGRyYXduIG9uIHRoZSBzdGFnZS5cbiAgICovXG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogU2NlbmVBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBkZWZhdWx0IHNjZW5lIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBjb25maWcoKTogU2NlbmVBcmdzIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uKCk7XG4gICAgZm9yIChsZXQgc3ByaXRlIG9mIHRoaXMuc3ByaXRlcy5hbGwoKSkge1xuICAgICAgaWYgKHNwcml0ZS5pc0FjdGl2ZSkge1xuICAgICAgICBzcHJpdGUubW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBzcHJpdGUgb2YgdGhpcy5zcHJpdGVzLmFsbCgpKSB7XG4gICAgICBpZiAoc3ByaXRlLmlzVmlzaWJsZSkge1xuICAgICAgICBzcHJpdGUuZHJhdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgQWRkIGEgc3ByaXRlIHRvIHRoZSBzY2VuZS5cbiAgICogQHBhcmFtIHNwcml0ZSB0byBiZSBhZGRlZC5cbiAgICovXG4gIGFkZFNwcml0ZShzcHJpdGU6IFNwcml0ZSk6IHZvaWQge1xuICAgIHNwcml0ZS5lbmdpbmUgPSB0aGlzLmVuZ2luZTtcbiAgICBzcHJpdGUucGFyZW50ID0gdGhpcztcbiAgICBzcHJpdGUuaW5pdCgpO1xuICAgIHRoaXMuc3ByaXRlcy5hZGQoc3ByaXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgc3ByaXRlIGZyb20gdGhlIHNjZW5lLlxuICAgKiBAcGFyYW0gc3ByaXRlIHRvIGJlIHJlbW92ZWQuXG4gICAqL1xuICByZW1vdmVTcHJpdGUoc3ByaXRlOiBTcHJpdGUpIHtcbiAgICB0aGlzLnNwcml0ZXMucmVtb3ZlKHNwcml0ZSk7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgcXVhZC10cmVlIGZvciBjb2xsaXNpb24gZGV0ZWN0aW9uXG4gIGNvbGxpc2lvbigpIHtcbiAgICBjb25zdCBzcHJpdGVzID0gdGhpcy5zcHJpdGVzLmFsbCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ByaXRlcy5sZW5ndGg7ICsraSkge1xuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgc3ByaXRlcy5sZW5ndGg7ICsraikge1xuICAgICAgICBsZXQgc3ByaXRlMSA9IHNwcml0ZXNbaV07XG4gICAgICAgIGxldCBzcHJpdGUyID0gc3ByaXRlc1tqXTtcbiAgICAgICAgaWYgKHNwcml0ZTEudGVzdENvbGxpc2lvbihzcHJpdGUyKSkge1xuICAgICAgICAgIHNwcml0ZTEuY29sbGlzaW9uKHNwcml0ZTIpO1xuICAgICAgICAgIHNwcml0ZTIuY29sbGlzaW9uKHNwcml0ZTEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcblxuLyogZXhwb3J0ZWQgU291bmQgKi9cbmV4cG9ydCBjbGFzcyBTb3VuZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiB7fSkge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gIH1cblxuICBtb3ZlKCk6IHZvaWQge31cblxuICBkcmF3KCk6IHZvaWQge31cblxuICBwbGF5KCkge31cblxuICBzdG9wKCkge31cblxuICBwYXVzZSgpIHt9XG59XG4iLCJpbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9yZWN0XCI7XG5cbi8qKlxuICogVGhlIGFyZ3VtZW50cyB0byBjcmVhdGUgYSBTcHJpdGVTaGVldC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTcHJpdGVTaGVldEFyZ3Mge1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBmcmFtZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbWFnZSBjb250YWluaW5nIHRoZSBzcHJpdGVzL3RpbGVzLlxuICAgKi9cbiAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIFRoZSB4IG9mZnNldCBvZiB0aGUgZmlyc3Qgc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgb2Zmc2V0WD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHkgb2Zmc2V0IG9mIHRoZSBmaXJzdCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBvZmZzZXRZPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZ2FwIGJldHdlZW4gZWFjaCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBnYXA/OiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBzcHJpdGUgc2hlZXQgY29uc2lzdHMgb2YgZGlmZmVyZW50IHNwcml0ZXMvdGlsZXMgZHJhd24gaW4gdGhlIHNhbWUgaW1hZ2UuXG4gKiBXaGVuIGNyZWF0ZWQsIHRoZSBTcHJpdGVTaGVldCB3aWxsIGNyZWF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgZWFjaCBzcHJpdGUvdGlsZSBvblxuICogdGhlIGltYWdlIGRlcGVuZGluZyBvbiB0aGUgd2lkdGgvaGVpZ2h0IG9mIHRoZSBmcmFtZS90aWxlIG9uIHRoZSBzaGVldC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNwcml0ZVNoZWV0IGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBjb29yZGluYXRlcyBvZiBlYWNoIHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIHRpbGVzOiBQb2ludFtdO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBmcmFtZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBmcmFtZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGltYWdlIGNvbnRhaW5pbmcgdGhlIHNwcml0ZXMvdGlsZXMuXG4gICAqL1xuICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgLyoqXG4gICAqIFRoZSB4IG9mZnNldCBvZiB0aGUgZmlyc3Qgc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgb2Zmc2V0WDogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHkgb2Zmc2V0IG9mIHRoZSBmaXJzdCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBvZmZzZXRZOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZ2FwIGJldHdlZW4gZWFjaCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBnYXA6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhcmdzOiBTcHJpdGVTaGVldEFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgbGV0IGlDb3VudCA9IDE7XG4gICAgbGV0IGpDb3VudCA9IDE7XG4gICAgaWYgKHRoaXMuZ2FwKSB7XG4gICAgICB3aGlsZSAoXG4gICAgICAgIHRoaXMuaW1hZ2Uud2lkdGggLSB0aGlzLm9mZnNldFggLSBpQ291bnQrKyAqICh0aGlzLndpZHRoICsgdGhpcy5nYXApID49XG4gICAgICAgIHRoaXMud2lkdGhcbiAgICAgICk7XG4gICAgICB3aGlsZSAoXG4gICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0IC1cbiAgICAgICAgICB0aGlzLm9mZnNldFkgLVxuICAgICAgICAgIGpDb3VudCsrICogKHRoaXMuaGVpZ2h0ICsgdGhpcy5nYXApID49XG4gICAgICAgIHRoaXMud2lkdGhcbiAgICAgICk7XG4gICAgICBpQ291bnQtLTtcbiAgICAgIGpDb3VudC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBpQ291bnQgPSBNYXRoLmZsb29yKCh0aGlzLmltYWdlLndpZHRoIC0gdGhpcy5vZmZzZXRYKSAvIHRoaXMud2lkdGgpO1xuICAgICAgakNvdW50ID0gTWF0aC5mbG9vcigodGhpcy5pbWFnZS5oZWlnaHQgLSB0aGlzLm9mZnNldFkpIC8gdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgakNvdW50OyArK2opIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaUNvdW50OyArK2kpIHtcbiAgICAgICAgbGV0IHggPSB0aGlzLm9mZnNldFggKyBpICogdGhpcy5nYXAgKyBpICogdGhpcy53aWR0aDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm9mZnNldFkgKyBqICogdGhpcy5nYXAgKyBqICogdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgcmVxdWlyZWQgcGFyYW1ldGVycyBmb3IgdGhlIHNwcml0ZSBzaGVldFxuICAgKi9cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW1wid2lkdGhcIiwgXCJoZWlnaHRcIiwgXCJpbWFnZVwiXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIGRlZmF1bHQgb3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNwcml0ZSBzaGVldFxuICAgKi9cbiAgY29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvZmZzZXRYOiAwLFxuICAgICAgb2Zmc2V0WTogMCxcbiAgICAgIGdhcDogMCxcbiAgICB9O1xuICB9XG59XG4iLCIvKiBleHBvcnRlZCBTcHJpdGUgKi9cblxuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IENvbGxpZGVyIH0gZnJvbSBcIi4vY29sbGlkZXJzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3ByaXRlQXJncyB7XG4gIC8qKlxuICAgKiBYIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHg6IG51bWJlcjtcblxuICAvKipcbiAgICogWSBwb3NpdGlvbiBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICB5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdGhlIHNwcml0ZSBpcyB2aXNpYmxlLCBpdCB3aWxsIGJlIGRyYXduIG9uIHRoZSBzdGFnZVxuICAgKi9cbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3ByaXRlIGlzIGFjdGl2ZSwgaXQgd2lsbCBtb3ZlXG4gICAqL1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBCYXNlIFNwcml0ZSBjb21wb25lbnQuIEV2ZXJ5IFNwcml0ZSBvZiB0aGUgZW5naW5lIHNob3VsZCBkZXJpdmUgZnJvbSB0aGlzIGNsYXNzLlxuICogRWFjaCBsb29wIG9mIHRoZSBnYW1lIHRoZSBzcHJpdHMgd2lsbCBtb3ZlLCBkcmF3IGFuZCB0ZXN0IGNvbGxpc2lvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFNwcml0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBYIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHg6IG51bWJlcjtcblxuICAvKipcbiAgICogWSBwb3NpdGlvbiBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICB5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdGhlIHNwcml0ZSBpcyB2aXNpYmxlLCBpdCB3aWxsIGJlIGRyYXduIG9uIHRoZSBzdGFnZVxuICAgKi9cbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3ByaXRlIGlzIGFjdGl2ZSwgaXQgd2lsbCBtb3ZlXG4gICAqL1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhlIHNwcml0ZVxuICAgKi9cbiAgY29sbGlkZXJzID0gbmV3IENvbGxlY3Rpb248Q29sbGlkZXI+KCk7XG5cbiAgLyoqXG4gICAqIFBhcmVudCBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICBwYXJlbnQ6IENvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogU3ByaXRlQXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciB0aGUgc3ByaXRlXG4gICAqL1xuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICBjb25maWcoKTogUGFydGlhbDxTcHJpdGVBcmdzPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYSBib3ggYXJvdW5kIHRoZSBzcHJpdGVcbiAgICogQHBhcmFtICB7c3RyaW5nfSBjb2xvciBDb2xvciBvZiB0aGUgcmVjdGFuZ2xlLCBkZWZhdWx0IHJlZFxuICAgKi9cbiAgZGVidWdEcmF3KGNvbG9yID0gXCJyZWRcIikge1xuICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpO1xuICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICBkaXNwbGF5LnJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBjb2xvcik7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUZXN0cyBmb3IgY29sbGlzaW9uIGJldHdlZW4gZWFjaCBjb2xsaWRlciBvZiB0aGUgc3ByaXRlIGFnYWluc3QgYSBzcHJpdGVcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSBTcHJpdGUgdG8gdGVzdCB0aGUgY29sbGlzaW9uIHdpdGhcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBjb2xsaXNpb24gZGV0ZWN0ZWRcbiAgICovXG4gIHRlc3RDb2xsaXNpb24oc3ByaXRlOiBTcHJpdGUpIHtcbiAgICBpZiAoIXRoaXMuY29sbGlkZXJzLmFsbCgpLmxlbmd0aCB8fCAhc3ByaXRlLmNvbGxpZGVycy5hbGwoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgY29sbGlkZXIxIG9mIHRoaXMuY29sbGlkZXJzLmFsbCgpKVxuICAgICAgZm9yIChsZXQgY29sbGlkZXIyIG9mIHNwcml0ZS5jb2xsaWRlcnMuYWxsKCkpXG4gICAgICAgIGlmIChjb2xsaWRlcjEudGVzdChjb2xsaWRlcjIpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBzcHJpdGUgaXMgYWRkZWQgdG8gYSBzY2VuZSBhZnRlciBjcmVhdGlvblxuICAgKi9cbiAgaW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCBlYWNoIGdhbWUgbG9vcFxuICAgKi9cbiAgbW92ZSgpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCBlYWNoIGxvb3Agb2YgdGhlIGdhbWVcbiAgICovXG4gIGRyYXcoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZXhlY3V0ZWQgd2hlbiB0aGUgc3ByaXRlIGNvbGxpZGVkIHdpdGggYW5vdGhlciBzcHJpdGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgVGhlIG90aGVyIHNwcml0ZSB3aXRoIHdob20gdGhlIGNvbGxpc2lvbiBvY3VycmVkXG4gICAqL1xuICBjb2xsaXNpb24oc3ByaXRlOiBTcHJpdGUpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHRoZSBzcHJpdGUgaXMgcmVtb3ZlZCBmcm9tIHRoZSBlbmdpbmUgc2NlbmVcbiAgICovXG4gIGRlc3Ryb3koKSB7fVxufVxuIiwiaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gXCIuL29iamVjdHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUaWxlQ29ybmVycyB7XG4gIHVwTGVmdDogVGlsZTtcbiAgdXBSaWdodDogVGlsZTtcbiAgZG93bkxlZnQ6IFRpbGU7XG4gIGRvd25SaWdodDogVGlsZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaWxlRWRnZXMge1xuICB0b3A6IFRpbGU7XG4gIGJvdHRvbTogVGlsZTtcbiAgbGVmdDogVGlsZTtcbiAgcmlnaHQ6IFRpbGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGlsZVNvbGlkIHtcbiAgdG9wOiBib29sZWFuO1xuICBib3R0b206IGJvb2xlYW47XG4gIGxlZnQ6IGJvb2xlYW47XG4gIHJpZ2h0OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSBhbmdsZSBvZiB0aGUgdGlsZS5cbiAgICovXG4gIGFuZ2xlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzaGVldCBpbmRleCBvZiB0aGUgdGlsZS5cbiAgICovXG4gIHNoZWV0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzb2xpZCBwcm9wZXJ0eSBvZiB0aGUgdGlsZSB3YWxscy5cbiAgICovXG4gIHNvbGlkOiBUaWxlU29saWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBUaWxlIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gIC8qKlxuICAgKiBUaGUgYW5nbGUgb2YgdGhlIHRpbGUuXG4gICAqL1xuICBhbmdsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2hlZXQgaW5kZXggb2YgdGhlIHRpbGUuXG4gICAqL1xuICBzaGVldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc29saWQgcHJvcGVydHkgb2YgdGhlIHRpbGUuXG4gICAqL1xuICBzb2xpZDogVGlsZUVkZ2VzO1xuXG4gIC8qKlxuICAgKiBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgdGlsZS5cbiAgICovXG4gIHg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHkgcG9zaXRpb24gb2YgdGhlIHRpbGUuXG4gICAqL1xuICB5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgdGlsZS5cbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIHRpbGUuXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhcmdzOiBUaWxlQXJncykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIFRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gb2YgYSB0aWxlLlxuICAgKi9cbiAgY29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzb2xpZDoge1xuICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICBib3R0b206IGZhbHNlLFxuICAgICAgICByaWdodDogZmFsc2UsXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFuZ2xlOiAwLFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgTWF0aHMgfSBmcm9tIFwiLi9tYXRoc1wiO1xuaW1wb3J0IHsgTWF0cml4IH0gZnJvbSBcIi4vbWF0cml4XCI7XG5pbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gXCIuL3Nwcml0ZS1zaGVldHNcIjtcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbmltcG9ydCB7IFRpbGUsIFRpbGVDb3JuZXJzIH0gZnJvbSBcIi4vdGlsZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVNYXBBcmdzIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICB0aWxlV2lkdGg6IG51bWJlcjtcbiAgdGlsZUhlaWdodDogbnVtYmVyO1xuICBzaGVldDogc3RyaW5nO1xuICB0aWxlczogc3RyaW5nW107XG59XG5cbmNvbnN0IFNPTElEX1RJTEUgPSBuZXcgVGlsZSh7XG4gIHNvbGlkOiB7IHRvcDogdHJ1ZSwgYm90dG9tOiB0cnVlLCByaWdodDogdHJ1ZSwgbGVmdDogdHJ1ZSB9LFxuICBhbmdsZTogMCxcbiAgc2hlZXQ6IDAsXG59KTtcbi8qKlxuICogQ2xhc3MgZm9yIG1hbmFnaW5nIHRpbGVNYXBzLlxuICovXG5leHBvcnQgY2xhc3MgVGlsZU1hcCBleHRlbmRzIFNwcml0ZSB7XG4gIC8qKlxuICAgKiBUaGUgbWF0cml4IG9mIHRoZSB0aWxlIG1hcFxuICAgKi9cbiAgbWF0cml4OiBNYXRyaXg7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgbWFwIGluIHBpeGVsc1xuICAgKi9cbiAgbWFwV2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgbWFwIGluIHBpeGVsc1xuICAgKi9cbiAgbWFwSGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiBhIHRpbGUgaW4gcGl4ZWxzXG4gICAqL1xuICB0aWxlV2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiBhIHRpbGUgaW4gcGl4ZWxzXG4gICAqL1xuICB0aWxlSGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgbWFwIGluIHRpbGVzXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBtYXAgaW4gdGlsZXNcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY2FtZXJhIG9mIHRoZSB0aWxlIG1hcFxuICAgKi9cbiAgY2FtZXJhOiBDYW1lcmE7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5IG9mIHRoZSB0aWxlIG1hcFxuICAgKi9cbiAgZGlzcGxheTogRGlzcGxheTtcblxuICAvKipcbiAgICogVGhlIHRpbGVzIG9mIHRoZSB0aWxlIG1hcFxuICAgKi9cbiAgdGlsZXM6IFRpbGVbXTtcblxuICAvKipcbiAgICogVGhlIHNwcml0ZSBzaGVldCBvZiB0aGUgdGlsZSBtYXBcbiAgICovXG4gIHNoZWV0OiBTcHJpdGVTaGVldDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogYW55KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLm1hdHJpeCA9IG5ldyBNYXRyaXgodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMubWFwV2lkdGggPSB0aGlzLndpZHRoICogdGhpcy50aWxlV2lkdGg7XG4gICAgdGhpcy5tYXBIZWlnaHQgPSB0aGlzLmhlaWdodCAqIHRoaXMudGlsZUhlaWdodDtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuY29tcG9uZW50cy5nZXQoQ2FtZXJhKTtcbiAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpO1xuICB9XG5cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiBbXG4gICAgICBcInhcIixcbiAgICAgIFwieVwiLFxuICAgICAgXCJ3aWR0aFwiLFxuICAgICAgXCJoZWlnaHRcIixcbiAgICAgIFwidGlsZVdpZHRoXCIsXG4gICAgICBcInRpbGVIZWlnaHRcIixcbiAgICAgIFwic2hlZXRcIixcbiAgICAgIFwidGlsZXNcIixcbiAgICBdO1xuICB9XG5cbiAgZ2V0KHg6IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguZ2V0KHgsIHkpO1xuICB9XG5cbiAgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tYXRyaXguc2V0KHgsIHksIHZhbHVlKTtcbiAgfVxuXG4gIGxvYWQoYXJyYXk6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KSB7XG4gICAgICBEZWJ1Zy53YXJuKFxuICAgICAgICBgVGlsZW1hcCBzaXplIG1pc21hdGNoIHdpdGggd2lkdGg6ICR7dGhpcy53aWR0aH0gYW5kIGhlaWdodCAke3RoaXMuaGVpZ2h0fWBcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubWF0cml4LmxvYWQoYXJyYXkpO1xuICB9XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXRyaXguYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxldCBjaGFyID0gdGhpcy5tYXRyaXguYXJyYXlbaV0udG9TdHJpbmcoKTtcbiAgICAgIGNoYXIgPSBjaGFyLmxlbmd0aCA+IDEgPyBjaGFyIDogXCIgIFwiICsgY2hhcjtcbiAgICAgIGNoYXIgPSBjaGFyLmxlbmd0aCA+IDIgPyBjaGFyIDogXCIgXCIgKyBjaGFyO1xuICAgICAgcmVzdWx0ICs9IGNoYXIgKyBcIixcIjtcbiAgICAgIGlmICgrK2NvdW50ID49IHRoaXMud2lkdGgpIHtcbiAgICAgICAgY291bnQgPSAwO1xuICAgICAgICByZXN1bHQgKz0gXCJcXHJcXG5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gcmVzdWx0O1xuICB9XG5cbiAgZ2V0VGlsZVgoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoeCAvIHRoaXMudGlsZVdpZHRoKSAlIHRoaXMubWFwV2lkdGgpO1xuICB9XG5cbiAgZ2V0VGlsZVkoeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoeSAvIHRoaXMudGlsZVdpZHRoKSAlIHRoaXMubWFwV2lkdGgpO1xuICB9XG5cbiAgZ2V0VGlsZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFRpbGUge1xuICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMubWFwV2lkdGggfHwgeSA+PSB0aGlzLm1hcFdpZHRoKSB7XG4gICAgICByZXR1cm4gU09MSURfVElMRTtcbiAgICB9XG4gICAgY29uc3QgeFRpbGUgPSB0aGlzLmdldFRpbGVYKHgpO1xuICAgIGNvbnN0IHlUaWxlID0gdGhpcy5nZXRUaWxlWSh5KTtcbiAgICBjb25zdCB0aWxlSW5kZXggPSB0aGlzLmdldCh4VGlsZSwgeVRpbGUpO1xuICAgIGNvbnN0IHRpbGUgPSB0aGlzLnRpbGVzW3RpbGVJbmRleF0gfHwgU09MSURfVElMRTtcblxuICAgIHJldHVybiB0aWxlO1xuICB9XG5cbiAgZ2V0Q29ybmVycyh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBUaWxlQ29ybmVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwTGVmdDogdGhpcy5nZXRUaWxlKHgsIHkpLFxuICAgICAgdXBSaWdodDogdGhpcy5nZXRUaWxlKHggKyB3aWR0aCwgeSksXG4gICAgICBkb3duTGVmdDogdGhpcy5nZXRUaWxlKHgsIHkgKyBoZWlnaHQpLFxuICAgICAgZG93blJpZ2h0OiB0aGlzLmdldFRpbGUoeCArIHdpZHRoLCB5ICsgaGVpZ2h0KSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0RHJhd1JlY3QoKSB7XG4gICAgbGV0IHgxID0gdGhpcy5nZXRUaWxlWCh0aGlzLmNhbWVyYS54KTtcbiAgICBsZXQgeTEgPSB0aGlzLmdldFRpbGVZKHRoaXMuY2FtZXJhLnkpO1xuICAgIGxldCB4MiA9IE1hdGguY2VpbCh0aGlzLmRpc3BsYXkud2lkdGggLyB0aGlzLnRpbGVXaWR0aCk7XG4gICAgbGV0IHkyID0gTWF0aC5jZWlsKHRoaXMuZGlzcGxheS5oZWlnaHQgLyB0aGlzLnRpbGVXaWR0aCk7XG4gICAgeDEgPSBNYXRocy5jbGFtcCh4MSwgMCwgdGhpcy53aWR0aCk7XG4gICAgeTEgPSBNYXRocy5jbGFtcCh5MSwgMCwgdGhpcy5oZWlnaHQpO1xuICAgIHgyID0gTWF0aHMuY2xhbXAoeDIgKyB4MSArIDEsIHgxLCB0aGlzLndpZHRoKTtcbiAgICB5MiA9IE1hdGhzLmNsYW1wKHkyICsgeTEgKyAxLCB5MSwgdGhpcy5oZWlnaHQpO1xuICAgIHJldHVybiB7XG4gICAgICB4MTogeDEsXG4gICAgICB5MTogeTEsXG4gICAgICB4MjogeDIsXG4gICAgICB5MjogeTIsXG4gICAgfTtcbiAgfVxuXG4gIGRyYXcoKTogdm9pZCB7XG4gICAgbGV0IHJlY3QgPSB0aGlzLmdldERyYXdSZWN0KCk7XG4gICAgZm9yIChsZXQgaSA9IHJlY3QueDE7IGkgPCByZWN0LngyOyArK2kpIHtcbiAgICAgIGZvciAobGV0IGogPSByZWN0LnkxOyBqIDwgcmVjdC55MjsgKytqKSB7XG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5nZXQoaSwgaik7XG4gICAgICAgIGlmICh0aWxlKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUaWxlKFxuICAgICAgICAgICAgdGhpcy54ICsgaSAqIHRoaXMudGlsZVdpZHRoLFxuICAgICAgICAgICAgdGhpcy55ICsgaiAqIHRoaXMudGlsZUhlaWdodCxcbiAgICAgICAgICAgIHRoaXMudGlsZVdpZHRoLFxuICAgICAgICAgICAgdGhpcy50aWxlSGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5zaGVldCxcbiAgICAgICAgICAgIHRpbGUgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbn1cbiIsIi8qIGV4cG9ydGVkIFRpbWUgKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5cbi8qKlxuICogTWFuYWdlcyB0aGUgdGltZSBvZiB0aGUgZ2FtZS5cbiAqIHRpbWUuc3RhcnRUaW1lOiBzZWNvbmRzIGVsYXBzZWQgc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkXG4gKiB0aW1lLmZyYW1lVGltZTogYWxtb3N0IHRoZSBzYW1lIGFzIHN0YXJ0VGltZSwgaGFzIHRoZSBlbGFwc2VkIHNlY29uZHNcbiAqIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZCBidXQgaXQgdXBkYXRlcyB0aGUgdmFsdWUgYnkgY291bnRpbmcgdGhlIGZyYW1lIHRpbWUgb2YgZWFjaCBnYW1lIGxvb3AuXG4gKiB0aW1lLmRlbHRhVGltZTogaW52ZXJzZSByZWxhdGl2ZSB2YWx1ZSB0byB0aGUgZnBzIG9mIHRoZSBnYW1lLiBXaGVuIHRoZSBnYW1lIHJ1bnMgb24gNjBmcHMgdGhlIHZhbHVlIGlzIDEuXG4gKiBXaGVuIHRoZSBmcHMgZHJvcCwgdGhlIGRlbHRhVGltZSB2YWx1ZSBpcyBpbmNyZWFzZWQgcHJvcG9ydGlvbmFsIHRvIHRoZSBhbW91bnQgb2YgZnBzIGRyb3BwZWQuXG4gKiBFeGFtcGxlOlxuICogNjBmcHM6IGRlbHRhVGltZSA9PSAxXG4gKiAzMGZwczogZGVsdGFUaW1lID09IDJcbiAqIDE1ZnBzOiBkZWx0YVRpbWUgPT0gNFxuICovXG5leHBvcnQgY2xhc3MgVGltZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBkZWx0YVRpbWU6IGludmVyc2UgcmVsYXRpdmUgdmFsdWUgdG8gdGhlIGZwcyBvZiB0aGUgZ2FtZS4gV2hlbiB0aGUgZ2FtZSBydW5zIG9uIDYwZnBzIHRoZSB2YWx1ZSBpcyAxLlxuICAgKi9cbiAgZGVsdGFUaW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGRlbHRhVGltZUZTOiBkZWx0YVRpbWUgaW4gZmxvYXRpbmcgcG9pbnQgbnVtYmVyLlxuICAgKi9cbiAgZGVsdGFUaW1lRlM6IG51bWJlcjtcblxuICAvKipcbiAgICogdGltZTogc2Vjb25kcyBlbGFwc2VkIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZFxuICAgKi9cbiAgdGltZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBmcmFtZVRpbWU6IGFsbW9zdCB0aGUgc2FtZSBhcyBzdGFydFRpbWUsIGhhcyB0aGUgZWxhcHNlZCBzZWNvbmRzXG4gICAqL1xuICBmcmFtZVRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogZnJhbWVDb3VudDogbnVtYmVyIG9mIGZyYW1lcyBlbGFwc2VkIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZFxuICAgKi9cbiAgZnJhbWVDb3VudDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBmcHM6IGZyYW1lcyBwZXIgc2Vjb25kIG9mIHRoZSBnYW1lXG4gICAqL1xuICBmcHM6IG51bWJlcjtcblxuICAvKipcbiAgICogc3RhcnRUaW1lOiBzZWNvbmRzIGVsYXBzZWQgc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkXG4gICAqL1xuICBzdGFydFRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogbGFzdFRpbWU6IGxhc3QgdGltZSB0aGUgZ2FtZSBsb29wIHdhcyBleGVjdXRlZFxuICAgKi9cbiAgbGFzdFRpbWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogdW5rbm93bikge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5mcmFtZVRpbWUgPSAwO1xuICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgdGhpcy5mcHMgPSAwO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSB0aGlzLnN0YXJ0VGltZTtcbiAgICB0aGlzLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xuICB9XG5cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdGltZSB2YWx1ZXMuXG4gICAqL1xuICBtb3ZlKCk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50ID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xuICAgIHRoaXMuZGVsdGFUaW1lRlMgPSBjdXJyZW50IC0gdGhpcy5sYXN0VGltZTtcbiAgICB0aGlzLmRlbHRhVGltZSA9IHRoaXMuZGVsdGFUaW1lRlMgLyAoMSAvIDYwKTtcbiAgICB0aGlzLmZyYW1lVGltZSArPSB0aGlzLmRlbHRhVGltZTtcbiAgICB0aGlzLnRpbWUgPSBjdXJyZW50IC0gdGhpcy5zdGFydFRpbWU7XG4gICAgdGhpcy5sYXN0VGltZSA9IGN1cnJlbnQ7XG4gICAgdGhpcy5mcHMgPSAxMDAwIC8gKHRoaXMuZGVsdGFUaW1lRlMgKiAxMDAwKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDYW1lcmEsIENhbWVyYUFyZ3MgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QsIE9iamVjdENvbnN0cnVjdG9yIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IENvbGxpZGVyLCBDb2xsaWRlckFyZ3MgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc3BsYXksIERpc3BsYXlBcmdzIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRW5naW5lLCBFbmdpbmVBcmdzLCBFbmdpbmVDcmVhdGVBcmdzIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiLi9tYXRyaXhcIjtcbmltcG9ydCB7IFBsYXRmb3JtQ29udHJvbGxlciwgUGxhdGZvcm1Db250cm9sbGVyQXJncywgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3JlY3RcIjtcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSBcIi4vcmVnaXN0cnlcIjtcbmltcG9ydCB7IFJlc291cmNlVHlwZSwgUmVzb3VyY2VzIH0gZnJvbSBcIi4vcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBTY2VuZSwgU2NlbmVBcmdzIH0gZnJvbSBcIi4vc2NlbmVzXCI7XG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCIuL3NvdW5kc1wiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQsIFNwcml0ZVNoZWV0QXJncyB9IGZyb20gXCIuL3Nwcml0ZS1zaGVldHNcIjtcbmltcG9ydCB7IFNwcml0ZSwgU3ByaXRlQXJncyB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbmltcG9ydCB7IFRpbGUsIFRpbGVBcmdzLCBUaWxlQ29ybmVycywgVGlsZUVkZ2VzIH0gZnJvbSBcIi4vdGlsZVwiO1xuaW1wb3J0IHsgVGlsZU1hcCB9IGZyb20gXCIuL3RpbGVtYXBcIjtcbmltcG9ydCB7IFRpbWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgeyBSZXNvdXJjZUl0ZW0sIFJlc291cmNlSXRlbUFyZ3MgfSBmcm9tIFwiLi9yZXNvdXJjZXNcIjtcblxuZGVjbGFyZSBjb25zdCB3aW5kb3c6IGFueTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgd2luZG93LkVuZ2luZSA9IEVuZ2luZTtcbiAgd2luZG93LlNwcml0ZVNoZWV0ID0gU3ByaXRlU2hlZXQ7XG4gIHdpbmRvdy5UaWxlID0gVGlsZTtcbiAgd2luZG93LlRpbGVNYXAgPSBUaWxlTWFwO1xuICB3aW5kb3cuUGxheWVyID0gUGxheWVyO1xuICB3aW5kb3cuUGxhdGZvcm1Db250cm9sbGVyID0gUGxhdGZvcm1Db250cm9sbGVyO1xuICB3aW5kb3cuU2NlbmUgPSBTY2VuZTtcbn1cblxuZXhwb3J0IHtcbiAgQ2FtZXJhLFxuICBDYW1lcmFBcmdzLFxuICBDb2xsZWN0aW9uLFxuICBDb2xsaWRlcixcbiAgQ29sbGlkZXJBcmdzLFxuICBDb21wb25lbnQsXG4gIERlYnVnLFxuICBEaXNwbGF5LFxuICBEaXNwbGF5QXJncyxcbiAgRW5naW5lLFxuICBFbmdpbmVBcmdzLFxuICBFbmdpbmVDcmVhdGVBcmdzLFxuICBHYW1lT2JqZWN0LFxuICBJbnB1dCxcbiAgTWF0cml4LFxuICBPYmplY3RDb25zdHJ1Y3RvcixcbiAgUGxhdGZvcm1Db250cm9sbGVyLFxuICBQbGF0Zm9ybUNvbnRyb2xsZXJBcmdzLFxuICBQbGF5ZXIsXG4gIFBvaW50LFxuICBSZWdpc3RyeSxcbiAgUmVzb3VyY2VJdGVtLFxuICBSZXNvdXJjZUl0ZW1BcmdzLFxuICBSZXNvdXJjZVR5cGUsXG4gIFJlc291cmNlcyxcbiAgU2NlbmUsXG4gIFNjZW5lQXJncyxcbiAgU291bmQsXG4gIFNwcml0ZSxcbiAgU3ByaXRlQXJncyxcbiAgU3ByaXRlU2hlZXQsXG4gIFNwcml0ZVNoZWV0QXJncyxcbiAgVGlsZSxcbiAgVGlsZUFyZ3MsXG4gIFRpbGVDb3JuZXJzLFxuICBUaWxlRWRnZXMsXG4gIFRpbGVNYXAsXG4gIFRpbWUsXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9