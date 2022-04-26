/**
 * 递归的时间复杂度求解 master 公式
 * T(N) = aT(N/b) + O(N^d)
 * 
 * N/b 指的是子问题相对母问题的规模
 * a 指的是子问题调用的次数
 * 
 * O(N**d) 指的是除去调用子问题之外，其他操作的时间复杂度
 * 
 * 时间复杂度：
 *  log(b,a) > d -> 复杂度为O(N^log(b,a))
 *  log(b,a) = d -> 复杂度为O((N^d) * log(N))
 *  log(b,a) < d -> 复杂度为O(N^d)
 */

/**
 * 简单案例
 * 求数组l，r的最大值
 */

function getMax(arr: number[], l: number, r: number) {
  return process(arr, l, r)
}

function process(arr: number[], l: number, r: number) {
  if (l === r) {
    return arr[l]
  }
  const mid = l + ((r - l) >> 2)
  const leftMax = process(arr, l, mid)
  const rightMax = process(arr, mid + 1, r)
  return Math.max(leftMax, rightMax)
}

/**
 * 上述问题可以描述为
 * T(N) = 2T(N/2) + O(1) => 时间复杂度O(N)
 */