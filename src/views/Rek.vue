<template>
  <div style="background: #fff; padding: 32px">
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
const canvasRek = ref(null);
const ctx = ref(null);
const offsetX = ref(800);
const offsetY = ref(800);
const scrollX = ref(null);
const scrollY = ref(null);
const lineColor = ref("#ddd");
const canvasSize = ref(600);

const setting = ref({
  positions: [],
});
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
  // console.log(
  //   "canvasRek.value",
  //   canvasRek.value.scrollY,
  //   canvasRek.value.offsetTop
  // );
  offsetX.value = canvasRek.value.offsetLeft;
  offsetY.value = canvasRek.value.offsetTop;
  scrollX.value = canvasRek.value.scrollX;
  scrollY.value = canvasRek.value.scrollY;

  const iRef = ref(1);
  for (let i = 0; i <= 63; i++) {
    if (iRef.value >= 9) {
      iRef.value = 1;
    }
    // for child in row

    iRef.value += 1;
    if (i > 0 && i <= 8 * 1) {
      let isRow = canvasSize.value / 8*8*2;
      let isCol = (canvasSize.value / 8) * iRef.value - 8 * 8 * 2;
      setting.value.positions.push({
        id: i,
        value: "",
        x: isCol,
        y: isRow,
        h: 40,
        w: 40,
      });
    }
    if (i > 8 * 1 && i <= 8 * 2) {

    }
    if (i > 8 * 2 && i <= 8 * 3) {
      let isRow =  canvasSize.value / 32 ;
      let isCol = (canvasSize.value / 8) * iRef.value - 8 * 8 * 2;
      setting.value.positions.push({
        id: i,
        value: "",
        x: isCol,
        y: isRow,
        h: 40,
        w: 40,
      });
    }
    if (i > 8 * 3 && i <= 8 * 4) {
    }
    if (i > 8 * 4 && i <= 8 * 5) {
    }
    if (i > 8 * 5 && i <= 8 * 6) {
      let isRow =  canvasSize.value / 32;
      let isCol = (canvasSize.value / 8) * iRef.value - 8 * 8 * 2;
      setting.value.positions.push({
        id: i,
        value: "",
        x: isCol,
        y: isRow,
        h: 40,
        w: 40,
      });
    }
    if (i > 8 * 6 && i <= 8 * 7) {
    }
    if (i > 8 * 7 && i <= 8 * 8) {
      let isRow = canvasSize.value ;
      let isCol =  (canvasSize.value / 8) * iRef.value - 8 * 8 * 2;
      setting.value.positions.push({
        id: i,
        value: "",
        x: isCol,
        y: isRow,
        h: 40,
        w: 40,
      });
    }

    // if (row1.includes(i)) {

    // } else {
    //   // setting.value.positions.push({
    //   //   id: i,
    //   //   value: "",
    //   //   x: 0,
    //   //   y: 0,
    //   //   h: 40,
    //   //   w: 40,
    //   // });
    // }
  }
  console.log(" setting.value.positions", setting.value.positions);
  draw();
};

function draw() {
  ctx.value.clearRect(0, 0, canvasRek.value.width, canvasRek.value.height);
  drawLines(2, lineColor);

  for (let i = 1; i <= setting.value.positions.length; i++) {
    let box = setting.value.positions[i];
    if (box) {
      if (box.x) {
        ctx.value.fillRect(box?.x || 0, box?.y || 0, box.w, box.h);
      }
    }
  }
  // for (let j = 0; j < 8; j++) {
  //   for (let k = 0; k < 8; k++) {
  //     if (j == 0) {
  //       ctx.value.fillRect(box.x, box.y, box.w, box.h);
  //     }
  //   }
  // }
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
  let d = setting.value.positions[textIndex];
  y = y - d.h * 1.5;
  // console.log(x >= d.x && x <= d.x + d.w && y >= d.y - d.h && y <= d.y);
  return x >= d.x && x <= d.x + d.w && y >= d.y - d.h && y <= d.y;
}

function handleMouseDown(e) {
  // console.log("Mouse", e);
  e.preventDefault();
  startX.value = parseInt(e.clientX - offsetX.value);
  startY.value = parseInt(e.clientY - offsetY.value);
  for (let j = 0; j < setting.value.positions.length; j++) {
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
  setting.value.positions[selectBox.value].x += dx;
  setting.value.positions[selectBox.value].y += dy;
  // lendth 600
  // height 600
  //
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // 1
      console.log("col", 8 * i);
      // 2
    }
  }
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
