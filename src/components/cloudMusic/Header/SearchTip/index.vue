<template>
  <div class="searchTipWrap">
    <!--热搜榜-->
    <ul v-if="!searchVal" class="hotList">
      <li class="hot">热搜榜</li>
      <li v-for="(item,index) in hotSearch" :key="item.score">
        <span>{{index+1}}</span>
        <div class="word">
          <p>
            {{item.searchWord}}
            <img src="@/assets/hot.png" v-if="item.iconType===1" />
            <img src="@/assets/new.png" v-if="item.iconType===3" />
            <i class="icon-jiantou1-copy-copy iconfont" v-if="item.iconType===2" />
            <span class="score">{{item.score}}</span>
          </p>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>

    <!--查找榜-->
    <div v-if="searchVal" class="searchList">
      <div class="result">
        搜"{{searchVal}}"的相关结果
        <i class="icon-arrow-left-copy-copy iconfont"></i>
      </div>
      <ul>
        <li class="title">
          <i class="icon-danqu iconfont"></i>
          单曲
        </li>
        <li v-for="item in searchSongsData" :key="item.id">{{item.name}} - {{item.artists[0].name}}</li>
      </ul>

      <ul>
        <li class="title">
          <i class="icon-geshou iconfont"></i>
          歌手
        </li>
        <li v-for="item in searchSingerData" :key="item.id">{{item.name}}</li>
      </ul>

      <ul>
        <li class="title">
          <i class="icon-zhuanji iconfont"></i>
          专辑
        </li>
        <li v-for="item in searchAlbumData" :key="item.id">{{item.name}} - {{item.artist.name}}</li>
      </ul>

      <ul>
        <li class="title">
          <i class="icon-gedan iconfont"></i>
          歌单
        </li>
        <li v-for="item in searchListData" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus"; //引入总线bus
export default {
  name: "searchTip",
  props: {
    searchVal: {
      type: String,
    },
    searchSongsData: {
      type: Array,
    },
    searchAlbumData: {
      type: Array,
    },
    searchSingerData: {
      type: Array,
    },
    searchListData: {
      type: Array,
    },
    detailData: {
      type: Object,
    },
  },
  data() {
    return {
      hotSearch: [],
    };
  },
  mounted() {
    // console.log(this.searchSongsData);
    //   获取热搜榜的数据
    this.$axios.get("/api/search/hot/detail").then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data);
        this.hotSearch = res.data.data;
      }
    });
  },
};
</script>

<style scoped>
.searchTipWrap {
  width: 35%;
  height: 70%;
  background: #fff;
  position: absolute;
  top: 9%;
  left: 25%;
  z-index: 1000;
  box-shadow: 0 0 0.3125rem #ccc;
  border-radius: .3125rem;
  overflow: auto;
}

.searchTipWrap::-webkit-scrollbar {
  width: 0;
}

.searchTipWrap .hotList {
  height: 100%;
}

.searchTipWrap .hotList li {
  font-size: .875rem;
  padding: .125rem .9375rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.searchTipWrap .hotList li:first-child {
  font-size: .9375rem;
  color: rgba(7, 2, 2, 0.5);
  margin-bottom: -1.125rem;
  margin-top: -0.5rem;
}

.searchTipWrap .hotList li:not(.hot) span {
  margin-right: 1.5625rem;
  font-size: 1.125rem;
  color: rgba(7, 2, 2, 0.4);
  display: inline-block;
  width: 3%;
}

.searchTipWrap .hotList .hotList li:nth-of-type(2) span,
.searchTipWrap .hotList .hotList li:nth-of-type(3) span,
.searchTipWrap .hotList .hotList li:nth-of-type(4) span {
  color: red;
}

.searchTipWrap .hotList li:nth-of-type(2) .word p:first-child,
.searchTipWrap .hotList li:nth-of-type(3) .word p:first-child,
.searchTipWrap .hotList li:nth-of-type(4) .word p:first-child {
  font-weight: 800;
}

.searchTipWrap .hotList li:not(.hot) .word {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  top: -0.625rem;
  position: relative;
}

.searchTipWrap .hotList li:not(.hot) .word .score {
  color: rgba(0, 0, 0, 0.4);
  font-size: .75rem;
}

.searchTipWrap .hotList li:not(.hot) .word p {
  width: 95%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.searchTipWrap .hotList li:not(.hot) .word p:first-child img {
  width: 11%;
}

.searchTipWrap .hotList li:not(.hot) .word p:first-child i {
  color: red;
  margin-right: .3125rem;
  font-size: .75rem;
}

.searchTipWrap .hotList li .word p:last-child {
  color: rgba(7, 2, 2, 0.4);
  font-size: .75rem;
}

.searchTipWrap .hotList li:not(.hot) p:last-child {
  margin: -2.1875rem 0;
}

.searchTipWrap .hotList li:not(.hot):hover {
  background: rgba(0, 0, 0, 0.1);
}

/*查找榜 */
.searchTipWrap .searchList .result {
  font-size: .875rem;
  padding: .125rem .9375rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-size: .9375rem;
  color: rgba(7, 2, 2, 0.5);
  margin-bottom: -1.125rem;
  margin-top: -0.5rem;
}

.searchTipWrap .searchList .result:hover {
  color: #000;
}

.searchList .result i {
  font-size: .75rem;
  margin-left: .1875rem;
  transform: scale(0.8);
}

.searchList ul li {
  font-size: .875rem;
  padding: 0 .9375rem;
  width: 100%;
  height: 1.875rem;
  line-height: 1.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.searchList ul li:hover {
  background: rgba(0, 0, 0, 0.1);
}

.searchList ul li:first-child {
  background: rgba(0, 0, 0, 0.1);
}

.searchList ul li:first-child i {
  font-weight: 800;
}

.searchList ul li:not(.title) {
  padding-left: 1.875rem;
}
</style>