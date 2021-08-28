export const methods = {
    // 深度比较
    isEqual: function (obj1, obj2) {
        // 基本类型值的比较
        if (!(typeof obj1 === 'object' && obj1 != null) && !(typeof obj2 === 'object' && obj2 != null)) {
            return obj1 === obj2;
        }

        // 两个对象地址相同
        if (obj1 === obj2) {
            return true;
        }

        // 比较两个对象key值的长度
        let obj1key = Object.keys(obj1);
        let obj2key = Object.keys(obj2);
        if (obj1key.length !== obj2key.length) {
            return false;
        }

        // 以obj1为基准，递归比较两个对象
        for (let key in obj1) {
            let res = methods.isEqual(obj1[key], obj2[key]);
            if (!res) {
                return false;
            }
        }
        return true;
    },

    // 节流
    throttle: function (fn, delay = 500) {
        let timer = null;
        return function () {
            if (timer) {
                return
            }
            timer = setTimeout(() => {
                fn.call(this, ...arguments);
                timer = null;
            }, delay)
        }
    },

    // 防抖
    dbounce: function (fn, delay = 500) {
        let timer = null;
        return function () {
            let firstClick = !timer;
            if (timer) {
                clearTimeout(timer);
            }
            if (firstClick) {
                fn.call(this, ...arguments);
            }
            timer = setTimeout(() => {
                timer = null;
            }, delay)
        }
    }
}