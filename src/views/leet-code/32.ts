const stack = [];
let res = '';
let res1 = '';
const str = "{[()]}()}[]}";
let startIdx = 0, lastIdx = -1;
// 输出应该是 {[()]}()
function handleStr(str) {
    const len = str.length;
    for(let i=0;i<len; i++) {
        if('{[('.includes(str[i])) {
            stack.push(str[i])
        } else if(')]}'.includes(str[i])) {
            if(str[i] === ')' && stack[stack.length - 1] ==='(') {
                res = res + str[i];
                res = stack.pop() + res;
            } else if(str[i] === ']' && stack[stack.length - 1] ==='[') {
                res = res + str[i];
                res = stack.pop() + res;
            }else if(str[i] === '}' && stack[stack.length - 1] ==='{') {
                res = res + str[i];
                res = stack.pop() + res;
            }
            else { // 替换或者追加
                res1 = res1.length > res.length ? res1: res;
                res = '';
            }
        }
        if(!stack.length) {
            res1 = res1 + res;
            res = '';
        }
        console.log('res'+res,'res1'+res1,'stack'+stack)
    }
    return res1;
}
console.log(handleStr(str));


// 32. 最长有效括号
// https://leetcode-cn.com/problems/longest-valid-parentheses/
var longestValidParentheses = function(s) {
    let max=0
    let stack =[]
    stack.push(-1) // 初始化一个参照物
    // 通过参照物解决有效问题 存入数组下标 计算连续问题
    for(let i=0;i<s.length;i++){
        if(s[i]==='('){
            // ( 入栈   )出栈
            stack.push(i)
        }else {
            // )的情况 出栈
            stack.pop()
            if(stack.length){
                // 每次出栈 计算下当前有效连续长度
                // 如何计算连续长度 当前位置 - 减去遇到的参照物 参照物下标就是栈底 （有效括号 入栈出栈 如果有效的话 最后肯定只剩下参照物）
                max=Math.max(max,i-stack[stack.length-1])
            } else{
                stack.push(i) // 放入右括号参照物
            }
        }
        console.log(max, stack)
    }
    return max
 };