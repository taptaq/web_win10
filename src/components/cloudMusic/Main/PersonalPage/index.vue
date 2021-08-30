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
          <i class="icon-nv iconfont" v-if="personalData.profile.gender===0"></i>

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
            <span>四川省成都市</span>
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
        <span>(2)</span>
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
          <p>累计听歌1025首</p>
        </div>
        <div class="item" v-for="item in userSongList" :key='item.id'>
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
      userSongList:[]
    };
  },
  mounted() {
    try {
      this.personalData = JSON.parse(
        window.localStorage.getItem("userOtherInfo")
      );

      this.getUserSongList();

    //   console.log(this.personalData);
    } catch (error) {
      consoel.log(error.message);
    }
  },

  methods: {
    //   获取用户的歌单
    async getUserSongList() {
      let result = await this.$axios.get(
        `/api/user/playlist?uid=${window.localStorage.getItem("userId")}`
      );
      if (result.status === 200) {
        // console.log(result.data);
        this.userSongList=result.data.playlist
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
  width: 180px;
  height: 180px;
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
  margin-left: 20px;
  width: 70%;
}

.personalWrap .personalMsg .detailMsg div {
  display: inline-block;
}

.personalWrap .personalMsg .detailMsg .username {
  font-size: 28px;
  font-weight: 600;
}

.personalWrap .personalMsg .detailMsg .baseMsg {
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}

.personalWrap .personalMsg .detailMsg .baseMsg span {
  margin-right: 10px;
  display: inline-block;
  font-size: 12px;
}

.personalWrap .personalMsg .detailMsg .baseMsg span:first-child {
  padding: 1px 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.personalWrap .personalMsg .detailMsg .baseMsg span:last-child {
  position: absolute;
  right: 0;
  top: -6px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 3px 12px;
  font-size: 14px;
  border-radius: 15px;
  cursor: pointer;
}

.personalWrap .personalMsg .detailMsg .baseMsg span:last-child:hover {
  background: rgba(0, 0, 0, 0.1);
}

.personalWrap .personalMsg .detailMsg .baseMsg span:last-child i {
  font-size: 16px;
}

.personalWrap .personalMsg .detailMsg .baseMsg i {
  position: relative;
  top: 1px;
}

.personalWrap .personalMsg div.menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-size: 12px;
}

.personalWrap .menu div {
  width: 7%;
  cursor: pointer;
}

.personalWrap .menu i {
  font-size: 48px;
  color: rgba(0, 0, 0, 0.1);
}

.personalWrap .menu div p:first-child {
  font-size: 20px;
}

.personalWrap .personalMsg .detailMsg .address {
  font-size: 12px;
}

.personalWrap .personalMsg .detailMsg .address div {
  display: block;
  margin-bottom: 3px;
}

/*我的歌单 */
.songsList {
  width: 100%;
  margin-top: 50px;
}
.songsList div {
  text-align: left;
}

.songsList .listWrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.songsList .listWrap .item:first-child .img{
    background: rgba(0, 0, 0, 0.8);
}

.songsList .listWrap .item:first-child img{
    width:100%;
    height:100%;
    position:absolute;
  transform: scale(0.6);
}

.songsList .listWrap div {
  margin-right: 16px;
  font-size: 12px;
  width: 22%;
  margin-bottom: 160px;
  cursor: pointer;
  overflow: hidden;
}

.songsList .listWrap div .img {
  width: 100%;
  height: 74%;
  background: #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
}

.songsList .listWrap div .img .playCount {
  position: absolute;
  left: .5rem;
  top: .1875rem;
  color: #fff;
  font-size: .75rem;
  text-shadow: 0 0 .5rem rgb(90, 82, 82);
}

.songsList .listWrap div .img .playCount i {
  font-size: .75rem;
  margin-right: .1875rem;
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

.songsList .listWrap .item p:last-child{
    color:rgba(0, 0, 0, 0.5)
}
</style>