import { GraphClass } from "./GraphClass.js";

$(document).ready(function () {
  startUp();
});

let canvasOne = new GraphClass("canvas");
let canvasTwo = new GraphClass("polarCanvas");

function startUp() {
  canvasOne.trigFuncX = trigGraphFunctionX;
  canvasOne.trigFuncY = trigGraphFunctionY;
  canvasOne.canvasInit();

  canvasTwo.trigFuncX = (x) => Math.cos(x) * Math.sin(x * 5);
  canvasTwo.trigFuncY = (y) => Math.sin(y) * Math.sin(y * 5);
  canvasTwo.canvasInit();
}

function trigGraphFunctionY(x) {
  return Math.sin(x * 5);
}

function trigGraphFunctionX(x) {
  return x;
}
