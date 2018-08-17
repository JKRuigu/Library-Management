import React from "react";
import { connect } from 'react-redux';

class TitleConfig extends React.Component {
  constructor(props){
       super(props);
       this.state = {
           titles:[]
       }
   }
   componentWillReceiveProps(nextProps) {
     this.setState({
       titles:nextProps.titles
     });
   }
  render(){
    return(
    <div>
        {
          this.state.titles.forEach(function (title,i) {
            <p key={`datalist-${i}`}>{title.bookTitle || console.log('hey')}</p>
          })
        }
    </div>
    )
  }
}

const mapStateToProps = state => ({
        titles: state.titles,
        students:state.students
});



export default connect(mapStateToProps)(TitleConfig);
