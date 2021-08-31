<template>
  <el-footer height="72px">
    <!-- <audio
      :src="musicUrl"
      ref="audioPlayer"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
    ></audio>-->

    <audio
      :src="musicUrl"
      ref="audioPlayer"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @timeupdate="timeupdate"
    ></audio>

    <div class="left">
      <div class="img">
        <img src="@/assets/cloudmusic.png" alt />
      </div>

      <div class="songMsg">
        <p>
          天外来物
          <i class="icon-xihuan iconfont"></i>
        </p>
        <p>薛之谦</p>
      </div>
    </div>
    <div class="center">
      <div class="controls">
        <i class="icon-biao- iconfont"></i>
        <i class="icon-music-pre iconfont"></i>

        <i v-if="$store.state.musicPlay.isPlay" class="icon-zantingtingzhi iconfont" @click="pauseMusic"></i>
        <i v-else class="icon-bofang iconfont" @click="playMusic"></i>

        <i class="icon-music-next iconfont"></i>
        <div>词</div>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{currentTimeNum || '00:00'}}</span>
        <!-- :value 是单向的  要实现双向要v-model -->
        <!-- <el-slider
          class="progressSlider"
          v-model="timeProgress"
          :show-tooltip="false"
          @change="changeProgress"
        ></el-slider>-->

        <el-slider class="progressSlider" v-model="timeProgress" :show-tooltip="false"></el-slider>
        <span class="totalTime">{{$store.state.musicPlay.curMuiscDuration || '00:00'}}</span>
      </div>
    </div>
    <div class="right">
      <div class="standard">标准</div>
      <i class="icon-ttpodicon iconfont"></i>
      <i class="icon-shengyinyinliangmianxing iconfont"></i>
      <div @click="changeShowDrawer">
        <i class="icon-bofangliebiao iconfont"></i>
      </div>
    </div>

    <!-- 播放歌单 -->
    <el-drawer
      :visible.sync="showDrawer"
      :with-header="false"
      width="300"
      :modal="false"
      :direction="direction"
    >
      <div class="drawerHeader">
        <p>当前播放</p>
        <p>总{{ musicList.length }}首</p>
      </div>
      <el-table
        :data="musicList"
        stripe
        style="width: 100%"
        :show-header="false"
        highlight-current-row
        lazy
      >
        <el-table-column prop="name" width="150px"></el-table-column>
        <el-table-column prop="ar[0].name" width="80px"></el-table-column>
        <el-table-column prop="dt" width="70px"></el-table-column>
      </el-table>
    </el-drawer>
  </el-footer>
</template>

<script>
import { methods as utils } from "@/utils";
export default {
  name: "musicFooter",
  data() {
    return {
      direction: "rtl",
      musicDetail: {},
      progress: 1,
      musicUrl: "",
      musicList: [],
      likeMuiscList: [],
      showDrawer: false,
      timeProgress: 0, //音乐播放的进度条位置
      curMusicIndex: 0,
      durationNum: 0, //音乐的播放总秒数
      currentTime: 0, // 当前播放时间位置
      lastSecond: 0, //上次播放时的秒数
    };
  },

  computed:{
    currentTimeNum(){
      return utils.formatMusicTime(this.currentTime);
    }
  },

  watch: {
    // 监听播放音乐地址的变化
    "$store.state.musicPlay.curMusicId"(id) {
      this.pauseMusic(); // 先暂停当前播放的音乐
      this.musicList = this.$store.state.musicPlay.curMuiscList; //更新当前的播放列表
      this.getMusicDetailFromMusicList(); //重新获取列表中音乐的详细数据
      this.getMusicDetailData(id); //获取到对应音乐的url
      this.durationNum=utils.returnSecond(this.$store.state.musicPlay.curMuiscDuration);
      console.log(this.durationNum);
      // 判断用户是否喜欢当前音乐
      // this.getIsUserLikeCurrentMusic();
    },

    // 监听curMusicIndex的变化
    "$store.state.curMusicIndex"(currentIndex, lastIndex) {
      if (this.hasDrawerOpend) {
        this.handleDrawerListDOM(currentIndex, lastIndex);
      }
    }
  },

  methods: {
    // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play();
    },

    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
    },

    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit("musicPlay/changePlayState", state);
    },

    // 根据音乐的id获取对应url
    getMusicDetailData(id) {
      // 音乐加载中
      this.$store.commit("musicPlay/changeMusicLoad", false);

      this.$axios.get(`/api/song/url?id=${id}`).then((res) => {
        this.musicUrl = res.data.data[0].url;
        // 没有对应的url资源
        if (this.musicUrl == null) {
          this.$message.error("该歌曲暂无版权，将为您播放下一首歌曲");
          // this.changeMusic("next");   //切换下一首
          return;
        }
        // 音乐加载完成
        this.$store.commit("musicPlay/changeMusicLoad", true);

        // this.$store.commit("musicPlay/changePlayState", true);
        // console.log(this.$store.state.musicPlay.isPlay)
         this.playMusic();  // 加载完成播放音乐
      });
    },

    // 根据音乐id从歌单中获取对应的详细信息
    getMusicDetailFromMusicList() {
      // console.log(this.$store.state.musicPlay.curMusicIndex);
      // console.log(this.musicList);
      this.musicList.forEach((item, index) => {
        if (item.id === this.$store.state.musicPlay.curMusicIndex) {
          // 记录当前音乐的index
          this.curMusicIndex = index;
          // 将索引传至vuex
          this.$store.commit("musicPlay/curMusicIndex", index);
          this.musicDetail = item;
          // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
          this.duration = this.musicList[index].dt;
        }
      });
    },

    // 获取喜欢的音乐
    getLikeMusicList() {
      var timeStamp = Date.parse(new Date());
      this.$axios
        .get(
          `/api/likelist?uid=${JSON.parse(
            localStorage.getItem("userId")
          )}&timeStamp=${timeStamp}`
        )
        .then((res) => {
          console.log(res.data.ids);
          this.likeMuiscList = res.data.ids;
        });

      this.$store.commit("musicPlay/changeLikeMusic", this.likeMuiscList);
    },

    // 控制播放列表的显示
    changeShowDrawer() {
      // 关闭也是这个回调，所以直接取反
      this.showDrawer = !this.showDrawer;

      // this.hasDrawerOpend = true;
      // this.handleDrawerListDOM(this.currentMusicIndex);
    },

    // 当前播放时间位置
    timeupdate() {
      // 节流
      let time = this.$refs.audioPlayer.currentTime;
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      this.$store.commit("musicPlay/updateCurrentTime", time);

      time = Math.floor(time);
      if (time !== this.lastSecond) {
        this.lastSecond = time;
        this.currentTime = time;
        // 计算进度条的位置
        this.timeProgress = Math.floor((time / this.durationNum) * 100);
      }
    },
  },
};
</script>


<style>
/*音乐播放进度条*/
.el-slider__bar {
  background-color: #ff4e4e;
}

.el-slider__button {
  border: 1px solid #ccc;
  width: 8px;
  height: 8px;
}

.el-slider__runway {
  height: 4px;
}

.el-slider__bar {
  height: 4px;
}

.el-slider__button-wrapper {
  top: -6px;
}

/*播放歌单*/
.el-drawer.rtl,
.el-drawer__container {
  height: calc(100vh - 194px);
  position: fixed;
  top: 60px;
}

.el-drawer {
  border-radius: 10px;
  box-shadow: 0 0 0 #fff;
}

.el-drawer__body {
  overflow: auto;
}

.el-drawer__container ::-webkit-scrollbar {
  display: none;
}

.el-drawer .el-table .cell {
  color: rgb(39, 39, 39);
}

.el-drawer .el-table td:nth-child(3) .cell {
  color: #aaa;
}

.el-drawer .el-table td,
.el-table th {
  padding: 5px 0;
}

.el-slider__button-wrapper {
  height: 4px;
}

body .el-table .el-table__row .currentRow {
  color: #ec4141;
}

.el-drawer__wrapper {
  bottom: auto;
}

.rtl {
  width: 300px;
}
</style>

<style scoped>
.el-footer {
  width: 100%;
  border-top: 0.0625rem solid #ccc;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.el-footer .left {
  width: 18%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  left: -0.9375rem;
}

.el-footer .left div {
  display: inline-block;
}

.el-footer .left .img {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.625rem;
}

.el-footer .left .songMsg p:last-child {
  font-size: 0.875rem;
}

.el-footer .left .songMsg p:first-child i {
  font-size: 1.0625rem;
}

.el-footer .center {
  width: 40%;
  position: relative;
  left: -1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.75rem;
}

.el-footer .center .controls {
  display: flex;
  justify-content: space-evenly;
  margin: 0 2.5rem;
  font-size: 0.75rem;
}

.el-footer .center .controls .icon-zantingtingzhi,
.el-footer .center .controls .icon-bofang {
  font-size: 22px;
  position: relative;
  top: -2px;
}

.el-footer .center .controls i {
  font-size: 1.25rem;
}

.el-footer .center .controls div {
  border: 0.0625rem solid #000;
  width: 1.375rem;
  height: 1.375rem;
  text-align: center;
  line-height: 1.375rem;
  border-radius: 50%;
  position: relative;
  top: 0.125rem;
}

.el-footer .center .controls div:hover {
  background: #ccc;
  border: 0;
  color: #fff;
}

/*进度条*/
.el-footer .center .progressSlider {
  width: 300px;
}

.el-footer .center .progressBar {
  display: flex;
  align-items: center;
  height: 10px;
  margin-top: -2px;
  overflow: hidden;
}

.el-footer .center .progressBar .currentTime,
.el-footer .center .progressBar .totalTime {
  font-size: 12px;
  transform: scale(0.85);
  color: #aaa;
  margin: 0 5px;
  width: 30px;
  text-align: center;
}

.el-footer .right {
  width: 16%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.6875rem;
  position: relative;
  right: -0.5rem;
}

.el-footer .right .standard {
  border: 0.0625rem solid #000;
  padding: 0.125rem 0.3125rem;
  position: relative;
  right: 0.5rem;
  top: 0.0625rem;
}

.el-footer .right i {
  font-size: 1.25rem;
  margin: 0 0.5rem;
}

/*播放歌单*/
.drawerHeader {
  font-size: 14px;
  transform: scale(0.9);
  color: #aaa;
  padding: 15px 0;
}

.drawerHeader p:first-child {
  font-size: 22px;
  margin-bottom: 5px;
  color: #000;
  font-weight: 800;
}
</style>