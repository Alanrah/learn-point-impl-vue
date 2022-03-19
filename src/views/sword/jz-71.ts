// JZ71 跳台阶扩展问题
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶(n为正整数)总共有多少种跳法。
// 输入 3，输出 4

function jumpFloorII(n)
{
    // write code here
    if (n==0 || n==1) return 1;
    let a = 1, b;
    for (let i=2; i<=n; ++i) {
        b = a << 1; //  口诀：左移乘2，右移除2
        a = b;
    }
    return b;
}