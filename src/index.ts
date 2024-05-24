import { Camera, CameraArgs } from "./camera";
import { Debug } from "./debug";
import { GameObject, ObjectConstructor } from "./objects";
import { Collection } from "./collection";
import { Collider, ColliderArgs } from "./colliders";
import { Component } from "./components";
import { Display, DisplayArgs } from "./display";
import { Engine, EngineArgs, EngineCreateArgs } from "./engine";
import { Input } from "./input";
import { Matrix } from "./matrix";
import { PlatformController, PlatformControllerArgs, Player } from "./player";
import { Point } from "./rect";
import { Registry } from "./registry";
import { ResourceType, Resources } from "./resources";
import { Scene, SceneArgs } from "./scenes";
import { Sound } from "./sounds";
import { SpriteSheet, SpriteSheetArgs } from "./sprite-sheets";
import { Sprite, SpriteArgs } from "./sprites";
import { Tile, TileArgs, TileCorners, TileEdges } from "./tile";
import { TileMap } from "./tilemap";
import { Time } from "./time";
import { ResourceItem, ResourceItemArgs } from "./resources";

declare const window: any;

if (typeof window !== "undefined") {
  window.Engine = Engine;
  window.SpriteSheet = SpriteSheet;
  window.Tile = Tile;
  window.TileMap = TileMap;
  window.Player = Player;
  window.PlatformController = PlatformController;
  window.Scene = Scene;
}

export {
  Camera,
  CameraArgs,
  Collection,
  Collider,
  ColliderArgs,
  Component,
  Debug,
  Display,
  DisplayArgs,
  Engine,
  EngineArgs,
  EngineCreateArgs,
  GameObject,
  Input,
  Matrix,
  ObjectConstructor,
  PlatformController,
  PlatformControllerArgs,
  Player,
  Point,
  Registry,
  ResourceItem,
  ResourceItemArgs,
  ResourceType,
  Resources,
  Scene,
  SceneArgs,
  Sound,
  Sprite,
  SpriteArgs,
  SpriteSheet,
  SpriteSheetArgs,
  Tile,
  TileArgs,
  TileCorners,
  TileEdges,
  TileMap,
  Time,
};
