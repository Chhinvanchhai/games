<template>
  <div style="background: #fff; padding: 32px">
    <!-- <canvas style="width: 100%; height: 100%" ref="canvasRek"></canvas> -->
    <canvas
      ref="canvasRek"
      width="800"
      height="800"
      @mouseout="handleMouseOut"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    ></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import $ from '../jquery'
const canvasRek = ref(null);
const ctx = ref(null);

// variables used to get mouse position on the canvas
const offsetX = ref(800);
const offsetY = ref(800);
const scrollX = ref(null);
const scrollY = ref(null);
const lineColor = ref("#ddd");
const canvasSize = ref(600);
const setting = ref({
  positions: [
    {
      id: 1,
      value: "",
      x: "",
      y: "",
    },
  ],
});
for (let i = 1; i <= 63; i++) {
  setting.value.positions.push({
    id: i,
    value: "",
    x: "",
    y: "",
    h: "",
    w: "",
  });
}
const startX = ref();
const startY = ref();
const datas = ref([]);

datas.value.push({
  w: 40,
  h: 40,
  x: 120,
  y: 30,
});

datas.value.push({
  w: 40,
  h: 40,
  x: 40,
  y: 23,
});
datas.value.push({
  w: 40,
  h: 40,
  x: 220,
  y: 120,
});
const selectedText = ref(-1);
const selectBox = ref(-1);

const onPrepare = () => {
  ctx.value = canvasRek.value.getContext("2d");
  canvasRek.value.height = canvasSize.value;
  canvasRek.value.width = canvasSize.value;
  console.log(
    "canvasRek.value",
    canvasRek.value.scrollY,
    canvasRek.value.offsetTop
  );
  offsetX.value = canvasRek.value.offsetLeft;
  offsetY.value = canvasRek.value.offsetTop;
  scrollX.value = canvasRek.value.scrollX;
  scrollY.value = canvasRek.value.scrollY;

  draw();
  // listen for mouse events
  // console.log('canvsref', canvasRek.value);

  // canvasRek.value.mousedown(function (e) {
  //   handleMouseDown(e);
  // });
  // canvasRek.value.mousemove(function (e) {
  //   handleMouseMove(e);
  // });
  // canvasRek.value.mouseup(function (e) {
  //   handleMouseUp(e);
  // });
  // canvasRek.value.mouseout(function (e) {
  //   handleMouseOut(e);
  // });
};

function draw() {
  ctx.value.clearRect(0, 0, canvasRek.value.width, canvasRek.value.height);
  drawLines(2, lineColor);
  for (let i = 0; i < datas.value.length; i++) {
    let box = datas.value[i];
    ctx.value.fillRect(box.x, box.y, box.w, box.h);
  }
}

function drawLines(lineWidth, strokeStyle) {
  let lineStart = 4;
  let lineLenght = canvasSize.value - 5;
  ctx.value.lineWidth = lineWidth;
  // ctx.value.lineCap = 'round';
  ctx.value.strokeStyle = strokeStyle;
  ctx.value.beginPath();
  for (let y = 0; y <= 8; y++) {
    ctx.value.moveTo(lineStart + y, y * (canvasRek.value.width / 8));
    ctx.value.lineTo(lineLenght + y, y * (canvasRek.value.width / 8));
  }
  for (let x = 0; x <= 8; x++) {
    ctx.value.moveTo(x * (canvasRek.value.height / 8), lineStart);
    ctx.value.lineTo(x * (canvasRek.value.height / 8), lineLenght);
  }
  ctx.value.stroke();
}

function dataHittest(x, y, textIndex) {
  let d = datas.value[textIndex];
  y = y - (d.h*1.5);
  console.log("x, y, d", x, y, d);
  return x >= d.x && x <= d.x + d.w && y >= d.y - d.h && y <= d.y;
}

function handleMouseDown(e) {
  console.log("Mouse", e);
  e.preventDefault();
  startX.value = parseInt(e.clientX - offsetX.value);
  startY.value = parseInt(e.clientY - offsetY.value);
  for (let j = 0; j < datas.value.length; j++) {
    if (dataHittest(startX.value, startY.value, j)) {
      selectBox.value = j;
    }
  }
}

function handleMouseUp(e) {
  e.preventDefault();
  selectBox.value = -1;
}

function handleMouseOut(e) {
  e.preventDefault();
  selectBox.value = -1;
}

function handleMouseMove(e) {
  if (selectBox.value < 0) {
    return;
  }
  e.preventDefault();
  let mouseX = parseInt(e.clientX - offsetX.value);
  let mouseY = parseInt(e.clientY - offsetY.value);
  let dx = mouseX - startX.value;
  let dy = mouseY - startY.value;
  startX.value = mouseX;
  startY.value = mouseY;
  datas.value[selectBox.value].x += dx;
  datas.value[selectBox.value].y += dy;
  draw();
}

onMounted(() => {
  onPrepare();
});
</script>

<style scoped>
canvas {
}
</style>
