import React, { Component } from 'react'
import { Menu, Segment,Icon, Image, Dropdown } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import {removeToken} from './auth/auth'
import jwt_decode from "jwt-decode";
import { checkTokenValidity, getToken } from '../components/auth/auth'
import avatar_images from './extra/avatar_images'
import _ from 'lodash'

var user_details = ''

if(checkTokenValidity())
{
  const token = getToken()
  const decoded = jwt_decode(token);
  user_details = decoded
}


export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleArticleClick = () => (window.open("https://medium.com/@javedaktar73/all-about-cors-cross-origin-resource-sharing-b861d63cf29a", '_blank'))
  handleYoutubeClick = () => (window.open("https://www.youtube.com/watch?v=EpDw01rc35I", '_blank'))
  handleLinkedinClick = () => (window.open("https://www.linkedin.com/in/javed-akhtar-07370613b", '_blank'))
   
  handleLogout = ( ) =>  {
    removeToken()
    window.location.reload(false);
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment style={{backgroundColor : '#00b5ad'}}>
        <Menu attached pointing secondary stackable inverted style={{borderColor:'transparent'}}>
          <Menu.Item
            name='home'
            as={Link} to="/"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
          as={Link}
            name='My Youtube'
            active={activeItem === 'My Youtube'}
            onClick={this.handleYoutubeClick}
          />
          <Menu.Item
          as={Link}
            name='My Linkedin'
            active={activeItem === 'My Linkedin'}
            onClick={this.handleLinkedinClick}
          />
          <Menu.Item
          as={Link}
            name='My Article'
            active={activeItem === 'My Article'}
            onClick={this.handleArticleClick}
          />
          <Menu.Item
            name='Top 3'
            as={Link} to="/top3"
            active={activeItem === 'Top 3'}
            onClick={this.handleItemClick}
          />


          <Menu.Menu position='right'> 
 
            <Menu.Item position='right'>
            </Menu.Item>
            <Image position='right' src={avatar_images.AVATAR[user_details.avatar]} size='mini' circular spaced='right'/>
            <Menu.Item
                name='Logout'
                active={activeItem === 'Logout'}
                onClick={this.handleLogout}
              >
                <Icon name='power off' />
                {user_details.name}
            </Menu.Item>


             
          </Menu.Menu>
        </Menu>

 
      </Segment>
    )
  }
}
