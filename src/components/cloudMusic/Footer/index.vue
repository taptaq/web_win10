<template>
  <el-footer height="72px">
    <audio
      :src="musicUrl"
      ref="audioPlayer"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
    ></audio>

    <div class="left">
      <div>
        <div class="img" @click="toSongDetail">
          <img src="@/assets/cloudmusic.png" alt v-if="!musicDetail.al" />
          <img :src="musicDetail.al.picUrl+'?param==200y200'" alt v-else />
          <div class="imgMc">
            <i class="icon-up iconfont"></i>
          </div>
        </div>

        <div class="songMsg">
          <p v-if="musicDetail && musicDetail.name">
            {{musicDetail.name || ''}}
            <i
              :class="isLikeCurMusic ? 'icon-xihuan1 iconfont' : 'icon-xihuan iconfont'"
            ></i>
          </p>
          <p v-if="musicDetail && musicDetail.name">{{musicDetail.ar[0].name || ''}}</p>
        </div>
      </div>

      
    </div>
    <div class="center">
      <div class="controls">
        <i class="icon-biao- iconfont" @click="changeType()" v-show="playType==='order'"></i>
        <i class="icon-suiji iconfont" @click="changeType()" v-show="playType==='random'"></i>
        <i class="icon-music-pre iconfont" @click="changeMusic('pre')"></i>

        <i
          v-if="$store.state.musicPlay.isPlay"
          class="icon-zantingtingzhi iconfont"
          @click="pauseMusic"
        ></i>
        <i v-else class="icon-bofang iconfont" @click="playMusic"></i>

        <i class="icon-music-next iconfont" @click="changeMusic('next')"></i>
        <div>词</div>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{currentTimeNum || '00:00'}}</span>
        <el-slider
          class="progressSlider"
          v-model="timeProgress"
          :show-tooltip="false"
          @change="changeProgress"
        ></el-slider>
        <span class="totalTime">{{duration || '00:00'}}</span>
      </div>
    </div>
    <div class="right">
      <div class="standard">标准</div>
      <i class="icon-ttpodicon iconfont"></i>
      <div class="volumeWrap" ref="volumeWrap">
        <el-slider v-model="volume" vertical height="80px" @input="changeVolume"></el-slider>
      </div>
      <i
        class="icon-shengyinyinliangmianxing iconfont"
        ref="volume"
        @click="changeMutedState"
        v-show="!isMuted"
      ></i>
      <i class="icon-jingyin iconfont" v-show="isMuted" @click="changeMutedState"></i>

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
        @row-click="clickRow"
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
      direction: "rtl", //播放列表从右到左展现
      musicDetail: {}, //当前音乐的详细信息
      progress: 0, //进度条进度位置
      musicUrl: "", //音乐的url
      musicList: [], //当前播放的歌单
      likeMuiscList: [], //喜欢音乐的歌单
      showDrawer: false, //控制显示播放歌单
      timeProgress: 0, //音乐播放的进度条位置
      curMusicIndex: 0, //当前播放音乐的索引
      duration: 0, //音乐的播放时长（xx:xx）
      durationNum: 0, //音乐的播放总秒数
      currentTime: 0, // 当前播放时间位置
      lastSecond: 0, //上次播放时的秒数
      playType: "order", //播放模式（默认正常顺序）
      typeIndex: 0, //播放模式的当前索引
      isLikeCurMusic: false, //用户是否喜欢当前音乐
      volume: 25, //音量大小
      isMuted: false, //是否静音
      curVolume: 0, //当前音量
    };
  },

  mounted() {
    console.log(1);
    this.getLikeMusicList();

    this.$refs.volume.addEventListener("mouseenter", () => {
      this.$refs.volumeWrap.style.opacity = 1;
    });

    this.$refs.volumeWrap.addEventListener("mouseenter", () => {
      this.$refs.volumeWrap.style.opacity = 1;
    });

    this.$refs.volume.addEventListener("mouseleave", () => {
      this.$refs.volumeWrap.style.opacity = 0;
    });

    this.$refs.volumeWrap.addEventListener("mouseleave", () => {
      this.$refs.volumeWrap.style.opacity = 0;
    });
  },

  computed: {
    currentTimeNum() {
      return utils.formatMusicTime(this.currentTime);
    },
  },

  watch: {
    // 监听当前播放音乐id的变化
    "$store.state.musicPlay.curMusicId"(id) {
      this.pauseMusic(); // 先暂停当前播放的音乐
      this.musicList = this.$store.state.musicPlay.curMuiscList; //更新当前的播放列表
      this.getMusicDetailFromMusicList(); //重新获取列表中对应id音乐的详细数据
      this.getMusicDetailData(id); //获取到对应音乐的url
      this.durationNum = utils.returnSecond(this.duration); //把音乐总时长变为秒数
      // 判断用户是否喜欢当前音乐
      this.getIsLikeCurMusic();
    },

    // 监听curMusicIndex的变化
    "$store.state.musicPlay.curMusicIndex"(curIndex, lastIndex) {
      this.handleDrawerListActiveDOM(curIndex, lastIndex);
    },
  },

  methods: {
    // 跳转到对应的歌曲详情页
    toSongDetail() {
      this.$store.commit("musicPage/changeShowIndex", false);
      this.$store.commit("musicPage/changeShowPersonal", false);
      this.$store.commit("musicPage/changeShowSearch", false);
      this.$store.commit("musicPage/changeShowSongDetail", true);
    },

    // 改变播放模式
    changeType(type) {
      let typeArr = ["order", "random"];
      this.typeIndex++;
      if (this.typeIndex > typeArr.length - 1) {
        this.typeIndex = 0;
      }
      this.playType = typeArr[this.typeIndex];
    },

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

    // 判断用户是否喜欢该音乐
    getIsLikeCurMusic() {
      this.isLikeCurMusic = this.likeMuiscList.find(
        (item) => item === this.$store.state.musicPlay.curMusicId
      );
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
        this.playMusic(); // 加载完成播放音乐
      });
    },

    // 根据音乐id从歌单中获取对应的详细信息
    getMusicDetailFromMusicList() {
      // console.log(this.$store.state.musicPlay.curMusicIndex);
      // console.log(this.musicList);
      this.musicList.forEach((item, index) => {
        if (item.id === this.$store.state.musicPlay.curMusicId) {
          // 记录当前播放音乐的index
          this.curMusicIndex = index;
          // 将索引传至vuex（更新当前音乐的索引）
          this.$store.commit("musicPlay/curMusicIndex", index);
          this.musicDetail = item; //当前音乐的详细信息
          this.$store.commit("musicPlay/updateCurMusicMsg", this.musicDetail);
          // console.log(this.musicDetail);
          // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在从播放列表的对应索引那一项中拿
          this.duration = this.musicDetail.dt;
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
          // console.log(res.data.ids);
          this.likeMuiscList = res.data.ids;
        });

      this.$store.commit("musicPlay/changeLikeMusic", this.likeMuiscList);
    },

    // 当前播放时间位置
    timeupdate() {
      // 节流
      let time = this.$refs.audioPlayer.currentTime; //获取当前音源的播放时间

      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      // this.$store.commit("musicPlay/updateCurrentTime", time);

      time = Math.floor(time);
      if (time !== this.lastSecond) {
        this.lastSecond = time;
        this.currentTime = time;
        // 计算进度条的对应位置
        this.timeProgress = Math.floor((time / this.durationNum) * 100);
      }
    },

    // 拉动播放条
    changeProgress(e) {
      this.currentTime = Math.floor((e / 100) * this.durationNum);
      this.$refs.audioPlayer.currentTime = this.currentTime; //改变当前音源的播放时间
    },

    // 点击播放列表中的其中一首
    clickRow(row) {
      this.changeMusic("click", row.id);
    },

    // 控制播放列表的显示
    changeShowDrawer() {
      this.showDrawer = !this.showDrawer;
      this.handleDrawerListActiveDOM(this.curMusicIndex);
    },

    // 为播放列表中当前正在播放的对应dom添加相应的激活类
    handleDrawerListActiveDOM(curIndex, lastIndex) {
      this.$nextTick(() => {
        let tableRows = document
          .querySelector(".el-footer")
          .querySelectorAll(".el-table__row");
        //为当前正在播放的音乐添加激活类
        if (tableRows[curIndex]) {
          tableRows[curIndex].children[0]
            .querySelector(".cell")
            .classList.add("currentRow");
          tableRows[curIndex].children[1]
            .querySelector(".cell")
            .classList.add("currentRow");
        }
        if (
          (lastIndex && lastIndex != -1 && tableRows[lastIndex]) ||
          lastIndex == 0
        ) {
          // 将上一首音乐的激活类名删掉
          tableRows[lastIndex].children[0]
            .querySelector(".cell")
            .classList.remove("currentRow");
          tableRows[lastIndex].children[1]
            .querySelector(".cell")
            .classList.remove("currentRow");
        }
      });
    },

    // 切换歌曲(根据多种模式进行切歌)
    changeMusic(type, id) {
      // 正常点击对应歌曲
      if (type == "click") {
        this.$store.commit("musicPlay/changeCurMusicId", id);
      }

      // 切换到上一首
      else if (type == "pre") {
        let curMusicIndex = this.curMusicIndex;
        let preIndex;
        // 正常顺序
        if (this.playType === "order") {
          preIndex =
            curMusicIndex - 1 < 0
              ? this.musicList.length - 1 //第一首切换到最后一首
              : curMusicIndex - 1;
        }
        // 随机播放模式
        else if (this.playType === "random") {
          if (this.musicList.length === 1) {
            preIndex = curMusicIndex;
          } else {
            preIndex = curMusicIndex;
            while (preIndex === curMusicIndex) {
              //生成一个随机数（与当前索引不一样的数）
              preIndex = Math.floor(Math.random() * this.musicList.length);
            }
          }
        }
        // 更新当前播放音乐的id
        this.$store.commit(
          "musicPlay/changeCurMusicId",
          this.musicList[preIndex].id
        );
      }

      // 切换到下一首
      else if (type === "next") {
        let curMusicIndex = this.curMusicIndex;
        let nextIndex;
        // 正常播放
        if (this.playType === "order") {
          nextIndex =
            curMusicIndex + 1 === this.musicList.length ? 0 : curMusicIndex + 1;
        }
        // 随机播放
        else if (this.playType === "random") {
          if (this.musicList.length === 1) {
            nextIndex = curMusicIndex;
          } else {
            nextIndex = curMusicIndex;
            while (nextIndex === curMusicIndex) {
              nextIndex = Math.floor(Math.random() * this.musicList.length);
            }
          }
        }
        // 更新当前播放音乐的id
        this.$store.commit(
          "musicPlay/changeCurMusicId",
          this.musicList[nextIndex].id
        );
      }
    },

    // 控制音量
    changeVolume(e) {
      this.$refs.audioPlayer.volume = e / 100;
      if (this.isMuted && e > 0) {
        this.isMuted = false;
      } else if (e == 0 && this.isMuted == false) {
        //静音
        this.isMuted = true;
      }
    },

    // 点击小喇叭图标切换静音状态
    changeMutedState() {
      if (this.isMuted) {
        //若此时为静音状态，则音量切换到curVolume
        this.volume = this.curVolume;
      } else {
        this.curVolume = this.volume;
        this.volume = 0;
      }
      this.isMuted = !this.isMuted;
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
  top: -5px;
}

/*播放歌单*/
.el-drawer.rtl,
.el-drawer__container {
  height: calc(100vh - 194px);
  position: fixed;
  top: 61px;
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

.el-drawer .el-table__body-wrapper {
  height: 330px;
  overflow: auto;
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
  position: fixed;
  bottom:0;
  left:0;
  background: #fff;
}

.el-footer .left {
  width: 26%;
  left: 0.2rem;
  display: flex;
  align-items: center;
}

.el-footer .left div:first-child {
  width: 142%;
  display: flex;
  align-items: center;
  position: relative;
}

/*除了歌曲详情的尾部 */
.el-footer .left div:not(:first-child) {
  display: inline-block;
}

.el-footer .left .img {
  width: 7.6rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  overflow: hidden;
}

.el-footer .left .img:hover .imgMc {
  opacity: 1;
}

.el-footer .left .img .imgMc {
  position: absolute;
  width: 96%;
  height: 101%;
  top: 1px;
  left: 1px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.625rem;
  text-align: center;
  line-height: 48px;
  opacity: 0;
  transition: all 0.3s;
}

.el-footer .left .img .imgMc i {
  font-size: 26px;
  color: #fff;
}

.el-footer .left .img img {
  width: 100%;
  height: 100%;
}

.el-footer .left .songMsg {
  margin-left: 15px;
  width: 176rem;
}

.el-footer .left .songMsg p:first-child i {
  font-size: 1rem;
}

.el-footer .left .songMsg p i.icon-xihuan1 {
  color: red;
  margin-right: 5px;
  font-size: 1rem;
}

.el-footer .left .songMsg p:last-child {
  font-size: 0.875rem;
}


/*歌曲详情页的尾部 */
.el-footer .left span {
  margin-right: 20px;
}

.el-footer .left span:first-child i {
  font-size: 25px;
  position: relative;
  left: -3px;
}

.el-footer .left span:not(:first-child) {
  display: inline-block;
  border: 1px solid #ccc;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 8px #ccc;
}

.el-footer .left span:not(:first-child):hover {
  background: rgb(224, 216, 216);
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

/*音量弹出框 */
.volumeWrap {
  width: 30px;
  height: 100px;
  opacity: 0;
  position: absolute;
  left: 78px;
  top: -85px;
  background: #fff;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 8px 5px;
  box-shadow: 0 0 8px #ccc;
  transition: opacity 0.5s;
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