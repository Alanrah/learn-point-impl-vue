### 代码的坏味道
    本章主要讲了代码中常见的bad code场景
## 3.1 神秘命名（Mysterious Name）
    改名不仅仅是修改名字而已。如果你想不出一个好名字，说明背后很可能潜藏着更深的设计问题
## 3.2　重复代码（Duplicated Code）
## 3.3　过长函数（Long Function）
* 小函数可以间接性带来的好处——更好的阐释力、更易于分享、更多的选择，这也是函数式编程的一个要点
* 小函数也会给代码的阅读者带来一些负担，因为你必须经常切换上下文，才能看明白函数在做什么
* 分解函数必须遵循一条原则：每当感觉需要以注释来说明点什么的时候，我们就把需要说明的东西写进一个独立函数中，并以其用途（而非实现手法）命名。我们可以对一组甚至短短一行代码做这件事。哪怕替换后的函数调用动作比函数自身还长，只要函数名称能够解释其用途，我们也该毫不犹豫地那么做
## 3.4　过长参数列表（Long Parameter List）
* 以查询取代参数
* 将多个参数合并成一个对象
* 使用类可以有效地缩短参数列表
## 3.5　全局数据（Global Data）
    将全局数据搬移到一个类或模块，控制其作用域，防止全局污染
## 3.6　可变数据（Mutable Data）
## 3.7　发散式变化（Divergent Change）
    某个模块经常因为不同的原因在不同的方向上发生变化
## 3.8　霰弹式修改（Shotgun Surgery）
    霰弹式修改类似于发散式变化，但又恰恰相反。每遇到某种变化，都必须在许多不同的类内做出许多小修改
## 3.9　依恋情结（Feature Envy）
## 3.10　数据泥团（Data Clumps）
## 3.11　基本类型偏执（Primitive Obsession）
## 3.12　重复的switch （Repeated Switches）
    以多态取代条件表达式（272）消除掉
## 3.13　循环语句（Loops）
    以管道取代循环，管道操作（如filter和map）可以帮助我们更快地看清被处理的元素以及处理它们的动作
## 3.14　冗赘的元素（Lazy Element）
## 3.15　夸夸其谈通用性（Speculative Generality）
## 3.16　临时字段（Temporary Field）
    搬移函数（198）把所有和这些字段相关的代码都放进一个模块里面，不要一直用temp
## 3.17　过长的消息链（Message Chains）
## 3.18　中间人（Middle Man）
## 3.19　内幕交易（Insider Trading）
## 3.20　过大的类（Large Class）
## 3.21　异曲同工的类（Alternative Classes with Different Interfaces）
## 3.22　纯数据类（Data Class）
## 3.23　被拒绝的遗赠（Refused Bequest）
## 3.24　注释（Comments）

