// 机器人的运动范围

// https://www.nowcoder.com/practice/6e5207314b5241fb83f2329e89fdecc8?tpId=13&tqId=23460&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13

function movingCount(threshold, rows, cols)
{
    const dirs = [
        [0,1],
        [0,-1],
        [-1,0],
        [1,0]
    ]
    const visited = []
    const check = (n) => {
        let sum = 0
        while(n >= 1) {
            sum += (n % 10)
            n /= 10
        }
        return Math.floor(sum)
    }
    for(let i = 0; i < rows; i++) {
        visited[i] = []
    }
    const isValid = (i,j) => {
        return (i >= 0 && i < rows && j >= 0 && j < cols && check(i) + check(j) <= threshold && !visited[i][j])
    }
    let count = 0
    const dfs = (i,j) => {
        if(!isValid(i,j)) {
            return
        }
        count++
        visited[i][j] = true
        for(const dir of dirs) {
            const [offsetY,offsetX] = dir
            dfs(i+offsetY,j+offsetX)
        }
    }
    dfs(0,0)
    return count
}
module.exports = {
    movingCount : movingCount
};