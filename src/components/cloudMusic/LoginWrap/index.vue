<template>
  <div class="login_wrap">
    <div class="close" @click="closeLoginWrap">
      <i class="icon-guanbi iconfont"></i>
    </div>
    <div class="loginIcon">
      <i class="icon-login_phone iconfont"></i>
      <img src="@/assets/loginIcon.png" alt />
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="手机号码">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <!--
      <el-form-item label="验证码" class="verify">
        <el-input v-model="form.verify"></el-input>
        <el-button type="primary" @click="sendVerify" class="sendVerify" ref="verifyBtn">发送验证码</el-button>
      </el-form-item>
      -->

      <el-form-item class="autoLogin">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="自动登录" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login" class="loginBtn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "loginWrap",
  data() {
    return {
      form: {
        phoneNumber: "",
        verify: "",
        type: [],
        password:""
      },
      timer: null,
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
        .get("https://cloud-music-liard.vercel.app/captcha/sent", {
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

    // 登录
    // login() {
    //   this.$axios
    //     .post("https://cloud-music-liard.vercel.app/captcha/verify", {
    //       phone: this.form.phoneNumber,
    //       captcha: this.form.verify,
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log(res);
    //       }
    //     })
    //     .then(() => {
    //       this.$axios
    //         .get("https://cloud-music-liard.vercel.app/login/refresh")
    //         .then((res) => {
    //           if (res.status === 200) {
    //             console.log(res);
    //           }
    //         });
    //     });
    // },


    //   手机登录请求
    async login() {
      let timestamp = Date.parse(new Date());
      let result = await this.$axios.get("/api/login/cellphone", {
        phone: this.form.phoneNumber,
        password: this.form.password,
        withCredentials: true,
        timestamp,
      });
      // 登录成功
      if (result.data.code == 200) {
        // 将请求到的用户id存入localstorage
        // window.localStorage.setItem("userId", result.data.profile.userId);
        // this.userInfo = result.data.profile;
        // this.isPopoverShow = false;
        // this.$message.success("登录成功!");
        // 刷新页面
        // this.$router.go(0);
        // 修改vuex中的登录状态
        // this.$store.commit("updataLoginState", true);
        // this.$store.commit("updateCurrentUserId", result.data.profile.userId);
        console.log('登陆成功')
      } else if (result.data.code == 400) {
        // 手机号错误
        // this.$message.error("手机号错误!");
        console.log('手机号错误');
        return;
      } else if (result.data.code == 502) {
        // 密码错误
        // this.$message.error("密码错误!");
        console.log('密码错误');
        return;
      } else {
        // 登录失败，请稍后重试
        // this.$message.error("登录失败，请稍后重试!");
        console.log("登录失败，请稍后重试!");
        return;
      }

      // 清空输入框的内容
    //   this.loginForm.password = "";
    //   this.loginForm.phoneNum = "";
    },



  },
};
</script>

<style scoped>
.login_wrap {
  width: 30%;
  height: 75%;
  background: #fff;
  box-shadow: 0 0 8px #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 5px;
}

.login_wrap .close {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

.login_wrap .close i {
  font-size: 18px;
}

.login_wrap .loginIcon {
  width: 100%;
  height: 130px;
  position: relative;
  top: 50%;
  transform: translateY(-135%);
  margin-bottom: 30px;
  text-align: center;
}

.login_wrap .loginIcon i {
  font-size: 95px;
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
  top: 2px;
  width: 56%;
  height: 93%;
}

.login_wrap .verify .el-button {
  padding: 0;
}

.login_wrap .el-form .autoLogin {
  position: relative;
  left: -53px;
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
  font-size: 18px;
  background: rgb(236, 65, 65);
  outline: none;
  border: 0;
}
</style>