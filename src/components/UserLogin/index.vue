<template>
  <div class="login_mc">
    <!--用户登录-->
    <div class="login_wrap">
      <div class="avatar">
        <img src="@/assets/avatar.png" alt />
      </div>
      <p class="username">Taptaq</p>
      <div class="enter_password">
        <input type="password" placeholder="请输入密码" class="password" />
        <router-link tag="div" to="/desk" class="enter">
          <i class="icon-forward iconfont"></i>
        </router-link>
      </div>
    </div>

    <!--菜单栏-->
    <div class="login_menu">
      <i class="icon-tubiaohezi-hisxitongtubiao- iconfont"></i>
      <i class="icon-suoping iconfont"></i>
      <i class="icon-guanji iconfont"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "userLogin",
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
  margin-bottom: .9375rem;
  font-size: 1.25rem;
}

.login_wrap .enter_password {
  position: relative;
  margin-left: -1.375rem;
}

.login_wrap .password {
  width: 12.5rem;
  padding: .625rem;
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
  padding: 0 .3125rem;
  cursor: pointer;
}

.login_wrap .enter .icon-forward {
  font-size: 1.5625rem;
}

/*菜单栏 */
.login_menu {
  position: absolute;
  right: 2.5rem;
  bottom: .5rem;
  width: 5rem;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
}
.login_menu i {
  color: #fff;
  font-size: 1.5625rem;
  margin:0 0.5rem;
}
</style>