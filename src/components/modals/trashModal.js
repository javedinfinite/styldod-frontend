import {  Modal,Button, Header,Icon} from 'semantic-ui-react'

export const trashModal = (closeModal, reactState, handleDeleteRow) => {
    const model_ui =   <Modal  open={true} basic size='small'>
        
    <Header icon='archive' content='Archive user' />
    <Modal.Content>
      <p>
        This feature is not implemented yet
      </p>
    </Modal.Content>
    <Modal.Actions>
  
      <Button basic color='red' inverted  onClick={() => closeModal('show_trash_model')}>
        <Icon name='remove' /> This feature is not implemented yet, please close
      </Button>
 
    </Modal.Actions>
  </Modal>
    return model_ui
}