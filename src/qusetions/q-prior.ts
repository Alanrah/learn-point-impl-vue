


// 使用vue或者react框架实现一个简版的搜索框组件，要求考虑通用，功能类比百度首页的搜索框
// 1.对于dom结构有比较准确的设计，元素使用正确以及属性使用正确。
// 2.对于组件的设计，希望可以回答出比较合理的props，data，methods设计以及必要的事件分发节点和参数。对于主题样式有考虑为佳。
// 3.对于sug列表的数据获取 / 展示逻辑以及js交互执行效率等都有考虑的话可以给到80 +
//     4.代码规范，书写熟练，命名合理，api设计的语义优雅等都可以作为加分项	本题比较开放，没有标准答案，且有一些edge case。更多的是面试者的思考过程和逐步完善代码的过程。如果面试者能根据一些业务场景提出比较合理的方法即可。主动与面试官探讨方案不能算作加分



// 实现Promise.race / Promise.allSettled方法的polyfill
// 考察点：异步，race problem，计数
// 减分项：
// 1.把构造函数方法当作实例方法对待
// 2.未考虑到异步情况
// 加分项：
// 1. 考虑到传入对象是非Promise，对每一项遍历增加Promise.resolve包裹



// 实现一个createRequest方法（假设浏览器允许无限多的并行请求），调用形式如下图，最后实现效果如图：
// 其中request函数的输入输出和fetch函数保持一致
// const request = createRequest({
//     pool: 3
// });
// for (let i = 0; i < 10; i++) {
//     request('/user').then(console.log);
// }
// 考察点：如何return一个Promise，以及如何
function handleFetchQueue (urls, max, callback) {
    const requestArr = [];
    urls.forEach((item, idx) => {
        const i = Math.floor(idx / max);
        if (requestArr[i]) {
            requestArr[i].push(item)
        } else {
            requestArr[i] = [item]
        }
    });
    console.log(requestArr)

    const handleSubRequests = (subReqs) => {
        const results = [];
        subReqs.forEach(req => {
            fetch(req).then(res => {
                if (results.push(res) === max) {
                    if (requestArr.length < 1) {
                        'function' === typeof callback && callback(results)
                    } else {
                        handleSubRequests(requestArr.shift(), requestArr, max)
                    }
                }
            }).catch(e => {
                results.push(e)
            })
        })
    };
    handleSubRequests(requestArr.shift())
}

handleFetchQueue(Array(10).fill('https://a.com'), 3, () => { console.log('结束') })
function createRequest (pool) {
    const MAX_POOL = pool;
    let requestQueue = [];
    let currentPool = 0;
    return (url) => {
        requestQueue.push(url);
        return new Promise((resolve, reject) => {
            if (currentPool < MAX_POOL && requestQueue.length > 0) {
                currentPool++;
                fetch(requestQueue.shift()).then((res) => {
                    resolve(res);
                }).catch(reject);
                currentPool--;
            } else { }
        })
    }
}
const request = createRequest(3);
Array(10).fill(1).forEach(() => {
    request('https://a.com').then((res) => {
        console.log('这是结果：', res);
    });
});


// 实现一个formatDistance方法，调用方式如图，要求粒度包括年 / 月 / 周 / 天 / 小时 / 分钟 / 秒	const desc = formatDistance(new Date('2020-02-03T00:00:00'), new Date('2020-02-01T00:00:00'))
// console.log(desc)
// // 2天前
// 加分项：
// 1.API设计
// 2.文案是否可被自定义



// 随机生成一个合法的css颜色值 如 #c1c1c1
function color() {
    const x = ['a', 'b', 'c', 'd', 'e', 'f', '0','1','2','3','4','5','6','7','8','9'];
    let str = '#';
    let temp = 0;
    for(let i = 0;i<6;i++) {
        temp = Math.floor(Math.random() * 15);
        str += x[temp];
    }
    return str;
    // return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}
function Color2(){
    this.r = Math.floor(Math.random()*255);
    this.g = Math.floor(Math.random()*255);
    this.b = Math.floor(Math.random()*255);
    this.color = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)';
}
//颜色对象
function Color3(){
    this.colorAngle = Math.floor(Math.random()*360);
    this.color = 'hsla('+ this.colorAngle +',100%,50%,1)';
}



// 实现EventEmitter类，需要实现on, off, once, trigger几个方法
// 主要考察考虑问题的全面性，api设计是否优雅 及 代码习惯
class eventEmitter{
    events: Map<string, Array<any>>;
    constructor(){
        this.events = new Map();
    }
    on(event, listener) {
        if(this.events.get(event)) {
            this.events.get(event).push(listener)
        } else {
            this.events.set(event, [listener]);
        }
    }
    emit(event, ...args) {
        if(this.events.has(event)){
            const fns = this.events.get(event);
            fns.forEach(fn => fn(...args));
        }
    }
    off(event, listener) {
        if(this.events.has(event)){
           let fns = this.events.get(event);
           fns = fns.filter(fn => { return fn === listener || fn === listener.originFn;})
           this.events.set(event, fns);
            // 或者 fns.splice(fns?.indexOf(listener || listener.originFn), 1);
        }
    }
    once(event, listener) {
        const cb = (...args) => {
            // 只能执行一次，所以执行完后要调用off
            listener(...args);
            this.off(event, cb);
        }
        cb.originFn = listener;
        this.on(event, cb);
    }

}


// abc全排列
// function all () {
//     // TODO
// }
// all('abc') // ['abc', 'acb', 'bac', 'bca', ...]	回溯，思路&递归处理
// 加分项：
// 通过栈而非递归实现




// 实现一个 Tooltip
// 考点：
// 1. prop / event设计
// 2. dom占位问题的考虑



// 实现简易版redux


// 实现 debounce / throttle
// 防抖 debounce 和节流 throttle

/*
优化用户体验：适时反馈，避免 UI 渲染阻塞，浏览器卡顿
    提升页面性能：避免页面渲染卡顿，减少服务器压力，防范恶意触发
防抖的应用场景有以下几个方面：
    输入框内容联想 --> 适时反馈、减少服务器压力
    window.resize --> 避免 UI 渲染阻塞，浏览器卡顿
    提交表单 --> 减少服务器压力，防范恶意触发
    scroll、mouseOver等事件
    有助于server实现幂等校验
*/

/*
防抖是为了避免用户无意间执行函数多次,通过防抖可以在事件触发一定时间后没有再次触发同一事件时，再去执行相关的处理函数。
在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
*/
function debounce(fn, wait) {
    let timerId = null;
    let leadingTimerId = null;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
        clearTimeout(leadingTimerId);

        timerId = setTimeout(() => {
          fn.call(this, false, args);
          leadingTimerId = setTimeout(() => {
            timerId = null;
          }, wait);
        }, wait);
      } else {
        fn.call(this, true, args);
        // 为了解决只触发一次，会同时触发首次触发和延时触发的问题引入的特殊值
        timerId = -1;
      }
    };
  }

  /* 节流：每隔一段时间，只执行一次函数。
  */
  function throttle(fn, delay) {
      var timer;
      return function () {
          var _this = this;
          var args = arguments;
          if (timer) {
              return;
          }
          timer = setTimeout(function () {
              fn.apply(_this, args);
              timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
          }, delay)
      }
  }

// 实现一个 dialog		考点：
// 1. prop / event设计
// 2. slot设计


// 把node里的stream的内容展示到浏览器


// 快速幂 / leftPad


// 两个有序数组的中位数



// QUIC 如何保证可靠性


// node httpServer 如何处理一个请求


// 实现字符串的indexOf方法
// 加分项：通过KMP实现


// 写一个函数来近似的计算圆周率pi


// 实现柯里化 （也可以根据具体case实现，就是已知fn只有两个参数）
// function add (a, b) {
//     return a + b;
// }
// function curry (fn) {
// }
// curry(add)(1)(2)  => 3



// 实现deepClone
// 加分项j：function的deep clone是否有考虑（涉及作用域，function name，function length等等）



// 连续最大子串和
// function getMax (arr) {
//     // TODO
// }
// getMax([1, -2, 3, -4, -1, 2, 9]) // 11		dp算法


// 找出树中路径之和为 X 的路径


// 有序链表合并、链表快排




// 设计一个缓存方法，要求增加fetchPolicy属性，满足如下缓存策略：
// 1. no - cache，即每次请求都是重新发起请求。
// 2. cache - first，即每次请求优先返回上一次的结果，并且真实发起请求更新本地缓存。
// 3. cache - only，即每次只返回缓存内的结果。


// css实现自适应宽度九宫格
// 考点：padding计算 flex grid


// infinite scroll，可分为使用框架or不使用框架
// 加分项：
// dom回收


// 如何判断一个字符串是不是有效数字
// function isNumber (str) {

// } 脑洞题，对Number类型的了解



// 实现一个瀑布流
// 1. 如果限制一个 div，里面一堆 img，纯 css 能否实现瀑布流（考察对较新的 css 属性的了解）
// 2. 可以使用 js，如何实现瀑布流（考察方案设计，不要求编码）
// 3. 使用 vue 和 react，怎么设计对外接口（考察封装）
// 4. 如果实现一个两列瀑布流，但是要求高度尽可能接近（高度会提前告知），怎么做（考察动态规划）





// 实现一个 Tree Select


// 迅速给浏览器种cookie
'cookieString'.split(';').forEach(item => document.cookie = `${item.trim()};path=/;expires=${new Date(2099, 1).toUTCString()}`)
