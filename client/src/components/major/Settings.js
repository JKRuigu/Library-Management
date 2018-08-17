import React from "react";
import ClassForm from '../settings/class';
import StreamTable from '../settings/table';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import './student.css';
import Nav from '../partials/Nav';

class Settings extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           isLoading: true,
           streams: [],
           errors: [],
           editIdx: -1,
           editStudId:'',
           edited:false,
           show:false
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

componentWillMount() {
   localStorage.getItem('streams') && this.setState({
       streams: JSON.parse(localStorage.getItem('streams')),
       isLoading: false
   })
}

componentDidMount(){
 !localStorage.getItem('streams') ? this.fetchData() :console.log(`Using data from localStorage that `);
}

componentWillUpdate(nextProps, nextState) {
     localStorage.setItem('streams', JSON.stringify(nextState.streams));
 }

 fetchData(){
   axios.get(`/api/fetch/stream`)
     .then(res => {
       this.setState({
          streams:res.data.data,
          isLoading: false
        });
     });
}

handleRemove = (e,i) => {
  if (window.confirm("Are you sure you want to delete this record ?")) {
 const {id} = e.target;
 if (id) {
   this.setState({
      isLoading:true
     });
   axios.delete(`/api/stream/${id}/delete`)
   .then(res =>{
     if (res.status === 200) {
       this.setState(state => ({
         streams: res.data.data,
         isLoading:false
       }))
     }else if (res.status === 400) {
       this.fetchData()
     }
   })
 }
 }
};

startEditing = i => {
 this.setState({ editIdx: i });
};

stopEditing = () => {
    if (window.confirm("Are you sure you want to save this changes ?")) {
 const {isLoading, editStudId,streams,edited} = this.state;
 if (editStudId && edited==true) {
   var streamEdit =  streams.filter(function(hero) {
     	return hero._id == editStudId;
     });
   if (streamEdit) {
     const {isLoading, streams} = this.state;
     this.setState({
        isLoading:true,
        streams:[]
       });
     let data = streamEdit;
     console.log(data);
     axios.put(`/api/stream/${editStudId}/edit`,data)
       .then(res => {
         console.log(res.data.data);
         this.setState(state => ({
           streams:res.data.data,
           isLoading:false,
           editStudId:''
         }));
       });
   }

 }
 this.setState({ editIdx: -1 });
}
 this.setState({ editIdx: -1 });
};

handleChange = (e, name, i) => {
 const { value,id } = e.target;
 this.setState(state => ({
   streams: state.streams.map(
     (row, j) => (j === i ? { ...row, [name]: value } : row)
   ),
   editStudId:id,
   edited:true
 }));
};

render(){
    const {isLoading, streams} = this.state;
     console.log(this.state.streams);
    return(
      <div className="content">
        <div className="card" id="main-card">
          <div className="card-head"></div>
          <div className="card-body">
            <h3>Settings </h3>
              <div className="card">
                <div className="card-body">
                  <div className="col-lg-6">
                  <button className="btn btn-success" onClick={this.handleShow} style={{marginRight:"50px"}}>Add Student</button>
                  </div>
                  <div className="col-lg-6"></div>
                </div>
              </div>
          </div>
          <div className="card-footer"></div>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.show}
          onClose={this.handleHide}
        >
          <div className="card-modal">
            <div className="card card-modal-form">
            <u><h3 className="text-center">Stream settings</h3></u>
              <div className="card">
              <ClassForm/>
              <StreamTable
                handleRemove={this.handleRemove}
                startEditing={this.startEditing}
                editIdx={this.state.editIdx}
                stopEditing={this.stopEditing}
                handleChange={this.handleChange}
                stream={this.state.streams}
                titles={[
                  {
                    name: "Stream",
                    prop: "stream"
                  }
                ]}
              />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Settings;
