// canvas는 context로 그 안의 픽셀을 다룰 수 있다.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

// 픽셀을 다루는 사이즈를 캔버스에게 알려줘야 함
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 이 context 안에 있는 선의 색상
ctx.lineWidth = 2.5; // 그 선의 너비가 2.5px

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
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

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
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

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}