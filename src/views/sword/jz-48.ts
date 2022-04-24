// 最长不含重复字符的子字符串
// 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param s string字符串
 * @return int整型
 */
 function lengthOfLongestSubstring( s ) {
    if(!s.length) return 0;
    // write code here
    let max = 1;
    let currentMax = 1;
    let str = s[0];
    for(let i = 1; i<s.length; i++) {
        if(s[i-1] !== s[i] && !str.includes(s[i])){
            currentMax ++;
            max = Math.max(max, currentMax);
             str += s[i]
        } else {
//             currentMax = 1;console.log(str.indexOf(s[i]))
             str = str.slice(str.indexOf(s[i]) + 1) // 从重复的地方截断
            str = str + s[i]
            currentMax = str.length
        }
        console.log(max,currentMax,str)
    }
    return max;
}
module.exports = {
    lengthOfLongestSubstring : lengthOfLongestSubstring
};