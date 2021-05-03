import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Register from './register'
import { Redirect } from "react-router-dom";

// const BaseUrl = 'http://localhost:4000/styldod/'
const BaseUrl = 'https://jdhacker.herokuapp.com/styldod/'

  function loginUser(credentials) {
 
    return fetch(BaseUrl+'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
   }

export default function Login({ setToken }){

const [username, setUserName] = useState();
const [password, setPassword] = useState();
const [submitting, setSubmitting] = useState(false);
const [invalidUser, setinvalidUser] = useState(false);
const [newUser, setnewUser] = useState(false);



const handleNewUser = () =>{
  setnewUser(true)
}

const handleSubmit = async e => {
  console.log("submit clicked")
  e.preventDefault();
  setSubmitting(true);
  const response = await loginUser({
    'user_name':username,
    'password':password
  });
  setSubmitting(false);
  if(response.data.user_exists)
  {
      setToken(response.data.token);
      window.location.reload(false);

      
  }
  else{
    setinvalidUser({ content: 'Username or password is incorrect', pointing: 'below' });

  }
      //redirect to error page or, show invalid user
}
     
if(newUser)
  return <Register/>
  return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='https://cosmeticaacademy.com/wp-content/uploads/2020/04/staff-placeholder.jpg'  /> Log-in to your account
      </Header>
      <Loader active={submitting}/>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input 
       
          error={invalidUser}
          fluid icon='user' required onChange={e => setUserName(e.target.value)} iconPosition='left' placeholder='User Name' />
 
          <Form.Input
          required
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
              <Message
      success
      header='Form Completed'
      content="You're all signed up for the newsletter"
    />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#' onClick={handleNewUser}>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>)   }