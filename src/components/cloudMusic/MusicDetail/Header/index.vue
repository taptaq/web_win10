<template>
  <el-header>
    <!--标题-->
    <div class="title">
      <i class="icon-arrowdown iconfont" @click="toMusicIndex"></i>
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
          @input="searchMsgDebounce"
          @focus="showSearchTip=true"
          @blur="showSearchTip=false"
          @keyup.enter.native="detailSearch"
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
import bus from "@/utils/bus"; //引入总线bus
import { methods as utils } from "@/utils";
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
    // 防抖搜索(普通)
    searchMsgDebounce: utils.debounce(function () {
      if (this.searchVal != "") {
        // 利用axios的并发请求
        this.$axios
          .all([
            this.$axios.get(`/api/search?keywords=${this.searchVal}&type=1`), //单曲
            this.$axios.get(`/api/search?keywords=${this.searchVal}&type=10`), //专辑
            this.$axios.get(`/api/search?keywords=${this.searchVal}&type=100`), //歌手
            this.$axios.get(`/api/search?keywords=${this.searchVal}&type=1000`), //歌单
          ])

          .then(
            this.$axios.spread((obj1, obj2, obj3, obj4) => {
              // console.log(
              //   obj1.data.result,
              //   obj2.data.result,
              //   obj3.data.result,
              //   obj4.data.result
              // );
              this.searchSongsData = obj1.data.result.songs.slice(0, 10);
              this.searchAlbumData = obj2.data.result.albums.slice(0, 10);
              this.searchSingerData = obj3.data.result.artists.slice(0, 2);
              this.searchListData = obj4.data.result.playlists.slice(0, 5);
            })
          );
      }
    }, 800),

    // 详细搜索跳转到搜索结果页面
    detailSearch() {
      if (this.searchVal != "") {
        bus.$emit("searchVal", this.searchVal);
        this.$store.commit("musicPage/changeShowIndex", false);
        this.$store.commit("musicPage/changeShowPersonal", false);
        this.$store.commit("musicPage/changeShowSearch", true);
      }
    },

    // 跳转到音乐主页
    toMusicIndex(){
      this.$store.commit("musicPage/changeShowIndex", true);
      this.$store.commit("musicPage/changeShowPersonal", false);
      this.$store.commit("musicPage/changeShowSearch", false);
      this.$store.commit("musicPage/changeShowSongDetail", false);
    }
  },
};
</script>


<style scoped>
/*头部 */
.el-header {
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

.el-header .title i {
  font-size: 25px;
  position: relative;
  top: 2px;
  left: 3px;
}

/*头部的搜索部分 */
.search_box {
  width: 15.625rem;
  height: 100%;
  margin-right: 3.5rem;
  line-height: 3.7rem;
  position: relative;
  top: 2px;
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
  color: rgba(0, 0, 0, 0.8);
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
  color: rgba(0, 0, 0, 0.8);
}

.search_box .search /deep/ .el-input .el-input__inner {
  border-radius: 1.5625rem;
  background: rgba(0, 0, 0, 0.1);
  height: 2.125rem;
  outline: none;
  border: none;
  color: rgba(0, 0, 0, 0.8);
}

/*头部的用户信息部分 */
.user_box {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.875rem;
  position: relative;
  left: 0.9375rem;
}

.user_box div {
  display: inline-block;
}

.user_box .user_msg {
  width: 7.25rem;
  position: relative;
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

