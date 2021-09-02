<template>
  <div class="cloudMusic_body">
    <el-container direction="vertical">
      <Header />
      <el-container>
        <Aside />
        <Main />
      </el-container>
      <Footer></Footer>
    </el-container>

    <LoginWrap v-if="$store.state.musicLogin.showLogin" />

    <MusicDetail
      v-if="$store.state.musicPage.showSongDetail"
      :lyric="lyric"
      :commentMsg="commentMsg"
    />
  </div>
</template>

<script>
import Header from "@/components/cloudMusic/Header";
import Aside from "@/components/cloudMusic/Aside";
import Footer from "@/components/cloudMusic/Footer";
import Main from "@/components/cloudMusic/Main";
import LoginWrap from "@/components/cloudMusic/LoginWrap";
import MusicDetail from "@/components/cloudMusic/MusicDetail";
export default {
  name: "cloudMusic",
  components: {
    Header,
    Aside,
    Footer,
    Main,
    LoginWrap,
    MusicDetail,
  },

  data() {
    return {
      lyric: [[0, "正在加载歌词..."]], //歌词
      isShowSongDetail: false, //歌曲详情页是否显示
      deleteCard: false, //是否删除歌曲详情页的内容
      // 评论的相关数据
      commentMsg: {
        comments: {}, // 评论数据
        isCommentLoading: true, //评论是否加载中
        curCommentPage: 1, //当前评论页面的页数
        hotComments: [], // 热门评论
      },
    };
  },

  // 要在父组件中监听子组件的数据
  watch: {
    "$store.state.musicPage.showSongDetail"(isShowSongDetail) {
      this.isShowSongDetail = isShowSongDetail;
      //   性能优化
      // 如果卡片没有展示就不发送请求和渲染里面的内容
      // 删除定时器 避免用户在关闭卡片的1s内又打开卡片 导致展示内容被删除
      // clearTimeout(timer);
      this.deleteCard = false;
      // if (
      //   isShowSongDetail &&
      //   !this.comment.comments &&
      //   this.$store.state.musicPlay.curMusicId !== ""
      // ) {
      this.getLyric(this.$store.state.musicPlay.curMusicId);
      this.getComment(this.$store.state.musicPlay.curMusicId);
      // }
      // 当卡片关闭时 延迟 3s再删除里面渲染的内容 提升体验
      // else if (isShowSongDetail === false) {
      //   timer = setTimeout(() => {
      //     this.deleteCard = true;
      //   }, 3000);
      // }
    },
  },

  methods: {
    // 请求歌词数据
    getLyric(id) {
      this.$axios.get(`/api/lyric?id=${id}`).then((res) => {
        if (res.status === 200) {
          let lyricArr = res.data.lrc.lyric.split("\n");
          let arr = [];
          let result = [];
          lyricArr.forEach((item) => {
            arr.push(item.substring(1).split("]"));
          });

          arr.forEach((item) => {
            let time = item[0];
            let words = item[1];
            time = item[0].split(":");
            result.push([
              parseInt(time[0], 10) * 60 + parseFloat(time[1]),
              words,
            ]); //将时间转化为对应的秒数，和歌词一起放入result数组
          });
          this.lyric = result;
        }
      });
    },

    // 请求评论数据
    async getComment(id, type) {
      // 获取时间戳
      var timestamp = Date.parse(new Date());
      this.commentMsg.isCommentLoading = true;

      // 当页数为第一页时，请求10条热门数据
      if (this.commentMsg.curCommentPage === 1) {
        let res = await this.$axios.get(
          `/api/comment/hot?id=${id}&limit=10&type=0&timestamp=${timestamp}`
        );
        if (res.data.code != 200) {
          this.$message.error("获取热门评论失败,请稍后重试!");
          return;
        }
        this.commentMsg.hotComments = res.data.hotComments;
      }

      // 获取普通评论
      let res = await this.$axios.get(
        `/api/comment/music?id=${id}&offset=${
          (this.commentMsg.curCommentPage - 1) * 20
        }&timestamp=${timestamp}`
      );
      if (res.data.code !== 200) {
        this.$message.error("获取评论失败,请稍后重试!");
      }

      this.commentMsg.isCommentLoading = false;
      this.commentMsg.comments = res.data;
    },
  },
};
</script>

<style scoped>
.cloudMusic_body {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 62rem;
  height: 35rem;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.625rem #ccc;
  z-index: 1000;
  overflow: hidden;
}

/*基础容器布局 */
.el-main::-webkit-scrollbar,
.el-aside::-webkit-scrollbar {
  width: 0;
}

.el-container:nth-child(2) {
  height: 27rem;
}
</style>