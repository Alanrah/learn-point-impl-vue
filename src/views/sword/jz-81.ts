// 调整数组顺序使奇数位于偶数前面(二)
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param array int整型一维数组
 * @return int整型一维数组
 */
 function reOrderArrayTwo( array ) {
    // write code here
     return [...array.filter(i => i%2 === 1),...array.filter(i => i%2 === 0)]
}
module.exports = {
    reOrderArrayTwo : reOrderArrayTwo
};