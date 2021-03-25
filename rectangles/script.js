const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize(window.innerWidth, window.innerHeight, devicePixelRatio);
  draw();
}

function draw() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const size = 25;
  const rows = canvas.width / size;
  const columns = canvas.height / size;
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

  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < columns; y++) {
      const sizeX = randomNumber(size * 0.1, size);
      const sizeY = randomNumber(size * 0.1, size);
      ctx.beginPath();
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(x * size, y * size, sizeX, sizeY);
      ctx.closePath();
    }
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
