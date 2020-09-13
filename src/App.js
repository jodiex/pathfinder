import React, {useState} from 'react';
import {OptionPanel} from './components/OptionPanel.jsx'
import { Grid, Segment, Header, Dropdown, Label, Divider, Button, Icon} from 'semantic-ui-react';
import Board from './components/Board'



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

class App extends React.Component {
  constructor(props){
    super(props);
    this.child = React.createRef();
    this.state = {
      startXCoord: 0,
      endXCoord: 0,
      startYCoord: 0,
      endYCoord: 0
    }
    // this.handleClick = this.handleClick.bind(this);
  }
      
  handleClick = () => {
    this.child.current.visualize();
  }
    
  render () {
    return (
      <div className="App">
        <Grid divided>
          <Grid.Row floated={"left"}>
            <Grid.Column width={12}>
              <Board
              ref={this.child}
              startXCoord={this.state.startXCoord}
              endXCoord={this.state.endXCoord}
              startYCoord={this.state.startYCoord}
              endYCoord={this.state.endYCoord}
              />
            </Grid.Column>

            <Grid.Column floated={"right"} width={4}>
            <Segment raised>
                <Header id='header' size='huge'> PathFinder Visualizer</Header> 
                <Header id='input' as='h2'> Input </Header>
                <Label>Please select your pathfinding algorithm</Label>
                <Dropdown 
                    placeholder='Select your pathfinding algorithm'
                    fluid
                    selection
                    options={algo}
                />
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
                        onChange={(e, {value}) => this.setState({startXCoord: {value}=value})}
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
                        onChange={(e, {value}) => this.setState({startYCoord: {value}=value})}
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
                        onChange={(e, {value}) => this.setState({endXCoord: {value}=value})}
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
                        onChange={(e, {value}) => this.setState({endYCoord: {value}=value})}
                    />
                    </Label>
                    <br/><br/>
                </div>
                <Divider />
                <Button.Group vertical widths='5' id='buttonGroup'>
                    <Button id='run' icon labelPosition='left' onClick={this.handleClick}>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
