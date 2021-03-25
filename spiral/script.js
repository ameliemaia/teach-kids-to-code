const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
let canvas, ctx;
let seed = 0;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize(window.innerWidth, window.innerHeight, devicePixelRatio);
  draw();
}

function draw() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  seed++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let angle = 0;
  let circleRadius = 0;
  let spiralRadius = 0;
  const numberOfCircles = 150;
  const radius = Math.min(canvas.width, canvas.height) / 2;
  const scale = radius / numberOfCircles;
  const colors = ["#5CC4BE", "#F6D86B", "#F26B6C"];

  for (let i = 0; i < numberOfCircles; i++) {
    angle++;
    spiralRadius += scale;
    circleRadius += scale / 15;
    const x = centerX + Math.cos(angle) * (spiralRadius * 0.85);
    const y = centerY + Math.sin(angle) * (spiralRadius * 0.85);
    ctx.beginPath();
    ctx.fillStyle = colors[(i + seed) % colors.length];
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

function resize(width, height, pixelRatio) {
  const maxWidth = width * pixelRatio;
  const maxHeight = height * pixelRatio;
  canvas.setAttribute("width", maxWidth + "px");
  canvas.setAttribute("height", maxHeight + "px");
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  draw();
}

function saveImage() {
  resize(1024, 1024, 1);
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
