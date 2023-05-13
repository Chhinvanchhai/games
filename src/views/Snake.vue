<script setup>
import { ref, onMounted } from "vue";

const canvasRef = ref(null);
const context = ref(null);
const count = ref(0);
const mark = ref(null);
const allscore = ref(null);
const playerscore = ref(null);
const speed = ref(null);
const shape = ref(null);

const h = ref(null);
const m = ref(null);
const s = ref(null);
const snake = ref(null);
const fruits = ref(null);
const timetableM = ref(null);
const timetableS = ref(null);

onMounted(() => {
  onGetElement();
});

function Clock() {
  const data = new Date();
  h.value = data.getHours();
  m.value = data.getMinutes();
  s.value = data.getSeconds();
  if (h.value < 10) {
    h.value = "0" + h.value;
  }
  if (m.value < 10) {
    m.value = "0" + m.value;
  }
  if (s.value < 10) {
    s.value = "0" + s.value;
  }
  document.getElementById("hour").innerHTML = h;
  document.getElementById("min").innerHTML = ":" + m;
  document.getElementById("se").innerHTML = ":" + s;
}

setInterval(Clock, 100);

function onGetElement() {
  context.value = canvasRef.value.getContext("2d");
  count.value = 0;
  mark.value = 0;
  allscore.value = [];
  playerscore.value = 0;
  speed.value = 30;
  shape.value = 16;
  //Speed Control

  // var action = document.querySelector(".set");
  // action.addEventListener("click", () => {
  //   // var speedcontrol = document.getElementById("speedcontrol").value;
  //   // speed.value = speedcontrol;
  //   // document.getElementById("speednumber").innerHTML = speed.value;
  // });
  //Time of play
  (s.value = 0), (m.value = 0);
  timetableM.value = [];
  timetableS.value = [];
  //class for snake
  snake.value = {
    x: 160,
    y: 160,
    dx: shape.value,
    dy: 0,
    cells: [],
    maxcell: 4,
  };
  fruits.value = {
    fx: 176,
    fy: 176,
  };
}
function clock() {
  s.value++;
  if (s.value >= 60) {
    s.value = 0;
    m.value++;
  }
  document.getElementById("s").innerHTML = s.value;
  document.getElementById("m").innerHTML = m.value;
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  //do it first
  requestAnimationFrame(loop);
  //speed.value control
  while (++count.value < speed.value) {
    return;
  }

  count.value = 0;
  context.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  //do it second
  snake.value.x += snake.value.dx;
  snake.value.y += snake.value.dy;
  //do it 6 step
  if (snake.value.x >= canvasRef.value.width) {
    snake.value.x = 0;
  }
  if (snake.value.x < 0) {
    snake.value.x = canvasRef.value.width - shape.value;
  }
  if (snake.value.y >= canvasRef.value.height) {
    snake.value.y = 0;
  }
  if (snake.value.y < 0) {
    snake.value.y = canvasRef.value.height - shape.value;
  }
  //do it third
  snake.value.cells.unshift({ a: snake.value.x, b: snake.value.y });
  if (snake.value.cells.length > snake.value.maxcell) {
    snake.value.cells.pop();
  }
  context.value.fillStyle = "blue";
  context.value.fillRect(
    fruits.value.fx,
    fruits.value.fy,
    shape.value - 1,
    shape.value - 1
  );
  
  //loop game cell
  snake.value.cells.forEach(function (cell, index) {
    //do it 4 step
    context.value.fillStyle = "red";
    if (index == 0) {
      context.value.fillStyle = "white";
    }
    context.value.fillRect(cell.a, cell.b, shape.value - 1, shape.value - 1);
    //do it 5 step

    //snake.value eat fruits.value
    if (cell.a === fruits.value.fx && cell.b === fruits.value.fy) {
      //Status
      document.getElementById("message").style.color = "blue";
      document.getElementById("message").innerHTML = "Playing";

      snake.value.maxcell++;
      fruits.value.fx = getRandom(0, 25) * shape.value;
      fruits.value.fy = getRandom(0, 25) * shape.value;
      //
      //score
      //
      mark.value = mark.value + 10;
      document.getElementById("score").value = mark.value;
      // document.getElementById("speednumber").innerHTML = speed.value;
      if (speed.value === 2) {
        speed.value += 0;
        document.getElementById("speednumber").innerHTML = "Max Speed";
      } else {
        speed.value -= 1;
      }
    }
    //code inline buttom is for look in console of number process
    //console.log("x:"+cell.a+"|y:"+cell.b+"->speed.value:"+speed.value+"index"+index);
    for (var i = index + 1; i < snake.value.cells.length; i++) {
      //
      //Game over here
      //
      if (
        cell.a === snake.value.cells[i].a &&
        cell.b === snake.value.cells[i].b
      ) {
        //save previous score
        //Stor Data in Array
        allscore.value[playerscore.value] = mark.value;
        timetableM.value[playerscore.value] = m.value;
        timetableS.value[playerscore.value] = s.value;
        playerscore.value++;
        m = 0;
        s = 0;
        document.getElementById("allscore").innerHTML = "";
        allscore.value.forEach(function (sc, index) {
          document.getElementById("allscore").innerHTML +=
            "Player" +
            (index + 1) +
            " = " +
            sc +
            " Score" +
            " =>" +
            " time =" +
            timetableM.value[index] +
            " m:" +
            timetableS.val[index] +
            " s<br>";
        });
        //restate game
        speed.value = 30;
        snake.value.cells = [];
        snake.value.maxcell = 4;
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "Game Over";
        mark.value = 0;
        document.getElementById("score").value = mark.value;
        fruits.value.fx = 176;
        fruits.value.fy = 176;
        snake.value.dx = shape.value;
        snake.value.dy = 0;
        snake.value.x = 160;
        snake.value.y = 160;
      }
    }
  });
}
//click function to change direction
function up() {
  if (snake.value.dy === 0) {
    snake.value.dy = -shape.value;
    snake.value.dx = 0;
  } else {
  }
}
function down() {
  if (snake.value.dy === 0) {
    snake.value.dy = shape.value;
    snake.value.dx = 0;
  }
}
function left() {
  if (snake.value.dx === 0) {
    snake.value.dx = -shape.value;
    snake.value.dy = 0;
  }
}
function right() {
  if (snake.value.dx === 0) {
    snake.value.dx = shape.value;
    snake.value.dy = 0;
  }
}

//key function to change direction
document.addEventListener("keydown", function (e) {
  if (
    (e.which === 37 && snake.value.dx === 0) ||
    (e.which === 65 && snake.value.dx === 0)
  ) {
    snake.value.dx = -shape.value;
    snake.value.dy = 0;
  } else if (
    (e.which === 38 && snake.value.dy === 0) ||
    (e.which === 87 && snake.value.dy === 0)
  ) {
    snake.value.dy = -shape.value;
    snake.value.dx = 0;
  } else if (
    (e.which === 39 && snake.value.dx === 0) ||
    (e.which === 68 && snake.value.dx === 0)
  ) {
    snake.value.dx = shape.value;
    snake.value.dy = 0;
  } else if (
    (e.which === 40 && snake.value.dy === 0) ||
    (e.which === 83 && snake.value.dy === 0)
  ) {
    snake.value.dy = shape.value;
    snake.value.dx = 0;
  }
});
function play() {
  requestAnimationFrame(loop);
  setInterval(clock, 1000);
}
function stop() {
  window.location.reload(); 
}
</script>

<template>
  <div class="about">
    <h1 class="title">Snake Game</h1>
    <div class="container">
      <!-- <canvas ref="my-canvas"></canvas> -->
      <canvas width="400" height="400" id="cv" ref="canvasRef"></canvas>
      <div>
        <h3>
          Score:<input disabled="disabled" id="score" type="number" value="" />
        </h3>
        <p>Status:<span id="message"></span></p>
        <p><u>All Player Score:</u></p>
        <span id="allscore"></span>
      </div>
      <div>
        <H3>Speed Control</H3>
        <select id="speedcontrol" v-model="speed">
          <option value="30">Auto</option>
          <option value="15">Medium</option>
          <option value="6">Fast</option>
          <option value="3">++Fast</option>
        </select>
        <!-- <button class="set">Ok</button> -->
        <p>Speed: <span id="speednumber">{{ speed}}</span></p>

        <h3>During of play</h3>
        <p>Minute: <span id="m"></span> : <span id="s"></span></p>
        <br />
        <button @click="play">Play</button>
        <button @click="stop">Reset&Stop</button><br /><br /><br />
        <button class="btn" @click="left">Left</button>
        <button class="btn" @click="up">Up</button><br /><br />
        <button class="btn" @click="down">Down</button>
        <button class="btn" @click="right">Right</button>
      </div>
    </div>
    <!--Time -->
    <div class="time">
      <div class="clock">
        <span id="hour"></span>
        <span id="min"></span>
        <span id="se"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-item: center;
}

body {
  background: black;
  margin: 20px;
}
#cv {
  border: 2px solid white;
}
h3,
p {
  color: white;
}
div {
  padding: 10px;
  color: white;
}
#message {
  color: blue;
}
footer {
  text-align: center;
  background: rosybrown;
}
.title {
  text-align: center;
  color: sandybrown;
}
.btn {
  width: 80px;
  height: 25px;
  background: pink;
  color: red;
}
</style>
