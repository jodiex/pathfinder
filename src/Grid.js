import React from 'react'

const WIDTH = 50;
const HEIGHT = 20;

class Node extends React.Component {
    constructor(r, c){
        this.row = r;
        this.col = c;
        this.distance = Infinity;
        this.isWall = false;
        this.isVisited = false;
        this.prevNode = null;
    }
    render() {
        return (
            <div></div>
        )
    }
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid : [],
            startNode: {},
            endNode: {},
        };

        this.visualize = this.visualize.bind(this);
    }
    visualize() {
        var curr = this.state.startNode;
        var end = this.state.endNode;
        curr.distance = 0;
        var visited = [];
        var unvisited = getAllNodes();
        while (unvisited.length > 0){
            if (curr.row === end.row && curr.col === end.col) {
                return visited;
            }
            if (curr.isWall){
                continue;
            }
            visited.push(curr);
            addDistanceToNeighbours(curr); // add + 1 to the distance of its neighbours
            var sorted = sortByDistance(unvisited);
            curr = sorted.shift();
            unvisited.shift();
        }
    }
    addDistanceToNeighbours(curr){
        var r = curr.row;
        var c = curr.col;
        var newNode = this.state.grid[]
    }
    addPrevNodes(curr) {
        var r = curr.row;
        var c = curr.col;
        var newNode = this.state.grid[]
    }
    componentDidMount() {
        var newGrid = [];
        for (let i = 0; i < HEIGHT; i++){
            var newRow = [];
            for (let j = 0; j < WIDTH; j++) {
                var newNode = new Node(i, j);
                newRow.push(newNode);
            }

        }
        this.setState({grid: newGrid});
    }
    render() {
        return (
            <div>
                <button onClick={dijkstra}">Visualize!</button>
            </div>
        )
    }
}

export default Grid;