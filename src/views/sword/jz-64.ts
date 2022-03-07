// JZ64 求1+2+3+...+n
// 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
function Sum_Solution(n)
{
    // write code here
    // return (1+n)*n/2;
    n && (n += Sum_Solution(n-1)); // 只能用 + 和 位运算了,n=0的时候就停了
    return n;
}