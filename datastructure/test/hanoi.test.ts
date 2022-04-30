import { describe, it, expect } from 'vitest';
import { testHanoi } from '../brute-force-recursion';
describe('hanoi', () => {
  it('should work', () => {
    testHanoi(10)
  })
})