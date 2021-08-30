<template>
  <div class="searchWrap">
    <h3>找到300首单曲</h3>

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

    <div class="content">
      <ul class="musicTitle">
        <li>音乐标题</li>
        <li>1111</li>
      </ul>
      <ul class="singer">
        <li>歌手</li>
        <li>11111</li>
      </ul>
       <ul class="album">
        <li>专辑</li>
      </ul>
       <ul class="time">
        <li>时长</li>
      </ul>
       <ul class="hot">
        <li>热度</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchResult",
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

.searchWrap .content {
  margin-top: 20px;
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: flex-start;
}

.searchWrap .content ul{
    display: flex;
    flex-direction: column;
}

.searchWrap .content ul li:first-child{
color: rgba(0, 0, 0, 0.5);
}


.searchWrap .content .musicTitle {
  width: 100%;
  text-align: center;
}

.searchWrap .content .singer {
  width: 50%;
}

.searchWrap .content .album {
  width: 12%;
}

.searchWrap .content .time {
  width: 5%;
}
</style>