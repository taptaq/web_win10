<template>
  <div class='recommend_body'>
    <!-- 轮播图 -->
    <div class="banner">
      <Banner />
    </div>

    <!-- 推荐歌单 -->
    <div class="recommendSong">
      <h3>
        推荐歌单
        <i class="icon-arrow-left-copy-copy iconfont"></i>
      </h3>
      <div class="recommendList">
        <div class="listItem" v-for="item in recommendData" :key="item.id">
          <div class="itemImg">
            <div class="playCount">
              <i class="icon-bofang iconfont"></i>
              <span>{{item.playCount}}</span>
            </div>
            <img :src="item.picUrl" alt />
            <div class="play">
              <i class="icon-bofang iconfont"></i>
            </div>
          </div>
          <p class="itemTitle">{{item.name}}</p>
        </div>
      </div>
    </div>

    <!-- 独家放送 -->
    <div class="pushSelf">
      <h3>
        独家放送
        <i class="icon-arrow-left-copy-copy iconfont"></i>
      </h3>
      <div class="pushList">
        <div class="listItem" v-for="item in pushData" :key="item.id">
          <div class="itemImg">
            <div class="playCount">
              <i class="icon-bofang iconfont"></i>
            </div>
            <img :src="item.picUrl" alt />
          </div>
          <p class="itemTitle">{{item.name}}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="newMusic">
      <h3>
        最新音乐
        <i class="icon-arrow-left-copy-copy iconfont"></i>
      </h3>
      <div class="musicList">
        <div class="listItem" v-for="item in newMusic" :key="item.id">
          <div class="itemImg">
            <div class="playCount">
              <i class="icon-bofang iconfont"></i>
            </div>
            <img :src="item.picUrl" alt />
          </div>
          <div class="itemTitle">
            <div class="songName">{{item.name}}</div>
            <div class="songMsg">
              <p class="SQ">SQ</p>
              <p class="MV">MV</p>
              <p
                v-for="item1 in item.song.album.artists"
                :key="item1.id"
                class="artist"
              >{{item1.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--推荐MV-->
    <div class="recommendMV">
      <h3>
        推荐MV
        <i class="icon-arrow-left-copy-copy iconfont"></i>
      </h3>
      <div class="MVList">
        <div class="listItem" v-for="item in recommendMV" :key="item.id">
          <div class="itemImg">
            <div class="playCount">
              <i class="icon-bofang iconfont"></i>
              <span>{{item.playCount}}</span>
            </div>
            <img :src="item.picUrl" alt />
          </div>
          <div class="itemTitle">
            <p class="MVName">{{item.name}}</p>
            <div class="artist">
              <p v-for="item1 in item.artists" :key="item1.id">
                {{item1.name}}
                <span v-if="item.artists.length>1">/</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/cloudMusic/Rotation_banner";
export default {
  name: "specificRecommend",
  data() {
    return {
      recommendData: [],
      pushData: [],
      newMusic: [],
      recommendMV: [],
    };
  },
  components: {
    Banner,
  },
  mounted() {
    // 获取推荐歌单的数据
    this.$axios
      .get(`${process.env.VUE_APP_BASE_API}/personalized?limit=10`)
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.recommendData = res.data.result;
        }
      });

    // 获取独家放送的数据
    this.$axios
      .get(`${process.env.VUE_APP_BASE_API}/personalized/privatecontent`)
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.pushData = res.data.result;
        }
      });

    // 获取最新音乐的数据
    this.$axios
      .get(`${process.env.VUE_APP_BASE_API}/personalized/newsong?limit=12`)
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.newMusic = res.data.result;
        }
      });

    // 获取推荐MV的数据
    this.$axios
      .get(`${process.env.VUE_APP_BASE_API}/personalized/mv`)
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.recommendMV = res.data.result.slice(0, 3);
        }
      });
  },
};
</script>

<style scoped>

/*推荐歌单*/
.recommendSong {
  width: 100%;
  height: 23.75rem;
  margin-top: 16.375rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.recommendSong h3 {
  text-align: left;
  font-size: 1.1875rem;
  font-weight: 800;
  padding-left: .75rem;
    cursor: pointer;
}

.recommendSong .recommendList {
  width: 100%;
  height: 21.375rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: .625rem;
  cursor: pointer;
}

.recommendSong .recommendList .listItem {
  width: 7.6875rem;
  height: 8rem;
  margin-bottom: 3.8rem;
}

.recommendSong .recommendList .listItem .itemImg {
  box-shadow: 0 0 .3125rem #ccc;
  border-radius: .5rem;
  height: 7.5625rem;
  width: 7.6875rem;
  margin-bottom: .625rem;
  overflow: hidden;
  position: relative;
}

.recommendSong .recommendList .listItem .itemImg:hover .play {
  opacity: 1;
}

.recommendSong .recommendList .listItem .itemImg .playCount {
  position: absolute;
  right: .3125rem;
  top: .1875rem;
  color: #fff;
  font-size: .75rem;
  text-shadow: 0 0 .5rem rgb(90, 82, 82);
}

.recommendSong .recommendList .listItem .itemImg .playCount i {
  font-size: .75rem;
  margin-right: .1875rem;
}

.recommendSong .recommendList .listItem .itemImg img {
  width: 100%;
  height: 100%;
}

.recommendSong .recommendList .listItem .itemImg .play {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  position: absolute;
  right: .3125rem;
  bottom: .5rem;
  background: #fff;
  line-height: 2rem;
  opacity: 0;
  transition: all 0.5s;
}

.recommendSong .recommendList .listItem .itemImg .play i {
  font-size: .875rem;
  color: red;
}

.recommendSong .recommendList .listItem .itemTitle {
  font-size: .7rem;
  text-align: left;
}

/*独家放送*/
.pushSelf {
  width: 100%;
  height: 12.5rem;
  margin-top: 4.5rem;
}

.pushSelf h3 {
  text-align: left;
  font-size: 1.1875rem;
  font-weight: 800;
  padding-left: .75rem;
    cursor: pointer;
}

.pushSelf .pushList {
  width: 43rem;
  height: 11.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: .625rem;
  cursor: pointer;
}

.pushSelf .pushList .listItem {
  width: 13.75rem;
  height: 7rem;
  margin-bottom: 3.75rem;
}

.pushSelf .pushList .listItem .itemImg {
  box-shadow: 0 0 .3125rem #ccc;
  border-radius: .5rem;
  height: 95%;
  width: 100%;
  margin-bottom: .625rem;
  overflow: hidden;
  position: relative;
}

.pushSelf .pushList .listItem .itemImg .playCount {
  position: absolute;
  left: .625rem;
  top: .3125rem;
  color: #fff;
  font-size: .75rem;
  width: 1.375rem;
  height: 1.375rem;
  line-height: 1.375rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  border: .0625rem solid #fff;
}

.pushSelf .pushList .listItem .itemImg .playCount i {
  font-size: .75rem;
  position: relative;
  left: .0625rem;
}

.pushSelf .pushList .listItem .itemImg img {
  width: 100%;
  height: 100%;
}

.pushSelf .pushList .listItem .itemTitle {
  font-size: .875rem;
  text-align: left;
}

/*最新音乐*/
.newMusic {
  width: 100%;
  height: 12.5rem;
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.newMusic h3 {
  text-align: left;
  font-size: 1.1875rem;
  font-weight: 800;
  padding-left: .75rem;
    cursor: pointer;
}

.newMusic .musicList {
  width: 43rem;
  height: 11.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: .625rem;
  cursor: pointer;
}

.newMusic .musicList .listItem {
  width: 12.875rem;
  height: 3.5rem;
  margin-bottom: .9375rem;
  display: flex;
  justify-content: flex-start;
}

.newMusic .musicList .listItem .itemImg {
  box-shadow: 0 0 .3125rem #ccc;
  border-radius: .5rem;
  height: 3.5rem;
  width: 3.5rem;
  margin-bottom: .625rem;
  overflow: hidden;
  position: relative;
  margin-right: .625rem;
}

.newMusic .musicList .listItem .itemImg .playCount {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: .75rem;
  width: 1.375rem;
  height: 1.375rem;
  line-height: 1.375rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 .3125rem #ccc;
}

.newMusic .musicList .listItem .itemImg .playCount i {
  font-size: .75rem;
  position: relative;
  left: .0625rem;
  color: red;
}

.newMusic .musicList .listItem .itemImg img {
  width: 100%;
  height: 100%;
}

.newMusic .musicList .listItem .itemTitle {
  font-size: .875rem;
  text-align: left;
  line-height: 1.75rem;
  width:8.5rem
}

.newMusic .musicList .listItem .itemTitle .songName {
  width: 9.375rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.newMusic .musicList .listItem .itemTitle .songMsg {
  width: 9.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.newMusic .musicList .listItem .itemTitle .songMsg p {
  display: inline-block;
  margin-right: .3125rem;
  font-size: .75rem;
  color: rgb(155, 137, 137);
  border-radius: .25rem;
}

.newMusic .musicList .listItem .itemTitle .songMsg .SQ,
.newMusic .musicList .listItem .itemTitle .songMsg .MV {
  width: 1.75rem;
  height: .9375rem;
  line-height: .9375rem;
  color: rgb(238, 126, 52);
  border: .0625rem solid rgb(238, 126, 52);
  text-align: center;
}

/*推荐MV */
.recommendMV {
  width: 100%;
  height: 14.0625rem;
  margin: 10rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.recommendMV h3 {
  text-align: left;
  font-size: 1.1875rem;
  font-weight: 800;
  padding-left: .75rem;
  cursor: pointer;
}


.recommendMV .MVList {
  width: 43rem;
  height: 14.0625rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: .625rem;
  cursor: pointer;
}

.recommendMV .MVList .listItem {
  width: 13.4375rem;
  height: 8.625rem;
  margin-bottom: 3.75rem;
  transform: scale(0.95);
}

.recommendMV .MVList .listItem .itemImg {
  box-shadow: 0 0 .3125rem #ccc;
  border-radius: .5rem;
  height: 7.75rem;
  width: 12.75rem;
  margin-bottom: .625rem;
  overflow: hidden;
  position: relative;
}

.recommendMV .MVList .listItem .itemImg .playCount {
  position: absolute;
  right: .3125rem;
  top: .1875rem;
  color: #fff;
  font-size: .75rem;
  text-shadow: 0 0 .3125rem rgb(129, 123, 123);
}

.recommendMV .MVList .listItem .itemImg .playCount i {
  font-size: .75rem;
  margin-right: .1875rem;
}

.recommendMV .MVList .listItem .itemImg img {
  width: 100%;
  height: 100%;
}

.recommendMV .MVList .listItem .itemTitle {
  font-size: .875rem;
  height: 10%;
  text-align: left;
}

.recommendMV .MVList .listItem .itemTitle .MVName {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width:100%
}

.recommendMV .MVList .listItem .itemTitle .artist {
  font-size: .75rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.recommendMV .MVList .listItem .itemTitle .artist p{
  display: inline-block;
}

.recommendMV .MVList .listItem .itemTitle .artist{
  color: rgb(155, 137, 137);
}
</style>