<template>
  <div class="lock_body" ref="lock">
    <!--显示时间-->
    <div class="lock_clock_wrap">
      <div class="lock_time">{{hour}}:{{minute}}</div>
      <div class="lock_date">
        {{month}}月{{date}}日，
        <span>{{week}}</span>
      </div>
    </div>

    <!--菜单栏-->
    <div class="lock_menu">
      <i class="icon-tubiaohezi-hisxitongtubiao- iconfont"></i>
      <i class="icon-dianliang iconfont"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "lock",
  data() {
    return {
      nowTime: new Date(),
      month: "",
      date: "",
      week: "",
      hour: "",
      minute: "",
      timer: null,
    };
  },
  mounted() {
    this.showTime();
    this.timer = setInterval(() => {
      this.showTime();
    }, 1000);
    this.$refs.lock.addEventListener("click", () => {
      this.$router.push("/login/userLogin");
    });
  },

  beforeDestroy() {
    clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
  },

  methods: {
    //   格式化星期数
    formatWeek(value) {
      switch (value) {
        case 0:
          return "星期日";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        default:
          return "";
      }
    },

    // 格式化时间(位数处理)
    formatting(value) {
      if (value < 10) {
        return "0" + value;
      } else {
        return value;
      }
    },

    // 显示时间
    showTime() {
      this.nowTime = new Date();
      this.month = this.nowTime.getMonth() + 1;
      this.date = this.formatting(this.nowTime.getDate());
      this.hour = this.formatting(this.nowTime.getHours());
      this.minute = this.formatting(this.nowTime.getMinutes());
      this.week = this.formatWeek(this.nowTime.getDay());
    },
  },
};
</script>

<style>
.lock_body {
  width: 100%;
  height: 100%;
}

/*日期部分 */
.lock_clock_wrap {
  position: absolute;
  width: 450px;
  height: 220px;
  left: 0;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  margin-left: 25px;
  transition: transform 0.3s ease;
}
.lock_clock_wrap .lock_time {
  display: flex;
  font-size: 100px;
  width: 100%;
  height: 140px;
  padding-top: 20px;
  box-sizing: border-box;
  font-weight: 300;
}
.lock_clock_wrap .lock_date {
  display: flex;
  width: 100%;
  height: 70px;
  font-size: 45px;
}

/*菜单栏 */
.lock_menu {
  position: absolute;
  right: 10px;
  bottom: 8px;
  width: 10%;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
}
.lock_menu i {
  color: #fff;
  font-size: 25px;
  margin: 0 -18px;
}
</style>