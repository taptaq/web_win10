<template>
  <div class="cloudMusic_body">
    <el-container direction="vertical">
      <Header />
      <el-container>
        <Aside />
        <Main/>
      </el-container>
      <Footer/>
    </el-container>

  <LoginWrap v-if="$store.state.musicLogin.showLogin"/>
  </div>
</template>

<script>
import Header from '@/components/cloudMusic/Header'
import Aside from '@/components/cloudMusic/Aside'
import Footer from '@/components/cloudMusic/Footer'
import Main from '@/components/cloudMusic/Main'
import LoginWrap from '@/components/cloudMusic/LoginWrap'
export default {
  name: "cloudMusic",
  components:{
    Header,
    Aside,
    Footer,
    Main,
    LoginWrap
  }
};
</script>

<style scoped>
.cloudMusic_body {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 62rem;
  height: 35rem;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.625rem #ccc;
  z-index: 1000;
  overflow: hidden;
}

/*基础容器布局 */
.el-main::-webkit-scrollbar,
.el-aside::-webkit-scrollbar {
  width: 0;
}

.el-container:nth-child(2) {
  height: 27rem;
}

</style>