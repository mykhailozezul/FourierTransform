class GraphClass {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.context = null;
    this._scale = 20;
    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.clickPos = { x: 0, y: 0, isClicked: false };
    //array of objects, each object has trig function
    this.trigFunc = [
      {
        x: (x) => Math.cos(x),
        y: (y) => Math.sin(y),
        color: "rgb(250,100,0)",
        start: -360,
        end: 360,
      },
    ];
  }

  set scale(value) {
    //minimal grid scale.
    const minScale = 8;
    //max grid scale
    const maxScale = 200;
    if (value <= minScale) {
      this._scale = minScale;
    } else {
      this._scale = value;
    }
    if (value >= maxScale) {
      this._scale = maxScale;
    }
    this.updateCanvas();
  }

  get scale() {
    return this._scale;
  }

  canvasInit() {
    const canvas = document.getElementById(this.canvasId);
    this.context = canvas.getContext("2d");
    this.width = $("#" + this.canvasId).prop("width");
    this.height = $("#" + this.canvasId).prop("height");
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.drawGrid();
    this.drawGraph(this.trigFunc);
    this.onScaleEvent();
    this.onMoveEvent();
  }

  drawGrid() {
    this.context.strokeStyle = "rgb(100,100,100)";
    this.context.lineWidth = 0.3;
    this.context.beginPath();
    //draw grid rows.
    for (let rows = this.centerY; rows <= this.height; rows += this.scale) {
      this.context.moveTo(0, rows);
      this.context.lineTo(this.width, rows);
    }
    for (let rows = this.centerY; rows >= 0; rows -= this.scale) {
      this.context.moveTo(0, rows);
      this.context.lineTo(this.width, rows);
    }
    //draw columns
    for (let cols = this.centerX; cols <= this.width; cols += this.scale) {
      this.context.moveTo(cols, 0);
      this.context.lineTo(cols, this.height);
    }
    for (let cols = this.centerX; cols >= 0; cols -= this.scale) {
      this.context.moveTo(cols, 0);
      this.context.lineTo(cols, this.height);
    }
    this.context.stroke();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  updateCanvas() {
    this.clearCanvas();
    this.drawGrid();
    this.drawGraph(this.trigFunc);
  }

  getMousePos(mouseX, mouseY) {
    const canvasCoords = document
      .getElementById(this.canvasId)
      .getBoundingClientRect();
    return {
      x: mouseX - canvasCoords.x,
      y: mouseY - canvasCoords.y,
    };
  }

  graphScaling(mouseWheelEvent) {
    let wheelDirection = Math.sign(mouseWheelEvent.originalEvent.deltaY);
    let mouseCoords = this.getMousePos(
      mouseWheelEvent.clientX,
      mouseWheelEvent.clientY
    );
    this.scale += (wheelDirection * this.scale) / 10;
    const vectorDist = Math.sqrt(
      Math.pow(this.centerX - mouseCoords.x, 2) +
        Math.pow(this.centerY - mouseCoords.y, 2)
    );
    const normalizeVector = {
      x: (this.centerX - mouseCoords.x) / vectorDist,
      y: (this.centerY - mouseCoords.y) / vectorDist,
    };
    this.centerX += ((normalizeVector.x * this.scale) / 5) * wheelDirection;
    this.centerY += ((normalizeVector.y * this.scale) / 5) * wheelDirection;
  }

  graphMoving(mouseEvent) {
    let mouseCoords = this.getMousePos(mouseEvent.clientX, mouseEvent.clientY);

    if (mouseEvent.type == "mousedown") {
      this.clickPos.x = this.centerX - mouseCoords.x;
      this.clickPos.y = this.centerY - mouseCoords.y;
      this.clickPos.isClicked = true;
    }
    if (this.clickPos.isClicked) {
      this.centerX = mouseCoords.x + this.clickPos.x;
      this.centerY = mouseCoords.y + this.clickPos.y;
      this.updateCanvas();
    }
    if (mouseEvent.type == "mouseup") {
      this.clickPos.isClicked = false;
    }
  }

  onScaleEvent() {
    $("#" + this.canvasId).on("mousewheel", (e) => {
      e.preventDefault();
      this.graphScaling(e);
    });
  }

  onMoveEvent() {
    $("#" + this.canvasId).on("mousemove mousedown mouseup", (e) => {
      e.preventDefault();
      this.graphMoving(e);
    });
  }

  drawGraph(graphArr) {
    let degToRad = this.degToRad;
    graphArr.forEach((graphObj) => {
      this.context.beginPath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = graphObj.color;
      for (let x = graphObj.start; x <= graphObj.end; x++) {
        this.context.lineTo(
          graphObj.x(degToRad(x)) * this.scale + this.centerX,
          graphObj.y(degToRad(x)) * this.scale + this.centerY
        );
      }
      this.context.stroke();
    });
  }

  degToRad(angle) {
    return (angle * Math.PI) / 180;
  }
}

export { GraphClass };
