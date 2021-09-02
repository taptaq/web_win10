<template>
  <div class="contentWrap" ref="contentWrap">
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
        <div class="disc" :class="$store.state.musicPlay.isPlay ? 'discAnimation' :'' " ref="disc">
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

      <div class="model">
        <div>切换模式</div>
        <div class="active">标准模式</div>
        <div>弹幕模式</div>
      </div>
    </div>

    <div class="comment">
      <div class="commentWrap">
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
          <div class="moreComment">更多精彩评论 ></div>
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
  </div>
</template>

<script>
export default {
  name: "ContentWrap",
  data() {
    return {
      musicDetailMsg: this.$store.state.musicPlay.curMusicMsg, //歌曲的详细信息
      currentPage: this.commentMsg.curCommentPage,
      comments: this.commentMsg.comments,
      scrollDis: 0, //评论区初始的滚动高度
      lyricIndex: 0, //当前播放歌词的索引
      scrollLyricDis: 0, //歌词区初始的滚动高度
    };
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

    // 监听vuex中的musicId 重置歌词索引
    "$store.state.musicPlay.curMusicId"(musicId) {
      this.lyricIndex = 0;
    },

    lyric(current) {
      // console.log("获取了歌词");
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
      // console.log(res);
      if (res.data.code !== 200) {
        this.$message.error("获取评论失败,请稍后重试!");
      }

      this.isCommentLoading = false;
      this.comments = res.data;
    },

    // 歌词的滚动
    lyricScroll(curLyric) {
      // 获取歌词项
      let lyrics = this.$refs.lyric;
      // 获取歌词框
      let songWords = this.$refs.songWords;
      //   歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
      if (lyrics[curLyric - 1]) {
        // console.log("2",lyrics[curLyric - 1].offsetTop, songWords.offsetTop);
        // console.log(this.lyric[curLyric - 1]);
        let distance = lyrics[curLyric - 1].offsetTop;
        // console.log(distance);
        // setInterval(() => {
        //   songWords.scrollTo(0, distance + 28);
        // }, this.lyric[curLyric - 1][0]);
        if (lyrics[curLyric - 1] !== 0) {
          this.$refs.lyricWrap.style.top =
            parseInt(this.$refs.lyricWrap.offsetTop) - distance/2  + "px";
        }
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
  },
};
</script>

<style>
.contentWrap {
  width: 100%;
  height: 600px;
  margin: 30px 0;
  text-align: center;
  overflow: auto;
  transition: all 0.2s;
}

.contentWrap::-webkit-scrollbar {
  width: 0;
}

.contentWrap .songTitle p:first-child {
  font-size: 30px;
}

.contentWrap .songTitle p:last-child {
  font-size: 15px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
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
  /* 动画延迟一秒 */
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
  width: 30%;
  height: 260px;
  overflow: auto;
  padding: 10px 50px;
  position: relative;
  left: -40px;
}

.contentWrap .center .songWords::-webkit-scrollbar {
  width: 0;
}

.contentWrap .center .songWords .lyricWrap {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.contentWrap .center .songWords .lyric {
  margin: 15px 0;
  font-size: 14px;
  height: 28px;
}

.contentWrap .center .songWords .lyric.lyricActive {
  font-weight: 700;
  font-size: 16px;
}

.contentWrap .center .model div:first-child {
  font-size: 25px;
  font-weight: 800;
}

.contentWrap .center .model div:not(:first-child) {
  margin: 12px 0;
  width: 100px;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 8px rgb(163, 149, 149);
  transition: all 0.3s;
}

.contentWrap .center .model div:not(:first-child):hover,
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

.contentWrap .comment .commentNum {
  font-size: 14px;
  font-weight: 700;
}

.contentWrap .comment .commentWrap {
  font-size: 12px;
  margin-top: 10px;
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

.contentWrap .comment .commentContent .username {
  cursor: pointer;
  color: rgb(97, 97, 201);
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
</style>