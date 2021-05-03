import React from 'react'
import { Pagination,Grid, Loader, Table,Card, Image,List,  Label,Modal,Button, Header,Icon} from 'semantic-ui-react'
import _ from 'lodash'
import avatarImages from '../extra/avatar_images'


export const userModal = ( closeModal, reactState) => {

 
  if(_.isEmpty(reactState.userDetails)){
  return (
    <Modal open={true} >
       <Modal.Header>Fetching user details for<p style={{ display: 'inline', color:'blue' }}>{reactState.selected_user.name}.</p> </Modal.Header>
       <Modal.Content  scrolling image></Modal.Content>
       <Modal.Actions>
        <Button onClick={() => closeModal('show_user_model')} primary>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )}
  else{
  return (
    <Modal  open={reactState.show_user_model}   >
      <Modal.Header>About <p style={{ display: 'inline', color:'blue' }}>{reactState.selected_user.name}.</p> </Modal.Header>
      <Modal.Content  scrolling image>
        <Grid>
      {reactState.userDetails.map( (item, index) => (
        
    <Grid.Row columns={2} divided>
      <Grid.Column> 
                  <Card
                  image= {avatarImages.AVATAR[reactState.selected_user.avatar]}
                  header={reactState.selected_user.name}
                  meta={"User Name : "+reactState.selected_user.user_name}
                  description={"User Id : "+reactState.selected_user.id}
                />
           </Grid.Column>
           <Grid.Column>
      <Modal.Description style={{padding:"10px"}}>
        <strong > This is description of <p style={{ display: 'inline', color:'blue' }}>{reactState.selected_user.name}.</p> Below are list of details of this hacker </strong>

        <List>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
          Chanllenges Solved : <p style={{ display: 'inline', color:'blue' }}>{item.challenges_solved} </p> 
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>Education : <p style={{ display: 'inline', color:'blue' }}>{item.education} </p> </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
        Followers : <p style={{ display: 'inline', color:'blue' }}>{item.followers} </p> 
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
         Location : <p style={{ display: 'inline', color:'blue' }}>{item.location} </p>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
      Overall Rank : <p style={{ display: 'inline', color:'blue' }}>{item.overall_rank} </p> 
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='linarrow circle rightkify' />
      <List.Content>
        Profle Link : <a href='{item.profile_link}'><p style={{ display: 'inline', color:'blue' }}>{item.profile_link} </p></a>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
         Solution Accepted : <p style={{ display: 'inline', color:'blue' }}>{item.solutions_accepted} </p>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
        Solution Submitted : <p style={{ display: 'inline', color:'blue' }}>{item.solutions_submitted} </p>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='arrow circle right' />
      <List.Content>
         ID : <p style={{ display: 'inline', color:'blue' }}>{item.id} </p>
      </List.Content>
    </List.Item>
  </List>
      </Modal.Description> 
      </Grid.Column>

      </Grid.Row>
))}
</Grid>
    </Modal.Content>
         
      <Modal.Actions>
        <Button onClick={() => closeModal('show_user_model')} primary>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )}
}

