import { Stack } from "../shared/utils";
import { Node } from "./createGraph";

/**
 * 图的深度优先遍历
 * 利用栈实现
 * 从源节点开始按照深度放入栈中，然后弹出
 * 弹出一个节点
 * 然后遍历该节点的所有临接点, 入栈之前先把该节点放入栈中，然后在把临接点入栈
 * 然后处理临接点
 * 然后break...
 * 
 * 直到栈为空
 */
export function graphDfs(node: Node) {
  if (node === null) {
    return
  }
  const stack = new Stack<Node>()
  const set = new Set<Node>()
  stack.push(node)
  set.add(node)
  while (!stack.isEmpty()) {
    const current = stack.pop()
    console.log(current.value)
    for (const next of current.nexts) {
      if (!set.has(next)) {
        stack.push(current)
        stack.push(next)
        set.add(next)
        console.log(next.value)
        /**
         * break的意义就是我只要添加了一个临界点以后我就不在乎其他的临接点了
         */
        break
      }
    }
  }
}