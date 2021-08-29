<template>
  <el-header>
    <!--标题-->
    <div class="title">
      <div class="app_icon">
        <img src="@/assets/music.png" alt />
      </div>
      <div>网易云音乐</div>
    </div>

    <!--搜索框-->
    <div class="search_box">
      <div class="arrow">
        <div>
          <i class="icon-arrow-left-copy iconfont"></i>
        </div>
        <div>
          <i class="icon-arrow-left-copy-copy iconfont"></i>
        </div>
      </div>
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
    <searchTip :searchVal="searchVal" :searchSongsData="searchSongsData" :searchAlbumData="searchAlbumData" :searchSingerData="searchSingerData" :searchUserData="searchUserData"/>

    <!--用户信息部分-->
    <div class="user_box">
      <div class="user_msg">
        <div @click="showLoginWrap">
          <div class="avatar">
            <img src="@/assets/user.png" alt v-if="!$store.state.musicLogin.isLogin" />
          </div>

          <span class="username" v-if="!$store.state.musicLogin.isLogin">
            未登录
            <i class="icon-dowm iconfont down"></i>
          </span>
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
      searchSongsData:[],
      searchAlbumData:[],
      searchSingerData:[],
      searchUserData:[],
    };
  },
  components: {
    SearchTip,
  },
  methods: {
    showLoginWrap() {
      this.$store.commit("musicLogin/changeLoginWrapState", true);
    },

    // 搜索
    searchMsg(e) {
      if (this.searchVal != "") {
        // 利用axios的并发请求
        this.$axios
          .get("/api/cloudsearch?keywords=" + this.searchVal)
          .then((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>

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
  margin-left: 0.625rem;
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
}

.user_box .user_msg .avatar {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-right: 0.125rem;
  background: rgb(214, 208, 208);
  position: relative;
  top:8px
}

.user_box .user_msg .avatar img {
   position: absolute;
 top:0px;
  transform: scale(0.7);
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