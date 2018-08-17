import React from "react";

export default ({
  books,
  bookBorrowAva
  }) =>(
    <div className="card">
    <form>
      <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Book Accession Number</label>
                    <input type="number" value={!bookBorrowAva ? '' : books[0].bookAccession}	 className="form-control"  disabled/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label data-toggle="tooltip">Isbn</label>
                    <input type="text"  value={!bookBorrowAva ? '' : books[0].Isbn} className="form-control"  disabled/>
                </div>
            </div>
        </div>
        <div className="row">
              <div className="col-sm-12">
                  <div className="form-group">
                      <label data-toggle="tooltip">Book Title</label><br/>
                    <input type="text" name="form" value={!bookBorrowAva ? '' :  books[0].orderdetails[0].bookTitle} className="form-control" disabled/>
                    </div>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-12">
                  <div className="form-group">
                      <label data-toggle="tooltip">Book Condition</label>
                        <input type="text" name="adminNo"	 value={!bookBorrowAva ? '' : books[0].bookCondition} className="form-control" disabled/>
                    </div>
              </div>
          </div>
          </form>
          </div>
)
