import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import BookTitleform from '../books/form/BookTitleForm';
import BookForm from '../books/form/BookForm';
import MinorBook from '../books/MinorBook';
import Title from '../books/Title';
import Nav from '../partials/Nav';

import { Modal, Button ,ButtonToolbar} from 'react-bootstrap';
import './student.css';

class Books extends React.Component {
  constructor(props){
    super(props);
       this.state = {
           isLoading: false,
           show: false,
           showModal: false,
           showTable:'books',
           page:"MinorBook"
      }
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
}

handleShow() {
  this.setState({ show: true });
}

handleHide() {
  this.setState({ show: false });
}

handleShowModal() {
  this.setState({ showModal: true });
}

handleHideModal() {
  this.setState({ showModal: false });
}

submit = data =>{
  this.props.addTitle(data).then(() => {
    alert('Book Title added successfully !');
    this.setState({ isLoading: false })
  }).catch( error => {
    alert('There was an error durring the process!');
    this.setState({ errors: error })
  });
}

booksubmit = data =>{
  this.props.addBook(data).then(() => {
    alert('Book  added successfully !');
    this.setState({ isLoading: false })
  }).catch(error => {
    alert('There was an error durring the process!');
    this.setState({
       errors: error,
       isLoading:false
     })
  });
}


render(){
  const {page} = this.state;
    return(
      <MuiThemeProvider>
      <div className="content">
        <div className="card" id="main-card">
        <div className="row">
            <div className="col-md-6">
              <div className="col-md-6">
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.handleShow}>
                      Add New BookTitle
                    </Button>
                    <Button bsStyle="primary" onClick={this.handleShowModal}>
                      Add New Book
                    </Button>
                  </ButtonToolbar>
                    <ButtonToolbar>
                    <Modal
                      {...this.props}
                      show={this.state.show}
                      onHide={this.handleHide}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Body>
                        <div className="">
                          <BookTitleform submit={this.submit}/>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <Modal
                      {...this.props}
                      show={this.state.showModal}
                      onHide={this.handleHideModal}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Body>
                        <div className="">
                          <BookForm submit={this.booksubmit}/>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </ButtonToolbar>
              </div>
              <div className="col-md-6">
                <SelectField
                  style={{ marginLeft: "1em" }}
                  floatingLabelText="Select category"
                  value={this.state.page}
                  onChange={(event, index, value) =>
                    this.setState({
                      page: value,
                      editIdx: -1,
                      columnToSort: "",
                      sortDirection: "desc",
                      query: "",
                      columnToQuery: "",
                      editStudId:'',
                      edited:false,
                     })
                }
                >
                <MenuItem value="MinorBook" primaryText="Books" />
                <MenuItem value="Title" primaryText="Book Titles" />
                </SelectField>
              </div>
            </div>
         </div>
         {
           page == 'MinorBook' ? <MinorBook />:
           <Title />
         }
       </div>
      </div>
      </MuiThemeProvider>
    )
}
}

export default Books;
