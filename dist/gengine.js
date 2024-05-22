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
        return ["x", "y", "width", "height"];
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
            width: this.width,
            height: this.height,
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
        // gravity
        let moveDistanceY = this.controller.applyGravity(this);
        this.y += moveDistanceY;
        this.camera.y += moveDistanceY;
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
        this.camera.x = Math.floor(this.x - this.camera.width / 2);
        this.camera.y = Math.floor(this.y - this.camera.height / 2);
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
        let x2 = Math.ceil(this.camera.width / this.twidth);
        let y2 = Math.ceil(this.camera.height / this.theight);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MkNBQU0sQ0FBQztJQUN2QixNQUFNLENBQUMsV0FBVyxHQUFHLHdEQUFXLENBQUM7SUFDakMsTUFBTSxDQUFDLElBQUksR0FBRyx3Q0FBSSxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsOENBQU8sQ0FBQztJQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHLDRDQUFNLENBQUM7SUFDdkIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLHdEQUFrQixDQUFDO0lBQy9DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsMkNBQUssQ0FBQztBQUN2QixDQUFDO0FBMENDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jYW1lcmEudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9jb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY29sbGlkZXJzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvY29sbGlzaW9ucy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2NvbXBvbmVudHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9kZWJ1Zy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9lbmdpbmUudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy9pbnB1dC50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL21hdGhzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvbWF0cml4LnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvb2JqZWN0cy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3BsYXllci50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3JlZ2lzdHJ5LnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvcmVzb3VyY2VzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc2NlbmVzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc291bmRzLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvc3ByaXRlLXNoZWV0cy50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3Nwcml0ZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS8uL3NyYy90aWxlLnRzIiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvdGlsZW1hcC50cyIsIndlYnBhY2s6Ly9nZW5naW5lLy4vc3JjL3RpbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZW5naW5lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2VuZ2luZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dlbmdpbmUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ2VuZ2luZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJnZW5naW5lXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgbWFuYWdpbmcgY2FtZXJhIHBvc2l0aW9uIG9uIHRoZSBzY3JlZW4uXG4gKiBUaGUgQ2FtZXJhIGlzIHRoZSB2aWV3cG9ydCBvZiB0aGUgZ2FtZSwgeW91IHNlZSB0aGUgZ2FtZSB3b3JsZCB0aHJvdWdoIHRoZSBjYW1lcmEuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBDYW1lcmFBcmdzIHtcbiAgLyoqXG4gICAqIHggcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxuICAgKi9cblxuICB4OiBudW1iZXI7XG4gIC8qKlxuICAgKiB5IHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogd2lkdGggb2YgdGhlIGNhbWVyYVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogaGVpZ2h0IG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FtZXJhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIHggcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxuICAgKi9cbiAgeDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiB5IHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogd2lkdGggb2YgdGhlIGNhbWVyYVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogaGVpZ2h0IG9mIHRoZSBjYW1lcmFcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBDYW1lcmFBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICBtb3ZlKCk6IHZvaWQge31cbn1cbiIsIi8qKlxuICogQ29sbGVjdGlvbiBhcmUgYSBncm91cCBvZiBpdGVtcyB0aGF0IGNhbiBiZSBvZiBhbnkgdHlwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248VD4ge1xuICBwdWJsaWMgaXRlbXM6IFRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXRlbSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byBhZGQuXG4gICAqL1xuICBhZGQoaXRlbTogVCkge1xuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIHJlbW92ZS5cbiAgICovXG4gIHJlbW92ZShpdGVtOiBUKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBpdGVtcyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICovXG4gIGFsbCgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUZXN0Q29sbGlzaW9uIH0gZnJvbSBcIi4vY29sbGlzaW9uc1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGlkZXJBcmdzIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBwYXJlbnQ6IFNwcml0ZTtcbn1cblxuLyoqXG4gKiBDb2xsaWRlciByZXByZXNlbnRzIGEgcmVjdC9jaXJjbGUgd2hpY2ggY2FuIGNvbGxpZGUgd2l0aCBhbm90aGVyIGNvbGxpZGVyLlxuICogVGhlIHBvc2l0aW9uIG9mIHRoZSBjb2xsaWRlciBpcyByZWxhdGl2ZSB0byBpdHMgcGFyZW50IHNwcml0ZS5cbiAqIEEgc3ByaXRlIGNhbiBoYXZlIFwiaW5maW5pdGVcIiBudW1iZXIgb2YgY29sbGlkZXJzLlxuICovXG5leHBvcnQgY2xhc3MgQ29sbGlkZXIgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHBhcmVudDogU3ByaXRlO1xuICB5OiBudW1iZXI7XG4gIHg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhcmdzOiBDb2xsaWRlckFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgfVxuXG4gIHRlc3QoY29sbGlkZXI6IENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgXCJOb3QgaW1wbGVtZW50ZWRcIjtcbiAgfVxuXG4gIGdldCBneCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQueCArIHRoaXMueDtcbiAgfVxuXG4gIGdldCBneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQueSArIHRoaXMueTtcbiAgfVxuXG4gIGRlYnVnRHJhdyhjb2xvcjogc3RyaW5nID0gXCJyZWRcIikge1xuICAgIHRocm93IFwiTm90IGltcGxlbWVudGVkXCI7XG4gIH1cbn1cbi8qKlxuICogQ2lyY2xlQ29sbGlkZXIgaXMgYSBDb2xsaWRlciB3aXRoIGEgY2lyY3VsYXIgc2hhcGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDaXJjbGVDb2xsaWRlciBleHRlbmRzIENvbGxpZGVyIHtcbiAgcmFkaXVzOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogQ29sbGlkZXJBcmdzKSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLndpZHRoIC8gMjtcbiAgfVxuXG4gIHRlc3QoY29sbGlkZXI6IENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgIHJldHVybiBUZXN0Q29sbGlzaW9uLkNpcmNsZVZzQ2lyY2xlKHRoaXMsIGNvbGxpZGVyKTtcbiAgICB9XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgUmVjdENvbGxpZGVyKSB7XG4gICAgICByZXR1cm4gVGVzdENvbGxpc2lvbi5DaXJjbGVWc1JlY3QodGhpcywgY29sbGlkZXIpO1xuICAgIH1cbiAgICB0aHJvdyBcIlVua25vd24gY29sbGlkZXJcIjtcbiAgfVxuXG4gIGRlYnVnRHJhdyhjb2xvcjogc3RyaW5nID0gXCJyZWRcIikge1xuICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnBhcmVudC5jb21wb25lbnRzLmdldChEaXNwbGF5KTtcbiAgICBpZiAoIWRpc3BsYXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGxheS5jaXJjbGUodGhpcy5neCwgdGhpcy5neSwgdGhpcy5yYWRpdXMsIGNvbG9yKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlY3RDb2xsaWRlciBpcyBhIGNvbGxpZGVyIG9mIHJlY3Rhbmd1bGFyIHNoYXBlLlxuICovXG5leHBvcnQgY2xhc3MgUmVjdENvbGxpZGVyIGV4dGVuZHMgQ29sbGlkZXIge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHBhcmVudDogU3ByaXRlO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29sbGlkZXJBcmdzKSB7XG4gICAgc3VwZXIocGFyYW1zKTtcbiAgfVxuXG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wieFwiLCBcInlcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXTtcbiAgfVxuXG4gIHRlc3QoY29sbGlkZXI6IENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgIHJldHVybiBUZXN0Q29sbGlzaW9uLkNpcmNsZVZzUmVjdChjb2xsaWRlciwgdGhpcyk7XG4gICAgfVxuICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIFJlY3RDb2xsaWRlcikge1xuICAgICAgcmV0dXJuIFRlc3RDb2xsaXNpb24uUmVjdFZzUmVjdCh0aGlzLCBjb2xsaWRlcik7XG4gICAgfVxuXG4gICAgRGVidWcuZXJyb3IoXCJVbmtub3duIGNvbGxpZGVyIFwiICsgdHlwZW9mIGNvbGxpZGVyKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWJ1Z0RyYXcoY29sb3I6IHN0cmluZyA9IFwicmVkXCIpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5wYXJlbnQuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gICAgaWYgKCFkaXNwbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BsYXkucmVjdCh0aGlzLmd4LCB0aGlzLmd5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgY29sb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaXJjbGVDb2xsaWRlciwgUmVjdENvbGxpZGVyIH0gZnJvbSBcIi4vY29sbGlkZXJzXCI7XG5cbi8qKlxuICogQSBjbGFzcyB3aXRoIHN0YXRpYyBtZXRob2RzIHdoaWNoIHRlc3QgZm9yIGNvbGxpc2lvbiBiZXR3ZWVuIGRpZmZlcmVudFxuICogdHlwZXMgb2YgY29sbGlkZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVGVzdENvbGxpc2lvbiB7XG4gIHN0YXRpYyBDaXJjbGVWc1JlY3QoY2lyY2xlOiBDaXJjbGVDb2xsaWRlciwgcmVjdDogUmVjdENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgbGV0IGhhbGZSZWN0V2lkdGggPSByZWN0LndpZHRoIC8gMjtcbiAgICBsZXQgaGFsZlJlY3RIZWlnaHQgPSByZWN0LmhlaWdodCAvIDI7XG4gICAgbGV0IGhhbGZEaXN0WCA9IE1hdGguYWJzKGNpcmNsZS5neCAtIHJlY3QuZ3ggLSBoYWxmUmVjdFdpZHRoKTtcbiAgICBsZXQgaGFsZkRpc3RZID0gTWF0aC5hYnMoY2lyY2xlLmd5IC0gcmVjdC5neSAtIGhhbGZSZWN0SGVpZ2h0KTtcbiAgICBpZiAoaGFsZkRpc3RYID4gaGFsZlJlY3RXaWR0aCArIGNpcmNsZS5yYWRpdXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaGFsZkRpc3RZID4gaGFsZlJlY3RIZWlnaHQgKyBjaXJjbGUucmFkaXVzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGhhbGZEaXN0WCA8PSBoYWxmUmVjdFdpZHRoKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaGFsZkRpc3RZIDw9IGhhbGZSZWN0SGVpZ2h0KSByZXR1cm4gdHJ1ZTtcbiAgICAvL2Nvcm5lciBjb2xsaXNpb25cbiAgICBsZXQgZHggPSBoYWxmRGlzdFggLSBoYWxmUmVjdFdpZHRoO1xuICAgIGxldCBkeSA9IGhhbGZEaXN0WSAtIGhhbGZSZWN0SGVpZ2h0O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeSA8PSBNYXRoLnBvdyhjaXJjbGUucmFkaXVzLCAyKTtcbiAgfVxuXG4gIHN0YXRpYyBSZWN0VnNDaXJjbGUocmVjdDogUmVjdENvbGxpZGVyLCBjaXJjbGU6IENpcmNsZUNvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuQ2lyY2xlVnNSZWN0KGNpcmNsZSwgcmVjdCk7XG4gIH1cblxuICBzdGF0aWMgUmVjdFZzUmVjdChyZWN0MTogUmVjdENvbGxpZGVyLCByZWN0MjogUmVjdENvbGxpZGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgcmVjdDEuZ3ggPD0gcmVjdDIuZ3ggKyByZWN0Mi53aWR0aCAmJlxuICAgICAgcmVjdDEuZ3ggKyByZWN0MS53aWR0aCA+IHJlY3QyLmd4ICYmXG4gICAgICByZWN0MS5neSA8PSByZWN0Mi5neSArIHJlY3QyLmhlaWdodCAmJlxuICAgICAgcmVjdDEuaGVpZ2h0ICsgcmVjdDEuZ3kgPj0gcmVjdDIuZ3lcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgQ2lyY2xlVnNDaXJjbGUoXG4gICAgY2lyY2xlMTogQ2lyY2xlQ29sbGlkZXIsXG4gICAgY2lyY2xlMjogQ2lyY2xlQ29sbGlkZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgbGV0IGR4ID0gY2lyY2xlMS5neCAtIGNpcmNsZTIuZ3g7XG4gICAgbGV0IGR5ID0gY2lyY2xlMS5neSAtIGNpcmNsZTIuZ3k7XG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICBpZiAoZGlzdGFuY2UgPCBjaXJjbGUxLndpZHRoIC8gMiArIGNpcmNsZTIud2lkdGggLyAyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IE9iamVjdENvbnN0cnVjdG9yLCBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tIFwiLi9yZWdpc3RyeVwiO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBiYXNlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQgb2YgdGhlIGVuZ2luZS5cbiAqIFRoZSBlbmdpbmUgY29uc2lzdCBvZiBtdWx0aXBsZSBjb21wb25lbnRzIHdoaWNoIHBlcmZvcm0gdmFyaW91cyB0YXNrcy5cbiAqIFNvbWUgQ29tcG9uZW50cyBmb3JtIHBhcnQgb2YgdGhlIGNvcmUgb2YgdGhlIEVuZ2luZSwgb3RoZXJzIGNvdWxkIGJlIGFkZGVkIGFzIG5lZWQgYXQgcnVudGltZS5cbiAqIFdoZW4gdGhlIEVuZ2luZSBpcyByZWFkeSwgaXQgd2lsbCBjcmVhdGUgdGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgYW5kIHBhc3MgaXRzZWxmIGFzIHRoZSBlbmdpbmUgcGFyYW1ldGVyLlxuICogRWFjaCBDb21wb25lbnQgaW5zdGFuY2UgaGFzIGFjY2VzcyB0byB0aGUgZW5naW5lXG4gKiBAcGFyYW0ge29iamVjdH0gZW5naW5lIFRoZSBpbnN0YW5jZSBvZiB0aGUgZW5naW5lLCB0aGlzIHdpbGwgYmUgcGFzc2VkIGJ5IHRoZSBlbmdpbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgT2JqZWN0IGxpdGVyYWwgd2l0aCBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGUgY29tcG9uZW50IGNvbnN0cnVjdGVkXG4gKi9cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIEdhbWVPYmplY3Qge1xuICBlbmdpbmU6IEVuZ2luZTtcbiAgbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGVuZ2luZSBhbmQgaXMgcmVhZHlcbiAgICovXG4gIGluaXQoKSB7XG4gICAgRGVidWcuc3VjY2VzcyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGluaXRpYWxpemVkYCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBlYWNoIGN5Y2xlIG9mIHRoZSBlbmdpbmUgZ2FtZSBsb29wXG4gICAqL1xuICBtb3ZlKCk6IHZvaWQge31cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBlYWNoIGN5Y2xlIG9mIHRoZSBlbmdpbmUgZ2FtZSBsb29wXG4gICAqL1xuICBkcmF3KCk6IHZvaWQge31cblxuICAvKipcbiAgICogRW5naW5lcyBjb21wb25lbnQgcmVnaXN0cnlcbiAgICovXG4gIGdldCBjb21wb25lbnRzKCk6IFJlZ2lzdHJ5IHtcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUucmVnaXN0cnk7XG4gIH1cbn1cbiIsIi8qKlxuICogQ2xhc3Mgd2l0aCBzdGF0aWMgbWV0aG9kcyB0byBmYWNpbGl0YXRlIHRoZSBtZXNzYWdlcyBvbiB0aGUgamF2YXNjcmlwdCBjb25zb2xlLlxuICogQWxsIHRoZSBtZXRob2RzIG9mIERlYnVnIGNsYXNzIHdpbGwgb25seSBydW4gaWYgdGhlIGRlYnVnIG1vZGUgaXMgb24uXG4gKiBUbyBhY3RpdmF0ZSB0aGUgZGVidWcgbW9kZSwgZGVjbGFyZSBhIGdsb2JhbCB2YXJpYWJsZSBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBlbmdpbmVcbiAqIHdpdGggdGhlIG5hbWU6IEdFTkdJTkVfREVCVUdfTU9ERSA9IHRydWUuXG4gKiBJZiB0aGUgZGVidWcgbW9kZSBpcyBvZmYsIG5vIG1lc3NhZ2VzIHdvdWxkIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUuXG4gKi9cblxuZGVjbGFyZSBjb25zdCBHRU5HSU5FX0RFQlVHX01PREU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBjbGFzcyBEZWJ1ZyB7XG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBJZiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICovXG4gIHN0YXRpYyBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIEdFTkdJTkVfREVCVUdfTU9ERTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSBtZXNzYWdlIHRvIHRoZSBjb25zb2xlXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgbG9nKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgaW5mbyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlIHdoZW4gdGhlIGRlYnVnIG1vZGUgaXMgYWN0aXZlXG4gICAqIEBwYXJhbSBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgaW5mbyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5pbmZvKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIHN1Y2Nlc3MgbWVzc2FnZSB0byB0aGUgY29uc29sZSB3aGVuIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUgd2hlbiB0aGUgZGVidWcgbW9kZSBpcyBhY3RpdmVcbiAgICovXG4gIHN0YXRpYyB3YXJuKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgYW4gZXJyb3IgbWVzc2FnZSB3aGVuIHRoZSBkZWJ1ZyBtb2RlIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgZ3JvdXAgb2YgbWVzc2FnZXMgaW4gdGhlIGNvbnNvbGVcbiAgICogQHBhcmFtIG5hbWUgb2YgdGhlIGdyb3VwXG4gICAqL1xuICBzdGF0aWMgZ3JvdXBTdGFydChuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIURlYnVnLmFjdGl2ZSgpKSByZXR1cm47XG4gICAgY29uc29sZS5ncm91cENvbGxhcHNlZChuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmQgYSBncm91cCBvZiBtZXNzYWdlcyBpbiB0aGUgY29uc29sZVxuICAgKi9cbiAgc3RhdGljIGdyb3VwRW5kKCkge1xuICAgIGlmICghRGVidWcuYWN0aXZlKCkpIHJldHVybjtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoYXQgdGhlIG9iamVjdCBsaXRlcmFsIG9mIHRoZSBjb25zdHJ1Y3RvciBoYXMgdGhlIGVsZW1lbnRzIG9mIHRoZSByZXF1aXJlZCBhcnJheVxuICAgKiBAcGFyYW0gbWV0aG9kIE9iamVjdCBtZXRob2QgbmFtZVxuICAgKiBAcGFyYW0gYXJncyB0aGUgYXJndW1lbnRzIG9iamVjdCBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHJlcXVpcmVkIGxpc3Qgb2YgcmVxdWlyZWQgbWVtYmVycyBpbiB0aGUgY29uc3RydWN0b3IgYXJndW1lbnRzXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgdmFsaWRhdGVQYXJhbXMoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgYXJnczogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICByZXF1aXJlZDogc3RyaW5nW11cbiAgKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIGlmICghcmVxdWlyZWQgfHwgIXJlcXVpcmVkLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChyZXF1aXJlZC5sZW5ndGggJiYgIWFyZ3MpIHtcbiAgICAgIERlYnVnLndhcm4oXG4gICAgICAgIGAke21ldGhvZH0gcmVxdWlyZXMgdGhpcyBtZW1iZXJzIGluIHRoZSBjb25zdHJ1Y3RvcjogeyR7cmVxdWlyZWQuam9pbihcbiAgICAgICAgICBcIixcIlxuICAgICAgICApfX1gXG4gICAgICApO1xuICAgIH1cbiAgICBmb3IgKGxldCBrZXkgb2YgcmVxdWlyZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1trZXldID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIERlYnVnLmVycm9yKGAke21ldGhvZH0gcmVxdWlyZXMgb2YgXCIke2tleX1cIiBpbiB0aGUgY29uc3RydWN0b3JgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gXCIuL3Nwcml0ZS1zaGVldHNcIjtcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBvZiB0aGUgRGlzcGxheSBjb21wb25lbnQgb2YgdGhlIEVuZ2luZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpc3BsYXlBYnN0cmFjdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIGNsZWFyKCkge31cblxuICBmaWxsUmVjdChcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgY29sb3I6IHN0cmluZ1xuICApIHt9XG5cbiAgcmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHt9XG5cbiAgY2lyY2xlKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaWFtZXRlcjogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7fVxuXG4gIG1vdmUoKTogdm9pZCB7fVxufVxuXG4vKipcbiAqIENsYXNzIG9mIHRoZSBEaXNwbGF5IGNvbXBvbmVudCBvZiB0aGUgRW5naW5lLlxuICogVGhlIERpc3BsYXkgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgdGhlIGdhbWUgb2JqZWN0cyBvbiB0aGUgc2NyZWVuLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheUFyZ3Mge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjYW52YXMgZWxlbWVudFxuICAgKi9cbiAgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5XG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5XG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdGhlIGltYWdlIHNtb290aGluZyBpcyBlbmFibGVkXG4gICAqL1xuICBpc0ltYWdlU21vb3RoaW5nRW5hYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIERpc3BsYXkgZXh0ZW5kcyBEaXNwbGF5QWJzdHJhY3Qge1xuICAvKipcbiAgICogVGhlIGNhbnZhcyBlbGVtZW50XG4gICAqL1xuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgY2FudmFzIHJlbmRlcmluZyBjb250ZXh0XG4gICAqL1xuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAvKipcbiAgICogVGhlIGNhbWVyYSBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgY2FtZXJhOiBDYW1lcmE7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpbWFnZSBzbW9vdGhpbmcgaXMgZW5hYmxlZFxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaXNJbWFnZVNtb290aGluZ0VuYWJsZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IERpc3BsYXlBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIGAke3RoaXMud2lkdGh9YCk7XG4gICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIGAke3RoaXMuaGVpZ2h0fWApO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmN1cnNvciA9IFwibm9uZVwiO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEycHggSGVsdmV0aWNhXCI7XG4gICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5pc0ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuY29tcG9uZW50cy5nZXQoQ2FtZXJhKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBkaXNwbGF5XG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXCJpZFwiLCBcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiBkZWZhdWx0IG9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBkaXNwbGF5XG4gICAqL1xuICBjb25maWcoKTogUGFydGlhbDxEaXNwbGF5QXJncz4ge1xuICAgIHJldHVybiB7XG4gICAgICBpc0ltYWdlU21vb3RoaW5nRW5hYmxlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzBGRlwiO1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGZpbGxSZWN0KFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LnJlY3QoLXRoaXMuY2FtZXJhLnggKyB4LCAtdGhpcy5jYW1lcmEueSArIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgfVxuXG4gIHJlY3QoXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGNvbG9yOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LnJlY3QoLXRoaXMuY2FtZXJhLnggKyB4LCAtdGhpcy5jYW1lcmEueSArIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgY2lyY2xlKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaWFtZXRlcjogbnVtYmVyLCBjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKFxuICAgICAgLXRoaXMuY2FtZXJhLnggKyB4LFxuICAgICAgLXRoaXMuY2FtZXJhLnkgKyB5LFxuICAgICAgZGlhbWV0ZXIgLyAyLFxuICAgICAgMCxcbiAgICAgIDIgKiBNYXRoLlBJLFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxuICB0ZXh0KHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2UgVGhlIGltYWdlIHRvIGRyYXdcbiAgICogQHBhcmFtIHN4IFRoZSB4IGNvb3JkaW5hdGUgd2hlcmUgdG8gc3RhcnQgY2xpcHBpbmdcbiAgICogQHBhcmFtIHN5IFRoZSB5IGNvb3JkaW5hdGUgd2hlcmUgdG8gc3RhcnQgY2xpcHBpbmdcbiAgICogQHBhcmFtIHNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNsaXBwZWQgaW1hZ2VcbiAgICogQHBhcmFtIHNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2xpcHBlZCBpbWFnZVxuICAgKiBAcGFyYW0gZHggVGhlIHggY29vcmRpbmF0ZSB3aGVyZSB0byBwbGFjZSB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0gZHkgVGhlIHkgY29vcmRpbmF0ZSB3aGVyZSB0byBwbGFjZSB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0gZFdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgaW1hZ2UgdG8gdXNlXG4gICAqIEBwYXJhbSBkSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGltYWdlIHRvIHVzZVxuICAgKi9cbiAgZHJhd0ltYWdlKFxuICAgIGltYWdlOiBDYW52YXNJbWFnZVNvdXJjZSxcbiAgICBzeDogbnVtYmVyLFxuICAgIHN5OiBudW1iZXIsXG4gICAgc1dpZHRoOiBudW1iZXIsXG4gICAgc0hlaWdodDogbnVtYmVyLFxuICAgIGR4OiBudW1iZXIsXG4gICAgZHk6IG51bWJlcixcbiAgICBkV2lkdGg6IG51bWJlcixcbiAgICBkSGVpZ2h0OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB4IFRoZSB4IGNvb3JkaW5hdGUgd2hlcmUgdG8gcGxhY2UgdGhlIHRpbGUgaW1hZ2Ugb24gdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0geSBUaGUgeSBjb29yZGluYXRlIHdoZXJlIHRvIHBsYWNlIHRoZSB0aWxlIGltYWdlIG9uIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgdGlsZSBpbWFnZSB0byB1c2VcbiAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxlIGltYWdlIHRvIHVzZVxuICAgKiBAcGFyYW0gc2hlZXQgVGhlIHNwcml0ZSBzaGVldCB0byB1c2VcbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgaW1hZ2UgdG8gdXNlIHdpdGhpbiB0aGUgc3ByaXRlIHNoZWV0XG4gICAqL1xuICBkcmF3VGlsZShcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc2hlZXQ6IFNwcml0ZVNoZWV0LFxuICAgIGluZGV4OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgbGV0IHRpbGUgPSBzaGVldC50aWxlc1tpbmRleF07XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgc2hlZXQuaW1hZ2UsXG4gICAgICB0aWxlLngsXG4gICAgICB0aWxlLnksXG4gICAgICBzaGVldC53aWR0aCxcbiAgICAgIHNoZWV0LmhlaWdodCxcbiAgICAgIHggLSB0aGlzLmNhbWVyYS54LFxuICAgICAgeSAtIHRoaXMuY2FtZXJhLnksXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgICk7XG4gICAgaWYgKERlYnVnLmFjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNGMEZcIjtcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjE4cHggQXJpYWxcIjtcbiAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgICAgICBgJHtpbmRleCArIDF9YCxcbiAgICAgICAgeCAtIHRoaXMuY2FtZXJhLnggKyB3aWR0aCAvIDIsXG4gICAgICAgIHkgLSB0aGlzLmNhbWVyYS55ICsgaGVpZ2h0IC8gMlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFdmVudHMgfSBmcm9tIFwiLi9ldmVudHNcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IE9iamVjdENvbnN0cnVjdG9yIH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tIFwiLi9yZWdpc3RyeVwiO1xuaW1wb3J0IHsgUmVzb3VyY2VJdGVtQXJncywgUmVzb3VyY2VzIH0gZnJvbSBcIi4vcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuL3NjZW5lc1wiO1xuaW1wb3J0IHsgU291bmQgfSBmcm9tIFwiLi9zb3VuZHNcIjtcbmltcG9ydCB7IFRpbGVNYXAgfSBmcm9tIFwiLi90aWxlbWFwXCI7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSBcIi4vdGltZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVuZ2luZUFyZ3Mge1xuICBjYW52YXM6IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5naW5lQ3JlYXRlQXJncyB7XG4gIGNhbnZhczogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgcmVzb3VyY2VzOiBSZXNvdXJjZUl0ZW1BcmdzW107XG4gIGdhbWU6IChlbmdpbmU6IEVuZ2luZSkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBFbmdpbmUgaXMgdGhlIG1haW4gb2JqZWN0IG9mIHRoZSBnYW1lIGVuZ2luZS5cbiAqIEVuZ2luZSBjb25zaXN0IG9mIGEgZ3JvdXAgb2YgZGlmZmVyZW50IGNvbXBvbmVudHMgd2hpY2ggbWFuYWdlIGRpZmZlcmVudCB0YXNrcy5cbiAqIEVhY2ggY29tcG9uZW50IGlzIGEgbGVnbyBwaWVjZSwgYW5kIHRoZSBlbmdpbmUgaXMgdGhlIGdsdWUgd2hpY2ggYmluZHMgdGhlbSB0b2dldGhlci5cbiAqIE9uY2UgdGhlIGRvY3VtZW50IGlzIHJlYWR5LCBFbmdpbmUgd2lsbCBpbml0aWFsaXplIGVhY2ggY29tcG9uZW50IGFkZGVkXG4gKiBpbnRvIGl0LCBjYWxsIHRoZSBwcmVsb2FkZXIgbWV0aG9kLCBleGVjdXRlIHRoZSBnYW1lIGNyZWF0aW9uIGZ1bmN0aW9uXG4gKiBhbmQgdGhlbiBzdGFydCBleGVjdXRpbmcgdGhlIGdhbWUgbG9vcC5cbiAqL1xuZXhwb3J0IGNsYXNzIEVuZ2luZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGVuZ2luZTogRW5naW5lO1xuICAvLyBUT0RPIHJlbW92ZSB0aWxlIG1hcCBmcm9tIGVuZ2luZVxuICB0aWxlTWFwOiBUaWxlTWFwO1xuICByZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuICBzY2VuZXMgPSBuZXcgQ29sbGVjdGlvbjxTY2VuZT4oKTtcbiAgdGltZTogVGltZTtcbiAgZGlzcGxheTogRGlzcGxheTtcbiAgcmVzb3VyY2VzOiBSZXNvdXJjZXM7XG4gIGNhbWVyYTogQ2FtZXJhO1xuICBzb3VuZDogU291bmQ7XG4gIGlucHV0OiBJbnB1dDtcbiAgZXZlbnRzOiBFdmVudHM7XG4gIGZwc0RlbGF5Q291bnQgPSAwO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhcmdzOiBFbmdpbmVBcmdzKSB7XG4gICAgc3VwZXIodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB0aGlzLmVuZ2luZSA9IHRoaXM7XG4gICAgRGVidWcuZ3JvdXBTdGFydChcIkVuZ2luZSBsb2FkZWQgY29tcG9uZW50c1wiKTtcbiAgICB0aGlzLnJlc291cmNlcyA9IHRoaXMuYWRkQ29tcG9uZW50KFJlc291cmNlcyk7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmFkZENvbXBvbmVudChDYW1lcmEsIHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgIH0pO1xuICAgIHRoaXMudGltZSA9IHRoaXMuYWRkQ29tcG9uZW50KFRpbWUpO1xuICAgIHRoaXMuc291bmQgPSB0aGlzLmFkZENvbXBvbmVudChTb3VuZCk7XG4gICAgdGhpcy5kaXNwbGF5ID0gdGhpcy5hZGRDb21wb25lbnQoRGlzcGxheSwge1xuICAgICAgaWQ6IFwiY2FudmFzXCIsXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICB9KTtcbiAgICB0aGlzLmlucHV0ID0gdGhpcy5hZGRDb21wb25lbnQoSW5wdXQpO1xuICAgIHRoaXMuZXZlbnRzID0gdGhpcy5hZGRDb21wb25lbnQoRXZlbnRzKTtcbiAgICBEZWJ1Zy5ncm91cEVuZCgpO1xuICB9XG5cbiAgcGFyYW1zKCkge1xuICAgIHJldHVybiBbXCJjYW52YXNcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgd2luZG93cy5vbmxvYWQgbWV0aG9kLlxuICAgKiBPbmNlIHRoZSB3aW5kb3cgaXMgcmVhZHksIGVuZ2luZSB3aWxsIGluaXRpYWxpemUgaXRzIGNvbXBvbmVudHMsIGV4ZWN1dGVcbiAgICogdGhlIHByZWxvYWRlciBhbmQgd2hlbiBwcmVsb2FkZXIgbG9hZGVkIGFsbCB0aGUgcmVzb3VyY2VzLCBjcmVhdGUgdGhlIGdhbWVcbiAgICogYW5kIGV4ZWN1dGUgdGhlIGdhbWVsb29wLlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZShhcmdzOiBFbmdpbmVDcmVhdGVBcmdzKSB7XG4gICAgRGVidWcudmFsaWRhdGVQYXJhbXMoXCJFbmdpbmUuY3JlYXRlXCIsIGFyZ3MsIFtcbiAgICAgIFwiY2FudmFzXCIsXG4gICAgICBcIndpZHRoXCIsXG4gICAgICBcImhlaWdodFwiLFxuICAgICAgXCJyZXNvdXJjZXNcIixcbiAgICAgIFwiZ2FtZVwiLFxuICAgIF0pO1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBlbmdpbmUgPSBuZXcgRW5naW5lKHtcbiAgICAgICAgICBjYW52YXM6IGFyZ3MuY2FudmFzLFxuICAgICAgICAgIHdpZHRoOiBhcmdzLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogYXJncy5oZWlnaHQsXG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIGFyZ3MucmVzb3VyY2VzKSB7XG4gICAgICAgICAgZW5naW5lLnJlc291cmNlcy5hZGQocmVzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGVuZ2luZS5yZXNvdXJjZXMucHJlbG9hZCgpO1xuICAgICAgICBlbmdpbmUuaW5pdCgpO1xuICAgICAgICBhcmdzLmdhbWUoZW5naW5lKTtcbiAgICAgICAgZW5naW5lLmdhbWVMb29wKCk7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KVtcImdlbmdpbmVcIl0gPSBlbmdpbmU7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb21wb25lbnQgdG8gdGhlIGVuZ2luZS5cbiAgICogQHBhcmFtIENvbnN0cnVjdG9yIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgY29tcG9uZW50IHRvIHN0b3JlLlxuICAgKiBAcGFyYW0gYXJncyAgdG8gaW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgYWRkQ29tcG9uZW50KENvbnN0cnVjdG9yOiBPYmplY3RDb25zdHJ1Y3Rvcjxhbnk+LCBhcmdzOiBhbnkgPSB7fSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGFyZ3MpO1xuICAgIHRoaXMuY29tcG9uZW50cy5zZXQoQ29uc3RydWN0b3IsIGluc3RhbmNlKTtcbiAgICBpbnN0YW5jZS5pbml0KCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgdGhpcy5yZWdpc3RyeS52YWx1ZXM8Q29tcG9uZW50PigpKSB7XG4gICAgICBjb21wb25lbnQubW92ZSgpO1xuICAgIH1cbiAgICBmb3IgKGxldCBzY2VuZSBvZiB0aGlzLnNjZW5lcy5hbGwoKSkge1xuICAgICAgaWYgKHNjZW5lLmlzQWN0aXZlKSB7XG4gICAgICAgIHNjZW5lLm1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheS5jbGVhcigpO1xuICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiB0aGlzLnJlZ2lzdHJ5LnZhbHVlczxDb21wb25lbnQ+KCkpIHtcbiAgICAgIGNvbXBvbmVudC5kcmF3KCk7XG4gICAgfVxuICAgIGZvciAobGV0IHNjZW5lIG9mIHRoaXMuc2NlbmVzLmFsbCgpKSB7XG4gICAgICBpZiAoc2NlbmUuaXNWaXNpYmxlKSB7XG4gICAgICAgIHNjZW5lLmRyYXcoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKERlYnVnLmFjdGl2ZSgpICYmIHRoaXMuaW5wdXQubW91c2UuaXNJbnNpZGUpIHtcbiAgICAgIHRoaXMuZGlzcGxheS5jaXJjbGUoXG4gICAgICAgIHRoaXMuY2FtZXJhLnggKyB0aGlzLmlucHV0Lm1vdXNlLnggLSAxLFxuICAgICAgICB0aGlzLmNhbWVyYS55ICsgdGhpcy5pbnB1dC5tb3VzZS55IC0gMSxcbiAgICAgICAgNixcbiAgICAgICAgXCJyZWRcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnYW1lTG9vcCA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmUoKTtcbiAgICB0aGlzLmZwc0RlbGF5Q291bnQgPSAwO1xuICAgIHRoaXMuZHJhdygpO1xuICAgIHRoaXMuZGVidWdJbmZvKCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVMb29wKTtcbiAgfTtcblxuICBkZWJ1Z0luZm8oKSB7XG4gICAgaWYgKCFEZWJ1Zy5hY3RpdmUoKSkgcmV0dXJuO1xuICAgIHRoaXMuZGlzcGxheS50ZXh0KHRoaXMudGltZS50aW1lLnRvRml4ZWQoMiksIDIwLCAyMCk7XG4gICAgdGhpcy5kaXNwbGF5LnRleHQodGhpcy50aW1lLmRlbHRhVGltZS50b0ZpeGVkKDQpLCAyMCwgNDApO1xuICAgIHRoaXMuZGlzcGxheS50ZXh0KHRoaXMudGltZS5mcHMudG9GaXhlZCgyKSwgMjAsIDYwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9pbnB1dFwiO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IHt9KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICBsZXQgaW5wdXQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KElucHV0KTtcbiAgICBsZXQgY2FudmFzID0gdGhpcy5jb21wb25lbnRzLmdldChEaXNwbGF5KS5jYW52YXM7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGV2ZW50OiBhbnkpID0+XG4gICAgICBpbnB1dC5tb3VzZU1vdmUoZXZlbnQpXG4gICAgKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQ6IGFueSkgPT5cbiAgICAgIGlucHV0Lm1vdXNlRG93bihldmVudClcbiAgICApO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiBpbnB1dC5tb3VzZUVudGVyKCkpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiBpbnB1dC5tb3VzZUxlYXZlKCkpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IGlucHV0Lm1vdXNlQ2xpY2soZXZlbnQpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50OiBhbnkpID0+IGlucHV0LmtleURvd24oZXZlbnQpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudDogYW55KSA9PiBpbnB1dC5rZXlVcChldmVudCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKipcbiAqIElucHV0IGNsYXNzIHRvIGhhbmRsZSB0aGUgdXNlciBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogQ2FtZXJhIGNvbXBvbmVudFxuICAgKi9cbiAgY2FtZXJhOiBDYW1lcmE7XG5cbiAgLyoqXG4gICAqIEtleSBjb2Rlc1xuICAgKi9cbiAga2V5Q29kZV86IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xuXG4gIC8qKlxuICAgKiBNb3VzZSBjb29yZGluYXRlc1xuICAgKi9cbiAgbW91c2U6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IGlzSW5zaWRlOiBib29sZWFuIH07XG5cbiAgLyoqXG4gICAqIFRpbGUgaW5wdXQgZWxlbWVudFxuICAgKi9cbiAgdGlsZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lKSB7XG4gICAgc3VwZXIoZW5naW5lLCB7fSk7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KENhbWVyYSk7XG4gICAgdGhpcy5rZXlDb2RlXyA9IHt9O1xuICAgIHRoaXMubW91c2UgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIGlzSW5zaWRlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlsZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB9XG5cbiAgbW91c2VNb3ZlKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBsZXQgcmVjdCA9IHRoaXMuZW5naW5lLmRpc3BsYXkuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMubW91c2UueCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgdGhpcy5tb3VzZS55ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgIGlmIChldmVudC5idXR0b25zID09PSAyKSB7XG4gICAgICB0aGlzLmNhbWVyYS54IC09IGV2ZW50Lm1vdmVtZW50WDtcbiAgICAgIHRoaXMuY2FtZXJhLnkgLT0gZXZlbnQubW92ZW1lbnRZO1xuICAgIH1cbiAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIGxldCB4ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWCh0aGlzLm1vdXNlLnggKyB0aGlzLmNhbWVyYS54KTtcbiAgICAgIGxldCB5ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWSh0aGlzLm1vdXNlLnkgKyB0aGlzLmNhbWVyYS55KTtcbiAgICAgIHRoaXMuZW5naW5lLnRpbGVNYXAuc2V0KHgsIHksIHBhcnNlSW50KHRoaXMudGlsZUlucHV0LnZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VFbnRlcigpIHtcbiAgICB0aGlzLm1vdXNlLmlzSW5zaWRlID0gdHJ1ZTtcbiAgfVxuXG4gIG1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5tb3VzZS5pc0luc2lkZSA9IGZhbHNlO1xuICB9XG5cbiAgbW91c2VDbGljayhldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgIGxldCB4ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWCh0aGlzLm1vdXNlLnggKyB0aGlzLmNhbWVyYS54KTtcbiAgICAgIGxldCB5ID0gdGhpcy5lbmdpbmUudGlsZU1hcC5nZXRUaWxlWSh0aGlzLm1vdXNlLnkgKyB0aGlzLmNhbWVyYS55KTtcbiAgICAgIHRoaXMudGlsZUlucHV0LnZhbHVlID0gYCR7dGhpcy5lbmdpbmUudGlsZU1hcC5nZXQoeCwgeSl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHggPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVYKHRoaXMubW91c2UueCArIHRoaXMuY2FtZXJhLngpO1xuICAgICAgbGV0IHkgPSB0aGlzLmVuZ2luZS50aWxlTWFwLmdldFRpbGVZKHRoaXMubW91c2UueSArIHRoaXMuY2FtZXJhLnkpO1xuICAgICAgdGhpcy5lbmdpbmUudGlsZU1hcC5zZXQoeCwgeSwgcGFyc2VJbnQodGhpcy50aWxlSW5wdXQudmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd24oZXZlbnQ6IFBvaW50ZXJFdmVudCk6IHZvaWQge31cblxuICBrZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5rZXlDb2RlX1tldmVudC5jb2RlXSA9IHRydWU7XG4gIH1cblxuICBrZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMua2V5Q29kZV9bZXZlbnQuY29kZV0gPSBmYWxzZTtcbiAgfVxuXG4gIGtleUNvZGUoY29kZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLmtleUNvZGVfW2NvZGVdICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICA/IHRoaXMua2V5Q29kZV9bY29kZV1cbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBnZXRBeGlzSG9yaXpvbnRhbCgpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5rZXlDb2RlKFwiQXJyb3dMZWZ0XCIpID8gLTEgOiAwO1xuICAgIHJlc3VsdCArPSB0aGlzLmtleUNvZGUoXCJBcnJvd1JpZ2h0XCIpID8gMSA6IDA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldEF4aXNWZXJ0aWNhbCgpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5rZXlDb2RlKFwiQXJyb3dVcFwiKSA/IC0xIDogMDtcbiAgICByZXN1bHQgKz0gdGhpcy5rZXlDb2RlKFwiQXJyb3dEb3duXCIpID8gMSA6IDA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuL3JlY3RcIjtcblxuZXhwb3J0IGNsYXNzIE1hdGhzIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gY2xhbXBcbiAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgKiBAcGFyYW0gbWF4IHRoZSBtYXhpbXVtIHZhbHVlXG4gICAqIEByZXR1cm5zIHRoZSBjbGFtcGVkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgY2xhbXAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmVhciBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHR3byB2YWx1ZXNcbiAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgKiBAcGFyYW0gbWF4IHRoZSBtYXhpbXVtIHZhbHVlXG4gICAqIEBwYXJhbSB0IHRoZSB0aW1lIHZhbHVlXG4gICAqIEByZXR1cm5zIHRoZSBsZXJwZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBsZXJwKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG1pbiArIChtYXggLSBtaW4pICogdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiB0d28gdmFsdWVzXG4gICAqIEBwYXJhbSBtaW4gdGhlIG1pbmltdW0gdmFsdWVcbiAgICogQHBhcmFtIG1heCB0aGUgbWF4aW11bSB2YWx1ZVxuICAgKiBAcmV0dXJucyB0aGUgcmFuZG9tIG51bWJlclxuICAgKi9cbiAgc3RhdGljIHJhbmQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIHJlY3RhbmdsZXMgaW50ZXJzZWN0XG4gICAqIEBwYXJhbSByZWN0MVxuICAgKiBAcGFyYW0gcmVjdDJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgcmVjdGFuZ2xlcyBpbnRlcnNlY3RcbiAgICovXG4gIHN0YXRpYyBSZWN0SW50ZXJzZWN0KHJlY3QxOiBSZWN0LCByZWN0MjogUmVjdCkge1xuICAgIGlmIChcbiAgICAgIHJlY3QxLnggPD0gcmVjdDIueCArIHJlY3QyLndpZHRoICYmXG4gICAgICByZWN0MS54ICsgcmVjdDEud2lkdGggPiByZWN0Mi54ICYmXG4gICAgICByZWN0MS55IDw9IHJlY3QyLnkgKyByZWN0Mi5oZWlnaHQgJiZcbiAgICAgIHJlY3QxLmhlaWdodCArIHJlY3QxLnkgPj0gcmVjdDIueVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWF0aHMgfSBmcm9tIFwiLi9tYXRoc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYXRyaXggd2l0aCBhIGZpeGVkIHdpZHRoIGFuZCBoZWlnaHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRyaXgge1xuICBhcnJheTogVWludDE2QXJyYXk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTWF0cml4IGluc3RhbmNlLlxuICAgKiBAcGFyYW0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSBtYXRyaXguXG4gICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgbWF0cml4LlxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuYXJyYXkgPSBuZXcgVWludDE2QXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIG1hdHJpeC5cbiAgICogQHBhcmFtIHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB5IFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyBUaGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICovXG4gIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFycmF5W3kgKiB0aGlzLndpZHRoICsgeF07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgbWF0cml4LlxuICAgKiBAcGFyYW0geCBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHkgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgKi9cbiAgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5hcnJheVt5ICogdGhpcy53aWR0aCArIHhdID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIG1hdHJpeCB3aXRoIHRoZSBzcGVjaWZpZWQgYXJyYXkgb2YgdmFsdWVzLlxuICAgKiBAcGFyYW0gYXJyYXkgVGhlIGFycmF5IG9mIHZhbHVlcyB0byBsb2FkLlxuICAgKi9cbiAgbG9hZChhcnJheTogbnVtYmVyW10pIHtcbiAgICB0aGlzLmFycmF5ID0gbmV3IFVpbnQxNkFycmF5KGFycmF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSYW5kb21pemVzIHRoZSB2YWx1ZXMgaW4gdGhlIG1hdHJpeC5cbiAgICovXG4gIHJhbmRvbWl6ZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuYXJyYXlbaV0gPSBNYXRocy5yYW5kKDAsIDMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuXG4vKipcbiAqIEJhc2UgY29uc3RydWN0b3IgdHlwZSBmb3IgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgZW5naW5lLlxuICovXG5leHBvcnQgdHlwZSBPYmplY3RDb25zdHJ1Y3RvcjxUPiA9IHsgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQgfTtcblxuLyoqXG4gKiBCYXNlIG9iamVjdCBvZiBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBlbmdpbmUuXG4gKlxuICogVGhlIHBhcmFtcyBpcyB1c2VkIGFzIHZhbGlkYXRpb24gb2YgdGhlIGFyZ3VtZW50cyBwYXNzZWQgaW4gdGhlIGNvbnN0cnVjdG9yIGZvciBkZWJ1Z2dpbmcuXG4gKiBUaGUgcGFyYW1zIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIGFycmF5IHdpdGggdGhlIG5hbWVzIG9mIGFsbCB0aGUga2V5cyB3aGljaCBzaG91bGQgYmVcbiAqIHByZXNlbnQgYXMgYXJncyBvZiBhIEdhbWVPYmplY3QuXG4gKiBUaGUgY29uZmlnIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IHZhbHVlcyBvZiB0aGUgR2FtZU9iamVjdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY2xhc3MgRWxlbWVudCBleHRlbmRzIEdhbWVPYmplY3Qge1xuICogIHBhcmFtcygpIHtcbiAqICAgcmV0dXJuIFtcInhcIiwgXCJ5XCJdO1xuICogIH1cbiAqICBjb25maWcoKSB7XG4gKiAgICByZXR1cm4ge1xuICogICAgICB4OiAwLFxuICogICAgICB5OiAwLFxuICogICAgICB3aWR0aDogMTAwLFxuICogICAgICBoZWlnaHQ6IDEwMCxcbiAqICAgIH07XG4gKiAgfVxuICogfVxuICogY29uc3QgbyA9IG5ldyBFbGVtZW50KCk7XG4gKiAvLyB0aGlzIHdpbGwgdGhyb3cgYW4gZXJyb3IgYmVjYXVzZSB4IGFuZCB5IGFyZSByZXF1aXJlZFxuICpcbiAqIGNvbnN0IG8gPSBuZXcgRWxlbWVudCh7IHg6IDEwLCB5OiAxMCB9KTtcbiAqIC8vIHRoaXMgd2lsbCBub3QgdGhyb3cgYW4gZXJyb3IgYW5kIHggYW5kIHkgd2lsbCBiZSAxMCBhbmQgd2lkdGggYW5kIGhlaWdodCB3aWxsIGJlIDEwMFxuICpcbiAqL1xuXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIERlYnVnLnZhbGlkYXRlUGFyYW1zKHRoaXMuY29uc3RydWN0b3IubmFtZSwgYXJncywgdGhpcy5wYXJhbXMoKSk7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLmNvbmZpZygpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGVmYXVsdHMsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgd2l0aCB0aGUgbmFtZXMgb2YgdGhlIGtleXMgdGhhdCBzaG91bGQgYmUgcHJlc2VudCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICovXG4gIHBhcmFtcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBPYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCB2YWx1ZXMgb2YgdGhlIEdhbWVPYmplY3RcbiAgICovXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHsgUmVjdENvbGxpZGVyIH0gZnJvbSBcIi4vY29sbGlkZXJzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgeyBNYXRocyB9IGZyb20gXCIuL21hdGhzXCI7XG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCIuL3NvdW5kc1wiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuaW1wb3J0IHsgVGlsZUNvcm5lcnMgfSBmcm9tIFwiLi90aWxlXCI7XG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSBcIi4vdGlsZW1hcFwiO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gXCIuL3RpbWVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQbGF0Zm9ybUNvbnRyb2xsZXJBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSB0aWxlTWFwIGNvbXBvbmVudFxuICAgKi9cbiAgdGlsZU1hcDogVGlsZU1hcDtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIG1hbmFnaW5nIHBsYXRmb3JtZXIgcGh5c2ljcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXRmb3JtQ29udHJvbGxlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSB2ZWxvY2l0eSBvbiB0aGUgWSBheGlzXG4gICAqL1xuICBtYXhWZWxvY2l0eVkgPSAxMDtcblxuICAvKipcbiAgICogVGhlIGdyYXZpdHkgb2YgdGhlIGNvbnRyb2xsZXJcbiAgICovXG4gIGdyYXZpdHkgPSAwLjU7XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIGNvbXBvbmVudFxuICAgKi9cbiAgdGltZSA9IHRoaXMuY29tcG9uZW50cy5nZXQoVGltZSk7XG5cbiAgLyoqXG4gICAqIFRoZSB0aWxlbWFwIGNvbXBvbmVudFxuICAgKi9cbiAgdGlsZU1hcDogVGlsZU1hcDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogUGxhdGZvcm1Db250cm9sbGVyQXJncykge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy50aW1lID0gdGhpcy5jb21wb25lbnRzLmdldChUaW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBwbGF0Zm9ybSBjb250cm9sbGVyXG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXCJ0aWxlTWFwXCJdO1xuICB9XG5cbiAgZ2V0Q29ybmVycyhcbiAgICB4MTogbnVtYmVyLFxuICAgIHkxOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlclxuICApOiBUaWxlQ29ybmVycyB7XG4gICAgcmV0dXJuIHRoaXMudGlsZU1hcC5nZXRDb3JuZXJzKHgxLCB5MSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBjaGVja0ZvcldhbGxzKHNwcml0ZTogUGxheWVyLCBtb3ZlRGlzdGFuY2VYOiBudW1iZXIpOiBudW1iZXIge1xuICAgIG1vdmVEaXN0YW5jZVggPSBNYXRoLmZsb29yKG1vdmVEaXN0YW5jZVgpO1xuICAgIGxldCBjb3JuZXJzID0gdGhpcy5nZXRDb3JuZXJzKFxuICAgICAgc3ByaXRlLnggKyBtb3ZlRGlzdGFuY2VYLFxuICAgICAgc3ByaXRlLnksXG4gICAgICBzcHJpdGUud2lkdGgsXG4gICAgICBzcHJpdGUuaGVpZ2h0XG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBtb3ZlRGlzdGFuY2VYID4gMCAmJlxuICAgICAgKGNvcm5lcnMuZG93blJpZ2h0LnNvbGlkLmxlZnQgfHwgY29ybmVycy51cFJpZ2h0LnNvbGlkLmxlZnQpXG4gICAgKSB7XG4gICAgICBzcHJpdGUudmVsb2NpdHlYID0gMDtcbiAgICAgIHNwcml0ZS5hY2NlbGVyYXRpb25YID0gMDtcbiAgICAgIG1vdmVEaXN0YW5jZVggPSAwO1xuICAgICAgLy9tb3ZlRGlzdGFuY2VYID0gKGNvcm5lcnMuZG93blJpZ2h0LnggKiBjb3JuZXJzLmRvd25MZWZ0LndpZHRoKSAtIHNwcml0ZS54IC0gc3ByaXRlLndpZHRoIC0gMTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgbW92ZURpc3RhbmNlWCA8IDAgJiZcbiAgICAgIChjb3JuZXJzLmRvd25MZWZ0LnNvbGlkLnJpZ2h0IHx8IGNvcm5lcnMudXBMZWZ0LnNvbGlkLnJpZ2h0KVxuICAgICkge1xuICAgICAgLy9tb3ZlRGlzdGFuY2VYID0gc3ByaXRlLnggLSAoKGNvcm5lcnMuZG93bkxlZnQueCArIDEpICogY29ybmVycy5kb3duTGVmdC53aWR0aCkgLSAxO1xuICAgICAgLy9tb3ZlRGlzdGFuY2VYICo9IC0xO1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WCA9IDA7XG4gICAgICBzcHJpdGUuYWNjZWxlcmF0aW9uWCA9IDA7XG4gICAgICBtb3ZlRGlzdGFuY2VYID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1vdmVEaXN0YW5jZVg7XG4gIH1cblxuICBhcHBseUdyYXZpdHkoc3ByaXRlOiBQbGF5ZXIpOiBudW1iZXIge1xuICAgIGxldCBtb3ZlRGlzdGFuY2VZID0gTWF0aC5mbG9vcihzcHJpdGUudmVsb2NpdHlZKTtcbiAgICBpZiAoIXNwcml0ZS5qdW1waW5nKSB7XG4gICAgICBzcHJpdGUudmVsb2NpdHlZICs9IHRoaXMuZ3Jhdml0eSAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwcml0ZS52ZWxvY2l0eVkgKz0gdGhpcy5ncmF2aXR5ICogMS4yICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICB9XG4gICAgbW92ZURpc3RhbmNlWSA9IE1hdGhzLmNsYW1wKFxuICAgICAgbW92ZURpc3RhbmNlWSxcbiAgICAgIC10aGlzLm1heFZlbG9jaXR5WSxcbiAgICAgIHRoaXMubWF4VmVsb2NpdHlZXG4gICAgKTtcbiAgICBsZXQgY29ybmVycyA9IHRoaXMuZ2V0Q29ybmVycyhcbiAgICAgIHNwcml0ZS54LFxuICAgICAgc3ByaXRlLnkgKyBtb3ZlRGlzdGFuY2VZLFxuICAgICAgc3ByaXRlLndpZHRoLFxuICAgICAgc3ByaXRlLmhlaWdodFxuICAgICk7XG4gICAgaWYgKG1vdmVEaXN0YW5jZVkgPiAwKSB7XG4gICAgICBpZiAoY29ybmVycy5kb3duUmlnaHQuc29saWQudG9wIHx8IGNvcm5lcnMuZG93bkxlZnQuc29saWQudG9wKSB7XG4gICAgICAgIG1vdmVEaXN0YW5jZVkgPSAwO1xuICAgICAgICBzcHJpdGUudmVsb2NpdHlZID0gMDtcbiAgICAgICAgc3ByaXRlLmp1bXBpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvcm5lcnMudXBSaWdodC5zb2xpZC5ib3R0b20gfHwgY29ybmVycy51cExlZnQuc29saWQuYm90dG9tKSB7XG4gICAgICAgIG1vdmVEaXN0YW5jZVkgPSAwO1xuICAgICAgICBzcHJpdGUudmVsb2NpdHlZID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vdmVEaXN0YW5jZVk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFNwcml0ZSB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGNvcm5lcnM6IGFueTtcbiAgdmFyczogYW55O1xuICBzbW9vdGhUaW1lOiBudW1iZXI7XG4gIGRpcjogbnVtYmVyO1xuICBzcGVlZDogbnVtYmVyO1xuICBzcGVlZFk6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGp1bXBGb3JjZTogbnVtYmVyO1xuICBqdW1waW5nOiBib29sZWFuO1xuICBzaG9vdGluZzogYm9vbGVhbjtcbiAganVtcEJvb3N0ZXI6IG51bWJlcjtcbiAgYWNjZWxlcmF0aW9uRm9yY2VYOiBudW1iZXI7XG4gIGFjY2VsZXJhdGlvblg6IG51bWJlcjtcbiAgbWF4U3BlZWRNdWx0WDogbnVtYmVyO1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgZnJpY3Rpb25YOiBudW1iZXI7XG4gIGRpclg6IG51bWJlcjtcbiAgY2FtZXJhOiBDYW1lcmE7XG4gIGlucHV0OiBJbnB1dDtcbiAgZGlzcGxheTogRGlzcGxheTtcbiAgdGltZTogVGltZTtcbiAgc291bmQ6IFNvdW5kO1xuICBjb250cm9sbGVyOiBQbGF0Zm9ybUNvbnRyb2xsZXI7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IGFueSkge1xuICAgIHN1cGVyKGVuZ2luZSwgYXJncyk7XG4gICAgdGhpcy5jb2xvciA9IFwiYmx1ZVwiO1xuICAgIHRoaXMuY29ybmVycyA9IHt9O1xuICAgIHRoaXMudmFycyA9IHt9O1xuICAgIHRoaXMuc21vb3RoVGltZSA9IDEuMztcbiAgICB0aGlzLnZhcnMuY3YgPSAwO1xuICAgIHRoaXMuZGlyID0gMTtcbiAgICB0aGlzLnNwZWVkID0gNjtcbiAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eVkgPSAwO1xuICAgIHRoaXMuanVtcEZvcmNlID0gMTI7XG4gICAgdGhpcy5qdW1waW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuanVtcEJvb3N0ZXIgPSAwO1xuXG4gICAgdGhpcy5hY2NlbGVyYXRpb25Gb3JjZVggPSAxLjg7XG4gICAgdGhpcy5hY2NlbGVyYXRpb25YID0gMDtcbiAgICB0aGlzLm1heFNwZWVkTXVsdFggPSA5O1xuICAgIHRoaXMudmVsb2NpdHlYID0gMDtcbiAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICB0aGlzLmRpclggPSAwO1xuICAgIHRoaXMuY29sbGlkZXJzLmFkZChcbiAgICAgIG5ldyBSZWN0Q29sbGlkZXIoe1xuICAgICAgICB4OiAtMTAsXG4gICAgICAgIHk6IC0xMCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggKyAxMCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCArIDEwLFxuICAgICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRDb3JuZXJzKHg6IG51bWJlciwgeTogbnVtYmVyKTogVGlsZUNvcm5lcnMge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuZ2V0Q29ybmVycyh4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBtb3ZlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250cm9sbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbGVmdCByaWdodCBtb3ZlbWVudFxuICAgIGxldCBtb3ZlRGlzdGFuY2VYID0gMDtcbiAgICBsZXQgaW5wdXRYID0gdGhpcy5pbnB1dC5nZXRBeGlzSG9yaXpvbnRhbCgpO1xuXG4gICAgLy8gYWNjZWxlcmF0aW9uIG1vdmVtZW50XG5cbiAgICBpZiAoIXRoaXMuanVtcGluZykge1xuICAgICAgdGhpcy5hY2NlbGVyYXRpb25YID0gaW5wdXRYICogdGhpcy5hY2NlbGVyYXRpb25Gb3JjZVg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjZWxlcmF0aW9uWCA9IChpbnB1dFggKiB0aGlzLmFjY2VsZXJhdGlvbkZvcmNlWCkgLyA2O1xuICAgIH1cbiAgICB0aGlzLnZlbG9jaXR5WCArPSB0aGlzLmFjY2VsZXJhdGlvblggKiB0aGlzLnRpbWUuZGVsdGFUaW1lO1xuICAgIC8vIGZyaWN0aW9uXG4gICAgbGV0IGN1cnJlbnREaXIgPSBNYXRoLnNpZ24odGhpcy52ZWxvY2l0eVgpO1xuICAgIGlmICghdGhpcy5qdW1waW5nKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WCArPSAtY3VycmVudERpciAqIHRoaXMuZnJpY3Rpb25YICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52ZWxvY2l0eVggKz1cbiAgICAgICAgKCgtY3VycmVudERpciAqIHRoaXMuZnJpY3Rpb25YKSAvIDEwKSAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG4gICAgfVxuICAgIGlmIChNYXRoLnNpZ24odGhpcy52ZWxvY2l0eVgpICE9PSBjdXJyZW50RGlyKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5WCA9IDA7XG4gICAgfVxuICAgIC8vIGxpbWl0IHNwZWVkXG4gICAgbGV0IG1heFNwZWVkWCA9IHRoaXMubWF4U3BlZWRNdWx0WDtcbiAgICBpZiAoXG4gICAgICB0aGlzLmlucHV0LmtleUNvZGUoXCJLZXlaXCIpICYmXG4gICAgICBpbnB1dFggJiZcbiAgICAgICh0aGlzLmNvcm5lcnMuZG93bkxlZnQuc29saWQudG9wIHx8IHRoaXMuY29ybmVycy5kb3duUmlnaHQuc29saWQudG9wKVxuICAgICkge1xuICAgICAgbWF4U3BlZWRYICo9IDI7XG4gICAgfVxuICAgIHRoaXMudmVsb2NpdHlYID0gTWF0aHMuY2xhbXAodGhpcy52ZWxvY2l0eVgsIC1tYXhTcGVlZFgsIG1heFNwZWVkWCk7XG4gICAgbW92ZURpc3RhbmNlWCArPSB0aGlzLnZlbG9jaXR5WCAqIHRoaXMudGltZS5kZWx0YVRpbWU7XG5cbiAgICAvL21vdmVEaXN0YW5jZVggPSBpbnB1dFggKiA4ICogdGhpcy50aW1lLmRlbHRhVGltZTtcbiAgICBtb3ZlRGlzdGFuY2VYID0gdGhpcy5jb250cm9sbGVyLmNoZWNrRm9yV2FsbHModGhpcywgbW92ZURpc3RhbmNlWCk7XG4gICAgdGhpcy54ICs9IG1vdmVEaXN0YW5jZVg7XG4gICAgdGhpcy5jYW1lcmEueCArPSBtb3ZlRGlzdGFuY2VYO1xuICAgIC8vIGdyYXZpdHlcbiAgICBsZXQgbW92ZURpc3RhbmNlWSA9IHRoaXMuY29udHJvbGxlci5hcHBseUdyYXZpdHkodGhpcyk7XG4gICAgdGhpcy55ICs9IG1vdmVEaXN0YW5jZVk7XG4gICAgdGhpcy5jYW1lcmEueSArPSBtb3ZlRGlzdGFuY2VZO1xuICAgIC8vIGp1bXAgcHJlc3NlZCBhbmQgbm90IGp1bXBpbmdcbiAgICBpZiAodGhpcy5pbnB1dC5rZXlDb2RlKFwiQXJyb3dVcFwiKSAmJiAhdGhpcy5qdW1waW5nKSB7XG4gICAgICB0aGlzLmp1bXBpbmcgPSB0cnVlO1xuICAgICAgdGhpcy52ZWxvY2l0eVkgPSAtdGhpcy5qdW1wRm9yY2UgLyAyO1xuICAgICAgdGhpcy5qdW1wQm9vc3RlciA9IDA7XG4gICAgfVxuICAgIC8vIGp1bXAgYmVpbmcgaGVsZCB3aGlsZSBqdW1waW5nXG4gICAgaWYgKFxuICAgICAgdGhpcy5pbnB1dC5rZXlDb2RlKFwiQXJyb3dVcFwiKSAmJlxuICAgICAgdGhpcy5qdW1waW5nICYmXG4gICAgICB0aGlzLmp1bXBCb29zdGVyIDwgMTBcbiAgICApIHtcbiAgICAgIHRoaXMudmVsb2NpdHlZIC09IHRoaXMuanVtcEZvcmNlIC8gMTI7XG4gICAgICB0aGlzLmp1bXBCb29zdGVyICs9IDE7XG4gICAgfVxuICAgIC8vIGp1bXAgcmVsZWFzZWQgYW5kIGp1bXBpbmdcbiAgICBpZiAoIXRoaXMuaW5wdXQua2V5Q29kZShcIkFycm93VXBcIikgJiYgdGhpcy5qdW1waW5nKSB7XG4gICAgICB0aGlzLmp1bXBCb29zdGVyID0gMDtcbiAgICAgIGlmICh0aGlzLnZlbG9jaXR5WSA8IC10aGlzLmp1bXBGb3JjZSAvIDIpIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eVkgPSAtdGhpcy5qdW1wRm9yY2UgLyAyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5jb2xvcik7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KElucHV0KTtcbiAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KERpc3BsYXkpO1xuICAgIHRoaXMudGltZSA9IHRoaXMuY29tcG9uZW50cy5nZXQoVGltZSk7XG4gICAgdGhpcy5zb3VuZCA9IHRoaXMuY29tcG9uZW50cy5nZXQoU291bmQpO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jb21wb25lbnRzLmdldChDYW1lcmEpO1xuXG4gICAgdGhpcy5jYW1lcmEueCA9IE1hdGguZmxvb3IodGhpcy54IC0gdGhpcy5jYW1lcmEud2lkdGggLyAyKTtcbiAgICB0aGlzLmNhbWVyYS55ID0gTWF0aC5mbG9vcih0aGlzLnkgLSB0aGlzLmNhbWVyYS5oZWlnaHQgLyAyKTtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KFBsYXRmb3JtQ29udHJvbGxlcik7XG4gIH1cblxuICBjb2xsaXNpb24oc3ByaXRlOiBTcHJpdGUpOiB2b2lkIHt9XG59XG4iLCJpbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBPYmplY3RDb25zdHJ1Y3RvciB9IGZyb20gXCIuL29iamVjdHNcIjtcblxuLyoqXG4gKiBSZWdpc3RyeSBzdG9yZXMgc2luZ2xlIGluc3RhbmNlcyBvZiBvYmplY3QgaW5kZXhlZCBieSB0aGVpciBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lzdHJ5IHtcbiAgaXRlbXMgPSBuZXcgTWFwPE9iamVjdENvbnN0cnVjdG9yPGFueT4sIGFueT4oKTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIENvbnN0cnVjdG9yXG4gICAqIEByZXR1cm5zIFRoZSBpbnN0YW5jZSBvZiB0aGUgb2JqZWN0IGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAgICovXG4gIGdldDxUPihDb25zdHJ1Y3RvcjogT2JqZWN0Q29uc3RydWN0b3I8VD4pOiBUIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLml0ZW1zLmdldChDb25zdHJ1Y3Rvcik7XG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgIERlYnVnLmVycm9yKGBDb21wb25lbnQgJHtDb25zdHJ1Y3Rvci5uYW1lfSBpcyBub3QgcmVnaXN0ZXJlZGApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBDb25zdHJ1Y3RvciBUaGUgY29uc3RydWN0b3Igb2YgdGhlIG9iamVjdCB0byBzdG9yZS5cbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBpbnN0YW5jZSBvZiB0aGUgb2JqZWN0IHRvIHN0b3JlLlxuICAgKi9cbiAgc2V0PFQ+KENvbnN0cnVjdG9yOiBPYmplY3RDb25zdHJ1Y3RvcjxUPiwgaW5zdGFuY2U6IFQpIHtcbiAgICBpZiAoRGVidWcuYWN0aXZlKCkpIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmhhcyhDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgRGVidWcuZXJyb3IoYENvbXBvbmVudCAke0NvbnN0cnVjdG9yfSBpcyBhbHJlYWR5IGRlZmluZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pdGVtcy5zZXQoQ29uc3RydWN0b3IsIGluc3RhbmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBBbiBpdGVyYXRvciBvZiBhbGwgdGhlIGluc3RhbmNlcyBzdG9yZWQgaW4gdGhlIHJlZ2lzdHJ5LlxuICAgKi9cbiAgdmFsdWVzPFQ+KCk6IEl0ZXJhYmxlSXRlcmF0b3I8VD4ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLnZhbHVlcygpIGFzIEl0ZXJhYmxlSXRlcmF0b3I8VD47XG4gIH1cbn1cbiIsIi8qKlxuICogQSBSZXNvdXJjZSBJdGVtIGlzIGEgbWVkaWEgb2JqZWN0IGxpa2UgaW1hZ2UsIGF1ZGlvLiBJdCBpcyB1c2VkIGJ5IHRoZSBSZXNvdXJjZXMgY2xhc3NcbiAqIGR1cmluZyB0aGUgcHJlbG9hZCBwaGFzZSBvZiB0aGUgZW5naW5lIGxvYWRpbmcuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuXG5leHBvcnQgdHlwZSBSZXNvdXJjZVR5cGUgPSBcImltYWdlXCIgfCBcImF1ZGlvXCI7XG5cbi8qKlxuICogQXJndW1lbnRzIGZvciAgUmVzb3VyY2VJdGVtIGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb3VyY2VJdGVtQXJncyB7XG4gIC8qKlxuICAgKiB1cmwgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICB1cmw6IHN0cmluZztcblxuICAvKipcbiAgICogdHlwZSBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHR5cGU6IFJlc291cmNlVHlwZTtcblxuICAvKipcbiAgICogbmFtZSBvZiB0aGUgcmVzb3VyY2UgdG8gdXNlIGluIHRoZSByZXNvdXJjZXMgZGljdGlvbmFyeVxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VJdGVtIHtcbiAgLyoqXG4gICAqIHVybCBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIHVybDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiB0eXBlIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgdHlwZTogUmVzb3VyY2VUeXBlO1xuXG4gIC8qKlxuICAgKiBuYW1lIG9mIHRoZSByZXNvdXJjZSB0byB1c2UgaW4gdGhlIHJlc291cmNlcyBkaWN0aW9uYXJ5XG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGJ1ZmZlciBvZiB0aGUgcmVzb3VyY2VcbiAgICovXG4gIGJ1ZmZlcjogYW55O1xuXG4gIC8qKlxuICAgKiBpdGVtIG9mIHRoZSByZXNvdXJjZVxuICAgKi9cbiAgaXRlbTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogUmVzb3VyY2VJdGVtQXJncykge1xuICAgIERlYnVnLnZhbGlkYXRlUGFyYW1zKFwiUmVzb3VyY2VzLmFkZFwiLCBwYXJhbXMsIFtcInVybFwiLCBcInR5cGVcIiwgXCJuYW1lXCJdKTtcbiAgICB0aGlzLnVybCA9IHBhcmFtcy51cmw7XG4gICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGU7XG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgdGhpcy5idWZmZXIgPSB7fTtcbiAgICB0aGlzLml0ZW0gPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSByZXNvdXJjZVxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRvIGxvYWQgdGhlIHJlc291cmNlXG4gICAqL1xuICBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudXJsKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgRGVidWcuZXJyb3IoYEVycm9yIGxvYWRpbmcgJHt0aGlzLm5hbWV9YCk7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gYmxvYjtcbiAgICAgIHRoaXMuaXRlbSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pdGVtLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuaXRlbS5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIERlYnVnLmluZm8oYFN1Y2Nlc3MgbG9hZGluZyAke3RoaXMubmFtZX1gKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXNvdXJjZXMgY29tcG9uZW50IGlzIHNldCBvZiB0aGUgaW1hZ2VzIGFuZCBhdWRpbyByZXNvdXJjZXMgb2YgdGhlIGdhbWUuXG4gKiBJdCBoYW5kbGVzIGFkZGluZyBhbmQgZ2V0dGluZyB0aGUgcmVzb3VyY2VzIGJ5IGEgbmFtZSBhbmQgYWxzbyB0aGUgcHJlbG9hZCBwaGFzZSBvZiB0aGUgZW5naW5lIGxvYWRpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBpdGVtczogUmVjb3JkPHN0cmluZywgUmVzb3VyY2VJdGVtPiA9IHt9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGRpY3Rpb25hcnlcbiAgICogQHBhcmFtIHBhcmFtcyBBcmd1bWVudHMgZm9yIHRoZSBSZXNvdXJjZUl0ZW0gY29uc3RydWN0b3JcbiAgICovXG4gIGFkZChwYXJhbXM6IFJlc291cmNlSXRlbUFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuaXRlbXNbcGFyYW1zLm5hbWVdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBEZWJ1Zy53YXJuKGBSZXNvdXJjZSAke3BhcmFtcy5uYW1lfSBpcyBhbHJlYWR5IGRlZmluZWRgKTtcbiAgICB9XG4gICAgdGhpcy5pdGVtc1twYXJhbXMubmFtZV0gPSBuZXcgUmVzb3VyY2VJdGVtKHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcmVzb3VyY2UgYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZSBvZiB0aGUgcmVzb3VyY2VcbiAgICogQHJldHVybnMgdGhlIHJlc291cmNlXG4gICAqL1xuICBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pdGVtc1tuYW1lXS5pdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHJlc291cmNlIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgb2YgdGhlIHJlc291cmNlXG4gICAqL1xuICByZW1vdmUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuaXRlbXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogUHJlbG9hZCBhbGwgcmVzb3VyY2VzXG4gICAqL1xuICBhc3luYyBwcmVsb2FkKCkge1xuICAgIERlYnVnLmdyb3VwU3RhcnQoXCJQcmVsb2FkaW5nIFJlc291cmNlc1wiKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoT2JqZWN0LnZhbHVlcyh0aGlzLml0ZW1zKS5tYXAoKGl0ZW0pID0+IGl0ZW0ubG9hZCgpKSk7XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBEZWJ1Zy5lcnJvcihlPy5tZXNzYWdlKTtcbiAgICB9XG4gICAgRGVidWcuZ3JvdXBFbmQoKTtcbiAgfVxufVxuIiwiLyogZXhwb3J0ZWQgU2NlbmUgKi9cblxuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xuXG4vKipcbiAqIFNjZW5lIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2NlbmVBcmdzIHtcbiAgLyoqXG4gICAqIElmIHRoZSBzY2VuZSBpcyBhY3RpdmUsIHRoZSBzcHJpdGVzIG9mIHRoZSBzY2VuZSB3aWxsIG1vdmUgYW5kIGNvbGxpZGUuXG4gICAqL1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIElmIHRoZSBzY2VuZSBpcyB2aXNpYmxlLCB0aGUgc3ByaXRlcyBvZiB0aGUgc2NlbmUgd2lsbCBiZSBkcmF3biBvbiB0aGUgc3RhZ2UuXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2NlbmUgaXMgYSBjb2xsZWN0aW9uIG9mIHNwcml0ZXMgb2YgYSBnYW1lLlxuICogT25seSB0aGUgc3ByaXRlcyBpbiB0aGUgc2FtZSBzY2VuZSBjYW4gY29sbGlkZSB3aXRoIGVhY2ggb3RoZXIuXG4gKiBUaGUgZW5naW5lIGNhbiBoYXZlIGEgc2luZ2xlIHNjZW5lIG9yIG11bHRpcGxlLiBEZXBlbmRpbmcgb24gdGhlIGFjdGl2ZSBzY2VuZSBvZlxuICogdGhlIGVuZ2luZSwgdGhhdCBzY2VuZSBzcHJpdGVzIHdvdWxkIGJlIGRyYXcsIG1vdmVkIGFuZCBjb2xsaWRlZCBvbiB0aGUgc3RhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2VuZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIHNwcml0ZXMgb2YgdGhlIHNjZW5lLlxuICAgKi9cbiAgc3ByaXRlcyA9IG5ldyBDb2xsZWN0aW9uPFNwcml0ZT4oKTtcblxuICAvKipcbiAgICogSWYgdGhlIHNjZW5lIGlzIGFjdGl2ZSwgdGhlIHNwcml0ZXMgb2YgdGhlIHNjZW5lIHdpbGwgbW92ZSBhbmQgY29sbGlkZS5cbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc2NlbmUgaXMgdmlzaWJsZSwgdGhlIHNwcml0ZXMgb2YgdGhlIHNjZW5lIHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlLlxuICAgKi9cbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBTY2VuZUFyZ3MpIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIGRlZmF1bHQgc2NlbmUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGNvbmZpZygpOiBTY2VuZUFyZ3Mge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb24oKTtcbiAgICBmb3IgKGxldCBzcHJpdGUgb2YgdGhpcy5zcHJpdGVzLmFsbCgpKSB7XG4gICAgICBpZiAoc3ByaXRlLmlzQWN0aXZlKSB7XG4gICAgICAgIHNwcml0ZS5tb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAobGV0IHNwcml0ZSBvZiB0aGlzLnNwcml0ZXMuYWxsKCkpIHtcbiAgICAgIGlmIChzcHJpdGUuaXNWaXNpYmxlKSB7XG4gICAgICAgIHNwcml0ZS5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBBZGQgYSBzcHJpdGUgdG8gdGhlIHNjZW5lLlxuICAgKiBAcGFyYW0gc3ByaXRlIHRvIGJlIGFkZGVkLlxuICAgKi9cbiAgYWRkU3ByaXRlKHNwcml0ZTogU3ByaXRlKTogdm9pZCB7XG4gICAgc3ByaXRlLmVuZ2luZSA9IHRoaXMuZW5naW5lO1xuICAgIHNwcml0ZS5wYXJlbnQgPSB0aGlzO1xuICAgIHNwcml0ZS5pbml0KCk7XG4gICAgdGhpcy5zcHJpdGVzLmFkZChzcHJpdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBzcHJpdGUgZnJvbSB0aGUgc2NlbmUuXG4gICAqIEBwYXJhbSBzcHJpdGUgdG8gYmUgcmVtb3ZlZC5cbiAgICovXG4gIHJlbW92ZVNwcml0ZShzcHJpdGU6IFNwcml0ZSkge1xuICAgIHRoaXMuc3ByaXRlcy5yZW1vdmUoc3ByaXRlKTtcbiAgfVxuXG4gIC8vIFRPRE86IGFkZCBxdWFkLXRyZWUgZm9yIGNvbGxpc2lvbiBkZXRlY3Rpb25cbiAgY29sbGlzaW9uKCkge1xuICAgIGNvbnN0IHNwcml0ZXMgPSB0aGlzLnNwcml0ZXMuYWxsKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcHJpdGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBzcHJpdGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGxldCBzcHJpdGUxID0gc3ByaXRlc1tpXTtcbiAgICAgICAgbGV0IHNwcml0ZTIgPSBzcHJpdGVzW2pdO1xuICAgICAgICBpZiAoc3ByaXRlMS50ZXN0Q29sbGlzaW9uKHNwcml0ZTIpKSB7XG4gICAgICAgICAgc3ByaXRlMS5jb2xsaXNpb24oc3ByaXRlMik7XG4gICAgICAgICAgc3ByaXRlMi5jb2xsaXNpb24oc3ByaXRlMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKiBleHBvcnRlZCBTb3VuZCAqL1xuZXhwb3J0IGNsYXNzIFNvdW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IHt9KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIG1vdmUoKTogdm9pZCB7fVxuXG4gIGRyYXcoKTogdm9pZCB7fVxuXG4gIHBsYXkoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHBhdXNlKCkge31cbn1cbiIsImltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RzXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3JlY3RcIjtcblxuLyoqXG4gKiBUaGUgYXJndW1lbnRzIHRvIGNyZWF0ZSBhIFNwcml0ZVNoZWV0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNwcml0ZVNoZWV0QXJncyB7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgZnJhbWUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGltYWdlIGNvbnRhaW5pbmcgdGhlIHNwcml0ZXMvdGlsZXMuXG4gICAqL1xuICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcblxuICAvKipcbiAgICogVGhlIHggb2Zmc2V0IG9mIHRoZSBmaXJzdCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBvZmZzZXRYPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgeSBvZmZzZXQgb2YgdGhlIGZpcnN0IHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIG9mZnNldFk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiBlYWNoIHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIGdhcD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIHNwcml0ZSBzaGVldCBjb25zaXN0cyBvZiBkaWZmZXJlbnQgc3ByaXRlcy90aWxlcyBkcmF3biBpbiB0aGUgc2FtZSBpbWFnZS5cbiAqIFdoZW4gY3JlYXRlZCwgdGhlIFNwcml0ZVNoZWV0IHdpbGwgY3JlYXRlIHRoZSBjb29yZGluYXRlcyBvZiBlYWNoIHNwcml0ZS90aWxlIG9uXG4gKiB0aGUgaW1hZ2UgZGVwZW5kaW5nIG9uIHRoZSB3aWR0aC9oZWlnaHQgb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIHNoZWV0LlxuICovXG5leHBvcnQgY2xhc3MgU3ByaXRlU2hlZXQgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGNvb3JkaW5hdGVzIG9mIGVhY2ggc3ByaXRlL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgdGlsZXM6IFBvaW50W107XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGZyYW1lL3RpbGUgb24gdGhlIGltYWdlLlxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgaW1hZ2UgY29udGFpbmluZyB0aGUgc3ByaXRlcy90aWxlcy5cbiAgICovXG4gIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAvKipcbiAgICogVGhlIHggb2Zmc2V0IG9mIHRoZSBmaXJzdCBzcHJpdGUvdGlsZSBvbiB0aGUgaW1hZ2UuXG4gICAqL1xuICBvZmZzZXRYOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgeSBvZmZzZXQgb2YgdGhlIGZpcnN0IHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIG9mZnNldFk6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiBlYWNoIHNwcml0ZS90aWxlIG9uIHRoZSBpbWFnZS5cbiAgICovXG4gIGdhcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IFNwcml0ZVNoZWV0QXJncykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICBsZXQgaUNvdW50ID0gMTtcbiAgICBsZXQgakNvdW50ID0gMTtcbiAgICBpZiAodGhpcy5nYXApIHtcbiAgICAgIHdoaWxlIChcbiAgICAgICAgdGhpcy5pbWFnZS53aWR0aCAtIHRoaXMub2Zmc2V0WCAtIGlDb3VudCsrICogKHRoaXMud2lkdGggKyB0aGlzLmdhcCkgPj1cbiAgICAgICAgdGhpcy53aWR0aFxuICAgICAgKTtcbiAgICAgIHdoaWxlIChcbiAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQgLVxuICAgICAgICAgIHRoaXMub2Zmc2V0WSAtXG4gICAgICAgICAgakNvdW50KysgKiAodGhpcy5oZWlnaHQgKyB0aGlzLmdhcCkgPj1cbiAgICAgICAgdGhpcy53aWR0aFxuICAgICAgKTtcbiAgICAgIGlDb3VudC0tO1xuICAgICAgakNvdW50LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlDb3VudCA9IE1hdGguZmxvb3IoKHRoaXMuaW1hZ2Uud2lkdGggLSB0aGlzLm9mZnNldFgpIC8gdGhpcy53aWR0aCk7XG4gICAgICBqQ291bnQgPSBNYXRoLmZsb29yKCh0aGlzLmltYWdlLmhlaWdodCAtIHRoaXMub2Zmc2V0WSkgLyB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBqQ291bnQ7ICsraikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpQ291bnQ7ICsraSkge1xuICAgICAgICBsZXQgeCA9IHRoaXMub2Zmc2V0WCArIGkgKiB0aGlzLmdhcCArIGkgKiB0aGlzLndpZHRoO1xuICAgICAgICBsZXQgeSA9IHRoaXMub2Zmc2V0WSArIGogKiB0aGlzLmdhcCArIGogKiB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy50aWxlcy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgTGlzdCBvZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciB0aGUgc3ByaXRlIHNoZWV0XG4gICAqL1xuICBwYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcImltYWdlXCJdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgZGVmYXVsdCBvcHRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc3ByaXRlIHNoZWV0XG4gICAqL1xuICBjb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9mZnNldFg6IDAsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgICAgZ2FwOiAwLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qIGV4cG9ydGVkIFNwcml0ZSAqL1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSBcIi4vY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgQ29sbGlkZXIgfSBmcm9tIFwiLi9jb2xsaWRlcnNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTcHJpdGVBcmdzIHtcbiAgLyoqXG4gICAqIFggcG9zaXRpb24gb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgeDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBZIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3ByaXRlIGlzIHZpc2libGUsIGl0IHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzcHJpdGUgaXMgYWN0aXZlLCBpdCB3aWxsIG1vdmVcbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEJhc2UgU3ByaXRlIGNvbXBvbmVudC4gRXZlcnkgU3ByaXRlIG9mIHRoZSBlbmdpbmUgc2hvdWxkIGRlcml2ZSBmcm9tIHRoaXMgY2xhc3MuXG4gKiBFYWNoIGxvb3Agb2YgdGhlIGdhbWUgdGhlIHNwcml0cyB3aWxsIG1vdmUsIGRyYXcgYW5kIHRlc3QgY29sbGlzaW9uLlxuICovXG5leHBvcnQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFggcG9zaXRpb24gb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgeDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBZIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIHNwcml0ZVxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3ByaXRlIGlzIHZpc2libGUsIGl0IHdpbGwgYmUgZHJhd24gb24gdGhlIHN0YWdlXG4gICAqL1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzcHJpdGUgaXMgYWN0aXZlLCBpdCB3aWxsIG1vdmVcbiAgICovXG4gIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGUgc3ByaXRlXG4gICAqL1xuICBjb2xsaWRlcnMgPSBuZXcgQ29sbGVjdGlvbjxDb2xsaWRlcj4oKTtcblxuICAvKipcbiAgICogUGFyZW50IG9mIHRoZSBzcHJpdGVcbiAgICovXG4gIHBhcmVudDogQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVuZ2luZTogRW5naW5lLCBhcmdzOiBTcHJpdGVBcmdzKSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBMaXN0IG9mIHJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIHRoZSBzcHJpdGVcbiAgICovXG4gIHBhcmFtcygpIHtcbiAgICByZXR1cm4gW1wieFwiLCBcInlcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXTtcbiAgfVxuXG4gIGNvbmZpZygpOiBQYXJ0aWFsPFNwcml0ZUFyZ3M+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhIGJveCBhcm91bmQgdGhlIHNwcml0ZVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbG9yIENvbG9yIG9mIHRoZSByZWN0YW5nbGUsIGRlZmF1bHQgcmVkXG4gICAqL1xuICBkZWJ1Z0RyYXcoY29sb3IgPSBcInJlZFwiKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgIGRpc3BsYXkucmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGNvbG9yKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRlc3RzIGZvciBjb2xsaXNpb24gYmV0d2VlbiBlYWNoIGNvbGxpZGVyIG9mIHRoZSBzcHJpdGUgYWdhaW5zdCBhIHNwcml0ZVxuICAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIFNwcml0ZSB0byB0ZXN0IHRoZSBjb2xsaXNpb24gd2l0aFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGNvbGxpc2lvbiBkZXRlY3RlZFxuICAgKi9cbiAgdGVzdENvbGxpc2lvbihzcHJpdGU6IFNwcml0ZSkge1xuICAgIGlmICghdGhpcy5jb2xsaWRlcnMuYWxsKCkubGVuZ3RoIHx8ICFzcHJpdGUuY29sbGlkZXJzLmFsbCgpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBjb2xsaWRlcjEgb2YgdGhpcy5jb2xsaWRlcnMuYWxsKCkpXG4gICAgICBmb3IgKGxldCBjb2xsaWRlcjIgb2Ygc3ByaXRlLmNvbGxpZGVycy5hbGwoKSlcbiAgICAgICAgaWYgKGNvbGxpZGVyMS50ZXN0KGNvbGxpZGVyMikpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gdGhlIHNwcml0ZSBpcyBhZGRlZCB0byBhIHNjZW5lIGFmdGVyIGNyZWF0aW9uXG4gICAqL1xuICBpbml0KCkge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIGVhY2ggZ2FtZSBsb29wXG4gICAqL1xuICBtb3ZlKCkge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIGVhY2ggbG9vcCBvZiB0aGUgZ2FtZVxuICAgKi9cbiAgZHJhdygpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHRoZSBzcHJpdGUgY29sbGlkZWQgd2l0aCBhbm90aGVyIHNwcml0ZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSBUaGUgb3RoZXIgc3ByaXRlIHdpdGggd2hvbSB0aGUgY29sbGlzaW9uIG9jdXJyZWRcbiAgICovXG4gIGNvbGxpc2lvbihzcHJpdGU6IFNwcml0ZSkge31cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIHdoZW4gdGhlIHNwcml0ZSBpcyByZW1vdmVkIGZyb20gdGhlIGVuZ2luZSBzY2VuZVxuICAgKi9cbiAgZGVzdHJveSgpIHt9XG59XG4iLCJpbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vb2JqZWN0c1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVDb3JuZXJzIHtcbiAgdXBMZWZ0OiBUaWxlO1xuICB1cFJpZ2h0OiBUaWxlO1xuICBkb3duTGVmdDogVGlsZTtcbiAgZG93blJpZ2h0OiBUaWxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVFZGdlcyB7XG4gIHRvcDogVGlsZTtcbiAgYm90dG9tOiBUaWxlO1xuICBsZWZ0OiBUaWxlO1xuICByaWdodDogVGlsZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaWxlQXJncyB7XG4gIC8qKlxuICAgKiBUaGUgYW5nbGUgb2YgdGhlIHRpbGUuXG4gICAqL1xuICBhbmdsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2hlZXQgaW5kZXggb2YgdGhlIHRpbGUuXG4gICAqL1xuICBzaGVldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc29saWQgcHJvcGVydHkgb2YgdGhlIHRpbGUgd2FsbHMuXG4gICAqL1xuICBzb2xpZDogVGlsZUVkZ2VzO1xufVxuXG5leHBvcnQgY2xhc3MgVGlsZSBleHRlbmRzIEdhbWVPYmplY3Qge1xuICAvKipcbiAgICogVGhlIGFuZ2xlIG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgYW5nbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNoZWV0IGluZGV4IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgc2hlZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNvbGlkIHByb3BlcnR5IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgc29saWQ6IFRpbGVFZGdlcztcblxuICAvKipcbiAgICogVGhlIHggcG9zaXRpb24gb2YgdGhlIHRpbGUuXG4gICAqL1xuICB4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHRpbGUuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSB0aWxlLlxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXJnczogVGlsZUFyZ3MpIHtcbiAgICBzdXBlcihhcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyBUaGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIG9mIGEgdGlsZS5cbiAgICovXG4gIGNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc29saWQ6IHtcbiAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhbmdsZTogMCxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB7IERlYnVnIH0gZnJvbSBcIi4vZGVidWdcIjtcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmVcIjtcbmltcG9ydCB7IE1hdGhzIH0gZnJvbSBcIi4vbWF0aHNcIjtcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCIuL21hdHJpeFwiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRzXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5pbXBvcnQgeyBUaWxlLCBUaWxlQ29ybmVycywgVGlsZUVkZ2VzIH0gZnJvbSBcIi4vdGlsZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpbGVNYXBBcmdzIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICB0d2lkdGg6IG51bWJlcjtcbiAgdGhlaWdodDogbnVtYmVyO1xuICBzaGVldDogc3RyaW5nO1xuICB0aWxlczogc3RyaW5nW107XG59XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1hbmFnaW5nIHRpbGVNYXBzLlxuICovXG5leHBvcnQgY2xhc3MgVGlsZU1hcCBleHRlbmRzIFNwcml0ZSB7XG4gIG1hdHJpeDogTWF0cml4O1xuICBtd2lkdGg6IG51bWJlcjtcbiAgbWhlaWdodDogbnVtYmVyO1xuICB0d2lkdGg6IG51bWJlcjtcbiAgdGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgY2FtZXJhOiBDYW1lcmE7XG4gIGRpc3BsYXk6IERpc3BsYXk7XG4gIHRpbGVzOiBUaWxlW107XG4gIHNoZWV0OiBTcHJpdGVTaGVldDtcblxuICBjb25zdHJ1Y3RvcihlbmdpbmU6IEVuZ2luZSwgYXJnczogYW55KSB7XG4gICAgc3VwZXIoZW5naW5lLCBhcmdzKTtcbiAgICB0aGlzLm1hdHJpeCA9IG5ldyBNYXRyaXgodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMubXdpZHRoID0gdGhpcy53aWR0aCAqIHRoaXMudHdpZHRoO1xuICAgIHRoaXMubWhlaWdodCA9IHRoaXMuaGVpZ2h0ICogdGhpcy50aGVpZ2h0O1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jb21wb25lbnRzLmdldChDYW1lcmEpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuY29tcG9uZW50cy5nZXQoRGlzcGxheSk7XG4gIH1cblxuICBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcInhcIiwgXCJ5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIiwgXCJ0d2lkdGhcIiwgXCJ0aGVpZ2h0XCIsIFwic2hlZXRcIiwgXCJ0aWxlc1wiXTtcbiAgfVxuXG4gIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4LmdldCh4LCB5KTtcbiAgfVxuXG4gIHNldCh4OiBudW1iZXIsIHk6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LnNldCh4LCB5LCB2YWx1ZSk7XG4gIH1cblxuICBsb2FkKGFycmF5OiBudW1iZXJbXSk6IHZvaWQge1xuICAgIGlmIChhcnJheS5sZW5ndGggIT09IHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCkge1xuICAgICAgRGVidWcud2FybihcbiAgICAgICAgYFRpbGVtYXAgc2l6ZSBtaXNtYXRjaCB3aXRoIHdpZHRoOiAke3RoaXMud2lkdGh9IGFuZCBoZWlnaHQgJHt0aGlzLmhlaWdodH1gXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLm1hdHJpeC5sb2FkKGFycmF5KTtcbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF0cml4LmFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgY2hhciA9IHRoaXMubWF0cml4LmFycmF5W2ldLnRvU3RyaW5nKCk7XG4gICAgICBjaGFyID0gY2hhci5sZW5ndGggPiAxID8gY2hhciA6IFwiICBcIiArIGNoYXI7XG4gICAgICBjaGFyID0gY2hhci5sZW5ndGggPiAyID8gY2hhciA6IFwiIFwiICsgY2hhcjtcbiAgICAgIHJlc3VsdCArPSBjaGFyICsgXCIsXCI7XG4gICAgICBpZiAoKytjb3VudCA+PSB0aGlzLndpZHRoKSB7XG4gICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgcmVzdWx0ICs9IFwiXFxyXFxuXCI7XG4gICAgICB9XG4gICAgfVxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHJlc3VsdDtcbiAgfVxuXG4gIGdldFRpbGVYKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKHggLyB0aGlzLnR3aWR0aCkgJSB0aGlzLm13aWR0aCk7XG4gIH1cblxuICBnZXRUaWxlWSh5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCh5IC8gdGhpcy50aGVpZ2h0KSAlIHRoaXMubWhlaWdodCk7XG4gIH1cblxuICBnZXRUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogVGlsZSB7XG4gICAgeCA9IHRoaXMuZ2V0VGlsZVgoeCk7XG4gICAgeSA9IHRoaXMuZ2V0VGlsZVkoeSk7XG4gICAgbGV0IHRpbGUgPSB0aGlzLnRpbGVzW3RoaXMuZ2V0KHgsIHkpXSB8fCB0aGlzLnRpbGVzWzBdO1xuICAgIHRpbGUueCA9IHg7XG4gICAgdGlsZS55ID0geTtcbiAgICB0aWxlLndpZHRoID0gdGhpcy50d2lkdGg7XG4gICAgdGlsZS5oZWlnaHQgPSB0aGlzLnRoZWlnaHQ7XG4gICAgcmV0dXJuIHRpbGU7XG4gIH1cblxuICBnZXRDb3JuZXJzKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFRpbGVDb3JuZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBMZWZ0OiB0aGlzLmdldFRpbGUoeCwgeSksXG4gICAgICB1cFJpZ2h0OiB0aGlzLmdldFRpbGUoeCArIHdpZHRoLCB5KSxcbiAgICAgIGRvd25MZWZ0OiB0aGlzLmdldFRpbGUoeCwgeSArIGhlaWdodCksXG4gICAgICBkb3duUmlnaHQ6IHRoaXMuZ2V0VGlsZSh4ICsgd2lkdGgsIHkgKyBoZWlnaHQpLFxuICAgIH07XG4gIH1cblxuICBnZXREcmF3UmVjdCgpIHtcbiAgICBsZXQgeDEgPSB0aGlzLmdldFRpbGVYKHRoaXMuY2FtZXJhLngpO1xuICAgIGxldCB5MSA9IHRoaXMuZ2V0VGlsZVkodGhpcy5jYW1lcmEueSk7XG4gICAgbGV0IHgyID0gTWF0aC5jZWlsKHRoaXMuY2FtZXJhLndpZHRoIC8gdGhpcy50d2lkdGgpO1xuICAgIGxldCB5MiA9IE1hdGguY2VpbCh0aGlzLmNhbWVyYS5oZWlnaHQgLyB0aGlzLnRoZWlnaHQpO1xuICAgIHgxID0gTWF0aHMuY2xhbXAoeDEsIDAsIHRoaXMud2lkdGgpO1xuICAgIHkxID0gTWF0aHMuY2xhbXAoeTEsIDAsIHRoaXMuaGVpZ2h0KTtcbiAgICB4MiA9IE1hdGhzLmNsYW1wKHgyICsgeDEgKyAxLCB4MSwgdGhpcy53aWR0aCk7XG4gICAgeTIgPSBNYXRocy5jbGFtcCh5MiArIHkxICsgMSwgeTEsIHRoaXMuaGVpZ2h0KTtcbiAgICByZXR1cm4ge1xuICAgICAgeDE6IHgxLFxuICAgICAgeTE6IHkxLFxuICAgICAgeDI6IHgyLFxuICAgICAgeTI6IHkyLFxuICAgIH07XG4gIH1cblxuICBkcmF3KCk6IHZvaWQge1xuICAgIGxldCByZWN0ID0gdGhpcy5nZXREcmF3UmVjdCgpO1xuICAgIGZvciAobGV0IGkgPSByZWN0LngxOyBpIDwgcmVjdC54MjsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gcmVjdC55MTsgaiA8IHJlY3QueTI7ICsraikge1xuICAgICAgICBsZXQgdGlsZSA9IHRoaXMuZ2V0KGksIGopO1xuICAgICAgICBpZiAodGlsZSkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGlsZShcbiAgICAgICAgICAgIHRoaXMueCArIGkgKiB0aGlzLnR3aWR0aCxcbiAgICAgICAgICAgIHRoaXMueSArIGogKiB0aGlzLnRoZWlnaHQsXG4gICAgICAgICAgICB0aGlzLnR3aWR0aCxcbiAgICAgICAgICAgIHRoaXMudGhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuc2hlZXQsXG4gICAgICAgICAgICB0aWxlIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG59XG4iLCIvKiBleHBvcnRlZCBUaW1lICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xuXG4vKipcbiAqIE1hbmFnZXMgdGhlIHRpbWUgb2YgdGhlIGdhbWUuXG4gKiB0aW1lLnN0YXJ0VGltZTogc2Vjb25kcyBlbGFwc2VkIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZFxuICogdGltZS5mcmFtZVRpbWU6IGFsbW9zdCB0aGUgc2FtZSBhcyBzdGFydFRpbWUsIGhhcyB0aGUgZWxhcHNlZCBzZWNvbmRzXG4gKiBzY2llbmNlIHRoZSBnYW1lIHN0YXJ0ZWQgYnV0IGl0IHVwZGF0ZXMgdGhlIHZhbHVlIGJ5IGNvdW50aW5nIHRoZSBmcmFtZSB0aW1lIG9mIGVhY2ggZ2FtZSBsb29wLlxuICogdGltZS5kZWx0YVRpbWU6IGludmVyc2UgcmVsYXRpdmUgdmFsdWUgdG8gdGhlIGZwcyBvZiB0aGUgZ2FtZS4gV2hlbiB0aGUgZ2FtZSBydW5zIG9uIDYwZnBzIHRoZSB2YWx1ZSBpcyAxLlxuICogV2hlbiB0aGUgZnBzIGRyb3AsIHRoZSBkZWx0YVRpbWUgdmFsdWUgaXMgaW5jcmVhc2VkIHByb3BvcnRpb25hbCB0byB0aGUgYW1vdW50IG9mIGZwcyBkcm9wcGVkLlxuICogRXhhbXBsZTpcbiAqIDYwZnBzOiBkZWx0YVRpbWUgPT0gMVxuICogMzBmcHM6IGRlbHRhVGltZSA9PSAyXG4gKiAxNWZwczogZGVsdGFUaW1lID09IDRcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogZGVsdGFUaW1lOiBpbnZlcnNlIHJlbGF0aXZlIHZhbHVlIHRvIHRoZSBmcHMgb2YgdGhlIGdhbWUuIFdoZW4gdGhlIGdhbWUgcnVucyBvbiA2MGZwcyB0aGUgdmFsdWUgaXMgMS5cbiAgICovXG4gIGRlbHRhVGltZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBkZWx0YVRpbWVGUzogZGVsdGFUaW1lIGluIGZsb2F0aW5nIHBvaW50IG51bWJlci5cbiAgICovXG4gIGRlbHRhVGltZUZTOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRpbWU6IHNlY29uZHMgZWxhcHNlZCBzY2llbmNlIHRoZSBnYW1lIHN0YXJ0ZWRcbiAgICovXG4gIHRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogZnJhbWVUaW1lOiBhbG1vc3QgdGhlIHNhbWUgYXMgc3RhcnRUaW1lLCBoYXMgdGhlIGVsYXBzZWQgc2Vjb25kc1xuICAgKi9cbiAgZnJhbWVUaW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGZyYW1lQ291bnQ6IG51bWJlciBvZiBmcmFtZXMgZWxhcHNlZCBzY2llbmNlIHRoZSBnYW1lIHN0YXJ0ZWRcbiAgICovXG4gIGZyYW1lQ291bnQ6IG51bWJlcjtcblxuICAvKipcbiAgICogZnBzOiBmcmFtZXMgcGVyIHNlY29uZCBvZiB0aGUgZ2FtZVxuICAgKi9cbiAgZnBzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHN0YXJ0VGltZTogc2Vjb25kcyBlbGFwc2VkIHNjaWVuY2UgdGhlIGdhbWUgc3RhcnRlZFxuICAgKi9cbiAgc3RhcnRUaW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGxhc3RUaW1lOiBsYXN0IHRpbWUgdGhlIGdhbWUgbG9vcCB3YXMgZXhlY3V0ZWRcbiAgICovXG4gIGxhc3RUaW1lOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZW5naW5lOiBFbmdpbmUsIGFyZ3M6IHVua25vd24pIHtcbiAgICBzdXBlcihlbmdpbmUsIGFyZ3MpO1xuICAgIHRoaXMuZGVsdGFUaW1lID0gMDtcbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMuZnJhbWVUaW1lID0gMDtcbiAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIHRoaXMuZnBzID0gMDtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMDtcbiAgICB0aGlzLmxhc3RUaW1lID0gdGhpcy5zdGFydFRpbWU7XG4gICAgdGhpcy5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMDtcbiAgfVxuXG4gIHBhcmFtcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHRpbWUgdmFsdWVzLlxuICAgKi9cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBsZXQgY3VycmVudCA9IHBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMDtcbiAgICB0aGlzLmRlbHRhVGltZUZTID0gY3VycmVudCAtIHRoaXMubGFzdFRpbWU7XG4gICAgdGhpcy5kZWx0YVRpbWUgPSB0aGlzLmRlbHRhVGltZUZTIC8gKDEgLyA2MCk7XG4gICAgdGhpcy5mcmFtZVRpbWUgKz0gdGhpcy5kZWx0YVRpbWU7XG4gICAgdGhpcy50aW1lID0gY3VycmVudCAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIHRoaXMubGFzdFRpbWUgPSBjdXJyZW50O1xuICAgIHRoaXMuZnBzID0gMTAwMCAvICh0aGlzLmRlbHRhVGltZUZTICogMTAwMCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ2FtZXJhLCBDYW1lcmFBcmdzIH0gZnJvbSBcIi4vY2FtZXJhXCI7XG5pbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuL2RlYnVnXCI7XG5pbXBvcnQgeyBHYW1lT2JqZWN0LCBPYmplY3RDb25zdHJ1Y3RvciB9IGZyb20gXCIuL29iamVjdHNcIjtcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tIFwiLi9jb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBDb2xsaWRlciwgQ29sbGlkZXJBcmdzIH0gZnJvbSBcIi4vY29sbGlkZXJzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBEaXNwbGF5LCBEaXNwbGF5QXJncyB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IEVuZ2luZSwgRW5naW5lQXJncywgRW5naW5lQ3JlYXRlQXJncyB9IGZyb20gXCIuL2VuZ2luZVwiO1xuaW1wb3J0IHsgRXZlbnRzIH0gZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiLi9tYXRyaXhcIjtcbmltcG9ydCB7IFBsYXRmb3JtQ29udHJvbGxlciwgUGxhdGZvcm1Db250cm9sbGVyQXJncywgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3JlY3RcIjtcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSBcIi4vcmVnaXN0cnlcIjtcbmltcG9ydCB7IFJlc291cmNlVHlwZSwgUmVzb3VyY2VzIH0gZnJvbSBcIi4vcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBTY2VuZSwgU2NlbmVBcmdzIH0gZnJvbSBcIi4vc2NlbmVzXCI7XG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCIuL3NvdW5kc1wiO1xuaW1wb3J0IHsgU3ByaXRlU2hlZXQsIFNwcml0ZVNoZWV0QXJncyB9IGZyb20gXCIuL3Nwcml0ZS1zaGVldHNcIjtcbmltcG9ydCB7IFNwcml0ZSwgU3ByaXRlQXJncyB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbmltcG9ydCB7IFRpbGUsIFRpbGVBcmdzLCBUaWxlQ29ybmVycywgVGlsZUVkZ2VzIH0gZnJvbSBcIi4vdGlsZVwiO1xuaW1wb3J0IHsgVGlsZU1hcCB9IGZyb20gXCIuL3RpbGVtYXBcIjtcbmltcG9ydCB7IFRpbWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgeyBSZXNvdXJjZUl0ZW0sIFJlc291cmNlSXRlbUFyZ3MgfSBmcm9tIFwiLi9yZXNvdXJjZXNcIjtcblxuZGVjbGFyZSBjb25zdCB3aW5kb3c6IGFueTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgd2luZG93LkVuZ2luZSA9IEVuZ2luZTtcbiAgd2luZG93LlNwcml0ZVNoZWV0ID0gU3ByaXRlU2hlZXQ7XG4gIHdpbmRvdy5UaWxlID0gVGlsZTtcbiAgd2luZG93LlRpbGVNYXAgPSBUaWxlTWFwO1xuICB3aW5kb3cuUGxheWVyID0gUGxheWVyO1xuICB3aW5kb3cuUGxhdGZvcm1Db250cm9sbGVyID0gUGxhdGZvcm1Db250cm9sbGVyO1xuICB3aW5kb3cuU2NlbmUgPSBTY2VuZTtcbn1cblxuZXhwb3J0IHtcbiAgQ2FtZXJhLFxuICBDYW1lcmFBcmdzLFxuICBDb2xsZWN0aW9uLFxuICBDb2xsaWRlcixcbiAgQ29sbGlkZXJBcmdzLFxuICBDb21wb25lbnQsXG4gIERlYnVnLFxuICBEaXNwbGF5LFxuICBEaXNwbGF5QXJncyxcbiAgRW5naW5lLFxuICBFbmdpbmVBcmdzLFxuICBFbmdpbmVDcmVhdGVBcmdzLFxuICBFdmVudHMsXG4gIEdhbWVPYmplY3QsXG4gIElucHV0LFxuICBNYXRyaXgsXG4gIE9iamVjdENvbnN0cnVjdG9yLFxuICBQbGF0Zm9ybUNvbnRyb2xsZXIsXG4gIFBsYXRmb3JtQ29udHJvbGxlckFyZ3MsXG4gIFBsYXllcixcbiAgUG9pbnQsXG4gIFJlZ2lzdHJ5LFxuICBSZXNvdXJjZUl0ZW0sXG4gIFJlc291cmNlSXRlbUFyZ3MsXG4gIFJlc291cmNlVHlwZSxcbiAgUmVzb3VyY2VzLFxuICBTY2VuZSxcbiAgU2NlbmVBcmdzLFxuICBTb3VuZCxcbiAgU3ByaXRlLFxuICBTcHJpdGVBcmdzLFxuICBTcHJpdGVTaGVldCxcbiAgU3ByaXRlU2hlZXRBcmdzLFxuICBUaWxlLFxuICBUaWxlQXJncyxcbiAgVGlsZUNvcm5lcnMsXG4gIFRpbGVFZGdlcyxcbiAgVGlsZU1hcCxcbiAgVGltZSxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=