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

  function randomNumber(min, max) {
    return min + Math.random() * (max - min);
  }

  const maxSize = Math.min(canvas.width, canvas.height);

  const numberOfLines = 360;
  let angle = 0;
  const radius = maxSize / 2.5;
  const colors = [
    "#576372",
    "#5CC4BE",
    "#C8DC67",
    "#F26B6C",
    "#F6D86B",
    "#F26B43",
  ];

  for (let i = 0; i < numberOfLines; i++) {
    const angle = i * ((Math.PI * 2) / numberOfLines);
    const lineStart = {
      x: centerX,
      y: centerY,
    };
    const lineEnd = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
    ctx.beginPath();
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.lineTo(lineEnd.x, lineEnd.y);
    ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.lineWidth = 5;
    if (isThumbnail == true) {
      ctx.lineWidth /= devicePixelRatio;
    }
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
