
在 ts 里面，一个文件里面，如果有 export 和 import 关键词的时候，编译时候会把这个文件当做一个 module 处理，如果没有，那文件里面的内容就是全局的。也就是全局声明和模块声明。

## declare的用法
    ```
        declare const a: number; // 声明全局变量

        declare function f(s: string): number; // 声明全局 func

        declare namespace MyPlugin { // 声明一个全局的 namespace
            let n:number;
            let s:string;
            let f:(s:string) => number;
        }
    ```
    ```
        // https://ts.xcatliu.com/basics/declaration-files.html#declare-global
        declare global { // 修改已存在的全局声明
            interface String {
                hump(input: string): string;
            }
        }
        // 注意: 修改"全局声明"必须在模块内部, 所以至少要有 export{}字样
        // 不然会报错❌: 全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中
        export {}
    ```
# 问题1：
```
    declare class Foo { }
    class Foo { }
```
这两种写法，都可以声明一个class，区别在于前者只能声明，后者可以声明并实现。并且声明变量使用关键字 declare，可以表示声明其后面的全局变量的类型

# 问题2：
```
    declare interface Foo {
        bar: number
    }
    class Foo {
        bar: number
     }
```
这两种写法，效果是一样的，区别在于前者的作用域会更大

# 问题3：
```
    // https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
    declare module 'vue/types/vue' {
        interface Vue {
            $test: (args: string) => string;
        }
    }

    declare module "path" {
        export function normalize(p: string): string;
        export function join(...paths: any[]): string;
        export var sep: string;
    }

    // https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations
    declare  module  '\*.gif'  {
        export  const  gif:  any
    }

    declare namespace NodeJS {
        export interface Process {
            browser: boolean;
        }
    }
```
扩展vue的类型声明，会和已有的类型合并，也可以覆盖已有的类型。
declare module后面为什么必须加引号呢？

declare namespace 和 declare module 其实差不多。ts为了避免和 esmodule 的 module 冲突，加入了namespace，namespace 后面不用加引号

# 问题4：
```
    // a.d.ts
    declare global {
        interface Window {
            init: () => void
        }
    }
    export {}

    // b.ts
    let window: Window;
    window.init();
```
如果 a.d.ts 里面不加 export {} ，b.ts 里面 window.init() 是会报类型错误的。那 export {} 是有什么作用呢？ export {} 用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
加了 export {} 之后，global 就被会当成是一个模块。那为什么 b.ts 不用 import 就可以用 Window 类型呢？因为 Window 类型是挂在 global 这个全局的关键字上，重点是用了 global 这个全局的关键字。

# 问题5：
commonjs 规范的导出和 ts 中的导入，怎么兼容？// https://ts.xcatliu.com/basics/declaration-files.html#export-%3D
在 commonjs 规范中，我们用以下方式来导出一个模块：
```
    // 整体导出
    module.exports = foo;
    // 单个导出
    exports.bar = bar;
```
在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 const ... = require：
```
    // 整体导入
    const foo = require('foo');
    // 单个导入
    const bar = require('foo').bar;
```
第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入：
```
    // 整体导入
    import * as foo from 'foo';
    // 单个导入
    import { bar } from 'foo';
```
第三种方式是 import ... require，这也是 ts 官方推荐的方式：
```
    // 整体导入
    import foo = require('foo');
    // 单个导入
    import bar = foo.bar;
```
import ... require 和 export = 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法，由于并不常用也不推荐使用
