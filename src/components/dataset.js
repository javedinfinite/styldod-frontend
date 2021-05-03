import React, { Component } from 'react'
import { Image, Loader, Table, Label, Header} from 'semantic-ui-react'
import { getSomeUsers, getUserDetails} from '../actions/hackerAction'
import { checkTokenValidity, getToken } from '../components/auth/auth'
import jwt_decode from "jwt-decode";
 
import {userModal} from './modals/userModal'
import {trashModal} from './modals/trashModal'
 
import { connect } from 'react-redux';
import _ from 'lodash'
import avatar_images from './extra/avatar_images'
import '../App.css'

var user_details = ''

if(checkTokenValidity())
{
  const token = getToken()
  const decoded = jwt_decode(token);
  user_details = decoded
}

class Dataset extends Component {
    state = {
 
        data:[],
        page_number:1,
        show_user_model:false,
        userDetails:[],
        show_trash_model:false,
        selected_user:'',
      
      }

  componentDidMount(){
    this.props.dispatch(getSomeUsers(1));
  }

  handleDeleteRow = (user_id,page_number) => {
    this.setState({show_trash_model: false  })
  }

  setActionId = (item, model_to_show, modalState) => {
    this.setState({ selected_user: item, [`${model_to_show}`]: modalState  })
    if(model_to_show=='show_user_model'){
      this.props.dispatch(getUserDetails(item.id)).then(  ( ) =>  { 
        this.setState({ userDetails: this.props.userDetails}) 
      });
    }

  }

  closeModal = (model_to_close) => {
    this.setState({ [`${model_to_close}`]: false  })
  }
  
  render() {
    
    const { error, isLoading, someUsers} = this.props;
    
    if (error) {
        return <div> Error: {error} </div>;
    } else if (isLoading) {
        return <Loader size="large" indeterminate active />
      }
    else{

      if(_.isEmpty(this.props.someUsers)  )
      return null;

      return (
        <div style = {{padding:'18px', backgroundColor:'white', width:'100%'}}>

        <div>
            {(() => {

              if (this.state.show_trash_model) {
                return (
                  trashModal(this.closeModal, this.state, this.handleDeleteRow)
                )
              }  
  
              else if (this.state.show_user_model) {
                return (
                  userModal( this.closeModal, this.state)
                )
              } 
              else{
                return null
              }

            })()}
          </div>

        <div  >
            <Table celled   selectable   color='teal'>
                <Label color='teal' ribbon>List of Hackers</Label>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center">AVATAR</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">USER NAME</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">USER TYPE</Table.HeaderCell>
                        {user_details.user_type=='admin' && <Table.HeaderCell textAlign="center">Remove</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {someUsers.map( (item, index) => (
                    <Table.Row>
                        <Header as='h4' image>
                          <Image src={avatar_images.AVATAR[item.avatar]} rounded size='mini' />
                          <Header.Content>
                            {item.name}
                            <Header.Subheader>Id: {item.id}</Header.Subheader>
                          </Header.Content>
                        </Header>

                        
                        <Table.Cell textAlign="center">{item.id}</Table.Cell>
                        <Table.Cell className='action_items' textAlign="center" selectable style={{color:'blue'}} onClick={() => this.setActionId(item,'show_user_model',true)}>{item.name}</Table.Cell>
                        <Table.Cell textAlign="center">{item.user_name}</Table.Cell>
                        <Table.Cell textAlign="center">{item.user_type}</Table.Cell>
                        
                        {user_details.user_type=='admin' && <Table.Cell className='action_items' selectable style={{color:'red'}} onClick={() => this.setActionId(item,'show_trash_model',true)} textAlign="center"><i aria-hidden="true"  color='red' class="trash alternate icon"></i></Table.Cell>}
                         
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
        </div>
      )
    }

  }
}


const mapStateToProps = (state, props) => {
  // if(!_.isEmpty(state.hackerReducers.userDetails))
  //     console.log("from dataset..............",state.hackerReducers.userDetails)
  return {
    someUsers: state.hackerReducers.someUsers,
    error:  state.hackerReducers.error,
    isLoading: state.hackerReducers.isLoading,
    userDetails: state.hackerReducers.userDetails,
  };
};

export default connect(mapStateToProps)(Dataset);

