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

var wordBreak = function(s, wordDict) {
    if (!s || !s.length || !wordDict) return false;
    const wordSet = new Set(wordDict);
    const memo = new Map(); // {startIndex: false}

    function canBreak(start) {
        if (memo.has(start)) return memo.get(start);
        if (start === s.length) return true;
        for (let i = start; i < s.length; ++i) {
            const temp = s.substring(start, i + 1);
            if (wordSet.has(temp) && canBreak(i + 1)) {
                memo.set(start, true);
                return true;
            }
        }
        memo.set(start, false);
        return false;
    }

    return canBreak(0);
};
