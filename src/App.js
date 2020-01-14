import React, {useState} from 'react';
import { Grid, Label } from 'semantic-ui-react'
import {OptionPanel} from './components/OptionPanel.jsx'
import Board from './components/Board'


  function App() {
    const [startXCoord, setStartXCoord] = useState(0); 
    const [startYCoord, setStartYCoord] = useState(0);
    const [endXCoord, setEndXCoord] = useState(0); 
    const [endYCoord, setEndYCoord] = useState(0); 
    console.log(startXCoord)
    return (
      <div className="App">
        <Grid divided>
          <Grid.Row floated={"left"}>
            <Grid.Column width={12}>
              <Board
              {...{
                startXCoord,
                startYCoord, 
                endXCoord,
                endYCoord
              }}/>
            </Grid.Column>
  
            <Grid.Column floated={"right"} width={4}>
              <OptionPanel
              {...{
                setStartXCoord, 
                setStartYCoord, 
                setEndXCoord, 
                setEndYCoord
              }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }

export default App;
