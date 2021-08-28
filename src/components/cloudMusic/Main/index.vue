<template>
  <el-main>
    <div class="main_wrap">
      <Index />
    </div>
  </el-main>
</template>

<script>
import Index from "@/components/cloudMusic/Main/IndexPage";

export default {
  name: "musicMain",
  components: {
    Index,
    showIndex: true,
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