<template>
  <div class="loading-body" ref="loading">
    <!--win10标志-->
    <i class="icon-Windows iconfont"></i>

    <!--加载部分-->
    <div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>

    <p class="use">欢迎使用WIN10系统...</p>
  </div>
</template>

<script>
export default {
  name: "loading",
  mounted() {
    setTimeout(() => {
      let loading = this.$refs.loading;
      loading.style.opacity = 0;
      loading.style.transition = "all 0.5s";
      loading.style.zIndex = "-1000";

       setTimeout(()=>{
           this.$router.push("/login");
       },200)
    }, 3000);
  },
};
</script>

<style scoped>
.loading-body {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0.4);
}

.icon-Windows {
  font-size: 250px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -95%);
  color: #1296db;
  animation: loadChange 2.5s linear infinite;
}

@keyframes loadChange {
  0% {
    text-shadow: 0 0 1px #00a1ff, 0 0 2px #00a1ff;
    opacity: 0.5;
  }
  10% {
    text-shadow: 0 0 1px #00a1ff, 0 0 10px #00a1ff;
    opacity: 0.5;
  }
  20% {
    text-shadow: 0 0 1px #00a1ff, 0 0 15px #00a1ff;
    opacity: 0.6;
  }
  30% {
    text-shadow: 0 0 1px #00a1ff, 0 0 20px #00a1ff;
    opacity: 0.6;
  }
  40% {
    text-shadow: 0 0 1px #00a1ff, 0 0 25px #00a1ff;
    opacity: 0.7;
  }
  50% {
    text-shadow: 0 0 1px #00a1ff, 0 0 30px #00a1ff;
    opacity: 0.7;
  }
  60% {
    text-shadow: 0 0 1px #00a1ff, 0 0 25px #00a1ff;
    opacity: 0.8;
  }
  70% {
    text-shadow: 0 0 1px #00a1ff, 0 0 20px #00a1ff;
    opacity: 0.8;
  }
  80% {
    text-shadow: 0 0 1px #00a1ff, 0 0 15px #00a1ff;
    opacity: 0.9;
  }
  90% {
    text-shadow: 0 0 1px #00a1ff, 0 0 10px #00a1ff;
    opacity: 0.9;
  }
  100% {
    text-shadow: 0 0 1px #00a1ff, 0 0 2px #00a1ff;
    opacity: 1;
  }
}

/*加载部分 */
.sk-chase {
  width: 50px;
  height: 50px;
  position: relative;
  left: 48%;
  top: 60%;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}

.loading-body .use {
  color: #fff;
  font-size: 30px;
  position: absolute;
  left: 38%;
  top: 75%;
  letter-spacing: 0.3rem;
  text-shadow: 0 0 5px #ccc;
}
</style>