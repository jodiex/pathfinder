import React from 'react';
import {Segment, Header, Dropdown, Label, Divider, Button, Icon} from 'semantic-ui-react';
import './css/OptionPanel.css';


function OptionPanel({
    setStartXCoord,
    setStartYCoord, 
    setEndXCoord,
    setEndYCoord
}) {
    const algo = [
    {
        key: 0,
        text: 'Dijkstra',
        value: 'Dijkstra' 
    },
    {
        key: 1,
        text: 'Primms',
        value: 'Prims'
    },
    {
        key: 2, 
        text: 'A-Star',
        value: 'A-Star'
    }
    ]
    const coordinates = [
        {
            key: 0,
            text: 0, 
            value: 0
        },
        {
            key: 1,
            text: 1, 
            value: 1
        },
        {
            key: 2, 
            text: 2, 
            value: 2 
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
                <Label
                >
                X Coordinate
                <Dropdown
                    placeholder='0'
                    button
                    fluid
                    selection
                    options={coordinates}
                    onChange={(e, {value}) => setStartXCoord({startXCoord: {value}=value})}
                />
                </Label>
                <Label>
                Y Coordinate
                <Dropdown
                    placeholder='0'
                    button
                    fluid
                    selection
                    options={coordinates}
                    onChange={(e, {value}) => setStartYCoord({startYCoord: {value}=value})}
                />
                </Label>

                <Header id='endNode' as='h2'> End Node Coordinates </Header>

                <Label>
                X Coordinate
                <Dropdown
                    placeholder='0'
                    button
                    fluid
                    selection
                    options={coordinates}
                    onChange={(e, {value}) => setEndXCoord({endXCoord: {value}=value})}
                />
                </Label>
                <Label>
                Y Coordinate
                <Dropdown
                    placeholder='0'
                    button
                    fluid
                    selection
                    options={coordinates}
                    onChange={(e, {value}) => setEndYCoord({endYCoord: {value}=value})}
                />
                </Label>
                <br/><br/>
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