export default {
    namespaced: true,
    state: {
        isLogin: false, //网易云音乐登录状态
        showLogin: false //登录界面的显示
    },
    mutations: {
        // 修改网易云音乐登录状态
        changLoginState(state, value) {
            state.isLogin = value;
        },

        // 控制网易云音乐登录界面的显示
        changeLoginWrapState(state, value) {
            state.showLogin = value
        }
    },
    actions: {},
}