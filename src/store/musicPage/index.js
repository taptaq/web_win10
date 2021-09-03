export default {
    namespaced: true,
    state: {
        showIndexPage: true, //音乐主页
        showPersonalPage: false, //个人页面
        showSearchResult: false, //搜索页面
        showSongDetail: false, //音乐对应的详情页面
        showMoreComments: false, //更多精彩评论的页面
    },
    mutations: {
        //  控制显示音乐首页
        changeShowIndex(state, value) {
            state.showIndexPage = value;
        },

        //  控制显示个人首页
        changeShowPersonal(state, value) {
            state.showPersonalPage = value;
        },

        //  控制显示搜索页面
        changeShowSearch(state, value) {
            state.showSearchResult = value;
        },

        //  控制显示音乐对应的详情页面
        changeShowSongDetail(state, value) {
            state.showSongDetail = value;
        },

         //  控制显示更多热门评论的详情页面
        changeShowMoreComments(state,value){
            state.showMoreComments = value;
        }
    },
    actions: {},
}