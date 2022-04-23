import { Queue } from './../shared/utils';
/**
 * 无向图的prim算法
 * 最小生成树
 * 
 * 从节点的角度考虑这个问题
 */

import { Edge, Graph, Node } from "./createGraph";
import { edgeComparator } from './kruskal';

export function prim(graph: Graph) {

  /**
   * 解锁的边
   */
  const priorityQueue = new Queue<Edge>()

  /**
   * 依次挑选的边
   */
  const result = new Array<Edge>()
  /**
   * 已经访问过的节点
   */
  const visited = new Set<Node>()

  /**
   * for循环为了解决森林问题，也就是图是不联通的，如果是联通图，可以不带这个for
   */
  graph.nodes.forEach(node => {

    if (!visited.has(node)) {
      visited.add(node)
      node.edges.forEach(edge => {
        priorityQueue.enqueue(edge)
      })
      /**
       * 生成一个最小堆(优先级队列)
       */
      priorityQueue.sort(edgeComparator)

      while (!priorityQueue.isEmpty()) {
        const edge = priorityQueue.dequeue()
        const to = edge.to
        if (!visited.has(to)) {
          result.push(edge)
          visited.add(to)
          edge.from.edges.forEach(edge => {
            priorityQueue.enqueue(edge)
          })
          priorityQueue.sort(edgeComparator)
        }
      }
    }

  })

  return result
}