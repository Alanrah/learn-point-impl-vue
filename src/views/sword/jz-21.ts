// 调整数组顺序使奇数位于偶数前面(一)
// https://www.nowcoder.com/practice/ef1f53ef31ca408cada5093c8780f44b?tpId=13&tqId=1374930&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13


/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param array int整型一维数组
 * @return int整型一维数组
 */
 function reOrderArray( array ) {
    // write code here
    let oddArr = array.filter(item => item%2 != 0)
    let evenArr = array.filter(item => item%2 ==0)
    let resArr=[...oddArr,...evenArr]
    return resArr
}
module.exports = {
    reOrderArray : reOrderArray
};