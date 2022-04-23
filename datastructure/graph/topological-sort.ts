/**
 * 拓扑排序指的是
 * 无环有向图的一种排序
 * 初始情况下， 图中一定存在一个入度为0的结点，
 * 然后找到他，处理，然后将这个节点以及他的边都删除
 * 
 * 然后循环
 */

import { Graph, Node } from "./createGraph";

export function topologicalSort(graph: Graph) {
  /**
   * key 是某一个node
   * value 是该node剩余的入度
   */
  const inMap = new Map<Node, number>()
  /**
   * 入度为0的节点才能进入这个队列
   */
  const zeroInQueue = new Set<Node>()

  graph.nodes.forEach((node, key) => {
    inMap.set(node, node.in)
    if (node.in === 0) {
      zeroInQueue.add(node)
    }
  })

  /**
   * 拓扑排序的结果添加到result数组中
   */
  const result = new Array<Node>()
  while (!(zeroInQueue.size === 0)) {
    const current = zeroInQueue.values().next().value
    result.push(current)
    zeroInQueue.delete(current)
    current.nexts.forEach(next => {
      inMap.set(next, inMap.get(next) - 1)
      if (inMap.get(next) === 0) {
        zeroInQueue.add(next)
      }
    })
  }

  return result

}
