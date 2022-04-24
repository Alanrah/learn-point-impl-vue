// 把数字翻译成字符串
// 有一种将字母编码成数字的方式：'a'->1, 'b->2', ... , 'z->26'。
// 我们把一个字符串编码成一串数字，再考虑逆向编译成字符串。
// 由于没有分隔符，数字编码成字母可能有多种编译结果，例如 11 既可以看做是两个 'a' 也可以看做是一个 'k' 。但 10 只可能是 'j' ，因为 0 不能编译成任何结果。
// 现在给一串数字，返回有多少种可能的译码结果
/**
 * 解码
 * @param nums string字符串 数字串
 * @return int整型
 */
// https://www.nowcoder.com/practice/046a55e6cd274cffb88fc32dba695668?tpId=13&tqId=1024831&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13
 function solve( nums ) {
    if (nums[0] == '0') return 0
        const n = nums.length;
        const dp = new Array(n + 1).fill(0);
        dp[0] = dp[1] = 1
        for(let i = 2;i<n+1;i++){
            if (nums[i - 1] != '0')
                dp[i] = dp[i - 1];
            let digit = (nums[i - 2] - '0') * 10 + (nums[i - 1] - '0');
            if ('10' <= digit && digit <= '26')
                dp[i] += dp[i - 2]
        }
        return dp[n]
}
module.exports = {
    solve : solve
};