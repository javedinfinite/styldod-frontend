import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Login from './login'
import { Redirect } from "react-router-dom";
import {setToken} from './auth'

// const BaseUrl = 'http://localhost:4000/styldod/'
const BaseUrl = 'https://jdhacker.herokuapp.com/styldod/'

function registerUser(credentials) {
 
  return fetch(BaseUrl+'register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
 }

export default function Register(){

  const [name, setName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [duplicateUser, setDuplicateUser] = useState(false);
  const [successUser , setsuccessUser] = useState(false);
  const [oldUser, setoldUser] = useState(false);

const username_message = { content: 'Please enter your first name', pointing: 'below' }


const handleNewUser = () =>{
  setoldUser(true)
}

const handleSubmit = async e => {
  console.log("submit clicked")
  e.preventDefault();
  setSubmitting(true);
  const response = await registerUser({
    'name':name,
    'user_name':username,
    'user_type':'user',
    'password':password
  });
  setSubmitting(false);
  if(!response.data.duplicate)
  {
      setsuccessUser(true); 
      setDuplicateUser(false);
      setName("");
      setUserName("");
      setPassword("")
  }
  else{
      setDuplicateUser({ content: 'Username is taken, please try other unique_name', pointing: 'below' });
      setsuccessUser(false); 
  }
}
     
if(oldUser)
  return <Login setToken={setToken}/>
  return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='https://cosmeticaacademy.com/wp-content/uploads/2020/04/staff-placeholder.jpg' /> Register an account
      </Header>
      <Loader active={submitting}/>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input  
            fluid icon='user' required onChange={e => setName(e.target.value)} iconPosition='left' placeholder='Name' />
          <Form.Input 
       
          error={duplicateUser} 
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
          <Button color='teal' fluid size='large'>
            Register
          </Button>
          {successUser &&  
            <div style={{color:'green'}}>You are successfully registered</div>
        }
        </Segment>
      </Form>
      <Message>
        Already Registered? <a href='#' onClick={handleNewUser}>Login </a>
      </Message>
    </Grid.Column>
  </Grid>)   }