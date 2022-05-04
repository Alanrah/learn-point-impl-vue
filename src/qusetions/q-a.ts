// 初级

import { fstat } from 'fs';

// 1
console.log(typeof null); // 'object'
console.log(typeof typeof null); // 'string'
typeof [2]; // 'object'

// 2 let var 区别
for (let i = 0; i < 3; i++) {
    document.body.addEventListener('click', function () { console.log(i) }); // 0 1 2
}

for (var i = 0; i < 3; i++) {
    // 其实这和用setTimeout效果差不多
    document.body.addEventListener('click', function () { console.log(i) }); // 3 3 3
}
// let 是块级作用域，var 是全局作用域；JS中的for循环体比较特殊，每次执行都是一个全新的独立的块作用域，用let声明的变量传入到 for 循环体的作用域后，不会发生改变，不受外界的影响
// 用let声明的变量，不存在变量提升。而且要求必须 等let声明语句执行完之后，变量才能使用，不然会报Uncaught ReferenceError错误。

// 3 变量提升、函数提升
var a = 99;            // 全局变量a
f();                   // f是函数，虽然定义在调用的后面，但是函数声明会提升到作用域的顶部。
console.log(a);        // a=>99,  此时是全局变量的a
function f () {
    console.log(a);      // 当前的a变量是下面变量a声明提升后，默认值undefined
    var a = 10;
    console.log(a);      // a => 10
}

//  4 正则
'abcdcba'.replace(/c/, "h"); // abhdcba
'abcdcba'.replace(/c/g, "h"); // abhdhba
'abcdCba'.replace(/c/i, "h"); // abhdCba
'abCdcba'.replace(/c/i, "h"); // abhdcba

// 5 作用域与原型链
var count = 10;
function a () {
    return count + 10;
}
function b () {
    var count = 20;
    return a();
}
console.log(b()); // 20

// code2
Function.prototype.a = () => alert(1);
Object.prototype.b = () => alert(2);
function A () { };
var a = new A();
a.a(); // a.a is not a function
a.b(); // alert(2)
a.__proto__ === A.prototype // true
a.__proto__.__proto__ === A.prototype.__proto__; // true
A.prototype.__proto__ === Object.prototype; // true
a.__proto__.__proto__ === Object.prototype; // true
// 所以a的原型链上没有Function的原型，但是有Object的原型  https://www.cnblogs.com/catherinezyr/p/12711378.html

// 6
function Foo () {
    this.a = 1;
    // return {
    //     a: 4,
    //     b: 5,
    // };
}
Foo.prototype.a = 6;
Foo.prototype.b = 7;
Foo.prototype.c = 8;
var o = new Foo();
console.log(o.a); // 4
console.log(o.b); // 5
console.log(o.c); // undefined
// o.__proto__ === Foo.prototype； false
// 去掉return之后，输出是 1，7，8，此时 o.a是1，o.__proto__.a 是 6，就近返回了 o.a

// 7 js的数据结构，对象引用和值引用
// 需要注意，传引用，重新赋值和改变属性的区别
var a = [1, 2, 3, 4];
function set (a) {
    a = [5, 6, 7, 8]; // 重新赋值了，与上面的a断开了链接，这个a指向了新的内存地址。假如这儿是  a [0] = 0; ，那么两个a不会断开链接，都会变成[0, 2, 3, 4]
    console.log(a)
}
set(a); // [5, 6, 7, 8];
console.log(a); // [1, 2, 3, 4]
var b = 1;
function set1 (b) { // 基本类型参数的传递与基本类型的复制一样，传递的是变量值。
    b = 2;
    console.log(b)
}
set1(b); // 2
console.log(b); // 1
// 原始值( primitive values )，除 Object 以外的所有类型都是不可变的（值本身无法被改变）
var c = {
    name: 'catherine'
};
function set3 (c) { // 引用类型参数的传递与引用类型的复制一样，传递的是内存地址
    c.age = 20;
    console.log(c)
}
set3(c); // {name: 'catherine', age: 20} 引用类型的复制是对象引用
console.log(c); // {name: 'catherine', age: 20}
// 基本类型在栈区，数组对象按照引用赋值，引用对象存放的方式是：在栈中存放对象变量标示名称和该对象在堆中的存放地址，在堆中存放数据。
// 在JavaScript 中，共有7种基本类型：string，number，bigint，boolean，null，undefined，symbol(ECMAScript 2016新增)
// 任何 constructed 对象实例的特殊非数据结构类型，也用做数据结构：new Object，new Array，new Map，new Set，new WeakMap，new WeakSet，new Date，和几乎所有通过 new keyword 创建的东西， 都是Object 派生出来的结构类型，需要用 instanceof 来确认类型。
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures

let d = { z: 5 }
let e = d
e.z = 6 // d.z 也是6，只操作（修改，删除，添加）对象的属性，不会与之前对象断开连接，
e = { z: 7 } // d.z还是6 ，直接操作对象本身，也就是最外层，会和之前的对象断开连接
console.log(d); // {z: 6}
console.log(e); // {z: 7}

let a = { z: 5, y: { x: 8 }, w: { r: 10 } }
let b = { ...a }
b.z = 6
b.y.x = 9
b.w = { r: 11 }
console.log(a) // { z: 5, y: {x: 9}, w: {r: 10}}
console.log(a.y === b.y) // true
console.log(a.w === b.w) // false
console.log(a === b) // false
// 1.b = { ...a }中，z是基本类型直接拷贝值，y和w是对象，是引用地址的拷贝
// 2.y是只操作属性，连接不会断开，w操作了本身，生产了一个新对象，连接断开（参考上面的总结）

// 8 this指向
var name = '123';
var obj = {
    name: '456',
    getName: function () {
        console.log(this.name); // 456 非匿名函数，this指向obj
        const that = this;
        function printName () {
            console.log(that.name); // 456
            console.log(this.name); // 123 匿名函数执行环境具有全局性，所以this= window
        }
        printName();
    }
}
obj.getName(); // 123
// js修改this指针的方式： call、apply、bind、箭头函数、匿名函数、with
function bindThis (f, obj) {
    // return (a, b) => {
    //     return f.apply(obj, [a, b]); // f.call(obj, a, b), f.apply(obj, [a, b])
    // }
    return (a, b) => { return f.bind(obj)(a, b) }
}
function f1 (a, b) {
    return this.test + a + b;
};
const obj1 = { test: 1 }
bindThis(f1, obj1)(2, 3);

// 中级

// 9. 变量提升
var a = 1;
function fn () {
    console.log(a); // undefined
    var a = 2;
}
fn();

// 10
// 实现一个防抖函数debounce。防抖函数释义: 当一个动作连续触发，则只执行最后一次。
// 接口幂等 第一次提交点击返回之前，其他提交点击不生效
const debounce1 = (originMethod: Function) => {
    let isLoading = true;
    return async (...args) => {
        if (isLoading) {
            return;
        }
        await originMethod(...args);
        isLoading = false;
    }
}
const debounce2 = (func: Function, delay) => {
    let timer = null;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(
            () => {
                const res = fn.apply(this, args);
                clearTimeout(timer);
                return res;
            },
            delay, // , 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 delay 毫秒之后.
        )
    }
}

// 11
// 已知斐波那契数列规律为1, 1, 2, 3, 5, 8...，实现一个函数function fib(n: number): number; 如调用fib(3)返回2，fib(4)返回3。可以加问反向查找数列值的实现。
function fib1 (n) {
    if (n === 0)
        return 0;
    if (n === 1) {
        return 1;
    }
    return fib1(n - 1) + fib1(n - 2);
}

function fib (n) {
    if (n === 0)
        return 0;
    if (n === 1) {
        return 1;
    }
    const cache = {
        0: 0,
        1: 1,
    };
    for (let i = 2; i <= n; i++) {
        cache[i] = cache[i - 1] + cache[i - 2];
    }
    return cache[n];
}
// 函数记忆 memorize
const memorize = (func) => {
    const cache = {};
    return (arguments) => {
        const key = arguments.length + Array.prototype.join.call(arguments, '-');
        if (cache[key]) {
            return cache[key];
        }
        cache[key] = func.apply(this, arguments);
        return cache[key];
    }
}

function f2 (x, y, z) {
    console.log(arguments);  // Arguments(3) [0, 1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(x, y, z); // 0, 1, 2
}
var args = [0, 1, 2];
f2(...args);

// 12 node中事件循环的执行顺序
// 下面这段代码在node环境中打印的结果是？原因是什么
function eventLoop () {
    setTimeout(() => { // 定时器创建的是宏任务，每个宏任务都有一个微任务队列,setTimeout在最小阈值（ms 单位）过后运行脚本
        console.log('quick timer');
    }, 0);

    new Promise((resolve, reject) => { // promise创建的是微任务，每个微任务都是一个异步函数
        console.log('init promise');
        process.nextTick(resolve);
    }).then(() => console.log('promise.then'));

    setImmediate(() => { // setImmediate设计为一旦在当前轮询阶段完成， 就执行脚本
        console.log('immediate');
    });

    process.nextTick(() => { // process.nextTick 创建的是微任务
        console.log('nextTick');
    });
}
/*
init promise
nextTick
promise.then
quick timer
immediate
浏览器为了实现网络请求等操作不阻塞页面渲染，实现了多进程架构。渲染进程为了防止JavaScript执行造成页面卡死，实现了多线程架构以及事件循环系统。事件循环系统为了精确任务执行的时间，创建了微任务队列。

在Node中除了定时器setTimeout，Promise，新增了setImmediate、process.nextTick等异步API以及一些网络I / O、文件I / O操作。需要理解的是这些API创建的回调函数的执行顺序
当NodeJS启动后，首先初始化事件轮询，执行主模块，可能会调用一些异步API、定时器或者process.nextTick，然后开始处理事件循环。

事件循环的几个阶段：
- timers(定时器)：这阶段执行`setTimeout`和`setInterval`调度的回调；
- pending callbacks/IO callbacks(待定回调)：推迟到下一次循环迭代执行I / O回调；
- idle, prepare：只能内部使用；
- poll(轮询)：检索新的I / O事件; 执行I / O相关回调(除了close callbacks以外, 大多数是定时器调度, 和`setImmediate()`), 当运行时候适当条件下nodejs会占用阻塞；
- check(检测)：setImmediate()回调就在这执行；
- close callbacks(关闭回调)： 一些关闭回调, 例如`socket.on('close', ...)；

在宏任务执行完成时会执行微任务队列，即process.nextTick/Promise调度的函数。需要注意的是：在同一个函数中创建的微任务，process.nextTick总是比Promise先执行


1. 宏任务：当前调用栈中执行的代码成为宏任务。（主代码快，定时器等等）。
2.微任务： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务,可以理解为回调事件。（promise.then，proness.nextTick等等）。 3. 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。
微任务和宏任务皆为异步任务，它们都属于一个队列，主要区别在于他们的执行顺序，Event Loop的走向和取值。
运行机制
1. 在执行栈中执行一个宏任务。
2. 执行过程中遇到微任务，将微任务添加到微任务队列中。
3. 当前宏任务执行完毕，立即执行微任务队列中的任务。
4. 当前微任务队列中的任务执行完毕，检查渲染，GUI线程接管渲染。
5. 渲染完毕后，js线程接管，开启下一次事件循环，执行下一次宏任务（事件队列中取）。
微任务：process.nextTick、MutationObserver、Promise.then catch finally
宏任务：I/O、setTimeout、setInterval、setImmediate、requestAnimationFrame
宏任务                浏览器          Node
I/O               ✅  ✅
setTimeout        ✅  ✅
setInterval        ✅  ✅
setImmediate           ❌  ✅
requestAnimationFrame                ✅  ✅

微任务
process.nextTick              ❌  ✅
MutationObserver              ✅  ❌
Promise.then catch finally                  ✅  ✅
*/
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2')
  }
  console.log('script start')
  setTimeout(function() {
    console.log('setTimeout0')
  }, 0)
  setTimeout(function() {
    console.log('setTimeout3');
    new Promise(function(resolve) {
        console.log('setTimeout3 promise01')
        resolve()
        console.log('setTimeout3 promise02')
      }).then(function() {
        console.log('setTimeout3 promise03')
      })
  }, 3)
  setImmediate(() => console.log('setImmediate'))
  process.nextTick(() => console.log('nextTick'))
  async1()
  new Promise(function(resolve) {
    console.log('promise1')
    resolve()
    console.log('promise2')
  }).then(function() {
    console.log('promise3')
  })
  console.log('script end')
  // 结果
    // script start
    // async1 start
    // async2
    // promise1
    // promise2
    // script end
    // nextTick
    // async1 end
    // promise3
    // setTimeout0
    // setImmediate
    // setTimeout3
    // setTimeout3 promise01
    // setTimeout3 promise02
    // setTimeout3 promise03

    // 微任务和宏任务的联系,为什么有微任务，微任务和宏任务的区别
    // http://www.inode.club/node/event_loop.html#详细讲解
    // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout

// 13 Node.js中如何简单的判断一个文件是否存在？
const fs = require('fs');
fs.access(filePath, fs.constants.F_OK, (err) => {
    console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
});
// 实际场景中如果意识到access或者exists（已废弃）等方法后再调用open / read / write可能会造成竞争条件有加分；提及直接用open / read / write有加分

// 14 将数组扁平化去并除其中重复部分数据，得到一个升序且不重复的数组
const arr = [['a', 'b'], ['c', 'd', 'd'], ['e', 'b', 'f'], 'g'];
const res = [...new Set(arr.flat().sort())];
const flatten = (arr) => {
    return arr.reduce((accumulator, currentValue) => {
        return accumulator.concat(Array.isArray(currentValue) ? flatten(currentValue) : currentValue)
    }, []);
}

// 15 二叉树找出树中所有节点的个数，节点结构如图代码所示，补完countsNodes部分
function TreeNode (val) {
    this.val = val;
    this.left = this.right = null;
}
let root = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3,
            left: null,
            right: null,
        },
        right: {
            val: 4,
            left: null,
            right: null,
        }
    },
    right: {
        val: 5,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        }
    }
}
// 递归写法
function countsNodes (root) {
    if (!root) {
        return 0;
    }
    return 1 + countsNodes(root.left) + countsNodes(root.right);
}

// 广度遍历
function PrintFromTopToBottom(root) {
    const result = [];
    const queue = [];
    if (root) {
      queue.push(root);
      while (queue.length > 0) {
        const current = queue.shift();
        if (current.left) {
          queue.push(current.left);
        }
        if (current.right) {
          queue.push(current.right);
        }
        result.push(current.val);
      }
    }
    return result;
  }
// 深度遍历 http://www.conardli.top/docs/algorithm/DFS%E5%92%8CBFS/DFS%E5%92%8CBFS.html#%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2
// 中序遍历就是深度遍历
var inorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      result.push(current.val);
      current = current.right;
    }
    return result;
  };

// 16 转化为驼峰命名 'get-element-by-id' 转换为 getElementById'  string是不可变的，只能通过将其改造然后换值
const str = 'get-element-by-id';
str.split('-').map((i, n) => { if (n !== 0) return i = i.charAt(0).toUpperCase() + i.substring(1); return i; }).join('');
// 正则解法
str.replace(/-(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
});

// 17 周期执行某个函数n次
const repeatFunc = repeat(console.log, 4, 1000);
repeatFunc("helloworld");
// 每3秒打印一个helloworld，总计执行4次
function repeat (func, count, delay) {
    let c = 1;
    let timer = null;
    return (str) => {
        timer = setInterval(
            () => {
                if (c <= count) {
                    func(str);
                    c++;
                }
                else
                    clearInterval(timer);
            },
            delay,
        )
    }
}

// 18 合并有序数组 考点：时间复杂度/边界考虑
function merge (arr1, arr2) {
    return [...arr1, ...arr2].sort(); // 这样写是不是不太好
}
const a = [1, 3, 5, 9];
const b = [2, 4, 6, 8];
merge(a, b); // [1,2,3,4,5,6,8,9]


// 19 代替new的实现（不需要兼容class，因为class在ecma规范中未实现[[Call]]）
function Cat (name, gender) {
    this.name = name;
    this.gender = gender;
}
const a1 = new Cat('tom', 'male');
const a2 = create(Cat, 'tom', 'male');
// a1 a2等效
// 得分点：1.原型指向、2.constructor指向、3. function return对象为引用对象时的处理	原型链了解__proto__ / setPrototypeOf prototype call apply es6
/* 因为new是关键词，所以用方法替代 */
function create (...args) {
    const obj = {};
    console.log('arguments ', arguments);
    const Constructor = Array.prototype.shift.call(arguments);
    console.log('Constructor ', Constructor); // function Cat
    obj.__proto__ = Constructor.prototype;
    const ret = Constructor.apply(obj, arguments);
    console.log('ret ', ret)
    return typeof ret === 'object' ? ret : obj;
}


// 20 链表翻转
function reverse () {
    let root = {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 3,
                next: {
                    val: 4,
                    next: {
                        val: 5,
                        next: null,
                    }
                }
            }
        }
    };
    if (root === null || root.next === null) {
        return root;
    }
    let rRoot = root.next;
    root.next = null; // root 是最后一个节点了
    let temp = null;
    while (rRoot !== null) {
        temp = rRoot.next;
        rRoot.next = root;
        root = rRoot;
        rRoot = temp;
    }
    return root;
}

// 21 获取第 K 大的数
// 排序去重拿值

// 22 vue 的依赖收集
// https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html

// 23 react setState 为什么是异步的
// https://github.com/olifer655/react/issues/12

// 24.ul翻转（加分项：使用dom fragement）
// <div>
//     <ul>
//         <li>1 </li>
//         <li> 2 </li>
//         <li> 3 </li>
//     </ul>
// </div>
// 与document相比，最大的区别是DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。
// mdn 上的 DocumentFragment 示例
function demo () {
    const list = document.querySelector('ul');
    const fruits = ['Apple', 'Orange', 'Banana', 'Melon'];
    const fragment = document.createDocumentFragment();
    fruits.forEach(fruit => {
        const li = document.createElement('li');
        li.innerHTML = fruit;
        fragment.appendChild(li);
    });
    list.appendChild(fragment);
}


function reverse () {
    const ul = document.getElementsByTagName('ul');
    let frag = document.createDocumentFragment();
    // children 和 childNodes 的区别，childNodes属性返回所有的节点，包括文本节点、注释节点； children属性只返回html元素节点； 使用children属性返回元素的子元素的集合。
    for (let i = 0; i < ul[0].children.length; i++) {
        // frag.prepend(ul[0].children[i]); // 这样会吧ul里边的i节点挪走
        frag.prepend(ul[0].children[i].cloneNode(true));
    }
    const ulReverse = document.createElement('ul'); // 不可以链式调用
    ulReverse.appendChild(frag);
    document.body.appendChild(ulReverse);
}
// append() 可以同时传入多个节点或字符串，没有返回值；
// appendChild() 只能传一个节点，且不直接支持传字符串