// JZ12 矩阵中的路径

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param matrix char字符型二维数组
 * @param word string字符串
 * @return bool布尔型
 */

function hasPath( matrix ,  word ) {
    // write code here
    //遍历
    let words = word.split('')
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            if(dfs(matrix,words,i,j,0)){return true} //分析matrix[i][j]元素作为开头字符是否有匹配路径
        }
    }
    return false
}
function dfs(matrix,word,i,j,index){
    if(i>matrix.length-1||i<0||j>matrix[0].length-1||j<0||matrix[i][j]!==word[index]){return false} //此条路径排除
    if(index===word.length-1) {return true} //匹配上了并且index已经与word长度对应，说明全部匹配，返回真
    let temp=matrix[i][j]
    matrix[i][j]='0' //改为一个不可能匹配的值，防止走走过的路径
    //分别对应               下                              上                               右                               左
    let res=dfs(matrix,word,i+1,j,index+1)||dfs(matrix,word,i-1,j,index+1)||dfs(matrix,word,i,j+1,index+1)||dfs(matrix,word,i,j-1,index+1)
    matrix[i][j]=temp //回溯
    return res //一层一层向上返回结果，一个为真则全部为真
}