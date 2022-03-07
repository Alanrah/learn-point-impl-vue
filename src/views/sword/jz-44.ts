// JZ44 数字序列中某一位的数字
// 数字以 0123456789101112131415... 的格式作为一个字符序列，在这个序列中第 2 位（从下标 0 开始计算）是 2 ，第 10 位是 1 ，
// 第 13 位是 1 ，以此类题，请你输出第 n 位对应的数字。

// 输入：2，返回2


function findNthDigit( n ) {
    // write code here
    // 1位数 10个  长度9
    // 2位数 90个 长度180
    // 3位数 999 - 99 = 900 长度 2700
    // 4位数 9999-999 = 9000 长度 36000
    // 5位数 90000个 长度 450000
    // n位数 9*Math.pow(10,n) 长度 n*9*Math.pow(10,n)

    if(n==0)return 0;
    let start=1;//起始数
    let digit=1;//记录位数
    let count=9;//记录每个区间个数，比如9 90 900
    while(n>count){//先减去前面有规律的数
        digit++; // 2 3 4 5 6
        n-=count;
        start*=10; // 10 100 1000 1000 Math.pow(10,digit-1)
        count=digit*9*start; // 180 2700 36000
    }
    //以下就是n剩余的数，最后 n 落在了 digit 位的区间[start, start*10]内，
    //这里我们先判断剩余的n是在哪个数
    let number=start+(n-1)/digit;//start就是开始的第一个数字，所以后面要n-1，number是数字的数量，有number个digit位数
    //判断好是在哪个数字后，下面对数字分解
    let temp=(n-1)%digit+1;//这个数的第几位
    for(let i=digit;i>temp;i--){//把这个数后面多余的尾巴去掉
        number/=10;
    }
    return Number.parseInt(number)%10;
}
