## 0 简单实现 EventEmitter ，包括 on once off emit；
```typescript
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
```

## 手写简易版本promise
实现的主要功能如下
* Promise.prototype.then
* Promise.prototype.catch
* Promise.resolve
* Promise.reject
* * Promise.all
Promise.race
### 分析：
> 设定三个状态 PENDING、FULFILLED、REJECTED ，只能由PENDING改变为FULFILLED、REJECTED，并且只能改变一次
> Promise接收一个函数executor，executor有两个参数resolve方法和reject方法
> resolve将PENDING改变为FULFILLED
> reject将PENDING改变为REJECTED
> promise变为FULFILLED状态后具有一个唯一的value
> promise变为REJECTED状态后具有一个唯一的reason
### then:
> then方法接受两个参数onFulfilled、onRejected，它们分别在状态由PENDING改变为FULFILLED、REJECTED后调用
> 一个promise可绑定多个then方法 then方法可以同步调用也可以异步调用
> 同步调用：状态已经改变，直接调用onFulfilled方法
> 异步调用：状态还是PENDING，将onFulfilled、onRejected分别加入
> 两个函数数组onFulfilledCallbacks、onRejectedCallbacks，当异步调用resolve和reject时，将两个数组中绑定的事件循环执行。

```typescript
个函数数组onFulfilledCallbacks、onRejectedCallbacks，当异步调用resolve和reject时，将两个数组中绑定的事件循环执行。
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((fun) => {
        fun();
      });
    }
  };

  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fun) => {
        fun();
      });
    }
  };

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

//原型上面的方法
//用settimeout来模拟异步调用,保证链式调用，即then方法中要返回一个新的promise，并将then方法的返回值进行resolve
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled != 'function') {
    onFulfilled = function (value) {
      return value;
    };
  }
  if (typeof onRejected != 'function') {
    onRejected = function (reason) {
      throw reason;
    };
  }
  const promise2 = new Promise((resolve, reject) => {
    switch (this.state) {
      case FULFILLED:
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case PENDING:
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        });
        break;
    }
  });+
  return promise2;
};


Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      fn();
      return value;
    },
    (reason) => {
      fn();
      throw reason;
    }
  );
};

//静态方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

//接受一个promise数组，当所有promise状态resolve后，执行resolve
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
    } else {
      let result = [];
      let index = 0;
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (data) => {
            result[i] = data;
            if (++index === promises.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};

//接受一个promise数组，当有一个promise状态resolve后，执行resolve
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve();
    } else {
      let index = 0;
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};
```

## 2 原型链
```typescript
function Foo() {}
let foo = new Foo();
foo.__proto__  // Foo.prototype
Foo.__proto__  // Function.prototype
Foo.__proto__.prototype  // Object.prototype
Foo === foo.constructor  // true

Object.prototype.a = 1; 
foo.a ? // 1
```

## 3 封装一个已有的组件A，为B组件，怎么做侵入性最小，在A组件更新时，B组件总是可以透传参数给A，而不需要修改B组件的代码
* 方法1、 $attrs/$listeners，在创建高级别的组件时非常有用
* 方法2、slot
* 方法3、render（sfc / jsx）

## 4 array的所有api
那些api可以遍历，那些api的遍历可以被打断，map的cb有return和没return的区别？[1,2,3].map(e => {})返回什么
* 用于遍历的API：every、filter、find、findIndex、forEach、includes、indexOf、join、map、reduce、reduceRight、reverse、slice、some、sort、splice
* 遍历可以被打断的API:every、find、findIndex、incldes、indexOf、slice、some、splice

// zndl
## 5、vue2中的data为什么是个引用类型？
<a href="https://cn.vuejs.org/v2/api/#data"></a>
当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

## 6 vue中组件通信方式有哪些
* 父子通信：父向子传递数据是通过 props，子向父是通过 $emit；通过 $parent / $children 通信；$ref 也可以访问组件实例；provide / inject ；
* 兄弟通信： EventBus；Vuex；vue3 的 Ref、reactive
* 跨级通信： EventBus；Vuex；provide / inject ；$attrs / $listeners；vue3 的 Ref、reactive
