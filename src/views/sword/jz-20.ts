// 表示数值的字符串
// https://www.nowcoder.com/practice/e69148f8528c4039ad89bb2546fd4ff8?tpId=13&tqId=1375424&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13

// 请实现一个函数用来判断字符串str是否表示数值（包括科学计数法的数字，小数和整数）

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param str string字符串
 * @return bool布尔型
 */
 function isNumeric( str ) {
    // write code here
    let str1 = str.trim()
    if(str1 === "0") {
        return true;
    } else {
        return Number(str1)
    }
}
module.exports = {
    isNumeric : isNumeric
};