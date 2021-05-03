import React, { Component } from 'react'
import { Image, Loader, Table, Label, Header} from 'semantic-ui-react'
import {getTopUsers,getUserDetails} from '../actions/hackerAction'
 
import {userModal} from './modals/userModal'
 
import { connect } from 'react-redux';
import _  from 'lodash'
import avatar_images from './extra/avatar_images'
import '../App.css'

class Top3 extends Component {
    state = {
 
        data:[],
        page_number:1,
        show_user_model:false,
        userDetails:[],
        selected_user:'',
      
      }

  componentDidMount(){
    this.props.dispatch(getTopUsers(3));
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
 
    const { error, isLoading, topUsers } = this.props;
    
    if (error) {
        return <div> Error: {error} </div>;
    } else if (isLoading) {
        return <Loader size="large" indeterminate active />
      }
    else{

      if(_.isEmpty(this.props.topUsers)  )
      return null;

      return (
        <div style = {{padding:'20px', backgroundColor:'white', width:'100%'}}>

        <div>
            {(() => {
  
              if (this.state.show_user_model) {
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
                <Label color='teal' ribbon>List of Top 3 Hackers</Label>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center">AVATAR</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">USER NAME</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">USER TYPE</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {topUsers.map( (item, index) => (
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
//   if(!_.isEmpty(state.hackerReducers.topUsers))
//       console.log("from dataset..............",state.hackerReducers.topUsers)
  return {
    topUsers: state.hackerReducers.topUsers,
    error:  state.hackerReducers.error,
    isLoading: state.hackerReducers.isLoading,
    userDetails: state.hackerReducers.userDetails
  };
};

export default connect(mapStateToProps)(Top3);

