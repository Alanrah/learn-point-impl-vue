// 礼物的最大价值
// 在一个m×n的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？
// 如输入这样的一个二维数组，
// [
// [1,3,1],
// [1,5,1],
// [4,2,1]
// ]
// 那么路径 1→3→5→2→1 可以拿到最多价值的礼物，价值为12
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param grid int整型二维数组
 * @return int整型
 */
 function maxValue( grid ) {
    // write code here
    const maxValue = new Array(grid[0].length); //状态数组
    let max = 0; //记录历史最大值
    //遍历二维数组：
    for(let i=0;i<grid.length;++i){
        for(let j=0;j<grid[0].length;++j){
            if(i==0 && j==0){ //起点
                maxValue[j]=grid[i][j];
            }else if(i==0 && j!=0){ //顶边缘的格子
                maxValue[j]=maxValue[j-1]+grid[i][j];
            }else if(i!=0 && j==0){ //左边缘的格子
                maxValue[j]=maxValue[j]+grid[i][j];
            }else{
                maxValue[j]=Math.max(maxValue[j], maxValue[j-1])+grid[i][j];
            }
            //维护历史最大值：
            if(maxValue[j]>max){
                max = maxValue[j];
            }
        }
    }
    return max;
}
module.exports = {
    maxValue : maxValue
};