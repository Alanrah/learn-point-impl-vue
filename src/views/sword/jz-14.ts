// 剪绳子
// https://www.nowcoder.com/practice/57d85990ba5b440ab888fc72b0751bf8?tpId=13&tqId=587690&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13
function cutRope(number)
{
    if(number === 2){
        return 1
    }
    if(number === 3){
        return 2
    }if(number === 4){
        return 4
    }
    if(number === 5){
        return 6
    }
     if(number === 6){
        return 9
    }
    return 3*cutRope(number-3)   // 需要特殊处理小于7的情况，其他情况用3迭代
}
module.exports = {
    cutRope : cutRope
};