import React,{Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,Step } from 'semantic-ui-react';
import logo from '../assets/logo.png';
import {HttpCall} from '../Api';
class Profile extends Component{
    constructor(){
        super();
        this.state={
          first_name:'',
          last_name:''
        }    
      }
      _handleChange=(e,{name,value})=>{
          this.setState({
            [name]:value
          })
      }
      _handleSubmit=()=>{
        (this.state.first_name.length<1)?this.setState({
          first_name:undefined
        }):(this.state.last_name.length<1)?this.setState({
          last_name:undefined
        }):HttpCall('https://test.hackinout.co/api/users/'+sessionStorage.getItem('username'),'POST',{
          first_name:this.state.first_name,
          last_name:this.state.last_name
      },sessionStorage.getItem('access_token'),(response)=>{
          sessionStorage.setItem('first_name',response.first_name);
          window.location="/additem/2";

      });
    }
    render(){
        return(
            <div>
            <Header as='h2' color='black' textAlign='center'>
            <Image src={logo} />
            {' '}Create Profile
          </Header>
          <Form size='large' onSubmit={this._handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                error={(this.state.first_name==undefined)?true:false}
                value={this.state.first_name}
                onChange={this._handleChange}
                name='first_name'
                icon="user"
                iconPosition='left'
                placeholder='First Name'
              />
              <Form.Input
                fluid
                error={(this.state.last_name==undefined)?true:false}
                value={this.state.last_name}
                onChange={this._handleChange}
                name="last_name"
                icon="user"
                iconPosition='left'
                placeholder='Last name'
                type='text'
              />
              <Button color='teal' fluid size='large'>Continue</Button>
            </Segment>
          </Form>
          <Message>
            Hire Skill, Hiring Good Quality Engineers <a href='#'>Logout</a>
          </Message>
          </div>
        )
    }
}
export default Profile;