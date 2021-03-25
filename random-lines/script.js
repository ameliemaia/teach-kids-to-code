const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize(window.innerWidth, window.innerHeight, devicePixelRatio);
  draw();
}

function draw(isThumbnail) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const numberOfLines = 250;

  const colors = [
    "#576372",
    "#5CC4BE",
    "#C8DC67",
    "#F26B6C",
    "#F6D86B",
    "#F26B43",
  ];

  function randomNumber(min, max) {
    return min + Math.random() * (max - min);
  }

  ctx.globalCompositeOperation = "multiply";

  for (var i = 0; i < numberOfLines; i++) {
    ctx.beginPath();
    const lineStart = {
      x: randomNumber(0, canvas.width),
      y: randomNumber(0, canvas.height),
    };
    const lineEnd = {
      x: randomNumber(0, canvas.width),
      y: randomNumber(0, canvas.height),
    };

    ctx.strokeStyle = colors[i % colors.length];
    ctx.lineWidth = randomNumber(1, 10);
    if (isThumbnail == true) {
      ctx.lineWidth /= devicePixelRatio;
    }
    ctx.globalAlpha = randomNumber(0.5, 1);
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.lineTo(lineEnd.x, lineEnd.y);
    ctx.stroke();
    ctx.closePath();
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
