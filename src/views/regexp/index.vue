<template>
    <div class="regexp"></div>
</template>

<script lang="ts">
export default {
    name: "Regexp",
    components: {},
    mounted() {
        // new RegExp(pattern [, flags])
        // flags: g 全局匹配;找到所有匹配，而不是在第一个匹配后停止
        // flags: i 忽略大小写
        // flags: m（multiline) 多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
        // flags: u Unicode 将模式视为Unicode序列点的序列
        // flags: y 粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)，而g模式会尝试从lastIndex之后的索引匹配
        // flags: s dotAll模式，匹配任何字符（包括终止符 '\n'）
        // regexObj.compile(pattern, flags) 运行时编译
        // regexObj.exec(str) 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null
        // regexObj.test(str) 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配
        // RegExp.prototype[@@match]()，regexp[Symbol.match](str)，对正则表达式匹配字符串时，[@@match]()方法用于获取匹配结果，示例见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match，感觉就是给了个重构的入口。@@的语法见：http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
        console.log(new RegExp("ab+c", "ig")[Symbol.match]('sasabbbcdscdscsdabcac')); // ["abbbc", "abc"] 返回一个数组，它包括整个匹配结果
        // RegExp.prototype[@@matchAll]()，regexp[Symbol.matchAll](str)，返回一个 RegExpStringIterator {} 迭代器
        // RegExp.prototype[@@replace]()，regexp[Symbol.replace](str, newSubStr|function)，替换所有符合正则模式的匹配项，并返回替换后的新字符串结果
        // RegExp.prototype[@@search]()，regexp[Symbol.search](str)，返回该正则模式的第一个匹配项的在字符串中的位置索引
        // RegExp.prototype[@@split]()，regexp[Symbol.split](str[, limit])，切割每个匹配正则模式的匹配项，返回包含子字符串的Array
        // RegExp.prototype.toString()，regexObj.toString()
        //

        // 构造正则对象的两种方法
        // 全局对象 RegExp 继承自Function，自身没有方法, 不过它会通过原型链继承一些方法
        // 构造函数 构造法  提供了正则表达式运行时编译，当正则表达式模式可能改变时使用
        const reg1 = new RegExp("ab+c", "ig");
        // 字面量构造法 当正则表达式保持为常量时使用字面量 当你在循环中使用字面量构造一个正则表达式时，正则表达式不会在每一次迭代中都被重新编译
        const reg2 = new RegExp(/ab+c/, "ig");
        const arr1 = reg1.exec('sasabbbcdscdscsdabcac'); // 比reg.test慢
        console.log(arr1); // [0: "abbbc",groups: undefined, index: 3,input: ""sasabbbcdscdscsdabcac""]
        console.log(/(ab+c)/.exec('sasabbbcccdscdscsdabcac'));// ["abbbc", "abbbc", index: 3, input: "sasabbbcccdscdscsdabcac", groups: undefined]


        // lastIndex的作用
        const regex = /foo/g;
        // regex.lastIndex is at 0
        console.log(regex.test('foo')); // true
        // regex.lastIndex is now at 3
        console.log(regex.test('foo')); // false

        const regey = /foo/;
        // regey.lastIndex is at 0
        console.log(regey.test('foo')); // true
        // regey.lastIndex is now at 0
        console.log(regey.test('foo')); // true

        // 判断是否匹配（true或 false）的方法
        console.log(reg2.test('abbbcdscdscsdAbcacABC')); // true lastIndex是0
        console.log(reg2.test('abbbcdscdscsdAbcacABC')); // true lastIndex从5开始
        console.log(reg2.test('abbbcdscdscsdAbcacABC')); // true lastIndex从16开始
        console.log(reg2.test('abbbcdscdscsdAbcacABC')); // false lastIndex从19开始
        console.log(reg2.test('abbbcdscdscsdAbcacABC')); // true lastIndex继续从0开始
        // str.search(regexp|substr)，执行正则表达式和 String 对象之间的一个搜索匹配,如果匹配成功，返回正则表达式在字符串中首次匹配项的索引，否则返回 -1
        console.log('abbbcdscdscsdabcac'.search(reg2)); // 0
        // str.replace(regexp|substr, newSubStr|function) ，regexp匹配到的所有内容会被第二个参数换掉，substr匹配的第一项会被换掉
        const p = 'fox jumps over dog. If the dog reacted';
        console.log(p.replace(/dog/gi, 'ferret'));// "fox jumps over ferret. If the ferret reacted"
        console.log(p.replace(/dog/i, 'ferret'));
        console.log(p.replace('dog', 'monkey'));//"fox jumps over monkey. If the dog reacted"
        // console.log(p.replaceAll('dog', 'ferret'));
        // str.match(regexp)
        const s = "Please yes\nmake my day!";
        s.match(/yes.*day/); // Returns null
        s.match(/yes[^]*day/); // Returns 'yes\nmake my day'

        // 从 URL 中提取子域名
        /[^.]+/.exec('http://xxx.domain.com'); // "http://xxx.domain.com"

        // 判断http/https路径
        /^https?:\/\//.test('http://baidu.com');
        /^https?:\/\//.test('http://baidu.com');

        // 邮箱
        /^ [-\w.]{ 0, 64 } @([a - zA - Z0 - 9]{ 1, 63 } \.) *[-a - zA - Z0 - 9]{ 1, 63 }$/.test('');

        // 身份证号
        /^[1-9]\d{14}(\d{2}[0-9x])?$/.test('');

        // 0-255之间的数字
        /^([0-9]|[0-9]{2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test('');

        // 日期格式
        /^\d{4}-\d{1,2}-\d{1,2}/.test('');

        // 使用正则换行 unix是\n mac是\r windows是\r\n 感觉这就是表单数据构造时候使用\r\n换行的原因？？
        console.log('Some text\nAnd some more\r\nAnd yet\rThis is the end'.split(/\r|\n|\r\n/));// str的末尾是否加换行符会影响结果
        console.log('Some text\nAnd some more\r\nAnd yet\rThis is the end\n'.split(/\r|\n|\r\n/));

        /*
        字符类别:
        . 匹配任意单个字符 行结束符除外：\n \r \u2028 或 \u2029
        \d 匹配任意阿拉伯数字，等价于 /[0-9]/
        \D 匹配任意一个不是阿拉伯数字的字符  等价于 /[^0-9]/
        \w 匹配任意来自基本拉丁字母表中的字母数字字符，包括下划线，等价于 /[A-Za-z0-9_]/
        \W 匹配任意不是基本拉丁字母表中单词（字母数字下划线），等价于 /[^A-Za-z0-9_]/
        \s 匹配一个空白符，包括空格、制表符(水平制表符\t、垂直制表符\v)、换行符\n、换页符\f、回车\r和其他Unicode空格(可以研究C标准中空白字符)
        \S 匹配一个非空白符
        \t 匹配一个水平制表符
        \r 匹配一个回车符
        \n 匹配一个换行符
        \v 匹配一个垂直制表符
        \f 匹配一个换页符
        [\b] 匹配一个退格符
        \0 匹配一个 NUL 字符，不要在此后面跟小数点
        \cX 匹配字符串中的一个控制字符，/\cM/ 匹配字符串中的 control-M
        \xhh 匹配编码为 hh （两个十六进制数字）的字符
        \uhhhh 匹配 Unicode 值为 hhhh （四个十六进制数字）的字符。
        \ 表示下一个字符具有特殊用处
        * /

        /*
        字符集合
        [xyz] 一个字符集合，可以使用连字符'-'指定一个范围，例如，[abcd] 等价于 [a-d]，匹配"brisket"中的'b'和"chop"中的'c'
        [^xyz] 一个反义或者补充字符集
        [^]	排除型字符集合
        */

        /*
        边界
        ^ 匹配输入开始
        $ 匹配输入结尾
        \b 匹配一个零宽单词边界
        \B 匹配一个零宽非单词边界
        */

        /*
        分组
        (x) 匹配 x 并且捕获匹配项，这被称为捕获括号（capturing parentheses），有性能惩罚，最好使用非捕获括号
        (?:x) 匹配 x 不会捕获匹配项，称为非捕获括号（non-capturing parentheses）
        \n n 是一个正整数，指向正则表达式中第 n 个括号（从左开始数）中匹配的子字符串
        */

        /*
        数量词
        x* 匹配前面的模式 x 0 或多次
        x+ 匹配前面的模式 x 1 或多次，等价于 {1,}
        x*? 匹配是最小可能匹配
        x+? 匹配是最小可能匹配
        x? 匹配前面的模式 x 0 或 1 次，如果在数量词 *、+、? 或 {}, 任意一个后面紧跟该符号（?），会使数量词变为非贪婪（ non-greedy） ，即匹配次数最小化。反之，默认情况下，是贪婪的（greedy），即匹配次数最大化
        x|y 匹配 x 或 y
        x{n} n 是一个正整数。前面的模式 x 连续出现 n 次时匹配
        x{n,} n 是一个正整数。前面的模式 x 连续出现至少 n 次时匹配
        x{n,m} n 和 m 为正整数。前面的模式 x 连续出现至少 n 次，至多 m 次时匹配
        */

        /*
        断言
        x(?=y) 仅匹配被y跟随的x
        x(?!y) 仅匹配不被y跟随的x
        (?<=y)x x只有在y后面才匹配
        (?<!y)x x只有不在y后面才匹配
        */

        /*
        最大匹配与最小匹配
        简单说是贪婪匹配与非贪婪匹配的区别
        比如说匹配输入串A: 101000000000100
        使用 1.*1 将会匹配到1010000000001, 匹配方法: 先匹配至输入串A的最后, 然后向前匹配, 直到可以匹配到1, 称之为贪婪匹配。
        使用 1.?1 将会匹配到101, 匹配方法: 匹配下一个1之前的所有字符, 称之为非贪婪匹配。
        */

        /*
        []和()的区别:圆括号可以匹配多个连续的字符，而一对方括号只能匹配单个字符
        圆括号()是组,主要应用在限制多选结构的范围/分组/捕获文本/环视/特殊模式处理
        (abc|bcd|cde)，表示这一段是abc、bcd、cde三者之一均可，顺序也必须一致
        (abc)?，表示这一组要么一起出现，要么不出现，出现则按此组内的顺序出现
        (?:abc)表示找到这样abc这样一组，但不记录，不保存到$变量中，否则可以通过$x取第几个括号所匹配到的项，比如：(aaa)(bbb)(ccc)(?:ddd)(eee)，可以用$1获取(aaa)匹配到的内容，而$3则获取到了(ccc)匹配到的内容，而$4则获取的是由(eee)匹配到的内容，因为前一对括号没有保存变量
        a(?=bbb) 顺序环视 表示a后面必须紧跟3个连续的b
        (?i:xxxx) 不区分大小写 (?s:.*) 跨行匹配.可以匹配回车符
        方括号是单个匹配，字符集/排除字符集/命名字符集
        [0-3]，表示找到这一个位置上的字符只能是0到3这四个数字，与(abc|bcd|cde)的作用比较类似，但圆括号可以匹配多个连续的字符，而一对方括号只能匹配单个字符
        [^0-3]，表示找到这一个位置上的字符只能是除了0到3之外的所有字符
        */

        /*
         常见优化手段
         1.谨慎使用捕获性括号()：捕获性括号需要消耗一部分内存
         2.使用字符组代替分支（替换）条件：例如用[a-d] 代替 a|b|c|d
         3.使用锚点^ $ \b 加速定位
         4.选择字符串中最常出现的字符串放到分支最前面
         5.不滥用贪婪匹配
         6.简单字符串处理应避免使用正则表达式
         7.提取多选结构开头的相同字符
        */
    }
};
</script>
