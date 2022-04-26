// 把字符串转换成整数(atoi)
// https://www.nowcoder.com/practice/d11471c3bf2d40f38b66bb12785df47f?tpId=13&tqId=2283174&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param s string字符串
 * @return int整型
 */
 function StrToInt( s ) {
    // write code here
     let flag = 1;
    let flag2 = 0 ;
    let ans = '0'
    //去掉前导空格
    s = s.trim()
    for(let i = 0 ; i < s.length ; i++){
        if(s[i] == '-'){
            if(flag2 == 1) break
            flag = -1
            flag2 = 1
        }else if(s[i] == '+'){
            if(flag2 == 1) break
            flag = 1
            flag2 = 1
        }else if( s[i] <= '9' && s[i] >= '0'){
            ans  = ans + s[i]
            flag2 = 1;
        }else{
            break
        }
    }
    ans = Number(ans)*flag
    if(ans > Math.pow(2,31) -1){
        ans = Math.pow(2,31) -1
    }else if(ans < -Math.pow(2,31)){
        ans = -Math.pow(2,31)
    }
    if(ans == 0) ans = 0
    return ans
}
module.exports = {
    StrToInt : StrToInt
};