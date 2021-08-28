import {methods} from '@/utils'

export default {
    namespaced: true,
    state: {
        opendAppArr: []
    },
    mutations: {
        // 增加打开应用的图标
        addOpendApp(state, value) {
            let flag=false;
            let arr = state.opendAppArr;
            // 重复的应用图标不能再添加了
            arr.forEach(item=>{
                if(methods.isEqual(item,value)){
                    flag=true;
                }
            })
            if(!flag){
                arr.push(value);
                state.opendAppArr = arr;
            }
            
        },
        // 删除打开应用的图标
        deleOpendApp(state, value) {
            let arr = state.opendAppArr.filter(item => value != item.id);
            state.opendAppArr = arr;
        }
    },
    actions: {},
}