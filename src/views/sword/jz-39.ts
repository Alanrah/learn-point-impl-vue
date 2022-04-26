// 数组中出现次数超过一半的数字
function MoreThanHalfNum_Solution(numbers)
{
    // write code here
    // 既然该数字占比超过一半，则排序后位于中间位置的一定为该数字
    numbers.sort((a , b) => a - b)
    let mid = Math.floor(numbers.length / 2)
    return numbers[mid]
}
module.exports = {
    MoreThanHalfNum_Solution : MoreThanHalfNum_Solution
};