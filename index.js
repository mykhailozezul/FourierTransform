import { GraphClass } from "./GraphClass.js";
import { FourierClass } from "./FourierClass.js";

$(document).ready(function () {
  startUp();
});

let canvasTwo = new GraphClass("polarCanvas");

let funcTwo = new FourierClass(
  (x) => Math.sin(x * 8) + Math.sin(x * 6),
  0,
  360,
  "rgb(200,50,50)"
);

function startUp() {
  canvasTwo.trigFunc = funcTwo.cartFunc();
  canvasTwo.canvasInit();
  canvasTwo.scale = 65;

  //funcTwo.animateFunction(300, canvasTwo);
}
