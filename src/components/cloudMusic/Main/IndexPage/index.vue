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

    <SpecificRecommend />
  </div>
</template>

<script>
import SpecificRecommend from "@/components/cloudMusic/Main/IndexPage/SpecificRecommend";
export default {
  name: "musicIndex",
  components: {
    SpecificRecommend,
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
  left: 12.5rem;
  top: 3.72rem;
  width: 47.8rem;
  height: 3.4375rem;
  line-height: 2.375rem;
  padding-left: 1.25rem;
  padding-top: .625rem;
  cursor: pointer;
  background: #fff;
  z-index: 1;
  padding-right: 3.125rem;
  font-size: .875rem;
}

.indexHeader div {
  width: 7.5625rem;
  height: 2.5625rem;
}

.indexHeader div.active {
  font-weight: 800;
  font-size: .9375rem;
  transform: scale(1.2);
  border-bottom: .125rem solid rgb(236, 65, 65);
}
</style>