// 序列化二叉树
// 请实现两个函数，分别用来序列化和反序列化二叉树，不对序列化之后的字符串进行约束，但要求能够根据序列化之后的字符串重新构造出一棵与原二叉树相同的树。
// 二叉树的序列化(Serialize)是指：把一棵二叉树按照某种遍历方式的结果以某种格式保存为字符串，从而使得内存中建立起来的二叉树可以持久保存。序列化可以基于先序、中序、后序、层序的二叉树等遍历方式来进行修改，序列化的结果是一个字符串，序列化时通过 某种符号表示空节点（#）
// 二叉树的反序列化(Deserialize)是指：根据某种遍历顺序得到的序列化字符串结果str，重构二叉树
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
/*
Serialize
    特判一下空树返回空字符串
    借助队列层次遍历二叉树：将根节点放入队列 queue
    当队列不为空时：取出队头元素，如果队头有左节点，左节点 + ! 拼接到str，如果左节点不存在 #! 拼接到str，右节点也一样。
    最后返回 str
Deserialize
    将字符串拆分为数组，使用 split ，传入参数为 !
    注意：s.split('!') 转换数组，最后会多出一个空字符串元素，比如1!2!#!最终变成了 ['1','2','#','']，最后这个空字符串不需要判断，应该pop()掉。还有就是此时数组中的元素是字符串类型，在new节点的时候，需要转换成Number类型。
    借助队列 queue 来还原二叉树：
    先构建根节点 root，放入queue

    使用指针 i ，遍历数组s ，每两个为一组，为队头元素的左右节点，如果左右节点不为空，左右节点分别入队，直到数组s遍历结束。

返回 root
*/
function Serialize(pRoot)
{
    if(pRoot === null) return ''
    let str = ''
    let queue = []
    queue.push(pRoot)
    str += pRoot.val + '!'
    while(queue.length !== 0){
        let font = queue.shift()
        if(font.left){
            str += font.left.val + '!'
            queue.push(font.left)
        }else{
            str += '#!'
        }
        if(font.right){
            str += font.right.val + '!'
            queue.push(font.right)
        }else{
            str += '#!'
        }
    }
    console.log(str)
    return str
}
function Deserialize(s)
{
    if(s === '') return null
    s = s.split('!')
    s.pop()//将最后一个空字符串元素pop出去
    console.log(s)
    let i = 1
    let root = new TreeNode( Number(s[0]) )
    let queue = [root]
    while(i < s.length ){
        let font = queue.shift()
        if(s[i] !== '#'){
            font.left = new TreeNode(Number(s[i]))
            queue.push(font.left)
        }
        i ++

        if(s[i] !== '#'){
            font.right = new TreeNode(Number(s[i]))
            queue.push(font.right)
        }
        i ++
    }
    return root
}
module.exports = {
    Serialize : Serialize,
    Deserialize : Deserialize
};