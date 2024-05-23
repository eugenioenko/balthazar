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
        return GENGINE_DEBUG_MODE;
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
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events */ "./src/events.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./input */ "./src/input.ts");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./registry */ "./src/registry.ts");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sounds */ "./src/sounds.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./time */ "./src/time.ts");











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
        this.registry = new _registry__WEBPACK_IMPORTED_MODULE_7__.Registry();
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
        this.resources = this.addComponent(_resources__WEBPACK_IMPORTED_MODULE_8__.Resources);
        this.camera = this.addComponent(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera, {
            x: 0,
            y: 0,
        });
        this.time = this.addComponent(_time__WEBPACK_IMPORTED_MODULE_10__.Time);
        this.sound = this.addComponent(_sounds__WEBPACK_IMPORTED_MODULE_9__.Sound);
        this.display = this.addComponent(_display__WEBPACK_IMPORTED_MODULE_4__.Display, {
            id: "canvas",
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
        });
        this.input = this.addComponent(_input__WEBPACK_IMPORTED_MODULE_6__.Input);
        this.events = this.addComponent(_events__WEBPACK_IMPORTED_MODULE_5__.Events);
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

/***/ "./src/events.ts":
/*!***********************!*\
  !*** ./src/events.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: () => (/* binding */ Events)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input */ "./src/input.ts");



class Events extends _components__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(engine, args) {
        super(engine, args);
        let input = this.components.get(_input__WEBPACK_IMPORTED_MODULE_2__.Input);
        let canvas = this.components.get(_display__WEBPACK_IMPORTED_MODULE_1__.Display).canvas;
        canvas.addEventListener("mousemove", (event) => input.mouseMove(event));
        canvas.addEventListener("mousedown", (event) => input.mouseDown(event));
        canvas.addEventListener("mouseenter", () => input.mouseEnter());
        canvas.addEventListener("mouseleave", () => input.mouseLeave());
        canvas.addEventListener("click", (event) => input.mouseClick(event));
        window.addEventListener("keydown", (event) => input.keyDown(event));
        window.addEventListener("keyup", (event) => input.keyUp(event));
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
    keyDown(event) {
        this.keyCode_[event.code] = true;
    }
    keyUp(event) {
        this.keyCode_[event.code] = false;
    }
    keyCode(code) {
        return typeof this.keyCode_[code] !== "undefined"
            ? this.keyCode_[code]
            : false;
    }
    getAxisHorizontal() {
        let result = this.keyCode("ArrowLeft") ? -1 : 0;
        result += this.keyCode("ArrowRight") ? 1 : 0;
        return result;
    }
    getAxisVertical() {
        let result = this.keyCode("ArrowUp") ? -1 : 0;
        result += this.keyCode("ArrowDown") ? 1 : 0;
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
        let corners = this.getCorners(sprite.x + moveDistanceX, sprite.y, sprite.width, sprite.height);
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
        return _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(x, 0, this.tileMap.width * this.tileMap.twidth - this.engine.display.width);
    }
    clampY(y) {
        return _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(y, 0, this.tileMap.height * this.tileMap.theight - this.engine.display.height);
    }
}
class Player extends _sprites__WEBPACK_IMPORTED_MODULE_7__.Sprite {
    constructor(engine, args) {
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
        let inputX = this.input.getAxisHorizontal();
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
        if (this.input.keyCode("KeyZ") &&
            inputX &&
            (this.corners.downLeft.solid.top || this.corners.downRight.solid.top)) {
            maxSpeedX *= 2;
        }
        this.velocityX = _maths__WEBPACK_IMPORTED_MODULE_5__.Maths.clamp(this.velocityX, -maxSpeedX, maxSpeedX);
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
        if (this.input.keyCode("ArrowUp") &&
            this.jumping &&
            this.jumpBooster < 10) {
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






/**
 * Class for managing tileMaps.
 */
class TileMap extends _sprites__WEBPACK_IMPORTED_MODULE_5__.Sprite {
    constructor(engine, args) {
        super(engine, args);
        this.matrix = new _matrix__WEBPACK_IMPORTED_MODULE_4__.Matrix(this.width, this.height);
        this.mwidth = this.width * this.twidth;
        this.mheight = this.height * this.theight;
        this.camera = this.components.get(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        this.display = this.components.get(_display__WEBPACK_IMPORTED_MODULE_2__.Display);
    }
    params() {
        return ["x", "y", "width", "height", "twidth", "theight", "sheet", "tiles"];
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
        return Math.floor((x / this.twidth) % this.mwidth);
    }
    getTileY(y) {
        return Math.floor((y / this.theight) % this.mheight);
    }
    getTile(x, y) {
        x = this.getTileX(x);
        y = this.getTileY(y);
        let tile = this.tiles[this.get(x, y)] || this.tiles[0];
        tile.x = x;
        tile.y = y;
        tile.width = this.twidth;
        tile.height = this.theight;
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
        let x2 = Math.ceil(this.display.width / this.twidth);
        let y2 = Math.ceil(this.display.height / this.theight);
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
                    this.display.drawTile(this.x + i * this.twidth, this.y + j * this.theight, this.twidth, this.theight, this.sheet, tile - 1);
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
/* harmony export */   Events: () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_8__.Events),
/* harmony export */   GameObject: () => (/* reexport safe */ _objects__WEBPACK_IMPORTED_MODULE_2__.GameObject),
/* harmony export */   Input: () => (/* reexport safe */ _input__WEBPACK_IMPORTED_MODULE_9__.Input),
/* harmony export */   Matrix: () => (/* reexport safe */ _matrix__WEBPACK_IMPORTED_MODULE_10__.Matrix),
/* harmony export */   PlatformController: () => (/* reexport safe */ _player__WEBPACK_IMPORTED_MODULE_11__.PlatformController),
/* harmony export */   Player: () => (/* reexport safe */ _player__WEBPACK_IMPORTED_MODULE_11__.Player),
/* harmony export */   Registry: () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_12__.Registry),
/* harmony export */   ResourceItem: () => (/* reexport safe */ _resources__WEBPACK_IMPORTED_MODULE_13__.ResourceItem),
/* harmony export */   Resources: () => (/* reexport safe */ _resources__WEBPACK_IMPORTED_MODULE_13__.Resources),
/* harmony export */   Scene: () => (/* reexport safe */ _scenes__WEBPACK_IMPORTED_MODULE_14__.Scene),
/* harmony export */   Sound: () => (/* reexport safe */ _sounds__WEBPACK_IMPORTED_MODULE_15__.Sound),
/* harmony export */   Sprite: () => (/* reexport safe */ _sprites__WEBPACK_IMPORTED_MODULE_17__.Sprite),
/* harmony export */   SpriteSheet: () => (/* reexport safe */ _sprite_sheets__WEBPACK_IMPORTED_MODULE_16__.SpriteSheet),
/* harmony export */   Tile: () => (/* reexport safe */ _tile__WEBPACK_IMPORTED_MODULE_18__.Tile),
/* harmony export */   TileMap: () => (/* reexport safe */ _tilemap__WEBPACK_IMPORTED_MODULE_19__.TileMap),
/* harmony export */   Time: () => (/* reexport safe */ _time__WEBPACK_IMPORTED_MODULE_20__.Time)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects */ "./src/objects.ts");
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collection */ "./src/collection.ts");
/* harmony import */ var _colliders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./colliders */ "./src/colliders.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components */ "./src/components.ts");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./engine */ "./src/engine.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events */ "./src/events.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./input */ "./src/input.ts");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./matrix */ "./src/matrix.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./player */ "./src/player.ts");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./registry */ "./src/registry.ts");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _scenes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./scenes */ "./src/scenes.ts");
/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sounds */ "./src/sounds.ts");
/* harmony import */ var _sprite_sheets__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./sprite-sheets */ "./src/sprite-sheets.ts");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./sprites */ "./src/sprites.ts");
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");
/* harmony import */ var _tilemap__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./tilemap */ "./src/tilemap.ts");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./time */ "./src/time.ts");






















if (typeof window !== "undefined") {
    window.Engine = _engine__WEBPACK_IMPORTED_MODULE_7__.Engine;
    window.SpriteSheet = _sprite_sheets__WEBPACK_IMPORTED_MODULE_16__.SpriteSheet;
    window.Tile = _tile__WEBPACK_IMPORTED_MODULE_18__.Tile;
    window.TileMap = _tilemap__WEBPACK_IMPORTED_MODULE_19__.TileMap;
    window.Player = _player__WEBPACK_IMPORTED_MODULE_11__.Player;
    window.PlatformController = _player__WEBPACK_IMPORTED_MODULE_11__.PlatformController;
    window.Scene = _scenes__WEBPACK_IMPORTED_MODULE_14__.Scene;
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsVUFBVSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDNUQsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQy9DLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsRUFBRSxHQUFHLHlDQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsR0FBRyx5Q0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNy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bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY2FtZXJhLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2NvbGxpZGVycy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2NvbGxpc2lvbnMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jb21wb25lbnRzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvZGVidWcudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9kaXNwbGF5LnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvZW5naW5lLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvZXZlbnRzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvaW5wdXQudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9tYXRocy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL21hdHJpeC50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL29iamVjdHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9yZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3Jlc291cmNlcy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3NjZW5lcy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3NvdW5kcy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3Nwcml0ZS1zaGVldHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9zcHJpdGVzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvdGlsZS50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3RpbGVtYXAudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy90aW1lLnRzIiwid2VicGFjazovL2dlbmdpbmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dlbmdpbmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImdlbmdpbmVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ2VuZ2luZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIG1hbmFnaW5nIGNhbWVyYSBwb3NpdGlvbiBvbiB0aGUgc2NyZWVuLlxuICogVGhlIENhbWVyYSBpcyB0aGUgdmlld3BvcnQgb2YgdGhlIGdhbWUsIHlvdSBzZWUgdGhlIGdhbWUgd29ybGQgdGhyb3VnaCB0aGUgY2FtZXJhLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FtZXJhQXJncyB7XG4gIC8qKlxuICAgKiB4IHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcbiAgICovXG5cbiAgeDogbnVtYmVyO1xuICAvKipcbiAgICogeSBwb3NpdGlvbiBvZiB0aGUgY2FtZXJhXG4gICAqL1xuICB5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBDYW1lcmEgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogeCBwb3NpdGlvbiBvZiB0aGUgY2FtZXJhXG4gICAqL1xuICB4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHkgcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxuICAgKi9cbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBDYW1lcmFBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcInhcIiwgXCJ5XCJdO1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHt9XG59XG4iLCIvKipcbiAqIENvbGxlY3Rpb24gYXJlIGEgZ3JvdXAgb2YgaXRlbXMgdGhhdCBjYW4gYmUgb2YgYW55IHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uPFQ+IHtcbiAgcHVibGljIGl0ZW1zOiBUW10gPSBbXTtcblxuICAvKipcbiAgICogQWRkIGFuIGl0ZW0gdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gYWRkLlxuICAgKi9cbiAgYWRkKGl0ZW06IFQpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSB0aGUgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byByZW1vdmUuXG4gICAqL1xuICByZW1vdmUoaXRlbTogVCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgaXRlbXMgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAqL1xuICBhbGwoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgVGVzdENvbGxpc2lvbiB9IGZyb20gXCIuL2NvbGxpc2lvbnNcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbGxpZGVyQXJncyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgcGFyZW50OiBTcHJpdGU7XG59XG5cbi8qKlxuICogQ29sbGlkZXIgcmVwcmVzZW50cyBhIHJlY3QvY2lyY2xlIHdoaWNoIGNhbiBjb2xsaWRlIHdpdGggYW5vdGhlciBjb2xsaWRlci5cbiAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgY29sbGlkZXIgaXMgcmVsYXRpdmUgdG8gaXRzIHBhcmVudCBzcHJpdGUuXG4gKiBBIHNwcml0ZSBjYW4gaGF2ZSBcImluZmluaXRlXCIgbnVtYmVyIG9mIGNvbGxpZGVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxpZGVyIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBwYXJlbnQ6IFNwcml0ZTtcbiAgeTogbnVtYmVyO1xuICB4OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogQ29sbGlkZXJBcmdzKSB7XG4gICAgc3VwZXIoYXJncyk7XG4gIH1cblxuICB0ZXN0KGNvbGxpZGVyOiBDb2xsaWRlcik6IGJvb2xlYW4ge1xuICAgIHRocm93IFwiTm90IGltcGxlbWVudGVkXCI7XG4gIH1cblxuICBnZXQgZ3goKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LnggKyB0aGlzLng7XG4gIH1cblxuICBnZXQgZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LnkgKyB0aGlzLnk7XG4gIH1cblxuICBkZWJ1Z0RyYXcoY29sb3I6IHN0cmluZyA9IFwicmVkXCIpIHtcbiAgICB0aHJvdyBcIk5vdCBpbXBsZW1lbnRlZFwiO1xuICB9XG59XG4vKipcbiAqIENpcmNsZUNvbGxpZGVyIGlzIGEgQ29sbGlkZXIgd2l0aCBhIGNpcmN1bGFyIHNoYXBlLlxuICovXG5leHBvcnQgY2xhc3MgQ2lyY2xlQ29sbGlkZXIgZXh0ZW5kcyBDb2xsaWRlciB7XG4gIHJhZGl1czogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IENvbGxpZGVyQXJncykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICAgIHRoaXMucmFkaXVzID0gdGhpcy53aWR0aCAvIDI7XG4gIH1cblxuICB0ZXN0KGNvbGxpZGVyOiBDb2xsaWRlcik6IGJvb2xlYW4ge1xuICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIENpcmNsZUNvbGxpZGVyKSB7XG4gICAgICByZXR1cm4gVGVzdENvbGxpc2lvbi5DaXJjbGVWc0NpcmNsZSh0aGlzLCBjb2xsaWRlcik7XG4gICAgfVxuICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIFJlY3RDb2xsaWRlcikge1xuICAgICAgcmV0dXJuIFRlc3RDb2xsaXNpb24uQ2lyY2xlVnNSZWN0KHRoaXMsIGNvbGxpZGVyKTtcbiAgICB9XG4gICAgdGhyb3cgXCJVbmtub3duIGNvbGxpZGVyXCI7XG4gIH1cblxuICBkZWJ1Z0RyYXcoY29sb3I6IHN0cmluZyA9IFwicmVkXCIpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5wYXJlbnQuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gICAgaWYgKCFkaXNwbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BsYXkuY2lyY2xlKHRoaXMuZ3gsIHRoaXMuZ3ksIHRoaXMucmFkaXVzLCBjb2xvcik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWN0Q29sbGlkZXIgaXMgYSBjb2xsaWRlciBvZiByZWN0YW5ndWxhciBzaGFwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3RDb2xsaWRlciBleHRlbmRzIENvbGxpZGVyIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBwYXJlbnQ6IFNwcml0ZTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbGxpZGVyQXJncykge1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gIH1cblxuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICB0ZXN0KGNvbGxpZGVyOiBDb2xsaWRlcik6IGJvb2xlYW4ge1xuICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIENpcmNsZUNvbGxpZGVyKSB7XG4gICAgICByZXR1cm4gVGVzdENvbGxpc2lvbi5DaXJjbGVWc1JlY3QoY29sbGlkZXIsIHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY29sbGlkZXIgaW5zdGFuY2VvZiBSZWN0Q29sbGlkZXIpIHtcbiAgICAgIHJldHVybiBUZXN0Q29sbGlzaW9uLlJlY3RWc1JlY3QodGhpcywgY29sbGlkZXIpO1xuICAgIH1cblxuICAgIERlYnVnLmVycm9yKFwiVW5rbm93biBjb2xsaWRlciBcIiArIHR5cGVvZiBjb2xsaWRlcik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVidWdEcmF3KGNvbG9yOiBzdHJpbmcgPSBcInJlZFwiKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMucGFyZW50LmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpO1xuICAgIGlmICghZGlzcGxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwbGF5LnJlY3QodGhpcy5neCwgdGhpcy5neSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGNvbG9yKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2lyY2xlQ29sbGlkZXIsIFJlY3RDb2xsaWRlciB9IGZyb20gXCIuL2NvbGxpZGVyc1wiO1xuXG4vKipcbiAqIEEgY2xhc3Mgd2l0aCBzdGF0aWMgbWV0aG9kcyB3aGljaCB0ZXN0IGZvciBjb2xsaXNpb24gYmV0d2VlbiBkaWZmZXJlbnRcbiAqIHR5cGVzIG9mIGNvbGxpZGVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RDb2xsaXNpb24ge1xuICBzdGF0aWMgQ2lyY2xlVnNSZWN0KGNpcmNsZTogQ2lyY2xlQ29sbGlkZXIsIHJlY3Q6IFJlY3RDb2xsaWRlcik6IGJvb2xlYW4ge1xuICAgIGxldCBoYWxmUmVjdFdpZHRoID0gcmVjdC53aWR0aCAvIDI7XG4gICAgbGV0IGhhbGZSZWN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQgLyAyO1xuICAgIGxldCBoYWxmRGlzdFggPSBNYXRoLmFicyhjaXJjbGUuZ3ggLSByZWN0Lmd4IC0gaGFsZlJlY3RXaWR0aCk7XG4gICAgbGV0IGhhbGZEaXN0WSA9IE1hdGguYWJzKGNpcmNsZS5neSAtIHJlY3QuZ3kgLSBoYWxmUmVjdEhlaWdodCk7XG4gICAgaWYgKGhhbGZEaXN0WCA+IGhhbGZSZWN0V2lkdGggKyBjaXJjbGUucmFkaXVzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGhhbGZEaXN0WSA+IGhhbGZSZWN0SGVpZ2h0ICsgY2lyY2xlLnJhZGl1cykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChoYWxmRGlzdFggPD0gaGFsZlJlY3RXaWR0aCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGhhbGZEaXN0WSA8PSBoYWxmUmVjdEhlaWdodCkgcmV0dXJuIHRydWU7XG4gICAgLy9jb3JuZXIgY29sbGlzaW9uXG4gICAgbGV0IGR4ID0gaGFsZkRpc3RYIC0gaGFsZlJlY3RXaWR0aDtcbiAgICBsZXQgZHkgPSBoYWxmRGlzdFkgLSBoYWxmUmVjdEhlaWdodDtcbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHkgPD0gTWF0aC5wb3coY2lyY2xlLnJhZGl1cywgMik7XG4gIH1cblxuICBzdGF0aWMgUmVjdFZzQ2lyY2xlKHJlY3Q6IFJlY3RDb2xsaWRlciwgY2lyY2xlOiBDaXJjbGVDb2xsaWRlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLkNpcmNsZVZzUmVjdChjaXJjbGUsIHJlY3QpO1xuICB9XG5cbiAgc3RhdGljIFJlY3RWc1JlY3QocmVjdDE6IFJlY3RDb2xsaWRlciwgcmVjdDI6IFJlY3RDb2xsaWRlcik6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIHJlY3QxLmd4IDw9IHJlY3QyLmd4ICsgcmVjdDIud2lkdGggJiZcbiAgICAgIHJlY3QxLmd4ICsgcmVjdDEud2lkdGggPiByZWN0Mi5neCAmJlxuICAgICAgcmVjdDEuZ3kgPD0gcmVjdDIuZ3kgKyByZWN0Mi5oZWlnaHQgJiZcbiAgICAgIHJlY3QxLmhlaWdodCArIHJlY3QxLmd5ID49IHJlY3QyLmd5XG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIENpcmNsZVZzQ2lyY2xlKFxuICAgIGNpcmNsZTE6IENpcmNsZUNvbGxpZGVyLFxuICAgIGNpcmNsZTI6IENpcmNsZUNvbGxpZGVyXG4gICk6IGJvb2xlYW4ge1xuICAgIGxldCBkeCA9IGNpcmNsZTEuZ3ggLSBjaXJjbGUyLmd4O1xuICAgIGxldCBkeSA9IGNpcmNsZTEuZ3kgLSBjaXJjbGUyLmd5O1xuICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgaWYgKGRpc3RhbmNlIDwgY2lyY2xlMS53aWR0aCAvIDIgKyBjaXJjbGUyLndpZHRoIC8gMikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBPYmplY3RDb25zdHJ1Y3RvciwgR2FtZU9iamVjdCB9IGZyb20gXCIuL29iamVjdHNcIjtcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSBcIi4vcmVnaXN0cnlcIjtcblxuLyoqXG4gKiBUaGlzIGlzIGEgYmFzZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50IG9mIHRoZSBlbmdpbmUuXG4gKiBUaGUgZW5naW5lIGNvbnNpc3Qgb2YgbXVsdGlwbGUgY29tcG9uZW50cyB3aGljaCBwZXJmb3JtIHZhcmlvdXMgdGFza3MuXG4gKiBTb21lIENvbXBvbmVudHMgZm9ybSBwYXJ0IG9mIHRoZSBjb3JlIG9mIHRoZSBFbmdpbmUsIG90aGVycyBjb3VsZCBiZSBhZGRlZCBhcyBuZWVkIGF0IHJ1bnRpbWUuXG4gKiBXaGVuIHRoZSBFbmdpbmUgaXMgcmVhZHksIGl0IHdpbGwgY3JlYXRlIHRoZSBpbnN0YW5jZSBvZiB0aGUgY29tcG9uZW50IGFuZCBwYXNzIGl0c2VsZiBhcyB0aGUgZW5naW5lIHBhcmFtZXRlci5cbiAqIEVhY2ggQ29tcG9uZW50IGluc3RhbmNlIGhhcyBhY2Nlc3MgdG8gdGhlIGVuZ2luZVxuICogQHBhcmFtIHtvYmplY3R9IGVuZ2luZSBUaGUgaW5zdGFuY2Ugb2YgdGhlIGVuZ2luZSwgdGhpcyB3aWxsIGJlIHBhc3NlZCBieSB0aGUgZW5naW5lXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIE9iamVjdCBsaXRlcmFsIHdpdGggcGFyYW1ldGVycyBwYXNzZWQgdG8gdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RlZFxuICovXG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgZW5naW5lOiBFbmdpbmU7XG4gIG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIHN1cGVyKGFyZ3MpO1xuICAgIHRoaXMuZW5naW5lID0gZW5naW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBlbmdpbmUgYW5kIGlzIHJlYWR5XG4gICAqL1xuICBpbml0KCkge1xuICAgIERlYnVnLnN1Y2Nlc3MoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBpbml0aWFsaXplZGApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgZWFjaCBjeWNsZSBvZiB0aGUgZW5naW5lIGdhbWUgbG9vcFxuICAgKi9cbiAgbW92ZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgZWFjaCBjeWNsZSBvZiB0aGUgZW5naW5lIGdhbWUgbG9vcFxuICAgKi9cbiAgZHJhdygpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIEVuZ2luZXMgY29tcG9uZW50IHJlZ2lzdHJ5XG4gICAqL1xuICBnZXQgY29tcG9uZW50cygpOiBSZWdpc3RyeSB7XG4gICAgcmV0dXJuIHRoaXMuZW5naW5lLnJlZ2lzdHJ5O1xuICB9XG59XG4iLCIvKipcbiAqIENsYXNzIHdpdGggc3RhdGljIG1ldGhvZHMgdG8gZmFjaWxpdGF0ZSB0aGUgbWVzc2FnZXMgb24gdGhlIGphdmFzY3JpcHQgY29uc29sZS5cbiAqIEFsbCB0aGUgbWV0aG9kcyBvZiBEZWJ1ZyBjbGFzcyB3aWxsIG9ubHkgcnVuIGlmIHRoZSBkZWJ1ZyBtb2RlIGlzIG9uLlxuICogVG8gYWN0aXZhdGUgdGhlIGRlYnVnIG1vZGUsIGRlY2xhcmUgYSBnbG9iYWwgdmFyaWFibGUgYmVmb3JlIGluaXRpYWxpemluZyB0aGUgZW5naW5lXG4gKiB3aXRoIHRoZSBuYW1lOiBHRU5HSU5FX0RFQlVHX01PREUgPSB0cnVlLlxuICogSWYgdGhlIGRlYnVnIG1vZGUgaXMgb2ZmLCBubyBtZXNzYWdlcyB3b3VsZCBiZSBzZW50IHRvIHRoZSBjb25zb2xlLlxuICovXG5cbmRlY2xhcmUgY29uc3QgR0VOR0lORV9ERUJVR19NT0RFOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgY2xhc3MgRGVidWcge1xuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgSWYgdGhlIGRlYnVnIG1vZGUgaXMgYWN0aXZlXG4gICAqL1xuICBzdGF0aWMgYWN0aXZlKCkge1xuICAgIHJldHVybiBHRU5HSU5FX0RFQlVHX01PREU7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgbWVzc2FnZSB0byB0aGUgY29uc29sZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGxvZyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS50cmFjZSgpO1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIGluZm8gbWVzc2FnZSB0byB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGluZm8obWVzc2FnZTogc3RyaW5nKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSBzdWNjZXNzIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgd2hlbiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICovXG4gIHN0YXRpYyBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmluZm8obWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIHdoZW4gdGhlIGRlYnVnIG1vZGUgaXMgYWN0aXZlXG4gICAqL1xuICBzdGF0aWMgd2FybihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGFuIGVycm9yIG1lc3NhZ2Ugd2hlbiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICovXG4gIHN0YXRpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBhIGdyb3VwIG9mIG1lc3NhZ2VzIGluIHRoZSBjb25zb2xlXG4gICAqIEBwYXJhbSBuYW1lIG9mIHRoZSBncm91cFxuICAgKi9cbiAgc3RhdGljIGdyb3VwU3RhcnQobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRW5kIGEgZ3JvdXAgb2YgbWVzc2FnZXMgaW4gdGhlIGNvbnNvbGVcbiAgICovXG4gIHN0YXRpYyBncm91cEVuZCgpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGF0IHRoZSBvYmplY3QgbGl0ZXJhbCBvZiB0aGUgY29uc3RydWN0b3IgaGFzIHRoZSBlbGVtZW50cyBvZiB0aGUgcmVxdWlyZWQgYXJyYXlcbiAgICogQHBhcmFtIG1ldGhvZCBPYmplY3QgbWV0aG9kIG5hbWVcbiAgICogQHBhcmFtIGFyZ3MgdGhlIGFyZ3VtZW50cyBvYmplY3QgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSByZXF1aXJlZCBsaXN0IG9mIHJlcXVpcmVkIG1lbWJlcnMgaW4gdGhlIGNvbnN0cnVjdG9yIGFyZ3VtZW50c1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIHZhbGlkYXRlUGFyYW1zKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgcmVxdWlyZWQ6IHN0cmluZ1tdXG4gICkge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoIXJlcXVpcmVkIHx8ICFyZXF1aXJlZC5sZW5ndGgpIHJldHVybjtcbiAgICBpZiAocmVxdWlyZWQubGVuZ3RoICYmICFhcmdzKSB7XG4gICAgICBEZWJ1Zy53YXJuKFxuICAgICAgICBgJHttZXRob2R9IHJlcXVpcmVzIHRoaXMgbWVtYmVycyBpbiB0aGUgY29uc3RydWN0b3I6IHske3JlcXVpcmVkLmpvaW4oXG4gICAgICAgICAgXCIsXCJcbiAgICAgICAgKX19YFxuICAgICAgKTtcbiAgICB9XG4gICAgZm9yIChsZXQga2V5IG9mIHJlcXVpcmVkKSB7XG4gICAgICBpZiAodHlwZW9mIGFyZ3Nba2V5XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBEZWJ1Zy5lcnJvcihgJHttZXRob2R9IHJlcXVpcmVzIG9mIFwiJHtrZXl9XCIgaW4gdGhlIGNvbnN0cnVjdG9yYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRzXCI7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3Mgb2YgdGhlIERpc3BsYXkgY29tcG9uZW50IG9mIHRoZSBFbmdpbmUuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEaXNwbGF5QWJzdHJhY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gIH1cblxuICBjbGVhcigpIHt9XG5cbiAgZmlsbFJlY3QoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGNvbG9yOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7fVxuXG4gIGNpcmNsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgZGlhbWV0ZXI6IG51bWJlciwgY29sb3I6IHN0cmluZykge31cblxuICBtb3ZlKCk6IHZvaWQge31cbn1cblxuLyoqXG4gKiBDbGFzcyBvZiB0aGUgRGlzcGxheSBjb21wb25lbnQgb2YgdGhlIEVuZ2luZS5cbiAqIFRoZSBEaXNwbGF5IGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIHRoZSBnYW1lIG9iamVjdHMgb24gdGhlIHNjcmVlbi5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXlBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpbWFnZSBzbW9vdGhpbmcgaXMgZW5hYmxlZFxuICAgKi9cbiAgaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5IGV4dGVuZHMgRGlzcGxheUFic3RyYWN0IHtcbiAgLyoqXG4gICAqIFRoZSBjYW52YXMgZWxlbWVudFxuICAgKi9cbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAvKipcbiAgICogVGhlIGNhbnZhcyByZW5kZXJpbmcgY29udGV4dFxuICAgKi9cbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjYW1lcmEgb2YgdGhlIGRpc3BsYXlcbiAgICovXG4gIGNhbWVyYTogQ2FtZXJhO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGRpc3BsYXlcbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXlcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIGNhbnZhcyBlbGVtZW50XG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgaW1hZ2Ugc21vb3RoaW5nIGlzIGVuYWJsZWRcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGlzSW1hZ2VTbW9vdGhpbmdFbmFibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBEaXNwbGF5QXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBgJHt0aGlzLndpZHRofWApO1xuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBgJHt0aGlzLmhlaWdodH1gKTtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcIm5vbmVcIjtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmN0eC5mb250ID0gXCIxMnB4IEhlbHZldGljYVwiO1xuICAgIHRoaXMuY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KENhbWVyYSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciB0aGUgZGlzcGxheVxuICAgKi9cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW1wiaWRcIiwgXCJ4XCIsIFwieVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCJdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgZGVmYXVsdCBvcHRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgZGlzcGxheVxuICAgKi9cbiAgY29uZmlnKCk6IFBhcnRpYWw8RGlzcGxheUFyZ3M+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiMwRkZcIjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBmaWxsUmVjdChcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgY29sb3I6IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmN0eC5yZWN0KC10aGlzLmNhbWVyYS54ICsgeCwgLXRoaXMuY2FtZXJhLnkgKyB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gIH1cblxuICByZWN0KFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmN0eC5yZWN0KC10aGlzLmNhbWVyYS54ICsgeCwgLXRoaXMuY2FtZXJhLnkgKyB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIGNpcmNsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgZGlhbWV0ZXI6IG51bWJlciwgY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYyhcbiAgICAgIC10aGlzLmNhbWVyYS54ICsgeCxcbiAgICAgIC10aGlzLmNhbWVyYS55ICsgeSxcbiAgICAgIGRpYW1ldGVyIC8gMixcbiAgICAgIDAsXG4gICAgICAyICogTWF0aC5QSSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgdGV4dCh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGltYWdlIFRoZSBpbWFnZSB0byBkcmF3XG4gICAqIEBwYXJhbSBzeCBUaGUgeCBjb29yZGluYXRlIHdoZXJlIHRvIHN0YXJ0IGNsaXBwaW5nXG4gICAqIEBwYXJhbSBzeSBUaGUgeSBjb29yZGluYXRlIHdoZXJlIHRvIHN0YXJ0IGNsaXBwaW5nXG4gICAqIEBwYXJhbSBzV2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjbGlwcGVkIGltYWdlXG4gICAqIEBwYXJhbSBzSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNsaXBwZWQgaW1hZ2VcbiAgICogQHBhcmFtIGR4IFRoZSB4IGNvb3JkaW5hdGUgd2hlcmUgdG8gcGxhY2UgdGhlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIGR5IFRoZSB5IGNvb3JkaW5hdGUgd2hlcmUgdG8gcGxhY2UgdGhlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIGRXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGltYWdlIHRvIHVzZVxuICAgKiBAcGFyYW0gZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBpbWFnZSB0byB1c2VcbiAgICovXG4gIGRyYXdJbWFnZShcbiAgICBpbWFnZTogQ2FudmFzSW1hZ2VTb3VyY2UsXG4gICAgc3g6IG51bWJlcixcbiAgICBzeTogbnVtYmVyLFxuICAgIHNXaWR0aDogbnVtYmVyLFxuICAgIHNIZWlnaHQ6IG51bWJlcixcbiAgICBkeDogbnVtYmVyLFxuICAgIGR5OiBudW1iZXIsXG4gICAgZFdpZHRoOiBudW1iZXIsXG4gICAgZEhlaWdodDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geCBUaGUgeCBjb29yZGluYXRlIHdoZXJlIHRvIHBsYWNlIHRoZSB0aWxlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIHkgVGhlIHkgY29vcmRpbmF0ZSB3aGVyZSB0byBwbGFjZSB0aGUgdGlsZSBpbWFnZSBvbiB0aGUgY2FudmFzXG4gICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIHRpbGUgaW1hZ2UgdG8gdXNlXG4gICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgdGlsZSBpbWFnZSB0byB1c2VcbiAgICogQHBhcmFtIHNoZWV0IFRoZSBzcHJpdGUgc2hlZXQgdG8gdXNlXG4gICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGltYWdlIHRvIHVzZSB3aXRoaW4gdGhlIHNwcml0ZSBzaGVldFxuICAgKi9cbiAgZHJhd1RpbGUoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHNoZWV0OiBTcHJpdGVTaGVldCxcbiAgICBpbmRleDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGxldCB0aWxlID0gc2hlZXQudGlsZXNbaW5kZXhdO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgIHNoZWV0LmltYWdlLFxuICAgICAgdGlsZS54LFxuICAgICAgdGlsZS55LFxuICAgICAgc2hlZXQud2lkdGgsXG4gICAgICBzaGVldC5oZWlnaHQsXG4gICAgICB4IC0gdGhpcy5jYW1lcmEueCxcbiAgICAgIHkgLSB0aGlzLmNhbWVyYS55LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHRcbiAgICApO1xuICAgIGlmIChEZWJ1Zy5hY3RpdmUoKSkge1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjRjBGXCI7XG4gICAgICB0aGlzLmN0eC5mb250ID0gXCIxOHB4IEFyaWFsXCI7XG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgYCR7aW5kZXggKyAxfWAsXG4gICAgICAgIHggLSB0aGlzLmNhbWVyYS54ICsgd2lkdGggLyAyLFxuICAgICAgICB5IC0gdGhpcy5jYW1lcmEueSArIGhlaWdodCAvIDJcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tIFwiLi9jb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRXZlbnRzIH0gZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgeyBPYmplY3RDb25zdHJ1Y3RvciB9IGZyb20gXCIuL29iamVjdHNcIjtcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSBcIi4vcmVnaXN0cnlcIjtcbmltcG9ydCB7IFJlc291cmNlSXRlbUFyZ3MsIFJlc291cmNlcyB9IGZyb20gXCIuL3Jlc291cmNlc1wiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi9zY2VuZXNcIjtcbmltcG9ydCB7IFNvdW5kIH0gZnJvbSBcIi4vc291bmRzXCI7XG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSBcIi4vdGlsZW1hcFwiO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gXCIuL3RpbWVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFbmdpbmVBcmdzIHtcbiAgY2FudmFzOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVuZ2luZUNyZWF0ZUFyZ3Mge1xuICBjYW52YXM6IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHJlc291cmNlczogUmVzb3VyY2VJdGVtQXJnc1tdO1xuICBnYW1lOiAoZW5naW5lOiBFbmdpbmUpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogRW5naW5lIGlzIHRoZSBtYWluIG9iamVjdCBvZiB0aGUgZ2FtZSBlbmdpbmUuXG4gKiBFbmdpbmUgY29uc2lzdCBvZiBhIGdyb3VwIG9mIGRpZmZlcmVudCBjb21wb25lbnRzIHdoaWNoIG1hbmFnZSBkaWZmZXJlbnQgdGFza3MuXG4gKiBFYWNoIGNvbXBvbmVudCBpcyBhIGxlZ28gcGllY2UsIGFuZCB0aGUgZW5naW5lIGlzIHRoZSBnbHVlIHdoaWNoIGJpbmRzIHRoZW0gdG9nZXRoZXIuXG4gKiBPbmNlIHRoZSBkb2N1bWVudCBpcyByZWFkeSwgRW5naW5lIHdpbGwgaW5pdGlhbGl6ZSBlYWNoIGNvbXBvbmVudCBhZGRlZFxuICogaW50byBpdCwgY2FsbCB0aGUgcHJlbG9hZGVyIG1ldGhvZCwgZXhlY3V0ZSB0aGUgZ2FtZSBjcmVhdGlvbiBmdW5jdGlvblxuICogYW5kIHRoZW4gc3RhcnQgZXhlY3V0aW5nIHRoZSBnYW1lIGxvb3AuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmdpbmUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBlbmdpbmU6IEVuZ2luZTtcbiAgLy8gVE9ETyByZW1vdmUgdGlsZSBtYXAgZnJvbSBlbmdpbmVcbiAgdGlsZU1hcDogVGlsZU1hcDtcbiAgcmVnaXN0cnkgPSBuZXcgUmVnaXN0cnkoKTtcbiAgc2NlbmVzID0gbmV3IENvbGxlY3Rpb248U2NlbmU+KCk7XG4gIHRpbWU6IFRpbWU7XG4gIGRpc3BsYXk6IERpc3BsYXk7XG4gIHJlc291cmNlczogUmVzb3VyY2VzO1xuICBjYW1lcmE6IENhbWVyYTtcbiAgc291bmQ6IFNvdW5kO1xuICBpbnB1dDogSW5wdXQ7XG4gIGV2ZW50czogRXZlbnRzO1xuICBmcHNEZWxheUNvdW50ID0gMDtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogRW5naW5lQXJncykge1xuICAgIHN1cGVyKHVuZGVmaW5lZCwgYXJncyk7XG4gICAgdGhpcy5lbmdpbmUgPSB0aGlzO1xuICAgIERlYnVnLmdyb3VwU3RhcnQoXCJFbmdpbmUgbG9hZGVkIGNvbXBvbmVudHNcIik7XG4gICAgdGhpcy5yZXNvdXJjZXMgPSB0aGlzLmFkZENvbXBvbmVudChSZXNvdXJjZXMpO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5hZGRDb21wb25lbnQoQ2FtZXJhLCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9KTtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLmFkZENvbXBvbmVudChUaW1lKTtcbiAgICB0aGlzLnNvdW5kID0gdGhpcy5hZGRDb21wb25lbnQoU291bmQpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuYWRkQ29tcG9uZW50KERpc3BsYXksIHtcbiAgICAgIGlkOiBcImNhbnZhc1wiLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgfSk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuYWRkQ29tcG9uZW50KElucHV0KTtcbiAgICB0aGlzLmV2ZW50cyA9IHRoaXMuYWRkQ29tcG9uZW50KEV2ZW50cyk7XG4gICAgRGVidWcuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wiY2FudmFzXCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIGZ1bmN0aW9uIHRvIHJlcGxhY2UgdGhlIHdpbmRvd3Mub25sb2FkIG1ldGhvZC5cbiAgICogT25jZSB0aGUgd2luZG93IGlzIHJlYWR5LCBlbmdpbmUgd2lsbCBpbml0aWFsaXplIGl0cyBjb21wb25lbnRzLCBleGVjdXRlXG4gICAqIHRoZSBwcmVsb2FkZXIgYW5kIHdoZW4gcHJlbG9hZGVyIGxvYWRlZCBhbGwgdGhlIHJlc291cmNlcywgY3JlYXRlIHRoZSBnYW1lXG4gICAqIGFuZCBleGVjdXRlIHRoZSBnYW1lbG9vcC5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGUoYXJnczogRW5naW5lQ3JlYXRlQXJncykge1xuICAgIERlYnVnLnZhbGlkYXRlUGFyYW1zKFwiRW5naW5lLmNyZWF0ZVwiLCBhcmdzLCBbXG4gICAgICBcImNhbnZhc1wiLFxuICAgICAgXCJ3aWR0aFwiLFxuICAgICAgXCJoZWlnaHRcIixcbiAgICAgIFwicmVzb3VyY2VzXCIsXG4gICAgICBcImdhbWVcIixcbiAgICBdKTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZW5naW5lID0gbmV3IEVuZ2luZSh7XG4gICAgICAgICAgY2FudmFzOiBhcmdzLmNhbnZhcyxcbiAgICAgICAgICB3aWR0aDogYXJncy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGFyZ3MuaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZSBvZiBhcmdzLnJlc291cmNlcykge1xuICAgICAgICAgIGVuZ2luZS5yZXNvdXJjZXMuYWRkKHJlc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBlbmdpbmUucmVzb3VyY2VzLnByZWxvYWQoKTtcbiAgICAgICAgZW5naW5lLmluaXQoKTtcbiAgICAgICAgYXJncy5nYW1lKGVuZ2luZSk7XG4gICAgICAgIGVuZ2luZS5nYW1lTG9vcCgpO1xuICAgICAgICAod2luZG93IGFzIGFueSlbXCJnZW5naW5lXCJdID0gZW5naW5lO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY29tcG9uZW50IHRvIHRoZSBlbmdpbmUuXG4gICAqIEBwYXJhbSBDb25zdHJ1Y3RvciBUaGUgY29uc3RydWN0b3Igb2YgdGhlIGNvbXBvbmVudCB0byBzdG9yZS5cbiAgICogQHBhcmFtIGFyZ3MgIHRvIGluaXRpYWxpemUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGFkZENvbXBvbmVudChDb25zdHJ1Y3RvcjogT2JqZWN0Q29uc3RydWN0b3I8YW55PiwgYXJnczogYW55ID0ge30pIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBhcmdzKTtcbiAgICB0aGlzLmNvbXBvbmVudHMuc2V0KENvbnN0cnVjdG9yLCBpbnN0YW5jZSk7XG4gICAgaW5zdGFuY2UuaW5pdCgpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgY29tcG9uZW50IG9mIHRoaXMucmVnaXN0cnkudmFsdWVzPENvbXBvbmVudD4oKSkge1xuICAgICAgY29tcG9uZW50Lm1vdmUoKTtcbiAgICB9XG4gICAgZm9yIChsZXQgc2NlbmUgb2YgdGhpcy5zY2VuZXMuYWxsKCkpIHtcbiAgICAgIGlmIChzY2VuZS5pc0FjdGl2ZSkge1xuICAgICAgICBzY2VuZS5tb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXkuY2xlYXIoKTtcbiAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgdGhpcy5yZWdpc3RyeS52YWx1ZXM8Q29tcG9uZW50PigpKSB7XG4gICAgICBjb21wb25lbnQuZHJhdygpO1xuICAgIH1cbiAgICBmb3IgKGxldCBzY2VuZSBvZiB0aGlzLnNjZW5lcy5hbGwoKSkge1xuICAgICAgaWYgKHNjZW5lLmlzVmlzaWJsZSkge1xuICAgICAgICBzY2VuZS5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChEZWJ1Zy5hY3RpdmUoKSAmJiB0aGlzLmlucHV0Lm1vdXNlLmlzSW5zaWRlKSB7XG4gICAgICB0aGlzLmRpc3BsYXkuY2lyY2xlKFxuICAgICAgICB0aGlzLmNhbWVyYS54ICsgdGhpcy5pbnB1dC5tb3VzZS54IC0gMSxcbiAgICAgICAgdGhpcy5jYW1lcmEueSArIHRoaXMuaW5wdXQubW91c2UueSAtIDEsXG4gICAgICAgIDYsXG4gICAgICAgIFwicmVkXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gICAgdGhpcy5tb3ZlKCk7XG4gICAgdGhpcy5mcHNEZWxheUNvdW50ID0gMDtcbiAgICB0aGlzLmRyYXcoKTtcbiAgICB0aGlzLmRlYnVnSW5mbygpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcCk7XG4gIH07XG5cbiAgZGVidWdJbmZvKCkge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICB0aGlzLmRpc3BsYXkudGV4dCh0aGlzLnRpbWUudGltZS50b0ZpeGVkKDIpLCAyMCwgMjApO1xuICAgIHRoaXMuZGlzcGxheS50ZXh0KHRoaXMudGltZS5kZWx0YVRpbWUudG9GaXhlZCg0KSwgMjAsIDQwKTtcbiAgICB0aGlzLmRpc3BsYXkudGV4dCh0aGlzLnRpbWUuZnBzLnRvRml4ZWQoMiksIDIwLCA2MCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuZXhwb3J0IGNsYXNzIEV2ZW50cyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiB7fSkge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgbGV0IGlucHV0ID0gdGhpcy5jb21wb25lbnRzLmdldChJbnB1dCk7XG4gICAgbGV0IGNhbnZhcyA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSkuY2FudmFzO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChldmVudDogYW55KSA9PlxuICAgICAgaW5wdXQubW91c2VNb3ZlKGV2ZW50KVxuICAgICk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50OiBhbnkpID0+XG4gICAgICBpbnB1dC5tb3VzZURvd24oZXZlbnQpXG4gICAgKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4gaW5wdXQubW91c2VFbnRlcigpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4gaW5wdXQubW91c2VMZWF2ZSgpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiBpbnB1dC5tb3VzZUNsaWNrKGV2ZW50KSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudDogYW55KSA9PiBpbnB1dC5rZXlEb3duKGV2ZW50KSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQ6IGFueSkgPT4gaW5wdXQua2V5VXAoZXZlbnQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4vY2FtZXJhXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcblxuLyoqXG4gKiBJbnB1dCBjbGFzcyB0byBoYW5kbGUgdGhlIHVzZXIgaW5wdXRcbiAqL1xuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENhbWVyYSBjb21wb25lbnRcbiAgICovXG4gIGNhbWVyYTogQ2FtZXJhO1xuXG4gIC8qKlxuICAgKiBLZXkgY29kZXNcbiAgICovXG4gIGtleUNvZGVfOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfTtcblxuICAvKipcbiAgICogTW91c2UgY29vcmRpbmF0ZXNcbiAgICovXG4gIG1vdXNlOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyBpc0luc2lkZTogYm9vbGVhbiB9O1xuXG4gIC8qKlxuICAgKiBUaWxlIGlucHV0IGVsZW1lbnRcbiAgICovXG4gIHRpbGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSkge1xuICAgIHN1cGVyKGVuZ2luZSwge30pO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jb21wb25lbnRzLmdldChDYW1lcmEpO1xuICAgIHRoaXMua2V5Q29kZV8gPSB7fTtcbiAgICB0aGlzLm1vdXNlID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICBpc0luc2lkZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50aWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgfVxuXG4gIG1vdXNlTW92ZShldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgbGV0IHJlY3QgPSB0aGlzLmVuZ2luZS5kaXNwbGF5LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLm1vdXNlLnggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgIHRoaXMubW91c2UueSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICBpZiAoZXZlbnQuYnV0dG9ucyA9PT0gMikge1xuICAgICAgdGhpcy5jYW1lcmEueCAtPSBldmVudC5tb3ZlbWVudFg7XG4gICAgICB0aGlzLmNhbWVyYS55IC09IGV2ZW50Lm1vdmVtZW50WTtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICBsZXQgeCA9IHRoaXMuZW5naW5lLnRpbGVNYXAuZ2V0VGlsZVgodGhpcy5tb3VzZS54ICsgdGhpcy5jYW1lcmEueCk7XG4gICAgICBsZXQgeSA9IHRoaXMuZW5naW5lLnRpbGVNYXAuZ2V0VGlsZVkodGhpcy5tb3VzZS55ICsgdGhpcy5jYW1lcmEueSk7XG4gICAgICB0aGlzLmVuZ2luZS50aWxlTWFwLnNldCh4LCB5LCBwYXJzZUludCh0aGlzLnRpbGVJbnB1dC52YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy5tb3VzZS5pc0luc2lkZSA9IHRydWU7XG4gIH1cblxuICBtb3VzZUxlYXZlKCkge1xuICAgIHRoaXMubW91c2UuaXNJbnNpZGUgPSBmYWxzZTtcbiAgfVxuXG4gIG1vdXNlQ2xpY2soZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmIChldmVudC5tZXRhS2V5KSB7XG4gICAgICBsZXQgeCA9IHRoaXMuZW5naW5lLnRpbGVNYXAuZ2V0VGlsZVgodGhpcy5tb3VzZS54ICsgdGhpcy5jYW1lcmEueCk7XG4gICAgICBsZXQgeSA9IHRoaXMuZW5naW5lLnRpbGVNYXAuZ2V0VGlsZVkodGhpcy5tb3VzZS55ICsgdGhpcy5jYW1lcmEueSk7XG4gICAgICB0aGlzLnRpbGVJbnB1dC52YWx1ZSA9IGAke3RoaXMuZW5naW5lLnRpbGVNYXAuZ2V0KHgsIHkpfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB4ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWCh0aGlzLm1vdXNlLnggKyB0aGlzLmNhbWVyYS54KTtcbiAgICAgIGxldCB5ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWSh0aGlzLm1vdXNlLnkgKyB0aGlzLmNhbWVyYS55KTtcbiAgICAgIHRoaXMuZW5naW5lLnRpbGVNYXAuc2V0KHgsIHksIHBhcnNlSW50KHRoaXMudGlsZUlucHV0LnZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VEb3duKGV2ZW50OiBQb2ludGVyRXZlbnQpOiB2b2lkIHt9XG5cbiAga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMua2V5Q29kZV9bZXZlbnQuY29kZV0gPSB0cnVlO1xuICB9XG5cbiAga2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmtleUNvZGVfW2V2ZW50LmNvZGVdID0gZmFsc2U7XG4gIH1cblxuICBrZXlDb2RlKGNvZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5rZXlDb2RlX1tjb2RlXSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgPyB0aGlzLmtleUNvZGVfW2NvZGVdXG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0QXhpc0hvcml6b250YWwoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMua2V5Q29kZShcIkFycm93TGVmdFwiKSA/IC0xIDogMDtcbiAgICByZXN1bHQgKz0gdGhpcy5rZXlDb2RlKFwiQXJyb3dSaWdodFwiKSA/IDEgOiAwO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRBeGlzVmVydGljYWwoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMua2V5Q29kZShcIkFycm93VXBcIikgPyAtMSA6IDA7XG4gICAgcmVzdWx0ICs9IHRoaXMua2V5Q29kZShcIkFycm93RG93blwiKSA/IDEgOiAwO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9yZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBNYXRocyB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIGNsYW1wXG4gICAqIEBwYXJhbSBtaW4gdGhlIG1pbmltdW0gdmFsdWVcbiAgICogQHBhcmFtIG1heCB0aGUgbWF4aW11bSB2YWx1ZVxuICAgKiBAcmV0dXJucyB0aGUgY2xhbXBlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIGNsYW1wKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5lYXIgaW50ZXJwb2xhdGUgYmV0d2VlbiB0d28gdmFsdWVzXG4gICAqIEBwYXJhbSBtaW4gdGhlIG1pbmltdW0gdmFsdWVcbiAgICogQHBhcmFtIG1heCB0aGUgbWF4aW11bSB2YWx1ZVxuICAgKiBAcGFyYW0gdCB0aGUgdGltZSB2YWx1ZVxuICAgKiBAcmV0dXJucyB0aGUgbGVycGVkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgbGVycChtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHQ6IG51bWJlcikge1xuICAgIHJldHVybiBtaW4gKyAobWF4IC0gbWluKSAqIHQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gdHdvIHZhbHVlc1xuICAgKiBAcGFyYW0gbWluIHRoZSBtaW5pbXVtIHZhbHVlXG4gICAqIEBwYXJhbSBtYXggdGhlIG1heGltdW0gdmFsdWVcbiAgICogQHJldHVybnMgdGhlIHJhbmRvbSBudW1iZXJcbiAgICovXG4gIHN0YXRpYyByYW5kKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byByZWN0YW5nbGVzIGludGVyc2VjdFxuICAgKiBAcGFyYW0gcmVjdDFcbiAgICogQHBhcmFtIHJlY3QyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIHJlY3RhbmdsZXMgaW50ZXJzZWN0XG4gICAqL1xuICBzdGF0aWMgUmVjdEludGVyc2VjdChyZWN0MTogUmVjdCwgcmVjdDI6IFJlY3QpIHtcbiAgICBpZiAoXG4gICAgICByZWN0MS54IDw9IHJlY3QyLnggKyByZWN0Mi53aWR0aCAmJlxuICAgICAgcmVjdDEueCArIHJlY3QxLndpZHRoID4gcmVjdDIueCAmJlxuICAgICAgcmVjdDEueSA8PSByZWN0Mi55ICsgcmVjdDIuaGVpZ2h0ICYmXG4gICAgICByZWN0MS5oZWlnaHQgKyByZWN0MS55ID49IHJlY3QyLnlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1hdGhzIH0gZnJvbSBcIi4vbWF0aHNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWF0cml4IHdpdGggYSBmaXhlZCB3aWR0aCBhbmQgaGVpZ2h0LlxuICovXG5leHBvcnQgY2xhc3MgTWF0cml4IHtcbiAgYXJyYXk6IFVpbnQxNkFycmF5O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IE1hdHJpeCBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgbWF0cml4LlxuICAgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIG1hdHJpeC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB3aWR0aDogbnVtYmVyLCBwdWJsaWMgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLmFycmF5ID0gbmV3IFVpbnQxNkFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSBtYXRyaXguXG4gICAqIEBwYXJhbSB4IFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICogQHJldHVybnMgVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAqL1xuICBnZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5hcnJheVt5ICogdGhpcy53aWR0aCArIHhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIG1hdHJpeC5cbiAgICogQHBhcmFtIHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB5IFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAgICovXG4gIHNldCh4OiBudW1iZXIsIHk6IG51bWJlciwgdmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuYXJyYXlbeSAqIHRoaXMud2lkdGggKyB4XSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBtYXRyaXggd2l0aCB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHZhbHVlcy5cbiAgICogQHBhcmFtIGFycmF5IFRoZSBhcnJheSBvZiB2YWx1ZXMgdG8gbG9hZC5cbiAgICovXG4gIGxvYWQoYXJyYXk6IG51bWJlcltdKSB7XG4gICAgdGhpcy5hcnJheSA9IG5ldyBVaW50MTZBcnJheShhcnJheSk7XG4gIH1cblxuICAvKipcbiAgICogUmFuZG9taXplcyB0aGUgdmFsdWVzIGluIHRoZSBtYXRyaXguXG4gICAqL1xuICByYW5kb21pemUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLmFycmF5W2ldID0gTWF0aHMucmFuZCgwLCAzKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcblxuLyoqXG4gKiBCYXNlIGNvbnN0cnVjdG9yIHR5cGUgZm9yIGFsbCB0aGUgZWxlbWVudHMgb2YgdGhlIGVuZ2luZS5cbiAqL1xuZXhwb3J0IHR5cGUgT2JqZWN0Q29uc3RydWN0b3I8VD4gPSB7IG5ldyAoLi4uYXJnczogYW55W10pOiBUIH07XG5cbi8qKlxuICogQmFzZSBvYmplY3Qgb2YgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgZW5naW5lLlxuICpcbiAqIFRoZSBwYXJhbXMgaXMgdXNlZCBhcyB2YWxpZGF0aW9uIG9mIHRoZSBhcmd1bWVudHMgcGFzc2VkIGluIHRoZSBjb25zdHJ1Y3RvciBmb3IgZGVidWdnaW5nLlxuICogVGhlIHBhcmFtcyBtZXRob2Qgc2hvdWxkIHJldHVybiBhbiBhcnJheSB3aXRoIHRoZSBuYW1lcyBvZiBhbGwgdGhlIGtleXMgd2hpY2ggc2hvdWxkIGJlXG4gKiBwcmVzZW50IGFzIGFyZ3Mgb2YgYSBHYW1lT2JqZWN0LlxuICogVGhlIGNvbmZpZyBtZXRob2Qgc2hvdWxkIHJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCB2YWx1ZXMgb2YgdGhlIEdhbWVPYmplY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAqICBwYXJhbXMoKSB7XG4gKiAgIHJldHVybiBbXCJ4XCIsIFwieVwiXTtcbiAqICB9XG4gKiAgY29uZmlnKCkge1xuICogICAgcmV0dXJuIHtcbiAqICAgICAgeDogMCxcbiAqICAgICAgeTogMCxcbiAqICAgICAgd2lkdGg6IDEwMCxcbiAqICAgICAgaGVpZ2h0OiAxMDAsXG4gKiAgICB9O1xuICogIH1cbiAqIH1cbiAqIGNvbnN0IG8gPSBuZXcgRWxlbWVudCgpO1xuICogLy8gdGhpcyB3aWxsIHRocm93IGFuIGVycm9yIGJlY2F1c2UgeCBhbmQgeSBhcmUgcmVxdWlyZWRcbiAqXG4gKiBjb25zdCBvID0gbmV3IEVsZW1lbnQoeyB4OiAxMCwgeTogMTAgfSk7XG4gKiAvLyB0aGlzIHdpbGwgbm90IHRocm93IGFuIGVycm9yIGFuZCB4IGFuZCB5IHdpbGwgYmUgMTAgYW5kIHdpZHRoIGFuZCBoZWlnaHQgd2lsbCBiZSAxMDBcbiAqXG4gKi9cblxuZXhwb3J0IGNsYXNzIEdhbWVPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihhcmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge30pIHtcbiAgICBEZWJ1Zy52YWxpZGF0ZVBhcmFtcyh0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIGFyZ3MsIHRoaXMucGFyYW1zKCkpO1xuICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5jb25maWcoKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRlZmF1bHRzLCBhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IHdpdGggdGhlIG5hbWVzIG9mIHRoZSBrZXlzIHRoYXQgc2hvdWxkIGJlIHByZXNlbnQgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgYW55Pn0gT2JqZWN0IHdpdGggdGhlIGRlZmF1bHQgdmFsdWVzIG9mIHRoZSBHYW1lT2JqZWN0XG4gICAqL1xuICBjb25maWcoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IFJlY3RDb2xsaWRlciB9IGZyb20gXCIuL2NvbGxpZGVyc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHsgTWF0aHMgfSBmcm9tIFwiLi9tYXRoc1wiO1xuaW1wb3J0IHsgU291bmQgfSBmcm9tIFwiLi9zb3VuZHNcIjtcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbmltcG9ydCB7IFRpbGVDb3JuZXJzIH0gZnJvbSBcIi4vdGlsZVwiO1xuaW1wb3J0IHsgVGlsZU1hcCB9IGZyb20gXCIuL3RpbGVtYXBcIjtcbmltcG9ydCB7IFRpbWUgfSBmcm9tIFwiLi90aW1lXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxhdGZvcm1Db250cm9sbGVyQXJncyB7XG4gIC8qKlxuICAgKiBUaGUgdGlsZU1hcCBjb21wb25lbnRcbiAgICovXG4gIHRpbGVNYXA6IFRpbGVNYXA7XG59XG5cbi8qKlxuICogQ29tcG9uZW50IGZvciBtYW5hZ2luZyBwbGF0Zm9ybWVyIHBoeXNpY3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybUNvbnRyb2xsZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogVGhlIG1heGltdW0gdmVsb2NpdHkgb24gdGhlIFkgYXhpc1xuICAgKi9cbiAgbWF4VmVsb2NpdHlZID0gMTA7XG5cbiAgLyoqXG4gICAqIFRoZSBncmF2aXR5IG9mIHRoZSBjb250cm9sbGVyXG4gICAqL1xuICBncmF2aXR5ID0gMC41O1xuXG4gIC8qKlxuICAgKiBUaGUgdGltZSBjb21wb25lbnRcbiAgICovXG4gIHRpbWUgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KFRpbWUpO1xuXG4gIC8qKlxuICAgKiBUaGUgdGlsZW1hcCBjb21wb25lbnRcbiAgICovXG4gIHRpbGVNYXA6IFRpbGVNYXA7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IFBsYXRmb3JtQ29udHJvbGxlckFyZ3MpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICAgIHRoaXMudGltZSA9IHRoaXMuY29tcG9uZW50cy5nZXQoVGltZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciB0aGUgcGxhdGZvcm0gY29udHJvbGxlclxuICAgKi9cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW1widGlsZU1hcFwiXTtcbiAgfVxuXG4gIGdldENvcm5lcnMoXG4gICAgeDE6IG51bWJlcixcbiAgICB5MTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgKTogVGlsZUNvcm5lcnMge1xuICAgIHJldHVybiB0aGlzLnRpbGVNYXAuZ2V0Q29ybmVycyh4MSwgeTEsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgY2hlY2tGb3JXYWxscyhzcHJpdGU6IFBsYXllciwgbW92ZURpc3RhbmNlWDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBtb3ZlRGlzdGFuY2VYID0gTWF0aC5mbG9vcihtb3ZlRGlzdGFuY2VYKTtcbiAgICBsZXQgY29ybmVycyA9IHRoaXMuZ2V0Q29ybmVycyhcbiAgICAgIHNwcml0ZS54ICsgbW92ZURpc3RhbmNlWCxcbiAgICAgIHNwcml0ZS55LFxuICAgICAgc3ByaXRlLndpZHRoLFxuICAgICAgc3ByaXRlLmhlaWdodFxuICAgICk7XG4gICAgaWYgKFxuICAgICAgbW92ZURpc3RhbmNlWCA+IDAgJiZcbiAgICAgIChjb3JuZXJzLmRvd25SaWdodC5zb2xpZC5sZWZ0IHx8IGNvcm5lcnMudXBSaWdodC5zb2xpZC5sZWZ0KVxuICAgICkge1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WCA9IDA7XG4gICAgICBzcHJpdGUuYWNjZWxlcmF0aW9uWCA9IDA7XG4gICAgICBtb3ZlRGlzdGFuY2VYID0gMDtcbiAgICAgIC8vbW92ZURpc3RhbmNlWCA9IChjb3JuZXJzLmRvd25SaWdodC54ICogY29ybmVycy5kb3duTGVmdC53aWR0aCkgLSBzcHJpdGUueCAtIHNwcml0ZS53aWR0aCAtIDE7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIG1vdmVEaXN0YW5jZVggPCAwICYmXG4gICAgICAoY29ybmVycy5kb3duTGVmdC5zb2xpZC5yaWdodCB8fCBjb3JuZXJzLnVwTGVmdC5zb2xpZC5yaWdodClcbiAgICApIHtcbiAgICAgIC8vbW92ZURpc3RhbmNlWCA9IHNwcml0ZS54IC0gKChjb3JuZXJzLmRvd25MZWZ0LnggKyAxKSAqIGNvcm5lcnMuZG93bkxlZnQud2lkdGgpIC0gMTtcbiAgICAgIC8vbW92ZURpc3RhbmNlWCAqPSAtMTtcbiAgICAgIHNwcml0ZS52ZWxvY2l0eVggPSAwO1xuICAgICAgc3ByaXRlLmFjY2VsZXJhdGlvblggPSAwO1xuICAgICAgbW92ZURpc3RhbmNlWCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtb3ZlRGlzdGFuY2VYO1xuICB9XG5cbiAgYXBwbHlHcmF2aXR5KHNwcml0ZTogUGxheWVyKTogbnVtYmVyIHtcbiAgICBsZXQgbW92ZURpc3RhbmNlWSA9IE1hdGguZmxvb3Ioc3ByaXRlLnZlbG9jaXR5WSk7XG4gICAgaWYgKCFzcHJpdGUuanVtcGluZykge1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WSArPSB0aGlzLmdyYXZpdHkgKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcHJpdGUudmVsb2NpdHlZICs9IHRoaXMuZ3Jhdml0eSAqIDEuMiAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgfVxuICAgIG1vdmVEaXN0YW5jZVkgPSBNYXRocy5jbGFtcChcbiAgICAgIG1vdmVEaXN0YW5jZVksXG4gICAgICAtdGhpcy5tYXhWZWxvY2l0eVksXG4gICAgICB0aGlzLm1heFZlbG9jaXR5WVxuICAgICk7XG4gICAgbGV0IGNvcm5lcnMgPSB0aGlzLmdldENvcm5lcnMoXG4gICAgICBzcHJpdGUueCxcbiAgICAgIHNwcml0ZS55ICsgbW92ZURpc3RhbmNlWSxcbiAgICAgIHNwcml0ZS53aWR0aCxcbiAgICAgIHNwcml0ZS5oZWlnaHRcbiAgICApO1xuICAgIGlmIChtb3ZlRGlzdGFuY2VZID4gMCkge1xuICAgICAgaWYgKGNvcm5lcnMuZG93blJpZ2h0LnNvbGlkLnRvcCB8fCBjb3JuZXJzLmRvd25MZWZ0LnNvbGlkLnRvcCkge1xuICAgICAgICBtb3ZlRGlzdGFuY2VZID0gMDtcbiAgICAgICAgc3ByaXRlLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgIHNwcml0ZS5qdW1waW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb3JuZXJzLnVwUmlnaHQuc29saWQuYm90dG9tIHx8IGNvcm5lcnMudXBMZWZ0LnNvbGlkLmJvdHRvbSkge1xuICAgICAgICBtb3ZlRGlzdGFuY2VZID0gMDtcbiAgICAgICAgc3ByaXRlLnZlbG9jaXR5WSA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlRGlzdGFuY2VZO1xuICB9XG5cbiAgY2xhbXBYKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGhzLmNsYW1wKFxuICAgICAgeCxcbiAgICAgIDAsXG4gICAgICB0aGlzLnRpbGVNYXAud2lkdGggKiB0aGlzLnRpbGVNYXAudHdpZHRoIC0gdGhpcy5lbmdpbmUuZGlzcGxheS53aWR0aFxuICAgICk7XG4gIH1cblxuICBjbGFtcFkoeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aHMuY2xhbXAoXG4gICAgICB5LFxuICAgICAgMCxcbiAgICAgIHRoaXMudGlsZU1hcC5oZWlnaHQgKiB0aGlzLnRpbGVNYXAudGhlaWdodCAtIHRoaXMuZW5naW5lLmRpc3BsYXkuaGVpZ2h0XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgU3ByaXRlIHtcbiAgY29sb3I6IHN0cmluZztcbiAgY29ybmVyczogYW55O1xuICB2YXJzOiBhbnk7XG4gIHNtb290aFRpbWU6IG51bWJlcjtcbiAgZGlyOiBudW1iZXI7XG4gIHNwZWVkOiBudW1iZXI7XG4gIHNwZWVkWTogbnVtYmVyO1xuICB2ZWxvY2l0eVk6IG51bWJlcjtcbiAganVtcEZvcmNlOiBudW1iZXI7XG4gIGp1bXBpbmc6IGJvb2xlYW47XG4gIHNob290aW5nOiBib29sZWFuO1xuICBqdW1wQm9vc3RlcjogbnVtYmVyO1xuICBhY2NlbGVyYXRpb25Gb3JjZVg6IG51bWJlcjtcbiAgYWNjZWxlcmF0aW9uWDogbnVtYmVyO1xuICBtYXhTcGVlZE11bHRYOiBudW1iZXI7XG4gIHZlbG9jaXR5WDogbnVtYmVyO1xuICBmcmljdGlvblg6IG51bWJlcjtcbiAgZGlyWDogbnVtYmVyO1xuICBjYW1lcmE6IENhbWVyYTtcbiAgaW5wdXQ6IElucHV0O1xuICBkaXNwbGF5OiBEaXNwbGF5O1xuICB0aW1lOiBUaW1lO1xuICBzb3VuZDogU291bmQ7XG4gIGNvbnRyb2xsZXI6IFBsYXRmb3JtQ29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogYW55KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLmNvbG9yID0gXCJibHVlXCI7XG4gICAgdGhpcy5jb3JuZXJzID0ge307XG4gICAgdGhpcy52YXJzID0ge307XG4gICAgdGhpcy5zbW9vdGhUaW1lID0gMS4zO1xuICAgIHRoaXMudmFycy5jdiA9IDA7XG4gICAgdGhpcy5kaXIgPSAxO1xuICAgIHRoaXMuc3BlZWQgPSA2O1xuICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICB0aGlzLnZlbG9jaXR5WSA9IDA7XG4gICAgdGhpcy5qdW1wRm9yY2UgPSAxMjtcbiAgICB0aGlzLmp1bXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNob290aW5nID0gZmFsc2U7XG4gICAgdGhpcy5qdW1wQm9vc3RlciA9IDA7XG5cbiAgICB0aGlzLmFjY2VsZXJhdGlvbkZvcmNlWCA9IDEuODtcbiAgICB0aGlzLmFjY2VsZXJhdGlvblggPSAwO1xuICAgIHRoaXMubWF4U3BlZWRNdWx0WCA9IDk7XG4gICAgdGhpcy52ZWxvY2l0eVggPSAwO1xuICAgIHRoaXMuZnJpY3Rpb25YID0gMC45O1xuICAgIHRoaXMuZGlyWCA9IDA7XG4gICAgdGhpcy5jb2xsaWRlcnMuYWRkKFxuICAgICAgbmV3IFJlY3RDb2xsaWRlcih7XG4gICAgICAgIHg6IC0xMCxcbiAgICAgICAgeTogLTEwLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCArIDEwLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0ICsgMTAsXG4gICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldENvcm5lcnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBUaWxlQ29ybmVycyB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5nZXRDb3JuZXJzKHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRyb2xsZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBsZWZ0IHJpZ2h0IG1vdmVtZW50XG4gICAgbGV0IG1vdmVEaXN0YW5jZVggPSAwO1xuICAgIGxldCBpbnB1dFggPSB0aGlzLmlucHV0LmdldEF4aXNIb3Jpem9udGFsKCk7XG5cbiAgICAvLyBhY2NlbGVyYXRpb24gbW92ZW1lbnRcbiAgICBpZiAoIXRoaXMuanVtcGluZykge1xuICAgICAgdGhpcy5hY2NlbGVyYXRpb25YID0gaW5wdXRYICogdGhpcy5hY2NlbGVyYXRpb25Gb3JjZVg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjZWxlcmF0aW9uWCA9IChpbnB1dFggKiB0aGlzLmFjY2VsZXJhdGlvbkZvcmNlWCkgLyA2O1xuICAgIH1cblxuICAgIHRoaXMudmVsb2NpdHlYICs9IHRoaXMuYWNjZWxlcmF0aW9uWCAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG5cbiAgICAvLyBmcmljdGlvblxuICAgIGxldCBjdXJyZW50RGlyID0gTWF0aC5zaWduKHRoaXMudmVsb2NpdHlYKTtcbiAgICBpZiAoIXRoaXMuanVtcGluZykge1xuICAgICAgdGhpcy52ZWxvY2l0eVggKz0gLWN1cnJlbnREaXIgKiB0aGlzLmZyaWN0aW9uWCAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmVsb2NpdHlYICs9XG4gICAgICAgICgoLWN1cnJlbnREaXIgKiB0aGlzLmZyaWN0aW9uWCkgLyAxMCkgKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuICAgIH1cbiAgICBpZiAoTWF0aC5zaWduKHRoaXMudmVsb2NpdHlYKSAhPT0gY3VycmVudERpcikge1xuICAgICAgdGhpcy52ZWxvY2l0eVggPSAwO1xuICAgIH1cblxuICAgIC8vIGxpbWl0IHNwZWVkXG4gICAgbGV0IG1heFNwZWVkWCA9IHRoaXMubWF4U3BlZWRNdWx0WDtcbiAgICBpZiAoXG4gICAgICB0aGlzLmlucHV0LmtleUNvZGUoXCJLZXlaXCIpICYmXG4gICAgICBpbnB1dFggJiZcbiAgICAgICh0aGlzLmNvcm5lcnMuZG93bkxlZnQuc29saWQudG9wIHx8IHRoaXMuY29ybmVycy5kb3duUmlnaHQuc29saWQudG9wKVxuICAgICkge1xuICAgICAgbWF4U3BlZWRYICo9IDI7XG4gICAgfVxuICAgIHRoaXMudmVsb2NpdHlYID0gTWF0aHMuY2xhbXAodGhpcy52ZWxvY2l0eVgsIC1tYXhTcGVlZFgsIG1heFNwZWVkWCk7XG4gICAgbW92ZURpc3RhbmNlWCArPSB0aGlzLnZlbG9jaXR5WCAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG5cbiAgICAvL21vdmVEaXN0YW5jZVggPSBpbnB1dFggKiA4ICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICBtb3ZlRGlzdGFuY2VYID0gdGhpcy5jb250cm9sbGVyLmNoZWNrRm9yV2FsbHModGhpcywgbW92ZURpc3RhbmNlWCk7XG4gICAgdGhpcy54ICs9IG1vdmVEaXN0YW5jZVg7XG4gICAgdGhpcy5jYW1lcmEueCArPSBtb3ZlRGlzdGFuY2VYO1xuICAgIHRoaXMuY2FtZXJhLnggPSB0aGlzLmNvbnRyb2xsZXIuY2xhbXBYKHRoaXMuY2FtZXJhLngpO1xuICAgIGlmICh0aGlzLmNhbWVyYS54IDwgMCkge1xuICAgICAgdGhpcy5jYW1lcmEueCA9IDA7XG4gICAgfVxuXG4gICAgLy8gZ3Jhdml0eVxuICAgIGxldCBtb3ZlRGlzdGFuY2VZID0gdGhpcy5jb250cm9sbGVyLmFwcGx5R3Jhdml0eSh0aGlzKTtcbiAgICB0aGlzLnkgKz0gbW92ZURpc3RhbmNlWTtcbiAgICB0aGlzLmNhbWVyYS55ICs9IG1vdmVEaXN0YW5jZVk7XG4gICAgdGhpcy5jYW1lcmEueSA9IHRoaXMuY29udHJvbGxlci5jbGFtcFkodGhpcy5jYW1lcmEueSk7XG5cbiAgICAvLyBqdW1wIHByZXNzZWQgYW5kIG5vdCBqdW1waW5nXG4gICAgaWYgKHRoaXMuaW5wdXQua2V5Q29kZShcIkFycm93VXBcIikgJiYgIXRoaXMuanVtcGluZykge1xuICAgICAgdGhpcy5qdW1waW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMudmVsb2NpdHlZID0gLXRoaXMuanVtcEZvcmNlIC8gMjtcbiAgICAgIHRoaXMuanVtcEJvb3N0ZXIgPSAwO1xuICAgIH1cbiAgICAvLyBqdW1wIGJlaW5nIGhlbGQgd2hpbGUganVtcGluZ1xuICAgIGlmIChcbiAgICAgIHRoaXMuaW5wdXQua2V5Q29kZShcIkFycm93VXBcIikgJiZcbiAgICAgIHRoaXMuanVtcGluZyAmJlxuICAgICAgdGhpcy5qdW1wQm9vc3RlciA8IDEwXG4gICAgKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WSAtPSB0aGlzLmp1bXBGb3JjZSAvIDEyO1xuICAgICAgdGhpcy5qdW1wQm9vc3RlciArPSAxO1xuICAgIH1cbiAgICAvLyBqdW1wIHJlbGVhc2VkIGFuZCBqdW1waW5nXG4gICAgaWYgKCF0aGlzLmlucHV0LmtleUNvZGUoXCJBcnJvd1VwXCIpICYmIHRoaXMuanVtcGluZykge1xuICAgICAgdGhpcy5qdW1wQm9vc3RlciA9IDA7XG4gICAgICBpZiAodGhpcy52ZWxvY2l0eVkgPCAtdGhpcy5qdW1wRm9yY2UgLyAyKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHlZID0gLXRoaXMuanVtcEZvcmNlIC8gMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheS5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuY29sb3IpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy5jb21wb25lbnRzLmdldChJbnB1dCk7XG4gICAgdGhpcy5kaXNwbGF5ID0gdGhpcy5jb21wb25lbnRzLmdldChEaXNwbGF5KTtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KFRpbWUpO1xuICAgIHRoaXMuc291bmQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KFNvdW5kKTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuY29tcG9uZW50cy5nZXQoQ2FtZXJhKTtcblxuICAgIHRoaXMuY2FtZXJhLnggPSBNYXRoLmZsb29yKHRoaXMueCAtIHRoaXMuZGlzcGxheS53aWR0aCAvIDIpO1xuICAgIHRoaXMuY2FtZXJhLnkgPSBNYXRoLmZsb29yKHRoaXMueSAtIHRoaXMuZGlzcGxheS5oZWlnaHQgLyAyKTtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KFBsYXRmb3JtQ29udHJvbGxlcik7XG4gIH1cblxuICBjb2xsaXNpb24oc3ByaXRlOiBTcHJpdGUpOiB2b2lkIHt9XG59XG4iLCJpbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBPYmplY3RDb25zdHJ1Y3RvciB9IGZyb20gXCIuL29iamVjdHNcIjtcblxuLyoqXG4gKiBSZWdpc3RyeSBzdG9yZXMgc2luZ2xlIGluc3RhbmNlcyBvZiBvYmplY3QgaW5kZXhlZCBieSB0aGVpciBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lzdHJ5IHtcbiAgaXRlbXMgPSBuZXcgTWFwPE9iamVjdENvbnN0cnVjdG9yPGFueT4sIGFueT4oKTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIENvbnN0cnVjdG9yXG4gICAqIEByZXR1cm5zIFRoZSBpbnN0YW5jZSBvZiB0aGUgb2JqZWN0IGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAgICovXG4gIGdldDxUPihDb25zdHJ1Y3RvcjogT2JqZWN0Q29uc3RydWN0b3I8VD4pOiBUIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLml0ZW1zLmdldChDb25zdHJ1Y3Rvcik7XG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgIERlYnVnLmVycm9yKGBDb21wb25lbnQgJHtDb25zdHJ1Y3Rvci5uYW1lfSBpcyBub3QgcmVnaXN0ZXJlZGApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBDb25zdHJ1Y3RvciBUaGUgY29uc3RydWN0b3Igb2YgdGhlIG9iamVjdCB0byBzdG9yZS5cbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBpbnN0YW5jZSBvZiB0aGUgb2JqZWN0IHRvIHN0b3JlLlxuICAgKi9cbiAgc2V0PFQ+KENvbnN0cnVjdG9yOiBPYmplY3RDb25zdHJ1Y3RvcjxUPiwgaW5zdGFuY2U6IFQpIHtcbiAgICBpZiAoRGVidWcuYWN0aXZlKCkpIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmhhcyhDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgRGVidWcuZXJyb3IoYENvbXBvbmVudCAke0NvbnN0cnVjdG9yfSBpcyBhbHJlYWR5IGRlZmluZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pdGVtcy5zZXQoQ29uc3RydWN0b3IsIGluc3RhbmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBBbiBpdGVyYXRvciBvZiBhbGwgdGhlIGluc3RhbmNlcyBzdG9yZWQgaW4gdGhlIHJlZ2lzdHJ5LlxuICAgKi9cbiAgdmFsdWVzPFQ+KCk6IEl0ZXJhYmxlSXRlcmF0b3I8VD4ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLnZhbHVlcygpIGFzIEl0ZXJhYmxlSXRlcmF0b3I8VD47XG4gIH1cbn1cbiIsIi8qKlxuICogQSBSZXNvdXJjZSBJdGVtIGlzIGEgbWVkaWEgb2JqZWN0IGxpa2UgaW1hZ2UsIGF1ZGlvLiBJdCBpcyB1c2VkIGJ5IHRoZSBSZXNvdXJjZXMgY2xhc3NcbiAqIGR1cmluZyB0aGUgcHJlbG9hZCBwaGFzZSBvZiB0aGUgZW5naW5lIGxvYWRpbmcuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuXG5leHBvcnQgdHlwZSBSZXNvdXJjZVR5cGUgPSBcImltYWdlXCIgfCBcImF1ZGlvXCI7XG5cbi8qKlxuICogQXJndW1lbnRzIGZvciAgUmVzb3VyY2VJdGVtIGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb3VyY2VJdGVtQXJncyB7XG4gIC8qKlxuICAgKiB1cmwgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICB1cmw6IHN0cmluZztcblxuICAvKipcbiAgICogdHlwZSBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHR5cGU6IFJlc291cmNlVHlwZTtcblxuICAvKipcbiAgICogbmFtZSBvZiB0aGUgcmVzb3VyY2UgdG8gdXNlIGluIHRoZSByZXNvdXJjZXMgZGljdGlvbmFyeVxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VJdGVtIHtcbiAgLyoqXG4gICAqIHVybCBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHVybDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiB0eXBlIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgdHlwZTogUmVzb3VyY2VUeXBlO1xuXG4gIC8qKlxuICAgKiBuYW1lIG9mIHRoZSByZXNvdXJjZSB0byB1c2UgaW4gdGhlIHJlc291cmNlcyBkaWN0aW9uYXJ5XG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGJ1ZmZlciBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIGJ1ZmZlcjogYW55O1xuXG4gIC8qKlxuICAgKiBpdGVtIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgaXRlbTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogUmVzb3VyY2VJdGVtQXJncykge1xuICAgIERlYnVnLnZhbGlkYXRlUGFyYW1zKFwiUmVzb3VyY2VzLmFkZFwiLCBwYXJhbXMsIFtcInVybFwiLCBcInR5cGVcIiwgXCJuYW1lXCJdKTtcbiAgICB0aGlzLnVybCA9IHBhcmFtcy51cmw7XG4gICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGU7XG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgdGhpcy5idWZmZXIgPSB7fTtcbiAgICB0aGlzLml0ZW0gPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSByZXNvdXJjZVxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRvIGxvYWQgdGhlIHJlc291cmNlXG4gICAqL1xuICBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgRGVidWcuZXJyb3IoYEVycm9yIGxvYWRpbmcgJHt0aGlzLm5hbWV9YCk7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gYmxvYjtcbiAgICAgIHRoaXMuaXRlbSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pdGVtLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuaXRlbS5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIERlYnVnLmluZm8oYFN1Y2Nlc3MgbG9hZGluZyAke3RoaXMubmFtZX1gKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXNvdXJjZXMgY29tcG9uZW50IGlzIHNldCBvZiB0aGUgaW1hZ2VzIGFuZCBhdWRpbyByZXNvdXJjZXMgb2YgdGhlIGdhbWUuXG4gKiBJdCBoYW5kbGVzIGFkZGluZyBhbmQgZ2V0dGluZyB0aGUgcmVzb3VyY2VzIGJ5IGEgbmFtZSBhbmQgYWxzbyB0aGUgcHJlbG9hZCBwaGFzZSBvZiB0aGUgZW5naW5lIGxvYWRpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBpdGVtczogUmVjb3JkPHN0cmluZywgUmVzb3VyY2VJdGVtPiA9IHt9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGRpY3Rpb25hcnlcbiAgICogQHBhcmFtIHBhcmFtcyBBcmd1bWVudHMgZm9yIHRoZSBSZXNvdXJjZUl0ZW0gY29uc3RydWN0b3JcbiAgICovXG4gIGFkZChwYXJhbXM6IFJlc291cmNlSXRlbUFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuaXRlbXNbcGFyYW1zLm5hbWVdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBEZWJ1Zy53YXJuKGBSZXNvdXJjZSAke3BhcmFtcy5uYW1lfSBpcyBhbHJlYWR5IGRlZmluZWRgKTtcbiAgICB9XG4gICAgdGhpcy5pdGVtc1twYXJhbXMubmFtZV0gPSBuZXcgUmVzb3VyY2VJdGVtKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcmVzb3VyY2UgYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZSBvZiB0aGUgcmVzb3VyY2VcbiAgICogQHJldHVybnMgdGhlIHJlc291cmNlXG4gICAqL1xuICBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pdGVtc1tuYW1lXS5pdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHJlc291cmNlIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICByZW1vdmUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuaXRlbXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogUHJlbG9hZCBhbGwgcmVzb3VyY2VzXG4gICAqL1xuICBhc3luYyBwcmVsb2FkKCkge1xuICAgIERlYnVnLmdyb3VwU3RhcnQoXCJQcmVsb2FkaW5nIFJlc291cmNlc1wiKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoT2JqZWN0LnZhbHVlcyh0aGlzLml0ZW1zKS5tYXAoKGl0ZW0pID0+IGl0ZW0ubG9hZCgpKSk7XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBEZWJ1Zy5lcnJvcihlPy5tZXNzYWdlKTtcbiAgICB9XG4gICAgRGVidWcuZ3JvdXBFbmQoKTtcbiAgfVxufVxuIiwiLyogZXhwb3J0ZWQgU2NlbmUgKi9cblxuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuXG4vKipcbiAqIFNjZW5lIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2NlbmVBcmdzIHtcbiAgLyoqXG4gICAqIElmIHRoZSBzY2VuZSBpcyBhY3RpdmUsIHRoZSBzcHJpdGVzIG9mIHRoZSBzY2VuZSB3aWxsIG1vdmUgYW5kIGNvbGxpZGUuXG4gICAqL1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIElmIHRoZSBzY2VuZSBpcyB2aXNpYmxlLCB0aGUgc3ByaXRlcyBvZiB0aGUgc2NlbmUgd2lsbCBiZSBkcmF3biBvbiB0aGUgc3RhZ2UuXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2NlbmUgaXMgYSBjb2xsZWN0aW9uIG9mIHNwcml0ZXMgb2YgYSBnYW1lLlxuICogT25seSB0aGUgc3ByaXRlcyBpbiB0aGUgc2FtZSBzY2VuZSBjYW4gY29sbGlkZSB3aXRoIGVhY2ggb3RoZXIuXG4gKiBUaGUgZW5naW5lIGNhbiBoYXZlIGEgc2luZ2xlIHNjZW5lIG9yIG11bHRpcGxlLiBEZXBlbmRpbmcgb24gdGhlIGFjdGl2ZSBzY2VuZSBvZlxuICogdGhlIGVuZ2luZSwgdGhhdCBzY2VuZSBzcHJpdGVzIHdvdWxkIGJlIGRyYXcsIG1vdmVkIGFuZCBjb2xsaWRlZCBvbiB0aGUgc3RhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2VuZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIHNwcml0ZXMgb2YgdGhlIHNjZW5lLlxuICAgKi9cbiAgc3ByaXRlcyA9IG5ldyBDb2xsZWN0aW9uPFNwcml0ZT4oKTtcblxuICAvKipcbiAgICogSWYgdGhlIHNjZW5lIGlzIGFjdGl2ZSwgdGhlIHNwcml0ZXMgb2YgdGhlIHNjZW5lIHdpbGwgbW92ZSBhbmQgY29sbGlkZS5cbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc2NlbmUgaXMgdmlzaWJsZSwgdGhlIHNwcml0ZXMgb2YgdGhlIHNjZW5lIHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlLlxuICAgKi9cbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBTY2VuZUFyZ3MpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIGRlZmF1bHQgc2NlbmUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGNvbmZpZygpOiBTY2VuZUFyZ3Mge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb24oKTtcbiAgICBmb3IgKGxldCBzcHJpdGUgb2YgdGhpcy5zcHJpdGVzLmFsbCgpKSB7XG4gICAgICBpZiAoc3ByaXRlLmlzQWN0aXZlKSB7XG4gICAgICAgIHNwcml0ZS5tb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAobGV0IHNwcml0ZSBvZiB0aGlzLnNwcml0ZXMuYWxsKCkpIHtcbiAgICAgIGlmIChzcHJpdGUuaXNWaXNpYmxlKSB7XG4gICAgICAgIHNwcml0ZS5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBBZGQgYSBzcHJpdGUgdG8gdGhlIHNjZW5lLlxuICAgKiBAcGFyYW0gc3ByaXRlIHRvIGJlIGFkZGVkLlxuICAgKi9cbiAgYWRkU3ByaXRlKHNwcml0ZTogU3ByaXRlKTogdm9pZCB7XG4gICAgc3ByaXRlLmVuZ2luZSA9IHRoaXMuZW5naW5lO1xuICAgIHNwcml0ZS5wYXJlbnQgPSB0aGlzO1xuICAgIHNwcml0ZS5pbml0KCk7XG4gICAgdGhpcy5zcHJpdGVzLmFkZChzcHJpdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBzcHJpdGUgZnJvbSB0aGUgc2NlbmUuXG4gICAqIEBwYXJhbSBzcHJpdGUgdG8gYmUgcmVtb3ZlZC5cbiAgICovXG4gIHJlbW92ZVNwcml0ZShzcHJpdGU6IFNwcml0ZSkge1xuICAgIHRoaXMuc3ByaXRlcy5yZW1vdmUoc3ByaXRlKTtcbiAgfVxuXG4gIC8vIFRPRE86IGFkZCBxdWFkLXRyZWUgZm9yIGNvbGxpc2lvbiBkZXRlY3Rpb25cbiAgY29sbGlzaW9uKCkge1xuICAgIGNvbnN0IHNwcml0ZXMgPSB0aGlzLnNwcml0ZXMuYWxsKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcHJpdGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBzcHJpdGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGxldCBzcHJpdGUxID0gc3ByaXRlc1tpXTtcbiAgICAgICAgbGV0IHNwcml0ZTIgPSBzcHJpdGVzW2pdO1xuICAgICAgICBpZiAoc3ByaXRlMS50ZXN0Q29sbGlzaW9uKHNwcml0ZTIpKSB7XG4gICAgICAgICAgc3ByaXRlMS5jb2xsaXNpb24oc3ByaXRlMik7XG4gICAgICAgICAgc3ByaXRlMi5jb2xsaXNpb24oc3ByaXRlMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKiBleHBvcnRlZCBTb3VuZCAqL1xuZXhwb3J0IGNsYXNzIFNvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IHt9KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7fVxuXG4gIGRyYXcoKTogdm9pZCB7fVxuXG4gIHBsYXkoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHBhdXNlKCkge31cbn1cbiIsImltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3JlY3RcIjtcblxuLyoqXG4gKiBUaGUgYXJndW1lbnRzIHRvIGNyZWF0ZSBhIFNwcml0ZVNoZWV0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNwcml0ZVNoZWV0QXJncyB7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZnJhbWUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGltYWdlIGNvbnRhaW5pbmcgdGhlIHNwcml0ZXMvdGlsZXMuXG4gICAqL1xuICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcblxuICAvKipcbiAgICogVGhlIHggb2Zmc2V0IG9mIHRoZSBmaXJzdCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBvZmZzZXRYPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgeSBvZmZzZXQgb2YgdGhlIGZpcnN0IHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIG9mZnNldFk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiBlYWNoIHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIGdhcD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIHNwcml0ZSBzaGVldCBjb25zaXN0cyBvZiBkaWZmZXJlbnQgc3ByaXRlcy90aWxlcyBkcmF3biBpbiB0aGUgc2FtZSBpbWFnZS5cbiAqIFdoZW4gY3JlYXRlZCwgdGhlIFNwcml0ZVNoZWV0IHdpbGwgY3JlYXRlIHRoZSBjb29yZGluYXRlcyBvZiBlYWNoIHNwcml0ZS90aWxlIG9uXG4gKiB0aGUgaW1hZ2UgZGVwZW5kaW5nIG9uIHRoZSB3aWR0aC9oZWlnaHQgb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIHNoZWV0LlxuICovXG5leHBvcnQgY2xhc3MgU3ByaXRlU2hlZXQgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGNvb3JkaW5hdGVzIG9mIGVhY2ggc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgdGlsZXM6IFBvaW50W107XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgaW1hZ2UgY29udGFpbmluZyB0aGUgc3ByaXRlcy90aWxlcy5cbiAgICovXG4gIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAvKipcbiAgICogVGhlIHggb2Zmc2V0IG9mIHRoZSBmaXJzdCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBvZmZzZXRYOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgeSBvZmZzZXQgb2YgdGhlIGZpcnN0IHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIG9mZnNldFk6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiBlYWNoIHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIGdhcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IFNwcml0ZVNoZWV0QXJncykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICBsZXQgaUNvdW50ID0gMTtcbiAgICBsZXQgakNvdW50ID0gMTtcbiAgICBpZiAodGhpcy5nYXApIHtcbiAgICAgIHdoaWxlIChcbiAgICAgICAgdGhpcy5pbWFnZS53aWR0aCAtIHRoaXMub2Zmc2V0WCAtIGlDb3VudCsrICogKHRoaXMud2lkdGggKyB0aGlzLmdhcCkgPj1cbiAgICAgICAgdGhpcy53aWR0aFxuICAgICAgKTtcbiAgICAgIHdoaWxlIChcbiAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQgLVxuICAgICAgICAgIHRoaXMub2Zmc2V0WSAtXG4gICAgICAgICAgakNvdW50KysgKiAodGhpcy5oZWlnaHQgKyB0aGlzLmdhcCkgPj1cbiAgICAgICAgdGhpcy53aWR0aFxuICAgICAgKTtcbiAgICAgIGlDb3VudC0tO1xuICAgICAgakNvdW50LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlDb3VudCA9IE1hdGguZmxvb3IoKHRoaXMuaW1hZ2Uud2lkdGggLSB0aGlzLm9mZnNldFgpIC8gdGhpcy53aWR0aCk7XG4gICAgICBqQ291bnQgPSBNYXRoLmZsb29yKCh0aGlzLmltYWdlLmhlaWdodCAtIHRoaXMub2Zmc2V0WSkgLyB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBqQ291bnQ7ICsraikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpQ291bnQ7ICsraSkge1xuICAgICAgICBsZXQgeCA9IHRoaXMub2Zmc2V0WCArIGkgKiB0aGlzLmdhcCArIGkgKiB0aGlzLndpZHRoO1xuICAgICAgICBsZXQgeSA9IHRoaXMub2Zmc2V0WSArIGogKiB0aGlzLmdhcCArIGogKiB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy50aWxlcy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciB0aGUgc3ByaXRlIHNoZWV0XG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcImltYWdlXCJdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgZGVmYXVsdCBvcHRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc3ByaXRlIHNoZWV0XG4gICAqL1xuICBjb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9mZnNldFg6IDAsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgICAgZ2FwOiAwLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qIGV4cG9ydGVkIFNwcml0ZSAqL1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSBcIi4vY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgQ29sbGlkZXIgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTcHJpdGVBcmdzIHtcbiAgLyoqXG4gICAqIFggcG9zaXRpb24gb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgeDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBZIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3ByaXRlIGlzIHZpc2libGUsIGl0IHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzcHJpdGUgaXMgYWN0aXZlLCBpdCB3aWxsIG1vdmVcbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEJhc2UgU3ByaXRlIGNvbXBvbmVudC4gRXZlcnkgU3ByaXRlIG9mIHRoZSBlbmdpbmUgc2hvdWxkIGRlcml2ZSBmcm9tIHRoaXMgY2xhc3MuXG4gKiBFYWNoIGxvb3Agb2YgdGhlIGdhbWUgdGhlIHNwcml0cyB3aWxsIG1vdmUsIGRyYXcgYW5kIHRlc3QgY29sbGlzaW9uLlxuICovXG5leHBvcnQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFggcG9zaXRpb24gb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgeDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBZIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3ByaXRlIGlzIHZpc2libGUsIGl0IHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzcHJpdGUgaXMgYWN0aXZlLCBpdCB3aWxsIG1vdmVcbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGUgc3ByaXRlXG4gICAqL1xuICBjb2xsaWRlcnMgPSBuZXcgQ29sbGVjdGlvbjxDb2xsaWRlcj4oKTtcblxuICAvKipcbiAgICogUGFyZW50IG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHBhcmVudDogQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBTcHJpdGVBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBzcHJpdGVcbiAgICovXG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wieFwiLCBcInlcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXTtcbiAgfVxuXG4gIGNvbmZpZygpOiBQYXJ0aWFsPFNwcml0ZUFyZ3M+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhIGJveCBhcm91bmQgdGhlIHNwcml0ZVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbG9yIENvbG9yIG9mIHRoZSByZWN0YW5nbGUsIGRlZmF1bHQgcmVkXG4gICAqL1xuICBkZWJ1Z0RyYXcoY29sb3IgPSBcInJlZFwiKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgIGRpc3BsYXkucmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGNvbG9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRlc3RzIGZvciBjb2xsaXNpb24gYmV0d2VlbiBlYWNoIGNvbGxpZGVyIG9mIHRoZSBzcHJpdGUgYWdhaW5zdCBhIHNwcml0ZVxuICAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIFNwcml0ZSB0byB0ZXN0IHRoZSBjb2xsaXNpb24gd2l0aFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGNvbGxpc2lvbiBkZXRlY3RlZFxuICAgKi9cbiAgdGVzdENvbGxpc2lvbihzcHJpdGU6IFNwcml0ZSkge1xuICAgIGlmICghdGhpcy5jb2xsaWRlcnMuYWxsKCkubGVuZ3RoIHx8ICFzcHJpdGUuY29sbGlkZXJzLmFsbCgpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBjb2xsaWRlcjEgb2YgdGhpcy5jb2xsaWRlcnMuYWxsKCkpXG4gICAgICBmb3IgKGxldCBjb2xsaWRlcjIgb2Ygc3ByaXRlLmNvbGxpZGVycy5hbGwoKSlcbiAgICAgICAgaWYgKGNvbGxpZGVyMS50ZXN0KGNvbGxpZGVyMikpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gdGhlIHNwcml0ZSBpcyBhZGRlZCB0byBhIHNjZW5lIGFmdGVyIGNyZWF0aW9uXG4gICAqL1xuICBpbml0KCkge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIGVhY2ggZ2FtZSBsb29wXG4gICAqL1xuICBtb3ZlKCkge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIGVhY2ggbG9vcCBvZiB0aGUgZ2FtZVxuICAgKi9cbiAgZHJhdygpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHRoZSBzcHJpdGUgY29sbGlkZWQgd2l0aCBhbm90aGVyIHNwcml0ZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSBUaGUgb3RoZXIgc3ByaXRlIHdpdGggd2hvbSB0aGUgY29sbGlzaW9uIG9jdXJyZWRcbiAgICovXG4gIGNvbGxpc2lvbihzcHJpdGU6IFNwcml0ZSkge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIHdoZW4gdGhlIHNwcml0ZSBpcyByZW1vdmVkIGZyb20gdGhlIGVuZ2luZSBzY2VuZVxuICAgKi9cbiAgZGVzdHJveSgpIHt9XG59XG4iLCJpbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVDb3JuZXJzIHtcbiAgdXBMZWZ0OiBUaWxlO1xuICB1cFJpZ2h0OiBUaWxlO1xuICBkb3duTGVmdDogVGlsZTtcbiAgZG93blJpZ2h0OiBUaWxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVFZGdlcyB7XG4gIHRvcDogVGlsZTtcbiAgYm90dG9tOiBUaWxlO1xuICBsZWZ0OiBUaWxlO1xuICByaWdodDogVGlsZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaWxlQXJncyB7XG4gIC8qKlxuICAgKiBUaGUgYW5nbGUgb2YgdGhlIHRpbGUuXG4gICAqL1xuICBhbmdsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2hlZXQgaW5kZXggb2YgdGhlIHRpbGUuXG4gICAqL1xuICBzaGVldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc29saWQgcHJvcGVydHkgb2YgdGhlIHRpbGUgd2FsbHMuXG4gICAqL1xuICBzb2xpZDogVGlsZUVkZ2VzO1xufVxuXG5leHBvcnQgY2xhc3MgVGlsZSBleHRlbmRzIEdhbWVPYmplY3Qge1xuICAvKipcbiAgICogVGhlIGFuZ2xlIG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgYW5nbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNoZWV0IGluZGV4IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgc2hlZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNvbGlkIHByb3BlcnR5IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgc29saWQ6IFRpbGVFZGdlcztcblxuICAvKipcbiAgICogVGhlIHggcG9zaXRpb24gb2YgdGhlIHRpbGUuXG4gICAqL1xuICB4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHRpbGUuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogVGlsZUFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBUaGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIG9mIGEgdGlsZS5cbiAgICovXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc29saWQ6IHtcbiAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhbmdsZTogMCxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IE1hdGhzIH0gZnJvbSBcIi4vbWF0aHNcIjtcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCIuL21hdHJpeFwiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRzXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5pbXBvcnQgeyBUaWxlLCBUaWxlQ29ybmVycywgVGlsZUVkZ2VzIH0gZnJvbSBcIi4vdGlsZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVNYXBBcmdzIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICB0d2lkdGg6IG51bWJlcjtcbiAgdGhlaWdodDogbnVtYmVyO1xuICBzaGVldDogc3RyaW5nO1xuICB0aWxlczogc3RyaW5nW107XG59XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1hbmFnaW5nIHRpbGVNYXBzLlxuICovXG5leHBvcnQgY2xhc3MgVGlsZU1hcCBleHRlbmRzIFNwcml0ZSB7XG4gIG1hdHJpeDogTWF0cml4O1xuICBtd2lkdGg6IG51bWJlcjtcbiAgbWhlaWdodDogbnVtYmVyO1xuICB0d2lkdGg6IG51bWJlcjtcbiAgdGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgY2FtZXJhOiBDYW1lcmE7XG4gIGRpc3BsYXk6IERpc3BsYXk7XG4gIHRpbGVzOiBUaWxlW107XG4gIHNoZWV0OiBTcHJpdGVTaGVldDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogYW55KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLm1hdHJpeCA9IG5ldyBNYXRyaXgodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMubXdpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMudHdpZHRoO1xuICAgIHRoaXMubWhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy50aGVpZ2h0O1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jb21wb25lbnRzLmdldChDYW1lcmEpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gIH1cblxuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIiwgXCJ0d2lkdGhcIiwgXCJ0aGVpZ2h0XCIsIFwic2hlZXRcIiwgXCJ0aWxlc1wiXTtcbiAgfVxuXG4gIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldCh4LCB5KTtcbiAgfVxuXG4gIHNldCh4OiBudW1iZXIsIHk6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LnNldCh4LCB5LCB2YWx1ZSk7XG4gIH1cblxuICBsb2FkKGFycmF5OiBudW1iZXJbXSk6IHZvaWQge1xuICAgIGlmIChhcnJheS5sZW5ndGggIT09IHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCkge1xuICAgICAgRGVidWcud2FybihcbiAgICAgICAgYFRpbGVtYXAgc2l6ZSBtaXNtYXRjaCB3aXRoIHdpZHRoOiAke3RoaXMud2lkdGh9IGFuZCBoZWlnaHQgJHt0aGlzLmhlaWdodH1gXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLm1hdHJpeC5sb2FkKGFycmF5KTtcbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF0cml4LmFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgY2hhciA9IHRoaXMubWF0cml4LmFycmF5W2ldLnRvU3RyaW5nKCk7XG4gICAgICBjaGFyID0gY2hhci5sZW5ndGggPiAxID8gY2hhciA6IFwiICBcIiArIGNoYXI7XG4gICAgICBjaGFyID0gY2hhci5sZW5ndGggPiAyID8gY2hhciA6IFwiIFwiICsgY2hhcjtcbiAgICAgIHJlc3VsdCArPSBjaGFyICsgXCIsXCI7XG4gICAgICBpZiAoKytjb3VudCA+PSB0aGlzLndpZHRoKSB7XG4gICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgcmVzdWx0ICs9IFwiXFxyXFxuXCI7XG4gICAgICB9XG4gICAgfVxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHJlc3VsdDtcbiAgfVxuXG4gIGdldFRpbGVYKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKHggLyB0aGlzLnR3aWR0aCkgJSB0aGlzLm13aWR0aCk7XG4gIH1cblxuICBnZXRUaWxlWSh5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCh5IC8gdGhpcy50aGVpZ2h0KSAlIHRoaXMubWhlaWdodCk7XG4gIH1cblxuICBnZXRUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogVGlsZSB7XG4gICAgeCA9IHRoaXMuZ2V0VGlsZVgoeCk7XG4gICAgeSA9IHRoaXMuZ2V0VGlsZVkoeSk7XG4gICAgbGV0IHRpbGUgPSB0aGlzLnRpbGVzW3RoaXMuZ2V0KHgsIHkpXSB8fCB0aGlzLnRpbGVzWzBdO1xuICAgIHRpbGUueCA9IHg7XG4gICAgdGlsZS55ID0geTtcbiAgICB0aWxlLndpZHRoID0gdGhpcy50d2lkdGg7XG4gICAgdGlsZS5oZWlnaHQgPSB0aGlzLnRoZWlnaHQ7XG4gICAgcmV0dXJuIHRpbGU7XG4gIH1cblxuICBnZXRDb3JuZXJzKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFRpbGVDb3JuZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBMZWZ0OiB0aGlzLmdldFRpbGUoeCwgeSksXG4gICAgICB1cFJpZ2h0OiB0aGlzLmdldFRpbGUoeCArIHdpZHRoLCB5KSxcbiAgICAgIGRvd25MZWZ0OiB0aGlzLmdldFRpbGUoeCwgeSArIGhlaWdodCksXG4gICAgICBkb3duUmlnaHQ6IHRoaXMuZ2V0VGlsZSh4ICsgd2lkdGgsIHkgKyBoZWlnaHQpLFxuICAgIH07XG4gIH1cblxuICBnZXREcmF3UmVjdCgpIHtcbiAgICBsZXQgeDEgPSB0aGlzLmdldFRpbGVYKHRoaXMuY2FtZXJhLngpO1xuICAgIGxldCB5MSA9IHRoaXMuZ2V0VGlsZVkodGhpcy5jYW1lcmEueSk7XG4gICAgbGV0IHgyID0gTWF0aC5jZWlsKHRoaXMuZGlzcGxheS53aWR0aCAvIHRoaXMudHdpZHRoKTtcbiAgICBsZXQgeTIgPSBNYXRoLmNlaWwodGhpcy5kaXNwbGF5LmhlaWdodCAvIHRoaXMudGhlaWdodCk7XG4gICAgeDEgPSBNYXRocy5jbGFtcCh4MSwgMCwgdGhpcy53aWR0aCk7XG4gICAgeTEgPSBNYXRocy5jbGFtcCh5MSwgMCwgdGhpcy5oZWlnaHQpO1xuICAgIHgyID0gTWF0aHMuY2xhbXAoeDIgKyB4MSArIDEsIHgxLCB0aGlzLndpZHRoKTtcbiAgICB5MiA9IE1hdGhzLmNsYW1wKHkyICsgeTEgKyAxLCB5MSwgdGhpcy5oZWlnaHQpO1xuICAgIHJldHVybiB7XG4gICAgICB4MTogeDEsXG4gICAgICB5MTogeTEsXG4gICAgICB4MjogeDIsXG4gICAgICB5MjogeTIsXG4gICAgfTtcbiAgfVxuXG4gIGRyYXcoKTogdm9pZCB7XG4gICAgbGV0IHJlY3QgPSB0aGlzLmdldERyYXdSZWN0KCk7XG4gICAgZm9yIChsZXQgaSA9IHJlY3QueDE7IGkgPCByZWN0LngyOyArK2kpIHtcbiAgICAgIGZvciAobGV0IGogPSByZWN0LnkxOyBqIDwgcmVjdC55MjsgKytqKSB7XG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5nZXQoaSwgaik7XG4gICAgICAgIGlmICh0aWxlKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUaWxlKFxuICAgICAgICAgICAgdGhpcy54ICsgaSAqIHRoaXMudHdpZHRoLFxuICAgICAgICAgICAgdGhpcy55ICsgaiAqIHRoaXMudGhlaWdodCxcbiAgICAgICAgICAgIHRoaXMudHdpZHRoLFxuICAgICAgICAgICAgdGhpcy50aGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5zaGVldCxcbiAgICAgICAgICAgIHRpbGUgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbn1cbiIsIi8qIGV4cG9ydGVkIFRpbWUgKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5cbi8qKlxuICogTWFuYWdlcyB0aGUgdGltZSBvZiB0aGUgZ2FtZS5cbiAqIHRpbWUuc3RhcnRUaW1lOiBzZWNvbmRzIGVsYXBzZWQgc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkXG4gKiB0aW1lLmZyYW1lVGltZTogYWxtb3N0IHRoZSBzYW1lIGFzIHN0YXJ0VGltZSwgaGFzIHRoZSBlbGFwc2VkIHNlY29uZHNcbiAqIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZCBidXQgaXQgdXBkYXRlcyB0aGUgdmFsdWUgYnkgY291bnRpbmcgdGhlIGZyYW1lIHRpbWUgb2YgZWFjaCBnYW1lIGxvb3AuXG4gKiB0aW1lLmRlbHRhVGltZTogaW52ZXJzZSByZWxhdGl2ZSB2YWx1ZSB0byB0aGUgZnBzIG9mIHRoZSBnYW1lLiBXaGVuIHRoZSBnYW1lIHJ1bnMgb24gNjBmcHMgdGhlIHZhbHVlIGlzIDEuXG4gKiBXaGVuIHRoZSBmcHMgZHJvcCwgdGhlIGRlbHRhVGltZSB2YWx1ZSBpcyBpbmNyZWFzZWQgcHJvcG9ydGlvbmFsIHRvIHRoZSBhbW91bnQgb2YgZnBzIGRyb3BwZWQuXG4gKiBFeGFtcGxlOlxuICogNjBmcHM6IGRlbHRhVGltZSA9PSAxXG4gKiAzMGZwczogZGVsdGFUaW1lID09IDJcbiAqIDE1ZnBzOiBkZWx0YVRpbWUgPT0gNFxuICovXG5leHBvcnQgY2xhc3MgVGltZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBkZWx0YVRpbWU6IGludmVyc2UgcmVsYXRpdmUgdmFsdWUgdG8gdGhlIGZwcyBvZiB0aGUgZ2FtZS4gV2hlbiB0aGUgZ2FtZSBydW5zIG9uIDYwZnBzIHRoZSB2YWx1ZSBpcyAxLlxuICAgKi9cbiAgZGVsdGFUaW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGRlbHRhVGltZUZTOiBkZWx0YVRpbWUgaW4gZmxvYXRpbmcgcG9pbnQgbnVtYmVyLlxuICAgKi9cbiAgZGVsdGFUaW1lRlM6IG51bWJlcjtcblxuICAvKipcbiAgICogdGltZTogc2Vjb25kcyBlbGFwc2VkIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZFxuICAgKi9cbiAgdGltZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBmcmFtZVRpbWU6IGFsbW9zdCB0aGUgc2FtZSBhcyBzdGFydFRpbWUsIGhhcyB0aGUgZWxhcHNlZCBzZWNvbmRzXG4gICAqL1xuICBmcmFtZVRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogZnJhbWVDb3VudDogbnVtYmVyIG9mIGZyYW1lcyBlbGFwc2VkIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZFxuICAgKi9cbiAgZnJhbWVDb3VudDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBmcHM6IGZyYW1lcyBwZXIgc2Vjb25kIG9mIHRoZSBnYW1lXG4gICAqL1xuICBmcHM6IG51bWJlcjtcblxuICAvKipcbiAgICogc3RhcnRUaW1lOiBzZWNvbmRzIGVsYXBzZWQgc2NpZW5jZSB0aGUgZ2FtZSBzdGFydGVkXG4gICAqL1xuICBzdGFydFRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogbGFzdFRpbWU6IGxhc3QgdGltZSB0aGUgZ2FtZSBsb29wIHdhcyBleGVjdXRlZFxuICAgKi9cbiAgbGFzdFRpbWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogdW5rbm93bikge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5mcmFtZVRpbWUgPSAwO1xuICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgdGhpcy5mcHMgPSAwO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSB0aGlzLnN0YXJ0VGltZTtcbiAgICB0aGlzLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xuICB9XG5cbiAgcGFyYW1zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdGltZSB2YWx1ZXMuXG4gICAqL1xuICBtb3ZlKCk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50ID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwO1xuICAgIHRoaXMuZGVsdGFUaW1lRlMgPSBjdXJyZW50IC0gdGhpcy5sYXN0VGltZTtcbiAgICB0aGlzLmRlbHRhVGltZSA9IHRoaXMuZGVsdGFUaW1lRlMgLyAoMSAvIDYwKTtcbiAgICB0aGlzLmZyYW1lVGltZSArPSB0aGlzLmRlbHRhVGltZTtcbiAgICB0aGlzLnRpbWUgPSBjdXJyZW50IC0gdGhpcy5zdGFydFRpbWU7XG4gICAgdGhpcy5sYXN0VGltZSA9IGN1cnJlbnQ7XG4gICAgdGhpcy5mcHMgPSAxMDAwIC8gKHRoaXMuZGVsdGFUaW1lRlMgKiAxMDAwKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDYW1lcmEsIENhbWVyYUFyZ3MgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QsIE9iamVjdENvbnN0cnVjdG9yIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IENvbGxpZGVyLCBDb2xsaWRlckFyZ3MgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc3BsYXksIERpc3BsYXlBcmdzIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRW5naW5lLCBFbmdpbmVBcmdzLCBFbmdpbmVDcmVhdGVBcmdzIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBFdmVudHMgfSBmcm9tIFwiLi9ldmVudHNcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCIuL21hdHJpeFwiO1xuaW1wb3J0IHsgUGxhdGZvcm1Db250cm9sbGVyLCBQbGF0Zm9ybUNvbnRyb2xsZXJBcmdzLCBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vcmVjdFwiO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tIFwiLi9yZWdpc3RyeVwiO1xuaW1wb3J0IHsgUmVzb3VyY2VUeXBlLCBSZXNvdXJjZXMgfSBmcm9tIFwiLi9yZXNvdXJjZXNcIjtcbmltcG9ydCB7IFNjZW5lLCBTY2VuZUFyZ3MgfSBmcm9tIFwiLi9zY2VuZXNcIjtcbmltcG9ydCB7IFNvdW5kIH0gZnJvbSBcIi4vc291bmRzXCI7XG5pbXBvcnQgeyBTcHJpdGVTaGVldCwgU3ByaXRlU2hlZXRBcmdzIH0gZnJvbSBcIi4vc3ByaXRlLXNoZWV0c1wiO1xuaW1wb3J0IHsgU3ByaXRlLCBTcHJpdGVBcmdzIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuaW1wb3J0IHsgVGlsZSwgVGlsZUFyZ3MsIFRpbGVDb3JuZXJzLCBUaWxlRWRnZXMgfSBmcm9tIFwiLi90aWxlXCI7XG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSBcIi4vdGlsZW1hcFwiO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCB7IFJlc291cmNlSXRlbSwgUmVzb3VyY2VJdGVtQXJncyB9IGZyb20gXCIuL3Jlc291cmNlc1wiO1xuXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogYW55O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuRW5naW5lID0gRW5naW5lO1xuICB3aW5kb3cuU3ByaXRlU2hlZXQgPSBTcHJpdGVTaGVldDtcbiAgd2luZG93LlRpbGUgPSBUaWxlO1xuICB3aW5kb3cuVGlsZU1hcCA9IFRpbGVNYXA7XG4gIHdpbmRvdy5QbGF5ZXIgPSBQbGF5ZXI7XG4gIHdpbmRvdy5QbGF0Zm9ybUNvbnRyb2xsZXIgPSBQbGF0Zm9ybUNvbnRyb2xsZXI7XG4gIHdpbmRvdy5TY2VuZSA9IFNjZW5lO1xufVxuXG5leHBvcnQge1xuICBDYW1lcmEsXG4gIENhbWVyYUFyZ3MsXG4gIENvbGxlY3Rpb24sXG4gIENvbGxpZGVyLFxuICBDb2xsaWRlckFyZ3MsXG4gIENvbXBvbmVudCxcbiAgRGVidWcsXG4gIERpc3BsYXksXG4gIERpc3BsYXlBcmdzLFxuICBFbmdpbmUsXG4gIEVuZ2luZUFyZ3MsXG4gIEVuZ2luZUNyZWF0ZUFyZ3MsXG4gIEV2ZW50cyxcbiAgR2FtZU9iamVjdCxcbiAgSW5wdXQsXG4gIE1hdHJpeCxcbiAgT2JqZWN0Q29uc3RydWN0b3IsXG4gIFBsYXRmb3JtQ29udHJvbGxlcixcbiAgUGxhdGZvcm1Db250cm9sbGVyQXJncyxcbiAgUGxheWVyLFxuICBQb2ludCxcbiAgUmVnaXN0cnksXG4gIFJlc291cmNlSXRlbSxcbiAgUmVzb3VyY2VJdGVtQXJncyxcbiAgUmVzb3VyY2VUeXBlLFxuICBSZXNvdXJjZXMsXG4gIFNjZW5lLFxuICBTY2VuZUFyZ3MsXG4gIFNvdW5kLFxuICBTcHJpdGUsXG4gIFNwcml0ZUFyZ3MsXG4gIFNwcml0ZVNoZWV0LFxuICBTcHJpdGVTaGVldEFyZ3MsXG4gIFRpbGUsXG4gIFRpbGVBcmdzLFxuICBUaWxlQ29ybmVycyxcbiAgVGlsZUVkZ2VzLFxuICBUaWxlTWFwLFxuICBUaW1lLFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==