javascript设计模式与开发实践
所有设计模式的实现都遵循一条原则，即“找出程序中变化的地方，并将变化封装起来”，不变和稳定的部分是非常容易复用的。


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






