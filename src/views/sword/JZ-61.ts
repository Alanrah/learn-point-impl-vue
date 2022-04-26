// 扑克牌顺子
function IsContinuous(numbers)
{
    // write code here
     let numberList = numbers.filter(item=> {return item}) // 获取非0数组
    let map = Array.from(new Set(numberList)) // 上面去重
    if(map.length < numberList.length){
        return false  // 一定false的情况
    }
    let gap = Math.max(...numberList) - Math.min(...numberList)
    return gap <= 4 // 最大最小差4以内就可以
}
module.exports = {
    IsContinuous : IsContinuous
};