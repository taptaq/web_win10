<template>
  <div class="loading-body" ref="loading">
    <!--win10标志-->
    <i class="icon-Windows iconfont"></i>

    <Load />

    <p class="use">欢迎使用WIN10系统</p>
  </div>
</template>

<script>
import Load from "@/components/Load";
export default {
  name: "loading",
  components: {
    Load,
  },
  mounted() {
    setTimeout(() => {
      let loading = this.$refs.loading;
      loading.style.opacity = 0;
      loading.style.transition = "all 0.5s";
      loading.style.zIndex = "-1000";

      setTimeout(() => {
        this.$router.push("/login");
      }, 200);
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