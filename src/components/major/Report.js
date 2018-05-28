import React from 'react';
import { connect } from 'react-redux';
// import Table from '../report/table/overdue';
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'overdue'
    };
}

  render() {
    return (
      <div className="content">
        <div className="card" id="main-card">
          <div className="row">
              <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select a column"
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ show: value })
                }
              >
              <MenuItem value="overdue" primaryText="Overdue Students" />
              <MenuItem value="borrowed" primaryText="Borrowed Books" />
            </SelectField>
          </div>
          <div className="card">
          {
            console.log(this.state.show) ||
            console.log(this.props.overdue)
          }
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
    console.log(state);
}

export default connect(mapStateToProps,)(Report);
