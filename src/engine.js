/**
 * Engine is the main object of the game engine.
 * Engine consist of a group of different components which manage different tasks.
 * Each component is a lego piece, and the engine is the glue which binds them together.
 * Once the document is ready, Engine will initialize each component added
 * into it, call the preloader method, execute the game creation function 
 * and then start executing the game loop.
 */
class Engine extends GameObject{

	constructor(params){
		super(params);
		this.x = 0;
		this.y = 0;
		this.component = {};
		this.components = [];
		this.gameLoop = this.loop.bind(this);
	}
	__params__(){
		return ["canvas", "width", "height"];
	}

	init(){
		Debug.group('Engine loaded components');
		this.addComponent("Resources", Resources);
		this.addComponent("Input", Input);
		this.addComponent("Camera", Camera, {
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		});
		this.addComponent("Time", Time);
		this.addComponent("Sound", Sound);
		this.addComponent("Display", CanvasDisplay, {
			id: 'canvas',
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		});
		this.addComponent("Scene", Scene);
		Debug.groupEnd();
		this.time = this.component.Time;
		this.display = this.component.Display;
		this.scene = this.component.Scene;
		this.resources = this.component.Resources;
		this.sound = this.component.Sound;
		
	}	
	/**
	 * Static function to replace the windows.onload method.
	 * Once the window is ready, engine will initialize its components, execute
	 * the preloader and when preloader loaded all the resources, create the game
	 * and execute the gameloop.
	 */
	static ready(params){
		Debug.validateParams('Engine.ready', params, ["canvas", "width", "height", "preload", "create"]);
		(function(){
			var engine = new Engine({
				canvas: params.canvas,
				width: params.width,
				height: params.height
			});
			window.addEventListener('load', function(){
				engine.init();
				params.preload(engine);
				engine.resources.preload(params.create); // important: preload on complete calls create function
				engine.gameLoop();
			});
		})();
	}


	addComponent(name, component, params = {}){
		if(Debug.active()){
			if(typeof this.component[name] !== "undefined"){
				Debug.error(`Component ${name} is already defined`);
			}
		}
		params.name = name;
		this.component[name] = new component(params, this);
		this.component[name].init();
		this.components.push(this.component[name]);
	}

	getComponent(name){
		if(Debug.active()){
			if(typeof this.component[name] === "undefined"){
				Debug.error(`Component ${name} is not registred`);
			}
		}
		return this.component[name];
	}

	addSprite(sprite){
		this.scene.addSprite(sprite);
	}

	removeSprite(sprite){
		this.scene.removeSprite(sprite);
	}

	move(){
		for(let component of this.components){
			component.move();
		}
	}

	draw(){
		this.display.clear();
		for(let component of this.components){
			component.draw();
		}
	}

	loop(){
		this.move();
		this.fpsDelayCount = 0;
		this.draw();
		this.debugInfo();
		window.requestAnimationFrame(this.gameLoop);
	}

	debugInfo(){
		if(!Debug.active()) return;
		this.display.fillText((this.time.time).toFixed(2), 20, 20);
		this.display.fillText((this.time.deltaTime).toFixed(4), 20, 40);
		this.display.fillText(this.time.fps.toFixed(2), 20, 60);
	}
}