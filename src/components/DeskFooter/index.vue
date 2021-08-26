<template>
  <div class="footer" ref="footer">
    <div class="left">
      <i class="icon-Windows iconfont" @click="showWindowMenu"></i>
      <i class="icon-yuanquan iconfont"></i>
      <i class="icon-renwuguanli1 iconfont"></i>
    </div>

    <div class="center"></div>

    <div class="right">
      <i class="icon-lianxiren iconfont"></i>
      <i class="icon-up iconfont"></i>
      <i class="icon-tubiaohezi-hisxitongtubiao- iconfont"></i>
      <i class="icon-shengyinyinliangmianxing iconfont"></i>
      <i class="icon-dianliang iconfont"></i>
      <i class="icon-jianpan iconfont"></i>
      <i class="icon-shurufa iconfont"></i>
      <div class="time">
        <p>{{hour}}:{{minute}}</p>
        <p>{{year}}/{{month}}/{{date}}</p>
      </div>
      <i class="icon-tongzhi iconfont"></i>
    </div>

    <!--windows菜单栏-->
    <div id="startMenu_wrap" ref="windowMenu">
      <div class="startMenu_left" ref="leftMenu">
        <div class="startMenu_left_item" @click="extendLeft">
          <img src="@/assets/startMenu_unfold.png" alt />
          <span>开始</span>
        </div>
        <div class="startMenu_left_item">
          <img src="@/assets/avatar.png" alt />
          <span>Taptaq</span>
        </div>
        <div class="startMenu_left_item">
          <i class="icon-wenjian iconfont"></i>
          <span>文档</span>
        </div>
        <div class="startMenu_left_item">
          <i class="icon-tupian_huaban iconfont"></i>
          <span>图片</span>
        </div>
        <div class="startMenu_left_item">
          <i class="icon-shezhi iconfont"></i>
          <span>设置</span>
        </div>
        <div class="startMenu_left_item stat_menu_power">
          <router-link tag="i" to="/closeSystem" class="icon-guanji iconfont"></router-link>
          <span>电源</span>
        </div>
      </div>

      <div class="startMenu_right">
        <div class="startMenu_right_top">
          <span>我的应用</span>
        </div>
        <div class="startMenu_right_content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deskFooter",
  data() {
    return {
      nowTime: new Date(),
      year: "",
      month: "",
      date: "",
      week: "",
      hour: "",
      minute: "",
      timer: null,
      showWindow: false, //window菜单栏显示
      showLeftMenu: false, //window菜单栏的左侧显示
      showClose: false,
    };
  },
  mounted() {
    this.showTime();
    this.timer = setInterval(() => {
      this.showTime();
    }, 1000);
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
      this.year = this.nowTime.getFullYear();
      this.month = this.nowTime.getMonth() + 1;
      this.date = this.formatting(this.nowTime.getDate());
      this.hour = this.formatting(this.nowTime.getHours());
      this.minute = this.formatting(this.nowTime.getMinutes());
      this.week = this.formatWeek(this.nowTime.getDay());
    },

    // 显示window菜单栏左侧
    extendLeft() {
      if (!this.showLeftMenu) {
        this.$refs.leftMenu.style.width = 250 + "px";
      } else {
        this.$refs.leftMenu.style.width = 48 + "px";
      }
      this.showLeftMenu = !this.showLeftMenu;
    },

    // 显示window菜单栏
    showWindowMenu() {
      if (!this.showWindow) {
        this.$refs.windowMenu.style.height = 500 + "px";
      } else {
        this.$refs.windowMenu.style.height = 0 + "px";
      }
      this.showWindow = !this.showWindow;
    },
  },
};
</script>

<style scoped>
.footer {
  height: 7%;
  width: 100%;
  background: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 .625rem;
}

.footer i {
  font-size: 1.25rem;
  display: inline-block;
}

.footer .left {
  width: 9.875rem;
}

.footer .left i {
  margin: 0 .3125rem;
  padding: .125rem .625rem;
}

.footer .right {
  width: 27%;
}

.footer .right div {
  display: inline-block;
  font-size: .75rem;
  text-align: center;
  cursor: default;
}

.footer .right i {
  position: relative;
  top: -0.3125rem;
}

.footer .right i,
.footer .right div {
  padding: .125rem .5rem;
}

.footer .left i:hover,
.footer .right i:hover,
.footer .center i:hover,
.footer .right div:hover {
  background: rgba(255, 255, 255, 0.3);
}

.footer .icon-Windows:hover {
  color: #1296db;
}

/*windows菜单栏 */
#startMenu_wrap {
  width: 20.625rem;
  height: 0;
  background: rgb(31, 31, 31);
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
  transition: all 0.2s linear;
  cursor: default;
}
#startMenu_wrap .startMenu_left {
  width: 3rem;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  overflow: hidden;
  z-index: 130;
  transition: width 0.3s linear;
  color: #fff;
  padding-bottom: 2.8125rem;
  background: #000;
}

#startMenu_wrap .startMenu_left .startMenu_left_item {
  width: 15.625rem;
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-left: .875rem;
}

#startMenu_wrap .startMenu_left .startMenu_left_item i {
  font-size: 1rem;
}

#startMenu_wrap .startMenu_left .startMenu_left_item:hover {
  background: #353535;
}
#startMenu_wrap .startMenu_left .startMenu_left_item:nth-child(1) {
  position: absolute;
  left: 0;
  top: 0;
  justify-self: start;
  margin-top: .3125rem;
}

#startMenu_wrap .startMenu_left .startMenu_left_item img {
  width: 1.1875rem;
  height: 1.1875rem;
}

#startMenu_wrap .startMenu_left .startMenu_left_item span {
  color: #ffffff;
  font-size: 1rem;
  margin-left: 1.25rem;
}

#startMenu_wrap .startMenu_right {
  width: 16.5625rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 4.0625rem;
  z-index: 120;
  display: flex;
  flex-direction: column;
}
#startMenu_wrap .startMenu_right .startMenu_right_top {
  width: 96%;
  height: 2.1875rem;
  margin: .3125rem 0 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#startMenu_wrap .startMenu_right .startMenu_right_top span {
  color: #ffffff;
  font-size: .875rem;
}
#startMenu_wrap .startMenu_right .startMenu_right_content {
  width: 98%;
  height: 37.5rem;
  margin-top: .625rem;
  overflow: scroll;
}
#startMenu_wrap .startMenu_right .startMenu_right_content::-webkit-scrollbar {
  width: .1875rem;
  height: 100%;
}
#startMenu_wrap
  .startMenu_right
  .startMenu_right_content::-webkit-scrollbar-thumb {
  width: .1875rem;
  background: #0086b3;
  border-radius: .1875rem;
}
#startMenu_wrap .startMenu_right .startMenu_right_content .startMenu_app_item {
  width: 96%;
  height: 2.1875rem;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: .625rem;
}
#startMenu_wrap
  .startMenu_right
  .startMenu_right_content
  .startMenu_app_item:hover {
  background: #353535;
}

#startMenu_wrap
  .startMenu_right
  .startMenu_right_content
  .startMenu_app_item
  .app_item_img_wrap {
  width: 2.1875rem;
  height: 2.1875rem;
  margin-right: .625rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#startMenu_wrap
  .startMenu_right
  .startMenu_right_content
  .startMenu_app_item
  .app_item_img_wrap
  img {
  width: 2rem;
  height: 2rem;
}
#startMenu_wrap
  .startMenu_right
  .startMenu_right_content
  .startMenu_app_item
  span {
  color: #ffffff;
}
</style>