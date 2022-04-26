// 二叉搜索树的最近公共祖先
/*
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
1.对于该题的最近的公共祖先定义:对于有根树T的两个节点p、q，最近公共祖先LCA(T,p,q)表示一个节点x，满足x是p和q的祖先且x的深度尽可能大。在这里，一个节点也可以是它自己的祖先.
2.二叉搜索树是若它的左子树不空，则左子树上所有节点的值均小于它的根节点的值； 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值
3.所有节点的值都是唯一的。
4.p、q 为不同节点且均存在于给定的二叉搜索树中。
数据范围:
3<=节点总数<=10000
0<=节点值<=10000
*/
/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param root TreeNode类
 * @param p int整型
 * @param q int整型
 * @return int整型
 */
 function lowestCommonAncestor( root ,  p ,  q ) {
    // write code here
    if(root==null)
    return null;
  // 如果两个值都小于根节点，说明祖先在左子树一侧
  if(p<root.val && q<root.val)
    return lowestCommonAncestor(root.left,p,q);
  // 如果两个值都大于根节点，说明祖先在右子树一侧
  else if(p>root.val && q>root.val)
    return lowestCommonAncestor(root.right,p,q);
  //否则，在两个值中间，或者等于其中一个值
  else
    return root.val
}
