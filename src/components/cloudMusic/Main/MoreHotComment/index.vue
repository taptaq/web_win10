<template>
  <div class="moreHotCommentWrap">
    <h3>精彩评论</h3>
    <div class="hotComment" v-loading="loading" v-loading.fullscreen.lock="fullscreenLoading">
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" :infinite-scroll-delay="1000" >
        <li class="commentItem" v-for="item in hotCommentData" :key="item.commentId">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "moreHotComment",
  data() {
    return {
      hotCommentData: [],
      count: 1,
      loading: true
    };
  },
  mounted() {
    this.getComment(this.$store.state.musicPlay.curMusicId);
  },

  methods: {
    load() {
      this.count++;
      this.getComment(this.$store.state.musicPlay.curMusicId);
    },

    // 请求评论数据
    async getComment(id) {
      let timestamp = Date.parse(new Date());

      let res = await this.$axios.get(
        `/api/comment/hot?id=${id}&offset=${(this.count - 1) * 20}&type=0`
      );
        if (res.data.code !== 200) {
          this.$message.error("获取评论失败,请稍后重试!");
        }
      if (this.count === 0) {
        this.hotCommentData = res.data.hotComments;
      }
      this.loading=false;
      res.data.hotComments.forEach((item) => {
        this.hotCommentData.push(item);
      });
    },
  },
};
</script>

<style scoped>
.moreHotCommentWrap {
  width: 100%;
  text-align: left;
  font-size: 12px;
}

.moreHotCommentWrap h3 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 10px;
}

.hotComment .userImg {
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  width: 38px;
  height: 38px;
  box-shadow: 0 0 8px rgb(177, 165, 165);
}

.hotComment .userImg img {
  width: 100%;
  height: 100%;
}

.hotComment .commentContent {
  width: 88%;
}

.hotComment {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hotComment .commentItem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
}

.hotComment .commentContent .username,
.hotComment .commentContent .reply span:first-child {
  cursor: pointer;
  color: rgb(97, 97, 201);
}

.hotComment .commentContent .reply {
  width: 100%;
  height: auto;
  line-height: 1.8;
  background: #ccc;
  padding: 5px 10px;
  border-radius: 8px;
  margin: 3px 0;
}

.hotComment .commentContent .otherMsg {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.hotComment .commentContent .otherMsg .date {
  color: rgba(0, 0, 0, 0.4);
}

.hotComment .commentContent .otherMsg .menu {
  width: 116px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  top: -5px;
}

.hotComment .commentContent .otherMsg .menu span {
  transform: scale(0.9);
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}

.hotComment .commentContent .otherMsg .menu span:first-child {
  font-size: 13px;
}

.hotComment .commentContent .otherMsg .menu span:first-child i {
  color: rgba(0, 0, 0, 0.3);
}

.hotComment .commentContent .otherMsg .menu span:first-child.active,
.contentWrap
  .comment
  .commentContent
  .otherMsg
  .menu
  span:first-child.active
  i {
  color: red;
}
</style>