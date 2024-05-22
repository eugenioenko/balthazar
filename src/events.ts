import { Component } from "./components";
import { Display } from "./display";
import { Engine } from "./engine";
import { Input } from "./input";

export class Events extends Component {
  constructor(engine: Engine, args: {}) {
    super(engine, args);
    let input = this.components.get(Input);
    let canvas = this.components.get(Display).canvas;
    canvas.addEventListener("mousemove", (event: any) =>
      input.mouseMove(event)
    );
    canvas.addEventListener("mousedown", (event: any) =>
      input.mouseDown(event)
    );
    canvas.addEventListener("mouseenter", () => input.mouseEnter());
    canvas.addEventListener("mouseleave", () => input.mouseLeave());
    canvas.addEventListener("click", (event: any) => input.mouseClick(event));
    window.addEventListener("keydown", (event: any) => input.keyDown(event));
    window.addEventListener("keyup", (event: any) => input.keyUp(event));
  }
}
