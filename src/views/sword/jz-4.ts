/* JZ4 二维数组中的查找在一个二维数组array中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
[
[1,2,8,9],
[2,4,9,12],
[4,7,10,13],
[6,8,11,15]
]
给定 target = 7，返回 true。
给定 target = 3，返回 false。
*/
const arr = [
    [1,2,8,9],
    [2,4,9,12],
    [4,7,10,13],
    [6,8,11,15]
];
const arr1 = [
    [1,2,8,9],
    [2,4,9,12],
    [4,7,10,13],
    [6,8,11,15]
]

function Find(target, array)
{
    if(!array.length) return false;
    const row = array.length;
    const column = array[0].length;
    if(!column || target > array[row-1][column-1] || target < array[0][0]) return false;
    let i=0,j=column-1;

    while(i <= row -1 && j >=0) {
        if(target === array[i][j]) return true;
        if(target > array[i][j]) i++;
        else  j--;
    }
    return false;
}

