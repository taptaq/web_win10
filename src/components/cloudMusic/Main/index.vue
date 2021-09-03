<template>
  <el-main>
    <div class="main_wrap">
      <IndexPage v-if="$store.state.musicPage.showIndexPage" />
      <PersonalPage v-else-if="$store.state.musicPage.showPersonalPage" />
      <MoreHotComment v-else-if="$store.state.musicPage.showMoreComments" />
      <SearchResult v-show="$store.state.musicPage.showSearchResult" />
    </div>
  </el-main>
</template>

<script>
import IndexPage from "@/components/cloudMusic/Main/IndexPage";
import PersonalPage from "@/components/cloudMusic/Main/PersonalPage";
import SearchResult from "@/components/cloudMusic/Main/SearchResult";
import MoreHotComment from "@/components/cloudMusic/Main/MoreHotComment";

export default {
  name: "musicMain",
  components: {
    IndexPage,
    PersonalPage,
    SearchResult,
    MoreHotComment,
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