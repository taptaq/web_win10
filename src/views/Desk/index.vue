<template>
  <div
    class="desk_body"
    @contextmenu.prevent="showRightMenu($event)"
    @click="showRight=false"
    ref="desk"
  >
    <!--桌面壁纸-->
    <div class="desk_bg">
      <img src="@/assets/deskbg.jpg" alt="桌面背景" />
    </div>

    <div class="app_body">
      <ul class="app_wrap" ref="app">
        <li class="app">
          <img src="@/assets/app1.png" alt />
          <p>文件管理</p>
        </li>

        <li class="app">
          <img src="@/assets/app2.png" alt />
          <p>我的电脑</p>
        </li>

        <li class="app">
          <img src="@/assets/app3.png" alt />
          <p>记事本</p>
        </li>

        <li class="app">
          <img src="@/assets/cloudmusic.png" alt />
          <p>网易云音乐</p>
        </li>

        <li class="app">
          <img src="@/assets/wechat.png" alt />
          <p>微信</p>
        </li>
      </ul>
    </div>

    <!--右键菜单功能栏-->
    <div v-show="showRight" class="rightMenu" ref="rightMenu">
      <ul>
        <li>
          <i class="icon-wenjianguanli iconfont"></i>
          新建文件夹
        </li>
        <li>查看</li>
        <li>排序方式</li>
        <li>刷新</li>
      </ul>
    </div>

   

    <!--桌面尾部-->
    <DeskFooter />
  </div>
</template>

<script>
import DeskFooter from "@/components/DeskFooter";
export default {
  name: "desk",
  data() {
    return { 
      showRight: false,   //鼠标右键菜单栏显示
      
    };
  },
  components: {
    DeskFooter,
  },
  mounted() {
    //   为每个应用添加动画
    this.$refs.app.children.forEach((item) => {
      item.addEventListener("mouseenter", (e) => {
        e.target.classList.add("animate__animated", "animate__jello");
        setTimeout(() => {
          e.target.classList.remove("animate__animated", "animate__jello");
        }, 500);
      });
    });
  },
  methods: {
    showRightMenu(e) {
      let x = e.pageX;
      let y = e.pageY;
      if (y + this.$refs.rightMenu.offsetHeight < document.body.offsetHeight) {
        this.$refs.rightMenu.style.left = x + "px";
        this.$refs.rightMenu.style.top = y + "px";
        this.showRight = true;
      } else {
        this.$refs.rightMenu.style.left = x + "px";
        this.$refs.rightMenu.style.top =
          y +
          this.$refs.rightMenu.offsetHeight -
          document.body.offsetHeight +
          (y - document.body.offsetHeight) +
          "px";
        this.showRight = true;
      }
    },

  },
};
</script>

<style scoped>
.desk_body {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200;
  transition: opacity 0.3s;
  overflow: hidden;
}

.desk_body .desk_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transform: scale(1);
  transition: all 0.3s;
}

.desk_body .desk_bg img {
  width: 100%;
  height: 100%;
}

/*桌面应用 */
.app_body {
  width: 100%;
  height: 93%;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 20px;
  display: flex;
  font-size: 12px;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  z-index: -1;
  position: relative;
}

.app_body .app_wrap {
  margin-right: -165px;
  height: 105%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.app_body .app {
  width: 80px;
  height: 70px;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s;
  margin-top: 10px;
  cursor: default;
}

.app_body .app:hover {
  background: rgba(156, 148, 148, 0.5);
  box-shadow: inset 0 0 3px #fff;
}

.app_body .app img {
  width: 55%;
  height: 55%;
}

.app_body .app p {
  margin-top: 10px;
}

/*右键菜单栏 */
.rightMenu {
  width: 15%;
  height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgb(238, 231, 231);
  text-align: left;
  z-index: 1000;
}

.rightMenu ul li {
  padding: 5px 10px;
  border-bottom: 1px solid #000;
  cursor: default;
}

.rightMenu ul li:hover {
  background: #ccc;
}


</style>