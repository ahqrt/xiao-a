export function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

export class Stack<T> {
  private data: T[] = []
  push(node: T) {
    this.data.push(node)
  }
  pop(): T | null {
    return this.data.pop()
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
}

export class Queue<T> {
  private data: T[] = []
  enqueue(node: T) {
    this.data.push(node)
  }
  dequeue(): T | null {
    return this.data.shift()
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
  sort(sortFn: (a: T, b: T) => number) {
    this.data.sort(sortFn)
  }
}
