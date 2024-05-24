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
        return _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(x, 0, this.tileMap.width * this.tileMap.tileWidth - this.engine.display.width);
    }
    clampY(y) {
        return _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(y, 0, this.tileMap.height * this.tileMap.tileHeight - this.engine.display.height);
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
        this.velocityX = _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(this.velocityX, -maxSpeedX, maxSpeedX);
        moveDistanceX += this.velocityX * this.time.deltaTime;
        moveDistanceX = this.controller.checkForWalls(this, moveDistanceX);
        this.x += moveDistanceX;
        this.camera.x += moveDistanceX;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQy9DLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsRUFBRSxHQUFHLHlDQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsR0FBRyx5Q0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxFQUFFLEdBQUcseUNBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxFQUFFLEdBQUcseUNBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxPQUFPO1lBQ0wsRUFBRSxFQUFFLEVBQUU7WUFDTixFQUFFLEVBQUUsRUFBRTtZQUNOLEVB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QUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNkO0FBQzBCO0FBQ2hCO0FBQ1c7QUFDWjtBQUNRO0FBQ2U7QUFDaEM7QUFDRTtBQUM0QztBQUV4QztBQUNnQjtBQUNWO0FBQ1g7QUFDOEI7QUFDaEI7QUFDaUI7QUFDNUI7QUFDTjtBQUMrQjtBQUk3RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsMkNBQU0sQ0FBQztJQUN2QixNQUFNLENBQUMsV0FBVyxHQUFHLHdEQUFXLENBQUM7SUFDakMsTUFBTSxDQUFDLElBQUksR0FBRyx3Q0FBSSxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsOENBQU8sQ0FBQztJQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHLDRDQUFNLENBQUM7SUFDdkIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLHdEQUFrQixDQUFDO0lBQy9DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsMkNBQUssQ0FBQztBQUN2QixDQUFDO0FBeUNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jYW1lcmEudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY29sbGlkZXJzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY29sbGlzaW9ucy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2NvbXBvbmVudHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9kZWJ1Zy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9lbmdpbmUudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9pbnB1dC50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL21hdGhzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvbWF0cml4LnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvb2JqZWN0cy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3BsYXllci50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3JlZ2lzdHJ5LnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvcmVzb3VyY2VzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc2NlbmVzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc291bmRzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc3ByaXRlLXNoZWV0cy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3Nwcml0ZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy90aWxlLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvdGlsZW1hcC50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3RpbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ2VuZ2luZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJnZW5naW5lXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgbWFuYWdpbmcgY2FtZXJhIHBvc2l0aW9uIG9uIHRoZSBzY3JlZW4uXG4gKiBUaGUgQ2FtZXJhIGlzIHRoZSB2aWV3cG9ydCBvZiB0aGUgZ2FtZSwgeW91IHNlZSB0aGUgZ2FtZSB3b3JsZCB0aHJvdWdoIHRoZSBjYW1lcmEuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBDYW1lcmFBcmdzIHtcbiAgLyoqXG4gICAqIHggcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxuICAgKi9cblxuICB4OiBudW1iZXI7XG4gIC8qKlxuICAgKiB5IHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIENhbWVyYSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiB4IHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIHg6IG51bWJlcjtcblxuICAvKipcbiAgICogeSBwb3NpdGlvbiBvZiB0aGUgY2FtZXJhXG4gICAqL1xuICB5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IENhbWVyYUFyZ3MpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICB9XG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wieFwiLCBcInlcIl07XG4gIH1cblxuICBtb3ZlKCk6IHZvaWQge31cbn1cbiIsIi8qKlxuICogQ29sbGVjdGlvbiBhcmUgYSBncm91cCBvZiBpdGVtcyB0aGF0IGNhbiBiZSBvZiBhbnkgdHlwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248VD4ge1xuICBwdWJsaWMgaXRlbXM6IFRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXRlbSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byBhZGQuXG4gICAqL1xuICBhZGQoaXRlbTogVCkge1xuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIHJlbW92ZS5cbiAgICovXG4gIHJlbW92ZShpdGVtOiBUKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBpdGVtcyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICovXG4gIGFsbCgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUZXN0Q29sbGlzaW9uIH0gZnJvbSBcIi4vY29sbGlzaW9uc1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGlkZXJBcmdzIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBwYXJlbnQ6IFNwcml0ZTtcbn1cblxuLyoqXG4gKiBDb2xsaWRlciByZXByZXNlbnRzIGEgcmVjdC9jaXJjbGUgd2hpY2ggY2FuIGNvbGxpZGUgd2l0aCBhbm90aGVyIGNvbGxpZGVyLlxuICogVGhlIHBvc2l0aW9uIG9mIHRoZSBjb2xsaWRlciBpcyByZWxhdGl2ZSB0byBpdHMgcGFyZW50IHNwcml0ZS5cbiAqIEEgc3ByaXRlIGNhbiBoYXZlIFwiaW5maW5pdGVcIiBudW1iZXIgb2YgY29sbGlkZXJzLlxuICovXG5leHBvcnQgY2xhc3MgQ29sbGlkZXIgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHBhcmVudDogU3ByaXRlO1xuICB5OiBudW1iZXI7XG4gIHg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhcmdzOiBDb2xsaWRlckFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgfVxuXG4gIHRlc3QoY29sbGlkZXI6IENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgXCJOb3QgaW1wbGVtZW50ZWRcIjtcbiAgfVxuXG4gIGdldCBneCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQueCArIHRoaXMueDtcbiAgfVxuXG4gIGdldCBneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQueSArIHRoaXMueTtcbiAgfVxuXG4gIGRlYnVnRHJhdyhjb2xvcjogc3RyaW5nID0gXCJyZWRcIikge1xuICAgIHRocm93IFwiTm90IGltcGxlbWVudGVkXCI7XG4gIH1cbn1cbi8qKlxuICogQ2lyY2xlQ29sbGlkZXIgaXMgYSBDb2xsaWRlciB3aXRoIGEgY2lyY3VsYXIgc2hhcGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDaXJjbGVDb2xsaWRlciBleHRlbmRzIENvbGxpZGVyIHtcbiAgcmFkaXVzOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogQ29sbGlkZXJBcmdzKSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLndpZHRoIC8gMjtcbiAgfVxuXG4gIHRlc3QoY29sbGlkZXI6IENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgIHJldHVybiBUZXN0Q29sbGlzaW9uLkNpcmNsZVZzQ2lyY2xlKHRoaXMsIGNvbGxpZGVyKTtcbiAgICB9XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgUmVjdENvbGxpZGVyKSB7XG4gICAgICByZXR1cm4gVGVzdENvbGxpc2lvbi5DaXJjbGVWc1JlY3QodGhpcywgY29sbGlkZXIpO1xuICAgIH1cbiAgICB0aHJvdyBcIlVua25vd24gY29sbGlkZXJcIjtcbiAgfVxuXG4gIGRlYnVnRHJhdyhjb2xvcjogc3RyaW5nID0gXCJyZWRcIikge1xuICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnBhcmVudC5jb21wb25lbnRzLmdldChEaXNwbGF5KTtcbiAgICBpZiAoIWRpc3BsYXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGxheS5jaXJjbGUodGhpcy5neCwgdGhpcy5neSwgdGhpcy5yYWRpdXMsIGNvbG9yKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlY3RDb2xsaWRlciBpcyBhIGNvbGxpZGVyIG9mIHJlY3Rhbmd1bGFyIHNoYXBlLlxuICovXG5leHBvcnQgY2xhc3MgUmVjdENvbGxpZGVyIGV4dGVuZHMgQ29sbGlkZXIge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHBhcmVudDogU3ByaXRlO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29sbGlkZXJBcmdzKSB7XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgfVxuXG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wieFwiLCBcInlcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXTtcbiAgfVxuXG4gIHRlc3QoY29sbGlkZXI6IENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgIHJldHVybiBUZXN0Q29sbGlzaW9uLkNpcmNsZVZzUmVjdChjb2xsaWRlciwgdGhpcyk7XG4gICAgfVxuICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIFJlY3RDb2xsaWRlcikge1xuICAgICAgcmV0dXJuIFRlc3RDb2xsaXNpb24uUmVjdFZzUmVjdCh0aGlzLCBjb2xsaWRlcik7XG4gICAgfVxuXG4gICAgRGVidWcuZXJyb3IoXCJVbmtub3duIGNvbGxpZGVyIFwiICsgdHlwZW9mIGNvbGxpZGVyKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWJ1Z0RyYXcoY29sb3I6IHN0cmluZyA9IFwicmVkXCIpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5wYXJlbnQuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gICAgaWYgKCFkaXNwbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BsYXkucmVjdCh0aGlzLmd4LCB0aGlzLmd5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgY29sb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaXJjbGVDb2xsaWRlciwgUmVjdENvbGxpZGVyIH0gZnJvbSBcIi4vY29sbGlkZXJzXCI7XG5cbi8qKlxuICogQSBjbGFzcyB3aXRoIHN0YXRpYyBtZXRob2RzIHdoaWNoIHRlc3QgZm9yIGNvbGxpc2lvbiBiZXR3ZWVuIGRpZmZlcmVudFxuICogdHlwZXMgb2YgY29sbGlkZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVGVzdENvbGxpc2lvbiB7XG4gIHN0YXRpYyBDaXJjbGVWc1JlY3QoY2lyY2xlOiBDaXJjbGVDb2xsaWRlciwgcmVjdDogUmVjdENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgbGV0IGhhbGZSZWN0V2lkdGggPSByZWN0LndpZHRoIC8gMjtcbiAgICBsZXQgaGFsZlJlY3RIZWlnaHQgPSByZWN0LmhlaWdodCAvIDI7XG4gICAgbGV0IGhhbGZEaXN0WCA9IE1hdGguYWJzKGNpcmNsZS5neCAtIHJlY3QuZ3ggLSBoYWxmUmVjdFdpZHRoKTtcbiAgICBsZXQgaGFsZkRpc3RZID0gTWF0aC5hYnMoY2lyY2xlLmd5IC0gcmVjdC5neSAtIGhhbGZSZWN0SGVpZ2h0KTtcbiAgICBpZiAoaGFsZkRpc3RYID4gaGFsZlJlY3RXaWR0aCArIGNpcmNsZS5yYWRpdXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaGFsZkRpc3RZID4gaGFsZlJlY3RIZWlnaHQgKyBjaXJjbGUucmFkaXVzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGhhbGZEaXN0WCA8PSBoYWxmUmVjdFdpZHRoKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaGFsZkRpc3RZIDw9IGhhbGZSZWN0SGVpZ2h0KSByZXR1cm4gdHJ1ZTtcbiAgICAvL2Nvcm5lciBjb2xsaXNpb25cbiAgICBsZXQgZHggPSBoYWxmRGlzdFggLSBoYWxmUmVjdFdpZHRoO1xuICAgIGxldCBkeSA9IGhhbGZEaXN0WSAtIGhhbGZSZWN0SGVpZ2h0O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeSA8PSBNYXRoLnBvdyhjaXJjbGUucmFkaXVzLCAyKTtcbiAgfVxuXG4gIHN0YXRpYyBSZWN0VnNDaXJjbGUocmVjdDogUmVjdENvbGxpZGVyLCBjaXJjbGU6IENpcmNsZUNvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuQ2lyY2xlVnNSZWN0KGNpcmNsZSwgcmVjdCk7XG4gIH1cblxuICBzdGF0aWMgUmVjdFZzUmVjdChyZWN0MTogUmVjdENvbGxpZGVyLCByZWN0MjogUmVjdENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgcmVjdDEuZ3ggPD0gcmVjdDIuZ3ggKyByZWN0Mi53aWR0aCAmJlxuICAgICAgcmVjdDEuZ3ggKyByZWN0MS53aWR0aCA+IHJlY3QyLmd4ICYmXG4gICAgICByZWN0MS5neSA8PSByZWN0Mi5neSArIHJlY3QyLmhlaWdodCAmJlxuICAgICAgcmVjdDEuaGVpZ2h0ICsgcmVjdDEuZ3kgPj0gcmVjdDIuZ3lcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgQ2lyY2xlVnNDaXJjbGUoXG4gICAgY2lyY2xlMTogQ2lyY2xlQ29sbGlkZXIsXG4gICAgY2lyY2xlMjogQ2lyY2xlQ29sbGlkZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgbGV0IGR4ID0gY2lyY2xlMS5neCAtIGNpcmNsZTIuZ3g7XG4gICAgbGV0IGR5ID0gY2lyY2xlMS5neSAtIGNpcmNsZTIuZ3k7XG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICBpZiAoZGlzdGFuY2UgPCBjaXJjbGUxLndpZHRoIC8gMiArIGNpcmNsZTIud2lkdGggLyAyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IE9iamVjdENvbnN0cnVjdG9yLCBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tIFwiLi9yZWdpc3RyeVwiO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBiYXNlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQgb2YgdGhlIGVuZ2luZS5cbiAqIFRoZSBlbmdpbmUgY29uc2lzdCBvZiBtdWx0aXBsZSBjb21wb25lbnRzIHdoaWNoIHBlcmZvcm0gdmFyaW91cyB0YXNrcy5cbiAqIFNvbWUgQ29tcG9uZW50cyBmb3JtIHBhcnQgb2YgdGhlIGNvcmUgb2YgdGhlIEVuZ2luZSwgb3RoZXJzIGNvdWxkIGJlIGFkZGVkIGFzIG5lZWQgYXQgcnVudGltZS5cbiAqIFdoZW4gdGhlIEVuZ2luZSBpcyByZWFkeSwgaXQgd2lsbCBjcmVhdGUgdGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgYW5kIHBhc3MgaXRzZWxmIGFzIHRoZSBlbmdpbmUgcGFyYW1ldGVyLlxuICogRWFjaCBDb21wb25lbnQgaW5zdGFuY2UgaGFzIGFjY2VzcyB0byB0aGUgZW5naW5lXG4gKiBAcGFyYW0ge29iamVjdH0gZW5naW5lIFRoZSBpbnN0YW5jZSBvZiB0aGUgZW5naW5lLCB0aGlzIHdpbGwgYmUgcGFzc2VkIGJ5IHRoZSBlbmdpbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgT2JqZWN0IGxpdGVyYWwgd2l0aCBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGUgY29tcG9uZW50IGNvbnN0cnVjdGVkXG4gKi9cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIEdhbWVPYmplY3Qge1xuICBlbmdpbmU6IEVuZ2luZTtcbiAgbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGVuZ2luZSBhbmQgaXMgcmVhZHlcbiAgICovXG4gIGluaXQoKSB7XG4gICAgRGVidWcuc3VjY2VzcyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGluaXRpYWxpemVkYCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBlYWNoIGN5Y2xlIG9mIHRoZSBlbmdpbmUgZ2FtZSBsb29wXG4gICAqL1xuICBtb3ZlKCk6IHZvaWQge31cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBlYWNoIGN5Y2xlIG9mIHRoZSBlbmdpbmUgZ2FtZSBsb29wXG4gICAqL1xuICBkcmF3KCk6IHZvaWQge31cblxuICAvKipcbiAgICogRW5naW5lcyBjb21wb25lbnQgcmVnaXN0cnlcbiAgICovXG4gIGdldCBjb21wb25lbnRzKCk6IFJlZ2lzdHJ5IHtcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUucmVnaXN0cnk7XG4gIH1cbn1cbiIsIi8qKlxuICogQ2xhc3Mgd2l0aCBzdGF0aWMgbWV0aG9kcyB0byBmYWNpbGl0YXRlIHRoZSBtZXNzYWdlcyBvbiB0aGUgamF2YXNjcmlwdCBjb25zb2xlLlxuICogQWxsIHRoZSBtZXRob2RzIG9mIERlYnVnIGNsYXNzIHdpbGwgb25seSBydW4gaWYgdGhlIGRlYnVnIG1vZGUgaXMgb24uXG4gKiBUbyBhY3RpdmF0ZSB0aGUgZGVidWcgbW9kZSwgZGVjbGFyZSBhIGdsb2JhbCB2YXJpYWJsZSBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBlbmdpbmVcbiAqIHdpdGggdGhlIG5hbWU6IEdFTkdJTkVfREVCVUdfTU9ERSA9IHRydWUuXG4gKiBJZiB0aGUgZGVidWcgbW9kZSBpcyBvZmYsIG5vIG1lc3NhZ2VzIHdvdWxkIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUuXG4gKi9cblxuZGVjbGFyZSBjb25zdCBHRU5HSU5FX0RFQlVHX01PREU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBjbGFzcyBEZWJ1ZyB7XG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBJZiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICovXG4gIHN0YXRpYyBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBHRU5HSU5FX0RFQlVHX01PREUgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgbWVzc2FnZSB0byB0aGUgY29uc29sZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGxvZyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS50cmFjZSgpO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIGluZm8gbWVzc2FnZSB0byB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGluZm8obWVzc2FnZTogc3RyaW5nKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSBzdWNjZXNzIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgd2hlbiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICovXG4gIHN0YXRpYyBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmluZm8obWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIHdoZW4gdGhlIGRlYnVnIG1vZGUgaXMgYWN0aXZlXG4gICAqL1xuICBzdGF0aWMgd2FybihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGFuIGVycm9yIG1lc3NhZ2Ugd2hlbiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICovXG4gIHN0YXRpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBhIGdyb3VwIG9mIG1lc3NhZ2VzIGluIHRoZSBjb25zb2xlXG4gICAqIEBwYXJhbSBuYW1lIG9mIHRoZSBncm91cFxuICAgKi9cbiAgc3RhdGljIGdyb3VwU3RhcnQobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRW5kIGEgZ3JvdXAgb2YgbWVzc2FnZXMgaW4gdGhlIGNvbnNvbGVcbiAgICovXG4gIHN0YXRpYyBncm91cEVuZCgpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGF0IHRoZSBvYmplY3QgbGl0ZXJhbCBvZiB0aGUgY29uc3RydWN0b3IgaGFzIHRoZSBlbGVtZW50cyBvZiB0aGUgcmVxdWlyZWQgYXJyYXlcbiAgICogQHBhcmFtIG1ldGhvZCBPYmplY3QgbWV0aG9kIG5hbWVcbiAgICogQHBhcmFtIGFyZ3MgdGhlIGFyZ3VtZW50cyBvYmplY3QgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSByZXF1aXJlZCBsaXN0IG9mIHJlcXVpcmVkIG1lbWJlcnMgaW4gdGhlIGNvbnN0cnVjdG9yIGFyZ3VtZW50c1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIHZhbGlkYXRlUGFyYW1zKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgcmVxdWlyZWQ6IHN0cmluZ1tdXG4gICkge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoIXJlcXVpcmVkIHx8ICFyZXF1aXJlZC5sZW5ndGgpIHJldHVybjtcbiAgICBpZiAocmVxdWlyZWQubGVuZ3RoICYmICFhcmdzKSB7XG4gICAgICBEZWJ1Zy53YXJuKFxuICAgICAgICBgJHttZXRob2R9IHJlcXVpcmVzIHRoaXMgbWVtYmVycyBpbiB0aGUgY29uc3RydWN0b3I6IHske3JlcXVpcmVkLmpvaW4oXG4gICAgICAgICAgXCIsXCJcbiAgICAgICAgKX19YFxuICAgICAgKTtcbiAgICB9XG4gICAgZm9yIChsZXQga2V5IG9mIHJlcXVpcmVkKSB7XG4gICAgICBpZiAodHlwZW9mIGFyZ3Nba2V5XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBEZWJ1Zy5lcnJvcihgJHttZXRob2R9IHJlcXVpcmVzIG9mIFwiJHtrZXl9XCIgaW4gdGhlIGNvbnN0cnVjdG9yYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRzXCI7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3Mgb2YgdGhlIERpc3BsYXkgY29tcG9uZW50IG9mIHRoZSBFbmdpbmUuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEaXNwbGF5QWJzdHJhY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gIH1cblxuICBjbGVhcigpIHt9XG5cbiAgZmlsbFJlY3QoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGNvbG9yOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7fVxuXG4gIGNpcmNsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgZGlhbWV0ZXI6IG51bWJlciwgY29sb3I6IHN0cmluZykge31cblxuICBtb3ZlKCk6IHZvaWQge31cbn1cblxuLyoqXG4gKiBDbGFzcyBvZiB0aGUgRGlzcGxheSBjb21wb25lbnQgb2YgdGhlIEVuZ2luZS5cbiAqIFRoZSBEaXNwbGF5IGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIHRoZSBnYW1lIG9iamVjdHMgb24gdGhlIHNjcmVlbi5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXlBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpbWFnZSBzbW9vdGhpbmcgaXMgZW5hYmxlZFxuICAgKi9cbiAgaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5IGV4dGVuZHMgRGlzcGxheUFic3RyYWN0IHtcbiAgLyoqXG4gICAqIFRoZSBjYW52YXMgZWxlbWVudFxuICAgKi9cbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAvKipcbiAgICogVGhlIGNhbnZhcyByZW5kZXJpbmcgY29udGV4dFxuICAgKi9cbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjYW1lcmEgb2YgdGhlIGRpc3BsYXlcbiAgICovXG4gIGNhbWVyYTogQ2FtZXJhO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGRpc3BsYXlcbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXlcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgaW1hZ2Ugc21vb3RoaW5nIGlzIGVuYWJsZWRcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGlzSW1hZ2VTbW9vdGhpbmdFbmFibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBEaXNwbGF5QXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBgJHt0aGlzLndpZHRofWApO1xuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBgJHt0aGlzLmhlaWdodH1gKTtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcIm5vbmVcIjtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmN0eC5mb250ID0gXCIxMnB4IEhlbHZldGljYVwiO1xuICAgIHRoaXMuY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KENhbWVyYSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciB0aGUgZGlzcGxheVxuICAgKi9cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW1wiaWRcIiwgXCJ4XCIsIFwieVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCJdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgZGVmYXVsdCBvcHRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgZGlzcGxheVxuICAgKi9cbiAgY29uZmlnKCk6IFBhcnRpYWw8RGlzcGxheUFyZ3M+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiMwRkZcIjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBmaWxsUmVjdChcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgY29sb3I6IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmN0eC5yZWN0KC10aGlzLmNhbWVyYS54ICsgeCwgLXRoaXMuY2FtZXJhLnkgKyB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gIH1cblxuICByZWN0KFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmN0eC5yZWN0KC10aGlzLmNhbWVyYS54ICsgeCwgLXRoaXMuY2FtZXJhLnkgKyB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIGNpcmNsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgZGlhbWV0ZXI6IG51bWJlciwgY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYyhcbiAgICAgIC10aGlzLmNhbWVyYS54ICsgeCxcbiAgICAgIC10aGlzLmNhbWVyYS55ICsgeSxcbiAgICAgIGRpYW1ldGVyIC8gMixcbiAgICAgIDAsXG4gICAgICAyICogTWF0aC5QSSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgdGV4dCh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGltYWdlIFRoZSBpbWFnZSB0byBkcmF3XG4gICAqIEBwYXJhbSBzeCBUaGUgeCBjb29yZGluYXRlIHdoZXJlIHRvIHN0YXJ0IGNsaXBwaW5nXG4gICAqIEBwYXJhbSBzeSBUaGUgeSBjb29yZGluYXRlIHdoZXJlIHRvIHN0YXJ0IGNsaXBwaW5nXG4gICAqIEBwYXJhbSBzV2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjbGlwcGVkIGltYWdlXG4gICAqIEBwYXJhbSBzSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNsaXBwZWQgaW1hZ2VcbiAgICogQHBhcmFtIGR4IFRoZSB4IGNvb3JkaW5hdGUgd2hlcmUgdG8gcGxhY2UgdGhlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIGR5IFRoZSB5IGNvb3JkaW5hdGUgd2hlcmUgdG8gcGxhY2UgdGhlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIGRXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGltYWdlIHRvIHVzZVxuICAgKiBAcGFyYW0gZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBpbWFnZSB0byB1c2VcbiAgICovXG4gIGRyYXdJbWFnZShcbiAgICBpbWFnZTogQ2FudmFzSW1hZ2VTb3VyY2UsXG4gICAgc3g6IG51bWJlcixcbiAgICBzeTogbnVtYmVyLFxuICAgIHNXaWR0aDogbnVtYmVyLFxuICAgIHNIZWlnaHQ6IG51bWJlcixcbiAgICBkeDogbnVtYmVyLFxuICAgIGR5OiBudW1iZXIsXG4gICAgZFdpZHRoOiBudW1iZXIsXG4gICAgZEhlaWdodDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geCBUaGUgeCBjb29yZGluYXRlIHdoZXJlIHRvIHBsYWNlIHRoZSB0aWxlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIHkgVGhlIHkgY29vcmRpbmF0ZSB3aGVyZSB0byBwbGFjZSB0aGUgdGlsZSBpbWFnZSBvbiB0aGUgY2FudmFzXG4gICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIHRpbGUgaW1hZ2UgdG8gdXNlXG4gICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgdGlsZSBpbWFnZSB0byB1c2VcbiAgICogQHBhcmFtIHNoZWV0IFRoZSBzcHJpdGUgc2hlZXQgdG8gdXNlXG4gICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGltYWdlIHRvIHVzZSB3aXRoaW4gdGhlIHNwcml0ZSBzaGVldFxuICAgKi9cbiAgZHJhd1RpbGUoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHNoZWV0OiBTcHJpdGVTaGVldCxcbiAgICBpbmRleDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGxldCB0aWxlID0gc2hlZXQudGlsZXNbaW5kZXhdO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgIHNoZWV0LmltYWdlLFxuICAgICAgdGlsZS54LFxuICAgICAgdGlsZS55LFxuICAgICAgc2hlZXQud2lkdGgsXG4gICAgICBzaGVldC5oZWlnaHQsXG4gICAgICB4IC0gdGhpcy5jYW1lcmEueCxcbiAgICAgIHkgLSB0aGlzLmNhbWVyYS55LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHRcbiAgICApO1xuICAgIGlmIChEZWJ1Zy5hY3RpdmUoKSkge1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjRjBGXCI7XG4gICAgICB0aGlzLmN0eC5mb250ID0gXCIxOHB4IEFyaWFsXCI7XG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgYCR7aW5kZXggKyAxfWAsXG4gICAgICAgIHggLSB0aGlzLmNhbWVyYS54ICsgd2lkdGggLyAyLFxuICAgICAgICB5IC0gdGhpcy5jYW1lcmEueSArIGhlaWdodCAvIDJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjRjAwXCI7XG4gICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgMTAsIDEwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4vY2FtZXJhXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSBcIi4vY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IE9iamVjdENvbnN0cnVjdG9yIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tIFwiLi9yZWdpc3RyeVwiO1xuaW1wb3J0IHsgUmVzb3VyY2VJdGVtQXJncywgUmVzb3VyY2VzIH0gZnJvbSBcIi4vcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuL3NjZW5lc1wiO1xuaW1wb3J0IHsgU291bmQgfSBmcm9tIFwiLi9zb3VuZHNcIjtcbmltcG9ydCB7IFRpbGVNYXAgfSBmcm9tIFwiLi90aWxlbWFwXCI7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSBcIi4vdGltZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVuZ2luZUFyZ3Mge1xuICBjYW52YXM6IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5naW5lQ3JlYXRlQXJncyB7XG4gIGNhbnZhczogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgcmVzb3VyY2VzOiBSZXNvdXJjZUl0ZW1BcmdzW107XG4gIGdhbWU6IChlbmdpbmU6IEVuZ2luZSkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBFbmdpbmUgaXMgdGhlIG1haW4gb2JqZWN0IG9mIHRoZSBnYW1lIGVuZ2luZS5cbiAqIEVuZ2luZSBjb25zaXN0IG9mIGEgZ3JvdXAgb2YgZGlmZmVyZW50IGNvbXBvbmVudHMgd2hpY2ggbWFuYWdlIGRpZmZlcmVudCB0YXNrcy5cbiAqIEVhY2ggY29tcG9uZW50IGlzIGEgbGVnbyBwaWVjZSwgYW5kIHRoZSBlbmdpbmUgaXMgdGhlIGdsdWUgd2hpY2ggYmluZHMgdGhlbSB0b2dldGhlci5cbiAqIE9uY2UgdGhlIGRvY3VtZW50IGlzIHJlYWR5LCBFbmdpbmUgd2lsbCBpbml0aWFsaXplIGVhY2ggY29tcG9uZW50IGFkZGVkXG4gKiBpbnRvIGl0LCBjYWxsIHRoZSBwcmVsb2FkZXIgbWV0aG9kLCBleGVjdXRlIHRoZSBnYW1lIGNyZWF0aW9uIGZ1bmN0aW9uXG4gKiBhbmQgdGhlbiBzdGFydCBleGVjdXRpbmcgdGhlIGdhbWUgbG9vcC5cbiAqL1xuZXhwb3J0IGNsYXNzIEVuZ2luZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGVuZ2luZTogRW5naW5lO1xuICAvLyBUT0RPIHJlbW92ZSB0aWxlIG1hcCBmcm9tIGVuZ2luZVxuICB0aWxlTWFwOiBUaWxlTWFwO1xuICByZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuICBzY2VuZXMgPSBuZXcgQ29sbGVjdGlvbjxTY2VuZT4oKTtcbiAgdGltZTogVGltZTtcbiAgZGlzcGxheTogRGlzcGxheTtcbiAgcmVzb3VyY2VzOiBSZXNvdXJjZXM7XG4gIGNhbWVyYTogQ2FtZXJhO1xuICBzb3VuZDogU291bmQ7XG4gIGlucHV0OiBJbnB1dDtcbiAgZnBzRGVsYXlDb3VudCA9IDA7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IEVuZ2luZUFyZ3MpIHtcbiAgICBzdXBlcih1bmRlZmluZWQsIGFyZ3MpO1xuICAgIHRoaXMuZW5naW5lID0gdGhpcztcbiAgICBEZWJ1Zy5ncm91cFN0YXJ0KFwiRW5naW5lIGxvYWRlZCBjb21wb25lbnRzXCIpO1xuICAgIHRoaXMucmVzb3VyY2VzID0gdGhpcy5hZGRDb21wb25lbnQoUmVzb3VyY2VzKTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuYWRkQ29tcG9uZW50KENhbWVyYSwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfSk7XG4gICAgdGhpcy50aW1lID0gdGhpcy5hZGRDb21wb25lbnQoVGltZSk7XG4gICAgdGhpcy5zb3VuZCA9IHRoaXMuYWRkQ29tcG9uZW50KFNvdW5kKTtcbiAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLmFkZENvbXBvbmVudChEaXNwbGF5LCB7XG4gICAgICBpZDogXCJjYW52YXNcIixcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgIH0pO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmFkZENvbXBvbmVudChJbnB1dCk7XG4gICAgRGVidWcuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wiY2FudmFzXCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIGZ1bmN0aW9uIHRvIHJlcGxhY2UgdGhlIHdpbmRvd3Mub25sb2FkIG1ldGhvZC5cbiAgICogT25jZSB0aGUgd2luZG93IGlzIHJlYWR5LCBlbmdpbmUgd2lsbCBpbml0aWFsaXplIGl0cyBjb21wb25lbnRzLCBleGVjdXRlXG4gICAqIHRoZSBwcmVsb2FkZXIgYW5kIHdoZW4gcHJlbG9hZGVyIGxvYWRlZCBhbGwgdGhlIHJlc291cmNlcywgY3JlYXRlIHRoZSBnYW1lXG4gICAqIGFuZCBleGVjdXRlIHRoZSBnYW1lbG9vcC5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGUoYXJnczogRW5naW5lQ3JlYXRlQXJncykge1xuICAgIERlYnVnLnZhbGlkYXRlUGFyYW1zKFwiRW5naW5lLmNyZWF0ZVwiLCBhcmdzLCBbXG4gICAgICBcImNhbnZhc1wiLFxuICAgICAgXCJ3aWR0aFwiLFxuICAgICAgXCJoZWlnaHRcIixcbiAgICAgIFwicmVzb3VyY2VzXCIsXG4gICAgICBcImdhbWVcIixcbiAgICBdKTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZW5naW5lID0gbmV3IEVuZ2luZSh7XG4gICAgICAgICAgY2FudmFzOiBhcmdzLmNhbnZhcyxcbiAgICAgICAgICB3aWR0aDogYXJncy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGFyZ3MuaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZSBvZiBhcmdzLnJlc291cmNlcykge1xuICAgICAgICAgIGVuZ2luZS5yZXNvdXJjZXMuYWRkKHJlc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBlbmdpbmUucmVzb3VyY2VzLnByZWxvYWQoKTtcbiAgICAgICAgZW5naW5lLmluaXQoKTtcbiAgICAgICAgYXJncy5nYW1lKGVuZ2luZSk7XG4gICAgICAgIGVuZ2luZS5nYW1lTG9vcCgpO1xuICAgICAgICAod2luZG93IGFzIGFueSlbXCJnZW5naW5lXCJdID0gZW5naW5lO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY29tcG9uZW50IHRvIHRoZSBlbmdpbmUuXG4gICAqIEBwYXJhbSBDb25zdHJ1Y3RvciBUaGUgY29uc3RydWN0b3Igb2YgdGhlIGNvbXBvbmVudCB0byBzdG9yZS5cbiAgICogQHBhcmFtIGFyZ3MgIHRvIGluaXRpYWxpemUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGFkZENvbXBvbmVudChDb25zdHJ1Y3RvcjogT2JqZWN0Q29uc3RydWN0b3I8YW55PiwgYXJnczogYW55ID0ge30pIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBhcmdzKTtcbiAgICB0aGlzLmNvbXBvbmVudHMuc2V0KENvbnN0cnVjdG9yLCBpbnN0YW5jZSk7XG4gICAgaW5zdGFuY2UuaW5pdCgpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgY29tcG9uZW50IG9mIHRoaXMucmVnaXN0cnkudmFsdWVzPENvbXBvbmVudD4oKSkge1xuICAgICAgY29tcG9uZW50Lm1vdmUoKTtcbiAgICB9XG4gICAgZm9yIChsZXQgc2NlbmUgb2YgdGhpcy5zY2VuZXMuYWxsKCkpIHtcbiAgICAgIGlmIChzY2VuZS5pc0FjdGl2ZSkge1xuICAgICAgICBzY2VuZS5tb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXkuY2xlYXIoKTtcbiAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgdGhpcy5yZWdpc3RyeS52YWx1ZXM8Q29tcG9uZW50PigpKSB7XG4gICAgICBjb21wb25lbnQuZHJhdygpO1xuICAgIH1cbiAgICBmb3IgKGxldCBzY2VuZSBvZiB0aGlzLnNjZW5lcy5hbGwoKSkge1xuICAgICAgaWYgKHNjZW5lLmlzVmlzaWJsZSkge1xuICAgICAgICBzY2VuZS5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChEZWJ1Zy5hY3RpdmUoKSAmJiB0aGlzLmlucHV0Lm1vdXNlLmlzSW5zaWRlKSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2lyY2xlKFxuICAgICAgICB0aGlzLmNhbWVyYS54ICsgdGhpcy5pbnB1dC5tb3VzZS54IC0gMSxcbiAgICAgICAgdGhpcy5jYW1lcmEueSArIHRoaXMuaW5wdXQubW91c2UueSAtIDEsXG4gICAgICAgIDYsXG4gICAgICAgIFwicmVkXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gICAgdGhpcy5tb3ZlKCk7XG4gICAgdGhpcy5mcHNEZWxheUNvdW50ID0gMDtcbiAgICB0aGlzLmRyYXcoKTtcbiAgICB0aGlzLmRlYnVnSW5mbygpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcCk7XG4gIH07XG5cbiAgZGVidWdJbmZvKCkge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICB0aGlzLmRpc3BsYXkudGV4dCh0aGlzLnRpbWUudGltZS50b0ZpeGVkKDIpLCAyMCwgMjApO1xuICAgIHRoaXMuZGlzcGxheS50ZXh0KHRoaXMudGltZS5kZWx0YVRpbWUudG9GaXhlZCg0KSwgMjAsIDQwKTtcbiAgICB0aGlzLmRpc3BsYXkudGV4dCh0aGlzLnRpbWUuZnBzLnRvRml4ZWQoMiksIDIwLCA2MCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKipcbiAqIElucHV0IGNsYXNzIHRvIGhhbmRsZSB0aGUgdXNlciBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogQ2FtZXJhIGNvbXBvbmVudFxuICAgKi9cbiAgY2FtZXJhOiBDYW1lcmE7XG5cbiAgLyoqXG4gICAqIEtleSBjb2Rlc1xuICAgKi9cbiAga2V5Q29kZV86IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xuXG4gIC8qKlxuICAgKiBNb3VzZSBjb29yZGluYXRlc1xuICAgKi9cbiAgbW91c2U6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IGlzSW5zaWRlOiBib29sZWFuIH07XG5cbiAgLyoqXG4gICAqIFRpbGUgaW5wdXQgZWxlbWVudFxuICAgKi9cbiAgdGlsZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lKSB7XG4gICAgc3VwZXIoZW5naW5lLCB7fSk7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KENhbWVyYSk7XG4gICAgdGhpcy5rZXlDb2RlXyA9IHt9O1xuICAgIHRoaXMubW91c2UgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIGlzSW5zaWRlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlsZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGxldCBjYW52YXMgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpLmNhbnZhcztcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5tb3VzZU1vdmUoZXZlbnQpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5tb3VzZURvd24oZXZlbnQpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4gdGhpcy5tb3VzZUVudGVyKCkpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB0aGlzLm1vdXNlTGVhdmUoKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5tb3VzZUNsaWNrKGV2ZW50KSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudDogYW55KSA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50OiBhbnkpID0+IHRoaXMua2V5VXAoZXZlbnQpKTtcbiAgfVxuXG4gIHByaXZhdGUgbW91c2VNb3ZlKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBsZXQgcmVjdCA9IHRoaXMuZW5naW5lLmRpc3BsYXkuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMubW91c2UueCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgdGhpcy5tb3VzZS55ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgIGlmIChldmVudC5idXR0b25zID09PSAyKSB7XG4gICAgICB0aGlzLmNhbWVyYS54IC09IGV2ZW50Lm1vdmVtZW50WDtcbiAgICAgIHRoaXMuY2FtZXJhLnkgLT0gZXZlbnQubW92ZW1lbnRZO1xuICAgIH1cbiAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIGxldCB4ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWCh0aGlzLm1vdXNlLnggKyB0aGlzLmNhbWVyYS54KTtcbiAgICAgIGxldCB5ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWSh0aGlzLm1vdXNlLnkgKyB0aGlzLmNhbWVyYS55KTtcbiAgICAgIHRoaXMuZW5naW5lLnRpbGVNYXAuc2V0KHgsIHksIHBhcnNlSW50KHRoaXMudGlsZUlucHV0LnZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZUVudGVyKCkge1xuICAgIHRoaXMubW91c2UuaXNJbnNpZGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZUxlYXZlKCkge1xuICAgIHRoaXMubW91c2UuaXNJbnNpZGUgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgbW91c2VDbGljayhldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgIGxldCB4ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWCh0aGlzLm1vdXNlLnggKyB0aGlzLmNhbWVyYS54KTtcbiAgICAgIGxldCB5ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWSh0aGlzLm1vdXNlLnkgKyB0aGlzLmNhbWVyYS55KTtcbiAgICAgIHRoaXMudGlsZUlucHV0LnZhbHVlID0gYCR7dGhpcy5lbmdpbmUudGlsZU1hcC5nZXQoeCwgeSl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHggPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVYKHRoaXMubW91c2UueCArIHRoaXMuY2FtZXJhLngpO1xuICAgICAgbGV0IHkgPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVZKHRoaXMubW91c2UueSArIHRoaXMuY2FtZXJhLnkpO1xuICAgICAgdGhpcy5lbmdpbmUudGlsZU1hcC5zZXQoeCwgeSwgcGFyc2VJbnQodGhpcy50aWxlSW5wdXQudmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdXNlRG93bihldmVudDogUG9pbnRlckV2ZW50KTogdm9pZCB7fVxuXG4gIHByaXZhdGUgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5rZXlDb2RlX1tldmVudC5jb2RlXSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGtleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5rZXlDb2RlX1tldmVudC5jb2RlXSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGtleURvd24oY29kZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5rZXlDb2RlX1tjb2RlXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRYQXhpcygpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5rZXlEb3duKFwiQXJyb3dMZWZ0XCIpID8gLTEgOiAwO1xuICAgIHJlc3VsdCArPSB0aGlzLmtleURvd24oXCJBcnJvd1JpZ2h0XCIpID8gMSA6IDA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRZQXhpcygpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5rZXlEb3duKFwiQXJyb3dVcFwiKSA/IC0xIDogMDtcbiAgICByZXN1bHQgKz0gdGhpcy5rZXlEb3duKFwiQXJyb3dEb3duXCIpID8gMSA6IDA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuL3JlY3RcIjtcblxuZXhwb3J0IGNsYXNzIE1hdGhzIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gY2xhbXBcbiAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgKiBAcGFyYW0gbWF4IHRoZSBtYXhpbXVtIHZhbHVlXG4gICAqIEByZXR1cm5zIHRoZSBjbGFtcGVkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgY2xhbXAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmVhciBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHR3byB2YWx1ZXNcbiAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgKiBAcGFyYW0gbWF4IHRoZSBtYXhpbXVtIHZhbHVlXG4gICAqIEBwYXJhbSB0IHRoZSB0aW1lIHZhbHVlXG4gICAqIEByZXR1cm5zIHRoZSBsZXJwZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBsZXJwKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG1pbiArIChtYXggLSBtaW4pICogdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiB0d28gdmFsdWVzXG4gICAqIEBwYXJhbSBtaW4gdGhlIG1pbmltdW0gdmFsdWVcbiAgICogQHBhcmFtIG1heCB0aGUgbWF4aW11bSB2YWx1ZVxuICAgKiBAcmV0dXJucyB0aGUgcmFuZG9tIG51bWJlclxuICAgKi9cbiAgc3RhdGljIHJhbmQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIHJlY3RhbmdsZXMgaW50ZXJzZWN0XG4gICAqIEBwYXJhbSByZWN0MVxuICAgKiBAcGFyYW0gcmVjdDJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgcmVjdGFuZ2xlcyBpbnRlcnNlY3RcbiAgICovXG4gIHN0YXRpYyBSZWN0SW50ZXJzZWN0KHJlY3QxOiBSZWN0LCByZWN0MjogUmVjdCkge1xuICAgIGlmIChcbiAgICAgIHJlY3QxLnggPD0gcmVjdDIueCArIHJlY3QyLndpZHRoICYmXG4gICAgICByZWN0MS54ICsgcmVjdDEud2lkdGggPiByZWN0Mi54ICYmXG4gICAgICByZWN0MS55IDw9IHJlY3QyLnkgKyByZWN0Mi5oZWlnaHQgJiZcbiAgICAgIHJlY3QxLmhlaWdodCArIHJlY3QxLnkgPj0gcmVjdDIueVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWF0aHMgfSBmcm9tIFwiLi9tYXRoc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYXRyaXggd2l0aCBhIGZpeGVkIHdpZHRoIGFuZCBoZWlnaHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRyaXgge1xuICBhcnJheTogVWludDE2QXJyYXk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTWF0cml4IGluc3RhbmNlLlxuICAgKiBAcGFyYW0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSBtYXRyaXguXG4gICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgbWF0cml4LlxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuYXJyYXkgPSBuZXcgVWludDE2QXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIG1hdHJpeC5cbiAgICogQHBhcmFtIHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB5IFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICovXG4gIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFycmF5W3kgKiB0aGlzLndpZHRoICsgeF07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgbWF0cml4LlxuICAgKiBAcGFyYW0geCBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHkgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgKi9cbiAgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5hcnJheVt5ICogdGhpcy53aWR0aCArIHhdID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIG1hdHJpeCB3aXRoIHRoZSBzcGVjaWZpZWQgYXJyYXkgb2YgdmFsdWVzLlxuICAgKiBAcGFyYW0gYXJyYXkgVGhlIGFycmF5IG9mIHZhbHVlcyB0byBsb2FkLlxuICAgKi9cbiAgbG9hZChhcnJheTogbnVtYmVyW10pIHtcbiAgICB0aGlzLmFycmF5ID0gbmV3IFVpbnQxNkFycmF5KGFycmF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSYW5kb21pemVzIHRoZSB2YWx1ZXMgaW4gdGhlIG1hdHJpeC5cbiAgICovXG4gIHJhbmRvbWl6ZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuYXJyYXlbaV0gPSBNYXRocy5yYW5kKDAsIDMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuXG4vKipcbiAqIEJhc2UgY29uc3RydWN0b3IgdHlwZSBmb3IgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgZW5naW5lLlxuICovXG5leHBvcnQgdHlwZSBPYmplY3RDb25zdHJ1Y3RvcjxUPiA9IHsgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQgfTtcblxuLyoqXG4gKiBCYXNlIG9iamVjdCBvZiBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBlbmdpbmUuXG4gKlxuICogVGhlIHBhcmFtcyBpcyB1c2VkIGFzIHZhbGlkYXRpb24gb2YgdGhlIGFyZ3VtZW50cyBwYXNzZWQgaW4gdGhlIGNvbnN0cnVjdG9yIGZvciBkZWJ1Z2dpbmcuXG4gKiBUaGUgcGFyYW1zIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIGFycmF5IHdpdGggdGhlIG5hbWVzIG9mIGFsbCB0aGUga2V5cyB3aGljaCBzaG91bGQgYmVcbiAqIHByZXNlbnQgYXMgYXJncyBvZiBhIEdhbWVPYmplY3QuXG4gKiBUaGUgY29uZmlnIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IHZhbHVlcyBvZiB0aGUgR2FtZU9iamVjdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY2xhc3MgRWxlbWVudCBleHRlbmRzIEdhbWVPYmplY3Qge1xuICogIHBhcmFtcygpIHtcbiAqICAgcmV0dXJuIFtcInhcIiwgXCJ5XCJdO1xuICogIH1cbiAqICBjb25maWcoKSB7XG4gKiAgICByZXR1cm4ge1xuICogICAgICB4OiAwLFxuICogICAgICB5OiAwLFxuICogICAgICB3aWR0aDogMTAwLFxuICogICAgICBoZWlnaHQ6IDEwMCxcbiAqICAgIH07XG4gKiAgfVxuICogfVxuICogY29uc3QgbyA9IG5ldyBFbGVtZW50KCk7XG4gKiAvLyB0aGlzIHdpbGwgdGhyb3cgYW4gZXJyb3IgYmVjYXVzZSB4IGFuZCB5IGFyZSByZXF1aXJlZFxuICpcbiAqIGNvbnN0IG8gPSBuZXcgRWxlbWVudCh7IHg6IDEwLCB5OiAxMCB9KTtcbiAqIC8vIHRoaXMgd2lsbCBub3QgdGhyb3cgYW4gZXJyb3IgYW5kIHggYW5kIHkgd2lsbCBiZSAxMCBhbmQgd2lkdGggYW5kIGhlaWdodCB3aWxsIGJlIDEwMFxuICpcbiAqL1xuXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIERlYnVnLnZhbGlkYXRlUGFyYW1zKHRoaXMuY29uc3RydWN0b3IubmFtZSwgYXJncywgdGhpcy5wYXJhbXMoKSk7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLmNvbmZpZygpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGVmYXVsdHMsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgd2l0aCB0aGUgbmFtZXMgb2YgdGhlIGtleXMgdGhhdCBzaG91bGQgYmUgcHJlc2VudCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICovXG4gIHBhcmFtcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBPYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCB2YWx1ZXMgb2YgdGhlIEdhbWVPYmplY3RcbiAgICovXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgUmVjdENvbGxpZGVyIH0gZnJvbSBcIi4vY29sbGlkZXJzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgeyBNYXRocyB9IGZyb20gXCIuL21hdGhzXCI7XG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCIuL3NvdW5kc1wiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuaW1wb3J0IHsgVGlsZUNvcm5lcnMgfSBmcm9tIFwiLi90aWxlXCI7XG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSBcIi4vdGlsZW1hcFwiO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gXCIuL3RpbWVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQbGF0Zm9ybUNvbnRyb2xsZXJBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSB0aWxlTWFwIGNvbXBvbmVudFxuICAgKi9cbiAgdGlsZU1hcDogVGlsZU1hcDtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIG1hbmFnaW5nIHBsYXRmb3JtZXIgcGh5c2ljcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXRmb3JtQ29udHJvbGxlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSB2ZWxvY2l0eSBvbiB0aGUgWSBheGlzXG4gICAqL1xuICBtYXhWZWxvY2l0eVkgPSAxMDtcblxuICAvKipcbiAgICogVGhlIGdyYXZpdHkgb2YgdGhlIGNvbnRyb2xsZXJcbiAgICovXG4gIGdyYXZpdHkgPSAwLjU7XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIGNvbXBvbmVudFxuICAgKi9cbiAgdGltZSA9IHRoaXMuY29tcG9uZW50cy5nZXQoVGltZSk7XG5cbiAgLyoqXG4gICAqIFRoZSB0aWxlbWFwIGNvbXBvbmVudFxuICAgKi9cbiAgdGlsZU1hcDogVGlsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogUGxhdGZvcm1Db250cm9sbGVyQXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy50aW1lID0gdGhpcy5jb21wb25lbnRzLmdldChUaW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBwbGF0Zm9ybSBjb250cm9sbGVyXG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXCJ0aWxlTWFwXCJdO1xuICB9XG5cbiAgZ2V0Q29ybmVycyhcbiAgICB4MTogbnVtYmVyLFxuICAgIHkxOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlclxuICApOiBUaWxlQ29ybmVycyB7XG4gICAgcmV0dXJuIHRoaXMudGlsZU1hcC5nZXRDb3JuZXJzKHgxLCB5MSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBjaGVja0ZvcldhbGxzKHNwcml0ZTogUGxheWVyLCBtb3ZlRGlzdGFuY2VYOiBudW1iZXIpOiBudW1iZXIge1xuICAgIG1vdmVEaXN0YW5jZVggPSBNYXRoLmZsb29yKG1vdmVEaXN0YW5jZVgpO1xuICAgIGNvbnN0IGNvcm5lcnMgPSB0aGlzLmdldENvcm5lcnMoXG4gICAgICBzcHJpdGUueCArIG1vdmVEaXN0YW5jZVgsXG4gICAgICBzcHJpdGUueSxcbiAgICAgIHNwcml0ZS53aWR0aCxcbiAgICAgIHNwcml0ZS5oZWlnaHRcbiAgICApO1xuICAgIGlmIChcbiAgICAgIG1vdmVEaXN0YW5jZVggPiAwICYmXG4gICAgICAoY29ybmVycy5kb3duUmlnaHQuc29saWQubGVmdCB8fCBjb3JuZXJzLnVwUmlnaHQuc29saWQubGVmdClcbiAgICApIHtcbiAgICAgIHNwcml0ZS52ZWxvY2l0eVggPSAwO1xuICAgICAgc3ByaXRlLmFjY2VsZXJhdGlvblggPSAwO1xuICAgICAgbW92ZURpc3RhbmNlWCA9IDA7XG4gICAgICAvL21vdmVEaXN0YW5jZVggPSAoY29ybmVycy5kb3duUmlnaHQueCAqIGNvcm5lcnMuZG93bkxlZnQud2lkdGgpIC0gc3ByaXRlLnggLSBzcHJpdGUud2lkdGggLSAxO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBtb3ZlRGlzdGFuY2VYIDwgMCAmJlxuICAgICAgKGNvcm5lcnMuZG93bkxlZnQuc29saWQucmlnaHQgfHwgY29ybmVycy51cExlZnQuc29saWQucmlnaHQpXG4gICAgKSB7XG4gICAgICAvL21vdmVEaXN0YW5jZVggPSBzcHJpdGUueCAtICgoY29ybmVycy5kb3duTGVmdC54ICsgMSkgKiBjb3JuZXJzLmRvd25MZWZ0LndpZHRoKSAtIDE7XG4gICAgICAvL21vdmVEaXN0YW5jZVggKj0gLTE7XG4gICAgICBzcHJpdGUudmVsb2NpdHlYID0gMDtcbiAgICAgIHNwcml0ZS5hY2NlbGVyYXRpb25YID0gMDtcbiAgICAgIG1vdmVEaXN0YW5jZVggPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbW92ZURpc3RhbmNlWDtcbiAgfVxuXG4gIGFwcGx5R3Jhdml0eShzcHJpdGU6IFBsYXllcik6IG51bWJlciB7XG4gICAgbGV0IG1vdmVEaXN0YW5jZVkgPSBNYXRoLmZsb29yKHNwcml0ZS52ZWxvY2l0eVkpO1xuICAgIGlmICghc3ByaXRlLmp1bXBpbmcpIHtcbiAgICAgIHNwcml0ZS52ZWxvY2l0eVkgKz0gdGhpcy5ncmF2aXR5ICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WSArPSB0aGlzLmdyYXZpdHkgKiAxLjIgKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuICAgIH1cbiAgICBtb3ZlRGlzdGFuY2VZID0gTWF0aHMuY2xhbXAoXG4gICAgICBtb3ZlRGlzdGFuY2VZLFxuICAgICAgLXRoaXMubWF4VmVsb2NpdHlZLFxuICAgICAgdGhpcy5tYXhWZWxvY2l0eVlcbiAgICApO1xuICAgIGxldCBjb3JuZXJzID0gdGhpcy5nZXRDb3JuZXJzKFxuICAgICAgc3ByaXRlLngsXG4gICAgICBzcHJpdGUueSArIG1vdmVEaXN0YW5jZVksXG4gICAgICBzcHJpdGUud2lkdGgsXG4gICAgICBzcHJpdGUuaGVpZ2h0XG4gICAgKTtcbiAgICBpZiAobW92ZURpc3RhbmNlWSA+IDApIHtcbiAgICAgIGlmIChjb3JuZXJzLmRvd25SaWdodC5zb2xpZC50b3AgfHwgY29ybmVycy5kb3duTGVmdC5zb2xpZC50b3ApIHtcbiAgICAgICAgbW92ZURpc3RhbmNlWSA9IDA7XG4gICAgICAgIHNwcml0ZS52ZWxvY2l0eVkgPSAwO1xuICAgICAgICBzcHJpdGUuanVtcGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29ybmVycy51cFJpZ2h0LnNvbGlkLmJvdHRvbSB8fCBjb3JuZXJzLnVwTGVmdC5zb2xpZC5ib3R0b20pIHtcbiAgICAgICAgbW92ZURpc3RhbmNlWSA9IDA7XG4gICAgICAgIHNwcml0ZS52ZWxvY2l0eVkgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW92ZURpc3RhbmNlWTtcbiAgfVxuXG4gIGNsYW1wWCh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRocy5jbGFtcChcbiAgICAgIHgsXG4gICAgICAwLFxuICAgICAgdGhpcy50aWxlTWFwLndpZHRoICogdGhpcy50aWxlTWFwLnRpbGVXaWR0aCAtIHRoaXMuZW5naW5lLmRpc3BsYXkud2lkdGhcbiAgICApO1xuICB9XG5cbiAgY2xhbXBZKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGhzLmNsYW1wKFxuICAgICAgeSxcbiAgICAgIDAsXG4gICAgICB0aGlzLnRpbGVNYXAuaGVpZ2h0ICogdGhpcy50aWxlTWFwLnRpbGVIZWlnaHQgLSB0aGlzLmVuZ2luZS5kaXNwbGF5LmhlaWdodFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFNwcml0ZSB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGNvcm5lcnM6IGFueTtcbiAgdmFyczogYW55O1xuICBzbW9vdGhUaW1lOiBudW1iZXI7XG4gIGRpcjogbnVtYmVyO1xuICBzcGVlZDogbnVtYmVyO1xuICBzcGVlZFk6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGp1bXBGb3JjZTogbnVtYmVyO1xuICBqdW1waW5nOiBib29sZWFuO1xuICBzaG9vdGluZzogYm9vbGVhbjtcbiAganVtcEJvb3N0ZXI6IG51bWJlcjtcbiAgYWNjZWxlcmF0aW9uRm9yY2VYOiBudW1iZXI7XG4gIGFjY2VsZXJhdGlvblg6IG51bWJlcjtcbiAgbWF4U3BlZWRNdWx0WDogbnVtYmVyO1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgZnJpY3Rpb25YOiBudW1iZXI7XG4gIGRpclg6IG51bWJlcjtcbiAgY2FtZXJhOiBDYW1lcmE7XG4gIGlucHV0OiBJbnB1dDtcbiAgZGlzcGxheTogRGlzcGxheTtcbiAgdGltZTogVGltZTtcbiAgc291bmQ6IFNvdW5kO1xuICBjb250cm9sbGVyOiBQbGF0Zm9ybUNvbnRyb2xsZXI7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IGFueSkge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy5jb2xvciA9IFwiYmx1ZVwiO1xuICAgIHRoaXMudmFycyA9IHt9O1xuICAgIHRoaXMuc21vb3RoVGltZSA9IDEuMztcbiAgICB0aGlzLnZhcnMuY3YgPSAwO1xuICAgIHRoaXMuZGlyID0gMTtcbiAgICB0aGlzLnNwZWVkID0gNjtcbiAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eVkgPSAwO1xuICAgIHRoaXMuanVtcEZvcmNlID0gMTI7XG4gICAgdGhpcy5qdW1waW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuanVtcEJvb3N0ZXIgPSAwO1xuXG4gICAgdGhpcy5hY2NlbGVyYXRpb25Gb3JjZVggPSAxLjg7XG4gICAgdGhpcy5hY2NlbGVyYXRpb25YID0gMDtcbiAgICB0aGlzLm1heFNwZWVkTXVsdFggPSA5O1xuICAgIHRoaXMudmVsb2NpdHlYID0gMDtcbiAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICB0aGlzLmRpclggPSAwO1xuICAgIHRoaXMuY29sbGlkZXJzLmFkZChcbiAgICAgIG5ldyBSZWN0Q29sbGlkZXIoe1xuICAgICAgICB4OiAtMTAsXG4gICAgICAgIHk6IC0xMCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggKyAxMCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCArIDEwLFxuICAgICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRDb3JuZXJzKHg6IG51bWJlciwgeTogbnVtYmVyKTogVGlsZUNvcm5lcnMge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuZ2V0Q29ybmVycyh4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBtb3ZlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250cm9sbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbGVmdCByaWdodCBtb3ZlbWVudFxuICAgIGxldCBtb3ZlRGlzdGFuY2VYID0gMDtcbiAgICBsZXQgaW5wdXRYID0gdGhpcy5pbnB1dC5nZXRYQXhpcygpO1xuXG4gICAgLy8gYWNjZWxlcmF0aW9uIG1vdmVtZW50XG4gICAgaWYgKCF0aGlzLmp1bXBpbmcpIHtcbiAgICAgIHRoaXMuYWNjZWxlcmF0aW9uWCA9IGlucHV0WCAqIHRoaXMuYWNjZWxlcmF0aW9uRm9yY2VYO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjY2VsZXJhdGlvblggPSAoaW5wdXRYICogdGhpcy5hY2NlbGVyYXRpb25Gb3JjZVgpIC8gNjtcbiAgICB9XG5cbiAgICB0aGlzLnZlbG9jaXR5WCArPSB0aGlzLmFjY2VsZXJhdGlvblggKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuXG4gICAgLy8gZnJpY3Rpb25cbiAgICBsZXQgY3VycmVudERpciA9IE1hdGguc2lnbih0aGlzLnZlbG9jaXR5WCk7XG4gICAgaWYgKCF0aGlzLmp1bXBpbmcpIHtcbiAgICAgIHRoaXMudmVsb2NpdHlYICs9IC1jdXJyZW50RGlyICogdGhpcy5mcmljdGlvblggKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WCArPVxuICAgICAgICAoKC1jdXJyZW50RGlyICogdGhpcy5mcmljdGlvblgpIC8gMTApICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICB9XG4gICAgaWYgKE1hdGguc2lnbih0aGlzLnZlbG9jaXR5WCkgIT09IGN1cnJlbnREaXIpIHtcbiAgICAgIHRoaXMudmVsb2NpdHlYID0gMDtcbiAgICB9XG5cbiAgICAvLyBsaW1pdCBzcGVlZFxuICAgIGxldCBtYXhTcGVlZFggPSB0aGlzLm1heFNwZWVkTXVsdFg7XG4gICAgaWYgKHRoaXMuaW5wdXQua2V5RG93bihcIktleVpcIikgJiYgaW5wdXRYKSB7XG4gICAgICBtYXhTcGVlZFggKj0gMjtcbiAgICB9XG5cbiAgICB0aGlzLnZlbG9jaXR5WCA9IE1hdGhzLmNsYW1wKHRoaXMudmVsb2NpdHlYLCAtbWF4U3BlZWRYLCBtYXhTcGVlZFgpO1xuICAgIG1vdmVEaXN0YW5jZVggKz0gdGhpcy52ZWxvY2l0eVggKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuXG4gICAgbW92ZURpc3RhbmNlWCA9IHRoaXMuY29udHJvbGxlci5jaGVja0ZvcldhbGxzKHRoaXMsIG1vdmVEaXN0YW5jZVgpO1xuICAgIHRoaXMueCArPSBtb3ZlRGlzdGFuY2VYO1xuICAgIHRoaXMuY2FtZXJhLnggKz0gbW92ZURpc3RhbmNlWDtcbiAgICB0aGlzLmNhbWVyYS54ID0gdGhpcy5jb250cm9sbGVyLmNsYW1wWCh0aGlzLmNhbWVyYS54KTtcblxuICAgIC8vIGdyYXZpdHlcbiAgICBsZXQgbW92ZURpc3RhbmNlWSA9IHRoaXMuY29udHJvbGxlci5hcHBseUdyYXZpdHkodGhpcyk7XG4gICAgdGhpcy55ICs9IG1vdmVEaXN0YW5jZVk7XG4gICAgdGhpcy5jYW1lcmEueSArPSBtb3ZlRGlzdGFuY2VZO1xuICAgIHRoaXMuY2FtZXJhLnkgPSB0aGlzLmNvbnRyb2xsZXIuY2xhbXBZKHRoaXMuY2FtZXJhLnkpO1xuXG4gICAgLy8ganVtcCBwcmVzc2VkIGFuZCBub3QganVtcGluZ1xuICAgIGlmICh0aGlzLmlucHV0LmtleURvd24oXCJBcnJvd1VwXCIpICYmICF0aGlzLmp1bXBpbmcpIHtcbiAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XG4gICAgICB0aGlzLnZlbG9jaXR5WSA9IC10aGlzLmp1bXBGb3JjZSAvIDI7XG4gICAgICB0aGlzLmp1bXBCb29zdGVyID0gMDtcbiAgICB9XG5cbiAgICAvLyBqdW1wIGJlaW5nIGhlbGQgd2hpbGUganVtcGluZ1xuICAgIGlmIChcbiAgICAgIHRoaXMuaW5wdXQua2V5RG93bihcIkFycm93VXBcIikgJiZcbiAgICAgIHRoaXMuanVtcGluZyAmJlxuICAgICAgdGhpcy5qdW1wQm9vc3RlciA8IDEwXG4gICAgKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WSAtPSB0aGlzLmp1bXBGb3JjZSAvIDEyO1xuICAgICAgdGhpcy5qdW1wQm9vc3RlciArPSAxO1xuICAgIH1cblxuICAgIC8vIGp1bXAgcmVsZWFzZWQgYW5kIGp1bXBpbmdcbiAgICBpZiAoIXRoaXMuaW5wdXQua2V5RG93bihcIkFycm93VXBcIikgJiYgdGhpcy5qdW1waW5nKSB7XG4gICAgICB0aGlzLmp1bXBCb29zdGVyID0gMDtcbiAgICAgIGlmICh0aGlzLnZlbG9jaXR5WSA8IC10aGlzLmp1bXBGb3JjZSAvIDIpIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eVkgPSAtdGhpcy5qdW1wRm9yY2UgLyAyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5jb2xvcik7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KElucHV0KTtcbiAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpO1xuICAgIHRoaXMudGltZSA9IHRoaXMuY29tcG9uZW50cy5nZXQoVGltZSk7XG4gICAgdGhpcy5zb3VuZCA9IHRoaXMuY29tcG9uZW50cy5nZXQoU291bmQpO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jb21wb25lbnRzLmdldChDYW1lcmEpO1xuXG4gICAgdGhpcy5jYW1lcmEueCA9IE1hdGguZmxvb3IodGhpcy54IC0gdGhpcy5kaXNwbGF5LndpZHRoIC8gMik7XG4gICAgdGhpcy5jYW1lcmEueSA9IE1hdGguZmxvb3IodGhpcy55IC0gdGhpcy5kaXNwbGF5LmhlaWdodCAvIDIpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMuY29tcG9uZW50cy5nZXQoUGxhdGZvcm1Db250cm9sbGVyKTtcbiAgfVxuXG4gIGNvbGxpc2lvbihzcHJpdGU6IFNwcml0ZSk6IHZvaWQge31cbn1cbiIsImltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IE9iamVjdENvbnN0cnVjdG9yIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuXG4vKipcbiAqIFJlZ2lzdHJ5IHN0b3JlcyBzaW5nbGUgaW5zdGFuY2VzIG9mIG9iamVjdCBpbmRleGVkIGJ5IHRoZWlyIGNvbnN0cnVjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaXN0cnkge1xuICBpdGVtcyA9IG5ldyBNYXA8T2JqZWN0Q29uc3RydWN0b3I8YW55PiwgYW55PigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gQ29uc3RydWN0b3JcbiAgICogQHJldHVybnMgVGhlIGluc3RhbmNlIG9mIHRoZSBvYmplY3QgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICAgKi9cbiAgZ2V0PFQ+KENvbnN0cnVjdG9yOiBPYmplY3RDb25zdHJ1Y3RvcjxUPik6IFQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuaXRlbXMuZ2V0KENvbnN0cnVjdG9yKTtcbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgRGVidWcuZXJyb3IoYENvbXBvbmVudCAke0NvbnN0cnVjdG9yLm5hbWV9IGlzIG5vdCByZWdpc3RlcmVkYCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIENvbnN0cnVjdG9yIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgb2JqZWN0IHRvIHN0b3JlLlxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIGluc3RhbmNlIG9mIHRoZSBvYmplY3QgdG8gc3RvcmUuXG4gICAqL1xuICBzZXQ8VD4oQ29uc3RydWN0b3I6IE9iamVjdENvbnN0cnVjdG9yPFQ+LCBpbnN0YW5jZTogVCkge1xuICAgIGlmIChEZWJ1Zy5hY3RpdmUoKSkge1xuICAgICAgaWYgKHRoaXMuaXRlbXMuaGFzKENvbnN0cnVjdG9yKSkge1xuICAgICAgICBEZWJ1Zy5lcnJvcihgQ29tcG9uZW50ICR7Q29uc3RydWN0b3J9IGlzIGFscmVhZHkgZGVmaW5lZGApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLml0ZW1zLnNldChDb25zdHJ1Y3RvciwgaW5zdGFuY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIEFuIGl0ZXJhdG9yIG9mIGFsbCB0aGUgaW5zdGFuY2VzIHN0b3JlZCBpbiB0aGUgcmVnaXN0cnkuXG4gICAqL1xuICB2YWx1ZXM8VD4oKTogSXRlcmFibGVJdGVyYXRvcjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMudmFsdWVzKCkgYXMgSXRlcmFibGVJdGVyYXRvcjxUPjtcbiAgfVxufVxuIiwiLyoqXG4gKiBBIFJlc291cmNlIEl0ZW0gaXMgYSBtZWRpYSBvYmplY3QgbGlrZSBpbWFnZSwgYXVkaW8uIEl0IGlzIHVzZWQgYnkgdGhlIFJlc291cmNlcyBjbGFzc1xuICogZHVyaW5nIHRoZSBwcmVsb2FkIHBoYXNlIG9mIHRoZSBlbmdpbmUgbG9hZGluZy5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5cbmV4cG9ydCB0eXBlIFJlc291cmNlVHlwZSA9IFwiaW1hZ2VcIiB8IFwiYXVkaW9cIjtcblxuLyoqXG4gKiBBcmd1bWVudHMgZm9yICBSZXNvdXJjZUl0ZW0gY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZUl0ZW1BcmdzIHtcbiAgLyoqXG4gICAqIHVybCBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHVybDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiB0eXBlIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgdHlwZTogUmVzb3VyY2VUeXBlO1xuXG4gIC8qKlxuICAgKiBuYW1lIG9mIHRoZSByZXNvdXJjZSB0byB1c2UgaW4gdGhlIHJlc291cmNlcyBkaWN0aW9uYXJ5XG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUl0ZW0ge1xuICAvKipcbiAgICogdXJsIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHR5cGUgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICB0eXBlOiBSZXNvdXJjZVR5cGU7XG5cbiAgLyoqXG4gICAqIG5hbWUgb2YgdGhlIHJlc291cmNlIHRvIHVzZSBpbiB0aGUgcmVzb3VyY2VzIGRpY3Rpb25hcnlcbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogYnVmZmVyIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgYnVmZmVyOiBhbnk7XG5cbiAgLyoqXG4gICAqIGl0ZW0gb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICBpdGVtOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBSZXNvdXJjZUl0ZW1BcmdzKSB7XG4gICAgRGVidWcudmFsaWRhdGVQYXJhbXMoXCJSZXNvdXJjZXMuYWRkXCIsIHBhcmFtcywgW1widXJsXCIsIFwidHlwZVwiLCBcIm5hbWVcIl0pO1xuICAgIHRoaXMudXJsID0gcGFyYW1zLnVybDtcbiAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZTtcbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICB0aGlzLmJ1ZmZlciA9IHt9O1xuICAgIHRoaXMuaXRlbSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgdGhlIHJlc291cmNlXG4gICAqIEByZXR1cm5zIFByb21pc2UgdG8gbG9hZCB0aGUgcmVzb3VyY2VcbiAgICovXG4gIGxvYWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy51cmwpO1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBEZWJ1Zy5lcnJvcihgRXJyb3IgbG9hZGluZyAke3RoaXMubmFtZX1gKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgdGhpcy5idWZmZXIgPSBibG9iO1xuICAgICAgdGhpcy5pdGVtID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLml0ZW0ub25sb2FkID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5pdGVtLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgRGVidWcuaW5mbyhgU3VjY2VzcyBsb2FkaW5nICR7dGhpcy5uYW1lfWApO1xuICAgIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIFJlc291cmNlcyBjb21wb25lbnQgaXMgc2V0IG9mIHRoZSBpbWFnZXMgYW5kIGF1ZGlvIHJlc291cmNlcyBvZiB0aGUgZ2FtZS5cbiAqIEl0IGhhbmRsZXMgYWRkaW5nIGFuZCBnZXR0aW5nIHRoZSByZXNvdXJjZXMgYnkgYSBuYW1lIGFuZCBhbHNvIHRoZSBwcmVsb2FkIHBoYXNlIG9mIHRoZSBlbmdpbmUgbG9hZGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGl0ZW1zOiBSZWNvcmQ8c3RyaW5nLCBSZXNvdXJjZUl0ZW0+ID0ge307XG5cbiAgLyoqXG4gICAqIEFkZCBhIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgZGljdGlvbmFyeVxuICAgKiBAcGFyYW0gcGFyYW1zIEFyZ3VtZW50cyBmb3IgdGhlIFJlc291cmNlSXRlbSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgYWRkKHBhcmFtczogUmVzb3VyY2VJdGVtQXJncykge1xuICAgIGlmICh0eXBlb2YgdGhpcy5pdGVtc1twYXJhbXMubmFtZV0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIERlYnVnLndhcm4oYFJlc291cmNlICR7cGFyYW1zLm5hbWV9IGlzIGFscmVhZHkgZGVmaW5lZGApO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zW3BhcmFtcy5uYW1lXSA9IG5ldyBSZXNvdXJjZUl0ZW0ocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSByZXNvdXJjZSBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lIG9mIHRoZSByZXNvdXJjZVxuICAgKiBAcmV0dXJucyB0aGUgcmVzb3VyY2VcbiAgICovXG4gIGdldChuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zW25hbWVdLml0ZW07XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcmVzb3VyY2UgYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZSBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHJlbW92ZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5pdGVtc1tuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVsb2FkIGFsbCByZXNvdXJjZXNcbiAgICovXG4gIGFzeW5jIHByZWxvYWQoKSB7XG4gICAgRGVidWcuZ3JvdXBTdGFydChcIlByZWxvYWRpbmcgUmVzb3VyY2VzXCIpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChPYmplY3QudmFsdWVzKHRoaXMuaXRlbXMpLm1hcCgoaXRlbSkgPT4gaXRlbS5sb2FkKCkpKTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIERlYnVnLmVycm9yKGU/Lm1lc3NhZ2UpO1xuICAgIH1cbiAgICBEZWJ1Zy5ncm91cEVuZCgpO1xuICB9XG59XG4iLCIvKiBleHBvcnRlZCBTY2VuZSAqL1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSBcIi4vY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5cbi8qKlxuICogU2NlbmUgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY2VuZUFyZ3Mge1xuICAvKipcbiAgICogSWYgdGhlIHNjZW5lIGlzIGFjdGl2ZSwgdGhlIHNwcml0ZXMgb2YgdGhlIHNjZW5lIHdpbGwgbW92ZSBhbmQgY29sbGlkZS5cbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xuICAvKipcbiAgICogSWYgdGhlIHNjZW5lIGlzIHZpc2libGUsIHRoZSBzcHJpdGVzIG9mIHRoZSBzY2VuZSB3aWxsIGJlIGRyYXduIG9uIHRoZSBzdGFnZS5cbiAgICovXG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBTY2VuZSBpcyBhIGNvbGxlY3Rpb24gb2Ygc3ByaXRlcyBvZiBhIGdhbWUuXG4gKiBPbmx5IHRoZSBzcHJpdGVzIGluIHRoZSBzYW1lIHNjZW5lIGNhbiBjb2xsaWRlIHdpdGggZWFjaCBvdGhlci5cbiAqIFRoZSBlbmdpbmUgY2FuIGhhdmUgYSBzaW5nbGUgc2NlbmUgb3IgbXVsdGlwbGUuIERlcGVuZGluZyBvbiB0aGUgYWN0aXZlIHNjZW5lIG9mXG4gKiB0aGUgZW5naW5lLCB0aGF0IHNjZW5lIHNwcml0ZXMgd291bGQgYmUgZHJhdywgbW92ZWQgYW5kIGNvbGxpZGVkIG9uIHRoZSBzdGFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNjZW5lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2Ygc3ByaXRlcyBvZiB0aGUgc2NlbmUuXG4gICAqL1xuICBzcHJpdGVzID0gbmV3IENvbGxlY3Rpb248U3ByaXRlPigpO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc2NlbmUgaXMgYWN0aXZlLCB0aGUgc3ByaXRlcyBvZiB0aGUgc2NlbmUgd2lsbCBtb3ZlIGFuZCBjb2xsaWRlLlxuICAgKi9cbiAgaXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzY2VuZSBpcyB2aXNpYmxlLCB0aGUgc3ByaXRlcyBvZiB0aGUgc2NlbmUgd2lsbCBiZSBkcmF3biBvbiB0aGUgc3RhZ2UuXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IFNjZW5lQXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgZGVmYXVsdCBzY2VuZSBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgY29uZmlnKCk6IFNjZW5lQXJncyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBtb3ZlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbigpO1xuICAgIGZvciAobGV0IHNwcml0ZSBvZiB0aGlzLnNwcml0ZXMuYWxsKCkpIHtcbiAgICAgIGlmIChzcHJpdGUuaXNBY3RpdmUpIHtcbiAgICAgICAgc3ByaXRlLm1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgc3ByaXRlIG9mIHRoaXMuc3ByaXRlcy5hbGwoKSkge1xuICAgICAgaWYgKHNwcml0ZS5pc1Zpc2libGUpIHtcbiAgICAgICAgc3ByaXRlLmRyYXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIEFkZCBhIHNwcml0ZSB0byB0aGUgc2NlbmUuXG4gICAqIEBwYXJhbSBzcHJpdGUgdG8gYmUgYWRkZWQuXG4gICAqL1xuICBhZGRTcHJpdGUoc3ByaXRlOiBTcHJpdGUpOiB2b2lkIHtcbiAgICBzcHJpdGUuZW5naW5lID0gdGhpcy5lbmdpbmU7XG4gICAgc3ByaXRlLnBhcmVudCA9IHRoaXM7XG4gICAgc3ByaXRlLmluaXQoKTtcbiAgICB0aGlzLnNwcml0ZXMuYWRkKHNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHNwcml0ZSBmcm9tIHRoZSBzY2VuZS5cbiAgICogQHBhcmFtIHNwcml0ZSB0byBiZSByZW1vdmVkLlxuICAgKi9cbiAgcmVtb3ZlU3ByaXRlKHNwcml0ZTogU3ByaXRlKSB7XG4gICAgdGhpcy5zcHJpdGVzLnJlbW92ZShzcHJpdGUpO1xuICB9XG5cbiAgLy8gVE9ETzogYWRkIHF1YWQtdHJlZSBmb3IgY29sbGlzaW9uIGRldGVjdGlvblxuICBjb2xsaXNpb24oKSB7XG4gICAgY29uc3Qgc3ByaXRlcyA9IHRoaXMuc3ByaXRlcy5hbGwoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwcml0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHNwcml0ZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgbGV0IHNwcml0ZTEgPSBzcHJpdGVzW2ldO1xuICAgICAgICBsZXQgc3ByaXRlMiA9IHNwcml0ZXNbal07XG4gICAgICAgIGlmIChzcHJpdGUxLnRlc3RDb2xsaXNpb24oc3ByaXRlMikpIHtcbiAgICAgICAgICBzcHJpdGUxLmNvbGxpc2lvbihzcHJpdGUyKTtcbiAgICAgICAgICBzcHJpdGUyLmNvbGxpc2lvbihzcHJpdGUxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5cbi8qIGV4cG9ydGVkIFNvdW5kICovXG5leHBvcnQgY2xhc3MgU291bmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczoge30pIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHt9XG5cbiAgZHJhdygpOiB2b2lkIHt9XG5cbiAgcGxheSgpIHt9XG5cbiAgc3RvcCgpIHt9XG5cbiAgcGF1c2UoKSB7fVxufVxuIiwiaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gXCIuL29iamVjdHNcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vcmVjdFwiO1xuXG4vKipcbiAqIFRoZSBhcmd1bWVudHMgdG8gY3JlYXRlIGEgU3ByaXRlU2hlZXQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ByaXRlU2hlZXRBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZnJhbWUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBmcmFtZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaW1hZ2UgY29udGFpbmluZyB0aGUgc3ByaXRlcy90aWxlcy5cbiAgICovXG4gIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgeCBvZmZzZXQgb2YgdGhlIGZpcnN0IHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIG9mZnNldFg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB5IG9mZnNldCBvZiB0aGUgZmlyc3Qgc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgb2Zmc2V0WT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGdhcCBiZXR3ZWVuIGVhY2ggc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgZ2FwPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIEEgc3ByaXRlIHNoZWV0IGNvbnNpc3RzIG9mIGRpZmZlcmVudCBzcHJpdGVzL3RpbGVzIGRyYXduIGluIHRoZSBzYW1lIGltYWdlLlxuICogV2hlbiBjcmVhdGVkLCB0aGUgU3ByaXRlU2hlZXQgd2lsbCBjcmVhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIGVhY2ggc3ByaXRlL3RpbGUgb25cbiAqIHRoZSBpbWFnZSBkZXBlbmRpbmcgb24gdGhlIHdpZHRoL2hlaWdodCBvZiB0aGUgZnJhbWUvdGlsZSBvbiB0aGUgc2hlZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTcHJpdGVTaGVldCBleHRlbmRzIEdhbWVPYmplY3Qge1xuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgY29vcmRpbmF0ZXMgb2YgZWFjaCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICB0aWxlczogUG9pbnRbXTtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZnJhbWUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZnJhbWUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBpbWFnZSBjb250YWluaW5nIHRoZSBzcHJpdGVzL3RpbGVzLlxuICAgKi9cbiAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIC8qKlxuICAgKiBUaGUgeCBvZmZzZXQgb2YgdGhlIGZpcnN0IHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIG9mZnNldFg6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB5IG9mZnNldCBvZiB0aGUgZmlyc3Qgc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgb2Zmc2V0WTogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGdhcCBiZXR3ZWVuIGVhY2ggc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgZ2FwOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogU3ByaXRlU2hlZXRBcmdzKSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIGxldCBpQ291bnQgPSAxO1xuICAgIGxldCBqQ291bnQgPSAxO1xuICAgIGlmICh0aGlzLmdhcCkge1xuICAgICAgd2hpbGUgKFxuICAgICAgICB0aGlzLmltYWdlLndpZHRoIC0gdGhpcy5vZmZzZXRYIC0gaUNvdW50KysgKiAodGhpcy53aWR0aCArIHRoaXMuZ2FwKSA+PVxuICAgICAgICB0aGlzLndpZHRoXG4gICAgICApO1xuICAgICAgd2hpbGUgKFxuICAgICAgICB0aGlzLmltYWdlLmhlaWdodCAtXG4gICAgICAgICAgdGhpcy5vZmZzZXRZIC1cbiAgICAgICAgICBqQ291bnQrKyAqICh0aGlzLmhlaWdodCArIHRoaXMuZ2FwKSA+PVxuICAgICAgICB0aGlzLndpZHRoXG4gICAgICApO1xuICAgICAgaUNvdW50LS07XG4gICAgICBqQ291bnQtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaUNvdW50ID0gTWF0aC5mbG9vcigodGhpcy5pbWFnZS53aWR0aCAtIHRoaXMub2Zmc2V0WCkgLyB0aGlzLndpZHRoKTtcbiAgICAgIGpDb3VudCA9IE1hdGguZmxvb3IoKHRoaXMuaW1hZ2UuaGVpZ2h0IC0gdGhpcy5vZmZzZXRZKSAvIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGpDb3VudDsgKytqKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlDb3VudDsgKytpKSB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5vZmZzZXRYICsgaSAqIHRoaXMuZ2FwICsgaSAqIHRoaXMud2lkdGg7XG4gICAgICAgIGxldCB5ID0gdGhpcy5vZmZzZXRZICsgaiAqIHRoaXMuZ2FwICsgaiAqIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnRpbGVzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBzcHJpdGUgc2hlZXRcbiAgICovXG4gIHBhcmFtcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwiaW1hZ2VcIl07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiBkZWZhdWx0IG9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzcHJpdGUgc2hlZXRcbiAgICovXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2Zmc2V0WDogMCxcbiAgICAgIG9mZnNldFk6IDAsXG4gICAgICBnYXA6IDAsXG4gICAgfTtcbiAgfVxufVxuIiwiLyogZXhwb3J0ZWQgU3ByaXRlICovXG5cbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tIFwiLi9jb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBDb2xsaWRlciB9IGZyb20gXCIuL2NvbGxpZGVyc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNwcml0ZUFyZ3Mge1xuICAvKipcbiAgICogWCBwb3NpdGlvbiBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICB4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFkgcG9zaXRpb24gb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzcHJpdGUgaXMgdmlzaWJsZSwgaXQgd2lsbCBiZSBkcmF3biBvbiB0aGUgc3RhZ2VcbiAgICovXG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgdGhlIHNwcml0ZSBpcyBhY3RpdmUsIGl0IHdpbGwgbW92ZVxuICAgKi9cbiAgaXNBY3RpdmU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQmFzZSBTcHJpdGUgY29tcG9uZW50LiBFdmVyeSBTcHJpdGUgb2YgdGhlIGVuZ2luZSBzaG91bGQgZGVyaXZlIGZyb20gdGhpcyBjbGFzcy5cbiAqIEVhY2ggbG9vcCBvZiB0aGUgZ2FtZSB0aGUgc3ByaXRzIHdpbGwgbW92ZSwgZHJhdyBhbmQgdGVzdCBjb2xsaXNpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogWCBwb3NpdGlvbiBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICB4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFkgcG9zaXRpb24gb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgc3ByaXRlXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzcHJpdGUgaXMgdmlzaWJsZSwgaXQgd2lsbCBiZSBkcmF3biBvbiB0aGUgc3RhZ2VcbiAgICovXG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgdGhlIHNwcml0ZSBpcyBhY3RpdmUsIGl0IHdpbGwgbW92ZVxuICAgKi9cbiAgaXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgY29sbGlkZXJzIGF0dGFjaGVkIHRvIHRoZSBzcHJpdGVcbiAgICovXG4gIGNvbGxpZGVycyA9IG5ldyBDb2xsZWN0aW9uPENvbGxpZGVyPigpO1xuXG4gIC8qKlxuICAgKiBQYXJlbnQgb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgcGFyZW50OiBDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IFNwcml0ZUFyZ3MpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgcmVxdWlyZWQgcGFyYW1ldGVycyBmb3IgdGhlIHNwcml0ZVxuICAgKi9cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiBbXCJ4XCIsIFwieVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCJdO1xuICB9XG5cbiAgY29uZmlnKCk6IFBhcnRpYWw8U3ByaXRlQXJncz4ge1xuICAgIHJldHVybiB7XG4gICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIGEgYm94IGFyb3VuZCB0aGUgc3ByaXRlXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY29sb3IgQ29sb3Igb2YgdGhlIHJlY3RhbmdsZSwgZGVmYXVsdCByZWRcbiAgICovXG4gIGRlYnVnRHJhdyhjb2xvciA9IFwicmVkXCIpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5jb21wb25lbnRzLmdldChEaXNwbGF5KTtcbiAgICBpZiAoZGlzcGxheSkge1xuICAgICAgZGlzcGxheS5yZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgY29sb3IpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGVzdHMgZm9yIGNvbGxpc2lvbiBiZXR3ZWVuIGVhY2ggY29sbGlkZXIgb2YgdGhlIHNwcml0ZSBhZ2FpbnN0IGEgc3ByaXRlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgU3ByaXRlIHRvIHRlc3QgdGhlIGNvbGxpc2lvbiB3aXRoXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgY29sbGlzaW9uIGRldGVjdGVkXG4gICAqL1xuICB0ZXN0Q29sbGlzaW9uKHNwcml0ZTogU3ByaXRlKSB7XG4gICAgaWYgKCF0aGlzLmNvbGxpZGVycy5hbGwoKS5sZW5ndGggfHwgIXNwcml0ZS5jb2xsaWRlcnMuYWxsKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGNvbGxpZGVyMSBvZiB0aGlzLmNvbGxpZGVycy5hbGwoKSlcbiAgICAgIGZvciAobGV0IGNvbGxpZGVyMiBvZiBzcHJpdGUuY29sbGlkZXJzLmFsbCgpKVxuICAgICAgICBpZiAoY29sbGlkZXIxLnRlc3QoY29sbGlkZXIyKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB0aGUgc3ByaXRlIGlzIGFkZGVkIHRvIGEgc2NlbmUgYWZ0ZXIgY3JlYXRpb25cbiAgICovXG4gIGluaXQoKSB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZXhlY3V0ZWQgZWFjaCBnYW1lIGxvb3BcbiAgICovXG4gIG1vdmUoKSB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZXhlY3V0ZWQgZWFjaCBsb29wIG9mIHRoZSBnYW1lXG4gICAqL1xuICBkcmF3KCk6IHZvaWQge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIHdoZW4gdGhlIHNwcml0ZSBjb2xsaWRlZCB3aXRoIGFub3RoZXIgc3ByaXRlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIFRoZSBvdGhlciBzcHJpdGUgd2l0aCB3aG9tIHRoZSBjb2xsaXNpb24gb2N1cnJlZFxuICAgKi9cbiAgY29sbGlzaW9uKHNwcml0ZTogU3ByaXRlKSB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZXhlY3V0ZWQgd2hlbiB0aGUgc3ByaXRlIGlzIHJlbW92ZWQgZnJvbSB0aGUgZW5naW5lIHNjZW5lXG4gICAqL1xuICBkZXN0cm95KCkge31cbn1cbiIsImltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGlsZUNvcm5lcnMge1xuICB1cExlZnQ6IFRpbGU7XG4gIHVwUmlnaHQ6IFRpbGU7XG4gIGRvd25MZWZ0OiBUaWxlO1xuICBkb3duUmlnaHQ6IFRpbGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGlsZUVkZ2VzIHtcbiAgdG9wOiBUaWxlO1xuICBib3R0b206IFRpbGU7XG4gIGxlZnQ6IFRpbGU7XG4gIHJpZ2h0OiBUaWxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVTb2xpZCB7XG4gIHRvcDogYm9vbGVhbjtcbiAgYm90dG9tOiBib29sZWFuO1xuICBsZWZ0OiBib29sZWFuO1xuICByaWdodDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaWxlQXJncyB7XG4gIC8qKlxuICAgKiBUaGUgYW5nbGUgb2YgdGhlIHRpbGUuXG4gICAqL1xuICBhbmdsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2hlZXQgaW5kZXggb2YgdGhlIHRpbGUuXG4gICAqL1xuICBzaGVldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc29saWQgcHJvcGVydHkgb2YgdGhlIHRpbGUgd2FsbHMuXG4gICAqL1xuICBzb2xpZDogVGlsZVNvbGlkO1xufVxuXG5leHBvcnQgY2xhc3MgVGlsZSBleHRlbmRzIEdhbWVPYmplY3Qge1xuICAvKipcbiAgICogVGhlIGFuZ2xlIG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgYW5nbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNoZWV0IGluZGV4IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgc2hlZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNvbGlkIHByb3BlcnR5IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgc29saWQ6IFRpbGVFZGdlcztcblxuICAvKipcbiAgICogVGhlIHggcG9zaXRpb24gb2YgdGhlIHRpbGUuXG4gICAqL1xuICB4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHRpbGUuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogVGlsZUFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBUaGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIG9mIGEgdGlsZS5cbiAgICovXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc29saWQ6IHtcbiAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhbmdsZTogMCxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IE1hdGhzIH0gZnJvbSBcIi4vbWF0aHNcIjtcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCIuL21hdHJpeFwiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRzXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5pbXBvcnQgeyBUaWxlLCBUaWxlQ29ybmVycyB9IGZyb20gXCIuL3RpbGVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUaWxlTWFwQXJncyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgdGlsZVdpZHRoOiBudW1iZXI7XG4gIHRpbGVIZWlnaHQ6IG51bWJlcjtcbiAgc2hlZXQ6IHN0cmluZztcbiAgdGlsZXM6IHN0cmluZ1tdO1xufVxuXG5jb25zdCBTT0xJRF9USUxFID0gbmV3IFRpbGUoe1xuICBzb2xpZDogeyB0b3A6IHRydWUsIGJvdHRvbTogdHJ1ZSwgcmlnaHQ6IHRydWUsIGxlZnQ6IHRydWUgfSxcbiAgYW5nbGU6IDAsXG4gIHNoZWV0OiAwLFxufSk7XG4vKipcbiAqIENsYXNzIGZvciBtYW5hZ2luZyB0aWxlTWFwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRpbGVNYXAgZXh0ZW5kcyBTcHJpdGUge1xuICBtYXRyaXg6IE1hdHJpeDtcbiAgbWFwV2lkdGg6IG51bWJlcjtcbiAgbWFwSGVpZ2h0OiBudW1iZXI7XG4gIHRpbGVXaWR0aDogbnVtYmVyO1xuICB0aWxlSGVpZ2h0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBjYW1lcmE6IENhbWVyYTtcbiAgZGlzcGxheTogRGlzcGxheTtcbiAgdGlsZXM6IFRpbGVbXTtcbiAgc2hlZXQ6IFNwcml0ZVNoZWV0O1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBhbnkpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICAgIHRoaXMubWF0cml4ID0gbmV3IE1hdHJpeCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5tYXBXaWR0aCA9IHRoaXMud2lkdGggKiB0aGlzLnRpbGVXaWR0aDtcbiAgICB0aGlzLm1hcEhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy50aWxlSGVpZ2h0O1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jb21wb25lbnRzLmdldChDYW1lcmEpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gIH1cblxuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFwieFwiLFxuICAgICAgXCJ5XCIsXG4gICAgICBcIndpZHRoXCIsXG4gICAgICBcImhlaWdodFwiLFxuICAgICAgXCJ0aWxlV2lkdGhcIixcbiAgICAgIFwidGlsZUhlaWdodFwiLFxuICAgICAgXCJzaGVldFwiLFxuICAgICAgXCJ0aWxlc1wiLFxuICAgIF07XG4gIH1cblxuICBnZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1hdHJpeC5nZXQoeCwgeSk7XG4gIH1cblxuICBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1hdHJpeC5zZXQoeCwgeSwgdmFsdWUpO1xuICB9XG5cbiAgbG9hZChhcnJheTogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9PSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpIHtcbiAgICAgIERlYnVnLndhcm4oXG4gICAgICAgIGBUaWxlbWFwIHNpemUgbWlzbWF0Y2ggd2l0aCB3aWR0aDogJHt0aGlzLndpZHRofSBhbmQgaGVpZ2h0ICR7dGhpcy5oZWlnaHR9YFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5tYXRyaXgubG9hZChhcnJheSk7XG4gIH1cblxuICBzYXZlKCk6IHZvaWQge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hdHJpeC5hcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgbGV0IGNoYXIgPSB0aGlzLm1hdHJpeC5hcnJheVtpXS50b1N0cmluZygpO1xuICAgICAgY2hhciA9IGNoYXIubGVuZ3RoID4gMSA/IGNoYXIgOiBcIiAgXCIgKyBjaGFyO1xuICAgICAgY2hhciA9IGNoYXIubGVuZ3RoID4gMiA/IGNoYXIgOiBcIiBcIiArIGNoYXI7XG4gICAgICByZXN1bHQgKz0gY2hhciArIFwiLFwiO1xuICAgICAgaWYgKCsrY291bnQgPj0gdGhpcy53aWR0aCkge1xuICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgIHJlc3VsdCArPSBcIlxcclxcblwiO1xuICAgICAgfVxuICAgIH1cbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSByZXN1bHQ7XG4gIH1cblxuICBnZXRUaWxlWCh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCh4IC8gdGhpcy50aWxlV2lkdGgpICUgdGhpcy5tYXBXaWR0aCk7XG4gIH1cblxuICBnZXRUaWxlWSh5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCh5IC8gdGhpcy50aWxlV2lkdGgpICUgdGhpcy5tYXBXaWR0aCk7XG4gIH1cblxuICBnZXRUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogVGlsZSB7XG4gICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gdGhpcy5tYXBXaWR0aCB8fCB5ID49IHRoaXMubWFwV2lkdGgpIHtcbiAgICAgIHJldHVybiBTT0xJRF9USUxFO1xuICAgIH1cbiAgICBjb25zdCB4VGlsZSA9IHRoaXMuZ2V0VGlsZVgoeCk7XG4gICAgY29uc3QgeVRpbGUgPSB0aGlzLmdldFRpbGVZKHkpO1xuICAgIGNvbnN0IHRpbGVJbmRleCA9IHRoaXMuZ2V0KHhUaWxlLCB5VGlsZSk7XG4gICAgY29uc3QgdGlsZSA9IHRoaXMudGlsZXNbdGlsZUluZGV4XSB8fCBTT0xJRF9USUxFO1xuXG4gICAgcmV0dXJuIHRpbGU7XG4gIH1cblxuICBnZXRDb3JuZXJzKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFRpbGVDb3JuZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBMZWZ0OiB0aGlzLmdldFRpbGUoeCwgeSksXG4gICAgICB1cFJpZ2h0OiB0aGlzLmdldFRpbGUoeCArIHdpZHRoLCB5KSxcbiAgICAgIGRvd25MZWZ0OiB0aGlzLmdldFRpbGUoeCwgeSArIGhlaWdodCksXG4gICAgICBkb3duUmlnaHQ6IHRoaXMuZ2V0VGlsZSh4ICsgd2lkdGgsIHkgKyBoZWlnaHQpLFxuICAgIH07XG4gIH1cblxuICBnZXREcmF3UmVjdCgpIHtcbiAgICBsZXQgeDEgPSB0aGlzLmdldFRpbGVYKHRoaXMuY2FtZXJhLngpO1xuICAgIGxldCB5MSA9IHRoaXMuZ2V0VGlsZVkodGhpcy5jYW1lcmEueSk7XG4gICAgbGV0IHgyID0gTWF0aC5jZWlsKHRoaXMuZGlzcGxheS53aWR0aCAvIHRoaXMudGlsZVdpZHRoKTtcbiAgICBsZXQgeTIgPSBNYXRoLmNlaWwodGhpcy5kaXNwbGF5LmhlaWdodCAvIHRoaXMudGlsZVdpZHRoKTtcbiAgICB4MSA9IE1hdGhzLmNsYW1wKHgxLCAwLCB0aGlzLndpZHRoKTtcbiAgICB5MSA9IE1hdGhzLmNsYW1wKHkxLCAwLCB0aGlzLmhlaWdodCk7XG4gICAgeDIgPSBNYXRocy5jbGFtcCh4MiArIHgxICsgMSwgeDEsIHRoaXMud2lkdGgpO1xuICAgIHkyID0gTWF0aHMuY2xhbXAoeTIgKyB5MSArIDEsIHkxLCB0aGlzLmhlaWdodCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHgxOiB4MSxcbiAgICAgIHkxOiB5MSxcbiAgICAgIHgyOiB4MixcbiAgICAgIHkyOiB5MixcbiAgICB9O1xuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICBsZXQgcmVjdCA9IHRoaXMuZ2V0RHJhd1JlY3QoKTtcbiAgICBmb3IgKGxldCBpID0gcmVjdC54MTsgaSA8IHJlY3QueDI7ICsraSkge1xuICAgICAgZm9yIChsZXQgaiA9IHJlY3QueTE7IGogPCByZWN0LnkyOyArK2opIHtcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLmdldChpLCBqKTtcbiAgICAgICAgaWYgKHRpbGUpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RpbGUoXG4gICAgICAgICAgICB0aGlzLnggKyBpICogdGhpcy50aWxlV2lkdGgsXG4gICAgICAgICAgICB0aGlzLnkgKyBqICogdGhpcy50aWxlSGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy50aWxlV2lkdGgsXG4gICAgICAgICAgICB0aGlzLnRpbGVIZWlnaHQsXG4gICAgICAgICAgICB0aGlzLnNoZWV0LFxuICAgICAgICAgICAgdGlsZSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxufVxuIiwiLyogZXhwb3J0ZWQgVGltZSAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSB0aW1lIG9mIHRoZSBnYW1lLlxuICogdGltZS5zdGFydFRpbWU6IHNlY29uZHMgZWxhcHNlZCBzY2llbmNlIHRoZSBnYW1lIHN0YXJ0ZWRcbiAqIHRpbWUuZnJhbWVUaW1lOiBhbG1vc3QgdGhlIHNhbWUgYXMgc3RhcnRUaW1lLCBoYXMgdGhlIGVsYXBzZWQgc2Vjb25kc1xuICogc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkIGJ1dCBpdCB1cGRhdGVzIHRoZSB2YWx1ZSBieSBjb3VudGluZyB0aGUgZnJhbWUgdGltZSBvZiBlYWNoIGdhbWUgbG9vcC5cbiAqIHRpbWUuZGVsdGFUaW1lOiBpbnZlcnNlIHJlbGF0aXZlIHZhbHVlIHRvIHRoZSBmcHMgb2YgdGhlIGdhbWUuIFdoZW4gdGhlIGdhbWUgcnVucyBvbiA2MGZwcyB0aGUgdmFsdWUgaXMgMS5cbiAqIFdoZW4gdGhlIGZwcyBkcm9wLCB0aGUgZGVsdGFUaW1lIHZhbHVlIGlzIGluY3JlYXNlZCBwcm9wb3J0aW9uYWwgdG8gdGhlIGFtb3VudCBvZiBmcHMgZHJvcHBlZC5cbiAqIEV4YW1wbGU6XG4gKiA2MGZwczogZGVsdGFUaW1lID09IDFcbiAqIDMwZnBzOiBkZWx0YVRpbWUgPT0gMlxuICogMTVmcHM6IGRlbHRhVGltZSA9PSA0XG4gKi9cbmV4cG9ydCBjbGFzcyBUaW1lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIGRlbHRhVGltZTogaW52ZXJzZSByZWxhdGl2ZSB2YWx1ZSB0byB0aGUgZnBzIG9mIHRoZSBnYW1lLiBXaGVuIHRoZSBnYW1lIHJ1bnMgb24gNjBmcHMgdGhlIHZhbHVlIGlzIDEuXG4gICAqL1xuICBkZWx0YVRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogZGVsdGFUaW1lRlM6IGRlbHRhVGltZSBpbiBmbG9hdGluZyBwb2ludCBudW1iZXIuXG4gICAqL1xuICBkZWx0YVRpbWVGUzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiB0aW1lOiBzZWNvbmRzIGVsYXBzZWQgc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkXG4gICAqL1xuICB0aW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGZyYW1lVGltZTogYWxtb3N0IHRoZSBzYW1lIGFzIHN0YXJ0VGltZSwgaGFzIHRoZSBlbGFwc2VkIHNlY29uZHNcbiAgICovXG4gIGZyYW1lVGltZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBmcmFtZUNvdW50OiBudW1iZXIgb2YgZnJhbWVzIGVsYXBzZWQgc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkXG4gICAqL1xuICBmcmFtZUNvdW50OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGZwczogZnJhbWVzIHBlciBzZWNvbmQgb2YgdGhlIGdhbWVcbiAgICovXG4gIGZwczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBzdGFydFRpbWU6IHNlY29uZHMgZWxhcHNlZCBzY2llbmNlIHRoZSBnYW1lIHN0YXJ0ZWRcbiAgICovXG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBsYXN0VGltZTogbGFzdCB0aW1lIHRoZSBnYW1lIGxvb3Agd2FzIGV4ZWN1dGVkXG4gICAqL1xuICBsYXN0VGltZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiB1bmtub3duKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLmRlbHRhVGltZSA9IDA7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLmZyYW1lVGltZSA9IDA7XG4gICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB0aGlzLmZwcyA9IDA7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSAvIDEwMDA7XG4gICAgdGhpcy5sYXN0VGltZSA9IHRoaXMuc3RhcnRUaW1lO1xuICAgIHRoaXMubGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSAvIDEwMDA7XG4gIH1cblxuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB0aW1lIHZhbHVlcy5cbiAgICovXG4gIG1vdmUoKTogdm9pZCB7XG4gICAgbGV0IGN1cnJlbnQgPSBwZXJmb3JtYW5jZS5ub3coKSAvIDEwMDA7XG4gICAgdGhpcy5kZWx0YVRpbWVGUyA9IGN1cnJlbnQgLSB0aGlzLmxhc3RUaW1lO1xuICAgIHRoaXMuZGVsdGFUaW1lID0gdGhpcy5kZWx0YVRpbWVGUyAvICgxIC8gNjApO1xuICAgIHRoaXMuZnJhbWVUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xuICAgIHRoaXMudGltZSA9IGN1cnJlbnQgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICB0aGlzLmxhc3RUaW1lID0gY3VycmVudDtcbiAgICB0aGlzLmZwcyA9IDEwMDAgLyAodGhpcy5kZWx0YVRpbWVGUyAqIDEwMDApO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENhbWVyYSwgQ2FtZXJhQXJncyB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgR2FtZU9iamVjdCwgT2JqZWN0Q29uc3RydWN0b3IgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSBcIi4vY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgQ29sbGlkZXIsIENvbGxpZGVyQXJncyB9IGZyb20gXCIuL2NvbGxpZGVyc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGlzcGxheSwgRGlzcGxheUFyZ3MgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUsIEVuZ2luZUFyZ3MsIEVuZ2luZUNyZWF0ZUFyZ3MgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCIuL21hdHJpeFwiO1xuaW1wb3J0IHsgUGxhdGZvcm1Db250cm9sbGVyLCBQbGF0Zm9ybUNvbnRyb2xsZXJBcmdzLCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vcmVjdFwiO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tIFwiLi9yZWdpc3RyeVwiO1xuaW1wb3J0IHsgUmVzb3VyY2VUeXBlLCBSZXNvdXJjZXMgfSBmcm9tIFwiLi9yZXNvdXJjZXNcIjtcbmltcG9ydCB7IFNjZW5lLCBTY2VuZUFyZ3MgfSBmcm9tIFwiLi9zY2VuZXNcIjtcbmltcG9ydCB7IFNvdW5kIH0gZnJvbSBcIi4vc291bmRzXCI7XG5pbXBvcnQgeyBTcHJpdGVTaGVldCwgU3ByaXRlU2hlZXRBcmdzIH0gZnJvbSBcIi4vc3ByaXRlLXNoZWV0c1wiO1xuaW1wb3J0IHsgU3ByaXRlLCBTcHJpdGVBcmdzIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuaW1wb3J0IHsgVGlsZSwgVGlsZUFyZ3MsIFRpbGVDb3JuZXJzLCBUaWxlRWRnZXMgfSBmcm9tIFwiLi90aWxlXCI7XG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSBcIi4vdGlsZW1hcFwiO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCB7IFJlc291cmNlSXRlbSwgUmVzb3VyY2VJdGVtQXJncyB9IGZyb20gXCIuL3Jlc291cmNlc1wiO1xuXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogYW55O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuRW5naW5lID0gRW5naW5lO1xuICB3aW5kb3cuU3ByaXRlU2hlZXQgPSBTcHJpdGVTaGVldDtcbiAgd2luZG93LlRpbGUgPSBUaWxlO1xuICB3aW5kb3cuVGlsZU1hcCA9IFRpbGVNYXA7XG4gIHdpbmRvdy5QbGF5ZXIgPSBQbGF5ZXI7XG4gIHdpbmRvdy5QbGF0Zm9ybUNvbnRyb2xsZXIgPSBQbGF0Zm9ybUNvbnRyb2xsZXI7XG4gIHdpbmRvdy5TY2VuZSA9IFNjZW5lO1xufVxuXG5leHBvcnQge1xuICBDYW1lcmEsXG4gIENhbWVyYUFyZ3MsXG4gIENvbGxlY3Rpb24sXG4gIENvbGxpZGVyLFxuICBDb2xsaWRlckFyZ3MsXG4gIENvbXBvbmVudCxcbiAgRGVidWcsXG4gIERpc3BsYXksXG4gIERpc3BsYXlBcmdzLFxuICBFbmdpbmUsXG4gIEVuZ2luZUFyZ3MsXG4gIEVuZ2luZUNyZWF0ZUFyZ3MsXG4gIEdhbWVPYmplY3QsXG4gIElucHV0LFxuICBNYXRyaXgsXG4gIE9iamVjdENvbnN0cnVjdG9yLFxuICBQbGF0Zm9ybUNvbnRyb2xsZXIsXG4gIFBsYXRmb3JtQ29udHJvbGxlckFyZ3MsXG4gIFBsYXllcixcbiAgUG9pbnQsXG4gIFJlZ2lzdHJ5LFxuICBSZXNvdXJjZUl0ZW0sXG4gIFJlc291cmNlSXRlbUFyZ3MsXG4gIFJlc291cmNlVHlwZSxcbiAgUmVzb3VyY2VzLFxuICBTY2VuZSxcbiAgU2NlbmVBcmdzLFxuICBTb3VuZCxcbiAgU3ByaXRlLFxuICBTcHJpdGVBcmdzLFxuICBTcHJpdGVTaGVldCxcbiAgU3ByaXRlU2hlZXRBcmdzLFxuICBUaWxlLFxuICBUaWxlQXJncyxcbiAgVGlsZUNvcm5lcnMsXG4gIFRpbGVFZGdlcyxcbiAgVGlsZU1hcCxcbiAgVGltZSxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=