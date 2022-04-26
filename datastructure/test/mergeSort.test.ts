import { describe, it, expect } from 'vitest';
import { mergeSort } from '../sort/mergeSort';
describe('test mergeSort', () => {
  it('test', () => {
    const arr = [1, 2, 1, 1111, 122, 439, 1293, 129312, 12391239, 12383, 145, 3, 67, 899]
    const realRes = arr.sort((a, b) => a - b)
    expect(arr).toStrictEqual(realRes)
  })
})