import React from 'react';
import {Segment, Header, Dropdown, Label, Divider, Input, Button, Icon} from 'semantic-ui-react';
import './css/OptionPanel.css';

function OptionPanel() {
    const algo = [
    {
        key: 0,
        text: 'Dijkstra',
        value: 'Dijkstra' 
    },
    {
        key: 1,
        text: 'Prims',
        value: 'Prims'
    },
    {
        key: 2, 
        text: 'A-Star',
        value: 'A-Star'
    }
    ]
    
    
    return(
        <div className="container">
        <Segment raised>
            <Header id='header' size='huge'> PathFinder Visualizer</Header> 
            <Header id='input' as='h2'> Input </Header>
            <Dropdown 
                placeholder='Select your pathfinding algorithm'
                fluid
                selection
                options={algo}
            />
            <Label pointing>Please select your pathfinding algorithm</Label>
            <Divider/>
            <div className="coordinates">
                <Header id='startNode' as='h2'> Start Node Coordinates </Header>
                <Input id='xcoord' label="x:" placeholder="0" />
                <br/><br/>
                <Input id='ycoord' label="y:" placeholder="0" />

                <Header id='endNode' as='h2'> End Node Coordinates </Header>
                <Input id='xcoord' label="x:" placeholder="0" />
                <br/><br/>
                <Input id='ycoord' label="y:" placeholder="0" />
            </div>
            <Divider />
            <Button.Group vertical widths='5' id='buttonGroup'>
                <Button id='run' icon labelPosition='left'>
                    Run 
                    <Icon name ='play' />
                </Button>
                <Button id='pause' icon labelPosition='left'>
                    Pause 
                    <Icon name ='pause' />
                </Button>
                <Button id='clear' icon labelPosition='left'>
                    Clear
                    <Icon name ='eraser' />
                </Button>
            </Button.Group>
        </Segment>
        </div>
        )
}

export {OptionPanel} 