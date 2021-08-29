<template>
  <div class="searchTipWrap">
    <!--热搜榜-->
    <ul v-if="!searchVal">
      <li class="hot">热搜榜</li>
      <li v-for="(item,index) in hotSearch" :key="item.score">
        <span>{{index+1}}</span>
        <div class="word">
          <p>
            {{item.searchWord}}
            <img src="@/assets/hot.png" v-if="item.iconType===1" />
            <img src="@/assets/new.png" v-if="item.iconType===0" />
            <img src="@/assets/toparrow.png" v-if="item.iconType===2" />
            <i class="score">{{item.score}}</i>
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
        <li>
          <i class="icon-danqu iconfont"></i>
          单曲
        </li>
        <li></li>
      </ul>

      <ul>
        <li>
          <i class="icon-geshou iconfont"></i>
          歌手
        </li>
      </ul>

      <ul>
        <li>
          <i class="icon-zhuanji iconfont"></i>
          专辑
        </li>
      </ul>

      <ul>
        <li>
          <i class="icon-gedan iconfont"></i>
          歌单
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
    searchUserData: {
      type: Array,
    },
  },
  data() {
    return {
      hotSearch: [],
    };
  },
  mounted() {
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
  border-radius: 5px;
  overflow: auto;
}

.searchTipWrap::-webkit-scrollbar {
  width: 0;
}

.searchTipWrap ul {
  height: 100%;
}

.searchTipWrap li {
  font-size: 14px;
  padding: 2px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.searchTipWrap li:first-child {
  font-size: 15px;
  color: rgba(7, 2, 2, 0.5);
  margin-bottom: -18px;
}

.searchTipWrap li:not(.hot) span {
  margin-right: 25px;
  font-size: 18px;
  color: rgba(7, 2, 2, 0.4);
  display: inline-block;
  width: 3%;
}

.searchTipWrap li:nth-of-type(2) span,
.searchTipWrap li:nth-of-type(3) span,
.searchTipWrap li:nth-of-type(4) span {
  color: red;
}

.searchTipWrap li:nth-of-type(2) .word p:first-child,
.searchTipWrap li:nth-of-type(3) .word p:first-child,
.searchTipWrap li:nth-of-type(4) .word p:first-child {
  font-weight: 800;
}

.searchTipWrap li:not(.hot) .word {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  top: -10px;
  position: relative;
}

.searchTipWrap li:not(.hot) .word .score {
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
}

.searchTipWrap li:not(.hot) .word p {
  width: 95%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.searchTipWrap li:not(.hot) .word p:first-child img {
  width: 12%;
}

.searchTipWrap li .word p:last-child {
  color: rgba(7, 2, 2, 0.4);
  font-size: 12px;
}

.searchTipWrap li:not(.hot) p:last-child {
  margin: -35px 0;
}

.searchTipWrap li:not(.hot):hover {
  background: rgba(0, 0, 0, 0.1);
}

/*查找榜 */
.searchTipWrap .result {
  font-size: 14px;
  padding: 2px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-size: 15px;
  color: rgba(7, 2, 2, 0.5);
  margin-bottom: -18px;
}

.searchList .result i {
  font-size: 12px;
  margin-left: 3px;
}

.searchList ul li:first-child {
  background: rgba(0, 0, 0, 0.1);
}

.searchList ul li:first-child i {
  font-weight: 800;
  margin-right: 5px;
}
</style>