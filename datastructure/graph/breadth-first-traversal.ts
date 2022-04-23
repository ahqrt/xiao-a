/**
 * 图的宽度优先遍历
 * 利用队列实现
 * 从源节点开始依次按照宽度进队列，然后弹出
 * 每弹出一个节点，把该节点没有进过队列的临接点入队列
 * 直到队列为空
 * 
 */

import { Queue } from "../shared/utils";
import { Node } from "./createGraph";

export function graphBfs(node: Node) {
  if (node === null) {
    return
  }
  const queue = new Queue<Node>()
  /**
   * 确保队列中不存在重复的数据
   */
  const set = new Set<Node>()
  queue.enqueue(node)
  set.add(node)

  while (!queue.isEmpty()) {
    const current = queue.dequeue()
    console.log(current.value)
    current.nexts.forEach(next => {
      if (!set.has(next)) {
        queue.enqueue(next)
        set.add(next)
      }
    })
  }

}