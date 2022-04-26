// 孩子们的游戏(圆圈中最后剩下的数)
// https://www.nowcoder.com/practice/f78a359491e64a50bce2d89cff857eb6?tpId=13&tqId=23265&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13


function LastRemaining_Solution(n, m)
{
    // write code here
     if(n<1||m<1){return null}
    let arr=[]
    for(let i=0;i<n;i++){
        arr.push(i)
    }
    let index=0 //记录当前索引号
    while(arr.length>1){
        index=(index+m-1)%arr.length //之前下来的index相当于新一轮的第0索引号，数到m-1出局
        arr.splice(index,1) //出局
    }
    return arr[0]
}
module.exports = {
    LastRemaining_Solution : LastRemaining_Solution
};