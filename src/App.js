import React, { Component } from 'react';
import './App.css';
import { Grid,Segment,Step } from 'semantic-ui-react';
import Login from './components/login';
class App extends Component {
  render() {
    return (
        <div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid
            textAlign='center'
            style={{ paddingTop: '10%' }}
            verticalAlign='middle'
          >
          <Grid.Row 
            columns={3}>
            <Grid.Column>
              <Login/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Step.Group ordered>
              <Step active>
                <Step.Content>
                  <Step.Title>Signup</Step.Title>
                  <Step.Description>Create/Login to Continue</Step.Description>
                  </Step.Content>
              </Step>
              <Step>
                <Step.Content>
                  <Step.Title>Create Profile</Step.Title>
                  <Step.Description>Add Your Basic Details</Step.Description>
                  </Step.Content>
              </Step>
              <Step>
                <Step.Content>
                  <Step.Title>Add Your Skills</Step.Title>
                  <Step.Description>Tell Requiters about your skills</Step.Description>
                  </Step.Content>
              </Step> 
  </Step.Group>
  </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
  }
}

export default App;
