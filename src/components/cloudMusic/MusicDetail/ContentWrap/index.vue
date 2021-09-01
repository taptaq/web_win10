<template>
  <div class="contentWrap">
    <div class="songTitle">
      <p>{{musicDetailMsg.name}}</p>
      <p>{{musicDetailMsg.ar[0].name}} - {{musicDetailMsg.al.name}}</p>
    </div>

    <div class="center">
      <!--<div class="albumImg discAnimation">
        <img src="@/assets/needle.png" alt class="needle" />

        <img src="@/assets/disc.png" alt class="img img1" />
        <img :src="musicDetailMsg.al.picUrl" alt class="img img2 " />
      </div>-->

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

      <div class="songWords">
        <p>作词 : 薛之谦</p>
        <p>作曲 : 罗小黑</p>
        <p>编曲 : 周以力</p>

        <p>制作人 : 周以力/郑伟</p>
        <p>你降落的 太突然了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>你降落的 太突然了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
        <p>我刚好呢 又路过了</p>
      </div>

      <div class="model">
        <div>切换模式</div>
        <div class="active">标准模式</div>
        <div>弹幕模式</div>
      </div>
    </div>

    <div class="comment">
      <div class="commentNum">全部评论(453739)</div>
      <div class="commentWrap">
        <div class="hotComment">
          <div class="commentItem">
            <div class="userImg">
              <img src="@/assets/avatar.png" alt />
            </div>

            <div class="commentContent">
              <span class="username">Taptaq:</span>
              <span>「我怎會與你無關」 小時候我們相愛，因為莽莽撞撞所以分開。 後來的我們再遇見，你我都長大了，夢想都總算實現了… 不知道此刻，我們還適不適合再愛一遍。 转自AGA</span>

              <div class="otherMsg">
                <div class="date">8月27日 01:25</div>
                <div class="menu">
                  <span>
                    <i class="icon-zan iconfont"></i>191
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

          <div class="commentItem">
            <div class="userImg">
              <img src="@/assets/avatar.png" alt />
            </div>

            <div class="commentContent">
              <span class="username">Taptaq:</span>
              <span>「我怎會與你無關」 小時候我們相愛，因為莽莽撞撞所以分開。 後來的我們再遇見，你我都長大了，夢想都總算實現了… 不知道此刻，我們還適不適合再愛一遍。 转自AGA</span>

              <div class="otherMsg">
                <div class="date">8月27日 01:25</div>
                <div class="menu">
                  <span>
                    <i class="icon-zan iconfont"></i>191
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

          <div class="commentItem">
            <div class="userImg">
              <img src="@/assets/avatar.png" alt />
            </div>

            <div class="commentContent">
              <span class="username">Taptaq:</span>
              <span>「我怎會與你無關」 小時候我們相愛，因為莽莽撞撞所以分開。 後來的我們再遇見，你我都長大了，夢想都總算實現了… 不知道此刻，我們還適不適合再愛一遍。 转自AGA</span>

              <div class="otherMsg">
                <div class="date">8月27日 01:25</div>
                <div class="menu">
                  <span class="active">
                    <i class="icon-zan iconfont"></i>191
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

        <div class="newComment">
          <div class="newTitle">最新评论(111)</div>
          <div class="commentItem">
            <div class="userImg">
              <img src="@/assets/avatar.png" alt />
            </div>

            <div class="commentContent">
              <span class="username">Taptaq:</span>
              <span>「我怎會與你無關」 小時候我們相愛，因為莽莽撞撞所以分開。 後來的我們再遇見，你我都長大了，夢想都總算實現了… 不知道此刻，我們還適不適合再愛一遍。 转自AGA</span>

              <div class="otherMsg">
                <div class="date">8月27日 01:25</div>
                <div class="menu">
                  <span>
                    <i class="icon-zan iconfont"></i>191
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

          <div class="commentItem">
            <div class="userImg">
              <img src="@/assets/avatar.png" alt />
            </div>

            <div class="commentContent">
              <span class="username">Taptaq:</span>
              <span>「我怎會與你無關」 小時候我們相愛，因為莽莽撞撞所以分開。 後來的我們再遇見，你我都長大了，夢想都總算實現了… 不知道此刻，我們還適不適合再愛一遍。 转自AGA</span>

              <div class="otherMsg">
                <div class="date">8月27日 01:25</div>
                <div class="menu">
                  <span>
                    <i class="icon-zan iconfont"></i>191
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

          <el-pagination background layout="prev, pager, next" :total="30"></el-pagination>
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
      musicDetailMsg: this.$store.state.musicPlay.curMusicMsg,
      lyric: [[0, "正在加载歌词"]],   //歌词
    };
  },
  mounted() {
    // console.log(this.musicDetailMsg);
    this.$axios.get(`/api/lyric?id=${this.musicDetailMsg.id}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        let lyricArr=res.data.lrc.lyric.split("\n");

        // console.log(this.lyric)
      }
    });
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

.contentWrap .center .songWords {
  height: 260px;
  overflow: auto;
  padding: 10px 50px;
  position: relative;
  left: -40px;
}

.contentWrap .center .songWords::-webkit-scrollbar {
  width: 0;
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
  background: rgb(163, 153, 153);
  color: #fff;
  box-shadow: 0 0 10px rgb(139, 120, 120);
}

.contentWrap .center .albumImg {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  position: relative;
  border: 10px solid rgb(185, 163, 163);
  box-sizing: border-box;
  margin-left: -40px;
}

.discContainer {
  margin-top: 60px;
  width: 220px;
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
  width: 220px;
  height: 220px;
  position: relative;
  top: -72px;
}

.disc img:nth-child(1) {
  width: 100%;
}

.disc .musicAvatar {
  position: absolute;
  top: 35px;
  left: 35px;
  width: 150px;
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

.contentWrap .comment .commentWrap .userImg {
  width: 110px;
  border-right: 50%;
  overflow: hidden;
  margin-right: 8px;
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
  background: rgb(163, 153, 153);
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