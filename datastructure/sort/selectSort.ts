import { swap } from "../shared/utils"

export function selectSort(arr: number[]) {
  let minIndex
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      swap(arr, i, minIndex)
    }
  }
}