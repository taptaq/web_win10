<template>
  <div class="searchWrap">
    <h3>找到{{songCount}}首单曲</h3>

    <ul class="category">
      <li class="active">单曲</li>
      <li>歌手</li>
      <li>专辑</li>
      <li>视频</li>
      <li>歌单</li>
      <li>歌词</li>
      <li>博客</li>
      <li>用户</li>
    </ul>

    <div class="multiMatch" v-if="multiMatch.artist && currentPage == 1">
      <div class="matchTitle">最佳匹配</div>
      <div class="matchResult">
        <div class="singer" v-for="item in multiMatch.artist" :key="item.id">
          <div class="matchCover">
            <img :src="item.img1v1Url + '?param==210y210'" alt />
          </div>
          <div class="matchName">
            歌手：{{ item.name }}
            <span>({{item.alias[0]}})</span>
          </div>
          <i class="iconfont icon-arrow-left-copy-copy"></i>
        </div>

        <div class="album" v-for="item in multiMatch.album" :key="item.id">
          <div class="matchCover">
            <img :src="item.blurPicUrl + '?param==210y210'" alt />
          </div>
          <div class="matchName">
            专辑：{{ item.name }}
            <p>{{item.artist.name}}</p>
          </div>
          <i class="iconfont icon-arrow-left-copy-copy"></i>
        </div>
      </div>
    </div>

    <el-table
      :data="detailSongsData"
      size="mini"
      style="width: 100%"
      highlight-current-row
      stripe
      @cell-click="clickCell"
      @cell-dblclick="clickRow"
    >
      <el-table-column label width="45" type="index" :index="handleIndex"></el-table-column>
      <el-table-column label width="65">
        <i class="icon-xihuan iconfont"></i>
        <i class="icon-xihuan1 iconfont notShow"></i>
        <i class="icon-xiazai iconfont"></i>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" min-width="210"></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" min-width="100"></el-table-column>
      <el-table-column prop="al.name" label="专辑" min-width="120" class="album"></el-table-column>
      <el-table-column prop="dt" label="时长" min-width="50"></el-table-column>
      <el-table-column prop="pop" label="热度" min-width="80"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page" v-if="detailSongsData.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="songCount"
        small
        :page-size="100"
        :current-page="currentPage"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { methods as utils } from "@/utils";
export default {
  name: "searchResult",
  data() {
    return {
      multiMatch: {},
      detailSongsData: [],
      searchVal: "",
      currentPage: 1,
      songCount: 0,
      limitCount: 100,
    };
  },
  created() {
    // 接收搜索词
    bus.$on("searchVal", (res) => {
      this.searchVal = res;
    });
  },
  watch: {
    // 请求详细的单曲数据
    searchVal(newVal) {
      this.getDetailSongsData(newVal);
      this.getMultMath(newVal);
    },
  },

  methods: {
    // 获取最佳匹配
    getMultMath(val) {
      let res = this.$axios
        .get(`/api/search/multimatch?keywords=${val}`)
        .then((res) => {
          this.multiMatch = res.data.result;
          // console.log(this.multiMatch);
        });
    },

    // 获取详细的单曲数据
    getDetailSongsData(val) {
      let offset = 100 * (this.currentPage - 1);
      this.$axios
        .get(
          `/api/cloudsearch?keywords=${val}&type=1&limit=${this.limitCount}&offset=${offset}`
        ) //单曲
        .then((res) => {
          // console.log(res.data.result);
          this.songCount = res.data.result.songCount;
          this.detailSongsData = res.data.result.songs;
          // 对数据的音乐时长进行处理
          this.detailSongsData.forEach((item, index) => {
            this.detailSongsData[index].pop =
              this.detailSongsData[index].pop + "%";
            this.detailSongsData[index].dt = utils.formatMusicTime(item.dt);
          });
        });
    },

    // 处理索引
    handleIndex(index) {
      index = index + 1 + 100 * (this.currentPage - 1);
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },

    // 改变页数
    pageChange(page) {
      this.currentPage = page;
      this.detailSongsData = [];
      this.getDetailSongsData(this.searchVal);
    },

    // 改变喜欢
    clickCell(row, column, cell) {
      if (
        cell.querySelector(".icon-xihuan") ||
        cell.querySelector(".icon-xihuan1")
      ) {
        let dislike = cell.children[0].children[0].classList.contains(
          "notShow"
        );
        let like = cell.children[0].children[1].classList.contains("notShow");
        // 判断点击的是否为喜欢按钮
        if (!dislike) {
          let like = true;
          this.$axios.get(`/api/like?id=${row.id}&like=${like}`).then((res) => {
            if (res.status === 200) {
              cell.children[0].children[0].classList.add("notShow");
              cell.children[0].children[1].classList.remove("notShow");
            }
          });
        } else if (!like) {
          let like = false;
          this.$axios.get(`/api/like?id=${row.id}&like=${like}`).then((res) => {
            if (res.status === 200) {
              cell.children[0].children[1].classList.add("notShow");
              cell.children[0].children[0].classList.remove("notShow");
            }
          });
        }
      }
    },

    // 双击table的row的事件，播放对应的音乐(把当前双击的歌曲插入到当前的歌单中)
    async clickRow(row) {
      // 首先获取当前的歌单列表和歌曲索引
      let curMuiscList = this.$store.state.musicPlay.curMuiscList;
      // console.log('1',curMuiscList);
      let curMusicIndex = this.$store.state.musicPlay.curMusicIndex;
      //  console.log('1',curMusicIndex);
      // 先判断该歌曲是否已经在歌单中存在，避免重复点击导致歌单出现相同歌曲
      let isExist = curMuiscList.find((item) => item.id == row.id);
      if (isExist) {
        // 如果已经存在 则只提交歌曲id并return（更新当前播放音乐的id）
        this.$store.commit("musicPlay/changeCurMusicId", row.id);
        return;
      }

      // 若点击的歌曲在歌单中不存在
      this.$store.commit("musicPlay/changePlayState", false); //把播放状态改为暂停状态
      // 将请求到的歌曲详情插入到歌单对应位置并提交至vuex
      curMuiscList.splice(curMusicIndex + 1, 0, row);
      //  console.log('2',curMuiscList);
      this.$store.commit("musicPlay/changeCurMusicId", row.id); // 更新当前播放音乐的id
      // console.log(this.$store.state.musicPlay.curMusicId);
      // 更新歌单列表和歌单id
      this.$store.commit("musicPlay/updateMusicList", {
        curMuiscList,
        musicListId: this.$store.state.musicPlay.curMuiscListId,
      });

      //  console.log(this.$store.state.musicPlay.curMuiscList);
      //   console.log(this.$store.state.musicPlay.curMuiscListId);
    },
  },
};
</script>

<style scoped>
.searchWrap {
  text-align: left;
}

.searchWrap h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

/*分类*/
.searchWrap ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
}

.searchWrap ul li {
  margin-right: 30px;
  font-size: 15px;
}

.searchWrap ul li.active {
  border-bottom: 3px solid rgb(236, 65, 65);
  padding-bottom: 2px;
  font-weight: 700;
}

/*最佳匹配区域*/
.searchWrap .multiMatch {
  width: 100%;
  margin-top: 10px;
}

.searchWrap .multiMatch .matchTitle {
  font-size: 14px;
  color: rgb(34, 34, 34);
  margin: 5px 0;
  font-weight: 700;
}

.searchWrap .multiMatch .matchResult {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  cursor: pointer;
}

.searchWrap .multiMatch .matchResult .singer,
.searchWrap .multiMatch .matchResult .album {
  border-radius: 5px;
  overflow: hidden;
  width: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
}

.searchWrap .multiMatch .matchResult i {
  position: absolute;
  right: 10px;
  top: 50%;
}

.searchWrap .multiMatch .matchCover {
  width: 80px;
  height: 80px;
}

.searchWrap .multiMatch .matchCover img {
  width: 100%;
  height: 100%;
}

.searchWrap .multiMatch .matchName {
  font-size: 15px;
  color: rgb(31, 31, 31);
  margin-left: 12px;
}

.searchWrap .multiMatch .matchName p {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}

.searchWrap .multiMatch .matchName span {
  margin-right: 5px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  position: relative;
  top: -1px;
}

.searchWrap .multiMatch i {
  position: absolute;
  transform: translateY(-50%);
  right: 15px;
  top: 50%;
}

.el-table {
  cursor: pointer;
}

.el-table .icon-xihuan {
  margin-right: 5px;
}

.el-table .icon-xihuan1 {
  color: red;
  margin-right: 5px;
  font-size: 14px;
}

.el-table .notShow {
  display: none;
}

.el-table .icon-xiazai {
  position: relative;
  top: -1px;
}

.el-table /deep/ .el-table_6_column_40 div {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.page {
  width: 95%;
  text-align: center;
  padding-bottom: 10px;
  margin: 30px 0;
}

.el-pagination.is-background .el-pager li:not(.disabled).active{
    background: red;
    opacity: 0.8;
}
</style>