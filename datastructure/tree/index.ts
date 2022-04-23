import { Queue, Stack } from "../shared/utils"

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}



/**
 * 先序遍历 非递归实现 头 右 左
 * 头 => 入 => 出 => 右 => 左 => 入 => 出 => 循环
 * 首先头节点入栈，
 * 从栈中弹出一个节点cur，处理cur
 * 然后右孩子入栈，左孩子入栈
 * 循环
 * 
 * @param root 
 */
function preOrderUnRecur(root: TreeNode): number[] {
  const returnData: number[] = []
  const treeStack = new Stack<TreeNode>()
  treeStack.push(root)
  while (!treeStack.isEmpty()) {
    const cur = treeStack.pop()
    if (cur) {
      returnData.push(cur.val)
      if (cur.right) {
        treeStack.push(cur.right)
      }
      if (cur.left) {
        treeStack.push(cur.left)
      }
    }
  }
  return returnData
}



/**
 * 后序遍历 非递归实现 两个栈实现，一个正常的栈，一个辅助栈(收集)
 * 头 => 出 => 左 => 右 => 入 => 出 => 左 => 右 => 入 => 出 => 循环
 * 头节点入栈
 * 弹出，记为cur，当前节点放入收集栈
 * 先压左 在压右
 * 循环
 */
function postOrderUnRecur(root: TreeNode): number[] {
  const returnData: number[] = []
  const treeStack = new Stack<TreeNode>()
  const collectStack = new Stack<TreeNode>()
  treeStack.push(root)
  while (!treeStack.isEmpty()) {
    const cur = treeStack.pop()
    if (cur) {
      collectStack.push(cur)
      if (cur.left) {
        treeStack.push(cur.left)
      }
      if (cur.right) {
        treeStack.push(cur.right)
      }
    }
  }
  while (!collectStack.isEmpty()) {
    const cur = collectStack.pop()
    if (cur) {
      returnData.push(cur.val)
    }
  }
  return returnData
}


/**
 * 中序遍历 非递归实现 
 * 整棵树的左边界全部入栈
 * 依次弹出节点的过程中，处理
 * 然后对弹出节点的右树，重复上述过程
 */
function inOrderUnRecur(root: TreeNode): number[] {
  const returnData: number[] = []
  const treeStack = new Stack<TreeNode>()
  let cur = root
  while (cur || !treeStack.isEmpty()) {
    if (cur) {
      treeStack.push(cur)
      cur = cur.left
    } else {
      cur = treeStack.pop()
      if (cur) {
        returnData.push(cur.val)
        cur = cur.right
      }
    }
  }
  return returnData
}


/**
 * 二叉树的深度优先遍历 => 先序遍历
 * 宽度优先遍历 => 队列，头部进，尾部出 
 * 头节点入队，弹出，打印，先放左，在放右
 * 循环  
 */
function levelOrderUnRecur(root: TreeNode): number[] {
  const returnData: number[] = []
  const treeQueue = new Queue<TreeNode>()
  treeQueue.enqueue(root)
  while (!treeQueue.isEmpty()) {
    const cur = treeQueue.dequeue()
    if (cur) {
      returnData.push(cur.val)
      if (cur.left) {
        treeQueue.enqueue(cur.left)
      }
      if (cur.right) {
        treeQueue.enqueue(cur.right)
      }
    }
  }
  return returnData
}

/**
 * 二叉树的最大宽度
 * 哈希表 => 第几层的一张表，
 * 头节点是第一层
 * 用3个变量，1:当前在那一层，2:当前层发现了几个节点， 3:所有层最大节点数
 * 
 */
function getMaxWidth(root: TreeNode): number {
  if (root === null) {
    return 0
  }
  const queue = new Queue<TreeNode>()
  queue.enqueue(root)
  const levelMap = new Map()
  levelMap.set(root, 1)
  let curLevel = 1
  let curLevelNodes = 0
  let max = -1
  while (!queue.isEmpty()) {
    const cur = queue.dequeue()
    const curNodeLevel = levelMap.get(cur)

    if (curNodeLevel === curLevel) {
      curLevelNodes++
    } else {
      max = Math.max(max, curLevelNodes)
      curLevel++
      curLevelNodes = 1
    }

    if (cur) {
      if (cur.left) {
        queue.enqueue(cur.left)
        levelMap.set(cur.left, curLevel + 1)
      }
      if (cur.right) {
        queue.enqueue(cur.right)
        levelMap.set(cur.right, curLevel + 1)
      }
    }
  }
  max = Math.max(max, curLevelNodes)

  return max
}
