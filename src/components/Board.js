import React from 'react'
import './css/Board.css'


class Node {
    constructor (r, c){
        this.row = r;
        this.col = c;
        this.distance= Infinity;
        this.isWall = false;
        this.isVisited= false;
        this.prevNode = null;
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            width: 25,
            height: 18
        };

        //this.visualize = this.visualize.bind(this); don't think i need to bind, but i'm not 100% sure when bind is used.
        //this.findVisitedNodes = this.findVisitedNodes.bind(this);
    }
    async visualize(){
        var visitedNodes = this.findVisitedNodes();
        var shortestPath = this.findShortestPath(visitedNodes[visitedNodes.length - 1]);
        // animation of visited nodes
        let promise = new Promise((resolve) => {
            for (let i = 0; i < visitedNodes.length; i++) {
                let node = visitedNodes[i];
                setTimeout(() => {
                    document.getElementById(`node-${node.row}${node.col}`).className = "node visited"
                }, 50 * i);
            }
            setTimeout(() => { resolve()}, 50*visitedNodes.length);
        })
        await promise;

        // animation of shortest path
        for (let i = 0; i < shortestPath.length; i++) {
            let node = shortestPath[i];
            setTimeout(() => {
                document.getElementById(`node-${node.row}${node.col}`).className = "node shortest-path"
            }, 50 * i)
        }
    }
    findVisitedNodes() {
        var curr = new Node(this.props.startYCoord, this.props.startXCoord);
        var end = new Node(this.props.endYCoord, this.props.endXCoord)
        var {grid} = this.state;
        curr.distance = 0;
        grid[curr.row][curr.col] = curr;
        grid[end.row][end.col] = end;
        var visited = [];
        var unvisited = this.getAllNodes(grid);
        while (unvisited.length > 0){
            if (curr.row === end.row && curr.col === end.col) {
                // if we reached end node
                visited.push(grid[curr.row][curr.col])
                return visited;
            }
            if (curr.isWall) {
                // skip visiting a wall node
                continue;
            }
            if (curr.distance === Infinity) {
                // if closest node distance is infinity, we are stuck
                visited.push(grid[curr.row][curr.col])
                return visited;
            }
            grid[curr.row][curr.col].isVisited = true;
            visited.push(grid[curr.row][curr.col]);
            // set distance of curr's neighbours to curr.distance + 1 and set prevNode to curr
            this.updateNeighbours(curr, grid);
            grid = this.state.grid;
            // sort unvisited nodes by shortest distance
            unvisited = sortByDistance(unvisited);
            curr = unvisited.shift();
        }
        return visited;
    }
    getAllNodes(grid){
        var allNodes = [];
        for (let i = 0; i < this.state.height; i++) {
            for (let j = 0; j < this.state.width; j++) {
                allNodes.push(grid[i][j]);
            }
        }
        return allNodes;
    }
    updateNeighbours(curr, oldGrid){
        var r = curr.row;
        var c = curr.col;
        var newGrid = oldGrid;
        var neighbour = null;
        if (r < this.state.height - 1) {
            neighbour = oldGrid[r+1][c];
            neighbour = updateDistanceAndPrevNode(neighbour, curr);
            newGrid[r+1][c] = neighbour;
        }
        if (r > 0) {
            neighbour = oldGrid[r-1][c];
            neighbour = updateDistanceAndPrevNode(neighbour, curr);
            newGrid[r-1][c] = neighbour;
        }
        if (c < this.state.width - 1) {
            neighbour = oldGrid[r][c+1];
            neighbour = updateDistanceAndPrevNode(neighbour, curr);
            newGrid[r][c+1] = neighbour;
        }
        if (c > 0) {
            neighbour = oldGrid[r][c-1];
            neighbour = updateDistanceAndPrevNode(neighbour, curr);
            newGrid[r][c-1] = neighbour;
        }
        this.setState({
            grid: newGrid
        })
    }
    findShortestPath(node) {
        var path = []
        while (node != null) {
            path.unshift(node);
            node = node.prevNode
        }
        return path
    }
    componentDidMount() {
        var newBoard = [];
        for (let i = 0; i < this.state.height; i++){
            let newRow = [];
            for (let j = 0; j < this.state.width; j++) {
                let newNode = new Node(i,j);
                newRow.push(newNode);
            }
            newBoard.push(newRow);
        }
        this.setState({grid: newBoard});
    }
    createGrid(x, y){
        /**
            should find a way to use the mapping function instead of a for loop of divs 
            each child should get a keyID too 
        */
        let table = []
        let keyIndex = 0; 
        for (let i = 0; i < x; i++){
            let children = []
            for (let j = 0; j < y; j++){
                keyIndex ++; 
                children.push(<td><div className="node unvisited" id={`node-${i}${j}`}></div></td>)
            }
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    render() { 
        return (
            <table className="table">
                <tbody>
                    {this.createGrid(this.state.height, this.state.width)}
                </tbody>
            </table>
        )
    }
}

function updateDistanceAndPrevNode(neighbour, curr) {
    if (!neighbour.isVisited && !neighbour.isWall) {
        neighbour.distance = curr.distance + 1;
        neighbour.prevNode = curr;
    }
    return neighbour;
}
function sortByDistance(arr) {
    arr.sort(function(a,b) { return a.distance - b.distance; });
    return arr;
}

export default Board;