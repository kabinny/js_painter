// canvas는 context로 그 안의 픽셀을 다룰 수 있다.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const inputColor = document.getElementById("inputColor");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 픽셀을 다루는 사이즈를 캔버스에게 알려줘야 함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본 배경을 하얀색으로 설정. (아니면 투명 상태임)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 이 context 안에 있는 선의 색상
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 그 선의 너비가 2.5px

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // painting이 false인 동안에는 path를 만들기만 하고 사용하지는 않는다. 
    // console.log("creating path in ", x, y);
    ctx.beginPath(); // 패스를 시작한다. 
    ctx.moveTo(x, y); // 패스의 시작 좌표를 옮긴다.
  } else {
    // console.log("creating line in ", x, y);
    ctx.lineTo(x, y); // 패스의 끝 좌표
    ctx.stroke(); // 선을 그린다.
  }
}

function rgbToHex(colorval) {
  let parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete(parts[0]);
  for (let i = 1; i <= 3; ++i) {
    parts[i] = parseInt(parts[i]).toString(16);
    if (parts[i].length == 1) parts[i] = '0' + parts[i];
  }
  return '#' + parts.join('');
}

function handleColorClick(event) {
  let color = event.target.style.backgroundColor;
  color = rgbToHex(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  inputColor.value = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS🎨";
  link.click();
}

function handleInputColor(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (inputColor) {
  inputColor.addEventListener("input", handleInputColor);
}
