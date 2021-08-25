<template>
  <div class="login_body">
    <!--登录壁纸-->
    <div class="lock_bg">
      <img src="@/assets/loginbg.jpg" alt="锁屏页背景" />
    </div>

     <!--锁屏页面的显示-->
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOutUpBig"
    >
      <router-view name="lock" />
    </transition>

    <!--登录页面的显示-->
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOutUpBig"
    >
      <router-view name="login" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "login",
};
</script>

<style scoped>
.login_body {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200;
  transition: opacity 0.3s;
}

.login_body .lock_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transform: scale(1);
  transition: all 0.3s;
}

.login_body .lock_bg img {
  width: 100%;
  height: 100%;
}
</style>