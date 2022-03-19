// JZ85 连续子数组的最大和(二)
/*输入一个长度为n的整型数组array，数组中的一个或连续多个整数组成一个子数组，找到一个具有最大和的连续子数组。
1.子数组是连续的，比如[1,3,5,7,9]的子数组有[1,3]，[3,5,7]等等，但是[1,3,7]不是子数组
2.如果存在多个最大和的连续子数组，那么返回其中长度最长的，该题数据保证这个最长的只存在一个
3.该题定义的子数组的最小长度为1，不存在为空的子数组，即不存在[]是某个数组的子数组
4.返回的数组不计入空间复杂度计算
*/
// 输入：[1,-2,3,10,-4,7,2,-5]
// 返回值：[3,10,-4,7,2]


// 时间和空间都是O(n)
function FindGreatestSumOfSubArray1( array ) {
    // write code here
    const res = [];
    // 记录到下标 i 为止的最大连续子数组和
    const dp = new Array(array.length).fill(0);
    dp[0] = array[0];
    let max = dp[0] ;
    let left = 0; // 滑动区间
    let resl = 0, resr = 0; // 记录最长的区间
    for(let right = 1; right<array.length; right++) {
        dp[right] = Math.max(dp[right-1] + array[right], array[right]);
        if(dp[right-1] + array[right] < array[right]){
            left = right;
        }
        if(dp[right] >= max){ //更新最大值
            max = dp[right];
            resl = left;
            resr = right;
        }
    }
    for(let i = resl; i <= resr; i++) //取数组
        res.push(array[i]);
    return res;
}

// 空间 O(1)
function FindGreatestSumOfSubArray( array ) {
    // 记录到下标 i 为止的最大连续子数组和
    let dp = array[0]; // 记录dp
    let temp = 0; // 临时记录 dp[right-1]
    let max = dp ;
    let left = 0; // 滑动区间
    let resl = 0, resr = 0; // 记录最长的区间
    for(let right = 1; right<array.length; right++) {
        temp = dp;
        dp = Math.max(dp + array[right], array[right]);
        if(temp + array[right] < array[right]){ // 区间新起点
            left = right;
        }
        if(dp >= max){ //更新最大值
            max = dp;
            resl = left;
            resr = right;
        }
    }

    const res = [];
    for(let i = resl; i <= resr; i++) //取数组
        res.push(array[i]);
    return res;
}
