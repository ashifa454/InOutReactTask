import React, { Component } from 'react';
import './App.css';
import { Grid,Step } from 'semantic-ui-react';
import Login from './components/login';
import Profile from './components/profile';
import AddSkill from './components/addSkill';
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
            style={{ paddingTop: '5%' }}
            verticalAlign='middle'
          >
          <Grid.Row>
            {(this.props.loginStaus===false||this.props.match.params.tabSelect===undefined)?
              <Grid.Column width={6}>
                <Login/></Grid.Column>
              :(this.props.match.params.tabSelect==1)?<Grid.Column width={6}><Profile/></Grid.Column>:(<Grid.Column  width={10}><AddSkill/></Grid.Column>)}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Step.Group ordered>
              <Step completed={this.props.loginStaus===true} active={this.props.loginStaus===false||this.props.match.params.tabSelect===null}>
                <Step.Content>
                  <Step.Title>Signin</Step.Title>
                  <Step.Description>Login to Continue</Step.Description>
                  </Step.Content>
              </Step>
              <Step completed={this.props.profileStatus===1} active={this.props.loginStaus===true&&this.props.match.params.tabSelect===1}>
                <Step.Content >
                  <Step.Title>Create Profile</Step.Title>
                  <Step.Description>Add Your Basic Details</Step.Description>
                  </Step.Content>
              </Step>
              <Step completed={this.props.profileStatus===2} active={this.props.loginStaus===true&&this.props.match.params.tabSelect===2}>
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
