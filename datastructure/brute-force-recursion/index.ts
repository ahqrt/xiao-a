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