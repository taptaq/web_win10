<template>
  <div class="login_mc">
    <!--用户登录-->
    <div class="login_wrap">
      <div class="avatar">
        <img src="@/assets/avatar.png" alt />
      </div>
      <p class="username">Taptaq</p>
      <div class="enter_password">
        <input type="password" v-model="password" placeholder="请输入密码" class="password" />
        <router-link tag="div" class="enter" to="/desk">
          <i class="icon-forward iconfont"></i>
        </router-link>
      </div>

      <div class="passwordTip">密码提示：123456</div>
    </div>

    <!--菜单栏-->
    <div class="login_menu">
      <i class="icon-tubiaohezi-hisxitongtubiao- iconfont"></i>
      <router-link to="/login/lock">
        <i class="icon-suoping iconfont"></i>
      </router-link>

      <i class="icon-guanji iconfont"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "userLogin",
  data() {
    return {
      password: "",
    };
  },

  // 离开该登录组件前，要先校验密码是否正确，正确才可跳转到桌面
  beforeRouteLeave(to, from, next) {
    if (to.path==='/desk' && this.password === "123456") {
      next();
    }else if(to.path==='/login/lock'){
      next();
    }
     else {
      this.$message.error("密码错误");
    }
  },
};
</script>

<style scoped>
.login_mc {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_wrap {
  width: 30%;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.login_wrap .avatar {
  width: 9.375rem;
  height: 9.375rem;
  border: 1px solid #fff;
  border-radius: 50%;
  margin: 1.875rem 0;
  overflow: hidden;
  background: #fff;
}

.login_wrap .avatar img {
  width: 100%;
  height: 100%;
}

.login_wrap .username {
  color: #fff;
  margin-top: -0.3125rem;
  margin-bottom: 0.9375rem;
  font-size: 1.25rem;
}

.login_wrap .enter_password {
  position: relative;
  margin-left: -1.375rem;
}

.login_wrap .password {
  width: 12.5rem;
  padding: 0.625rem;
  outline: none;
  border: none;
  padding-right: 1.25rem;
}

.login_wrap .enter {
  position: absolute;
  right: -2.1875rem;
  bottom: 0;
  color: #fff;
  background: rgb(87, 78, 78);
  padding: 0 0.3125rem;
  cursor: pointer;
}

.login_wrap .enter .icon-forward {
  font-size: 1.5625rem;
}

/*菜单栏 */
.login_menu {
  position: absolute;
  right: 2.5rem;
  bottom: 0.5rem;
  width: 5rem;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
}
.login_menu i {
  color: #fff;
  font-size: 1.5625rem;
  margin: 0 0.5rem;
}

/*密码提示*/
.passwordTip {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin-top: 10px;
}
</style>