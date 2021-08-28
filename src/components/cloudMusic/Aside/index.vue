<template>
  <el-aside width="200px">
    <div class="aside_wrap">
      <ul ref="asideWrap">
        <li class="active">发现音乐</li>
        <li>博客</li>
        <li>视频</li>
        <li>朋友</li>
        <li>直播</li>
        <li>私人FM</li>

        <li class="titleItem">我的音乐</li>
        <li>
          <i class="icon-download iconfont"></i>
          本地与下载
        </li>
        <li>
          <i class="icon-zuijinbofang iconfont"></i>
          最近播放
        </li>
        <li>
          <i class="icon-yunpan1 iconfont"></i>
          我的音乐云盘
        </li>
        <li>
          <i class="icon-1230 iconfont"></i>
          我的博客
        </li>
        <li>
          <i class="icon-wodeshoucang iconfont"></i>
          我的收藏
        </li>

        <li class="titleItem">
          创建的歌单
          <i class="icon-hao iconfont"></i>
        </li>
        <li>
          <i class="icon-xihuan iconfont"></i>
          我喜欢的音乐
        </li>
        <li>
          <i class="icon-gedan iconfont"></i>
          Taptaq的年度歌单
        </li>
      </ul>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "musicAside",
  mounted() {
    this.$refs.asideWrap.addEventListener("click", (e) => {
      this.$refs.asideWrap.children.forEach(item=>{
          item.classList.remove('active');
      })
      if (e.target.tagName === "LI" && e.target.className !== "titleItem") {
        e.target.classList.add("active");
      }
    });
  },
};
</script>

<style scoped>
.el-aside {
  color: #333;
  border-right: 0.0625rem solid #ccc;
  overflow: auto;
  cursor: pointer;
}

.el-aside .aside_wrap {
  padding: .625rem;
  font-size: .875rem;
}

.el-aside li {
  padding: .5rem;
  padding-right: .5rem;
  margin: .125rem 0;
  width:10.9375rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

}

.el-aside li:hover:not(.titleItem) {
  background: #ccc;
}

.el-aside li.active {
  background: #ccc;
  font-weight: 800;
  font-size: 1rem;
}

.el-aside .titleItem {
  cursor: default;
  font-size: .875rem;
  color: rgb(158, 144, 144);
  margin-top: .3125rem;
}

.el-aside .titleItem:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
</style>