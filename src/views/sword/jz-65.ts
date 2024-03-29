// JZ65 不用加减乘除做加法
// 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。

// 数据范围：两个数都满足 -10 \le n \le 1000−10≤n≤1000
// 进阶：空间复杂度 O(1)O(1)，时间复杂度 O(1)O(1)

// 计算a和b的无进位和，和进位
// 如果进位不为0，则说明a+b的结果等于无进位和+进位，此时，把无进位和作为a，进位作为b，继续计算
// 如果进位等于0， 说明此时a+b的结果就等于无进位和，返回无进位和即可。

function Add(num1, num2)
{
    // write code here
    while(num2!=0){ // 如果进位等于0， 说明此时a+b的结果就等于无进位和，返回无进位和即可。
        let temp=num1^num2;// 个位相加的值
        num2=(num1&num2)<<1;// 进位值
        num1=temp;
    }
    return num1;
}