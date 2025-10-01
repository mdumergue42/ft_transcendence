import { Graph } from './graph.js';
export function DashBoard() {
    var canvas = document.getElementById('line-graph');
    if (canvas == null) {
        console.log("wtf canvas null");
        return;
    }
    var g = new Graph(canvas);
    g.pie("lose draw win", 0.3, 0.0, 0.7);
}
