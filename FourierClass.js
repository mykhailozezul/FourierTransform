class FourierClass {
  constructor(signalFunction, start, end, color) {
    this.signalFunction = signalFunction;
    this.start = start;
    this.end = end;
    this.color = color;
  }

  polarFunc(frequency) {
    return [
      {
        start: this.start,
        end: this.end,
        color: this.color,
        x: (x) => Math.cos(x * frequency) * this.signalFunction(x),
        y: (y) => Math.sin(y * frequency) * this.signalFunction(y),
      },
    ];
  }

  cartFunc() {
    return [
      {
        start: this.start,
        end: this.end,
        color: this.color,
        x: (x) => x,
        y: (y) => this.signalFunction(y),
      },
    ];
  }

  calcFunction(funcShape) {}

  animateFunction(deltaTime, graphInstance) {
    for (let i = 0; i <= 15; i += 0.01) {
      setTimeout(() => {
        graphInstance.updateCanvas();
        graphInstance.drawGraph(this.polarFunc(i));
      }, deltaTime * i);
    }
  }
}

export { FourierClass };
