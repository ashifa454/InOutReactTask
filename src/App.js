import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { Grid,Segment,Step } from 'semantic-ui-react'
class App extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      password:''
    }    
  }
  _handleChange=(e,{name,value})=>{
      this.setState({
        [name]:value
      })
  }
  _handleSubmit=()=>{
    (this.state.username.length<1)?this.setState({
      username:undefined
    }):(this.state.password.length<1)?this.setState({
      password:undefined
    }):console.log("READY TO GO");
  }
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
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column>
            <Step.Group ordered>
              <Step>
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
          </Grid>
        </div>
      );
  }
}

export default App;
