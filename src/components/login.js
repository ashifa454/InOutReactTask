import React,{Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,Step } from 'semantic-ui-react'
class Login extends Component{
    render(){
        return(
            <Header as='h2' color='black' textAlign='center'>
            <Image src={logo} />
            {' '}Hire Skill
          </Header>
          <Form size='large' onSubmit={this._handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                error={(this.state.username==undefined)?true:false}
                value={this.state.username}
                onChange={this._handleChange}
                name="username"
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
              />
              <Form.Input
                fluid
                icon='lock'
                error={(this.state.password==undefined)?true:false}
                value={this.state.password}
                onChange={this._handleChange}
                name="password"
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Button color='teal' fluid size='large'>Continue</Button>
            </Segment>
          </Form>
          <Message>
            Hire Skill, Hiring Good Quality Engineers <a href='#'>Learn More</a>
          </Message>
        )
    }
}
export default Login;