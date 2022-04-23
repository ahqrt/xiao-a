/**
 * 图的点
 */
export class Node {
  public value: number
  public in: number
  public out: number
  public nexts: Set<Node> = new Set()
  public edges: Set<Edge> = new Set()
  constructor(value: number) {
    this.value = value
    this.in = 0
    this.out = 0
  }
}

/**
 * 图的边
 */
export class Edge {
  public from: Node
  public to: Node
  public weight: number
  constructor(weight: number, from: Node, to: Node) {
    this.weight = weight
    this.from = from
    this.to = to
  }
}

export class Graph {
  nodes: Map<number, Node>
  edges: Set<Edge>
  constructor() {
    this.nodes = new Map()
    this.edges = new Set()
  }
}


export function createGraph(matrix: number[][]) {
  const graph = new Graph()
  matrix.forEach((row, i) => {
    const form = row[0]
    const to = row[1]
    const weight = row[2]

    if (!graph.nodes.has(form)) {
      graph.nodes.set(form, new Node(form))
    }

    if (!graph.nodes.has(to)) {
      graph.nodes.set(to, new Node(to))
    }

    const fromNode = graph.nodes.get(form)
    const toNode = graph.nodes.get(to)
    const newEdge = new Edge(weight, fromNode, toNode)
    fromNode.nexts.add(toNode)
    fromNode.out++
    toNode.in++
    fromNode.edges.add(newEdge)
    graph.edges.add(newEdge)
  })

  return graph
}