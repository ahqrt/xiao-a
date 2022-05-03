
function nQueen(n: number) {
  if (n === 0) {
    return 0
  }
  const record = new Array(n).fill(0)
  return process1(0, record, n)
}


/**
 * 
 * record[0, i-1] 的皇后，都已经放好了
 * 目前来到了第i行
 * record[0...i-1] 表示之前的行，放了皇后的位置
 * n表示整体一共有多少行
 * 返回值是摆完所有的皇后以后，有多少种摆法
 * 
 * @param i 来到了第i行
 * @param record 
 * @param n 
 */
function process1(i: number, record: number[], n: number) {
  if (i === n) {
    return 1
  }
  let res = 0
  // 当前在第i行，尝试i行所有的列 -> j
  for (let j = 0; j < n; j++) {
    // 当前i行的皇后，放在第j列，会不会和之前(0...i-1)行的皇后，不共行不共列或者斜线冲突
    // 如果不冲突，就摆放
    // 如果冲突，就不摆放
    if (isValid(i, j, record)) {
      record[i] = j
      res += process1(i + 1, record, n)
    }
  }
  return res
}

function isValid(i: number, j: number, record: number[]) {
  for (let k = 0; k < i; k++) {
    // 共斜线 |a-c| = |b-d|
    if (record[k] === j || Math.abs(record[k] - j) === Math.abs(i - k)) {
      return false
    }
    return true
  }
}