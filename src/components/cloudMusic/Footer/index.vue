<template>
  <el-footer height="72px">
    <div class="left">
      <div class="img">
        <img src alt />
      </div>

      <div class="songMsg">
        <p>
          天外来物
          <i class="icon-xihuan iconfont"></i>
        </p>
        <p>薛之谦</p>
      </div>
    </div>
    <div class="center">
      <div class="controls">
        <i class="icon-biao- iconfont"></i>
        <i class="icon-music-pre iconfont"></i>
        <i v-if='play' class="icon-zantingtingzhi iconfont" @click='play=!play'></i>
        <i v-else class='icon-bofang iconfont' @click='play=!play'></i>
        <i class="icon-music-next iconfont"></i>
        <div>词</div>
      </div>
      <div class="progress">
        <span>00:00</span>
        <el-progress :percentage="progress" :format="format" :show-text="false"></el-progress>
        <span>3:46</span>
      </div>
    </div>
    <div class="right">
      <div class='standard'>标准</div>
      <i class='icon-ttpodicon iconfont'></i>
      <i class='icon-shengyinyinliangmianxing iconfont'></i>
      <i class='icon-bofangliebiao iconfont'></i>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "musicFooter",
  data() {
    return {
      progress: 1,
      play:true
    };
  },
};
</script>

<style scoped>
.el-footer {
  width: 100%;
  border-top: 0.0625rem solid #ccc;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.el-footer .left {
  width: 18%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  left: -0.9375rem;
}

.el-footer .left div {
  display: inline-block;
}

.el-footer .left .img {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: .625rem;
  border: .0625rem solid #000;
}

.el-footer .left .songMsg p:last-child {
  font-size: .875rem;
}

.el-footer .left .songMsg p:first-child i{
  font-size: 1.0625rem;
}

.el-footer .center {
  width: 40%;
  position: relative;
  left: -1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: .75rem;
}

.el-footer .center .controls {
  display: flex;
  justify-content: space-evenly;
  margin: 0 2.5rem;
  font-size: .75rem;
}

.el-footer .center .controls i {
  font-size: 1.25rem;
}

.el-footer .center .controls div {
  border: .0625rem solid #000;
  width: 1.375rem;
  height: 1.375rem;
  text-align: center;
  line-height: 1.375rem;
  border-radius: 50%;
  position: relative;
  top: .125rem;
}

.el-footer .center .controls div:hover {
  background: #ccc;
  border: 0;
  color: #fff;
}

.el-footer .center .progress {
  position: relative;
}

.el-footer .center .progress span {
  position: absolute;
  color:#ccc;
}

.el-footer .center .progress span:first-child {
  left: -2.25rem;
  top: -0.3125rem;
}

.el-footer .center .progress span:last-child {
  right: -1.75rem;
  top: -0.375rem;
}

.el-footer .right{
  width:16%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: .6875rem;
  position: relative;
  right: -0.5rem;
}

.el-footer .right .standard{
  border:.0625rem solid #000;
  padding:.125rem .3125rem;
  position: relative;
  right:.5rem;
  top:.0625rem
}

.el-footer .right i{
    font-size: 1.25rem;
    margin: 0 .5rem;
}
</style>