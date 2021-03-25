const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize(window.innerWidth, window.innerHeight, devicePixelRatio);
  draw();
}

function randomNumber(min, max) {
  return min + Math.random() * (max - min);
}

function draw(isThumbnail) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const maxSize = Math.min(canvas.width, canvas.height);
  const numberOfNodes = 50;
  const nodes = [];
  const nodeDistanceThreshold = maxSize / 4;
  const colors = [
    "#576372",
    "#5CC4BE",
    "#C8DC67",
    "#F26B6C",
    "#F6D86B",
    "#F26B43",
  ];

  for (let i = 0; i < numberOfNodes; i++) {
    const x = randomNumber(canvas.width * 0.05, canvas.width * 0.95);
    const y = randomNumber(canvas.height * 0.05, canvas.height * 0.95);
    let radius = randomNumber(5, 50);
    if (isThumbnail == true) {
      radius /= devicePixelRatio;
    }
    createNode(x, y, radius);
  }

  function distance(x1, x2, y1, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  for (let j = 0; j < nodes.length; j++) {
    for (let k = 0; k < nodes.length; k++) {
      const dist = Math.abs(
        distance(nodes[j].x, nodes[k].x, nodes[j].y, nodes[k].y)
      );
      if (dist < nodeDistanceThreshold) {
        ctx.beginPath();
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.lineWidth = randomNumber(2, 4);
        if (isThumbnail == true) {
          ctx.lineWidth /= devicePixelRatio;
        }
        ctx.moveTo(nodes[j].x, nodes[j].y);
        ctx.lineTo(nodes[k].x, nodes[k].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  function createNode(x, y, radius) {
    ctx.beginPath();
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    nodes.push({ x, y });
  }
}

function resize(width, height, pixelRatio, isThumbnail) {
  const maxWidth = width * pixelRatio;
  const maxHeight = height * pixelRatio;
  canvas.setAttribute("width", maxWidth + "px");
  canvas.setAttribute("height", maxHeight + "px");
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  draw(isThumbnail);
}

function saveImage() {
  resize(1024, 1024, 1, true);
  const link = document.createElement("a");
  link.setAttribute("download", "thumbnail.jpg");
  link.setAttribute(
    "href",
    canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream")
  );
  link.click();
  resize(window.innerWidth, window.innerHeight, devicePixelRatio);
}

window.addEventListener("resize", function () {
  resize(window.innerWidth, window.innerHeight, devicePixelRatio);
});

document.body.addEventListener("click", draw);
document.body.onload = init;
