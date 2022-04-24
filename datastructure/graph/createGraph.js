"use strict";
exports.__esModule = true;
exports.createGraph = exports.Graph = exports.Edge = exports.Node = void 0;
/**
 * 图的点
 */
var Node = /** @class */ (function () {
    function Node(value) {
        this.nexts = new Set();
        this.edges = new Set();
        this.value = value;
        this["in"] = 0;
        this.out = 0;
    }
    return Node;
}());
exports.Node = Node;
/**
 * 图的边
 */
var Edge = /** @class */ (function () {
    function Edge(weight, from, to) {
        this.weight = weight;
        this.from = from;
        this.to = to;
    }
    return Edge;
}());
exports.Edge = Edge;
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = new Map();
        this.edges = new Set();
    }
    return Graph;
}());
exports.Graph = Graph;
function createGraph(matrix) {
    var graph = new Graph();
    matrix.forEach(function (row, i) {
        var form = row[0];
        var to = row[1];
        var weight = row[2];
        if (!graph.nodes.has(form)) {
            graph.nodes.set(form, new Node(form));
        }
        if (!graph.nodes.has(to)) {
            graph.nodes.set(to, new Node(to));
        }
        var fromNode = graph.nodes.get(form);
        var toNode = graph.nodes.get(to);
        var newEdge = new Edge(weight, fromNode, toNode);
        fromNode.nexts.add(toNode);
        fromNode.out++;
        toNode["in"]++;
        fromNode.edges.add(newEdge);
        graph.edges.add(newEdge);
    });
    return graph;
}
exports.createGraph = createGraph;
