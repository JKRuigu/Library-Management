import React from "react";

export default ({}) =>(
  <form>
    <div className="row">
          <div className="col-sm-4">
              <div className="form-group">
                  <label data-toggle="tooltip">Student Adm No</label>
                  <input type="number" className="form-control"  disabled/>
              </div>
          </div>
          <div className="col-sm-8">
              <div className="form-group">
                  <label data-toggle="tooltip">Student Name</label>
                  <input type="text" className="form-control"  disabled/>
              </div>
          </div>
      </div>
      <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Class</label><br/>
                  <input type="number" name="form"   className="form-control" disabled/>
                  </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                  <label data-toggle="tooltip">Stream </label>
                      <input type="text" name="form" className="form-control" disabled/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <div className="form-group">
                    <label data-toggle="tooltip">Admission Date</label>
                      <input type="text" name="adminNo"	 className="form-control" disabled/>
                  </div>
            </div>
        </div>
        </form>
)
