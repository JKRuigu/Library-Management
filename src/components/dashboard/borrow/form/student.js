import React from "react";
import Moment from 'react-moment';

export default ({
  students,
  studBorrowAva
  }) =>(
    <div className="card">
    <form>
      <div className="row">
            <div className="col-sm-4">
                <div className="form-group">
                    <label data-toggle="tooltip">Student Adm No</label>
                    <input type="number" value={!studBorrowAva ? '' : students[0].adminNo}	 className="form-control"  disabled/>
                </div>
            </div>
            <div className="col-sm-8">
                <div className="form-group">
                    <label data-toggle="tooltip">Student Name</label>
                    <input type="text" value={!studBorrowAva ? '' : students[0].studentName}	 className="form-control"  disabled/>
                </div>
            </div>
        </div>
        <div className="row">
              <div className="col-sm-6">
                  <div className="form-group">
                      <label data-toggle="tooltip">Class</label><br/>
                    <input type="number" name="form"  value={!studBorrowAva ? '' : students[0].form}	 className="form-control" disabled/>
                    </div>
              </div>
              <div className="col-sm-6">
                  <div className="form-group">
                    <label data-toggle="tooltip">Stream </label>
                        <input type="text" name="form"	value={!studBorrowAva ? '' : students[0].stream} className="form-control" disabled/>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-12">
                  <div className="form-group">
                      <label data-toggle="tooltip">Admission Date</label>
                        <p><b>
                        {
                          !studBorrowAva ? '' : <Moment>{students[0].admissionDate}</Moment>
                        }
                        </b></p><hr/>
                    </div>
              </div>
          </div>
          </form>
          </div>
)
