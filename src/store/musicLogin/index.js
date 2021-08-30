export default {
    namespaced: true,
    state: {
        isLogin: Boolean(window.localStorage.getItem("isLogin")) || false, //网易云音乐登录状态
        showLogin: false, //登录界面的显示
        username: window.localStorage.getItem("username") || "未登录", //网易云用户名
        avatarImg: window.localStorage.getItem("avatarImg") || "", //网易云用户头像
    },
    mutations: {
        // 修改网易云音乐登录状态
        changLoginState(state, value) {
            state.isLogin = value;
        },

        // 控制网易云音乐登录界面的显示
        changeLoginWrapState(state, value) {
            state.showLogin = value
        },

        // 修改用户名
        changeUserName(state, value) {
            state.username = value
        },

        // 修改用户头像
        changeAvatarImg(state, value) {
            state.avatarImg = value
        },
    },
    actions: {},
}