export default {
    namespaced: true,
    state: {
        changeDeskAppClose:true,   //主题壁纸应用的关闭状态
        musicAppClose:true,   //网易云应用的关闭状态
        zIndex:100   //各应用的层级
    },
    mutations: {
        // 修改主题壁纸应用的状态
        changDeskState(state,value){
            state.changeDeskAppClose=value;
        },
        // 修改音乐应用的状态
        changMusicState(state,value){
            state.musicAppClose=value;
        },

        // 修改应用的层级
        changeZIndex(state,value){
            state.zIndex+=value;
        }
    },
    actions: {
    },
}