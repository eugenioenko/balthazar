

var Tiles = [
	{ color: '#eee', solid: false, angle: 0, friction: 0.0 },
	{ color: '#333', solid: true, angle: 45, friction: 0.4 },
	{ color: '#333', solid: true, angle: 135, friction: 0.4 },
	{ color: '#333', solid: true, angle: 0, friction: 0.4 },
	{ color: 'red', solid: true, angle: 0, friction: 0.8 },
	{ color: 'cyan', solid: true, angle: 0, friction: -0.1 },
	{ color: 'blue', solid: true, angle: 0, friction: 3.8 }
];

class Matrix {
	constructor(width, height){
		this.array = new Uint16Array(width * height);
		this.width = width;
		this.height = height;
	}
	read(x, y){
		return this.array[y * this.width + x];
	}
	write(x, y, value){
		this.array[y * this.width + x] = value;
	}
	load(array){
		this.array = new Uint16Array(array);
	}
	randomize(){
		for(let i = 0; i < this.array.length; ++i){
			this.array[i] = Maths.rand(0, 3);
		}
	}
}
class TileMap extends Sprite{
	constructor(params){
		super(params);
		//this.twidth = 64;
		//this.theight = 64;
		this.map = new Matrix(this.width, this.height);
	}
	__params__(){
		return ["x", "y", "width", "height", "twidth", "theight"];
	}
	read(x, y){
		return this.map.read(x, y);
	}
	write(x, y, value){
		this.map.write(x, y, value);
	}
	load(array){
		this.map.load(array);
	}
	init(){
		this.camera = this.getComponent("Camera");
		this.display = this.getComponent("Display");
		//this.map.randomize();
	}
	randomize(){
		this.map.randomize();
	}
	getTileX(x){
		return Math.floor(x / this.twidth);
	}
	getTileY(y){
		return Math.floor(y / this.theight);
	}
	getTile(x, y){
		return Tiles[this.read(this.getTileX(x), this.getTileY(y))];
	}
	getCoorners(x, y, width, height, coorners){
		coorners.upLeft = this.getTile(x, y);
		coorners.upRight = this.getTile(x+width, y);
		coorners.downLeft = this.getTile(x, y+height);
		coorners.downRight = this.getTile(x+width, y+height);
	}
	getDrawRect(){
		let x1 = this.getTileX(this.camera.x);
		let y1 = this.getTileY(this.camera.y);
		let x2 = Math.ceil(this.camera.width / this.twidth);
		let y2 = Math.ceil(this.camera.height / this.theight);
		x1 = Maths.clamp(x1, 0, this.width);
		y1 = Maths.clamp(y1, 0, this.height);
		x2 = Maths.clamp(x2+x1+1, x1, this.width);
		y2 = Maths.clamp(y2+y1+1, y1, this.height);
		return{
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2
		};
	}
	draw(){
		let rect = this.getDrawRect();
		for(var i = rect.x1; i < rect.x2; ++i){
			for(var j = rect.y1; j < rect.y2; ++j){
				let tile = this.read(i, j);
				if(tile == 2) {
					this.display.fillRect(this.x + (i * this.twidth), this.y + (j * this.theight), this.twidth, this.theight, Tiles[0].color);
					this.display.fillTriangleUp(this.x + (i * this.twidth), this.y + (j * this.theight), this.twidth, this.theight, Tiles[tile].color);
				} else if (tile == 3) {
					this.display.fillRect(this.x + (i * this.twidth), this.y + (j * this.theight), this.twidth, this.theight, Tiles[0].color);
					this.display.fillTriangleDown(this.x + (i * this.twidth), this.y + (j * this.theight), this.twidth, this.theight, Tiles[tile].color);
				} else {
					this.display.fillRect(this.x + (i * this.twidth), this.y + (j * this.theight), this.twidth, this.theight, Tiles[tile].color);
					this.display.rect(this.x+(i*this.twidth), this.y+(j*this.theight), this.twidth, this.theight, Tiles[0].color);
				}
			}
		}
		return;
	}
	getCorners(x, y, sprite){

	}
}
