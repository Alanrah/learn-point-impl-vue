// JZ38 字符串的排列
// 输入一个长度为 n 字符串，打印出该字符串中字符的所有排列，你可以以任意顺序返回这个字符串数组。
// 例如输入字符串ABC,则输出由字符A,B,C所能排列出来的所有字符串ABC,ACB,BAC,BCA,CBA和CAB。

// 输入："ab"
// 返回值：["ab","ba"]
// 返回["ba","ab"]也是正确的 todo
function Permutation(s)
{
    const len = s.length;
    const arr = s.split('');
    arr.sort()
    const res = [];
    const used = new Array(len).fill(false);

    var dfs = function (index, temp) {
      if (index === len) {
        return res.push(temp.join(''));
      }

      for (let i = 0; i < len; i++) {
        if (i > 0 && arr[i] === arr[i - 1] && used[i - 1]) continue;
        if (used[i]) continue;
        temp.push(arr[i]);
        used[i] = true;
        dfs(index + 1, temp);
        temp.pop();
        used[i] = false;
      }
    }

    dfs(0, []);
    return res;
  }