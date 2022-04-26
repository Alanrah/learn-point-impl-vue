// 构建乘积数组
function multiply(array)
{
    // write code here
    let resArr = []
     debugger
     for (let i = 0; i < array.length; i++) {
     //注意临时数组和值每次循环要刷新，所以声明位置应该在此
      let tempArr = [...array]
      let num = 1
      tempArr.splice(i, 1)
      for (let j = 0; j < tempArr.length; j++) {
       num *= tempArr[j]
      }
      resArr.push(num)
     }
     return resArr
}
module.exports = {
    multiply : multiply
};