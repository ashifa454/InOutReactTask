import React,{Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,Step } from 'semantic-ui-react';
import logo from '../assets/logo.png';
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
        (this.state.username.length<1)?this.setState({
          username:undefined
        }):(this.state.password.length<1)?this.setState({
          password:undefined
        }):console.log("READY TO GO");
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
                icon='user'
                iconPosition='left'
                placeholder='John'
              />
              <Form.Input
                fluid
                icon='lock'
                error={(this.state.last_name==undefined)?true:false}
                value={this.state.last_name}
                onChange={this._handleChange}
                name="last_name"
                iconPosition='user'
                placeholder='Doe'
                type='text'
              />
              <Button color='teal' fluid size='large'>Continue</Button>
            </Segment>
          </Form>
          <Message>
            Hire Skill, Hiring Good Quality Engineers <a href='#'>Learn More</a>
          </Message>
          </div>
        )
    }
}
export default Profile;