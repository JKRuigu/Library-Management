import React from 'react';
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import './student.css';
import OverdueReport from '../report/OverdueReport'
import BorrowedBooksReport from '../report/BorrowedBooksReport'

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'OverdueReport',
      errors:[],
      isLoading:false
    };
}

render() {

    const {show} = this.state
    return (
      <div className="content">
        <div className="card" id="main-card">
          <div className="row">
              <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select report"
                value={this.state.show}
                onChange={(event, index, value) =>
                  this.setState({ show: value })
                }
                >
                <MenuItem value="OverdueReport" primaryText="Overdue Students" />
                <MenuItem value="BorrowedBooksReport" primaryText="Borrowed Books" />
               </SelectField>
           </div>
          <div>
            {
              show == 'BorrowedBooksReport' ?
              <BorrowedBooksReport />:
              <OverdueReport />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Report
