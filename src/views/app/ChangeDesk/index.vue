<template>
  <div class="changDesk_body" v-show="!$store.state.monitorApp.changeDeskAppClose">
    <div class="header" @mousedown="move">
      <img src="@/assets/changeDeskbg.png" alt />
      <span>主题壁纸</span>
      <div class="closeSetting">
        <div class="minimize">
          <i class="icon-zuixiaohua iconfont"></i>
        </div>
        <div class="maxsize">
          <i class="icon-zuidahua iconfont"></i>
        </div>
        <div class="close">
          <i class="icon-guanbi iconfont" @click="closeDeskBg"></i>
        </div>
      </div>
    </div>

    <div class="content_wrapper">
      <div class="curBg">
        <span>当前壁纸</span>
        <img :src="$store.state.deskBg.curBg" alt />
      </div>

      <div class="selectBg">
        <span>可选壁纸</span>
        <div class="select_bg_wrap">
          <div class="img" v-for="item in selectBg" :key="item.id" @click="changeDeskBg">
            <img :src="item.src" alt />
          </div>

          <button class="localsele btn" >
            <input type="file" @change="selectLocal"/>
            <span class="localWrite">从本地选择</span>
          </button>

          <el-button round class="btn">
            <a
              target="_blank"
              href="https://image.baidu.com/search/index?ct=&z=&tn=baiduimage&ipn=r&word=%E5%A3%81%E7%BA%B8&pn=0&istype=2&ie=utf-8&oe=utf-8&cl=&lm=-1&st=-1&fr=&fmq=1526269427171_R&ic=0&se=&sme=&width=1680&height=1050&face=0"
            >前往图片库</a>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeDesk",
  data() {
    return {
      selectBg: [],
      showDesk: true,
    };
  },
  mounted() {
    this.$axios
      .get("https://qc39xm.fn.thelarkcloud.com/selectBg")
      .then((res) => {
        this.selectBg = res.data.data;
      });
  },

  methods: {
    //   改变壁纸
    changeDeskBg(e) {
      localStorage.setItem("deskBg", e.target.src);
      this.$store.commit("deskBg/changeDesk", e.target.src);
    },

    //   关闭主题壁纸应用
    closeDeskBg() {
      this.$store.commit("monitorApp/changDeskState", true);
    },

    // 应用的拖拽
    move(e) {
      console.log(e.target);
      let odiv = e.target.parentNode;
      if (e.target.className === "header") {
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;

        document.onmousemove = (e) => {
          let left = e.clientX - disX;
          let top = e.clientY - disY;
          if (top <= odiv.offsetHeight / 2) {
            top = odiv.offsetHeight / 2;
          } else if (left <= odiv.offsetWidth / 2) {
            left = odiv.offsetWidth / 2;
          } else if (top >= document.body.offsetHeight - 70) {
            top = document.body.offsetHeight - 70;
          } else if (left >= document.body.offsetWidth - odiv.offsetWidth / 2) {
            left = document.body.offsetWidth - odiv.offsetWidth / 2;
          }

          odiv.style.left = left + "px";
          odiv.style.top = top + "px";
        };

        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    },

    // 选择本地壁纸
    selectLocal(e) {
       let file = e.target.files[0];
      let fr = new FileReader();
      fr.readAsDataURL(file); //对图片进行base64转码
      fr.onload = (e) => {
        localStorage.setItem('deskBg',e.target.result);
        this.$store.commit("deskBg/changeDesk", e.target.result);
      };
    },
  },
};
</script>

<style scoped>
.changDesk_body {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 31.25rem;
  height: 34.375rem;
  background: #fff;
  border-radius: .3125rem;
  box-shadow: 0 0 .625rem #ccc;
  padding: .3125rem;
  z-index: 1000;
}

.changDesk_body .header {
  height: 5%;
  position: relative;
}

.changDesk_body .header span {
  position: relative;
  top: .125rem;
  left: .3125rem;
  font-weight: 700;
}

.changDesk_body .header img {
  height: 96%;
  width: 5%;
}

.changDesk_body .header .closeSetting {
  position: absolute;
  right: 0;
  top: 0;
}

.changDesk_body .header .closeSetting div {
  width: 1.125rem;
  height: 1.125rem;
  display: inline-block;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  margin-left: .3125rem;
  text-align: center;
  line-height: 1.125rem;
  cursor: pointer;
}

.changDesk_body .header .closeSetting div:hover {
  background: rgba(0, 0, 0, 0.5);
}

.changDesk_body .header .closeSetting div i {
  font-size: .8rem;
  color: #fff;
}

/*当前壁纸展示区域 */
.content_wrapper {
  width: 100%;
  height: 95%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.8);
  padding: .3125rem;
}

.content_wrapper::-webkit-scrollbar {
  width: 0;
}

.content_wrapper .curBg {
  width: 100%;
  height: 50%;
  color: #fff;
  padding-bottom: 8%;
  border-bottom: .0625rem solid rgb(156, 147, 147);
}

.content_wrapper .curBg span {
  position: relative;
  top: .125rem;
  left: .3125rem;
}

.content_wrapper .curBg img {
  margin-top: 2%;
  width: 100%;
  height: 100%;
  transform: scale(0.95);
}

.content_wrapper .selectBg {
  width: 100%;
  height: 50%;
  color: #fff;
  padding-top: .625rem;
}

.content_wrapper .selectBg span {
  position: relative;
  top: .125rem;
  left: .3125rem;
}

.content_wrapper .selectBg .select_bg_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: .3125rem;
}

.content_wrapper .selectBg .select_bg_wrap .img {
  width: 40%;
  margin: .3125rem .625rem;
  transition: all 0.2s;
}

.content_wrapper .selectBg .select_bg_wrap .img:hover {
  outline: .125rem solid rgb(223, 186, 186);
  transform: scale(1.1);
}

.content_wrapper .selectBg .select_bg_wrap .btn {
  margin: .625rem;
  width: 8.9375rem;
  height: 2.5rem;
}

.content_wrapper .selectBg .select_bg_wrap .localsele {
  border-radius: 1.25rem;
  display: inline-block;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  box-sizing: border-box;
  outline: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: .75rem 1.25rem;
  font-size: .875rem;
  position: relative;
}

.content_wrapper .selectBg .select_bg_wrap .localsele input {
  opacity: 0;
  width: 3.75rem;
  position: relative;
  top: -0.3125rem;
  z-index: 1;
  cursor: pointer;
}

.content_wrapper .selectBg .select_bg_wrap .localsele .localWrite {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>