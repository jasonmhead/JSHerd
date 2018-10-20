window.onload = () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  var quads = [];
  var size = 10;
  var rows = 100;
  var cols = 40;
  var colors = ["black", "orange", "#0088FF"];

  context.translate(0, 0);

  const frame = function() {
    { quads.length && rander() }
    requestAnimationFrame(frame);
  }

  const init = function() {
    canvas.width = 800;
    canvas.height = 600;

    // add quads
    for (let i = 0; i < rows; i ++) {
      for (let j = 0; j < cols; j ++) {
        var quad = new Quad(100 + i * size, 100 + j * size, size, size);
        quads.push(quad);
      }
    }
  }

  const rander = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    quads.forEach(quad => {
      quad.draw();
    })
  }

  function Quad(x, y, width, height) {
    var velVector = {
      x: Math.random() * 10,
      y: Math.random() * 10
    };
    var targetPoint = {
      x: 300,
      y: 300
    };
    var speed = 0.5;
    var angle = 0;
    var colorIndex = 0;

    // constructor
    (function() {
      colorIndex = Math.round(Math.random() * colors.length);
      context.fillStyle = colors[colorIndex];
      context.fillRect(x, y, width, height);
      context.stroke();
    })()

    this.draw = function() {
      var dx = targetPoint.x - x;
      var dy = targetPoint.y - y;
      var alphaFactor = (canvas.height - y) * 0.002;

      angle = Math.atan2(dy, dx);
      velVector.x += Math.cos(angle);
      velVector.y += Math.sin(angle);
      x += velVector.x * speed;
      y += velVector.y * speed * dx / 10000;
      context.fillStyle =  colors[colorIndex];
      context.fillRect(x, y, width * alphaFactor, height * alphaFactor);
    }
  }

  init();
  frame();
}
