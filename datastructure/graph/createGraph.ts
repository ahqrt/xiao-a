/**
 * 图的点
 */
export class Node {
  public value: number;
  public in: number;
  public out: number;
  public nexts: Set<Node> = new Set();
  public edges: Set<Node> = new Set();
  constructor(value: number) {
    this.value = value;
    this.in = 0;
    this.out = 0;
  }
}

/**
 * 图的边
 */
export class Edge {
  public from: Node;
  public to: Node;
  public weight: number;
  constructor(weight: number, from: Node, to: Node) {
    this.weight = weight;
    this.from = from;
    this.to = to;
  }
}

export class Graph {
  nodes: Set<Node>;
  edges: Set<Edge>;
  constructor() {
    this.nodes = new Set();
    this.edges = new Set();
  }
}


export function createGraph(matrix: number[][]) {
  const graph = new Graph()

}