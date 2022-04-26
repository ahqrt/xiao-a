/**
 * 归并排序
 * 递归思维
 * l 和 r 是数组的左右边界
 * mid 是数组的中间位置
 * 让l，mid 先有序
 * 再让r，mid 先有序
 * 最后将l，r 合并
 * 那么整体就是有序的
 */

export function mergeSort(arr: number[]) {
  if (!arr || arr.length < 2) {
    return arr
  }
  process(arr, 0, arr.length - 1)
}

function process(arr: number[], l: number, r: number) {
  if (l === r) {
    return
  }
  const mid = l + ((r - l) >> 1)
  process(arr, l, mid)
  process(arr, mid + 1, r)
  merge(arr, l, mid, r)
}

function merge(arr: number[], l: number, mid: number, r: number) {
  const res: number[] = []
  let i = 0;
  let p1 = l;
  let p2 = mid + 1;

  while (p1 <= mid && p2 <= r) {
    if (arr[p1] < arr[p2]) {
      res[i++] = arr[p1++]
    } else {
      res[i++] = arr[p2++]
    }
  }

  while (p1 <= mid) {
    res[i++] = arr[p1++]
  }

  while (p2 <= r) {
    res[i++] = arr[p2++]
  }

  for (let i = 0; i < res.length; i++) {
    arr[l + i] = res[i]
  }
}

