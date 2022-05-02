/**
 * 暴力递归
 * 
 * 暴力递归就是尝试
 *  1. 把问题转化为规模缩小了的同类问题的子问题
 *  2. 有明确的不需要继续进行递归的条件
 *  3. 有当得到了子问题的结果之后的决策过程
 *  4. 不记录每一个子问题的解（这就是暴力，记录是动归）
 * 
 */

import { swap } from "../utils"


/**
 * 1- 汉诺塔问题
 * n层圆盘，从左挪到右
 * 
 * 结论 N层汉诺塔移动的步数是2^n - 1步
 * 
 * 1. 1 ~ n-1 的圆盘，挪到中间去
 * 2. n 的圆盘，从左到右
 * 3 1 ～ n-1的圆盘，从中间挪到右边去
 */
function hanoi(n: number, from: string, to: string, other: string) {
  if (n === 1) {
    console.log(`move 1 ${from} -> ${to}`)
  } else {
    hanoi(n - 1, from, other, to)
    console.log(`move ${n} ${from} -> ${to}`)
    hanoi(n - 1, other, to, from)
  }
}

export function testHanoi(n: number) {
  if (n > 0) {
    hanoi(n, 'left', 'right', 'mid')
  }
}


/**
 * 仰望一个好的尝试
 * 
 * 给你一个栈，逆序输出这个栈
 * 不能申请额外的数据结构
 * 只能使用递归，如何实现
 */
function reverseStack(stack: Array<number>) {
  if (stack.length === 0) {
    return
  }
  const i = f(stack)
  reverseStack(stack)
  stack.push(i)
}

function f(stack: Array<number>) {
  const res = stack.pop()
  if (stack.length === 0) {
    return res
  } else {
    const last = f(stack)
    stack.push(res)
    return last
  }
}

/**
 * 打印一个字符串的全部子序列
 */
function printSubsequence(str: string) {
  const strArr = str.split('')
  const path = ''
  const ans: string[] = []
  process1(strArr, 0, ans, path)
  return ans
}

/**
 *                abc
 * 这个字符串的全部子序列是：
 *                            0
 *               要a/                  \不要a               
 *                 1                     1 
*             要b/    \不要b        要b/      \不要b
 *             2         2           2         2
 *          要c/\不要c 要c/\不要c   要c/\不要c 要c/\不要c
 *          abc  ab    ac  a      bc   b     c  ''
 * 
 * 
 * @param str 一个字符串
 * @param index index此时来到的位置，要或者不要
 * @param ans 如果index来到str的终止位置，把沿途路径所形成的答案，放到ans里面
 * @param path 之前作出的选择，就是path
 * @returns 
 */
function process1(str: string[], index: number, ans: string[], path: string) {
  if (index === str.length) {
    ans.push(path)
    return
  }

  process1(str, index + 1, ans, path + str[index])
  process1(str, index + 1, ans, path)

}

/**
 * 打印一个字符串的全部子序列，要求不出现重复子面值的子序列
 * 跟上面的处理一样，只不过把收集的容器，从数组改为Set
 */
function printSubsequence2(str: string) {
  const res = printSubsequence(str)
  return Array.from(new Set(res))
}

/**
 * 打印字符串的全排列
 */
function printPermutation(str: string) {
  const res: string[] = []
  if (!str || !str.length) {
    return res
  }
  const strArr = str.split('')
  process2(strArr, 0, res)
  return res
}

/**
 * str[0,...i-1] 是已经做好决定的
 * str[i...]都有机会来到i位置
 * i来到终止位置， str当前的样子就是一种结果 -> res
 * 
 * @param str 
 * @param i 
 * @param res 
 */
function process2(str: string[], i: number, res: string[]) {
  if (i === str.length) {
    res.push(str.join(''))
  }

  /**
   * 如果i还没有终止， i...都有机会来到i位置  
   */
  for (let j = i; j < str.length; j++) {
    swap(str, i, j)
    process2(str, i + 1, res)
    /**
     * 恢复现场，然后才能进行下一步的遍历
     */
    swap(str, i, j)
  }
}

/**
 * 分支限界处理字符串的全排列
 */
function process3(str: string[], i: number, res: string[]) {
  if (i === str.length) {
    res.push(str.join(''))
  }
  const visit: boolean[] = new Array(26).fill(false)
  for (let j = 0; j < str.length; j++) {
    if (!visit[str[j].charCodeAt(0) - 97]) {
      visit[str[j].charCodeAt(0) - 97] = true
      swap(str, i, j)
      process3(str, i + 1, res)
      swap(str, i, j)
    }
  }
}

/**
 * 从左往右的尝试模型
 */

/**
 * 背包问题
 * 给定两个长度都为N的数组weights和values
 * weights[i] and values[i] 分别表示i 号物品的重量和价值
 * 给定一个正数bag，表示一个载重bag的袋子
 * 你装的物品不能超过这个重量
 * 返回你能装下最多的价值是多少
 * 
 */
function getMaxValue(weights: number[], values: number[], bag: number) {
  // return process4(weights, values, 0, 0, bag)
  return process5(weights, values, 0, bag)
}

/**
 * 不变的东西都
 * w v bag
 * 
 * index... 及其以后的位置，自由选择
 * 
 * @param w 
 * @param v 
 * @param i 
 * @param alreadyW 0-i-1  上货物的选择，使得你已经达到的重量
 * @param bag 
 * 
 * 如果返回 -1 认为没有方案
 * 返回不是-1 就是正常的价值
 */
function process4(w: number[], v: number[], i: number, alreadyW: number, bag: number) {
  if (alreadyW > bag) {
    return -1
  }
  // 重量没超过
  if (i === w.length) {
    return 0
  }
  /**
   * 我不要当前的index的货
   */
  const p1 = process4(w, v, i + 1, alreadyW, bag)
  /**
   * 我要了当前的货
   */
  const p2Next = process4(w, v, i + 1, alreadyW + w[i], bag)

  let p2 = -1
  if (p2Next !== -1) {
    p2 = p2Next + v[i]
  }

  return Math.max(p1, p2)

}

/**
 * 背包问题最经典解答处理过车过
 */

/**
 * 
 * @param w 
 * @param v 
 * @param index 
 * @param rest 还剩下多少空间
 * 
 * @description index...的货物自由选择，但是剩余空间不要小于0
 */
function process5(w: number[], v: number[], index: number, rest: number) {
  if (rest < 0) {
    return -1
  }
  if (index === w.length) {
    return 0
  }

  // 有货也有空间

  const p1 = process5(w, v, index + 1, rest)

  const p2Next = process5(w, v, index + 1, rest - w[index])

  let p2 = -1

  if (p2Next !== -1) {
    p2 = v[index] + p2Next
  }
  return Math.max(p1, p2)
}