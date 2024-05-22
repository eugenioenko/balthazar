## Initial project Objective

Create a game engine based on micro components
As final objective, create a visual environment for creating 2d games

### Work in progress

> [minimalistic demo here](https://eugenioenko.github.io/gengine/demos/tilemap/)

### Documentation

> [Gengine documentation here](https://eugenioenko.github.io/gengine/docs/)

## Description

The engine has three basic classes
**GameObject**, **Component**, and **Sprites**.

#### GameObject

Its the base class of almost all object inside the engine.
It's main functionality is to generate an easy way to pass arguments when creating new instances.
It provides functionality to establish optional and necesary arguments. Those validation only ocurre during debug mode.

#### Component

They are mico modules singletons which are injected inside the engine.
The idea is to have every part of the engine as a Component: Display, Sound, Input, Scene, AI, etc...
Each component is added to the engine, the engine creates the instance, initialize the componend and makes it visible to
the rest of the components.

#### Time

Time is a component which contains:

- Counter of seconds since the game started
- Count of miliseconds it took do draw the last frame
- **deltaTime** is a inverse relative unit to fps. If the game runs at 60 fps, its 1. If its 30fps then 2. Used to make the movement be independent of frames

## Installation

> npm install
> mpm start

## Debug Mode

There is a Debug class to log in messages and throw errors.

- Debug.log
- Debug.warn
- Debug.error

Those method only function if debug mode is active, to activate it create a global variable and set it to true:

> window.GENGINE_DEBUG_MODE = true;

#### TODO

- Fix sprite drawing order
- Remove tilemap from engine
