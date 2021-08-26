export default {
    namespaced: true,
    state: {
        changeDeskAppClose:true   //主题壁纸应用的关闭状态
    },
    mutations: {
        // 修改主题壁纸应用的状态
        changDeskState(state,value){
            state.changeDeskAppClose=value;
        }
    },
    actions: {
    },
}