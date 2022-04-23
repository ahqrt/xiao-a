import { describe, it, expect } from 'vitest'
import { selectSort } from '../sort/selectSort'

describe('selectSort', () => {
  it('should sort an array', () => {
    const arr = [3, 2, 1]
    selectSort(arr)
    expect(arr).toStrictEqual(arr.sort((a, b) => a - b))
  })
})

