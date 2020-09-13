import React from 'react';
import { Grid, Segment, Header, Dropdown, Label, Divider, Button, Icon, Input} from 'semantic-ui-react';
import Board from './components/Board'
import './App.css';


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
              <div className="optionPanel">
                <Segment raised>
                    <Header id='header' size='huge'> PathFinder Visualizer</Header> 
                    <Header id='input' as='h2'> Input </Header>
                    <Label id='label'>Please select your pathfinding algorithm</Label>
                    <Dropdown 
                        placeholder='Select your pathfinding algorithm'
                        fluid
                        selection
                        options={algo}
                    />
                    <Divider/>
                    <div className="coordinates">
                        <Header id='startNode' as='h2'>Start Node</Header>
                        <Label
                        >
                        X Coordinate
                        <Input
                          type="number"
                          placeholder='0'
                          button
                          fluid
                          max={24}
                          min={0}
                          onChange={(e, {value}) => {
                            value=parseInt(value);
                            if (value > 24) value = 24
                            if (value < 0) value = 0
                            this.setState({startXCoord: {value}=value});
                          }
                        }><input /></Input>
                        Max: 24
                          </Label>
                        <Label>
                        Y Coordinate
                        <Input
                          type="number"
                          placeholder='0'
                          button
                          fluid
                          max={17}
                          min={0}
                          onChange={(e, {value}) => {
                            value=parseInt(value);
                            if (value > 17) value = 17
                            if (value < 0) value = 0
                            this.setState({startYCoord: {value}=value});
                          }
                        }><input /></Input>
                        Max: 17
                        </Label>

                        <Header id='endNode' as='h2'>Destination Node </Header>

                        <Label>
                        X Coordinate
                        <Input
                          type="number"
                          placeholder='0'
                          button
                          fluid
                          max={24}
                          min={0}
                          onChange={(e, {value}) => {
                            value=parseInt(value);
                            if (value > 24) value = 24
                            if (value < 0) value = 0
                            this.setState({endXCoord: {value}=value});
                          }
                        }><input /></Input>
                        Max: 24
                        </Label>
                        <Label>
                        Y Coordinate
                        <Input
                          type="number"
                          placeholder='0'
                          button
                          fluid
                          max={17}
                          min={0}
                          onChange={(e, {value}) => {
                            value=parseInt(value);
                            if (value > 17) value = 17
                            if (value < 0) value = 0
                            this.setState({endYCoord: {value}=value});
                          }
                        }><input /></Input>
                        Max: 17
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
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
