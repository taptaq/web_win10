<template>
  <div class="moreHotCommentWrap">
    <h3>精彩评论</h3>
    <div class="hotComment" v-loading="loading">
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

    <div class='finally' v-show="showFinally">到底啦~</div>
  </div>
</template>

<script>
export default {
  name: "moreHotComment",
  data() {
    return {
      hotCommentData: [],
      count: 1,
      loading: true,
      showFinally:false,
      flash:false   //当前音乐改变，则重新更新评论
    };
  },
  mounted() {
    this.getComment(this.$store.state.musicPlay.curMusicId);
  },

  watch:{
    "$store.state.musicPlay.curMusicId"(curMusicId){
      this.flash=true;
      this.getComment(curMusicId);
    }
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
      if (this.count === 0 || this.flash) {
        this.hotCommentData = res.data.hotComments;
      }
      this.loading=false;
      res.data.hotComments.forEach((item) => {
        this.hotCommentData.push(item);
      });
      if(res.data.hotComments.length===0){
          this.showFinally=true;
      }
    },
  },
};
</script>

<style scoped>
.moreHotCommentWrap {
  width: 100%;
  text-align: left;
  font-size: .75rem;
  margin-bottom: 3.125rem;
}

.moreHotCommentWrap h3 {
  font-size: 1.375rem;
  font-weight: 800;
  margin-bottom: .625rem;
}

.hotComment .userImg {
  border-radius: 50%;
  overflow: hidden;
  margin-right: .75rem;
  width: 2.375rem;
  height: 2.375rem;
  box-shadow: 0 0 .5rem rgb(177, 165, 165);
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
  margin: .3125rem;
  border-bottom: .0625rem solid #ccc;
  padding: .5rem 0;
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
  padding: .3125rem .625rem;
  border-radius: .5rem;
  margin: .1875rem 0;
}

.hotComment .commentContent .otherMsg {
  display: flex;
  justify-content: space-between;
  margin-top: .3125rem;
}

.hotComment .commentContent .otherMsg .date {
  color: rgba(0, 0, 0, 0.4);
}

.hotComment .commentContent .otherMsg .menu {
  width: 7.25rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  top: -0.3125rem;
}

.hotComment .commentContent .otherMsg .menu span {
  transform: scale(0.9);
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}

.hotComment .commentContent .otherMsg .menu span:first-child {
  font-size: .8125rem;
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

.finally{
  text-align: center;
  font-size: 1rem;
  margin-top: 5px;
}
</style>