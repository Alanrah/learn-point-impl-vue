// 正则表达式匹配
// 请实现一个函数用来匹配包括'.'和'*'的正则表达式。
// 1.模式中的字符'.'表示任意一个字符
// 2.模式中的字符'*'表示它前面的字符可以出现任意次（包含0次）。
// 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param str string字符串
 * @param pattern string字符串
 * @return bool布尔型
 */
 function match( str ,  pattern ) {
    // write code here
    let reg = new RegExp('^'+pattern+'$', 'g');
    return reg.test(str);
}
module.exports = {
    match : match
};