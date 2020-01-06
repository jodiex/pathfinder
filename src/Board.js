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
            curr.isVisited = true;
            updateNeighbours(curr); // add + 1 to the distance of its neighbours
            unvisited = sortByDistance(unvisited);
            curr = unvisited.shift();
        }
    }
    updateNeighbours(curr){
        var r = curr.row;
        var c = curr.col;
        var newGrid = [];
        var oldGrid = this.state.grid;
        var neighbour = null;
        // if (r < HEIGHT) {
        //     neighbour = oldGrid[r+1][c];
        //     if (!neighbour.isVisited && !neighbour.isWall) {
        //         neighbour.distance = curr.distance + 1;
        //         neighbour.prevNode = curr;
        //     }
        // }
        // if (r > 0) {
        //     neighbour = oldGrid[r-1][c];
        //     if (!neighbour.isVisited && !neighbour.isWall) {
        //         neighbour.distance = curr.distance + 1;
        //         neighbour.prevNode = curr;
        //     }
        // }
        // if (c < WIDTH) {
        //     neighbour = oldGrid[r][c+1];
        //     if (!neighbour.isVisited && !neighbour.isWall) {
        //         neighbour.distance = curr.distance + 1;
        //         neighbour.prevNode = curr;
        //     }
        // }
        // if (c > 0) {
        //     neighbour = oldGrid[r][c-1];
        //     if (!neighbour.isVisited && !neighbour.isWall) {
        //         neighbour.distance = curr.distance + 1;
        //         neighbour.prevNode = curr;
        //     }
        // }
        for (let i = 0; i < HEIGHT; i++){
            if (i < r-1 && i > r+1) {
                var row = oldGrid[r];
                newGrid.push(row);
            }
            else { // i == r-1 OR i == r+1 OR i == r
                var row = [];
                for(let j = 0; j < WIDTH; j++) {
                    if (((j == c-1 || j == c+1) && i == r) || ((i == r-1 || i == r+1) && j == c)) {
                        var neighbour = oldGrid[i][j];
                        if (!neighbour.isVisited && !neighbour.isWall) { //this won't work i think because Node is now a react component and isVisited, etc. are in state
                            neighbour.distance = curr.distance + 1;
                            neighbour.prevNode = curr;
                        }
                        row.push(neighbour);
                    }
                    else {
                        row.push(oldGrid[i][j]);
                    }
                newGrid.push(row);
                }
            }
        }
        this.setState({grid: newGrid});
    }

    sortByDistance(arr) {
        arr.sort(nodeGreaterThan(a,b) { return a.distance - b.distance; });
        return arr;
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

export default Board;