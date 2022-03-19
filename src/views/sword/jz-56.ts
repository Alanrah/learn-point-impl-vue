// JZ56 数组中只出现一次的两个数字
// 一个整型数组里除了两个数字只出现一次，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。
// 输入：[1,4,1,6]
// 返回值：[4,6]

function FindNumsAppearOnce( array ) {
    // write code here
    array.sort();
    let res = [], count=0, i=0;
    while(i<array.length) {
        if(count===2){
            return res;
        }
        if(i===(array.length-1)) {
            res.push(array[i]);
            count++;
            i++;
        }
        if(array[i] === array[i+1]){
            i+=2;
        }else{
            res.push(array[i]);
            count++;
            i++;
        }
    }
    return res;
}