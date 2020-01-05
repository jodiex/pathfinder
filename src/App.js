import React from 'react';
import { Grid, Label } from 'semantic-ui-react'
import {OptionPanel} from './components/OptionPanel.jsx'

  function App() {

    return (
      <div className="App">
        <Grid divided>
          <Grid.Row floated={"left"}>
            <Grid.Column width={12}>
              <Label>This is where the grid component will go</Label>
            </Grid.Column>
  
            <Grid.Column floated={"right"} width={4}>
              <OptionPanel></OptionPanel>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }

export default App;
