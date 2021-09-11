<template>
  <div class="login_wrap">
    <div class="close" @click="closeLoginWrap">
      <i class="icon-guanbi iconfont"></i>
    </div>
    <div class="loginIcon">
      <i class="icon-login_phone iconfont"></i>
      <img src="@/assets/loginIcon.png" alt />
    </div>
    <!--手机密码登录-->
    <el-form ref="form" :model="form" label-width="80px" v-if="passwordLogin">
      <el-form-item label="手机号码">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="verifyPassword" class="loginBtn">登录</el-button>
      </el-form-item>
    </el-form>

    <!--手机验证码登录-->
    <el-form ref="form" :model="form" label-width="80px" v-else-if="!passwordLogin">
      <el-form-item label="手机号码">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>

      <el-form-item label="验证码" class="verify">
        <el-input v-model="form.captcha"></el-input>
        <el-button type="primary" @click="sendVerify" class="sendVerify" ref="verifyBtn">发送验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="verifyCaptcha" class="loginBtn">登录</el-button>
      </el-form-item>
    </el-form>

    <div class="changLoginMethod" @click="changLoginMethod">切换到{{passwordLogin ? '验证码':'密码'}}登录>></div>
  </div>
</template>

<script>
export default {
  name: "loginWrap",
  data() {
    return {
      form: {
        phoneNumber: "",
        captcha: "",
        type: [],
        password: "",
      },
      timer: null,
      passwordLogin: true,
    };
  },
  methods: {
    //   关闭登录界面
    closeLoginWrap() {
      this.$store.commit("musicLogin/changeLoginWrapState", false);
    },

    // 发送验证码
    sendVerify() {
      this.$axios
        .get(`${process.env.VUE_APP_BASE_API}/captcha/sent`, {
          params: {
            phone: this.form.phoneNumber,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            let count = 0;
            let btn = this.$refs.verifyBtn.$vnode.elm.children[0];
            this.timer = setInterval(() => {
              count++;
              btn.innerText = count + "秒后重新发送";
              if (count > 59) {
                clearInterval(this.timer);
                btn.innerText = "发送验证码";
              }
            }, 1000);
          }
        });
    },

    // 校验验证码
    verifyCaptcha() {
      let timestamp = Date.parse(new Date());
      this.$axios
        .get(
          `${process.env.VUE_APP_BASE_API}/captcha/verify?phone=${this.form.phoneNumber}&captcha=${this.form.captcha}&timestamp=${timestamp}`
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$message({
              message: "登录成功!",
              type: "success",
            });
            window.localStorage.setItem("isLogin", true);
            this.getUserMsg();
          }
        });

      // 清空输入框的内容
      this.form.phoneNumber = "";
      this.form.captcha = "";
    },

    //   手机登录请求
    async verifyPassword() {
      let timestamp = Date.parse(new Date());
      let result = await this.$axios.get(
        `${process.env.VUE_APP_BASE_API}/login/cellphone?phone=${this.form.phoneNumber}&password=${this.form.password}&timestamp=${timestamp}`
      );
      // 登录成功
      if (result.data.code == 200) {
        this.$message({
          message: "登录成功!",
          type: "success",
        });
        window.localStorage.setItem("isLogin", true);
        this.getUserMsg();
      } else if (result.data.code == 400) {
        // 手机号错误
        this.$message.error("手机号错误!");
        return;
      } else if (result.data.code == 502) {
        // 密码错误
        this.$message.error("密码错误!");
        return;
      } else {
        this.$message.error("登录失败，请稍后重试!");
        return;
      }
      // 清空输入框的内容
      this.form.phoneNumber = "";
      this.form.password = "";
    },

    // 获取用户基本信息
    async getUserMsg() {
      // 修改vuex中的登录状态
      this.$store.commit("musicLogin/changLoginState", true);
      this.$store.commit("musicLogin/changeLoginWrapState", false);
      let timestamp = Date.parse(new Date());
      let result = await this.$axios.get(
        `${process.env.VUE_APP_BASE_API}/user/account?timestamp=${timestamp}`
      );
      // if (result.status === 200) {
      // console.log(result);
      let userProfile = result.data.profile;
      // 将请求到的用户id存入localstorage
      window.localStorage.setItem("userId", userProfile.userId);
      window.localStorage.setItem("username", userProfile.nickname);
      window.localStorage.setItem("avatarImg", userProfile.avatarUrl);

      this.$store.commit("musicLogin/changeUserName", userProfile.nickname);
      this.$store.commit("musicLogin/changeAvatarImg", userProfile.avatarUrl);

      this.getUserDetailMsg();
      // }
    },

    // 获取用户详情信息
    async getUserDetailMsg() {
      let timestamp = Date.parse(new Date());
      let result = await this.$axios.get(
        `${
          process.env.VUE_APP_BASE_API
        }/user/detail?uid=${window.localStorage.getItem(
          "userId"
        )}&timestamp=${timestamp}`
      );
      if (result.status === 200) {
        console.log(result.data);
        window.localStorage.setItem(
          "userOtherInfo",
          JSON.stringify(result.data)
        );
      }
      // 刷新一下页面（折腾点）
      // window.location.reload();
    },

    //切换登录方式
    changLoginMethod() {
      this.passwordLogin = !this.passwordLogin;
    },
  },
};
</script>

<style scoped>
.login_wrap {
  width: 17.375rem;
  height: 24rem;
  background: #fff;
  box-shadow: 0 0 0.5rem #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0.3125rem;
}

.login_wrap .close {
  position: absolute;
  right: 0.3125rem;
  top: 0.3125rem;
  cursor: pointer;
  z-index: 1;
}

.login_wrap .close i {
  font-size: 1.125rem;
}

.login_wrap .loginIcon {
  width: 100%;
  height: 8.125rem;
  position: relative;
  top: 50%;
  transform: translateY(-135%);
  margin-bottom: 1.875rem;
  text-align: center;
}

.login_wrap .loginIcon i {
  font-size: 5.9375rem;
  color: rgba(236, 65, 65, 0.8);
}

.login_wrap .loginIcon img {
  width: 17%;
  height: 38%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_wrap .el-form {
  width: 100%;
  height: 80%;
  transform: scale(0.8);
}

.login_wrap .verify {
  position: relative;
}

.login_wrap .sendVerify {
  position: absolute;
  right: 0;
  top: 0.125rem;
  width: 56%;
  height: 93%;
}

.login_wrap .verify .el-button {
  padding: 0;
}

.login_wrap .el-form .autoLogin {
  position: relative;
  left: -3.3125rem;
}

.login_wrap .el-form .autoLogin .el-checkbox {
  color: rgba(236, 65, 65, 0.8);
}

.login_wrap /deep/ .el-checkbox__input.is-checked + .el-checkbox__label,
.login_wrap /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.login_wrap /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  color: rgba(236, 65, 65, 0.8);
  outline: none;
  border: none;
}

.login_wrap /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.login_wrap /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: rgba(236, 65, 65, 0.8);
}

.login_wrap .loginBtn {
  width: 70%;
  font-size: 1.125rem;
  background: rgb(236, 65, 65);
  outline: none;
  border: 0;
}

.changLoginMethod {
  color: slateblue;
  text-align: center;
  margin-bottom: 15px;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  left: 8px;
}

.changLoginMethod:hover {
  color: blue;
}
</style>