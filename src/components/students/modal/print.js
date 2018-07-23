import React, { Component, PropTypes } from 'react';
import { Modal,ButtonToolbar,Button} from 'react-bootstrap';
import './style.css'

class printModal extends React.Component {
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
      <i className="material-icons" onClick={this.handleShow}>print</i>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-lg">
              <b>Confirmation</b>
              <hr/>
            </Modal.Title>
            <hr/>
          </Modal.Header>
          <Modal.Body>
            <h4>
              reiciendis! Ullam. Dolor dolores veniam animi sequi dolores
              molestias voluptatem iure velit. Elit dolore quaerat incidunt enim
              aut distinctio. Ratione molestiae laboriosam similique laboriosam
              eum et nemo expedita. Consequuntur perspiciatis cumque dolorem.
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


export default printModal;
