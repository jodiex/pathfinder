import React from 'react'

const WIDTH = 50;
const HEIGHT = 20;

class Node extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            row: this.props.row,
            col: this.props.col,
            distance: Infinity,
            isWall: false,
            isVisited: false,
            prevNode: null,
        };
    }
    render() {
        return (
            <div className="node"></div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid : [],
            startNode: {}, // i don't think start/end node should be in state?
            endNode: {},
        };

        //this.visualize = this.visualize.bind(this); don't think i need to bind, but i'm not 100% sure when bind is used.
        //this.findShortestPath = this.findShortestPath.bind(this);
    }
    visualize(){
        var nodesInOrder = this.findShortestPath();
        // animation function
    }
    findShortestPath() {
        var curr = this.state.startNode;
        var end = this.state.endNode;
        curr.setState({distance: 0});
        this.setState({startNode: curr});
        var visited = [];
        var unvisited = this.getAllNodes();
        while (unvisited.length > 0){
            if (curr.state.row === end.state.row && curr.state.col === end.state.col) {
                return visited;
            }
            if (curr.state.isWall){
                continue;
            }
            curr.setState({isVisited: true});
            visited.push(curr);
            this.updateNeighbours(curr); // add + 1 to the distance of its neighbours and set prevNode to curr
            unvisited = sortByDistance(unvisited);
            curr = unvisited.shift();
        }
        return visited;
    }
    getAllNodes(){
        var allNodes = [];
        for (let i = 0; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {
                allNodes.push(this.state.grid[i][j]);
            }
        }
        return allNodes;
    }
    updateNeighbours(curr){
        var r = curr.row;
        var c = curr.col;
        var oldGrid = this.state.grid;
        var newGrid = oldGrid;
        var neighbour = null;
        if (r < HEIGHT) {
            neighbour = updateDistanceAndPrevNode(r+1, c, oldGrid, curr);
            newGrid[r+1][c] = neighbour;
        }
        if (r > 0) {
            neighbour = updateDistanceAndPrevNode(r-1, c, oldGrid, curr);
            newGrid[r-1][c] = neighbour;
        }
        if (c < WIDTH) {
            neighbour = updateDistanceAndPrevNode(r, c+1, oldGrid, curr);
            newGrid[r][c+1] = neighbour;
        }
        if (c > 0) {
            neighbour = updateDistanceAndPrevNode(r, c-1, oldGrid, curr);
            newGrid[r][c-1] = neighbour;
        }
        this.setState({grid: newGrid});
        // for (let i = 0; i < HEIGHT; i++){
        //     if (i < r-1 && i > r+1) {
        //         var row = oldGrid[r];
        //         newGrid.push(row);
        //     }
        //     else { // i == r-1 OR i == r+1 OR i == r
        //         var row = [];
        //         for(let j = 0; j < WIDTH; j++) {
        //             if (((j == c-1 || j == c+1) && i == r) || ((i == r-1 || i == r+1) && j == c)) {
        //                 var neighbour = oldGrid[i][j];
        //                 if (!neighbour.state.isVisited && !neighbour.state.isWall) { //this won't work i think because Node is now a react component and isVisited, etc. are in state
        //                     neighbour.setState({
        //                         distance: curr.state.distance + 1,
        //                         prevNode: curr,
        //                     });
        //                 }
        //                 row.push(neighbour);
        //             }
        //             else {
        //                 row.push(oldGrid[i][j]);
        //             }
        //         newGrid.push(row);
        //         }
        //     }
        // }
        // this.setState({grid: newGrid});
    }
    componentDidMount() {
        var newBoard = [];
        for (let i = 0; i < HEIGHT; i++){
            var newRow = [];
            for (let j = 0; j < WIDTH; j++) {
                var newNode = <Node row={i} col={j}></Node>;
                newRow.push(newNode);
            }
            newBoard.push(newRow);
        }
        this.setState({grid: newBoard});
    }
    render() {
        const row = <div className="row">
            {()}
        </div>;
        return (
            <div className="board">
                {/* grid.map((row) =>
                return (
                    row.map(element) =>
                    return <Node row={i} col={j}></Node>
                )) */}
            </div>
        )
    }
}

function updateDistanceAndPrevNode(r, c, oldGrid, curr) {
    var neighbour = oldGrid[r][c];
    if (!neighbour.state.isVisited && !neighbour.state.isWall) {
        neighbour.setState({
            distance: curr.state.distance + 1,
            prevNode: curr,
        });
    }
    return neighbour;
}
function sortByDistance(arr) {
    arr.sort(function(a,b) { return a.state.distance - b.state.distance; });
    return arr;
}

export default Board;