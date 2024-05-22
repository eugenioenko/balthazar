/**
 * Example of a game, this module is used for testing the engine.
 */
var GENGINE_DEBUG_MODE = false;

function onSave() {
  gengine.tileMap.save();
}

function Game(engine) {
  const sheet = new SpriteSheet({
    image: engine.resources.get("marioworld"),
    width: 16,
    height: 16,
    offsetX: 2,
    offsetY: 1,
    gap: 1,
  });

  let tiles = [
    new Tile({
      solid: { top: false, bottom: false, right: false, left: false },
      angle: 0,
    }),
    new Tile({
      solid: { top: true, bottom: true, right: true, left: true },
      angle: 45,
    }),
    new Tile({
      solid: { top: true, bottom: true, right: true, left: true },
      angle: 45,
    }),
    new Tile({
      solid: { top: true, bottom: true, right: true, left: true },
      angle: 45,
    }),
    new Tile({
      solid: { top: true, bottom: false, right: false, left: false },
      angle: 45,
    }),
    new Tile({
      solid: { top: true, bottom: false, right: false, left: false },
      angle: 45,
    }),
    new Tile({
      solid: { top: true, bottom: false, right: false, left: false },
      angle: 45,
    }),
    new Tile({
      solid: { top: true, bottom: true, right: false, left: false },
      angle: 45,
    }), //7
    new Tile({
      solid: { top: true, bottom: true, right: true, left: true },
      angle: 45,
    }), //8
  ];
  for (let i = 9; i < 300; ++i) {
    tiles[i] = tiles[0];
  }
  tiles[41] = tiles[4];
  tiles[42] = tiles[4];
  tiles[43] = tiles[4];

  tiles[24] = tiles[1];
  tiles[26] = tiles[1];

  let tileMap = new TileMap(engine, {
    x: 0,
    y: 0,
    width: 87,
    height: 56,
    twidth: 32,
    theight: 32,
    sheet: sheet,
    tiles: tiles,
  });

  for (let i = 0; i < 300; ++i) {
    map[i] = i;
  }

  tileMap.load(map);
  engine.tileMap = tileMap;

  let player = new Player(engine, {
    x: 800,
    y: 1460,
    width: 24,
    height: 28,
  });

  engine.addComponent(PlatformController, { tileMap });

  const scene = new Scene(engine);
  scene.addSprite(tileMap);
  scene.addSprite(player);

  engine.scenes.add(scene);
}

Engine.create({
  canvas: "canvas",
  width: 900,
  height: 600,
  game: Game,
  resources: [
    { url: "images/mario.png", type: "img", name: "marioworld" },
    { url: "images/mario.png", type: "img", name: "marioworld1" },
  ],
});
