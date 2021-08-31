export default {
    namespaced: true,
    state: {
        curMusicId: '', //当前播放音乐的id
        curMuiscList: [], //当前播放的音乐歌单
        curMuiscListId: '', //当前播放的音乐歌单的id
        currentTime: 0, //实时播放时长
        likeMuiscList: [], //喜欢音乐的列表
        isPlay: false, //播放状态
        curMusicIndex: -1, //当前播放音乐的索引
        isMusicLoad: false, //音乐是否在加载
        createdMusicList: [], // 用户创建的歌单
        curMuiscDuration:''   //当前音乐的时长
    },
    mutations: {
        // 改变当前播放音乐的地址
        changeCurMusicId(state, value) {
            state.curMusicId = value;
        },

        // 更新喜欢的音乐歌单
        changeLikeMusic(state, value) {
            state.likeMuiscList = value;
        },

        // 更新歌单列表和歌单id
        updateMusicList(state, payload) {
            // 当歌单id发生变化时,重置当前播放音乐索引
            if (payload.musicListId != state.musicListId) {
                state.musicListId = payload.musicListId;
                state.curMusicIndex = -1;
            }
            // 歌单id没有变化则对歌单进行深拷贝再赋值 直接赋值是浅拷贝
            // 歌单是固定的死数据，而vuex中的curMuiscList是动态的
            let curMuiscList = payload.curMuiscList.slice(0)
            state.curMuiscList = curMuiscList;
            // console.log(state.curMuiscList);
        },

        // 修改播放状态
        changePlayState(state, value) {
            state.isPlay = value;
        },


        // 更新音乐加载的状态
        changeMusicLoad(state, value) {
            state.isMusicLoad = value;
        },


        // 更新当前播放音乐的索引
        curMusicIndex(state, value) {
            state.curMusicIndex = value
        },

        // 更新当前播放的时间
        updateCurrentTime(state, value) {
            state.currentTime = value;
        },


        // 更新当前音乐的时长
        updateCurMuiscDuration(state,value){
            state.curMuiscDuration = value;
        }
    },
    actions: {},
}