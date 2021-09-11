<template>
  <div class="personalWrap">
    <!--个人信息-->
    <div class="personalMsg">
      <div class="avatar">
        <img :src="$store.state.musicLogin.avatarImg" alt />
      </div>

      <div class="detailMsg">
        <div class="username">{{$store.state.musicLogin.username}}</div>

        <div class="baseMsg">
          <span>LV {{personalData.level}}</span>

          <i class="icon-nan iconfont" v-if="personalData.profile.gender===1"></i>
          <i class="icon-nv iconfont" v-else-if="personalData.profile.gender===0"></i>

          <span>
            <i class="icon-bianji iconfont"></i> 编辑个人信息
          </span>
        </div>

        <div class="menu">
          <div class="active">
            <p>{{personalData.profile.eventCount}}</p>
            <p>动态</p>
          </div>
          <i class="icon-vertical_line iconfont"></i>
          <div class="follow">
            <p>{{personalData.profile.follows}}</p>
            <p>关注</p>
          </div>
          <i class="icon-vertical_line iconfont"></i>
          <div class="fans">
            <p>{{personalData.profile.followeds}}</p>
            <p>粉丝</p>
          </div>
        </div>

        <div class="address">
          <div class="area">
            <span>所在地区：</span>
            <span>{{personalData.profile.province}}省{{personalData.profile.city}}市</span>
          </div>
          <div class="communication">
            <span>社交网络：</span>
            <span>xxx</span>
          </div>
          <div class="introduce">
            <span>个人介绍：</span>
            <span>{{personalData.profile.signature ? personalData.profile.signature :'暂无介绍'}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--歌单-->
    <div class="songsList">
      <div>
        我创建的歌单
        <span>({{personalData.profile.playlistCount}})</span>
      </div>

      <div class="listWrap">
        <div class="item">
          <div class="img">
            <img src="@/assets/paihang.png" alt />
            <div class="play">
              <i class="icon-bofang iconfont"></i>
            </div>
          </div>
          <p>我的听歌排行</p>
          <p>累计听歌{{personalData.listenSongs}}首</p>
        </div>
        <div class="item" v-for="item in userSongList" :key="item.id">
          <div class="img">
            <div class="playCount">
              <i class="icon-bofang iconfont"></i>
              <span>{{item.playCount}}</span>
            </div>
            <img :src="item.coverImgUrl" alt />
            <div class="play">
              <i class="icon-bofang iconfont"></i>
            </div>
          </div>
          <p>{{item.name}}</p>
          <p>{{item.trackCount}}首</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalPage",
  data() {
    return {
      personalData: {},
      userSongList: [],
    };
  },
  mounted() {
    try {
      this.personalData = JSON.parse(
        window.localStorage.getItem("userOtherInfo")
      );

      this.getUserSongList();
      // console.log(this.personalData);
    } catch (error) {
      console.log(error.message);
    }
  },

  methods: {
    //   获取用户的歌单
    async getUserSongList() {
      let result = await this.$axios.get(
        `${process.env.VUE_APP_BASE_API}/user/playlist?uid=${window.localStorage.getItem("userId")}`
      );
      if (result.status === 200) {
        // console.log(result.data);
        this.userSongList = result.data.playlist;
      }
    },
  },
};
</script>

<style scoped>
.personalWrap .personalMsg {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.personalWrap .personalMsg .avatar {
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  overflow: hidden;
}

.personalWrap .personalMsg .avatar img {
  width: 100%;
  height: 100%;
}

.personalWrap .personalMsg .detailMsg {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  margin-left: 1.25rem;
  width: 70%;
}

.personalWrap .personalMsg .detailMsg div {
  display: inline-block;
}

.personalWrap .personalMsg .detailMsg .username {
  font-size: 1.75rem;
  font-weight: 600;
}

.personalWrap .personalMsg .detailMsg .baseMsg {
  position: relative;
  padding-bottom: 0.625rem;
  border-bottom: 0.0625rem solid #ccc;
  margin-bottom: 0.3125rem;
}

.personalWrap .personalMsg .detailMsg .baseMsg span {
  margin-right: 0.625rem;
  display: inline-block;
  font-size: 0.75rem;
}

.personalWrap .personalMsg .detailMsg .baseMsg span:first-child {
  padding: 0.0625rem 0.625rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.625rem;
}

.personalWrap .personalMsg .detailMsg .baseMsg span:last-child {
  position: absolute;
  right: 0;
  top: -0.375rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.5);
  padding: 0.1875rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.9375rem;
  cursor: pointer;
}

.personalWrap .personalMsg .detailMsg .baseMsg span:last-child:hover {
  background: rgba(0, 0, 0, 0.1);
}

.personalWrap .personalMsg .detailMsg .baseMsg span:last-child i {
  font-size: 1rem;
}

.personalWrap .personalMsg .detailMsg .baseMsg i {
  position: relative;
  top: 0.0625rem;
}

.personalWrap .personalMsg div.menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-size: 0.75rem;
}

.personalWrap .menu div {
  width: 7%;
  cursor: pointer;
}

.personalWrap .menu i {
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.1);
}

.personalWrap .menu div p:first-child {
  font-size: 1.25rem;
}

.personalWrap .personalMsg .detailMsg .address {
  font-size: 0.75rem;
}

.personalWrap .personalMsg .detailMsg .address div {
  display: block;
  margin-bottom: 0.1875rem;
}

/*我的歌单 */
.songsList {
  width: 100%;
  margin-top: 3.125rem;
}
.songsList div {
  text-align: left;
}

.songsList .listWrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 0.625rem;
}

.songsList .listWrap .item:first-child .img {
  background: rgba(0, 0, 0, 0.8);
}

.songsList .listWrap .item:first-child img {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: scale(0.6);
}

.songsList .listWrap div {
  margin-right: 1rem;
  font-size: 0.75rem;
  width: 22%;
  margin-bottom: 10rem;
  cursor: pointer;
  overflow: hidden;
}

.songsList .listWrap div .img {
  width: 9.4rem;
  height: 9rem;
  background: #ccc;
  border-radius: 0.3125rem;
  margin-bottom: 0.3125rem;
  position: relative;
}

.songsList .listWrap div .img .playCount {
  position: absolute;
  left: 0.5rem;
  top: 0.1875rem;
  color: #fff;
  font-size: 0.75rem;
  text-shadow: 0 0 0.5rem rgb(90, 82, 82);
  width: 2.1875rem;
}

.songsList .listWrap div .img .playCount i {
  font-size: 0.75rem;
  margin-right: 0.1875rem;
}

.songsList .listWrap div .img .play {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: -9rem;
  background: #fff;
  line-height: 2.4rem;
  opacity: 0;
  transition: all 0.5s;
  text-align: center;
}

.songsList .listWrap div .img .play i {
  font-size: 1.2rem;
  color: red;
}

.songsList .listWrap div .img:hover .play {
  opacity: 1;
}

.songsList .listWrap .item p:last-child {
  color: rgba(0, 0, 0, 0.5);
}
</style>