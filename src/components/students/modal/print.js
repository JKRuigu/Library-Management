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
          dialogclassNameName="custom-modal"
        >
          <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-lg">
              <b><h2>Library Student Information</h2></b>
              <hr/>
            </Modal.Title>
            <hr/>
          </Modal.Header>
          <Modal.Body>
            <h4>
            <span>Name:</span>   <span>Student Adm:</span> <span>Class:</span>
            </h4>
            <div className="row">
             <div className="col-md-12">
               <div className="panel panel-default">
                 <div className="panel-heading">
                   <h3 className="panel-title"><strong>Borrowed books</strong></h3>
                 </div>
                 <div className="panel-body">
                   <div className="table-responsive">
                     <table className="table table-condensed">
                       <thead>
                             <tr>
                                 <td><strong>Item</strong></td>
                                 <td className="text-center"><strong>Price</strong></td>
                                 <td className="text-center"><strong>Quantity</strong></td>
                                 <td className="text-right"><strong>Totals</strong></td>
                              </tr>
                       </thead>
                       <tbody>
                         <tr>
                           <td>BS-200</td>
                           <td className="text-center">$10.99</td>
                           <td className="text-center">1</td>
                           <td className="text-right">$10.99</td>
                         </tr>
                            <tr>
                             <td>BS-400</td>
                           <td className="text-center">$20.00</td>
                           <td className="text-center">3</td>
                           <td className="text-right">$60.00</td>
                         </tr>
                          <tr>
                           <td>BS-1000</td>
                           <td className="text-center">$600.00</td>
                           <td className="text-center">1</td>
                           <td className="text-right">$600.00</td>
                         </tr>
                        </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </div>
           </div>
            <hr/>
          </Modal.Body>
          <Modal.Footer style={{textAlign: 'center'}}>
            <button classNameName="btn btn-danger">Yes</button>
            <button classNameName="btn btn-info" onClick={this.handleHide}>No</button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    )
  }
}


export default printModal;
