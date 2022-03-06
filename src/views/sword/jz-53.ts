// JZ53 数字在升序数组中出现的次数
// 给定一个长度为 n 的非降序数组和一个非负数整数 k ，要求统计 k 在数组中出现的次数

function GetNumberOfK(data, k)
{
    const firstIndex = data.indexOf(k);
    if(firstIndex<0 || !data.length) return 0;
    let res = 0;
    while(data.length) {
        if(data[res+firstIndex]=== k) {
            res++;
        } else{
            return res;
        }
    }
    return res;
}