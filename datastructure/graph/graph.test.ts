import { describe, expect, it } from 'vitest';
import { createGraph } from "./createGraph"
import { prim } from './prim';

const graphMap = [
  [0, 1, 2],
]

const graph = createGraph(graphMap)
console.log(graph);

describe('graph', () => {
  it('prim', () => {
    expect(prim(graph)).toMatchInlineSnapshot(`
      [
        Edge {
          "from": Node {
            "edges": Set {
              [Circular],
            },
            "in": 0,
            "nexts": Set {
              Node {
                "edges": Set {},
                "in": 1,
                "nexts": Set {},
                "out": 0,
                "value": 1,
              },
            },
            "out": 1,
            "value": 0,
          },
          "to": Node {
            "edges": Set {},
            "in": 1,
            "nexts": Set {},
            "out": 0,
            "value": 1,
          },
          "weight": 2,
        },
      ]
    `)
  })
})
