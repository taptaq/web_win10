<template>
  <el-header>
    <!--标题-->
    <div class="title" @click="showIndexPage">
      <div class="app_icon">
        <img src="@/assets/music.png" alt />
      </div>
      <div>网易云音乐</div>
    </div>

    <!--搜索框-->
    <div class="search_box">
      <!--  
    <div class="arrow">
        <div>
          <i class="icon-arrow-left-copy iconfont"></i>
        </div>
        <div>
          <i class="icon-arrow-left-copy-copy iconfont"></i>
        </div>
      </div>
      -->
      <div class="search">
        <el-input
          placeholder="搜索"
          v-model="searchVal"
          @input="searchMsg"
          @focus="showSearchTip=true"
          @blur="showSearchTip=false"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>

    <!--搜索提示框-->
    <searchTip
      :searchVal="searchVal"
      :searchSongsData="searchSongsData"
      :searchAlbumData="searchAlbumData"
      :searchSingerData="searchSingerData"
      :searchListData="searchListData"
      v-show="showSearchTip"
    />

    <!--用户信息部分-->
    <div class="user_box">
      <div class="user_msg">
        <div @click="showLoginWrap">
          <div class="avatar" @click="showPersonalPage">
            <img :src="$store.state.musicLogin.avatarImg" alt />
          </div>

          <span class="username">
            {{$store.state.musicLogin.username}}
            <i class="icon-dowm iconfont down"></i>
          </span>

          <!--用户菜单弹出框-->
          <el-popover
            placement="bottom"
            width="280"
            trigger="click"
            content
            popper-class="logoutWrap"
            ref="logoutWrap"
          >
            <el-button slot="reference" class="logout" v-if="$store.state.musicLogin.isLogin"></el-button>
            <div>
              <div class="userMenu1">
                <div class="active">
                  <p>{{eventCount}}</p>
                  <p>动态</p>
                </div>
                <div class="follow">
                  <p>{{follows}}</p>
                  <p>关注</p>
                </div>
                <div class="fans">
                  <p>{{followeds}}</p>
                  <p>粉丝</p>
                </div>

                <div @click="signIn">
                  <i ref="signIcon" class="icon-jinbi iconfont"></i>
                  <span ref="sign">签到</span>
                </div>
              </div>

              <div class="userMenu2">
                <div>
                  <i class="icon-huiyuan iconfont"></i>
                  <span>会员中心</span>
                  <i class="icon-arrow-left-copy-copy iconfont"></i>
                </div>
                <div>
                  <i class="icon-dengji iconfont"></i>
                  <span>等级</span>
                  <span class="level">LV. {{level}}</span>
                  <i class="icon-arrow-left-copy-copy iconfont"></i>
                </div>
                <div>
                  <i class="icon-shangchang iconfont"></i>
                  <span>商场</span>
                  <i class="icon-arrow-left-copy-copy iconfont"></i>
                </div>
              </div>

              <div class="userMenu3">
                <div>
                  <i class="icon-gerenshezhi1 iconfont"></i>
                  <span>个人信息设置</span>
                  <i class="icon-arrow-left-copy-copy iconfont"></i>
                </div>
                <div>
                  <i class="icon-bangding iconfont"></i>
                  <span>绑定社交账号</span>
                  <i class="icon-arrow-left-copy-copy iconfont"></i>
                </div>
              </div>

              <div class="userMenu4" @click="logout">
                <i class="icon-tuichu iconfont"></i>
                <span>退出登录</span>
              </div>
            </div>
          </el-popover>
        </div>

        <span class="vip">开通VIP</span>
        <div class="assistIcon">
          <i class="icon-pifu53 iconfont"></i>
          <i class="icon-shezhi iconfont"></i>
          <i class="icon-youjian1 iconfont"></i>
        </div>
      </div>
      <span>|</span>
      <div class="closeSetting">
        <i class="icon-0039 iconfont"></i>
        <i class="icon-zuixiaohua iconfont"></i>
        <i class="icon-zuidahua iconfont"></i>
        <i class="icon-guanbi iconfont"></i>
      </div>
    </div>
  </el-header>
</template>

<script>
import SearchTip from "@/components/cloudMusic/Header/SearchTip";
export default {
  name: "musicHeader",
  data() {
    return {
      searchVal: "",
      showSearchTip: false,
      searchSongsData: [],
      searchAlbumData: [],
      searchSingerData: [],
      searchListData: [],
      follows: 0,
      eventCount: 0,
      followeds: 0,
      level: 0,
    };
  },
  components: {
    SearchTip,
  },

  mounted() {
    // （折腾点）
    try {
      this.userInfo = JSON.parse(window.localStorage.getItem("userOtherInfo"));
      this.follows = this.userInfo.profile.follows;
      this.eventCount = this.userInfo.profile.eventCount;
      this.followeds = this.userInfo.profile.followeds;
      this.level = this.userInfo.level;
    } catch (error) {
      console.log(error.message);
    }
  },

  methods: {
    showLoginWrap() {
      if (this.$store.state.musicLogin.isLogin === true) {
        return;
      }
      this.$store.commit("musicLogin/changeLoginWrapState", true);
    },

    // 搜索
    searchMsg(e) {
      if (this.searchVal != "") {
        // 利用axios的并发请求
        this.$axios
          .all([
            this.$axios.get(`/api/search?keywords=${this.searchVal}?type=1`),
            this.$axios.get(`/api/search?keywords=${this.searchVal}?type=10`),
            this.$axios.get(`/api/search?keywords=${this.searchVal}?type=100`),
            this.$axios.get(`/api/search?keywords=${this.searchVal}?type=1000`),
          ])

          .then(
            this.$axios.spread((obj1, obj2, obj3, obj4) => {
              // console.log(obj1.data.result.songs,obj2.data.result.songs,obj3.data.result.songs,obj4.data.result.songs);
              this.searchSongsData = obj1.data.result.songs.slice(8, 20);
              this.searchAlbumData = obj2.data.result.songs.slice(0, 8);
              this.searchSingerData = obj3.data.result.songs;
              this.searchListData = obj4.data.result.songs.slice(0, 8);
            })
          );
      }
    },

    // 签到
    async signIn() {
      let result = await this.$axios.get("/api/yunbei/sign");
      if (result.status === 200) {
        let res = await this.$axios.get("/api/yunbei/today");
        if (res.status === 200) {
          this.$refs.sign.innerText = "已签到";
          this.$refs.signIcon.style.fontSize = "0";
        }
      }
    },

    // 显示个人主页
    showPersonalPage() {
      if (this.$store.state.musicLogin.isLogin === true) {
        this.$store.state.musicPage.showPersonalPage = true;
        this.$store.state.musicPage.showIndexPage = false;
      }
    },

    // 显示音乐主页
    showIndexPage() {
      this.$store.state.musicPage.showPersonalPage = false;
      this.$store.state.musicPage.showIndexPage = true;
    },

    // 登出
    logout() {
      this.$axios.get("/api/logout").then((res) => {
        if (res.status === 200) {
          this.$message({
            message: "退出成功!",
            type: "success",
          });
          window.localStorage.removeItem("userId");
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("avatarImg");
          window.localStorage.removeItem("isLogin");
          window.localStorage.removeItem("userOtherInfo");
          this.$store.commit("musicLogin/changLoginState", false);
          // 刷新一下页面（折腾点）
          window.location.reload();
        }
      });
    },
  },
};
</script>

<style>
/* el-popover的样式*/
/*用户菜单功能区域 */
.logoutWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;
}

.logoutWrap .userMenu1 {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
}

.logoutWrap .userMenu1 div {
  width: 30%;
  margin-bottom: 15px;
}

.logoutWrap .userMenu1 div p:first-child {
  font-weight: 600;
  font-size: 25px;
}

.logoutWrap .userMenu1 div:last-child {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 6px 15px;
  line-height: 20px;
  width: 96px;
}

.logoutWrap .userMenu1 div:last-child span {
  margin-left: 5px;
}

.logoutWrap .userMenu1 div:last-child:hover,
.logoutWrap .userMenu2 div:hover,
.logoutWrap .userMenu3 div:hover,
.logoutWrap .userMenu4:hover {
  background: rgba(0, 0, 0, 0.1);
}

.logoutWrap .userMenu2 {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 -12px;
  position: relative;
}

.logoutWrap .userMenu2 .level {
  position: absolute;
  right: 29px;
  top: 57px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 700;
}

.logoutWrap .userMenu2 div,
.logoutWrap .userMenu3 div,
.logoutWrap .userMenu4 {
  padding: 8px 20px;
  padding-right: 2px;
}

.logoutWrap .userMenu2 div i,
.logoutWrap .userMenu3 div i,
.logoutWrap .userMenu4 i {
  font-size: 20px;
  margin-right: 10px;
}

.logoutWrap .userMenu2 div i:last-child,
.logoutWrap .userMenu3 div i:last-child {
  float: right;
  font-size: 12px;
  margin-top: 7px;
}

.logoutWrap .userMenu2 div span,
.logoutWrap .userMenu3 div span,
.logoutWrap .userMenu4 span {
  position: relative;
  top: -2px;
}

.logoutWrap .userMenu3 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 -12px;
}

.logoutWrap .userMenu4 {
  margin-left: -12px;
  margin-right: -12px;
}
</style>

<style scoped>
/*头部 */
.el-header {
  background-color: rgb(236, 65, 65);
  color: #333;
  line-height: 3.5rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

/**头部的标题部分 */
.el-header .title {
  width: 8.125rem;
  height: 100%;
}

.el-header .title div {
  display: inline-block;
}

.el-header .title .app_icon {
  width: 1.875rem;
  height: 1.875rem;
  margin-right: 0.625rem;
}

.el-header .title .app_icon img {
  width: 100%;
  height: 100%;
}

.el-header .title div:nth-child(2) {
  position: relative;
  top: 2px;
  font-weight: 550;
  font-size: 1.125rem;
  color: #fff;
}

/*头部的搜索部分 */
.search_box {
  width: 15.625rem;
  height: 100%;
  margin-right: 3.5rem;
  line-height: 3.7rem;
}

.search_box div {
  display: inline-block;
}

.search_box .arrow div {
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 50%;
  color: #fff;
  margin: 0 0.125rem;
}

.search_box .arrow div:hover {
  background: rgba(0, 0, 0, 0.5);
}

.search_box .arrow div i {
  font-size: 0.75rem;
}

.search_box .search {
  width: 10.875rem;
  margin-left: 1.5rem;
}

.search_box .search .el-input__icon {
  position: relative;
  top: 0.125rem;
}

.search_box .search /deep/ .el-input .el-input__inner {
  border-radius: 1.5625rem;
  background: rgba(0, 0, 0, 0.1);
  height: 2.125rem;
  outline: none;
  border: none;
  color: #fff;
}

/*头部的用户信息部分 */
.user_box {
  width: 25rem;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  font-size: 0.875rem;
  position: relative;
  left: 0.9375rem;
}

.user_box div {
  display: inline-block;
}

.user_box .user_msg {
  width: 16.25rem;
  position: relative;
}

.user_box .user_msg .avatar {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-right: 0.125rem;
  background: rgb(230, 223, 223);
  position: relative;
  top: 8px;
  overflow: hidden;
}

.user_box .user_msg .avatar img {
  position: absolute;
  top: 0px;
  transform: scale(1);
}

.user_box .user_msg .username,
.user_box .user_msg .vip,
.user_box i {
  color: rgba(255, 255, 255, 0.6);
}

.user_box .user_msg .username:hover,
.user_box .user_msg .vip:hover,
.user_box .user_msg .username:hover i {
  color: #fff;
}

.user_box .user_msg .username i {
  margin-left: -2px;
}

.user_box .user_msg .down {
  position: relative;
  top: 0.125rem;
  left: -0.1875rem;
}

.user_box .user_msg .logout {
  position: absolute;
  left: 32px;
  top: 16px;
  width: 20%;
  opacity: 0;
}

.user_box .user_msg .vip {
  margin-left: 0.2rem;
  position: relative;
  top: 0.0625rem;
}

.user_box .user_msg .assistIcon {
  position: relative;
  top: 0.0625rem;
  left: 1.6rem;
}

.user_box .user_msg .assistIcon i {
  margin: 0.125rem 0.625rem 0 0;
}

.user_box .user_msg .assistIcon i:last-child {
  font-size: 1.1875rem;
  position: relative;
  top: 0.0625rem;
}

.user_box .closeSetting {
  margin-left: 0.625rem;
  margin-top: 0.125rem;
}

.user_box .closeSetting i:first-child {
  position: relative;
  top: -1px;
}

.user_box .closeSetting i {
  margin: 0.125rem 0.9375rem 0 0;
}
</style>

