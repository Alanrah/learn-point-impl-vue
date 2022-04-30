var wordBreak = function(s, wordDict) {
    let set =new Set(wordDict);
    let dp = [];
    dp[0] = true;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] == true && set.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
        if (dp[i] != true) {
            dp[i] = false;
        }
    }
    return dp[s.length];
};