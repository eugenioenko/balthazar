import { Component } from "./components";
import { Engine } from "./engine";

/* exported Sound */
export class Sound extends Component {
  constructor(engine: Engine, args: {}) {
    super(engine, args);
  }

  move(): void {}

  draw(): void {}

  play() {}

  stop() {}

  pause() {}
}
