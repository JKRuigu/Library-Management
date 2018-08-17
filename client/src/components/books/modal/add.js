import React from "react";
import { Modal, Button ,ButtonToolbar} from 'react-bootstrap';

export default ({
   show,
   handleShow,
   handleHide
  }) =>(
    <ButtonToolbar>
      <Button bsStyle="primary" onClick={() => handleShow()}>
        Launch demo modal
      </Button>

      <Modal
        show={show}
        onHide={() => handleHide()}
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
          <button className="btn btn-info" onClick={() => handleHide()} >No</button>
        </Modal.Footer>
      </Modal>
    </ButtonToolbar>
)
