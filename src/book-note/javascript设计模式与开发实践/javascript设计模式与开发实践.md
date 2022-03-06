javascript设计模式与开发实践
所有设计模式的实现都遵循一条原则，即“找出程序中变化的地方，并将变化封装起来”，不变和稳定的部分是非常容易复用的。


## SOLID 面向对象设计
* 开放封闭原则：软件应该是对于扩展开放的，但是对于修改封闭的
* 单一职责原则：对象应该仅具有一种单一功能，应该仅有一个引起它变化的原因
* 接口隔离原则：多个特定客户端接口要好于一个宽泛用途的接口
* 依赖翻转原则：依赖于抽象而不是一个实例
* 里式替换原则：程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的，参考契约式设计

## 原型
某个对象的__proto__属性默认会指向它的构造器的原型对象，即{Constructor}.prototype 。
JavaScript 的函数既可以作为普通函数被调用，也可以作为构造器被调用。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。 用 new 运算符来创建对象的过程。

```javascript
    // 在 Chrome 和 Firefox 等向外暴露了对象__proto__属性的浏览器下，我们可以通过下面这段代 码来理解 new 运算的过程:
    function Person( name ){ this.name = name; };
    Person.prototype.getName = function(){ return this.name; };
    var objectFactory = function(){
        var obj = new Object(), // 从 Object.prototype 上克隆一个空的对象
        Constructor = [].shift.call( arguments ); // 取得外部传入的构造器，此例是 ƒ Person( name ){ this.name = name; }
        obj.__proto__ = Constructor.prototype; // 指向正确的原型
        var ret = Constructor.apply( obj, arguments );
        return typeof ret === 'object' ? ret : obj;
    };
    var a = objectFactory( Person, 'sven' );
    console.log( a.name ); // 输出:sven
    console.log( a.getName() ); // 输出:sven
    console.log( Object.getPrototypeOf( a ) === Person.prototype );// 输出:true
```
原型模式是一种设计模式，也是一种编程泛型，它构成了 JavaScript 这门语言的根本。

## this、call 和 apply
JavaScript 的 this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

### this
* 场景1：指向当前对象；
* 场景2：指向全局对象；
```javascript
    window.name = 'globalName';
    var myObject = { name: 'sven',
        getName: function(){ return this.name;}
    };
    console.log( myObject.getName()); // 'sven'  getName作为myObject的属性被调用，this指向myObject
    var getName = myObject.getName; 
    console.log( getName()); // 'globalName'  getName作为全局的属性被调用，this指向window
    console.log(getName.call(myObject);); // 'sven'
```
* 场景3：call apply调用，动态传入this；

## call apply
call 是包装在 apply 上面的一颗语法糖，当使用 call 或者 apply 的时候，如果我们传入的第一个参数为 null，函数体内的 this 会指 向默认的宿主对象，在浏览器中则是 window。但如果是在严格模式下，函数体内的 this 还是为 null。
```javascript
    func.apply( null, [ 1, 2, 3 ] );
    func.call( null, 1, 2, 3 );
```
场景1：改变this指向；
场景2：模拟 Function.prototype.bind 实现；
```javascript
    Function.prototype.bind = function(){
        var self = this; // 保存原函数
        context = [].shift.call( arguments );
        args = [].slice.call( arguments ); 
        return function(){ // 返回一个新的函数
            // 需要绑定的 this 上下文 // 剩余的参数转成数组
            return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) ); 
            // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
            // 并且组合两次分别传入的参数，作为新函数的参数
            } 
    };

    var obj = { name: 'sven' };
    var func = function( a, b, c, d ){
        alert ( this.name ); // 输出:sven
        alert ( [ a, b, c, d ] ) // 输出:[ 1, 2, 3, 4 ]
    }.bind( obj, 1, 2 );
    func( 3, 4 );
```
场景3：借用其他对象的方法;
```javascript
    const obj = [1, 2];
    Array.prototype.push.call( obj, 3 ); // obj本身可以存取属性、obj的length属性可读写
```

## 闭包

### 闭包 影响因素
* 变量的作用域：全局变量、局部变量
* 变量的生存周期：全局变量的生存周期当然是永久的，除非我们主动销毁这个全局变量。局部变量随着函数调用的结束而被销毁。
### 使用场景
* 封装变量；
* 延续局部变量的寿命；
### 缺点
* 内存泄漏，容易形成循环引用；（在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，但循环引用造成的内存泄露在本质上也不是闭包造成的）；


## 高阶函数
### 条件
* 函数作为参数被输入；
* 函数作为返回值输出；

### 应用场景
* （1）高阶函数实现AOP（面向切面编程）
AOP的主要作用就是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟核心业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先可以好吃业务逻辑模块的纯净和高内聚性，其次是可以很方便的复用日志统计等功能模块。
在 Java 语言中，可以通过反射和动态代理机制来实现 AOP 技术。而在 JavaScript 这种动态语言中，AOP 的实现更加简单，这是 JavaScript 与生俱来的能力。
通常，在 JavaScript 中实现 AOP，都是指把一个函数“动态织入”到另外一个函数之中，具 体的实现技术有很多，本节我们通过扩展 Function.prototype 来做到这一点。代码如下:
```javascript
    Function.prototype.before = function( beforefn ){
        var __self = this; // 保存原函数的引用
        return function(){ // 返回包含了原函数和新函数的"代理"函数
            beforefn.apply( this, arguments );
            return __self.apply( this, arguments );
        };
    }

    Function.prototype.after = function( afterfn ){ 
        var __self = this;
        return function(){
            var ret = __self.apply( this, arguments );
            afterfn.apply( this, arguments );
            return ret;
        }
    };

    var func = function(){
        console.log( 2 );
    };
    func = func.before(function(){
        console.log( 1 );
    }).after(function(){ 
        console.log( 3 );
    });
    func();
```
这种使用 AOP 的方式来给函数添加职责，也是 JavaScript 语言中一种非常特别和巧妙的装饰者模式实现

* （2）函数柯里化
currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后， 该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保 存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

```javascript
var currying = function( fn ){
    var args = [];
    return function(){
        if ( arguments.length === 0 ){
            return fn.apply( this, args );
        }
        else{
            [].push.apply( args, arguments );
            return arguments.callee;
        }
    }
};
function cost(n){}
currying(cost)(10)(20)(30)();
```
* （3）uncurrying
将原本不属于某个对象方法泛化，比如将 Array.prototype.push 泛化为通用 push 函数，可应用于多种非Array的参数结构。
```javascript
Function.prototype.uncurrying = function () {
    var self = this; // self 此时是 Array.prototype.push
    return function() {
        var obj = Array.prototype.shift.call( arguments ); // obj 是 {length: 1, 0:1 }
        // arguments 此时是 [2]
        return self.apply( obj, arguments );
        // 相当于 Array.prototype.push.apply( obj, 2 ) };
    };
}
var push = Array.prototype.push.uncurrying(); 
var obj = {
    "length": 1,
    "0": 1 
};
push( obj, 2 );
console.log( obj );  // 输出:{0: 1, 1: 2, length: 2} ， 注意这里length也变了
```

* （4）函数节流
将即将被执行的函数用 setTimeout 延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。 throttle 函数接受 2 个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间。

* （5）分时函数
timeChunk 函数就是将一个批量任务，分成好几批，每隔interval执行一批；

* （6）惰性加载函数


# 设计模式
## 单例模式
定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

命名污染问题解决：使用 namespace、使用闭包封装私有变量
```javascript
// 动态地创建命名空间
var MyApp = {};
MyApp.namespace = function( name ){ 
    var parts = name.split( '.' ); 
    var current = MyApp;
    for ( var i in parts ){
        if ( !current[ parts[ i ] ] ){ 
            current[ parts[ i ] ] = {};
        }
        current = current[ parts[ i ] ];
    }
};
MyApp.namespace( 'event' ); 
MyApp.namespace( 'dom.style' );
console.dir( MyApp ); // 上述代码等价于:
var MyApp = { 
    event: {},
    dom: {
        style: {}
    }
};
```
## 策略模式
定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

5.4 实现动画效果，示例见文件 ./5-4-ball-animate.html
从定义上看，策略模式就是用来封装算法的。但如果把策略模式仅仅用来封装算法，未免有一点大材小用。在实际开发中，我们通常会把算法的含义扩散开来，使策略模式也可以用来封装一系列的“业务规则”。只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们。
步骤：
* 把可以封装的算法，拆出去生成可复用可移植的strategies；
* 把封装的strategies作为配置传到业务逻辑里面；
* run；

#### 策略模式是一种常用且有效的设计模式，优点：
* 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
* 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
* 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
* 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。
#### 缺点，但这些缺点并不严重。
首先，使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的逻辑堆砌在 Context 中要好。
其次，要使用策略模式，必须了解所有的 strategy，必须了解各个 strategy 之间的不同点， 这样才能选择一个合适的 strategy。比如，我们要选择一种合适的旅游出行路线，必须先了解选 择飞机、火车、自行车等方案的细节。此时 strategy 要向客户暴露它的所有实现，这是违反最少知识原则的。

## 代理模式
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

### 分类
* 保护代理：用于控制不同权限的对象对目标对象的访问，但在 JavaScript 并不容易实现保护代理，因为我们无法判断谁访问了某个对象。帮主体过滤请求；
* 虚拟代理：
举例：懒加载图片，在加载结束之前，显示loading
```javascript
    var myImage = (function(){
        var imgNode = document.createElement( 'img' );
        document.body.appendChild( imgNode );
        return {
            setSrc: function( src ){
                imgNode.src = src;
            }
        }
    })();
    var proxyImage = (function(){ 
        var img = new Image;
        img.onload = function(){
            myImage.setSrc( this.src ); 
        }
        return {
            setSrc: function( src ){
                myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
                img.src = src;
            }
        }}
    )();
    proxyImage.setSrc( 'http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );
```
* 缓存代理
如：lodash.memoize(func, [resolver])、缓存ajax异步数据等场景。

## 迭代器模式
提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
### 内部迭代器 
内部迭代器在调用的时候非常方便，外界不用关心迭代器内部的实现，跟迭代器的交互也仅 仅是一次初始调用，但这也刚好是内部迭代器的缺点。由于内部迭代器的迭代规则已经被提前规定。
比如 array 的 forEach
### 外部迭代器
外部迭代器必须显式地请求迭代下一个元素。外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制 迭代的过程或者顺序。
比如 



