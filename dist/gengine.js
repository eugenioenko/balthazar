class Maths{
	static clamp(value, min, max){
		 return Math.min(Math.max(value, min), max);
	}
	static lerp(min, max, t){
		return min + (max - min) * t;
	}
}
class GameObject {
	/**
	 * params {parent, x, y, width, height}
	 */
	constructor(params){
		if(!arguments.length) {
			throw new Error("GameObject constructor requires an object literal as argument");
		}
		Object.assign(this, params);
	}
	get gx(){
		return this.x;
	}
	get gy(){
		return this.y;
	}
	get rx(){
		return this.parent ? this.parent.x - this.x  : this.x;
	}
	get ry(){
		return this.parent ? this.parent.y - this.y : this.y;
	}

	debugDraw(color){
		color = typeof color === "undefined" ? "red" : color;
		if(this.parent && this.parent.display)
			this.parent.display.rect(this.x, this.y, this.width, this.height, color);
	}
}
class Input {
	constructor(){
		this.keyCode_ = {};
		window.addEventListener("keydown", this.keyDown.bind(this), false);
		window.addEventListener("keyup", this.keyUp.bind(this), false);
	}
	keyDown(e){
		this.keyCode_[e.code] = true;
	}
	keyUp(e){
		this.keyCode_[e.code] = false;
	}
	keyCode(code){
		return typeof this.keyCode_[code] !== "undefined" ? this.keyCode_[code] : false;
	}
}
class Display {
	constructor(canvasId){
		this.canvas = document.getElementById(canvasId);
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.ctx = this.canvas.getContext('2d');
		this.x = 0;
		this.y = 0;
	}
	clear(){
		this.ctx.clearRect(0,0,this.width,this.height);
	}

	fillRect(x, y, width, height, color){
		this.ctx.beginPath();
		this.ctx.fillStyle =  color;
		this.ctx.rect(this.x + x, this.y + y, width, height);
		this.ctx.fill();
	}
	rect(x, y, width, height, color){
		this.ctx.beginPath();
		this.ctx.strokeStyle =  color;
		this.ctx.rect(this.x + x, this.y + y, width, height);
		this.ctx.stroke();
	}
	circle(x, y, width, color){
		this.ctx.beginPath();
		this.ctx.arc(x, y, width/2, 0, 2 * Math.PI, false);
		this.ctx.strokeStyle =  color;
		this.ctx.stroke();
	}
}

class TestCollision{
	static CircleVsRect(circle, rect){
		let halfRectWidth = rect.width / 2;
		let halfRectHeight = rect.height / 2;
		let halfDistX = Math.abs(circle.gx - rect.gx - halfRectWidth);
		let halfDistY = Math.abs(circle.gy - rect.gy - halfRectHeight);
		if (halfDistX > (halfRectWidth + circle.radius)) return false;
		if (halfDistY > (halfRectHeight + circle.radius)) return false;
		if (halfDistX <= (halfRectWidth)) return true;
		if (halfDistY <= (halfRectHeight)) return true;
		//corner collision
		let dx = halfDistX - halfRectWidth;
		let dy = halfDistY - halfRectHeight;
		return (dx * dx + dy * dy <= Math.pow(circle.radius,2));
	}
	static RectVsCircle(rect, circle){
		return this.CircleVsRect(circle, rect);
	}
	static RectVsRect(rect1, rect2){
		if (rect1.gx <= rect2.gx + rect2.width &&
			rect1.gx + rect1.width > rect2.gx &&
			rect1.gy <= rect2.gy + rect2.height &&
			rect1.height + rect1.gy >= rect2.gy
		){
			return true;
		}
		return false;
	}
	static CircleVsCircle(circle1, circle2){
		let dx = circle1.gx - circle2.gx;
		let dy = circle1.gy - circle2.gy;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < circle1.width/2 + circle2.width/2) {
			return true;
		}
		return false;
	}
}
class Collider extends GameObject{
	constructor(params){
		super(params);
	}
	test(collider){
		// to do
	}
	get gx(){
		return this.parent.x + this.x;
	}
	get gy(){
		return this.parent.y + this.y;
	}
}
class CircleCollider extends Collider{
	constructor(params){
		super(params);
		this.radius = this.width / 2;
	}
	test(collider){
		if(collider instanceof CircleCollider){
			return TestCollision.CircleVsCircle(this, collider);
		}
		if(collider instanceof RectCollider){
			return TestCollision.CircleVsRect(this, collider);
		}
		return false; //posible bug with not knowing which collider to choose
	}
	debugDraw(color){
		color = typeof color === "undefined" ? "red" : color;
		if(this.parent && this.parent.display)
			this.parent.display.circle(this.gx, this.gy, this.width, color);
	}
}
class RectCollider extends Collider{
	constructor(params){
		super(params);
	}
	test(collider){
		if(collider instanceof CircleCollider){
			return TestCollision.CircleVsRect(collider, this);
		}
		if(collider instanceof RectCollider){
			return TestCollision.RectVsRect(this, collider);
		}
		return false; //if unknow collider will return false, posible bug
	}
	debugDraw(color){
		color = typeof color === "undefined" ? "red" : color;
		if(this.parent && this.parent.display)
			this.parent.display.rect(this.gx, this.gy, this.width, this.height, color);
	}
}
class Sprite extends GameObject{
	constructor(params){
		super(params);
		this.colliders = [];
		this.sprites = [];
		this.colliding = false;
		this.display = null;
		this.input = null;
		if(this.parent){
			this.display = this.parent.display;
			this.input = this.parent.input;
		}
	}
	addCollider(x, y, width, height){
		this.colliders.push(new RectCollider(this, x, y, width, height));
	}
	addSprite(sprite){
		this.sprites.push(sprite);
		return;
	}
	engineMove(x, y){
		for(let sprite of this.sprites){
			sprite.engineMove(x, y);
		}
		this.move(x, y);
		return;
	}
	engineDraw(x, y){
		for(let sprite of this.sprites){
			sprite.engineDraw(x, y);
		}
		this.draw(x, y);
		return;
	}
	/**
	 * Tests for possible collision between two sprites and if
	 * that happens, tests for individual colliders;
	 */
	testCollision(sprite){
		if(!TestCollision.RectVsRect(this, sprite)){
			return false;
		}
		for(let collider1 of this.colliders)
			for(let collider2 of sprite.colliders)
				if(collider1.test(collider2))
					return true;
		return false;
	}
	engineCheckCollision(sprite){
		if(this.testCollision(sprite)){
			this.colliding = true;
			sprite.colliding = true;
			this.collision(sprite);
			sprite.collision(this);
		} else {
			this.colliding = false;
			sprite.colliding = false;
		}
	}
	engineTestCollision(sprite2){
		for(let sprite of this.sprites){
			sprite.engineCheckCollision(sprite2);
		}
		this.engineCheckCollision(sprite2);
	}
	move(){ }
	draw(){ }
	collision(sprite){ }
	destroy(){ }
}

class Engine extends GameObject{
	constructor(canvas){
		super({
			parent: null,
			x: 0,
			y: 0,
			width: 640,
			height: 480
		});
		this.display = new Display('canvas');
		this.input = new Input();
		this.x = 0;
		this.y = 0;
		this.camera = new Camera(this);
		this.sprites = [];
		this.frameLimit = false;
		this.frameSkip = 20;
		this.frameCount = 0;
		this.gameLoop = this.loop.bind(this);
		this.gameLoop();
	}
	collision(){
		for(let i = 0; i < this.sprites.length; ++i){
			for(let j = i +1; j < this.sprites.length; ++j){
				let sprite1 = this.sprites[i];
				let sprite2 = this.sprites[j];
				sprite1.engineTestCollision(sprite2);
			}
		}
	}
	add(sprite){
		this.sprites.push(sprite);
		return;
	}
	move(){
		for(let sprite of this.sprites){
			sprite.engineMove();
		}
		//this.camera.move();
		return;
	}
	draw(){
		this.display.clear();
		for(let sprite of this.sprites){
			sprite.engineDraw();
		}
		return;
	}
	loop(){
		//if(!this.frameLimit && ++this.frameCount > this.frameSkip){
			this.collision();
			this.move();
			this.draw();
			this.frameCount = 0;
		//}
		window.requestAnimationFrame(this.gameLoop);
	}
}
class Camera extends Sprite{
	constructor(parent, x, y){
		super(parent, x, y);
		this.speed = 3;
	}
	move(){
		if(this.input.keyCode("KeyS")) this.parent.display.y += this.speed;
		if(this.input.keyCode("KeyW")) this.parent.display.y -= this.speed;
		if(this.input.keyCode("KeyD")) this.parent.display.x += this.speed;
		if(this.input.keyCode("KeyA")) this.parent.display.x -= this.speed;
	}
}
var Tiles = ['black', 'white', 'blue', 'green'];
class TileMap extends Sprite{
	constructor(parent, x, y){
		super(parent, x, y, 0, 0);
		this.twidth = 32;
		this.theight = 32;
		this.map = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];
		this.height = this.map.length - 1;
		this.width = this.map[0].length - 1;
	}
	draw(){
		for(var i = 0; i <= this.width; ++i){
			for(var j = 0; j <= this.height; ++j){
				this.display.fillRect(this.x+(i*this.twidth), this.y+(j*this.theight), this.twidth, this.theight, Tiles[this.map[j][i]]);
			}
		}
		return;
	}
}

class TestSprite2 extends Sprite{
	constructor(params){
		super(params);
		//this.colliders.push(new RectCollider(this, 0, 0, 50, 50));
		this.colliders.push(new CircleCollider({
			parent: this,
			x: this.width/2,
			y: this.height/2,
			width: this.width,
			height: this.height
		}));
		this.speed = 1;
		this.color = "white";
		this.rotation = 0;
	}
	move(){
		if(!this.colliding){
			this.color = "white";
		}

		if(this.input.keyCode("ArrowDown")) this.y += this.speed;
		if(this.input.keyCode("ArrowUp")) this.y -= this.speed;
		if(this.input.keyCode("ArrowRight")) this.x += this.speed;
		if(this.input.keyCode("ArrowLeft")) this.x -= this.speed;

	}
	draw(){
		this.colliders[0].debugDraw(this.color);
		//this.display.rect(this.x+2, this.y+2, this.width-4, this.height-4, 'blue');
	}
	collision(sprite){
		this.color = "red";

	}
}
class TestSprite1 extends Sprite{
	constructor(params){
		super(params);
		this.colliders.push(new CircleCollider({
			parent: this,
			x: this.width/2,
			y: this.height/2,
			width: this.width,
			height: this.height
		}));
		this.speed = 1;
		this.color = "white";
	}
	move(){
		if(!this.colliding){
			this.color = "white";
		}
	}
	draw(){
		for(let collider of this.colliders){
			collider.debugDraw(this.color);
		}
		//this.display.rect(this.x+2, this.y+2, this.width-4, this.height-4, 'blue');
	}
	collision(sprite){
		this.color = "red";
	}
}


let engine = new Engine('canvas');
engine.add(new TestSprite1({
	parent: engine,
	x: engine.display.width/2-150,
	y: engine.display.height/2-150,
	width: 300,
	height: 300
}));
engine.add(new TestSprite2({
	parent: engine,
	x: 100,
	y: 140,
	width: 25,
	height: 25
}));












