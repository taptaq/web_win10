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
  width: 150px;
  height: 150px;
  border: 1px solid #fff;
  border-radius: 50%;
  margin: 30px 0;
  overflow: hidden;
  background: #fff;
}

.login_wrap .avatar img {
  width: 100%;
  height: 100%;
}

.login_wrap .username {
  color: #fff;
  margin-top: -5px;
  margin-bottom: 15px;
  font-size: 20px;
}

.login_wrap .enter_password {
  position: relative;
  margin-left: -22px;
}

.login_wrap .password {
  width: 200px;
  padding: 10px;
  outline: none;
  border: none;
  padding-right: 20px;
}

.login_wrap .enter {
  position: absolute;
  right: -35px;
  bottom: 0;
  color: #fff;
  background: rgb(87, 78, 78);
  padding: 0 5px;
  cursor: pointer;
}

.login_wrap .enter .icon-forward {
  font-size: 25px;
}

/*菜单栏 */
.login_menu {
  position: absolute;
  right: 10px;
  bottom: 8px;
  width: 10%;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
}
.login_menu i {
  color: #fff;
  font-size: 25px;
  margin: 0 -5px;
}
</style>