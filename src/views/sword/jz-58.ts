// 左旋转字符串
// https://www.nowcoder.com/practice/12d959b108cb42b1ab72cef4d36af5ec?tpId=13&tqId=23266&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13


function LeftRotateString(str, n)
{
    // write code here
    if(str===null) return '';
    let l=str.length;
    let offset=n>l?n%l:n;
    let ans=str.slice(offset,str.length)+str.slice(0,offset);
    return ans;
}
module.exports = {
    LeftRotateString : LeftRotateString
};