class ResourceItem {

	constructor(params){
		Debug.validateParams('Resources.add', params, ["url", "type", "name"]);
		Object.assign(this, params);
		this.item = {};
	}

	load(success, error){
		this.item = new this.type();
		this.item.src = this.url;

		this.item.addEventListener('load', (function(that){
			//that.item.removeEventListener('load', arguments.callee);
			Debug.success(`Loaded resource ${that.name}`);
			return success;
		})(this));

		/*this.item.addEventListener('error', (function(that){
			//that.item.removeEventListener('error', arguments.callee);
			Debug.warn(`Error loading resources ${that.name}: ${that.url}`);
			return error;
		})(this));*/
	}

}
class Resources extends Component{

	constructor(params, engine){
		super(params, engine);
		this.items = {};
		this.length = 0;
		this.loaded = 0;
	}

	init(){
		super.init();
	}

	add(params){
		// resources will be always overrided if existed before, problem in the future?
		this.items[params.name] = new ResourceItem(params);
		this.length++;
	}

	remove(name){
		delete this.items.name;
	}

	success(){
		if(++this.loaded == this.length){
			this.engine.start();
		}
	}

	error(){

	}
	preload(){
		let names = Object.keys(this.items);
		Debug.group('Preloading Resources');
		for(let name of names){
			this.items[name].load(this.success.bind(this), this.error.bind(this));
		}
		Debug.groupEnd();
	}
}