<template>
  <div class="warpper">
    <div class="contentWrap" ref="contentWrap" v-if="$store.state.musicPlay.curMusicId">
      <div class="topArea" ref="topArea">
        <div class="songTitle" ref="songTitle">
          <p>{{musicDetailMsg.name}}</p>
          <p>{{musicDetailMsg.ar[0].name}} - {{musicDetailMsg.al.name}}</p>
        </div>

        <div class="center" ref="center">
          <div class="albumImg">
            <div
              class="needle"
              :class="$store.state.musicPlay.isPlay ? 'needleRotate' : ''"
              ref="needle"
            >
              <img src="@/assets/needle.png" alt />
            </div>
            <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
            <div
              class="disc"
              :class="$store.state.musicPlay.isPlay ? 'discAnimation' :'' "
              ref="disc"
            >
              <img src="@/assets/disc.png" alt />
              <img :src="musicDetailMsg.al.picUrl" alt class="musicAvatar" />
            </div>
          </div>

          <div class="songWords" ref="songWords">
            <div class="lyricWrap" ref="lyricWrap">
              <p
                v-for="(item,index) in lyric"
                :key="item[0]"
                class="lyric"
                :class="lyricIndex - 1 == index ? 'lyricActive' : ''"
                ref="lyric"
              >{{item[1]}}</p>
            </div>
          </div>

          <div class="model" ref="model">
            <h3>切换模式</h3>
            <div class="active" @click="changeNormalModel" ref="normalBtn">标准模式</div>
            <div @click="changeDanMuModel" ref="danMuBtn">弹幕模式</div>
          </div>
        </div>
      </div>

      <div class="comment">
        <div class="commentWrap" ref="commentWrap">
          <div class="topCommentArea" ref="topCommentArea">
            <div class="commentNum">全部评论({{comments.total}})</div>
            <div class="hotComment">
              <div class="commentItem" v-for="item in commentMsg.hotComments" :key="item.commentId">
                <div class="userImg">
                  <img :src="item.user.avatarUrl+'?param=45y45'" alt />
                </div>
                <div class="commentContent">
                  <span class="username">{{item.user.nickname}}：</span>
                  <span>{{item.content}}</span>
                  <div class="reply" v-if="item.beReplied.length!=0">
                    <span>@{{item.beReplied[0].user.nickname}}：</span>
                    <span>{{item.beReplied[0].content}}</span>
                  </div>
                  <div class="otherMsg">
                    <div class="date">{{item.time | formatDate}}</div>
                    <div class="menu">
                      <span :class="item.liked?'active':''">
                        <i class="icon-zan iconfont"></i>
                        {{item.likedCount}}
                      </span>
                      <span>|</span>
                      <span>
                        <i class="icon-fenxiang iconfont"></i>
                      </span>
                      <span>|</span>
                      <span>
                        <i class="icon-pinglun iconfont"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="moreComment" @click="toMoreHotComments">更多精彩评论 ></div>
          </div>

          <div class="newComment">
            <div class="newTitle">最新评论({{comments.total}})</div>
            <div class="commentItem" v-for="item in comments.comments" :key="item.commentId">
              <div class="userImg">
                <img :src="item.user.avatarUrl+'?param=45y45'" alt />
              </div>
              <div class="commentContent">
                <span class="username">{{item.user.nickname}}：</span>
                <span>{{item.content}}</span>
                <div class="reply" v-if="item.beReplied.length!=0">
                  <span>@{{item.beReplied[0].user.nickname}}：</span>
                  <span>{{item.beReplied[0].content}}</span>
                </div>
                <div class="otherMsg">
                  <div class="date">{{item.time | formatDate}}</div>
                  <div class="menu">
                    <span :class="item.liked?'active':''">
                      <i class="icon-zan iconfont"></i>
                      {{item.likedCount}}
                    </span>
                    <span>|</span>
                    <span>
                      <i class="icon-fenxiang iconfont"></i>
                    </span>
                    <span>|</span>
                    <span>
                      <i class="icon-pinglun iconfont"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <el-pagination
              background
              layout="prev, pager, next"
              :total="comments.total"
              small
              :page-size="20"
              :current-page="currentPage"
              @current-change="commentPageChange"
            ></el-pagination>
          </div>
        </div>
      </div>

      <!-- 弹幕设置区域 -->
      <div class="barrageWrap" v-if="danMuModel">
        <div class="barrage">
          <v-barrage :arr="arr" :isPause="isPause" :percent="85"></v-barrage>

          <div class="barrage-control">
            <el-input
              id="sendContent"
              v-model="sendContent"
              placeholder="请输入内容"
              @keyup.enter.native="sendBarrage"
              size="small"
            ></el-input>
            <el-color-picker v-model="color" class="colorSele" size="mini"></el-color-picker>
            <el-button id="sendBarrageBtn" type="danger" round @click="sendBarrage" size="mini">发送</el-button>
            <el-button
              type="danger"
              round
              @click="isPause=!isPause"
              size="mini"
            >{{isPause?'暂停' : '开始'}}</el-button>
            <el-button type="danger" round @click="noShelter" size="mini">{{shelter?'遮挡':'不遮挡'}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="noSong" v-else>暂无歌曲...</div>
  </div>
</template>

<script>
import VBarrage from "@/components/VBarrage/index.vue";
export default {
  name: "ContentWrap",
  components: {
    VBarrage,
  },
  data() {
    return {
      musicDetailMsg: this.$store.state.musicPlay.curMusicMsg, //歌曲的详细信息
      currentPage: this.commentMsg.curCommentPage,
      comments: this.commentMsg.comments,
      scrollDis: 0, //评论区初始的滚动高度
      lyricIndex: 0, //当前播放歌词的索引
      scrollLyricDis: 0, //歌词区初始的滚动高度
      danMuModel: false, //是否为弹幕模式

      arr: [],
      isPause: false,
      sendContent: null,
      color: "#fff", //弹幕的文字颜色
      shelter: false, //弹幕是否遮挡
      danmuIndex: 0,
    };
  },

  mounted() {
    this.$refs.model.children.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.$refs.model.children.forEach((item) => {
          item.classList.remove("active");
        });
        e.target.classList.add("active");
      });
    });
  },

  props: {
    lyric: {
      type: Array,
    },
    commentMsg: {
      type: Object,
    },
  },

  watch: {
    // 监听当前播放时间
    "$store.state.musicPlay.currentTime"(currentTime, lastTime) {
      // 如果两个时间间隔有1秒,则可得知进度条被拖动 需要重新校准歌词index
      // 当歌词数量大于1并且索引为零时,可能歌词位置差距较大,走这个if进行快速跳转
      if (
        (lastTime && Math.abs(currentTime - lastTime) >= 1) ||
        (this.lyricIndex == 0 && this.lyric.length > 1)
      ) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.lyric.length > 1) {
          this.getCurrentLyricsIndex(currentTime);
          // 滑动到当前歌词
          this.lyricScroll(this.lyricsIndex);
        }
      }
      // 根据实时播放时间实现歌词滚动
      if (this.lyricIndex < this.lyric.length) {
        if (currentTime >= this.lyric[this.lyricIndex][0]) {
          //当前播放时间大于该句的时长
          this.lyricIndex += 1;
          this.lyricScroll(this.lyricIndex);
        }
      }
    },

    // 监听vuex中的curmusicId 重置歌词索引
    "$store.state.musicPlay.curMusicId"(musicId) {
      this.lyricIndex = 0;
      this.musicDetailMsg = this.$store.state.musicPlay.curMusicMsg; //重新获取歌曲对应的详细信息
      this.arr = [];
      this.getComment(musicId);
    },

    // 监听歌词是否再歌曲播放前加载完成，再定位到对应位置
    lyric(current) {
      // 大于一秒，说明歌词在1秒后才请求成功 歌词可能不能马上跳转到当前时间 这里进行校准
      if (this.$store.state.musicPlay.currentTime > 1) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.lyric.length > 1) {
          this.getCurrentLyricsIndex(this.$store.state.musicPlay.currentTime);
          this.$nextTick(() => {
            // 滑动到当前歌词
            this.lyricScroll(this.lyricIndex);
          });
        }
      }
    },

    // 监听弹幕模式的值
    danMuModel(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initTestData(); //初始化弹幕数据
        });
      }
    },

    "$store.state.musicPlay.isPlay"(newState) {
      if (newState) {
        this.isPause = false;
      } else {
        this.isPause = true;
      }
    },
  },

  methods: {
    //点击分页按钮
    commentPageChange(page) {
      this.currentPage = page;
      this.getComment(this.$store.state.musicPlay.curMusicId, "changePage");
    },

    // 请求评论数据
    async getComment(id, type) {
      var timestamp = Date.parse(new Date());
      this.commentMsg.isCommentLoading = true;
      if (type == "changePage") {
        this.$refs.topCommentArea.classList.add("disappear");
        let distance =
          this.$refs.songTitle.offsetHeight + this.$refs.center.offsetHeight;

        this.scrollDis = this.$refs.contentWrap.offsetHeight;
        let timer = setInterval(() => {
          if (this.scrollDis <= distance - 60) {
            clearInterval(timer);
          } else {
            this.scrollDis -= 10;
            this.$refs.contentWrap.scrollTo(0, this.scrollDis);
          }
        }, 10);
      }

      let res = await this.$axios.get(
        `/api/comment/music?id=${id}&offset=${
          (this.currentPage - 1) * 20
        }&timestamp=${timestamp}`
      );
      if (res.data.code !== 200) {
        this.$message.error("获取评论失败,请稍后重试!");
      }

      this.isCommentLoading = false;
      this.comments = res.data;
      if (this.danMuModel) {
        this.initTestData(); //更新完评论数据后重新初始化数据
      }
    },

    // 歌词的滚动
    lyricScroll(curLyric) {
      // 获取歌词项
      let lyrics = this.$refs.lyric;
      // 获取歌词框
      let songWords = this.$refs.songWords;
      if (lyrics[curLyric - 1]) {
        let distance = lyrics[curLyric - 1].offsetTop;
        if (curLyric === -1) {
          return;
        }
        // 当前播放的是第 curLyric-1 句歌词
        var top =
          (curLyric - 1) * lyrics[0].offsetHeight +
          lyrics[0].offsetHeight / 2 -
          songWords.offsetHeight / 2;
        if (top < 0) {
          top = 0; // top最小为0
        }
        this.$refs.lyricWrap.style.top = -top + "px";
      }
    },

    //获取当前歌词索引
    getCurrentLyricsIndex(currentTime) {
      let lyricIndex = 0;
      this.lyric.some((item) => {
        // 当前索引没有超出歌词索引的范围，且当前播放时间大于歌词对应的时间时，当前索引加1，跳到下一句歌词
        if (lyricIndex < this.lyric.length - 1 && currentTime > item[0]) {
          lyricIndex += 1;

          return currentTime <= item[0]; //当前播放时间小于歌词对应的时间，当前索引不变，还继续停留在该歌词上
        }
      });
      // console.log(lyricsIndex);
      this.lyricIndex = lyricIndex;
    },

    // 跳转到精彩评论区域
    toMoreHotComments() {
      this.$store.commit("musicPage/changeShowMoreComments", true);
      this.$store.commit("musicPage/changeShowIndex", false);
      this.$store.commit("musicPage/changeShowPersonal", false);
      this.$store.commit("musicPage/changeShowSearch", false);
      this.$store.commit("musicPage/changeShowSongDetail", false);
    },

    // 切换到弹幕模式
    changeDanMuModel(e) {
      this.danMuModel = true;
      this.$refs.commentWrap.style.display = "none";
      this.$refs.topArea.classList.add("danmu");
    },

    // 切换到正常模式
    changeNormalModel(e) {
      this.danMuModel = false;
      this.$refs.commentWrap.style.display = "block";
      this.$refs.topArea.classList.remove("danmu");
    },

    // 初始化弹幕数据
    initTestData() {
      let arr = this.comments.comments.concat(this.commentMsg.hotComments);
      for (let i = 0; i < 5; i++) {
        for (let index = 0; index < 100; index++) {
          this.danmuIndex = Math.random() * (arr.length - 1) + 1;
          this.arr.push({
            direction: "default",
            content: arr[parseInt(this.danmuIndex)].content,
          });
        }
      }
    },

    // 发送弹幕
    sendBarrage() {
      if (
        this.arr.length > 1 &&
        this.sendContent != "" &&
        this.sendContent != null
      ) {
        this.arr.unshift({
          content: this.sendContent,
          isSelf: true,
          style: {
            color: this.color,
            fontSize: "25px",
          },
          direction: "default",
        });
      } else {
        this.arr.push({
          content: this.sendContent,
          isSelf: true,
          style: {
            color: "#fff",
          },
          direction: "default",
        });
      }
      this.sendContent = null;
    },

    // 设置弹幕不遮挡
    noShelter() {
      this.shelter = !this.shelter;
      if (!this.shelter) {
        this.$refs.center.classList.add("shelter");
        this.$refs.songTitle.classList.add("shelter");
      } else {
        this.$refs.center.classList.remove("shelter");
        this.$refs.songTitle.classList.remove("shelter");
      }
    },
  },
};
</script>

<style>
.contentWrap {
  width: 100%;
  height: auto;
  margin: 30px 0;
  margin-top: 20px;
  text-align: center;
  overflow: auto;
  transition: all 0.2s;
}

.contentWrap::-webkit-scrollbar {
  width: 0;
}

.contentWrap .topArea {
  padding: 12px 0;
}

.contentWrap .topArea.danmu {
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
}

.contentWrap .topArea.danmu .songTitle {
  margin-top: 10px;
}

.contentWrap .topArea.danmu .songTitle.shelter {
  z-index: 2;
  position: relative;
}

.contentWrap .topArea.danmu .center.shelter {
  z-index: 2;
  position: relative;
}

.contentWrap .songTitle p:first-child {
  font-size: 30px;
}

.contentWrap .songTitle p:last-child {
  font-size: 15px;
  margin-top: 5px;
}

/*中间部分 */
.contentWrap .center {
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
}

/*专辑转动部分*/
.contentWrap .center .albumImg {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  position: relative;
  border: 10px solid rgb(185, 163, 163);
  box-sizing: border-box;
  margin-left: -40px;
}

.discContainer {
  margin-top: 55px;
  position: relative;
}

.needle {
  position: relative;
  left: 50%;
  top: -25%;
  width: 88px;
  height: 72px;
  z-index: 10000;
  transition: all 1s;
  transform-origin: 5.3px 5.3px;
}

.needle img {
  width: 100%;
}

.needleRotate {
  transform-origin: 5.3px 5.3px;
  transform: rotate(22deg);
}

.disc {
  width: 200px;
  height: 200px;
  position: relative;
  top: -72px;
}

.disc img:nth-child(1) {
  width: 100%;
}

.disc .musicAvatar {
  position: absolute;
  top: 32px;
  left: 30px;
  width: 138px;
  z-index: -1;
}

/* 碟子设置旋转动画 */
.discAnimation {
  /* infinite动画无限循环 */
  animation: disc 25s linear infinite;
  animation-delay: 0.8s;
}

@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.contentWrap .center .songWords {
  width: 34%;
  height: 260px;
  overflow: auto;
  padding: 10px 50px;
  position: relative;
  left: -40px;
}

.contentWrap .center .songWords::-webkit-scrollbar {
  width: 0;
}

.contentWrap .topArea.danmu .center .songWords {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
}

.contentWrap .center .songWords .lyricWrap {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s;
  overflow: auto;
}

.contentWrap .center .songWords .lyric {
  font-size: 14px;
  height: 45px;
}

.contentWrap .topArea.danmu .center .songWords .lyric.lyricActive {
  font-weight: 800;
  font-size: 17px;
  text-shadow: 0 0 5px rgb(160, 123, 123);
  color: #ccc;
}

.contentWrap .center .songWords .lyric.lyricActive {
  font-weight: 700;
  font-size: 17px;
  text-shadow: 0 0 10px #ccc;
}

.contentWrap .center .model h3 {
  font-size: 25px;
  font-weight: 800;
}

.contentWrap .center .model div {
  margin: 12px 0;
  width: 100px;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 8px rgb(163, 149, 149);
  transition: all 0.3s;
  z-index: 1;
  position: relative;
}

.contentWrap .center .model div:hover,
.contentWrap .center .model div.active {
  background: rgb(211, 61, 61);
  color: #fff;
  box-shadow: 0 0 10px rgb(139, 120, 120);
}

/*评论部分 */
.contentWrap .comment {
  margin-top: 50px;
  width: 50%;
  margin: 60px auto;
  text-align: left;
  padding: 2px 5px;
}

.contentWrap .comment .commentWrap {
  font-size: 12px;
  margin-top: 10px;
}

.contentWrap .comment .commentWrap .commentNum {
  font-size: 14px;
  font-weight: 700;
}

.contentWrap .comment .commentWrap .topCommentArea.disappear {
  height: 0;
  display: none;
}

.contentWrap .comment .commentWrap .userImg {
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  width: 38px;
  height: 38px;
  box-shadow: 0 0 8px rgb(177, 165, 165);
}

.contentWrap .comment .commentWrap .userImg img {
  width: 100%;
  height: 100%;
}

.contentWrap .comment .commentWrap .moreComment {
  width: 140px;
  height: 40px;
  margin: 18px auto;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 0 10px rgb(199, 193, 193);
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.3s;
}

.contentWrap .comment .commentWrap .moreComment:hover {
  background: rgb(211, 61, 61);
  color: #fff;
}

.contentWrap .comment .hotComment,
.contentWrap .comment .newComment {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.contentWrap .comment .hotComment .commentItem,
.contentWrap .comment .newComment .commentItem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
}

.contentWrap .comment .commentContent {
  width: 88%;
}

.contentWrap .comment .commentContent .username,
.contentWrap .comment .commentContent .reply span:first-child {
  cursor: pointer;
  color: rgb(97, 97, 201);
}

.contentWrap .comment .commentContent .reply {
  width: 100%;
  height: auto;
  line-height: 1.8;
  background: #ccc;
  padding: 5px 10px;
  border-radius: 8px;
  margin: 3px 0;
}

.contentWrap .comment .commentContent .otherMsg {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.contentWrap .comment .commentContent .otherMsg .date {
  color: rgba(0, 0, 0, 0.4);
}

.contentWrap .comment .commentContent .otherMsg .menu {
  width: 116px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  top: -5px;
}

.contentWrap .comment .commentContent .otherMsg .menu span {
  transform: scale(0.9);
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}

.contentWrap .comment .commentContent .otherMsg .menu span:first-child {
  font-size: 13px;
}

.contentWrap .comment .commentContent .otherMsg .menu span:first-child i {
  color: rgba(0, 0, 0, 0.3);
}

.contentWrap .comment .commentContent .otherMsg .menu span:first-child.active,
.contentWrap
  .comment
  .commentContent
  .otherMsg
  .menu
  span:first-child.active
  i {
  color: red;
}

/*最新评论 */
.contentWrap .comment .newComment {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 36px;
}

.contentWrap .comment .newComment .newTitle {
  font-size: 14px;
  font-weight: 700;
}

/*分页 */
.el-pagination {
  margin: 0 auto;
  margin-top: 28px;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: red;
  opacity: 0.8;
}

.noSong {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/*弹幕区域*/
.barrageWrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 450px;
}

.barrageWrap .barrage {
  height: 90%;
  width: 100%;
  position: relative;
  margin: auto;
  margin-top: 50px;
}

.barrageWrap .barrage .barrage-control {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#sendContent {
  width: 90%;
}

.colorSele {
  margin-right: 10px;
}
</style>