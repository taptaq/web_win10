<template>
  <div class="close_body">
    <p class="exit">正在退出系统</p>
    <div class="load-wrapp">
      <div class="dot_loading">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "closeSys",
};
</script>

<style scoped>
.close_body {
  background: rgb(62, 85, 219);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: default;
}

.close_body .exit {
  color: #fff;
  font-size: 2.8125rem;
  position: absolute;
  left: 36%;
  top: 30%;
  letter-spacing: 0.3rem;
  animation: exitChange 1s linear infinite;
}

@keyframes exitChange {
  0% {
    text-shadow: 0 0 5px #ccc, 0 0 2px #00a1ff;
    opacity: 0.5;
  }
  10% {
    text-shadow: 0 0 5px #ccc, 0 0 10px #00a1ff;
    opacity: 0.5;
  }
  20% {
    text-shadow: 0 0 5px #ccc, 0 0 15px #00a1ff;
    opacity: 0.6;
  }
  30% {
    text-shadow: 0 0 5px #ccc, 0 0 20px #00a1ff;
    opacity: 0.6;
  }
  40% {
    text-shadow: 0 0 5px #ccc, 0 0 25px #00a1ff;
    opacity: 0.7;
  }
  50% {
    text-shadow: 0 0 5px #ccc, 0 0 30px #00a1ff;
    opacity: 0.7;
  }
  60% {
    text-shadow: 0 0 5px #ccc, 0 0 25px #00a1ff;
    opacity: 0.8;
  }
  70% {
    text-shadow: 0 0 5px #ccc, 0 0 20px #00a1ff;
    opacity: 0.8;
  }
  80% {
    text-shadow: 0 0 5px #ccc, 0 0 15px #00a1ff;
    opacity: 0.9;
  }
  90% {
    text-shadow: 0 0 5px #ccc, 0 0 10px #00a1ff;
    opacity: 0.9;
  }
  100% {
    text-shadow: 0 0 5px #ccc, 0 0 2px #00a1ff;
    opacity: 1;
  }
}

/*小圆点加载 */
.load-wrapp {
  width: 150px;
  height: 100px;
  margin: 0 10px 10px 0;
  padding: 20px 20px 20px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  left: 57%;
  top: 30%;
}

.load-wrapp:last-child {
  margin-right: 0;
}

.line {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: rgb(223, 199, 199);
  margin-right: 10px;
  box-shadow: 0 0 5px #fff;
}

.dot_loading .line:nth-last-child(1) {
  animation: dotLoading 0.8s 0.1s linear infinite;
}
.dot_loading .line:nth-last-child(2) {
  animation: dotLoading 0.8s 0.2s linear infinite;
}
.dot_loading .line:nth-last-child(3) {
  animation: dotLoading 0.8s 0.3s linear infinite;
}

@keyframes dotLoading {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>