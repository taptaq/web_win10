<template>
<div class='bannerWrap'>
  <div class="banner-box" ref="bannerBox">
    <div class="wrapper">
      <div v-for="item in bannerImg" :key="item.index" :class="item.className" :style="item.sty">
        <img :src="item.imageUrl" alt />
      </div>
    </div>

    <div class="arrow arrow-left" @click="toPreThrottle">
      <i class="icon-arrow-left-copy iconfont"></i>
    </div>
    <div class="arrow arrow-right" @click="toNextThrottle">
      <i class="icon-arrow-left-copy-copy iconfont"></i>
    </div>
  </div>
  </div>
</template>

<script>
import { methods as utils } from "@/utils";
export default {
  name: "banner",
  data() {
    return {
      bannerImg: [],
      initial: 0,
      timer: null,
    };
  },
  mounted() {
    this.$axios
      .get("/api/banner?type=0")
      .then((res) => {
        // console.log(res.data.banners);
        if (res.data.code === 200) {
          this.bannerImg = res.data.banners;
          this.bannerImg = this.computedImg(this.initial, this.bannerImg);
          this.autoPlay();
        }
      });

    this.$refs.bannerBox.addEventListener("mouseenter", () => {
      clearInterval(this.timer);
    });
    this.$refs.bannerBox.addEventListener("mouseleave", () => {
      this.autoPlay();
    });
  },

  watch: {
    //   监听initial的值的变化，重新触发computedImg方法，重新返回新的数据数组
    initial: {
      immediate: true,
      handler() {
        this.bannerImg = this.computedImg(this.initial, this.bannerImg);
      },
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    // 处理数据中每一张图片的样式
    computedImg(initial, imgs) {
      //  确保3项索引是合法的处理
      let len = imgs.length;
      initial = initial < 0 ? 0 : initial >= len ? len - 1 : initial;

      let left = initial - 1,
        center = initial,
        right = initial + 1;
      left < 0 ? (left = left + len) : null;
      right >= len ? (right = right - len) : null;

      return imgs.map((item, index) => {
        let zIndex = 0,
          className = "slide",
          transform = "translateX(-50%) scale(0.75)";

        switch (index) {
          case center:
            zIndex = 2;
            className = "slide active";
            transform='';
            break;
          case left:
            zIndex = 1;
            transform = "translateX(-85%) scale(0.7)";
            break;
          case right:
            zIndex = 1;
            transform = "translateX(-15%) scale(0.7)";
            break;
          default:
            break;
        }

        item.sty = {
          zIndex,
          transform,
        };
        item.className = className;

        return item;
      });
    },

    // 自动轮播
    autoPlay() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.initial++;
        if (this.initial >= this.bannerImg.length) {
          this.initial = 0;
        }
      }, 3000);
    },

    // 要节流处理
    // 点击上一张
    toPreThrottle: utils.throttle(function () {
      this.initial--;
      if (this.initial < 0) {
        this.initial = this.bannerImg.length - 1;
      }
    }, 200),

    // 点击下一张
    toNextThrottle: utils.throttle(function () {
      this.initial++;
      if (this.initial >= this.bannerImg.length) {
        this.initial = 0;
      }
    }, 200),
  },
};
</script>

<style scoped>
.banner-box {
  margin-top: 3.4375rem;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
  cursor: pointer;
  z-index:0
}

.banner-box:hover .arrow {
  opacity: 1;
}

.banner-box .wrapper {
  width: 100%;
  height: 100%;
}

.banner-box .wrapper .slide {
  width: 66%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.7);
  transition: 0.3s;
}

.banner-box .wrapper .slide img {
  width: 100%;
  height: 95%;
  margin: 0.3125rem auto;
  border-radius: 0.625rem;
}

.banner-box .wrapper .slide.active {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.9);
}

.banner-box .arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.1875rem;
  height: 2.1875rem;
  line-height: 2.1875rem;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: pointer;
  border-radius: 50%;
  z-index: 5;
  opacity: 0;
  transition: all 0.5s;
}

.banner-box .arrow.arrow-left {
  left: 3.5rem;
}

.banner-box .arrow.arrow-right {
  right: 3.5rem;
}
</style>