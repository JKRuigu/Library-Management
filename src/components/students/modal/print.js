import React, { Component, PropTypes } from 'react';
import Table from '../../dashboard/borrow/table';
import { Modal,ButtonToolbar,Button} from 'react-bootstrap';
import './style.css'

class printModal extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: false,
           show: false,
           print:false,
           values: {
             ...props.x
           },
           studBorrowedBooks:[],
           studBorrowAva:false,
           displayReport:'No books borrowed.'
       }
   this.handleShow = this.handleShow.bind(this);
   this.handleHide = this.handleHide.bind(this);
   this.handlePrint = this.handlePrint.bind(this);
}

handleShow() {
  const {values} =this.state
  console.log(values);
    if (values.hasOwnProperty("myBooks") ) {
      let borrowedBooks = values.myBooks;
       this.setState({studBorrowedBooks:borrowedBooks})
    }else{
      this.setState({studBorrowedBooks:[]})
    }

  this.setState({ show: true });
}

handleHide() {
  this.setState({
    show: false,
    print:true
   });
}
handlePrint(){
  this.setState({print:true})
  var content = document.getElementById('printarea');
  var pri = document.getElementById('ifmcontentstoprint').contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
}
render(){
  const {values} = this.state
    return(
      <ButtonToolbar>
      <i className="material-icons" onClick={this.handleShow}>print</i>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogclassName="custom-modal-student"
        >
          <div >
          <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-lg">
  <hr/>
            </Modal.Title>
            <hr/>
          </Modal.Header>
          <iframe id="ifmcontentstoprint" style={{
                       height: '0px',
                       width: '0px',
                       position: 'absolute'
                   }}></iframe>
          <Modal.Body>
          <div id="printarea">
          <b><h2 className="text-center">Library Student Report</h2></b>
          <hr/>
            <h4>
            <span id="nameSpan">Name: <b>John kamau Ruigu</b></span>   <span id="studentSpan">Student Adm: <b>5539</b></span> <span id="classSpan">Class: <b>4 East</b></span>
            </h4>
            <br/>
            <div className="row">
             <div className="col-md-12">
             <h3 className="panel-title text-center" ><strong>Borrowed books</strong></h3>
               <div className="panel panel-default">
                 <div className="">
                 </div>
                 <div className="panel-body">
                   <div className="">
                     <Table
                     books={this.state.studBorrowedBooks}
                     studBorrowAva={this.state.studBorrowAva}
                     displayReport={this.state.displayReport}
                     titles={[
                       {
                         name: "Book Accession No:",
                         prop: "bookAcc"
                       },
                       {
                         name: "Date Borrowed",
                         prop: "dateIssued"
                       },
                       {
                         name: "Deadline",
                         prop: "deadLine"
                       },
                       {
                         name: "Over Due(Days)"
                       }
                     ]}
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
            <hr/>
          </div>
          </Modal.Body>
          </div>
          <Modal.Footer style={{textAlign: 'center'}}>
            <button className={ !this.state.print === 'false' ? 'btn btn-info' : 'btn btn-info printBtn' } onClick={e => this.handlePrint(e)}>Print</button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    )
  }
}


export default printModal;
