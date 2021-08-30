<template>
  <el-main>
    <div class="main_wrap">
      <IndexPage v-show="$store.state.musicPage.showIndexPage" />
      <PersonalPage v-show="$store.state.musicPage.showPersonalPage" />
      <SearchResult v-show="$store.state.musicPage.showSearchResult" />
    </div>
  </el-main>
</template>

<script>
import IndexPage from "@/components/cloudMusic/Main/IndexPage";
import PersonalPage from "@/components/cloudMusic/Main/PersonalPage";
import SearchResult from "@/components/cloudMusic/Main/SearchResult";

export default {
  name: "musicMain",
  components: {
    IndexPage,
    PersonalPage,
    SearchResult
  },
};
</script>

<style scoped>
.el-main {
  color: #333;
  text-align: center;
  position: relative;
  overflow: auto;
}
</style>