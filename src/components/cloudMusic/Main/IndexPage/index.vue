<template>
  <div class="indexBody">
    <div class="indexHeader" ref="indexHeader">
      <div class="active">个性推荐</div>
      <div>专属订制</div>
      <div>歌单</div>
      <div>排行榜</div>
      <div>歌手</div>
      <div>最新音乐</div>
    </div>

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
              <span>{{item.playCount}}万</span>
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
    <div class='newMusic'>
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
            <div class='songName'>{{item.name}}</div>
            <div class='songMsg'>
              <p class='SQ'>SQ</p>
              <p class='MV'>MV</p>
              <p v-for="item1 in item.song.album.artists" :key="item1.id" class='artist'>{{item1.name}}</p>
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
  name: "musicIndex",
  data() {
    return {
      recommendData: [],
      pushData: [],
      newMusic:[]
    };
  },
  components: {
    Banner,
  },
  mounted() {
    this.$refs.indexHeader.addEventListener("click", (e) => {
      this.$refs.indexHeader.children.forEach((item) => {
        item.classList.remove("active");
      });
      if (e.target.tagName === "DIV") {
        e.target.classList.add("active");
      }
    });

    // 获取推荐歌单的数据
    this.$axios
      .get("https://cloud-music-liard.vercel.app/personalized?limit=10")
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.recommendData = res.data.result;
        }
      });

    // 获取独家放送的数据
    this.$axios
      .get("https://cloud-music-liard.vercel.app/personalized/privatecontent")
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.result);
          this.pushData = res.data.result;
        }
      });

      // 获取最新音乐的数据
    this.$axios
      .get("https://cloud-music-liard.vercel.app/personalized/newsong?limit=26")
      .then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.result);
          this.newMusic = res.data.result;
        }
      });
  },
};
</script>

<style scoped>
.indexBody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.indexHeader {
  display: flex;
  justify-content: flex-start;
  position: fixed;
  left: 200px;
  top: 60px;
  width: 80%;
  height: 55px;
  line-height: 38px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  background: #fff;
  z-index: 10;
  padding-right: 50px;
  font-size: 14px;
}

.indexHeader div {
  width: 17%;
  height: 82%;
}

.indexHeader div.active {
  font-weight: 800;
  font-size: 15px;
  transform: scale(1.2);
  border-bottom: 2px solid rgb(236, 65, 65);
}


/*推荐歌单*/
.recommendSong {
  width: 100%;
  height: 380px;
  margin-top: 38%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.recommendSong h3 {
  text-align: left;
  font-size: 19px;
  font-weight: 800;
  padding-left: 12px;
}

.recommendSong h3 i {
  margin-left: 5px;
}

.recommendSong .recommendList {
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  cursor: pointer;
}

.recommendSong .recommendList .listItem {
  width: 17.8%;
  height: 42%;
  margin-bottom: 60px;
}

.recommendSong .recommendList .listItem .itemImg {
  box-shadow: 0 0 5px #ccc;
  border-radius: 8px;
  height: 95%;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
}

.recommendSong .recommendList .listItem .itemImg:hover .play {
  opacity: 1;
}

.recommendSong .recommendList .listItem .itemImg .playCount {
  position: absolute;
  right: 5px;
  top: 3px;
  color: #fff;
  font-size: 12px;
  text-shadow: 0 0 5px rgb(129, 123, 123);
}

.recommendSong .recommendList .listItem .itemImg .playCount i {
  font-size: 12px;
  margin-right: 3px;
}

.recommendSong .recommendList .listItem .itemImg img {
  width: 100%;
  height: 100%;
}

.recommendSong .recommendList .listItem .itemImg .play {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  right: 5px;
  bottom: 8px;
  background: #fff;
  line-height: 32px;
  opacity: 0;
  transition: all 0.5s;
}

.recommendSong .recommendList .listItem .itemImg .play i {
  font-size: 14px;
  color: red;
}

.recommendSong .recommendList .listItem .itemTitle {
  font-size: 14px;
  height: 10%;
  text-align: left;
}


/*独家放送*/
.pushSelf {
  width: 100%;
  height: 200px;
  margin-top: 12%;
}

.pushSelf h3 {
  text-align: left;
  font-size: 19px;
  font-weight: 800;
  padding-left: 12px;
}

.pushSelf h3 i {
  margin-left: 5px;
}

.pushSelf .pushList {
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  cursor: pointer;
}

.pushSelf .pushList .listItem {
  width: 32%;
  height: 62%;
  margin-bottom: 60px;
}

.pushSelf .pushList .listItem .itemImg {
  box-shadow: 0 0 5px #ccc;
  border-radius: 8px;
  height: 95%;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
}

.pushSelf .pushList  .listItem .itemImg .playCount {
  position: absolute;
  left: 10px;
  top: 5px;
  color: #fff;
  font-size: 12px;
  width:22px;
  height:22px;
  line-height: 22px;
  background: rgba(0,0,0,.4);
  border-radius: 50%;
  border: 1px solid #fff;
}

.pushSelf .pushList  .listItem .itemImg .playCount i {
  font-size: 12px;
  position: relative;
  left:1px;
}

.pushSelf .pushList  .listItem .itemImg img {
  width: 100%;
  height: 100%;
}


.pushSelf .pushList  .listItem .itemTitle {
  font-size: 14px;
  height: 10%;
  text-align: left;
}


/*最新音乐*/
.newMusic {
  width: 100%;
  height: 200px;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.newMusic h3 {
  text-align: left;
  font-size: 19px;
  font-weight: 800;
  padding-left: 12px;
}

.newMusic h3 i {
  margin-left: 5px;
}

.newMusic .musicList {
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  cursor: pointer;
}

.newMusic .musicList .listItem {
  width: 30%;
  height: 30%;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
}

.newMusic .musicList .listItem .itemImg {
  box-shadow: 0 0 5px #ccc;
  border-radius: 8px;
  height: 100%;
  width: 24%;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;
}

.newMusic .musicList .listItem .itemImg .playCount {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 12px;
  width:22px;
  height:22px;
  line-height: 22px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px #ccc;
}

.newMusic .musicList .listItem .itemImg .playCount i {
  font-size: 12px;
  position: relative;
  left:1px;
  color: red;
}

.newMusic .musicList  .listItem .itemImg img {
  width: 100%;
  height: 100%;
}


.newMusic .musicList  .listItem .itemTitle {
  font-size: 14px;
  height: 10%;
  text-align: left;
  line-height: 28px;
}

.newMusic .musicList  .listItem .itemTitle .songName{
  width:150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.newMusic .musicList  .listItem .itemTitle .songMsg{
    width:158px;
    text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.newMusic .musicList  .listItem .itemTitle .songMsg p{
  display: inline-block;
  margin-right: 5px;
  font-size: 12px;
  color:rgb(196, 180, 180);
  border-radius: 4px;
}

.newMusic .musicList  .listItem .itemTitle .songMsg .SQ,
.newMusic .musicList  .listItem .itemTitle .songMsg .MV{
  width:28px;
  height:15px;
  line-height: 15px;
  color:rgb(238, 126, 52);
  border:1px solid rgb(238, 126, 52);
  text-align: center;
}

{
  
}
</style>