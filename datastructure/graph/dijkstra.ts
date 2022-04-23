/**
 * 迪杰斯特拉 算法求图的最短路径
 * 要求没有权值为负数的边
 * 任意一个节点A
 * 假设A到A的距离为0， 到其他节点的距离为无穷大
 * 初始化：
 * 然后从A找到A的所有邻接点， 初始化A的邻接点的距离为A到A的距离
 * 然后锁死A
 * 然后找除A以外的所有节点中最小值
 * 然后从这个节点出发，找到这个节点的所有邻接点的距离，和A到这个节点的距离做比较
 * 然后更新A到这个节点的距离
 * 
 * 循环
 */
import { Node } from './createGraph'

function getMinDistanceAndUnSelectedNode(
  distanceMap: Map<Node, number>,
  selectedNodes: Set<Node>) {
  let minDistance = Number.MAX_VALUE
  let minNode: Node
  for (let [node, distance] of distanceMap) {
    if (selectedNodes.has(node)) {
      continue
    }
    if (distance < minDistance) {
      minDistance = distance
      minNode = node
    }
  }
  return minNode
}


export function dijkstra(head: Node) {

  /**
   * 从head出发到所有点的最小距离
   * key: 节点 
   * value: 节点到head的最小距离
   * 如果在表中不存在T节点的记录，则从head到T节点的距离为无穷大
   */
  const distanceMap = new Map<Node, number>()
  distanceMap.set(head, 0)
  /**
   * 已经求过距离的节点，存在selectedNodes中，以后再也不能碰
   */
  const selectedNodes = new Set<Node>()

  /**
   * 找到接下来最小的节点
   */
  let minNode = getMinDistanceAndUnSelectedNode(distanceMap, selectedNodes)

  while (minNode) {
    const distance = distanceMap.get(minNode)

    minNode.edges.forEach(edge => {
      const toNode = edge.to
      /**
       * 如果distanceMap中不存在这个节点，计算
       */
      if (!distanceMap.has(toNode)) {
        distanceMap.set(toNode, distance + edge.weight)
      }
      /**
       * 存在就计算最小值
       */
      distanceMap.set(toNode, Math.min(distanceMap.get(toNode), distance + edge.weight))
    })

    selectedNodes.add(minNode)
    minNode = getMinDistanceAndUnSelectedNode(distanceMap, selectedNodes)
  }

  return distanceMap
}
