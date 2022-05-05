// https://leetcode-cn.com/problems/longest-increasing-subsequence/
// 最长递增子序列
const arr = [10,5,6,7,4,1,2,8,9]
function lengthOfLIS(arr) {
  let len = arr.length,
    dp = new Array(len).fill(1); // 用于保存长度
  // i = 0 => O(n^2) ;  i != 0 =>  O(nlogn)
  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i]
    for(let j = i + 1; j < len; j++) {
      let next = arr[j]
      // 如果是递增 取更大的长度值
      if (cur < next) dp[i] = Math.max(dp[j]+1, dp[i])
    }
  }
  return Math.max(...dp)
}

var lengthOfLIS1 = function (nums) {
    const dp = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
      // 遍历i前面的所有元素，将i与i前面的元素比较
      for (let j = 0; j < i; j++) {
        // 找比i小的元素，若有则让该元素的最长子序列长度加1，然后dp[i]取两者中较大的一个
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }
    // 找出最大的子序列
    return Math.max(...dp);
  };

lengthOfLIS(arr)