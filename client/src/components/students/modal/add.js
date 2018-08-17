import React, { Component, PropTypes } from 'react';
import { Modal,ButtonToolbar,Button} from 'react-bootstrap';


class AddBookModal extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: false,
           show: false
       }
   this.handleShow = this.handleShow.bind(this);
   this.handleHide = this.handleHide.bind(this);
}

handleShow() {
  this.setState({ show: true });
}

handleHide() {
  this.setState({ show: false });
}

render(){
  const {value} = this.state
    return(
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton style={{backgroundColor: 'grey'}}>
            <Modal.Title id="contained-modal-title-lg">
              <b>Confirmation</b>
            </Modal.Title>
            <hr/>
          </Modal.Header>
          <Modal.Body>
            <h4>
            Are you sure you want to continue ?
            </h4>
            <hr/>
          </Modal.Body>
          <Modal.Footer style={{textAlign: 'center'}}>
            <button className="btn btn-danger">Yes</button>
            <button className="btn btn-info" onClick={this.handleHide}>No</button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    )
  }
}


export default AddBookModal;
