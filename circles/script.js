const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize();
  draw();
}

function draw() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radius = Math.min(canvas.width, canvas.height) / 2;
  const colors = ["#5CC4BE", "#F6D86B", "#F26B6C"];

  ctx.globalCompositeOperation = "multiply";

  for (let i = 0; i < 3; i++) {
    const theta = i * ((Math.PI * 2) / 3);
    const x = centerX + Math.cos(theta) * radius;
    const y = centerY + Math.sin(theta) * radius;
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

function resize() {
  const width = window.innerWidth * devicePixelRatio;
  const height = window.innerHeight * devicePixelRatio;
  canvas.setAttribute("width", width + "px");
  canvas.setAttribute("height", height + "px");
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  draw();
}

window.addEventListener("resize", resize);

document.body.onload = init;
