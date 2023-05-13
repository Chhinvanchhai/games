<template>
  <div style="background: white;">
  <canvas ref="canvasRef"></canvas>

  </div>
</template>
<script setup>
import { ref } from "vue";
const canvasRef = ref(null);
</script>

<style scoped>
canvas {
  margin: 12px;
  border: 1px solid black;
  width: 97%;
  height: 90%;
}
</style>
