* Event Loop和ES规范里面说的Job，有什么关联和区别？
eventloop是浏览器的东西 ， job是v8的东西 没什么关系。event loop的task queue对 v8来说应该是外部的。job是v8内部实现，通过回调来做一些协作