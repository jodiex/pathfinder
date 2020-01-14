import React, {Component} from 'react'; 
import './css/Node.css'; 


class NodeRender extends Component { 
    render() {
        const { 
            isStartNode,
            isEndNode
        } = this.props; 
        const changeName = isEndNode
        ? 'node-finish'
        : isStartNode
        ? 'node-start'
        : 'unVisited';

        return (
            <div className={`${changeName} node cell`}></div>
        );
    }
}

export {NodeRender}