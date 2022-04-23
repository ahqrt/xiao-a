/**
 * 无向图的kruskal算法
 * 最小生成树算法
 * 思路是找最小的边
 * 然后依次添加，如果存在环，则删除
 * 
 * 没有使用并查集
 */

import { Edge, Graph, Node } from "./createGraph";

class mySets {
  public setMap: Map<Node, Array<Node>> = new Map()

  constructor(nodes: Array<Node>) {
    nodes.forEach(node => {
      this.setMap.set(node, [node])
    })
  }

  isSameSet(from: Node, to: Node) {
    const fromArr = this.setMap.get(from)
    const toArr = this.setMap.get(to)
    return fromArr === toArr
  }

  union(from: Node, to: Node) {
    const fromArr = this.setMap.get(from)
    const toArr = this.setMap.get(to)
    if (fromArr === toArr) {
      return
    }
    if (fromArr.length > toArr.length) {
      toArr.forEach(node => {
        fromArr.push(node)
      })
      this.setMap.set(to, fromArr)
    } else {
      fromArr.forEach(node => {
        toArr.push(node)
      })
      this.setMap.set(from, toArr)
    }
  }
}

export function edgeComparator(edge1: Edge, edge2: Edge) {
  return edge1.weight - edge2.weight
}

export function kruskal(graph: Graph) {
  const sets = new mySets(Array.from(graph.nodes.values()))

  const edges = Array.from(graph.edges)
  edges.sort(edgeComparator)

  const result = new Array<Edge>()
  while (edges.length > 0) {
    const edge = edges.shift()
    if (!sets.isSameSet(edge.from, edge.to)) {
      result.push(edge)
      sets.union(edge.from, edge.to)
    }
  }
  return result
}