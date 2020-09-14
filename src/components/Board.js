import React from 'react';


class Node {
    construtor (r, c){
        this.row = r;
        this.col = c;
        this.distance= Infinity;
        // this.isWall = false;
        this.isVisited= false;
        this.prevNode = null;
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid : [],
            startNode: {},
            endNode: {},
        };

        //this.visualize = this.visualize.bind(this); don't think i need to bind, but i'm not 100% sure when bind is used.
        //this.findShortestPath = this.findShortestPath.bind(this);
    }
    visualize(){
        var nodesInOrder = this.findShortestPath();
        // animation function
        animate(nodesInOrder);
    }
    findShortestPath() {
        var curr = this.state.startNode;
        var end = this.state.endNode;
        var {grid} = this.state;
        grid[curr.row][curr.col].distance = 0;
        var visited = [];
        var unvisited = this.getAllNodes(grid);
        while (unvisited.length > 0){
            if (curr.row === end.row && curr.col === end.col) {
                return visited;
            }
            if (curr.isWall){
                continue;
            }
            grid[curr.row][curr.col].isVisited = true;
            visited.push(grid[curr.row][curr.col]);
            // add + 1 to the distance of its neighbours and set prevNode to curr
            grid = this.updateNeighbours(curr, grid);
            unvisited = sortByDistance(unvisited);
            curr = unvisited.shift();
        }
        return visited;
    }
    getAllNodes(grid){
        var allNodes = [];
        for (let i = 0; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {
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
        return newGrid;
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
    animate(nodesInOrder){
        var class = "visited";
    }
    componentDidMount() {
        var newBoard = [];
        for (let i = 0; i < WIDTH; i++){
            const row = []; 
            for (let j = 0; j < HEIGHT; j++) {
                row.push(createNode(i,j));
            }
            newBoard.push(row)
        }
        this.setState({grid: newBoard});
    }
    render() { 
        return ( 
            //if you're mapping another map, you need curly braces because you're using a js object
            //if you're doing html, parenthesis work 
            <div className="grid">
            {this.state.grid.map((row) => {
                return (
                    <div className="row">
                    {row.map((node) => (
                        <NodeRender
                            //passing in props 
                            r = {node.r}
                            c = {node.c}
                            isStartNode = {node.isStartNode}
                            isEndNode = {node.isEndNode}
                            isVisited = {node.isVisited}
                            previousNode = {node.previousNode}
                                // isWall = {node.isWall}
                        />
                    )
                )}
                </div>
                )
            })
            }
            </div>
            )  
    }
}

const createNode = (r,c)=>{
        return{
            r,
            c,
            isStartNode: (r === START_ROW && c === START_COLUMN),
            isEndNode: (r === END_ROW && c === END_COLUMN),
            isVisited: false, 
            previousNode: null,
        };
}

function updateDistanceAndPrevNode(r, c, oldGrid, curr) {
    var neighbour = oldGrid[r][c];
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