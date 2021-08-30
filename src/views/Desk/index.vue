<template>
  <div
    class="desk_body"
    @contextmenu.prevent="showRightMenu($event)"
    @click="showRight=false"
    ref="desk"
  >
    <!--桌面壁纸-->
    <div class="desk_bg">
      <img :src="$store.state.deskBg.curBg" alt="桌面背景" />
    </div>

    <!--存放app-->
    <div class="app_body" ref="appBody">
      <div v-for="item in appData" :key="item.id" class="app" :data-appId="item.id">
        <img :src="item.img" alt :data-appId="item.id" />
        <p :data-appId="item.id">{{item.name}}</p>
      </div>
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
        <li>个性化</li>
      </ul>
    </div>

    <!--桌面尾部-->
    <DeskFooter ref="deskFooter" />

    <!--应用打开后的位置-->
    <div class="app_open_wrap">
      <ChangeDesk/>
      <CloudMusic/>
    </div>
  </div>
</template>

<script>
import DeskFooter from "@/components/DeskFooter";
import ChangeDesk from "@/views/app/ChangeDesk";
import CloudMusic from "@/views/app/CloudMusic"
export default {
  name: "desk",
  data() {
    return {
      showRight: false, //鼠标右键菜单栏显示
      curApp: "", //当前拖拽的app
      appData: [],
      showAppWrap: false,
    };
  },
  components: {
    DeskFooter,
    ChangeDesk,
    CloudMusic
  },

  mounted() {
    // 请求app应用数据
    this.$axios
      .get("https://qc39xm.fn.thelarkcloud.com/appData")
      .then((res) => {
        if (res.status === 200) {
          this.appData = res.data.appData;
        }

        // 数据请求成功后继续对应用操作
        // 为每个应用添加动画
        this.$nextTick(() => {
          let apps = this.$refs.appBody.children;
          apps.forEach((item) => {
            // console.log(item);
            item.addEventListener("mouseenter", (e) => {
              e.target.classList.add("animate__animated", "animate__jello");
              setTimeout(() => {
                e.target.classList.remove(
                  "animate__animated",
                  "animate__jello"
                );
              }, 500);
            });
          });

          // 拖拽app的拖拽
          // 为每个应用添加拖拽事件
          apps.forEach((item) => {
            let that = this;
            item.setAttribute("draggable", true);
            item.ondragstart = function () {
              that.curApp = this;
            };
          });

          // 为存放app的容器添加相关的鼠标事件
          this.$refs.appBody.addEventListener("dragover", (e) => {
            e.preventDefault();
          });
          this.$refs.appBody.addEventListener("drop", (e) => {
            this.curApp.style.position = "absolute";
            this.curApp.style.left =
              e.pageX - this.curApp.offsetWidth / 2 + "px";
            this.curApp.style.top =
              e.pageY - this.curApp.offsetHeight / 2 + "px";
          });

          // 为每个应用添加双击事件
          apps.forEach((item) => {
            item.addEventListener("dblclick", (e) => {
              if (e.target.tagName === "IMG") {
                let appId = e.target.dataset.appid;
                if (appId === '3') {
                  this.$store.commit("monitorApp/changDeskState", false);
                  let obj={id:appId,src:e.target.src};
                  this.$store.commit("opendApp/addOpendApp", obj);
                }

                if (appId === "5") {
                  let obj={id:appId,src:e.target.src};
                  this.$store.commit("opendApp/addOpendApp", obj);
                }
              }
            });
          });
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
  padding: 0.625rem;
  padding-top: 0.3125rem;
  padding-bottom: 1.25rem;
  display: flex;
  font-size: 0.75rem;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: -1;
  position: relative;
}

.app_body .app {
  width: 5rem;
  height: 4.375rem;
  padding: 0.3125rem;
  border-radius: 0.3125rem;
  transition: all 0.3s;
  margin-top: 0.625rem;
  cursor: default;
}

.app_body .app:hover {
  background: rgba(156, 148, 148, 0.5);
  box-shadow: inset 0 0 0.1875rem #fff;
}

.app_body .app img {
  width: 2.375rem;
  height: 2.125rem;
}

.app_body .app p {
  margin-top: 0.625rem;
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
  padding: 0.3125rem;
  border-radius: 10px;
}

.rightMenu ul li {
  padding: 0.3125rem 0.625rem;
  border-bottom: 1px solid #000;
  cursor: default;
}

.rightMenu ul li:hover {
  background: #ccc;
}
</style>