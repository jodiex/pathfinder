import React, {useState} from 'react';
import { Grid, Label } from 'semantic-ui-react'
import {OptionPanel} from './components/OptionPanel.jsx'
//import Board from './Board'


  function App() {
    const [startXCoord, setStartXCoord] = useState(0); 
    const [startYCoord, setStartYCoord] = useState(0);
    const [endXCoord, setEndXCoord] = useState(0); 
    const [endYCoord, setEndYCoord] = useState(0); 
    return (
      <div className="App">
        <Grid divided>
          <Grid.Row floated={"left"}>
            <Grid.Column width={12}>
              <Label>This is where the grid component will go</Label>
            </Grid.Column>
  
            <Grid.Column floated={"right"} width={4}>
              <OptionPanel
              {...{
                startXCoord, setStartXCoord, 
                startYCoord, setStartYCoord, 
                endXCoord, setEndXCoord, 
                endYCoord, setEndYCoord
              }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }

export default App;
