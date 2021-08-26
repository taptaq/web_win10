export default {
    namespaced: true,
    state: {
        curBg:localStorage.getItem('deskBg') || 'http://qyfpfgs9h.hn-bkt.clouddn.com/deskbg.jpg'
    },
    mutations: {
        changeDesk(state,value){
            state.curBg=value;
        }
    },
    actions: {
    },
}