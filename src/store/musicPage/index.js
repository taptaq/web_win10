export default {
    namespaced: true,
    state: {
        showIndexPage:false,   //音乐主页
        showPersonalPage:false,   //个人页面
        showSearchResult:true   //搜索页面
    },
    mutations: {
        //  控制显示音乐首页
       changeShowIndex(state,value){
           state.showIndexPage=value;
       },

       //  控制显示个人首页
       changeShowPersonal(state,value){
           state.showPersonalPage=value;
       },

       //  控制显示搜索页面
       changeShowSearch(state,value){
        state.showSearchResult=value;
    }
    },
    actions: {},
}