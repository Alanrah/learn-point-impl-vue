calc在浏览器解析后，展示的是表达式本身，而不是表达式的结果，而且支持不同单位间的计算。
```
    .foo {
        width: calc(50vmax + 3rem);
        padding: calc(1vw + 1em);
        transform: rotate( calc(1turn + 28deg) );
        background: hsl(100, calc(3 * 20%), 40%);
        font-size: calc(50vw / 3);
    }
```

可以嵌套，嵌套表达式会被解析：
```
    width: calc( 100% / calc(100px * 2) ) ===>  width: calc( 100% / (100px * 2) );
```

低版本浏览器如何优雅降级：
```
    .foo {
        width: 90%; 
        width: calc(100% - 50px);
    }
```

应用calc和font-size创建一个栅格系统：
```
    html {  
        font-size: calc(100vw / 30);
    }
```
设置根元素的字体大小为视口宽度的一部分，现在，1rem 为视口宽度的 1/30。在页面上的任何文本，将会根据你的视口自动缩放。更进一步，相同比例的视口总会显示相同的文本数量，不管视口的真实尺寸是多少。
如果我们对非文本使用 rem 设置大小，它们同样遵守这个行为。一个 1rem 宽度的元素总是视口元素宽度的 1/30。
