/**
 * 二分查找
 */
function search(arr: number[], target: number): number {
  let l = 0
  let r = arr.length - 1
  return binarySearch(arr, l, r, target)
}

function binarySearch(arr: number[], left: number, right: number, target: number): number {
  if (left > right) {
    return -1
  }
  const mid = left + ((right - left) >> 1)
  if (arr[mid] === target) {
    return mid
  }
  if (arr[mid] > target) {
    return binarySearch(arr, left, mid - 1, target)
  }
  return binarySearch(arr, mid + 1, right, target)
}