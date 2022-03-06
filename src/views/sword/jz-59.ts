// JZ59 滑动窗口的最大值
// 给定一个长度为 n 的数组 num 和滑动窗口的大小 size ，找出所有滑动窗口里数值的最大值。
// 例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。
// 窗口大于数组长度或窗口长度为0的时候，返回空。

// 堆 队列 双指针

/* {2,3,4,2,6,2,5,1}及滑动窗口的大小3
234、342、426、262、625、251  -----> 4 4 6 6 6 5
// 有 n 个数，滑动窗口 size 为 size ，共有 n - size + 1 个窗口，找到每个窗口的最大值
*/
// [10,14,12,11],4

function maxInWindows1(num, size) // 暴力
{
    // write code here
    const res = [];
    let i = 0;
    let m = num.length - size + 1;
    if( m < 0 || !num.length || !size) return res;

    while(m) {
        const arr = num.slice(i, i+size);
        res.push(Math.max.apply(null,arr));
        console.log(arr,m,i,Math.max.apply(null,arr))
        m--;
        i++;
    }
    return res;
}
// [10,12,12,11] 1
function maxInWindows(num, size) // 缓存上一个窗口最大值
{
    // write code here
    const res = [];
    let i = 0;
    let m = num.length - size + 1;
    if( m < 0 || !num.length || !size) return res;
    let lastMax = 0;
    let lastIndex = 0;
    while(m) {
        if(!res.length) {
            const arr = num.slice(i, i+size);
            lastMax = Math.max.apply(null,arr);
            lastIndex = num.indexOf(lastMax);
            res.push(lastMax);
        } else {
            if(num[i+size-1] > lastMax) { // lastIndex 必须在当前窗口内
                lastMax = num[i+size-1];
                lastIndex = i+size-1;
                res.push(lastMax);
            } else if (lastIndex > i-1) {
                res.push(lastMax);
            }
            else {
                const arr = num.slice(i, i+size);
                lastMax = Math.max.apply(null,arr);
                lastIndex = num.indexOf(lastMax);
                res.push(lastMax);
            }
        }
        m--;
        i++;
    }
    return res;
}
