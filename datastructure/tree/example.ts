/**
*  1. 给定一颗二叉树的头节点，返回这颗二叉树是不是平衡二叉树
  二叉树的递归套路解法：
    1. 假设树以x为头，
      首先我的左树是平衡的
      然后我的右树是平衡的
      然后左树和右树的高度不能超过1

    2. 向左树和右树要信息
      信息包括，是否平，以及右树高度是多少
      发现左右树的要求是一样的，所以可以使用递归套路
 */

interface Result {
  isBalanced: boolean
  height: number
}

import { TreeNode } from "."

function isBalancedTree(root: TreeNode): Result {
  /**
   * 递归函数处理
   * 因为我们要求左树和右树要返回这个信息
   * 所以我本身也要返回这样的信息
   * 才满足递归函数的要求
   */
  if (!root) {
    return { isBalanced: true, height: 0 }
  }

  /**
   * 向左树和右树要信息
   */
  const leftInfo = isBalancedTree(root.left)
  const rightInfo = isBalancedTree(root.right)

  let isBalance = true
  let height = Math.max(leftInfo.height, rightInfo.height) + 1
  if (!leftInfo.isBalanced
    || !rightInfo.isBalanced
    || Math.abs(leftInfo.height - rightInfo.height) > 1) {
    isBalance = false
  }

  return { isBalanced: isBalance, height: height }
}


/**
 * 主函数在这处理
 * @param root 
 * @returns 
 */
export function isBalanced(root: TreeNode): boolean {
  return isBalancedTree(root).isBalanced
}